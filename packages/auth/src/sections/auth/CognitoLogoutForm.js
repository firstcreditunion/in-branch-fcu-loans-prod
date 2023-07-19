import React, { useEffect, useState, useContext } from 'react'

import { Link as RouterLink } from 'react-router-dom'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordActions } from '../../redux/slices/forgotpasswordSlice'

//* RHF And YUP
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//* AWS Cognito
import { CognitoUser } from 'amazon-cognito-identity-js'
import UserPool from '../../cognito/UserPool'

//* MUI
import { Link, Stack, Alert, Typography, IconButton, InputAdornment, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

//* Custom Components
import FormProvider from '../../components/RHF-mui-compoments/FormProvider'
// import RFHTextField from '../../components/RHF-mui-compoments/RHFTextField'
import RHFCodes from '../../components/RHF-mui-compoments/RHFCodes'

import useMediaQuery from '@mui/material/useMediaQuery'
import CognitoChangePassword from './CognitoChangePassword'

//* AWS Cognito
import { LoginContext } from '../../cognito/UserAccount'

export default function AuthLogoutForm() {
  const { userLogout } = useContext(LoginContext)

  useEffect(() => {
    console.log('Logout Form mounted')
    userLogout()
  }, [])

  return (
    <FormProvider>
      <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={3} sx={{ display: 'block', width: '100%' }}>
        <Button href='/signin' fullWidth color='secondary' variant='text' startIcon={<ArrowBackIosNewIcon />} disableFocusRipple={true} disableRipple={true}>
          Return to Sign In
        </Button>
      </Stack>
    </FormProvider>
  )
}
