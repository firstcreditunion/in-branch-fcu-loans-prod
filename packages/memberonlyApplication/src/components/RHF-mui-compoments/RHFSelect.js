import React from 'react'

import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FilledInput from '@mui/material/FilledInput'
import FormHelperText from '@mui/material/FormHelperText'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

const TextField_Cust = styled(TextField)(({ theme }) => ({
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

// ----------------------------------------------------------------------

export function RHFSelect({ name, native, onSelectChange, inputVariant = 'outlined', value, maxHeight = 220, disabled = false, helperText, children, PaperPropsSx, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <TextField_Cust
          disabled={disabled}
          select
          fullWidth
          variant={inputVariant}
          value={value}
          onChange={(value) => {
            onSelectChange(value)
            onChange(value)
            onBlur(value)
          }}
          SelectProps={{
            native,
            MenuProps: {
              PaperProps: {
                sx: {
                  ...(!native && {
                    maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset',
                  }),
                  ...PaperPropsSx,
                },
              },
            },
            sx: { textTransform: 'capitalize' },
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        >
          {children}
        </TextField_Cust>
      )}
    />
  )
}

RHFSelect.propTypes = {
  PaperPropsSx: PropTypes.object,
  children: PropTypes.node,
  helperText: PropTypes.object,
  maxHeight: PropTypes.number,
  name: PropTypes.string,
  native: PropTypes.bool,
}

// ----------------------------------------------------------------------

export function RHFMultiSelect({ name, chip, label, options, inputVariant = 'outlined', checkbox, placeholder, helperText, onMultiSelectChange, values, sx, ...other }) {
  const { control } = useFormContext()

  const renderValues = (selectedIds) => {
    if (!values.length && placeholder) {
      return (
        <Box
          component='em'
          sx={{
            color: 'text.disabled',
          }}
        >
          {placeholder}
        </Box>
      )
    }

    if (chip) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {values.map((item) => (
            <Chip key={item.key} color='secondary' label={item.value} />
          ))}
        </Box>
      )
    }

    return values.map((item) => item.value).join(', ')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <FormControl sx={sx}>
          {label && <InputLabel id={name}> {label} </InputLabel>}
          <Select
            multiple
            displayEmpty={!!placeholder}
            onChange={(values) => {
              onMultiSelectChange(values)
              onChange(values)
              onBlur(values)
            }}
            sx={{
              borderRadius: inputVariant === 'filled' ? 0 : 10,
              borderColor: 'primary',
            }}
            labelId={name}
            input={inputVariant === 'filled' ? <FilledInput fullWidth label={label} error={!!error} /> : <OutlinedInput fullWidth label={label} error={!!error} />}
            renderValue={renderValues}
            value={values}
          >
            {placeholder && (
              <MenuItem disabled value=''>
                <em> {placeholder} </em>
              </MenuItem>
            )}

            {options.map((option) => {
              const selected = values.some((item) => {
                return item?.key === option.key
              })
              return (
                <MenuItem key={option.key} value={option.key}>
                  {checkbox && <Checkbox size='small' disableRipple checked={selected} />}

                  {option.value}
                </MenuItem>
              )
            })}
          </Select>

          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
        </FormControl>
      )}
    />
  )
}

RHFMultiSelect.propTypes = {
  checkbox: PropTypes.bool,
  chip: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  sx: PropTypes.object,
}
