import React, { Children } from 'react'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const MuiSecondaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.green,
  color: theme.palette.common.white,
  borderRadius: '49px',
  width: '250px',
  height: '62px',
  border: 'none',
  textTransform: 'uppercase',
  fontSize: '1.2rem',
  fontWeight: 500,
  transition: '.5s',
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
  },
}))

const SecondaryButton = ({ buttonText, ...props }) => {
  return (
    <MuiSecondaryButton type='submit' fullWidth variant='contained' {...props}>
      {buttonText}
    </MuiSecondaryButton>
  )
}

export default SecondaryButton
