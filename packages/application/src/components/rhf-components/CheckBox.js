import React from 'react'

import { Controller } from 'react-hook-form'

import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'

const Input = ({ name, control, defaultValue, onCheckBoxChange, errorInput, helperTextInput, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Checkbox
          sx={{
            color: 'primary.main',
          }}
          {...field}
          checked={value}
          onChange={(value) => {
            onCheckBoxChange(value)
            onChange(value)
            onBlur(value)
          }}
        />
      )}
    />
  )
}

export default Input
