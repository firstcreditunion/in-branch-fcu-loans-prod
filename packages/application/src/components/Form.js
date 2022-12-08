import React from 'react'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'

const CustFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}))

const Form = ({ children, ...props }) => {
  return (
    <form noValidate autoComplete='off' {...props}>
      {children}
    </form>
  )
}

export default Form
