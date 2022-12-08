import React from 'react'
// MUI
import { Stack, Typography, Box, CircularProgress } from '@mui/material'

import { fShortenNumber, fCurrency, fPercent } from '../utils/formatNumber'
// Icon
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

// ----------------------------------------------------------------------

export default function InvoiceAnalytic({ title, currentStep, totalSteps, color, percent, price }) {
  return (
    <Stack direction='column' justifyContent='center' alignItems='flex-end'>
      <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
        <Stack alignItems='center' justifyContent='center' sx={{ position: 'relative' }}>
          <Typography variant='overline' sx={{ m: 0, p: 0, width: 20, height: 20, position: 'absolute' }}>
            {fPercent(percent)}
          </Typography>
          <CircularProgress variant='determinate' value={percent} size={50} thickness={4} sx={{ color: 'primary.main', opacity: 0.7 }} />
          <CircularProgress variant='determinate' value={100} size={50} thickness={4} sx={{ color: 'grey.50016', position: 'absolute', top: 0, left: 0, opacity: 0.48 }} />
        </Stack>
        <Typography variant='overline' color='text.secondary' sx={{ fontWeight: 400, fontSize: 10 }}>
          {title}
        </Typography>
      </Stack>
    </Stack>
  )
}
