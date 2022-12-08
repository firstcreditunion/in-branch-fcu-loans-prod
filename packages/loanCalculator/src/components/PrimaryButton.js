import React, { Children } from 'react'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const MuiPrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.purple,
  color: theme.palette.common.white,
  borderRadius: '49px',
  width: '250px',
  height: '49px',
  border: 'none',
  textTransform: 'uppercase',
  fontWeight: 400,
  transition: '.5s',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))

const MuiSecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.green,
  color: theme.palette.common.white,
  borderRadius: '49px',
  width: '250px',
  height: '49px',
  border: 'none',
  textTransform: 'uppercase',
  fontWeight: 400,
  transition: '.5s',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))

const PrimaryButton = ({ buttonText, ...props }) => {
  return (
    <MuiPrimaryButton type='submit' fullWidth variant='contained' {...props}>
      {buttonText}
    </MuiPrimaryButton>
  )
}

export default PrimaryButton
