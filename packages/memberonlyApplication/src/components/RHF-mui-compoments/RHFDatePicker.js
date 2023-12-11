import React from 'react'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import { Stack } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import { useFormContext, Controller } from 'react-hook-form'
// import AdapterDateFns from '@mui/lab/AdapterDateFns'
// import LocalizationProvider from '@mui/lab/LocalizationProvider'
// import DatePicker from '@mui/lab/DatePicker'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

import enGB from 'date-fns/locale/en-GB'
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

const CustomDatePicker = ({ name, label, className, date, variant, openTo, format, minDate, maxDate, disabled, defualtValue, helperText, isRequired, views = ['year', 'month', 'day'], onDateChange, ...props }) => {
    const labelId = `${name}-label`

    const { control } = useFormContext()

    return (
        <CustFormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={defualtValue}
                    render={({ fieldState: { error }, field: { onChange, onBlur, value } }) => (
                        <Stack>
                            <DatePicker
                                openTo={openTo}
                                views={views}
                                label={label}
                                value={date ? dayjs(date) : null}
                                format={format}
                                defaultValue={null}
                                minDate={minDate ? dayjs(minDate) : null}
                                maxDate={maxDate ? dayjs(maxDate) : null}
                                disabled={disabled}
                                onChange={(date) => {
                                    onDateChange(dayjs(date)?.$d)
                                    onChange(dayjs(date)?.$d)
                                    onBlur(dayjs(date)?.$d)
                                }}
                            />
                            {!!error && (
                                <FormHelperText error sx={{ px: 2 }}>
                                    {error.message}
                                </FormHelperText>
                            )}
                        </Stack>
                    )}

                />
            </LocalizationProvider>
        </CustFormControl>
    )
}

export default CustomDatePicker
