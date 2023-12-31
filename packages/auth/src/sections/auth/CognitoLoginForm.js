import React, { useEffect, useState, useContext } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'

//* MUI
import {
  Link, Stack, Alert, AlertTitle, Typography, IconButton, InputAdornment, Avatar, Chip, Divider
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

//* Redux
import FormProvider, { RFHTextField } from '../../components/RHF-mui-compoments'
import { useDispatch, useSelector } from 'react-redux'
import { authenticationActions, checkSovereignProfile } from '../../redux/slices/authenticationSlice'

//* RHF And YUP
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* AWS Cognito
import UserPool from '../../cognito/UserPool'
import { LoginContext } from '../../cognito/UserAccount'
import UserSession from '../../cognito/UserSession'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import useMediaQuery from '@mui/material/useMediaQuery'

import { processNodeEnv, BASE_URL_AWS_APP, BASE_URL_LOCAL_APP, getCloudFrontEnvironment } from '../../redux/utils/apiConstants'

export default function AuthLoginForm({ setSovereignUser }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const [showPassword, setShowPassword] = useState(false)

  const loginFailResult = useSelector((state) => state.authenticationReducer.loginFailResult)
  const login_emailAddress = useSelector((state) => state.authenticationReducer.emailAddress)
  const login_password = useSelector((state) => state.authenticationReducer.password)
  const login_clientNumber = useSelector((state) => state.authenticationReducer.clientNumber)
  const hasSoverignProfile = useSelector((state) => state.authenticationReducer.hasSoverignProfile)
  const sovProfilecurrentRequestId = useSelector((state) => state.authenticationReducer.sovProfilecurrentRequestId)
  const verificationSuccess = useSelector((state) => state.verifyCodeReducer.verificationSuccess)
  const passwordChangeStatus = useSelector((state) => state.forgotpasswordReducer.passwordChangeStatus)

  const domain = useSelector((state) => state.signupReducer.domain)

  const { authenticate, userLogout, getUserSession } = useContext(LoginContext)

  const LoginSchema = Yup.object().shape({
    login_emailAddress: Yup.string()
      .required('Email address is required.')
      .test('Remove domain', 'Please remove @firstcu.co.nz', function (emailAddress) {
        if (emailAddress.includes(domain)) {
          return false
        }

        return true
      }),
    login_password: Yup.string().required('Password is required.'),
    login_clientNumber: Yup.string().required('Client number is required.'),
  })

  const defaultValues = {
    login_emailAddress: login_emailAddress,
    login_password: login_password,
    login_clientNumber: login_clientNumber,
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: {
      errors, isSubmitting, isSubmitSuccessful },
  } = methods

  function authenticateUser() {
    const emailToLogin = login_emailAddress + domain

    authenticate(emailToLogin, login_password)
      .then((data) => {
        console.log('AUTH Result Data: ', data)
        history.push('/memberonlyloan')
        setSovereignUser(login_clientNumber)
        return
      })
      .catch((err) => {
        // console.log('Log In Failed!', err?.message)
        dispatch(authenticationActions.setLoginFailResult(err?.message))
        return
      })
  }

  useEffect(() => {
    // console.log('hasSoverignProfile: ', hasSoverignProfile)

    if (hasSoverignProfile === 'Unauthorized' || hasSoverignProfile === null || hasSoverignProfile === undefined) return

    authenticateUser()
  }, [hasSoverignProfile])

  useEffect(() => {
    dispatch(authenticationActions.clearSignInForm())
  }, [])

  function setEmailAddress(event) {
    dispatch(authenticationActions.setEmailAddress(event.target.value))
  }

  function setPassword(event) {
    dispatch(authenticationActions.setPassword(event.target.value))
  }
  function setClientNumber(event) {
    dispatch(authenticationActions.setClientNumber(event.target.value))
  }

  const onSubmit = async (event) => {
    // event.preventDefault()

    dispatch(authenticationActions.setHasSoverignProfile(null))

    const checkSovereignConfig = {
      url: '/validate',
      method: 'GET',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'request-by-client': login_clientNumber },
      timeout: 5000,
    }

    await dispatch(checkSovereignProfile(checkSovereignConfig))
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={3} sx={{ display: 'block', width: '100%' }}>
        {sovProfilecurrentRequestId != null && hasSoverignProfile === 'Unauthorized' && <Alert severity='error'>You are not authorised to login!</Alert>}
        {verificationSuccess === true && <Alert severity='success'>Verification was successful. Please login below!</Alert>}
        {passwordChangeStatus === true && <Alert severity='success'>Password was changed succesfully. Please login!</Alert>}
        {loginFailResult != null && <Alert severity='error'>{loginFailResult}</Alert>}
        <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%', pb: downMd ? 0 : 3 }} spacing={3} >
          <Chip color={getCloudFrontEnvironment() === 'Member-Only-Prod' ? 'primary' : 'secondary'} label={getCloudFrontEnvironment() === 'Member-Only-Prod' ? 'Production' : 'Test Environment'} />
          <Stack direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%', pb: downMd ? 0 : 3 }} spacing={2} >
            <Typography variant='h4' color='primary' sx={{
              textAlign: 'center', fontWeight: 'light', textTransform: 'uppercase', letterSpacing: -0.1
            }}
            >
              Sign in
            </Typography>

            <Typography variant='h4' color='secondary' sx={{
              textAlign: 'center', fontWeight: 'light', textTransform: 'uppercase', letterSpacing: -0.1
            }}>
              FCU Staff Portal
            </Typography>
          </Stack>
        </Stack>


        <Stack
          direction='column'
          justifyContent='center'
          alignItems='stretch'
          spacing={5}
          sx={{
            display: 'block',
            width: '100%',
          }}
        >
          <RFHTextField
            name='login_emailAddress'
            label='Email Address'
            value={login_emailAddress}
            onInputChange={setEmailAddress}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography variant='h6' color='primary' sx={{ fontWeight: 'light', px: 2 }}>
                    @firstcu.co.nz
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
          <RFHTextField
            name='login_password'
            label='Password'
            value={login_password}
            type={showPassword ? 'text' : 'password'}
            onInputChange={setPassword}
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
          <RFHTextField name='login_clientNumber' label='Member Number' value={login_clientNumber} onInputChange={setClientNumber} helperText='Member number assosiated to your G3 login.' />
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
          variant='contained'
          onClick={onSubmit}
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
    </FormProvider>
  )
}


// Git Commit Control 1