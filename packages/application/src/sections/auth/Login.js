import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material'

import { useAuthContext } from '../../auth/useAuthContext'
import { PATH_AUTH } from '../../routes/paths'
import LoginLayout from '../../layouts/login'
import AuthLoginForm from './AuthLoginForm'

export default function Login() {
  const { method } = useAuthContext()

  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant='h4'>Sign in to FCU Loans Application</Typography>

        {/* <Stack direction='row' spacing={0.5}>
          <Typography variant='body2'>New user?</Typography>

          <Link component={RouterLink} to={PATH_AUTH.register} variant='subtitle2'>
            Create an account
          </Link>
        </Stack> */}
      </Stack>
      <Alert severity='info' sx={{ mb: 3 }}>
        Use email : <strong>test@firstcu.co.nz</strong> / password :<strong>test1234</strong>
      </Alert>

      <AuthLoginForm />
    </LoginLayout>
  )
}
