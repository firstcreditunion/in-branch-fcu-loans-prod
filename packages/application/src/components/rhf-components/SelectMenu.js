import React from 'react'
import { styled } from '@mui/material/styles'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

import MenuItem from '@mui/material/MenuItem'
import { Controller } from 'react-hook-form'
import { FormHelperText, Stack } from '@mui/material'

const CustFormControl = styled(FormControl)(({ theme }) => ({
  [`& fieldset`]: {
    borderRadius: 30,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[400],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.secondary.main,
      transition: '.2s',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.mode === 'light' ? theme.palette.secondary.main : theme.palette.primary.main,
    },
  },
}))

export default function SelectMenu({ name, label, control, value, defualtValue, onSelectChange, children, menuItems, placeholder, ...props }) {
  const labelId = `${name}-label`

  return (
    <CustFormControl component='fieldset' margin='normal' fullWidth variant='outlined'>
      <Controller
        name={name}
        control={control}
        defaultValue={defualtValue}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <Stack>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
              value={value}
              labelId={labelId}
              label={label}
              onChange={(event) => {
                onSelectChange(event)
                onChange(event)
                onBlur(event)
              }}
            >
              <MenuItem disabled value=''>
                <em>{placeholder}</em>
              </MenuItem>
              {menuItems.map((menuItem) => (
                <MenuItem key={menuItem.key} value={menuItem.value}>
                  {menuItem.value}
                </MenuItem>
              ))}
            </Select>
            {!!error && (
              <FormHelperText error sx={{ px: 2 }}>
                {error.message}
              </FormHelperText>
            )}
          </Stack>
        )}
      />
    </CustFormControl>
  )
}
