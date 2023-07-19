import React from 'react'

import { Stack, Typography } from '@mui/material'

import WarningIcon from '@mui/icons-material/Warning'

const NotFound = ({ noFoundText, priorityColor }) => {
  return (
    <Stack direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%', height: 100, py: 2 }}>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} sx={{ width: '100%', height: '100%' }}>
        <WarningIcon color={priorityColor} />
        <Typography variant='h5' color='warning.main' sx={{ fontWeight: 'light', color: priorityColor, textTransform: 'uppercase' }}>
          {noFoundText}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default NotFound
