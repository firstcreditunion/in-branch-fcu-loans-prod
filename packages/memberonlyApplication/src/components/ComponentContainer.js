import React from 'react'

//* MUI
import { Stack, Typography } from '@mui/material'

function Block({ label = 'RHFTextField', sx, children }) {
  return (
    <Stack spacing={1} sx={{ width: 1, ...sx }}>
      <Typography
        variant='caption'
        sx={{
          textAlign: 'left',
          fontWeight: 'light',
          color: 'text.disabled',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  )
}
