import React, { useEffect, useState } from 'react'

import { Link as RouterLink, useHistory } from 'react-router-dom'

import { Link, Stack, Typography, Alert, InputAdornment, IconButton } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { processNodeEnv, BASE_URL_AWS_APP, BASE_URL_LOCAL_APP } from '../../redux/utils/apiConstants'

import { signupActions, checkSovereignProfile } from '../../redux/slices/signupSlice'

//* AWS Congnito
import UserPool from '../../cognito/UserPool'

//* RHF Components
import FormProvider, { RFHTextField } from '../../components/RHF-mui-compoments'
import { useDispatch, useSelector } from 'react-redux'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const SignupForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [showPassword, setShowPassword] = useState(false)
  const [showVerifyPassword, setVerifyShowPassword] = useState(false)

  const signupemailAddress = useSelector((state) => state.signupReducer.emailAddress)
  const signuppassword = useSelector((state) => state.signupReducer.password)
  const signupverifyPassword = useSelector((state) => state.signupReducer.verifyPassword)
  const signupclientnumber = useSelector((state) => state.signupReducer.clientnumber)

  const domain = useSelector((state) => state.signupReducer.domain)
  const hasSoverignProfile = useSelector((state) => state.signupReducer.hasSoverignProfile)
  const cognitoError = useSelector((state) => state.signupReducer.cognitoError)
  const congnitoResponseuserSub = useSelector((state) => state.signupReducer.congnitoResponseuserSub)

  const defaultValues = {
    signupemailAddress: signupemailAddress,
    signuppassword: signuppassword,
    signupverifyPassword: signupverifyPassword,
    signupclientnumber: signupclientnumber,
  }
  const SignUpSchema = Yup.object().shape({
    signupemailAddress: Yup.string()
      .required('Email address is required.')
      .test('Remove domain', 'Please remove @firstcu.co.nz', function (emailAddress) {
        if (emailAddress.includes(domain)) {
          return false
        }

        return true
      }),
    signuppassword: Yup.string().required('Password is required.'),
    signupverifyPassword: Yup.string()
      .required('Please confirm password.')
      .test('Passwords mismatch', 'The passwords does not match', function (verifyPassword) {
        if (verifyPassword != signuppassword) {
          return false
        }

        return true
      }),
    signupclientnumber: Yup.string().required('Member number is required.'),
  })

  const methods = useForm({
    resolver: yupResolver(SignUpSchema),
    defaultValues,
  })

  // Destructure Methods
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  function setEmailAddress(event) {
    dispatch(signupActions.setEmailAddress(event.target.value))
  }

  function setPassword(event) {
    dispatch(signupActions.setPassword(event.target.value))
  }
  function setVerifyPassword(event) {
    dispatch(signupActions.setVerifyPassword(event.target.value))
  }

  function setClientNumber(event) {
    dispatch(signupActions.setClientNumber(event.target.value))
  }

  async function registerUser() {
    const checkSovereignConfig = {
      url: '/validate',
      method: 'GET',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'request-by-client': signupclientnumber },
      timeout: 5000,
    }

    await dispatch(checkSovereignProfile(checkSovereignConfig))
  }

  useEffect(() => {
    if (hasSoverignProfile === 'Unauthorized' || hasSoverignProfile === null || hasSoverignProfile === undefined) return

    const emailToRegister = signupemailAddress + domain
    dispatch(signupActions.setCognitoError(null))

    UserPool.signUp(
      emailToRegister,
      signuppassword,
      [
        {
          Name: 'custom:client_number',
          Value: signupclientnumber,
        },
      ],
      null,
      (err, data) => {
        if (err) {
          console.log('Sign Up Error: ', err?.message)
          dispatch(signupActions.setCognitoError(err?.message))
          return
        }

        if (data?.user) {
          dispatch(signupActions.setCongnitoResponseUsername(data?.user?.username))
          dispatch(signupActions.setCongnitoResponseuserSub(data?.userSub))
        }
      }
    )
  }, [hasSoverignProfile])

  useEffect(() => {
    if (congnitoResponseuserSub === null || congnitoResponseuserSub === undefined || congnitoResponseuserSub === '') {
      return
    }

    history.push('/verifycode')
  }, [congnitoResponseuserSub])

  const onSubmit = (event) => {
    console.log('On Submit Loan Details')
    registerUser()
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        spacing={4}
        sx={{
          display: 'block',
          width: '100%',
        }}
      >
        {cognitoError != null && <Alert severity='error'>{cognitoError}</Alert>}
        <RFHTextField
          name='signupemailAddress'
          label='Email Address'
          value={signupemailAddress}
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
          name='signuppassword'
          label='Password'
          value={signuppassword}
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

        <RFHTextField
          name='signupverifyPassword'
          label='Confirm Password'
          value={signupverifyPassword}
          type={showVerifyPassword ? 'text' : 'password'}
          onInputChange={setVerifyPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={() => setVerifyShowPassword(!showVerifyPassword)} edge='end'>
                  {showVerifyPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RFHTextField name='signupclientnumber' label='Member Number' value={signupclientnumber} onInputChange={setClientNumber} />

        <LoadingButton
          type='submit'
          fullWidth
          color='primary'
          size='large'
          variant='contained'
          sx={{
            borderRadius: 10,
          }}
        >
          Register
        </LoadingButton>

        <Stack direction='row' justifyContent='center' alignItems='center' spacing={0.5}>
          <Typography variant='body2'>Already a user?</Typography>
          <Link component={RouterLink} to={'/signin'} variant='subtitle2' sx={{ color: 'secondary.main' }}>
            Sign in here
          </Link>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default SignupForm
