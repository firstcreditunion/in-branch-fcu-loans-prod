import React from 'react'

import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

import { Link as RouterLink } from 'react-router-dom'

import { styled } from '@mui/material/styles'
import { Grid, Button, Link, Divider, Container, Typography, IconButton, Stack, Icon, Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import { PATH_PAGE } from '../routes/paths'
import { SOCIAL_PAGE } from '../routes/paths'

const RootStyle = styled('div')(({ theme }) => ({
  paddingBottom: '2.5rem',
  backgroundColor: theme.palette.background.default,
  // [theme.breakpoints.up('md')]: {
  //   height: '5rem',
  // },
}))

export default function MainFooter() {
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const currentYear = new Date().getFullYear()

  console.log('Year - ', currentYear)

  return (
    <RootStyle>
      <Box
        sx={{
          clear: 'both',
          position: 'relative',
          width: '100%',
          height: '2.5rem',
          marginTop: '-2.5rem',
        }}
      >
        <Divider />
        <Container maxWidth='lg'>
          <Grid container direction='column' sx={{ my: 3 }}>
            <Stack spacing={1} direction='row' justifyContent={downSm ? 'center' : 'flex-start'} sx={{ my: 1, flexWrap: 'wrap' }}>
              <IconButton color='secondary' href={SOCIAL_PAGE.facebook}>
                <FacebookIcon />
              </IconButton>
              <IconButton color='secondary' href={SOCIAL_PAGE.twitter}>
                <TwitterIcon />
              </IconButton>
              <IconButton color='secondary' href={SOCIAL_PAGE.instagram}>
                <InstagramIcon />
              </IconButton>
            </Stack>
            <Stack direction={downSm ? 'column' : 'row'} spacing={downSm ? 1 : 0} sx={{ pb: 5 }}>
              <Typography
                component='p'
                variant='overline'
                sx={{
                  fontSize: 13,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                © {currentYear} First Credit Union
              </Typography>
              <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
              <Link
                href={PATH_PAGE.about}
                variant='body2'
                color='inherit'
                underline='hover'
                sx={{
                  fontSize: 13,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                About Us
              </Link>
              <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
              <Link
                href={PATH_PAGE.contact}
                variant='body2'
                color='inherit'
                underline='hover'
                sx={{
                  fontSize: 13,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Contact Us
              </Link>
              <Divider orientation='vertical' flexItem sx={{ mx: 1 }} />
              <Link
                href={PATH_PAGE.privacypolicy}
                variant='body2'
                color='inherit'
                underline='hover'
                sx={{
                  fontSize: 13,
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                Privacy Policy
              </Link>
            </Stack>
          </Grid>
        </Container>
      </Box>
    </RootStyle>
  )
}
