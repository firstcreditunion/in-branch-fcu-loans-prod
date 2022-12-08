import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

// MUI
import { styled } from '@mui/material/styles'
import { Button, Typography, Container, Box, Paper, Divider } from '@mui/material'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'

import { useDispatch, useSelector } from 'react-redux'

import Page from '../../components/Page'
import { Stack } from '@mui/material'

import useResponsive from '../../hooks/useResponsive'

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.secondary,
}))

function Prerequisites() {
  const prerequisiteItems = [
    { id: 1, title: 'Age', content: 'You must be at least 18 years old.' },
    { id: 2, title: 'Identity', content: 'Provide proof of your identity.' },
    { id: 3, title: 'Income', content: 'Must earn regular income to meet your daily expenses and to pay off your loan.' },
    { id: 4, title: 'Citizenship', content: 'Be a citizen of New Zealand or a permanent resident of New Zealand.' },
  ]

  return (
    <ul>
      {prerequisiteItems.map((item) => {
        return (
          <li>
            <Typography variant='body2' sx={{ py: 1 }}>
              {item.content}
            </Typography>
          </li>
        )
      })}
    </ul>
  )
}

export default function PrequalifyReirect() {
  const isNzCitizen = useSelector((state) => state.lendingCritetiaQnsReducer.isNzCitizen.value)
  const isNzResident = useSelector((state) => state.lendingCritetiaQnsReducer.isNzResident.value)
  const hasWorkPermit = useSelector((state) => state.lendingCritetiaQnsReducer.hasWorkPermit.value)
  const hasRegularIncome = useSelector((state) => state.lendingCritetiaQnsReducer.hasRegularIncome.value)

  function IneligibleItems() {
    const prerequisiteItems = [
      { id: 1, title: 'Income', content: 'You must earn regular income to meet your daily expenses and to pay off your loan.', showItem: hasRegularIncome },
      { id: 2, title: 'Citizenship', content: 'You should be a citizen of New Zealand or hold a New Zealand residency visa or hold a work visa', showItem: isNzCitizen && isNzResident && hasWorkPermit },
    ]

    const itemsToShow = prerequisiteItems.filter((item) => {
      return item.showItem === false
    })

    return (
      <ul>
        {itemsToShow.map((item) => {
          return (
            <Stack>
              <li>
                <Typography variant='body2' sx={{ py: 1 }}>
                  {item.content}
                </Typography>
              </li>
            </Stack>
          )
        })}
      </ul>
    )
  }

  const smDown = useResponsive('down', 'sm')
  const mdDown = useResponsive('down', 'md')

  const tradingBranch = useSelector((state) => state.lendingCritetiaQnsReducer.tradingBranch)

  return (
    <Page title='Personal Loan Eligibility | FCU' sx={{ height: 1 }}>
      <RootStyle>
        <Container maxWidth='md'>
          <Paper elevation={smDown ? 0 : 24} square={smDown ? true : false} sx={{ pb: 3, borderRadius: 3 }}>
            <Box sx={{ textAlign: 'center', py: mdDown ? 2 : 3 }}>
              <Typography variant='h6' paragraph>
                Eligibility Criteria was not Satisfied
              </Typography>
            </Box>
            <Subtitle sx={{ pl: smDown ? 1 : 5, pb: 1 }}>Unfortunatley, the following lending criteria were not met, including:</Subtitle>
            <Box sx={{ px: smDown ? 3 : 7.3, mb: 4 }}>
              <IneligibleItems />
            </Box>
            <Box sx={{ px: smDown ? 1 : 5 }}>
              <Divider />
            </Box>
            <Box sx={{ mt: 4 }}>
              <Box sx={{ textAlign: 'flex-start', pl: smDown ? 1 : 5, pb: 1, m: 0 }}>
                <Subtitle>You are required to meet our lending criteria to apply:</Subtitle>
              </Box>
              <Box sx={{ px: smDown ? 3 : 7.3 }}>
                <Prerequisites />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <Button variant='contained' sx={{ borderRadius: 32 }} startIcon={<HomeRoundedIcon />} href='https://www.firstcreditunion.co.nz/'>
                Home
              </Button>
            </Box>
          </Paper>
        </Container>
      </RootStyle>
    </Page>
  )
}
