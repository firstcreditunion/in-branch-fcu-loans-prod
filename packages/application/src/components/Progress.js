import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, Typography, Stack, LinearProgress } from '@mui/material'
import { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles'

import { fPercent } from '../utils/formatNumber'

ProgressItem.propTypes = {
  progress: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.number,
  }),
}

const CurrentStepProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 600],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.secondary.main,
  },
}))

function ProgressItem({ progress }) {
  return (
    <Stack spacing={1}>
      <Stack direction='row' alignItems='center'>
        <Typography variant='subtitle2' sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>
        <Typography variant='caption' sx={{ color: 'text.secondary' }}>
          &nbsp;{fPercent(progress.value)}
        </Typography>
      </Stack>
      <CurrentStepProgress variant='determinate' value={progress.value} />
    </Stack>
  )
}

const Progress = (progressProp) => {
  return (
    <Stack spacing={4} sx={{ p: 3 }}>
      <ProgressItem key={progressProp.progressProp} progress={progressProp.progressProp} />
    </Stack>
  )
}

export default Progress
