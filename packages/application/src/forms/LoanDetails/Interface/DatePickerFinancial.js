import React from 'react'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import isWeekend from 'date-fns/isWeekend'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'

import { Controller } from 'react-hook-form'

const CustFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '15rem',
  [`& fieldset`]: {
    borderRadius: 30,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.common.purple,
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

const CustomDatePicker = ({ name, label, className, control, date, variant, openTo, format, minDate, maxDate, disabled, defualtValue, isRequired, onDateChange, ...props }) => {
  const labelId = `${name}-label`

  return (
    <CustFormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          render={({ fieldState: { error }, field: { onChange, onBlur, value } }) => (
            <Stack>
              <DatePicker
                inputVariant={variant}
                margin='normal'
                openTo={openTo}
                views={['year', 'month', 'day']}
                id={labelId}
                label={label}
                value={date}
                shouldDisableDate={isWeekend}
                allowSameDateSelection={true}
                inputFormat={format}
                minDate={minDate}
                maxDate={maxDate}
                disabled={disabled}
                renderInput={(params) => <TextField fullWidth {...params} error={Boolean(error)} />}
                onChange={(date) => {
                  onDateChange(date)
                  onChange(date)
                  onBlur(date)
                }}
              />
              {!!error && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </Stack>
          )}
          name={name}
          control={control}
          defaultValue={defualtValue}
        />
      </LocalizationProvider>
    </CustFormControl>
  )
}

export default CustomDatePicker
