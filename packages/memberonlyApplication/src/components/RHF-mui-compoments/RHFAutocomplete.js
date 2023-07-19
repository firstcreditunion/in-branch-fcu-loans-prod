import React from 'react'

import { useFormContext, Controller } from 'react-hook-form'
// @mui
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
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

export default function RHFAutocomplete({ name, label, placeholder, helperText, ...other }) {
  const { control, setValue } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <Autocomplete
          onChange={(event, newValue) =>
            setValue(name, newValue, {
              shouldValidate: true,
            })
          }
          renderInput={(params) => <TextField_Cust label={label} placeholder={placeholder} error={!!error} helperText={error ? error?.message : helperText} {...params} />}
          {...other}
        />
      )}
    />
  )
}
