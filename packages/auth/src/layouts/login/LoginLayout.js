import React from 'react'

import PropTypes from 'prop-types'

//* MUI
import { Typography, Stack, Box } from '@mui/material'

import Logo from '../../components/Logo'
import MotionLogo from '../../components/MotionLogo'

import Coworking from '../../components/CoWorking'
import Hello from '../../components/Hello'

//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles'

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
}

export default function LoginLayout({ children, illustration, title }) {
  return (
    <Box sx={{ width: '50%', minHeight: '100vh' }}>
      <MotionLogo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      {/* <Box sx={{ display: 'flex', width: '100%', maxWidth: '700' }}>
          <Hello />
        </Box> */}
    </Box>
  )
}
