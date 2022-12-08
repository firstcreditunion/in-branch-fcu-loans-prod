import React from 'react'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { Controller } from 'react-hook-form'
import { Paper } from '@mui/material'

const ToggleButtons = ({ name, label, control, value, defaultValue, onToggleButtonChange, children, fullwidth, ...props }) => {
  const labelId = `${name}-label`
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, name } }) => (
        <ToggleButtonGroup
          aria-label={labelId}
          exclusive
          name={name}
          fullWidth={true}
          sx={{ maxWidth: 400 }}
          value={value}
          onChange={(event) => {
            onToggleButtonChange(event)
            onChange(event)
            onBlur(event)
          }}
        >
          {children}
        </ToggleButtonGroup>
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  )
}

export default ToggleButtons
