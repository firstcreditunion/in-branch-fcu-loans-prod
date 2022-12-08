import React from 'react'
import { Redirect } from 'react-router-dom'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

import { styled } from '@mui/material/styles'

import { useDispatch, useSelector } from 'react-redux'

import { PRIMARY, SECONDARY } from '../../theme/palette'

import Page from '../../components/Page'
import Prequalify from './PrequalifyFirstLoan'

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

export default function PrequalifyForLoan() {
  // if (memberInstance === null || memberInstance === undefined) {
  //   return <Redirect to={'/LoanPrerequisites'} />
  // }

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <RootStyle title='Personal Loan Prequalify | FCU'>
      <Box
        sx={{
          minHeight: '80vh',
          margin: 0,
          pt: 3,
          pb: 1,
        }}
      >
        <Container maxWidth='lg'>
          <Card sx={{ py: 5, px: downSm ? 1 : 5 }}>
            <Stack direction='column' spacing={3} alignItems='center'>
              <Stack direction='column' spacing={1} alignItems='center'>
                <Typography variant='h4' color='primary' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light' }}>
                  Preliminary Questions
                </Typography>
              </Stack>
              <Prequalify />
            </Stack>
          </Card>
        </Container>
      </Box>
    </RootStyle>
  )
}
