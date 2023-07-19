import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

//* MUI
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'

import { getDayOfWeek_FromValue } from '../../redux/codes/getKeysOrValues'
import { isWeekend } from 'date-fns'

export default function RHFTextField({ name, onDateChange, dateValue, minDate, maxDate, helperText, type, width, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            orientation='portrait'
            openTo='day'
            value={dateValue ? dayjs(dateValue) : null}
            minDate={minDate ? dayjs(minDate) : null}
            maxDate={maxDate ? dayjs(maxDate) : null}
            onChange={(newValue) => {
              onDateChange(newValue)
              onChange(newValue)
              onBlur(newValue)
            }}
          />
        </LocalizationProvider>
      )}
    />
  )
}
