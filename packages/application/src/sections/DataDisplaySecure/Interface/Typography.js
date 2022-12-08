import React from 'react'

// MUI
import Typography from '@mui/material/Typography'

// MUI - Styles
import { styled } from '@mui/material/styles'

export const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.overline,
  color: theme.palette.text.secondary,
  fontWeight: 500,
}))

export const Data = styled(Typography)(({ theme }) => ({
  ...theme.typography.h6,
  color: '#2F4858',
  fontWeight: 500,
}))
