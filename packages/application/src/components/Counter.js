import React from 'react'

import { Box, IconButton, Typography, Stack } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import TextField_Custom from '../components/ui/mui-custom-styled-components/TextField_Custom'

export default function Incrementer({ count, label, maxValue, onIncrementCount, onDecrementCount, disabled = false }) {
  return (
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
          borderColor: 'grey.50032',
        }}
      >
        <IconButton size='small' disabled={count < 1 || disabled === true} onClick={onDecrementCount} sx={{ color: (theme) => (theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main) }}>
          <RemoveCircleIcon width={14} height={14} />
        </IconButton>

        <Typography variant='body1' component='span' sx={{ width: 40, textAlign: 'center' }}>
          {count}
        </Typography>

        <IconButton size='small' disabled={count >= maxValue || disabled === true} onClick={onIncrementCount} sx={{ color: (theme) => (theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main) }}>
          <AddCircleIcon width={14} height={14} />
        </IconButton>
      </Box>
      <Typography variant='caption' component='div' sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
        {label}
      </Typography>
    </Stack>
  )
}
