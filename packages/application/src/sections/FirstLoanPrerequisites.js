import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { useDispatch, useSelector } from 'react-redux'
import { globalActions, getGuestSessionOnlineApplication, getRefreshTokenOnline, getGuestSessionInternetBanking } from '../redux/slices/globalSlice'

// API Constants
import { BASE_URL_LOCAL_AUTH, BASE_URL_AWS_AUTH, processNodeEnv, BASE_URL_LOCAL_APP } from '../redux/utils/apiConstants'

import { motion, MotionConfig } from 'framer-motion'

import { PRIMARY, SECONDARY } from '../theme/palette'

import { Container, Box, Paper, Typography, Divider, Chip, Stack, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import useResponsive from '../hooks/useResponsive'

import Page from '../components/Page'

const Subtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.secondary,
}))

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

export default function FirstLoanPrerequisites({ setGuestSession }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [guestToken, setGuestToken] = React.useState(null)

  const guestSessionID = useSelector((state) => state.globalReducer.guestSessionID)
  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  const smUp = useResponsive('up', 'sm')
  const mdUp = useResponsive('up', 'md')

  const smDown = useResponsive('down', 'sm')
  const mdDown = useResponsive('down', 'md')

  function Prerequisites() {
    const prerequisiteItems = [
      { id: 1, title: 'Age', content: 'You must be at least 18 years old.' },
      { id: 2, title: 'Identity', content: 'Provide proof of your identity.' },
      { id: 3, title: 'Income', content: 'Must earn regular income to meet your daily expenses and to pay off your loan.' },
      { id: 4, title: 'Citizenship', content: 'Be a citizen of New Zealand or a permanent resident of New Zealand.' },
    ]

    return (
      <ul key='prerequisites'>
        {prerequisiteItems.map((item) => {
          return (
            <li key={item.id}>
              <Typography variant='body2' sx={{ py: 1 }}>
                {item.content}
              </Typography>
            </li>
          )
        })}
      </ul>
    )
  }

  function OtherInformation() {
    const otherInfoItems = [
      { id: 1, title: 'Income and Expenses', content: 'Your income and expenses.' },
      { id: 2, title: 'Assets and Liabilities', content: 'Your assets and liabilities.' },
      { id: 3, title: 'Income', content: 'Your bank account statements for the last 3 months (we will contact you when we need this).' },
    ]

    return (
      <ul key='otherInformation'>
        {otherInfoItems.map((item) => {
          return (
            <li key={item.id}>
              <Typography variant='body2' sx={{ py: 1 }}>
                {item.content}
              </Typography>
            </li>
          )
        })}
      </ul>
    )
  }

  //* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ONLINE GUEST TOKEN <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< //

  function getGuestTokenForOnlineApplication() {
    const currentGuestSessionId = uuidv4()

    const guestSessionConfig = {
      url: '/guesttoken',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_AUTH : BASE_URL_AWS_AUTH}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      withCredentials: true,
      data: JSON.stringify({
        SID: currentGuestSessionId,
      }),
    }
    dispatch(getGuestSessionOnlineApplication(guestSessionConfig))
  }

  useEffect(() => {
    if (guestSessionID == null) return

    if (guestSessionID) {
      history.push('/application/prequalify')
    }
  }, [guestSessionID])

  return (
    <RootStyle title='Personal Loan Prerequisite | FCU'>
      <Box sx={{ minHeight: '100vh', my: 5 }}>
        <Container maxWidth='md'>
          <Paper elevation={smDown ? 0 : 24} square={smDown ? true : false} sx={{ pb: 3, borderRadius: 3 }}>
            <Box sx={{ textAlign: 'center', py: mdDown ? 3 : 5 }}>
              <Typography variant='h4' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Apply for First Loan
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ textAlign: 'flex-start', pl: smDown ? 1 : 5, pb: 1, m: 0 }}>
                <Subtitle>You are required to meet our lending criteria before you apply:</Subtitle>
              </Box>
              <Box sx={{ px: smDown ? 3 : 7.3 }}>
                <Prerequisites />
              </Box>
            </Box>
            <Box sx={{ px: smDown ? 1 : 5 }}>
              <Divider />
            </Box>
            <Box sx={{ mt: 4, mb: 4 }}>
              <Box sx={{ textAlign: 'flex-start', pl: smDown ? 1 : 5, pb: 1, m: 0 }}>
                <Subtitle>Other information required to apply:</Subtitle>
              </Box>
              <Box sx={{ px: smDown ? 3 : 7.3 }}>
                <OtherInformation />
              </Box>
            </Box>
            <Box sx={{ px: smDown ? 1 : 5 }}>
              <Divider>
                <Chip color='primary' label='IMPORTANT' />
              </Divider>
            </Box>
            <Box sx={{ mt: 4, mb: 4 }}>
              {/* <Box sx={{ textAlign: 'flex-start', pl: smDown ? 1 : 5, pb: 1, m: 0 }}>
              <Subtitle>Financial advice:</Subtitle>
            </Box> */}
              <Box sx={{ px: smDown ? 3 : 7.3 }}>
                <Stack direction='column' spacing={3}>
                  <Typography variant='body2'>You are protected by responsible lending laws. Because of these protections, the recommendations given to you about our first loans are not regulated financial advice.</Typography>
                  <Typography variant='body2'>This means that duties and requirements imposed on people who give financial advice do not apply to these recommendations. This includes a duty to comply with a code of conduct and a requirement to be licensed.</Typography>
                </Stack>
              </Box>
            </Box>
            <Box sx={{ px: smDown ? 1 : 5 }}>
              <Divider />
            </Box>
            <Box sx={{ mt: 4, mb: 4 }}>
              {/* <Box sx={{ textAlign: 'flex-start', pl: smDown ? 1 : 5, pb: 1, m: 0 }}>
                <Subtitle>Start you first loan application</Subtitle>
              </Box> */}
              <Box sx={{ px: smDown ? 3 : 7.3 }}>
                <Stack direction='column' spacing={3}>
                  {/* For future use */}
                  {/* <Typography variant='body2'>If you apply through First Credit Union internet banking, your application can be completed faster. </Typography> */}
                  <Stack direction={smDown ? 'column' : 'row'} justifyContent='center' alignItems='center' spacing={2}>
                    <Button onClick={getGuestTokenForOnlineApplication} variant='contained' color='secondary' sx={{ borderRadius: 49 }}>
                      Apply Online
                    </Button>
                    {/* {false && (
                      <Button variant='contained' component={RouterLink} to='/auth/signin' disabled={false} color='primary' sx={{ borderRadius: 49 }}>
                        Apply through Internet Banking
                      </Button>
                    )} */}
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </RootStyle>
  )
}
