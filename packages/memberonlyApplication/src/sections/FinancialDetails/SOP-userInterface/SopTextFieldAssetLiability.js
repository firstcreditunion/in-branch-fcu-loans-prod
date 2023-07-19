import React from 'react'

//* Third-party
import { NumericFormat } from 'react-number-format'
import { Controller } from 'react-hook-form'

import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import { FormHelperText, Stack, Typography, TextField } from '@mui/material'

const AmountFormat = React.forwardRef(function AmountFormat(props, ref) {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator={true}
    />
  )
})

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

export default function SOPTextFieldAssetLiabilities({ control, label, name, onSopTextFieldChange, helperTextInput, defaultValue, type, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Stack direction='column' justifyContent='flex-start' alignItems='flex-start'>
          <TextField_Cust
            size='small'
            fullWidth
            type={type}
            label={label}
            value={parseInt(value)}
            error={error}
            placeholder='0.00'
            helperText={
              <Typography variant='caption' sx={{ p: 0, m: 0, fontSize: 10 }}>
                {helperTextInput}
              </Typography>
            }
            InputProps={{
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              inputComponent: AmountFormat,
            }}
            {...props}
            onChange={(value) => {
              onSopTextFieldChange(value)
              onChange(value)
              onBlur(value)
            }}
          />
          {!error && <FormHelperText margin='dense'>{helperTextInput}</FormHelperText>}
          {!!error && (
            <FormHelperText margin='dense' error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  )
}
