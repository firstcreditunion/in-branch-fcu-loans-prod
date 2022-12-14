import React from 'react'
import PropTypes from 'prop-types'

// Framer
import { motion } from 'framer-motion'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Stack from '@mui/material/Stack'
import Slide from '@mui/material/Slide'
import useMediaQuery from '@mui/material/useMediaQuery'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'

import { useDispatch, useSelector } from 'react-redux'
import { globalActions } from '../redux/slices/globalSlice'

import useSettings from '../hooks/useSettings'

import { styled } from '@mui/material/styles'

import { Link as RouterLink } from 'react-router-dom'

import Logo from './Logo'
import MotionLogo from './MotionLogo'
import Image from '../components/Image'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}))

const LoginButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: '30px',
  border: 'none',
  textTransform: 'uppercase',
  transition: '.5s',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}))

const SignOut = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: '30px',
  border: 'none',
  textTransform: 'uppercase',
  transition: '.5s',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}))

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = 1 + i * 0.5
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    }
  },
}

function HideOnScroll(props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default function ButtonAppBar(props) {
  const dispatch = useDispatch()
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const themeMode = useSelector((state) => state.globalReducer.themeMode)

  // function onSignOutClick() {
  //   if (isSignedIn && onSignOut) {
  //     onSignOut()
  //   }
  // }

  function handleTheme() {
    if (themeMode === 'light') {
      dispatch(globalActions.setThemeMode('dark'))
      return
    }

    dispatch(globalActions.setThemeMode('light'))
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar position='static' sx={{ boxShadow: 2, backgroundColor: (theme) => theme.palette.common.white }}>
          <Toolbar>
            <Stack direction='row' justifyContent='flex-end' alignItems='center' sx={{ flexGrow: 1 }}>
              {/* <Typography variant='h6' noWrap component='div' color='secondary' sx={{ mr: 2 }}>
                LOGO
              </Typography> */}
              <MotionLogo />

              {/* <Image visibleByDefault disabledEffect src='/assets/illustrations/logo/firstloansvg.png' alt='logo' sx={{ height: 24, mb: 3 }} /> */}
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* <LoginButton color='secondary' variant='outlined' component={Roucd loginterLink} to={'/auth/signin'} sx={{ mr: '1rem' }}>
              Login
            </LoginButton> */}

                {/* {isSignedIn && (
                <SignOut color='secondary' variant='contained' onClick={onSignOutClick} sx={{ maxHeight: '40px' }}>
                  SignOut
                </SignOut>
              )} */}
              </Box>
              {/* <MaterialUISwitch sx={{ m: 1 }} value={'light'} defaultChecked onChange={handleTheme} /> */}
            </Stack>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  )
}

// git control 4
