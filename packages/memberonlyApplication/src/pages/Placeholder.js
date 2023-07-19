import React from 'react'
import { Helmet } from 'react-helmet-async'

import { Stack, Typography } from '@mui/material'

export default function Placeholder() {
  return (
    <>
      <Helmet>
        <title> Placeholder | FCU Loans</title>
      </Helmet>
      <Stack direction='row' justifyContent='center' alignItems='center' sx={{ flexGrow: 1, height: '100vh' }}>
        <Typography variant='h1' color='primary' sx={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          Placeholder
        </Typography>
      </Stack>
    </>
  )
}
