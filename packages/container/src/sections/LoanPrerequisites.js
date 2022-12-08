import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import { v4 as uuidv4 } from 'uuid'

import { Container, Box, Paper, Typography, Divider, Chip, Stack, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { PRIMARY, SECONDARY } from '../theme/palette'

import useResponsive from '../hooks/useResponsive'

import Page from '../components/Page'

const Subtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.secondary,
}))

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

export default function LoanPrerequisites() {
  const history = useHistory()

  const smUp = useResponsive('up', 'sm')
  const mdUp = useResponsive('up', 'md')

  const smDown = useResponsive('down', 'sm')
  const mdDown = useResponsive('down', 'md')

  function Prerequisites() {
    const prerequisiteItems = [
      { id: 1, title: 'Age', content: 'Be at least 18 years of age.' },
      { id: 2, title: 'Identity', content: 'Providing proof of your identity and income.' },
      { id: 3, title: 'Income', content: 'Earn a regular income.' },
      { id: 4, title: 'Citizenship', content: 'Be a New Zealand citizen or permanent resident, or have a valid NZ work visa.' },
      { id: 5, title: 'Affordibility', content: 'Be able to meet your monthly expenses including your new loan committments.' },
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
      { id: 2, title: 'Assets and Liabilities', content: 'Your assests and debts.' },
      { id: 3, title: 'Income', content: 'Your bank account statements for the last 90 days, we will contact you if we need to verify your income and expenses.' },
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <RootStyle title='Personal Loan Prerequisite | FCU'>
      <Box sx={{ minHeight: '100vh', my: 5 }}>
        <Container maxWidth='md'>
          <Paper elevation={smDown ? 0 : 24} square={smDown ? true : false} sx={{ pb: 3, borderRadius: 3 }}>
            <Box sx={{ textAlign: 'center', py: mdDown ? 3 : 5 }}>
              <Typography variant='h4' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                Applying for a Personal Loan
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ textAlign: 'flex-start', pl: smDown ? 1 : 5, pb: 1, m: 0 }}>
                <Subtitle>You must meet our lending requirements to apply:</Subtitle>
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
                <Subtitle>Additional information required to apply:</Subtitle>
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
                  <Typography variant='body2'>You are protected by responsible lending laws. Because of these protections, the recommendations given to you about our personal loans are not regulated financial advice.</Typography>
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
              <Box sx={{ px: smDown ? 0 : 7.3 }}>
                <Stack direction='column' spacing={3}>
                  {/* For future use */}
                  {/* <Typography variant='body2'>If you apply through First Credit Union internet banking, your application can be completed faster. </Typography> */}
                  <Stack direction={smDown ? 'column' : 'row'} justifyContent='center' alignItems='center' spacing={2}>
                    <Button variant='contained' component={RouterLink} to='/application/prequalify' color='secondary' sx={{ borderRadius: 49 }}>
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
