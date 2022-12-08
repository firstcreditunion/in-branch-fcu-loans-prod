import React from 'react'

import { Controller } from 'react-hook-form'

import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider'

import { fNumber } from '../../utils/formatNumber'

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.secondary.light,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: theme.palette.primary.light,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
}))

const MSlider = ({ label, control, max, min, name, onSliderChange, defaultValue, value, marks, step, valueLabelDisplay, ...props }) => {
  const labelId = `${name}-label`
  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <StyledSlider
          aria-label={label}
          aria-labelledby={labelId}
          defaultValue={defaultValue}
          max={max}
          min={min}
          step={step}
          marks={marks}
          valueLabelDisplay={valueLabelDisplay}
          value={value}
          onChange={(value) => {
            onSliderChange(value)
            onChange(value)
          }}
        />
      )}
      name={name}
      control={control}
    />
  )
}

export default MSlider
