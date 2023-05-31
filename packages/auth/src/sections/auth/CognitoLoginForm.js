import React, { useEffect, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'

//* AWS Cognito
import { CognitoUser, CognitoUserPool, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { authenticationActions } from '../../redux/slices/authenticationSlice'

//* RHF And YUP
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//* MUI
import { Link, Stack, Alert, Typography, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import FormProvider from '../../components/RHF-mui-compoments/FormProvider'
import RFHTextField from '../../components/RHF-mui-compoments/RFHTextField'

import useMediaQuery from '@mui/material/useMediaQuery'

export default function AuthLoginForm() {
  // const { login, register } = useAuthContext()
  const dispatch = useDispatch()
  const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const [showPassword, setShowPassword] = useState(false)

  const emailAddress = useSelector((state) => state.authenticationReducer.emailAddress)
  const password = useSelector((state) => state.authenticationReducer.password)

  // async function signUp() {
  //   return null
  // }

  const poolData = {
    UserPoolId: '',
    ClientId: '',
  }

  const UserPool = new CognitoUserPool(poolData)

  const LoginSchema = Yup.object().shape({
    emailAddress: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  })

  const defaultValues = {
    email: emailAddress,
    password: password,
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

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('Email: ', emailAddress)
    console.log('Password: ', password)
    UserPool.signUp(emailAddress, password, [], null, (err, data) => {
      console.log('Error', err)
      console.log('Data', data)
    })
  }

  function onEmailAddressChange(event) {
    dispatch(authenticationActions.setEmailAddress(event.target.value))
  }

  function onPasswordChange(event) {
    dispatch(authenticationActions.setPassword(event.target.value))
  }

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={5} sx={{ maxWidth: '500px' }}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
        <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'light', py: 3 }}>
          Sign in to FCU Loan Application{' '}
        </Typography>
        <RFHTextField name='email' label='Email Address' onInputChange={onEmailAddressChange} value={emailAddress} />

        <RFHTextField
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          onInputChange={onPasswordChange}
          value={password}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
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
          Login
        </LoadingButton>
      </Stack>

      {/* <Stack alignItems='flex-end' sx={{ my: 2 }}>
        <Link component={RouterLink} to={PATH_AUTH.resetPassword} variant='body2' color='inherit' underline='always'>
          Forgot password?
        </Link>
      </Stack> */}
    </FormProvider>
  )
}
