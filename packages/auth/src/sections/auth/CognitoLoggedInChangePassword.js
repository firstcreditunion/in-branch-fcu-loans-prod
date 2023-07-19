import React, { useEffect, useState, useContext } from 'react'

import { Link as RouterLink, useHistory } from 'react-router-dom'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { changePasswordActions } from '../../redux/slices/changepasswordSlice'

//* RHF And YUP
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//* AWS Cognito
import UserPool from '../../cognito/UserPool'
import { LoginContext } from '../../cognito/UserAccount'

//* MUI
import { Link, Stack, Alert, Typography, IconButton, InputAdornment } from '@mui/material'
import { LoadingButton } from '@mui/lab'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import FormProvider from '../../components/RHF-mui-compoments/FormProvider'
import RFHTextField from '../../components/RHF-mui-compoments/RHFTextField'

export default function UserSettings() {
  const [loggedIn, setLoggednIn] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const dispatch = useDispatch()
  const { getUserSession } = useContext(LoginContext)

  const changePass_currentPassword = useSelector((state) => state.changepasswordReducer.currentPassword)
  const changePass_newPassword = useSelector((state) => state.changepasswordReducer.newPassword)
  const changePass_confirmPassword = useSelector((state) => state.changepasswordReducer.confirmPassword)

  const ChangePasswordSchema = Yup.object().shape({
    changePass_currentPassword: Yup.string().required('Current Password is required'),
    changePass_newPassword: Yup.string().required('Current Password is required'),
    changePass_confirmPassword: Yup.string().required('Current Password is required'),
  })

  const defaultValues = {
    changePass_currentPassword: changePass_currentPassword,
    changePass_newPassword: changePass_newPassword,
    changePass_confirmPassword: changePass_confirmPassword,
  }

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods

  useEffect(() => {
    getUserSession()
      .then((session) => {
        console.log('Session User Session:', session)
        setLoggednIn(true)
      })
      .catch(() => {
        setLoggednIn(false)
        console.log('Not Logged In')
      })
  }, [])

  function onSubmit(event) {
    event.preventDefault()
    getUserSession()
      .then((session) => {
        console.log('Session User Session:', session)
      })
      .catch((err) => {
        console.log('Session Error User Session: ', err)
      })
  }

  function setCurrentPassword(event) {
    dispatch(changePasswordActions.setCurrentPassword(event.target.value))
  }
  function setNewPassword(event) {
    dispatch(changePasswordActions.setNewPassword(event.target.value))
  }
  function setConfirmPassword(event) {
    dispatch(changePasswordActions.setConfirmPassword(event.target.value))
  }

  return (
    <>
      {loggedIn && (
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={3} sx={{ display: 'block', width: '100%', maxWidth: '350px' }}>
            <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={5} sx={{ display: 'block', width: '100%' }}>
              <RFHTextField
                name='changePass_currentPassword'
                label='Current Password'
                type={showCurrentPassword ? 'text' : 'password'}
                onInputChange={setCurrentPassword}
                value={changePass_currentPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setShowCurrentPassword(!showCurrentPassword)} edge='end'>
                        {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RFHTextField
                name='changePass_newPassword'
                label='New Password'
                type={showNewPassword ? 'text' : 'password'}
                onInputChange={setNewPassword}
                value={changePass_newPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge='end'>
                        {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <RFHTextField
                name='changePass_confirmPassword'
                label='Confirm Password'
                type={showConfirmPassword ? 'text' : 'password'}
                onInputChange={setConfirmPassword}
                value={changePass_confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge='end'>
                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
              Reset Password
            </LoadingButton>
          </Stack>

          {/* <Stack alignItems='flex-end' sx={{ my: 2 }}>
        <Link component={RouterLink} to={PATH_AUTH.resetPassword} variant='body2' color='inherit' underline='always'>
          Forgot password?
        </Link>
      </Stack> */}
        </FormProvider>
      )}
    </>
  )
}
