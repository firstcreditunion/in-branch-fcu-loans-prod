import React from 'react'
import TextField_Cust from '../../../components/ui/mui-custom-styled-components/TextField_Custom'

//* Third-party
import { NumericFormat } from 'react-number-format'
import { Controller } from 'react-hook-form'

import InputAdornment from '@mui/material/InputAdornment'
import { FormHelperText, Stack, Typography } from '@mui/material'

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

export default function SOPTextFieldAssetLiabilities({ control, label, name, onSopTextFieldChange, helperTextInput, defaultValue, type, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Stack direction='column' justifyContent='flex-start' alignItems='flex-start'>
          <TextField_Cust
            label={label}
            value={value}
            type={type}
            size='small'
            error={error}
            fullWidth
            placeholder='0.00'
            helperText={
              <Typography variant='caption' sx={{ p: 0, m: 0, fontSize: 10 }}>
                {helperTextInput}
              </Typography>
            }
            InputProps={{
              inputComponent: AmountFormat,
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
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
