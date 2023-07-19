import React from 'react'

import { alpha } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import CardHeader from '@mui/material/CardHeader'
import Stack from '@mui/material/Stack'

// ----------------------------------------------------------------------

export default function ComponentBlock({ title, subheader = '', sx, children, ...other }) {
  return (
    <Paper
      variant='outlined'
      sx={{
        borderRadius: 1.5,
        borderStyle: 'dashed',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {title && <CardHeader title={title} subheader={subheader} titleTypographyProps={{ color: 'primary', variant: 'body1', fontWeight: 'light' }} subheaderTypographyProps={{ color: 'grey.700', fontWeight: 500 }} />}

      <Stack
        spacing={3}
        direction='row'
        alignItems='center'
        justifyContent='center'
        flexWrap='wrap'
        sx={{
          p: 5,
          minHeight: 180,
          ...sx,
        }}
        {...other}
      >
        {children}
      </Stack>
    </Paper>
  )
}
