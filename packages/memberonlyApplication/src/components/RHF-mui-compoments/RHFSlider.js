import React from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import FormHelperText from '@mui/material/FormHelperText'
import Slider from '@mui/material/Slider'

// ----------------------------------------------------------------------

export default function RHFSlider({ name, helperText, min, max, step, onSliderChange, marks, valueLabelDisplay, defaultValue, value, ...other }) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur }, fieldState: { error } }) => (
        <>
          <Slider
            onChange={(value) => {
              onSliderChange(value)
              onChange(value)
              onBlur(value)
            }}
            min={min}
            max={max}
            marks={marks}
            valueLabelDisplay={valueLabelDisplay}
            defaultValue={defaultValue}
            value={value}
            {...other}
          />

          {(!!error || helperText) && <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>}
        </>
      )}
    />
  )
}

RHFSlider.propTypes = {
  helperText: PropTypes.string,
  name: PropTypes.string,
}
