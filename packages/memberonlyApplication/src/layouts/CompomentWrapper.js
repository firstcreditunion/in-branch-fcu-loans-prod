import React from 'react'
import { Stack, Typography } from '@mui/material'

export default function ComponentWrapper({ label = 'RHFTextField', typographyVariant, labelChildrenSpacing, color, textAlign, fontWeight, sx, children }) {
  return (
    <Stack spacing={labelChildrenSpacing} sx={{ width: 1, ...sx }}>
      <Typography
        variant={typographyVariant}
        sx={{
          textAlign: 'right',
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
