import React from 'react'

import { Box, IconButton, Typography, Stack } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import FormHelperText from '@mui/material/FormHelperText'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { Controller } from 'react-hook-form'

import TextField_Custom from '../ui/mui-custom-styled-components/TextField_Custom'

export default function EditableIncrementer({ name, control, defualtValue, count, label, maxValue, onIncrementCount, onDecrementCount, onTextFieldChange, disabled = false }) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defualtValue}
      render={({ fieldState: { error }, field: { onChange, onBlur, value } }) => (
        <Stack direction='column' justifyContent='center' alignItems='center'>
          <Box
            sx={{
              py: 0.5,
              px: 0.75,
              border: 1,
              lineHeight: 0,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              borderColor: count > maxValue ? 'error.main' : 'grey.50032',
            }}
          >
            <IconButton size='small' disabled={count < 1 || disabled === true} onClick={onDecrementCount} sx={{ color: (theme) => (theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main) }}>
              <RemoveCircleIcon width={14} height={14} />
            </IconButton>
            <TextField_Custom
              error={count > maxValue ? true : false}
              variant='standard'
              type='number'
              InputLabelProps={{
                shrink: true,
              }}
              value={count}
              onChange={(value) => {
                onTextFieldChange(value)
                onChange(value)
                onBlur(value)
              }}
              size='small'
              sx={{ width: 40, textAlign: 'center' }}
            />

            <IconButton size='small' disabled={count >= maxValue || disabled === true} onClick={onIncrementCount} sx={{ color: (theme) => (theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main) }}>
              <AddCircleIcon width={14} height={14} />
            </IconButton>
          </Box>
          <Typography variant='caption' component='div' sx={{ mt: 1, textAlign: 'right', color: count > maxValue ? 'error.main' : 'text.secondary' }}>
            {count > maxValue ? `Cannot be more than ${maxValue + ' ' + label}` : label}
          </Typography>
          {!!error && (
            <Stack sx={{ width: '100%' }}>
              <FormHelperText error sx={{ px: 2, width: '100%' }}>
                {error.message}
              </FormHelperText>
            </Stack>
          )}
        </Stack>
      )}
    />
  )
}
