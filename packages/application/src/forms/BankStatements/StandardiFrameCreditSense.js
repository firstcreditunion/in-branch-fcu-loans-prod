import React from 'react'

//*  jQuery
// import jQuery from 'jquery'

// * Third-Party Imports
import Iframe from 'react-iframe'

//* Framer motion
import { motion } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

import { useDispatch, useSelector } from 'react-redux'
import { bankStatementActions } from '../../redux/slices/bankStatementSlice'

// * MUI - Styles
import { styled } from '@mui/material/styles'

// * MUI
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

//* MUI - Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

//* MUI - Alert
import Alert from '@mui/material/Alert'

import { getCloudFrontEnvironment } from '../../redux/utils/apiConstants'
// import { genericStatusCodes, bankStatusCodes, supportingDocsStatusCodes } from './codes/CreditSense'

import { fDateCustom } from '../../utils/formatDateTime'

const CreditSenseBorder = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  transition: theme.transitions.create('padding'),
}))

export default function BankStatement() {
  const [showCreditSense, setShowCreditSense] = React.useState(false)

  const employmentType = useSelector((state) => state.employmentReducer.employmentType)
  const lastName = useSelector((state) => state.yourPersonalDetailReducer.lastName)

  const dispatch = useDispatch()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))

  const varSubtitle = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inLeft

  function getAppRef() {
    const timestamp = new Date()
    const appRef = lastName + '-' + fDateCustom(timestamp)

    dispatch(bankStatementActions.setCreditSenseAppRef(appRef))

    return appRef
  }

  const src = `https://creditsense.co.nz/apply/${getCloudFrontEnvironment() === 'SS-PROD' ? 'FSCU01' : 'FSCU03'}/?method=iframe&uniqueAppRef=true&appRef=${getAppRef()}&debugBanks=${getCloudFrontEnvironment() === 'SS-PROD' ? 'false' : 'true'}&termsBeforeCredentials=true&winz=${employmentType === 'Beneficiary' ? 'ask' : 'skip'}`

  return (
    <Stack direction='column' spacing={downMd ? 2 : 5} justifyContent='center' alignItems='center'>
      <Stack component={motion.div} {...varFade({ distance: 25, durationIn: 0.5, durationOut: 0.5 }).inDown}>
        <Paper elevation={8} sx={{ mt: 2 }}>
          <Alert sx={{ textAlign: 'center' }} variant='standard' color='info' icon={<InfoOutlinedIcon fontSize='medium' />}>
            Due to regulation changes, we need your bank statements for the last <strong>90 days</strong>.
          </Alert>
        </Paper>
      </Stack>
      <CreditSenseBorder sx={{ width: '100%' }}>
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={8} sx={{ width: '100%' }}>
          <Stack direction='row' sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
            <Stack direction='column' spacing={2} sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
              <Stack direction='column' sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
                <Typography color='text.secondary' variant='h6' sx={{ textAlign: 'center', fontWeight: 'regular' }}>
                  Secure Bank Statement Upload
                </Typography>
                <Typography variant='body1' sx={{ textAlign: 'center' }}>
                  Use your internet banking login to securely upload your bank statements via Credit Sense.
                </Typography>
                <Typography variant='caption' sx={{ textAlign: 'center' }}>
                  This is the preferred option as it allows us to quickly assess your application.
                </Typography>
              </Stack>
              <Stack direction='column' spacing={2} sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
                {!showCreditSense && (
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{
                      borderRadius: '49px',
                      width: 200,
                      border: 'none',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      transition: '.5s',
                    }}
                    onClick={() => setShowCreditSense(true)}
                    startIcon={<FileUploadOutlinedIcon />}
                  >
                    Upload
                  </Button>
                )}
              </Stack>
              {showCreditSense && (
                <Stack component={motion.div} {...varSubtitle} direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{ pt: 2, width: '100%', zIndex: 'tooltip' }}>
                  <Iframe url={src} width='100%' height='650px' id='fcu-cs-iframe' display='block' position='relative' frameBorder='0' />
                </Stack>
              )}
            </Stack>
          </Stack>
          <Divider
            variant='fullWidth'
            sx={{
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Chip size='small' label='OR' />
          </Divider>
          <Stack direction='column' spacing={2} sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
            <Stack direction='row' spacing={2} sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
              <Stack direction='column' sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
                <Typography color='text.secondary' variant='h6' sx={{ textAlign: 'center', fontWeight: 'regular' }}>
                  Provide bank statements at a later date.{' '}
                </Typography>
                <Typography variant='body2' sx={{ textAlign: 'center' }}>
                  A lender will be in contact and this may delay the processing of your application.
                </Typography>
                <Typography variant='caption' sx={{ textAlign: 'center' }}>
                  Please click <strong>next</strong> to continue.
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </CreditSenseBorder>
    </Stack>
  )
}
