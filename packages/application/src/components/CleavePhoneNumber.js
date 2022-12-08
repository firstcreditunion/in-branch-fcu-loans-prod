import React, { useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// React-Hook-Form
import { Controller } from 'react-hook-form'

// MUI
import Typography from '@mui/material/Typography'
import { Box, TextField, OutlinedInput } from '@mui/material'
import { Stack } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import IconButton from '@mui/material/IconButton'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'

// Cleave
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.nz'

// Custom
import TextField_Cust from '../components/ui/mui-custom-styled-components/TextField_Custom'

const CleaveInput = (props) => {
  const { inputRef, ...other } = props

  return (
    <Cleave
      {...other}
      ref={inputRef}
      options={{
        phone: true,
        delimiter: ' ',
        delimiterLazyShow: true,
        prefix: '+64',
        noImmediatePrefix: true,
        phoneRegionCode: 'NZ',
      }}
    />
  )
}

const CustomPhoneNumber = ({ name, label, control, defaultValue, type, onNumberChange, value, errorInput, helperText, placeholder, hasTooltip = false, hasStartAdornment, StartAdornmentIcon, toolTipText, inputProps, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Stack direction='column' justifyContent='flex-start' alignItems='flex-start'>
          <TextField_Cust
            label={label}
            variant='outlined'
            value={value}
            type={type}
            placeholder={placeholder}
            fullWidth={true}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputComponent: CleaveInput,
              startAdornment: <InputAdornment position='start'>{hasStartAdornment && <IconButton disabled>{StartAdornmentIcon}</IconButton>}</InputAdornment>,
              endAdornment: (
                <InputAdornment position='end'>
                  {hasTooltip && (
                    <Tooltip title={toolTipText} arrow={true} TransitionComponent={Zoom}>
                      <IconButton>
                        <InfoRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </InputAdornment>
              ),
            }}
            error={errorInput}
            {...props}
            onChange={(value) => {
              onNumberChange(value)
              onChange(value)
              onBlur(value)
            }}
          />
          {!error && <FormHelperText sx={{ px: 2 }}>{helperText}</FormHelperText>}
          {!!error && (
            <FormHelperText error sx={{ px: 2 }}>
              {error.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  )
}

export default CustomPhoneNumber
