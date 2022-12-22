import React from 'react'

import { Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'

//* MUI - Styles
import { styled } from '@mui/material/styles'

//* MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import FormHelperText from '@mui/material/FormHelperText'

const CustFormControl = styled(FormControl)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 30,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[400],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
      transition: '.2s',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.primary.main,
    },
  },
}))

export default function IdentificationComboBox({ name, label, control, defualtValue, placeholder, onSelectChange, children, menu, ...props }) {
  const identificationTypes = useSelector((state) => state.identificationReducer.identificationTypes)
  const checkedIdentificationCodes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)
  const idTypeValues = Object.values(identificationTypes)

  const autoCompleteItems = idTypeValues.map((identification) => {
    return identification.autoComplete
  })

  const selectedIdentifications = autoCompleteItems.filter((item) => {
    return checkedIdentificationCodes.includes(item.code)
  })

  const labelId = `${name}-label`

  // console.log('Auto Complete Items: ', autoCompleteItems)
  return (
    <CustFormControl component='fieldset' margin='normal' fullWidth variant='outlined'>
      <Controller
        name={name}
        control={control}
        defaultValue={defualtValue}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Stack direction='column' justifyContent='center' alignItems='center'>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
              labelId={labelId}
              label={label}
              value={value}
              fullWidth
              multiple
              onChange={(event) => {
                onSelectChange(event)
                onChange(event)
                onBlur(event)
              }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              <MenuItem disabled value=''>
                <em>{placeholder}</em>
              </MenuItem>
              {autoCompleteItems.map((menuItem) => (
                <MenuItem key={menuItem?.code} value={menuItem?.title}>
                  <Checkbox checked={false} />
                  {menuItem.title}
                </MenuItem>
              ))}
            </Select>
            {!!error && (
              <FormHelperText error sx={{ px: 2 }}>
                {error.message}
              </FormHelperText>
            )}
          </Stack>
        )}
      />
    </CustFormControl>
  )
}
