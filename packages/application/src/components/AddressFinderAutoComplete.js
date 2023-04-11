import React, { useMemo } from 'react'
import TextField_Cust from '../components/ui/mui-custom-styled-components/TextField_Custom'

// Redux
import { getAddresses } from '../redux/slices/contactDetailsSlice'

import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'

import useMediaQuery from '@mui/material/useMediaQuery'

import { useDispatch, useSelector } from 'react-redux'

// import debounce from 'lodash.debounce'
// import throttle from 'lodash.throttle'
import { Controller } from 'react-hook-form'
import { List, ListItem } from '@mui/material'

import { throttle_fn_wait } from '../utils/debounceAndThrottle'

export default function AddressFinderAutoComplete({ name, hasStartAdornment, StartAdornmentIcon, asynchronousFunc, addressFinderRequestConfig, addressFinderSuccess, addressFinderLabel, addressCompletions, control, onAddressChange, onAddressSelectedChange, helperText, value, loading, defualtValue, size = 'medium', placeholder = '' }) {
  const dispatch = useDispatch()

  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  // const empAddressFinderConfig = useSelector((state) => state.employmentReducer.empAddressFinderConfig)

  const addressFinderId = `${name}-id`
  const addressFinderTextId = `${name}-idtext`
  const [open, setOpen] = React.useState(false)

  const [inputValue, setInputValue] = React.useState('')
  const [options, setOptions] = React.useState([])

  const loadingAddress = open

  function addressChangeHandler() {
    dispatch(asynchronousFunc(addressFinderRequestConfig))
  }

  const requestAddress = useMemo(
    () =>
      throttle_fn_wait(() => {
        addressChangeHandler()
      }, 500),
    [inputValue]
  )

  React.useEffect(() => {
    let active = true

    if (!loadingAddress) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    if (active && addressFinderSuccess && addressCompletions !== null && addressCompletions !== undefined) {
      let newOptions = []

      if (value) {
        newOptions = [value]
      }

      if (addressCompletions) {
        newOptions = [...newOptions, ...addressCompletions]
      }

      setOptions([...addressCompletions])
    }

    requestAddress()

    return () => {
      active = false
    }
  }, [value, inputValue, requestAddress])

  React.useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return (
    <Controller
      rules={{ required: true }}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <Autocomplete
          id={addressFinderId}
          open={open}
          size={size}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          autoHighlight
          filterOptions={(x) => x}
          filterSelectedOptions
          fullWidth
          selectOnFocus
          value={value}
          onChange={(event, value) => {
            onAddressSelectedChange(event, value)
            onChange(value?.a)
            onBlur(value?.a)
            setOptions(value ? [value, ...addressCompletions] : [...addressCompletions])
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue)
          }}
          isOptionEqualToValue={(option, value) => {
            option.a === value.a
          }}
          getOptionLabel={(option) => option.a}
          options={options}
          loading={loading === 'PENDING'}
          loadingText='Searching...'
          renderInput={(params) => (
            <TextField_Cust
              id={addressFinderTextId}
              {...params}
              label={addressFinderLabel}
              variant='outlined'
              onChange={(event) => {
                onAddressChange(event)
              }}
              fullWidth
              placeholder={placeholder}
              error={error}
              helperText={error ? error?.message : helperText}
              InputProps={{
                style: { fontSize: downSm ? '0.9rem' : '1rem' },
                ...params.InputProps,
                autoComplete: 'new-password',
                startAdornment: <InputAdornment position='start'>{hasStartAdornment && <IconButton>{StartAdornmentIcon}</IconButton>}</InputAdornment>,
                endAdornment: (
                  <React.Fragment>
                    {loadingAddress ? <CircularProgress color='inherit' size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              InputLabelProps={{ style: { fontSize: downSm ? '0.9rem' : '1rem' } }}
            />
          )}
        />
      )}
      name={name}
      control={control}
      defaultValue={defualtValue}
    />
  )
}

// const requestAddressFinder = () => {
//   console.log('ASYNC Address Finder')
//   console.log('Address Finder Config: ', addressFinderRequestConfig)

//   dispatch(asynchronousFunc(addressFinderRequestConfig))
// }

// const requestAddress = React.useMemo(
//   () => () => {
//     dispatch(asynchronousFunc(addressFinderRequestConfig))
//   },
//   [addressFinderRequestConfig]
// )

// const requestAddress = React.useMemo(
//   () =>
//     throttle(() => {
//       console.log('empAddressFinderConfig: ', empAddressFinderConfig)
//       dispatch(asynchronousFunc(empAddressFinderConfig))
//     }, 1000),
//   []
// )

// React.useEffect(() => {
//   let active = true

//   if (!loadingAddress) {
//     return undefined
//   }

//   if (inputValue === '') {
//     setOptions(value ? [value] : [])
//     return undefined
//   }

//   requestAddress()

//   if (active && addressFinderSuccess && addressCompletions !== null && addressCompletions !== undefined) {
//     setOptions([...addressCompletions])
//   }

//   // requestAddressThrottle({ input: inputValue }, (results) => {
//   //   if (active) {
//   //     let newOptions = []

//   //     if (value) {
//   //       newOptions = [value]
//   //     }

//   //     if (results) {
//   //       newOptions = [...newOptions, ...results]
//   //     }

//   //     setOptions(newOptions)
//   //   }
//   // })
//   // ;(() => {
//   //   requestAddress()

//   //   if (active && addressFinderSuccess && addressCompletions !== null && addressCompletions !== undefined) {
//   //     setOptions([...addressCompletions])
//   //   }
//   // })()

//   return () => {
//     active = false
//   }
// }, [empAddressFinderConfig])

// const requestAddress = throttle(
//   () => {
//     console.log('Request Address Memo')
//     dispatch(asynchronousFunc(addressFinderRequestConfig))
//   },
//   1000,
//   [{ trailing: true }]
// )

// const requestAddress = React.useMemo(() =>
//   throttle(
//     () => {
//       console.log('Request Address Memo')
//       dispatch(asynchronousFunc(addressFinderRequestConfig))
//     },
//     300000,
//     [{ trailing: true }]
//   )
// )

// const requestAddress = throttle_fn_wait(() => {
//   console.log('Calling Address Finder')
//   dispatch(asynchronousFunc(addressFinderRequestConfig))
// }, 1000)

// ;(() => {
//   // requestAddress()

//   if (active && addressFinderSuccess && addressCompletions !== null && addressCompletions !== undefined) {
//     setOptions([...addressCompletions])
//   }
// })()
