import React from 'react'
import PropTypes from 'prop-types'

//* RHF
import { useFormContext, Controller } from 'react-hook-form'

//* MUI
import { Stack } from '@mui/material'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Zoom from '@mui/material/Zoom'
import IconButton from '@mui/material/IconButton'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'

//* Custom Components
import CustomTextField from '../CustomTextField'

RHFTextField.propTypes = {
  name: PropTypes.string,
  helperText: PropTypes.node,
}

export default function RHFTextField({ name, onInputChange, capitalise = false, value, variant = 'outlined', hasTooltip = false, hasStartAdornment = false, StartAdornmentIcon, toolTipText, inputProps, stretch, customWidth, helperText, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <CustomTextField
          fullWidth
          value={value}
          onChange={(value) => {
            onInputChange(value)
            onChange(value)
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  )
}
