import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { Stack, Typography, Box } from '@mui/material'
import CognitoLogoutForm from './CognitoLogoutForm'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordActions } from '../../redux/slices/forgotpasswordSlice'

import Coworking from '../../components/CoWorking'
import Working from '../../components/Working'
import WorkingDesigner from '../../components/Working2'

import useMediaQuery from '@mui/material/useMediaQuery'

export default function Login() {
  const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'))

  const forgotPasswordStage = useSelector((state) => state.forgotpasswordReducer.forgotPasswordStage)

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <Stack direction='row' alignItems='center' sx={{ px: 5, minWidth: '100%', minHeight: '100vh' }}>
        <Box sx={{ minWidth: '100%', textAlign: 'center' }}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={7}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
              <Typography variant='h3' sx={{ textTransform: 'uppercase', fontWeight: 'light', textAlign: 'center' }}>
                You have been logged out!
              </Typography>
            </Stack>

            <Stack justifyContent='center' alignItems='center' sx={{ pb: 5, width: '100%' }}>
              <CognitoLogoutForm />
            </Stack>
          </Stack>
        </Box>
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
