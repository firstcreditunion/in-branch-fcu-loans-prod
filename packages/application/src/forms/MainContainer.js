import React from 'react'
import Container from '@mui/material/Container'

import { styled } from '@mui/material/styles'

const CustContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  flexDirection: 'column',
  alignItems: 'center',
}))

const MainContainer = ({ children, maxWidth, ...props }) => {
  return (
    <CustContainer component='main' maxWidth={maxWidth} {...props}>
      {children}
    </CustContainer>
  )
}

export default MainContainer
