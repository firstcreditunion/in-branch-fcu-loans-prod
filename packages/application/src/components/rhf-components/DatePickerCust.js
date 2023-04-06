import React from 'react'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import DatePicker from '@mui/lab/DatePicker'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

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

const CustomDatePicker = ({ name, label, className, control, date, variant, openTo, format, minDate, maxDate, disabled, defualtValue, helperText, isRequired, views = ['year', 'month', 'day'], onDateChange, ...props }) => {
  const labelId = `${name}-label`

  return (
    <CustFormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          inputVariant={variant}
          margin='normal'
          openTo={openTo}
          views={views}
          id={labelId}
          label={label}
          value={date}
          allowSameDateSelection={true}
          inputFormat={format}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          renderInput={(params) => <TextField fullWidth {...params} helperText={helperText} />}
          onChange={(date) => {
            onDateChange(date)
          }}
        />
      </LocalizationProvider>
    </CustFormControl>
  )
}

export default CustomDatePicker
