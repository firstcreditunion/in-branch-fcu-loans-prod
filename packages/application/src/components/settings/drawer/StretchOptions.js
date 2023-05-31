import React from 'react'

// @mui
import { Stack, Box } from '@mui/material'
//
import { useSettingsContext } from '../SettingContext'

import { StyledCard } from '../styles'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
// ----------------------------------------------------------------------

export default function StretchOptions() {
  const { themeStretch, onToggleStretch } = useSettingsContext()

  return (
    <StyledCard selected={themeStretch} onClick={onToggleStretch} sx={{ height: 48, px: 1 }}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          width: 0.24,
          transition: (theme) => theme.transitions.create('width'),
          ...(themeStretch && {
            width: 0.5,
          }),
        }}
      >
        {themeStretch ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}

        <Box sx={{ flexGrow: 1, borderBottom: `dashed 1.5px currentcolor` }} />

        {themeStretch ? <ArrowForwardIosIcon /> : <ArrowBackIosIcon />}
      </Stack>
    </StyledCard>
  )
}
