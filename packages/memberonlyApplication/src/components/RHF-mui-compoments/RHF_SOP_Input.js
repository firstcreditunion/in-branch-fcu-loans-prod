import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'

//* MUI
import TextField from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import { Stack, Typography, Avatar, Button, InputAdornment } from '@mui/material'

import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel'

import { NumericFormat } from 'react-number-format'

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

const AmountFormat1 = React.forwardRef(function AmountFormat(props, ref) {
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
const AmountFormat2 = React.forwardRef(function AmountFormat(props, ref) {
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
const AmountFormat3 = React.forwardRef(function AmountFormat(props, ref) {
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

export default function RHFTextField({ name, incomeItemName, hasConsolidate = false, disabled1, disabled2, disabled3, itemNameLength = 180, customTextFieldWidth = 120, hasCreditLimit = false, creditLimit, creditLimitHelperText, onCreditLimitChange, hasOutStandingBal = false, outStandingBalance, outStandingBalanceHelperText, onOutStandingBalanceChange, amount1, hasAmount1 = true, amount2, hasAmount2 = true, amount3, hasAmount3 = true, onAmount1Change, onAmount2Change, onAmount3Change, checked, onCheckboxChange, helperText1, helperText2, helperText3, width, ...other }) {
  const { control } = useFormContext()

  const namecheck = name ? `${name}check` : ''
  const nameCreditLimit = name ? `${name}creditLimit` : ''
  const nameOutStandingBal = name ? `${name}outStandingBal` : ''
  const name1 = name ? `${name}1` : ''
  const name2 = name ? `${name}2` : ''
  const name3 = name ? `${name}3` : ''

  return (
    <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
      <Typography
        variant='body2'
        color='primary'
        sx={{
          width: '100%',
          minWidth: itemNameLength,
        }}
      >
        {incomeItemName}
      </Typography>
      {hasConsolidate && (
        <Controller
          name={namecheck}
          control={control}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <div>
              <FormControlLabel
                sx={{
                  minWidth: 120,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                control={
                  <Checkbox
                    onChange={(value) => {
                      onCheckboxChange(value)
                      onChange(value)
                      onBlur(value)
                    }}
                    checked={checked}
                  />
                }
                {...other}
              />
            </div>
          )}
        />
      )}
      {hasCreditLimit && (
        <Controller
          name={nameCreditLimit}
          control={control}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <TextField
              fullWidth
              variant='standard'
              value={parseFloat(creditLimit)}
              placeholder='0.00'
              sx={{
                width: '100%',
                maxWidth: customTextFieldWidth,
              }}
              InputProps={{
                inputComponent: AmountFormat1,
                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              }}
              onChange={(value) => {
                onCreditLimitChange(value)
                onBlur(value)
                onChange(value)
              }}
              error={!!error}
              helperText={error ? error?.message : creditLimitHelperText}
              {...other}
            />
          )}
        />
      )}
      {hasOutStandingBal && (
        <Controller
          name={nameOutStandingBal}
          control={control}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <TextField
              fullWidth
              variant='standard'
              value={parseFloat(outStandingBalance)}
              placeholder='0.00'
              sx={{
                width: '100%',
                maxWidth: customTextFieldWidth,
              }}
              InputProps={{
                inputComponent: AmountFormat1,
                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              }}
              onChange={(value) => {
                onOutStandingBalanceChange(value)
                onBlur(value)
                onChange(value)
              }}
              error={!!error}
              helperText={error ? error?.message : outStandingBalanceHelperText}
              {...other}
            />
          )}
        />
      )}
      <Controller
        name={name1}
        control={control}
        render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
          <TextField
            fullWidth
            variant='standard'
            disabled={disabled1}
            value={parseFloat(amount1)}
            placeholder='0.00'
            sx={{
              width: '100%',
              maxWidth: customTextFieldWidth,
            }}
            InputProps={{
              inputComponent: AmountFormat1,
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            }}
            onChange={(value) => {
              onAmount1Change(value)
              onBlur(value)
              onChange(value)
            }}
            error={!!error}
            helperText={error ? error?.message : helperText1}
            {...other}
          />
        )}
      />
      {hasAmount2 && (
        <Controller
          name={name2}
          control={control}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <TextField
              fullWidth
              variant='standard'
              disabled={disabled2}
              placeholder='0.00'
              value={parseFloat(amount2)}
              sx={{
                width: '100%',
                maxWidth: customTextFieldWidth,
              }}
              InputProps={{
                inputComponent: AmountFormat2,
                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              }}
              onChange={(value) => {
                onAmount2Change(value)
                onBlur(value)
                onChange(value)
              }}
              error={!!error}
              helperText={error ? error?.message : helperText2}
              {...other}
            />
          )}
        />
      )}
      {hasAmount3 && (
        <Controller
          name={name3}
          control={control}
          render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
            <TextField
              fullWidth
              variant='standard'
              disabled={disabled3}
              placeholder='0.00'
              value={parseFloat(amount3)}
              sx={{
                width: '100%',
                maxWidth: customTextFieldWidth,
              }}
              InputProps={{
                inputComponent: AmountFormat3,
                startAdornment: <InputAdornment position='start'>$</InputAdornment>,
              }}
              onChange={(value) => {
                onAmount3Change(value)
                onBlur(value)
                onChange(value)
              }}
              error={!!error}
              helperText={error ? error?.message : helperText3}
              {...other}
            />
          )}
        />
      )}
    </Stack>
  )
}

RHFTextField.propTypes = {
  helperText: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}
