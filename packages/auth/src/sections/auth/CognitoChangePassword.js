import React, { useEffect, useState } from 'react'

import { Link as RouterLink, useHistory } from 'react-router-dom'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordActions } from '../../redux/slices/forgotpasswordSlice'
import { authenticationActions } from '../../redux/slices/authenticationSlice'

//* RHF And YUP
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//* AWS Cognito
import { CognitoUser } from 'amazon-cognito-identity-js'
import UserPool from '../../cognito/UserPool'

//* MUI
import { Link, Stack, Alert, AlertTitle, Typography, IconButton, InputAdornment, Button } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

//* Custom Components
import FormProvider from '../../components/RHF-mui-compoments/FormProvider'
import RFHTextField from '../../components/RHF-mui-compoments/RHFTextField'
import RHFCodes from '../../components/RHF-mui-compoments/RHFCodes'
import CustomAlert from '../../components/CustomAlert'

import useMediaQuery from '@mui/material/useMediaQuery'

export default function ChangePasswordForm() {
  // const { login, register } = useAuthContext()
  const dispatch = useDispatch()
  const history = useHistory()
  const [showNewPassword, setNewShowPassword] = useState(false)
  const [showConfirmPassword, setConfirmShowPassword] = useState(false)

  const domain = useSelector((state) => state.forgotpasswordReducer.domain)
  const newpass_emailaddress = useSelector((state) => state.forgotpasswordReducer.emailaddress)
  const newpass_verificationCode = useSelector((state) => state.forgotpasswordReducer.verificationCode)
  const newpass_newPassword = useSelector((state) => state.forgotpasswordReducer.newPassword)
  const newpass_confirmPassword = useSelector((state) => state.forgotpasswordReducer.confirmPassword)
  const newpass_passwordChangeStatus = useSelector((state) => state.forgotpasswordReducer.passwordChangeStatus)

  const ChangePasswordSchema = Yup.object().shape({
    newpass_verificationCode: Yup.string().required('Verification code is required'),
    newpass_newPassword: Yup.string().required('New password is required'),
    newpass_confirmPassword: Yup.string().required('Re-enter password'),
  })

  const defaultValues = {
    newpass_verificationCode: newpass_verificationCode,
    newpass_newPassword: newpass_newPassword,
    newpass_confirmPassword: newpass_confirmPassword,
  }

  const methods = useForm({
    mode: 'onchange',
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods

  const getUser = (event) => {
    const emailRequestingReset = newpass_emailaddress + domain

    const user = new CognitoUser({
      Username: emailRequestingReset,
      Pool: UserPool,
    })

    return user
  }

  useEffect(() => {
    if (!newpass_passwordChangeStatus) return
    dispatch(forgotPasswordActions.setPasswordChangeStatus(false))
  }, [])

  const setVerificationCode = (data) => {
    dispatch(forgotPasswordActions.setVerificationCode(data.target.value))
  }
  const setNewPassword = (data) => {
    dispatch(forgotPasswordActions.setNewPassword(data.target.value))
  }
  const setConfirmPassword = (data) => {
    dispatch(forgotPasswordActions.setConfirmPassword(data.target.value))
  }

  const resetPassword = (event) => {
    event.preventDefault()

    getUser().confirmPassword(newpass_verificationCode, newpass_newPassword, {
      onSuccess: (data) => {
        dispatch(forgotPasswordActions.setPasswordChangeStatus(true))
        dispatch(authenticationActions.clearSignInForm(''))
        history.push('/signin')
      },
      onFailure: (err) => {
        console.log('Confirm Password: ', err)
      },
    })
  }

  return (
    <>
      {!newpass_passwordChangeStatus && (
        <FormProvider methods={methods} onSubmit={resetPassword}>
          <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={3} sx={{ display: 'block', width: '100%', maxWidth: '350px' }}>
            {!!errors.afterSubmit && <Alert severity='error'>{errors.afterSubmit.message}</Alert>}
            <RFHTextField name='newpass_verificationCode' label='6-digit Verification Code' onInputChange={setVerificationCode} value={newpass_verificationCode} />
            <RFHTextField
              name='newpass_newPassword'
              label='New Password'
              type={showNewPassword ? 'text' : 'password'}
              onInputChange={setNewPassword}
              value={newpass_newPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setNewShowPassword(!showNewPassword)} edge='end'>
                      {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RFHTextField
              name='newpass_confirmPassword'
              label='Confirm Password'
              type={showConfirmPassword ? 'text' : 'password'}
              onInputChange={setConfirmPassword}
              value={newpass_confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setConfirmShowPassword(!showConfirmPassword)} edge='end'>
                      {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

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
              Change Password
            </Button>
          </Stack>
        </FormProvider>
      )}
      {newpass_passwordChangeStatus && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{ display: 'block', width: '100%' }}>
          <CustomAlert alertTitle='Password Reset Sucess' color='success' severity='success' alertContent={<Typography variant='caption'>Your Password has been reset successfully</Typography>} />

          <Button
            color='primary'
            size='large'
            href='/signin'
            variant='contained'
            startIcon={<ArrowBackIosNewIcon />}
            disableFocusRipple={true}
            disableRipple={true}
            sx={{
              width: '500px',
              borderRadius: '25px',
              bgcolor: 'primary.main',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              '&:hover': {
                bgcolor: 'primary.light',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
              },
            }}
          >
            Return to Sign In
          </Button>
        </Stack>
      )}
    </>
  )
}
