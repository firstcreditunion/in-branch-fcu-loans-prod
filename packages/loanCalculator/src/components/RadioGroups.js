import React from 'react'

import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { styled } from '@mui/material/styles'

import { Controller } from 'react-hook-form'

const CustomFormLabel = styled(FormLabel)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
}))

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

const RadioGroups = ({ name, label, className, control, value, defualtValue, showLabel = true, onRadioChange, children, fullWidth, alignItems, row = 'true', ...props }) => {
  const labelId = `${name}-label`

  return (
    <FormControl component='fieldset' margin='none' fullWidth variant='outlined'>
      <Controller
        name={name}
        control={control}
        defaultValue={defualtValue}
        render={({ field: { onChange, value, name }, fieldState: { error } }) => (
          <Stack direction='column' justifyContent='flex-start' alignItems={alignItems ? alignItems : 'flex-start'}>
            {showLabel && <LabelStyle>{label}</LabelStyle>}
            <RadioGroup
              row={row}
              aria-label={labelId}
              name={name}
              value={value}
              onChange={(value) => {
                onRadioChange(value)
                onChange(value)
              }}
            >
              {children}
            </RadioGroup>
            {!!error && (
              <FormHelperText error sx={{ p: 0, m: 0 }}>
                {error.message}
              </FormHelperText>
            )}
          </Stack>
        )}
      />
    </FormControl>
  )
}

export default RadioGroups
