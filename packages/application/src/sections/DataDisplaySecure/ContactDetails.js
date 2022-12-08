import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

//Framer
import { motion } from 'framer-motion'
import { varFade, varBounce } from '../../components/ui/animate'

// MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Card from '@mui/material/Card'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormControlLabel from '@mui/material/FormControlLabel'

// MUI - Styles
import { styled } from '@mui/material/styles'

// MUI - Icons
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'

// Date-fns
import { fDate } from '../../utils/formatDateTime'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux - Actions
import { contactDetailsActions } from '../../redux/slices/contactDetailsSlice'

// Custom Components
import { Title, Data } from './Interface/Typography'

export default function FirstLoanApplicationSecure() {
  const dispatch = useDispatch()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const emailAddress = useSelector((state) => state.conatctDetailsReducer.emailAddress)
  const mobileNumber = useSelector((state) => state.conatctDetailsReducer.mobileNumber)
  const homePhone = useSelector((state) => state.conatctDetailsReducer.homePhone)
  const workPhone = useSelector((state) => state.conatctDetailsReducer.workPhone)

  const numberOfContactMethods = useSelector((state) => state.conatctDetailsReducer.numberOfContactMethods)
  const onSubmitYourContactDetails = useSelector((state) => state.conatctDetailsReducer.onSubmitYourContactDetails)
  const isValidYourContactDetails = useSelector((state) => state.conatctDetailsReducer.isValidYourContactDetails)
  const isValidSovContactMethods = useSelector((state) => state.conatctDetailsReducer.isValidSovContactMethods)

  const isValidSovEmailAddress = useSelector((state) => state.conatctDetailsReducer.isValidSovEmailAddress)
  const isValidSovMobileNumber = useSelector((state) => state.conatctDetailsReducer.isValidSovMobileNumber)
  const isValidSovHomePhoneNumber = useSelector((state) => state.conatctDetailsReducer.isValidSovHomePhoneNumber)
  const isValidSovWorkPhoneNumber = useSelector((state) => state.conatctDetailsReducer.isValidSovWorkPhoneNumber)

  const verifiedContactDetailsSecure = useSelector((state) => state.conatctDetailsReducer.verifiedContactDetailsSecure)

  const handleConfirmDetails = () => {
    dispatch(contactDetailsActions.setVerifiedContactDetailsSecure(!verifiedContactDetailsSecure))
  }

  const varConfirmDetails =
    isValidSovContactMethods && numberOfContactMethods >= 2
      ? varFade({
          distance: 20,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inUp
      : varFade({
          distance: 20,
          durationIn: 0.32,
          durationOut: 0.32,
        }).outDown

  return (
    <Box>
      <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
        {numberOfContactMethods > 0 ? (
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
              {emailAddress && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start'>
                  <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                    <Title sx={{ color: !emailAddress ? 'error.main' : 'text.secondary' }}>Email Address</Title>
                    {!isValidSovEmailAddress && <ErrorRoundedIcon color='error' fontSize='10' />}
                  </Stack>
                  <Data>{emailAddress ? emailAddress : 'Unknown'}</Data>
                </Stack>
              )}
              {mobileNumber && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start'>
                  <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                    <Title sx={{ color: !mobileNumber ? 'error.main' : 'text.secondary' }}>Mobile Number</Title>
                    {!isValidSovMobileNumber && <ErrorRoundedIcon color='error' fontSize='10' />}
                  </Stack>
                  <Data>{mobileNumber ? mobileNumber : 'Unknown'}</Data>
                </Stack>
              )}
              {homePhone && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start'>
                  <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                    <Title sx={{ color: !homePhone ? 'error.main' : 'text.secondary' }}>Home Phone Number</Title>
                    {!isValidSovHomePhoneNumber && <ErrorRoundedIcon color='error' fontSize='10' />}
                  </Stack>
                  <Data>{homePhone ? homePhone : 'Unknown'}</Data>
                </Stack>
              )}
              {workPhone && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start'>
                  <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
                    <Title sx={{ color: !workPhone ? 'error.main' : 'text.secondary' }}>Work Phone Number</Title>
                    {!isValidSovWorkPhoneNumber && <ErrorRoundedIcon color='error' fontSize='10' />}
                  </Stack>
                  <Data>{workPhone ? workPhone : 'Unknown'}</Data>
                </Stack>
              )}
              {numberOfContactMethods === 1 && <Divider sx={{ width: '100%' }} />}
              {numberOfContactMethods === 1 && (
                <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
                  <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ width: '100%', minHeight: 200 }}>
                    <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                      <Stack direction={downSm ? 'column' : 'row'} justifyContent='center' alignItems='center' spacing={1} sx={{ textAlign: 'center' }}>
                        <Box component={motion.div} {...varBounce().in}>
                          <PriorityHighIcon color='warning' fontSize='large' />
                        </Box>
                        <Typography variant={downSm ? 'body1' : 'subtitle1'} color='text.primary' sx={{ fontWeight: 500 }}>
                          Unfortunately, we only have <strog>one</strog> of your contact method.
                        </Typography>
                      </Stack>
                      <Typography variant={downSm ? 'caption' : 'body2'} color='text.secondary' sx={{ textAlign: 'center' }}>
                        Please click <strong>add contact</strong> to add another contact method to get in touch with you regarding your loan.
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              )}
            </Stack>
          </Stack>
        ) : (
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={4} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={4} sx={{ width: '100%', minHeight: 300 }}>
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                <Stack direction={downSm ? 'column' : 'row'} justifyContent='center' alignItems='center' spacing={1} sx={{ textAlign: 'center' }}>
                  <Box component={motion.div} {...varBounce().in}>
                    <PriorityHighIcon color='warning' fontSize='large' />
                  </Box>
                  <Typography variant={downSm ? 'body1' : 'subtitle1'} color='text.primary' sx={{ fontWeight: 500 }}>
                    Unfortunately, we do not have your conatct details.
                  </Typography>
                </Stack>
                <Typography variant={downSm ? 'caption' : 'body2'} color='text.secondary' sx={{ textAlign: 'center' }}>
                  Please click <strong>add contact</strong> to update your details.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        )}
        {isValidSovContactMethods && numberOfContactMethods >= 2 && (
          <Stack component={motion.div} {...varConfirmDetails} direction='row' justifyContent='center' alignItems='center' sx={{ minWidth: '100%' }}>
            <FormControlLabel
              control={<Checkbox color='success' checked={verifiedContactDetailsSecure} onChange={handleConfirmDetails} />}
              label={
                <Typography color='text.secondary'>
                  I confirm that my <strong>contact details</strong> are correct and up-to-date
                </Typography>
              }
            />
          </Stack>
        )}
      </Stack>
    </Box>
  )
}
