import React, { useEffect, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { authenticationActions } from '../../redux/slices/authenticationSlice'

//* RHF And YUP
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//* AWS Cognito
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from '../../cognito/UserPool'

//* MUI
import { Link, Stack, Alert, Typography, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import FormProvider from '../../components/RHF-mui-compoments/FormProvider'
import RFHTextField from '../../components/RHF-mui-compoments/RHFTextField'

import useMediaQuery from '@mui/material/useMediaQuery'

export default function AuthLoginForm() {
  // const { login, register } = useAuthContext()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)

  const multifactor_emailAddress = useSelector((state) => state.authenticationReducer.emailAddress)
  const multifactor_password = useSelector((state) => state.authenticationReducer.password)

  const LoginSchema = Yup.object().shape({
    multifactor_emailAddress: Yup.string().required('Email is required').email('Email must be a valid email address'),
    multifactor_password: Yup.string().required('Password is required'),
  })

  const defaultValues = {
    multifactor_email: multifactor_emailAddress,
    multifactor_password: multifactor_password,
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

    const user = new CognitoUser({ Username: emailAddress, Pool: UserPool })
    const authDetails = new AuthenticationDetails({
      Username: multifactor_emailAddress,
      Password: multifactor_password,
    })

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('On Success: ', data)
      },
      onFailure: (err) => {
        console.log('On Failure: ', err)
      },
      newPasswordRequired: (data) => {
        console.log('New Password Required: ', data)
      },
      mfaSetup: (challengeName, challengeParameters) => {
        user.associateSoftwareToken(this)
      },
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
      <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={3} sx={{ display: 'block', width: '100%' }}>
        {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
        <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'light', py: 3 }}>
          Sign in to FCU Loan Application{' '}
        </Typography>
        <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={5} sx={{ display: 'block', width: '100%' }}>
          <RFHTextField name='multifactor_email' label='Email Address' onInputChange={onEmailAddressChange} value={multifactor_emailAddress} />

          <RFHTextField
            name='multifactor_password'
            label='Password'
            type={showPassword ? 'text' : 'password'}
            onInputChange={onPasswordChange}
            value={multifactor_password}
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
        </Stack>

        <Stack alignItems='flex-end' sx={{ p: 0, m: 0 }}>
          <Link component={RouterLink} to={'/forgotpassword'} variant='body2' color='inherit' underline='none' sx={{ color: 'secondary.main' }}>
            Forgot password?
          </Link>
        </Stack>

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
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
          <Typography variant='body2'>New user?</Typography>

          <Link component={RouterLink} to={'/signup'} variant='subtitle2' sx={{ color: 'secondary.main' }}>
            Create a New Profile
          </Link>
        </Stack>
      </Stack>

      {/* <Stack alignItems='flex-end' sx={{ my: 2 }}>
        <Link component={RouterLink} to={PATH_AUTH.resetPassword} variant='body2' color='inherit' underline='always'>
          Forgot password?
        </Link>
      </Stack> */}
    </FormProvider>
  )
}
