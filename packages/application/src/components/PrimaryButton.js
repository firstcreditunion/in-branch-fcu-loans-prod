import React, { Children } from 'react'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

const PrimayButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.common.purple,
  color: theme.palette.common.white,
  borderRadius: '49px',
  width: '150px',
  height: '49px',
  border: 'none',
  textTransform: 'uppercase',
  fontWeight: 600,
  transition: '.5s',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}))

const PrimaryButton = ({ buttonText, ...props }) => {
  return (
    <PrimayButton type='submit' fullWidth variant='contained' color='primary' {...props}>
      {buttonText}
    </PrimayButton>
  )
}

export default PrimaryButton
