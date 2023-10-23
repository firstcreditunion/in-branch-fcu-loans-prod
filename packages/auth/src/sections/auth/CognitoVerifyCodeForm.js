import React, { useEffect, useState } from 'react'

import { Link as RouterLink, useHistory } from 'react-router-dom'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { signupActions } from '../../redux/slices/signupSlice'
import { verifycodeActions } from '../../redux/slices/verifyCodeSlice'
import { authenticationActions } from '../../redux/slices/authenticationSlice'

//* RHF And YUP
import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

//* MUI
import { Link, Stack, Alert, Typography, IconButton, InputAdornment, FormHelperText } from '@mui/material'
import { LoadingButton } from '@mui/lab'

//* AWS Congnito
import UserPool from '../../cognito/UserPool'
import { CognitoUser } from 'amazon-cognito-identity-js'

import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

import FormProvider from '../../components/RHF-mui-compoments/FormProvider'
import RFHTextField from '../../components/RHF-mui-compoments/RHFTextField'
import RHFCodes from '../../components/RHF-mui-compoments/RHFCodes'

import useMediaQuery from '@mui/material/useMediaQuery'

export default function AuthSignUpForm() {
  const dispatch = useDispatch()
  const history = useHistory()

  const username = useSelector((state) => state.signupReducer.emailAddress)
  const password = useSelector((state) => state.signupReducer.password)
  const domain = useSelector((state) => state.signupReducer.domain)
  const verifyCodeResult = useSelector((state) => state.verifyCodeReducer.verifyCodeResult)

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
  })

  const defaultValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  }

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifyCodeSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods

  const onSubmit = (data) => {
    data.preventDefault()

    const v_code = data.target[0]?.value + data.target[2]?.value + data.target[4]?.value + data.target[6]?.value + data.target[8]?.value + data.target[10]?.value

    const emailToRegister = username + domain
    const userData = {
      Username: emailToRegister,
      Pool: UserPool,
    }

    const cognitoUser = new CognitoUser(userData)

    cognitoUser.confirmRegistration(v_code, true, function (err, result) {
      if (err) {
        dispatch(verifycodeActions.setVerifyCodeResult(err?.message))
        return
      }
      if (result === 'SUCCESS') {
        dispatch(signupActions.setCongnitoResponseUsername(null))
        dispatch(signupActions.setCongnitoResponseuserSub(null))
        dispatch(verifycodeActions.setVerificationSuccess(true))
        dispatch(authenticationActions.clearSignInForm())

        history.push('/signin')
      }
    })
  }

  const resendConfirmationCode = () => {
    const emailToRegister = username + domain
    const userData = {
      Username: emailToRegister,
      Pool: UserPool,
    }

    const cognitoUser = new CognitoUser(userData)
    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        console.log('Code request Error')
        return
      }
      return
    })

  }


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={5} sx={{ display: 'block', width: '100%' }}>
        {verifyCodeResult != null && <Alert severity='error'>{verifyCodeResult}</Alert>}
        <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'light', py: 3 }}>
          Please Check You Email
        </Typography>

        <Stack spacing={3}>
          <RHFCodes keyName='code' inputs={['code1', 'code2', 'code3', 'code4', 'code5', 'code6']} />

          {(!!errors.code1 || !!errors.code2 || !!errors.code3 || !!errors.code4 || !!errors.code5 || !!errors.code6) && (
            <FormHelperText error sx={{ px: 2 }}>
              Code is required
            </FormHelperText>
          )}
        </Stack>
        <LoadingButton fullWidth size='large' type='submit' variant='contained' loading={isSubmitting} sx={{ mt: 3 }}>
          Verify
        </LoadingButton>
      </Stack>

      <LoadingButton fullWidth size='large' onClick={resendConfirmationCode} variant='text' loading={isSubmitting} sx={{ mt: 3 }}>
        Resend Code
      </LoadingButton>
    </FormProvider>
  )
}