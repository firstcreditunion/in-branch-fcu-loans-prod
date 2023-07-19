import React, { useEffect, useState } from 'react'

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
import RFHTextField from '../../components/RHF-mui-compoments/RHFTextField'
import RHFCodes from '../../components/RHF-mui-compoments/RHFCodes'

import useMediaQuery from '@mui/material/useMediaQuery'

import CognitoChangePassword from './CognitoChangePassword'

export default function AuthLoginForm() {
  // const { login, register } = useAuthContext()
  const dispatch = useDispatch()

  const forgot_emailaddress = useSelector((state) => state.forgotpasswordReducer.emailaddress)
  const forgotPasswordStage = useSelector((state) => state.forgotpasswordReducer.forgotPasswordStage)

  const LoginSchema = Yup.object().shape({
    forgot_emailAddress: Yup.string().required('Email is required').email('Email must be a valid email address'),
  })

  const defaultValues = {
    forgot_emailaddress: forgot_emailaddress,
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods

  const getUser = (event) => {
    const user = new CognitoUser({
      Username: forgot_emailaddress,
      Pool: UserPool,
    })

    return user
  }

  const sendCode = (event) => {
    event.preventDefault()
    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log('On Success: ', data)
      },
      onFailure: (err) => {
        console.log('On Failure: ', err)
      },
      inputVerificationCode: (data) => {
        console.log('Input Verification Code: ', data)
        dispatch(forgotPasswordActions.setForgotPasswordStage(2))
      },
    })
  }

  function onEmailAddressChange(event) {
    dispatch(forgotPasswordActions.setEmailAddress(event.target.value))
  }

  return (
    <>
      {forgotPasswordStage === 1 && (
        <FormProvider methods={methods} onSubmit={sendCode}>
          <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={3} sx={{ display: 'block', width: '100%' }}>
            {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}

            <RFHTextField name='forgot_emailAddress' label='Work Email Address' onInputChange={onEmailAddressChange} value={forgot_emailAddress} />

            <Button
              fullWidth
              color='primary'
              size='large'
              type='submit'
              variant='contained'
              sx={{
                borderRadius: '25px',
                bgcolor: 'primary.main',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                },
              }}
            >
              Request Password
            </Button>

            <Button href='/signin' fullWidth color='secondary' variant='text' startIcon={<ArrowBackIosNewIcon />} disableFocusRipple={true} disableRipple={true}>
              Return to Sign In
            </Button>
          </Stack>
        </FormProvider>
      )}

      {forgotPasswordStage === 2 && <CognitoChangePassword />}
    </>
  )
}
