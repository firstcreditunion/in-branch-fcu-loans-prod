import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'

//* MUI
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

export default function RHFTextField({ name, onInputChange, value, helperText, type, width, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <TextField_Cust
          fullWidth
          type={type}
          value={value}
          onChange={(value) => {
            onInputChange(value)
            onBlur(value)
            onChange(value)
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}

RHFTextField.propTypes = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}
