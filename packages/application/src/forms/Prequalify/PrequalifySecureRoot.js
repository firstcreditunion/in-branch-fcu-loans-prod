import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

// Framer
import { motion } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

import { styled } from '@mui/material/styles'
import { Box, Card, Typography, Stack, Container } from '@mui/material'
import { Divider } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useDispatch, useSelector } from 'react-redux'

import Page from '../../components/Page'
import PrequalifySecure from './PrequalifySecure'

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

export default function PrequalifySecureRoot({ memberInstance }) {
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const varTitle = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inDown

  const varSubtitle = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inLeft

  const title = memberInstance?.data?.data?.body?.data?.attributes?.generalDetails?.individualDetails?.title
  const surname = memberInstance?.data?.data?.body?.data?.attributes?.generalDetails?.individualDetails?.surname

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

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
              <Stack direction='column' spacing={0} alignItems='center'>
                <Box component={motion.div} {...varTitle} sx={{ textAlign: 'flex-start' }}>
                  <Typography variant='h5' sx={{ color: '#424242' }}>
                    Welcome, {title} {surname}!
                  </Typography>
                </Box>
                <Box component={motion.div} {...varSubtitle}>
                  <Typography variant='caption' sx={{ color: '#757575' }}>
                    Start you loan application here.
                  </Typography>
                </Box>
              </Stack>
              <Box sx={{ display: 'flex' }}>
                <Divider />
              </Box>
              <PrequalifySecure />
            </Stack>
          </Card>
        </Container>
      </Box>
    </RootStyle>
  )
}

// <motion.div variants={varFade().inUp}>
//                   <Typography variant='h5' sx={{ color: '#616161' }}>
//                     Welcome Back, {title} {surname}
//                   </Typography>
//                 </motion.div>
//                 <motion.div variants={varFade().inUp}>
//                   <Typography component={motion.div} sx={{ color: '#9e9e9e' }}>
//                     Start you application here.
//                   </Typography>
//                 </motion.div>
