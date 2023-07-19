import React, { useContext, useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Stack, Typography, Box } from '@mui/material'
import CognitoLoginForm from './CognitoLoginForm'

import Coworking from '../../components/CoWorking'

import useMediaQuery from '@mui/material/useMediaQuery'
import { LoginContext } from '../../cognito/UserAccount'

export default function Login() {
  const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'))

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <Stack direction='row' alignItems='baseline' sx={{ px: 5, pt: 25, minWidth: '100%', minHeight: '100vh' }}>
        {upMd && (
          <Box sx={{ minWidth: '50%', textAlign: 'center' }}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={5}>
              <Typography variant='h3' sx={{ textTransform: 'uppercase', fontWeight: 'light', textAlign: 'center' }}>
                Hi, Welcome Back!
              </Typography>
              <Box sx={{ display: 'flex', width: '50%', justifyContent: 'center' }}>
                <Coworking sx={{ minWidth: '50%' }} />
              </Box>
            </Stack>
          </Box>
        )}
        <Stack justifyContent='center' alignItems='center' spacing={2} sx={{ px: 5, width: '100%' }}>
          {!upMd && (
            <Stack justifyContent='center' alignItems='center' sx={{ pb: 5, width: '100%' }}>
              <Typography
                variant='h3'
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'light',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                Hi, Welcome Back!
              </Typography>
            </Stack>
          )}

          <Stack justifyContent='center' alignItems='center' sx={{ pb: 5, width: '100%' }}>
            <CognitoLoginForm />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

// {
//   /* <Typography variant='h4' sx={{ textAlign: 'center', fontWeight: 'light', py: 3 }}>
//             Sign in to FCU Loan Application{' '}
//           </Typography> */
// }

// {
//   /* <Stack direction='row' spacing={0.5}>
//          <Typography variant='body2'>New user?</Typography>

//          <Link component={RouterLink} to={PATH_AUTH.register} variant='subtitle2'>
//            Create an account
//          </Link>
//        </Stack> */
// }
// {
//   /* <Alert severity='info' sx={{ mb: 3 }}>
//           Use your <strong>First Credit Union</strong> email and password <strong>test1234</strong>
//         </Alert> */
// }
