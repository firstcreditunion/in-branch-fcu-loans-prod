import React from 'react'

import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import Switch from '@mui/material/Switch'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'

// ----------------------------------------------------------------------

export default function RHFSwitch({ name, helperText, value, color, onSwitchChange, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <div>
          <FormControlLabel
            control={
              <Switch
                color={color}
                onChange={(value) => {
                  onSwitchChange(value)
                }}
                value={value}
                checked={value}
              />
            }
            {...other}
          />

          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
        </div>
      )}
    />
  )
}

RHFSwitch.propTypes = {
  helperText: PropTypes.string,
  name: PropTypes.string,
}
