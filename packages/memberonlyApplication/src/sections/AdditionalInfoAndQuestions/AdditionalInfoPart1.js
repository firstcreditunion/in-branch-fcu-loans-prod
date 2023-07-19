import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, Box, Paper, Divider, FormControl, Switch } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Unstable_Grid2'

import RFHCreditScore from '../../forms/AdditionalInformation/RFHCreditScore'

const AdditionalInfoAndQuestions = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ minWidth: '100%', minHeight: '100%' }}>
      <Typography
        variant='h4'
        color='primary'
        sx={{
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 'light',
          letterSpacing: 3,
        }}
      >
        Sutability Test - Part 1
      </Typography>
      <Grid
        container
        alignItems='center'
        justifyContent='center'
        spacing={10}
        sx={{
          width: '100%',
        }}
      >
        <Grid md={8}>
          <RFHCreditScore />
        </Grid>
        {/* <Grid md={6}>
          <RFHCreditScore />
        </Grid> */}
      </Grid>
      {/* <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{ display: 'block', width: '100%' }}>
        <RFHCreditScore />
        <RFHCreditScore />
      </Stack> */}
    </Stack>
  )
}

export default AdditionalInfoAndQuestions
