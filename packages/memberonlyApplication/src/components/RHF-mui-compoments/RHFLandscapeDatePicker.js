import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

//* MUI
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import { Stack } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'

import { getDayOfWeek_FromValue } from '../../redux/codes/getKeysOrValues'
import { isWeekend } from 'date-fns'

const CustFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: '15rem',
  [`& fieldset`]: {
    borderRadius: 2,
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

export default function RHFTextField({ name, onDateChange, dateValue, minDate, maxDate, helperText, type, width, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onBlur, onChange }, fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CustFormControl fullWidth error={!!error}>
            <Stack>
              <StaticDatePicker
                orientation='portrait'
                openTo='day'
                value={dateValue ? dayjs(dateValue) : null}
                minDate={minDate ? dayjs(minDate) : null}
                maxDate={maxDate ? dayjs(maxDate) : null}
                format='DD/MM/YYYY'
                onChange={(newValue) => {
                  onDateChange(newValue)
                  onChange(newValue)
                  onBlur(newValue)
                }}
                sx={{
                  borderRadius: 2,
                }}
                helperText={error ? error?.message : helperText}
                {...other}
              />
              {!!error && (
                <FormHelperText error sx={{ px: 2 }}>
                  {error.message}
                </FormHelperText>
              )}
            </Stack>
          </CustFormControl>
        </LocalizationProvider>
      )}
    />
  )
}
