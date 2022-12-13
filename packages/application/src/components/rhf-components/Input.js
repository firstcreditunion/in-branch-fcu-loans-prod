import React from 'react'
import TextField_Cust from '../ui/mui-custom-styled-components/TextField_Custom'

import { Controller } from 'react-hook-form'
import { Stack } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import IconButton from '@mui/material/IconButton'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
// import useMediaQuery from '@mui/material/useMediaQuery'

const Input = ({ name, label, control, defaultValue, type, onInputChange, value, capitalise = false, placeholder = null, errorInput, variant = 'outlined', disabled = false, helperTextInput, hasTooltip = false, hasStartAdornment = false, StartAdornmentIcon, toolTipText, inputProps, stretch, customWidth, ...props }) => {
  // const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  // const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Stack direction='column' justifyContent='flex-start' alignItems={stretch ? 'stretch' : 'flex-start'} sx={{ width: customWidth ? customWidth : '100%' }}>
          <TextField_Cust
            label={label}
            variant={variant}
            value={capitalise ? value?.toUpperCase() : value}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            fullWidth={true}
            disabled={disabled}
            InputProps={{
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
            error={error ? true : false}
            {...props}
            onChange={(value) => {
              onInputChange(value)
              onChange(value)
              onBlur(value)
            }}
          />
          {!error && <FormHelperText sx={{ px: 2 }}>{helperTextInput}</FormHelperText>}
          {!!error && (
            <FormHelperText error sx={{ px: 5 }}>
              {error.message}
            </FormHelperText>
          )}
        </Stack>
      )}
    />
  )
}

export default Input
