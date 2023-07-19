import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import Radio from '@mui/material/Radio'
import FormLabel from '@mui/material/FormLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Typography from '@mui/material/Typography'

// ----------------------------------------------------------------------

export default function RHFRadioGroup({ row, name, label, options, onRadioChange, value, spacing, disabled = false, helperText, ...other }) {
  const { control } = useFormContext()

  const labelledby = label ? `${name}-${label}` : ''

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <FormControl component='fieldset' disabled={disabled}>
          {label && (
            <Typography variant='subtitle2' id={labelledby} sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
              {label}
            </Typography>
          )}

          <RadioGroup
            aria-labelledby={labelledby}
            row={row}
            {...other}
            value={value}
            onChange={(value) => {
              onRadioChange(value)
              onChange(value)
              onBlur(value)
            }}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio size='small' />}
                label={option.label}
                sx={{
                  '&:not(:last-of-type)': {
                    mb: spacing || 0,
                  },
                  ...(row && {
                    mr: 0,
                    '&:not(:last-of-type)': {
                      mr: spacing || 2,
                    },
                  }),
                }}
              />
            ))}
          </RadioGroup>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}

RHFRadioGroup.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  row: PropTypes.bool,
  spacing: PropTypes.number,
}
