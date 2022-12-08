import React, { useEffect } from 'react'
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom'

// MUI
import { Container, Box, Grid, Stack, Divider, Button, useMediaQuery, Card, Typography, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'

import { PRIMARY, SECONDARY } from '../theme/palette'

// MUI - List
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'

// MUI - Icons
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded'

// Custom
import cssStyles from '../utils/cssStyles'
import Page from '../components/Page'

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

const Title = styled(Typography)(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.secondary,
}))

const Subtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
}))

const GradientPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  backgroundImage: `linear-gradient( -20deg,${theme.palette.primary.dark} 0%,${theme.palette.primary.light} 100%)`,
}))

export default function ApplicationCompletionPlan() {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  function PersonalDetails() {
    const personalDetailItems = [
      { id: 1, title: 'Name', content: 'Name, Gender and Date of Birth.' },
      { id: 2, title: 'Marital Status', content: 'Your marital status.' },
      { id: 3, title: 'Dependents', content: 'Number of dependant adults and children.' },
    ]

    return (
      <ul key='personaldetails'>
        {personalDetailItems.map((item) => {
          return (
            <Stack direction='row' justifyContent='flex-start' alignItems='baseline' spacing={2}>
              <li key={item.id}>
                <Typography variant='body2' sx={{ py: 1, color: 'text.secondary' }}>
                  {item.content}
                </Typography>
              </li>
            </Stack>
          )
        })}
      </ul>
    )
  }

  function Identification() {
    const personalDetailItems = [
      { id: 1, title: 'Marital Status', content: 'Your marital status.' },
      { id: 2, title: 'Dependents', content: 'Number of dependant adults and children.' },
    ]

    return (
      <ul key='personaldetails'>
        {personalDetailItems.map((item) => {
          return (
            <Stack direction='row' justifyContent='flex-start' alignItems='baseline' spacing={2}>
              <li key={item.id}>
                <Typography variant='body2' sx={{ py: 1, color: 'text.secondary' }}>
                  {item.content}
                </Typography>
              </li>
            </Stack>
          )
        })}
      </ul>
    )
  }

  return (
    <RootStyle title='Review Details | First Credit Union Loans'>
      <Box
        sx={{
          minHeight: '100vh',
          margin: 0,
        }}
      >
        <Box sx={{ pt: 3 }}>
          <Container maxWidth='lg'>
            <Card sx={{ pb: 5, px: downSm ? 1 : 5, pt: downSm ? 1 : 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h4' color={(theme) => theme.palette.grey[700]} sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : PRIMARY.main), fontWeight: 'light', letterSpacing: 3, textTransform: 'uppercase' }}>
                  Review Your Details
                </Typography>
                {/* <Box sx={{ py: 3 }}>
                  <Divider />
                </Box> */}
              </Box>
              <Box sx={{ mb: 4 }}>
                <Box sx={{ textAlign: 'center', pl: downSm ? 1 : 5, pb: 1, m: 0 }}>
                  <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                    We will take you through the following details. Please verify and confirm that they are correct and up-to-date.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mb: 4 }}>
                <Container maxWidth='md'>
                  <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ px: downMd ? 1 : 10 }}>
                    <ListItem disableGutters={downSm ? true : false}>
                      {!downSm && (
                        <ListItemAvatar>
                          <PersonRoundedIcon fontSize='large' sx={{ color: 'secondary.main' }} />
                        </ListItemAvatar>
                      )}
                      <ListItemText primary={<Title sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : 'grey.700'), fontWeight: 500 }}>Personal</Title>} secondary='Make sure your personal details such as marital status, dependant adults and children are correct.' />
                    </ListItem>
                    <ListItem disableGutters={downSm ? true : false}>
                      {!downSm && (
                        <ListItemAvatar>
                          <BadgeRoundedIcon fontSize='large' sx={{ color: 'secondary.main' }} />
                        </ListItemAvatar>
                      )}
                      <ListItemText
                        primary={<Title sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : 'grey.700'), fontWeight: 500 }}>Identification</Title>}
                        secondary={
                          <Stack direction='row'>
                            <Subtitle>
                              By law, we need to properly identify and collect information about you. At least one form of ID needs to contain a photo. Please make sure we have your correct identification details. For more information,{' '}
                              <Link variant='body2' sx={{ color: 'primary.main' }} href='https://www.firstcreditunion.co.nz/assets/bb4d0e32cd/Forms-of-Identification-2022-v4.pdf' target='blank' underline='none'>
                                click here
                              </Link>
                              .
                            </Subtitle>
                          </Stack>
                        }
                      />
                    </ListItem>
                    <ListItem disableGutters={downSm ? true : false}>
                      {!downSm && (
                        <ListItemAvatar>
                          <WorkRoundedIcon fontSize='large' sx={{ color: 'secondary.main' }} />
                        </ListItemAvatar>
                      )}
                      <ListItemText primary={<Title sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : 'grey.700'), fontWeight: 500 }}>Employment Details</Title>} secondary='Please verify if the employment details are relevant at the time of application. If the duration of your current employment is less than 2 years, please provide your previous employment details.' />
                    </ListItem>
                    <ListItem disableGutters={downSm ? true : false}>
                      {!downSm && (
                        <ListItemAvatar>
                          <CallRoundedIcon fontSize='large' sx={{ color: 'secondary.main' }} />
                        </ListItemAvatar>
                      )}
                      <ListItemText primary={<Title sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : 'grey.700'), fontWeight: 500 }}>Contact Details</Title>} secondary='Please provide two methods of contact.' />
                    </ListItem>
                    <ListItem disableGutters={downSm ? true : false}>
                      {!downSm && (
                        <ListItemAvatar>
                          <HomeRoundedIcon fontSize='large' sx={{ color: 'secondary.main' }} />
                        </ListItemAvatar>
                      )}
                      <ListItemText primary={<Title sx={{ color: (theme) => (theme.palette.mode === 'dark' ? SECONDARY.main : 'grey.700'), fontWeight: 500 }}>Residential Details</Title>} secondary='Please confirm that your residential details are up-to-date. If your living situtation has changed, please make sure to add your current residential details.' />
                    </ListItem>
                  </Stack>
                </Container>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <Button variant='contained' sx={{ borderRadius: 32 }} endIcon={<ModeEditOutlineRoundedIcon />} component={RouterLink} to='/application/personal_loan-secure'>
                  Review Your details
                </Button>
              </Box>
            </Card>
          </Container>
        </Box>
      </Box>
    </RootStyle>
  )
}
