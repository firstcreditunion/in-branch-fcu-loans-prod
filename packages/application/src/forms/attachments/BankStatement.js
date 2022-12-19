import React, { useCallback, useEffect } from 'react'

//*  jQuery
import jQuery from 'jquery'

// * Third-Party Imports
import Iframe from 'react-iframe'

//* Framer motion
import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

import { useDispatch, useSelector } from 'react-redux'
import { bankStatementActions } from '../../redux/slices/bankStatementSlice'

import { processNodeEnv } from '../../redux/utils/apiConstants'

//* React Hook Form
import { useForm, Controller } from 'react-hook-form'

// * MUI - Styles
import { styled } from '@mui/material/styles'

// * MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

//* MUI - Cards
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

//* MUI - Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

//* MUI - Alert
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

import { genericStatusCodes, bankStatusCodes, supportingDocsStatusCodes } from './codes/CreditSense'

import { fDateCustom } from '../../utils/formatDateTime'

const maxLength = 50

const CreditSenseBorder = styled('div')(({ theme }) => ({
  outline: 'none',
  overflow: 'hidden',
  position: 'relative',
  transition: theme.transitions.create('padding'),
  // border: `1px solid ${theme.palette.grey[300]}`,
}))

function bankStatementValidator(file) {
  if (file?.name?.length > maxLength) {
    return {
      code: 'name-too-large',
      message: `File name is larger than ${maxLength} characters`,
    }
  }

  return null
}

let creditSenseAppId = null
let creditSenseResponseCode = null

const creditSenseCodes = [...genericStatusCodes, ...bankStatusCodes, ...supportingDocsStatusCodes]

export default function BankStatement() {
  // const acceptedFiles = useSelector((state) => state.bankStatementReducer.acceptedFiles)
  // const iFrameLoaded = useSelector((state) => state.bankStatementReducer.iFrameLoaded)

  const [showCreditSense, setShowCreditSense] = React.useState(false)

  // const [creditSenseIframeResposne, setCreditSenseIframeResposne] = React.useState(null)

  const employmentType = useSelector((state) => state.employmentReducer.employmentType)
  const lastName = useSelector((state) => state.yourPersonalDetailReducer.lastName)

  const dispatch = useDispatch()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const creditSenseCodes = [...genericStatusCodes, ...bankStatusCodes, ...supportingDocsStatusCodes]

  const varSubtitle = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inLeft

  // const handleFileSelect = useCallback(
  //   (acceptedFiles) => {
  //     dispatch(bankStatementActions.setAcceptedFiles(acceptedFiles))
  //   },
  //   [acceptedFiles]
  // )

  const src = `https://creditsense.co.nz/apply/FSCU01/?method=iframe`

  // function onApplicationSuccess() {
  //   console.log('On Application Success Called')
  // }

  function logMsg(message) {
    if (typeof console == 'object') console.log(message)
    else alert(message)
  }

  function getAppRef() {
    const timestamp = new Date()
    const appRef = lastName + '-' + fDateCustom(timestamp)

    dispatch(bankStatementActions.setCreditSenseAppRef(appRef))

    return appRef
  }

  function getCerditSenseAlert() {
    creditSenseCodes?.filter((item) => {
      return parseInt(item?.Code) === creditSenseResponseCode
    })

    // console.log('CREDIT SENSE RESPONSE CODE: ', creditSenseResponseCode)

    // console.log(
    //   'ALERT CONSOLE: ',
    //   creditSenseCodes
    //     ?.filter((item) => {
    //       return parseInt(item?.Code) === creditSenseResponseCode
    //     })
    //     ?.map((item) => {
    //       return item?.AlertTitle
    //     })[0]
    // )
  }

  // console.log('getCerditSenseAlert: ', getCerditSenseAlert())

  // useEffect(() => {
  //   console.log('-----USEEFFECT-----')
  //   console.log('-----Current Response Code-----')
  //   console.log('-----Current Find Code-----')

  //   console.log(
  //     creditSenseCodes.find((codes) => {
  //       return codes?.Code === creditSenseIframeResponseCode
  //     })
  //   )

  //   console.log('-----Current Find and Map Code-----')

  //   console.log(
  //     creditSenseCodes
  //       .find((codes) => {
  //         return codes?.Code === credit SenseIframeResponseCode
  //       })
  //       ?.map((item) => {
  //         return { alertTitle: item?.AlertTitle, altertContent: item?.AlertContent, severity: item?.SeverityType }
  //       })
  //   )
  // }, [creditSenseIframeResponseCode])

  jQuery(function () {
    $.CreditSense.Iframe({
      client: `${processNodeEnv() === 'development' ? 'FSCU03' : 'FSCU01'}`,
      elementSelector: '#fcu-cs-iframe',
      enableDynamicHeight: true,
      params: {
        appRef: '12345abc',
        uniqueAppRef: true,
        debugBanks: `${processNodeEnv() === 'development' ? true : false}`,
        multibank: true,
        termsBeforeCredentials: true,
        centrelink: employmentType === 'Beneficiary' ? 'ask' : 'skip',
        askOnlineBanking: true,
      },
      callback: function (response, data) {
        // console.log('MY CONSOLE LOG for IFRAME REPONSE =>', response)
        // console.log('MY CONSOLE LOG for IFRAME DATA: ', data)

        if (creditSenseAppId == null) creditSenseAppId = data

        if (Number(response)) {
          if (creditSenseResponseCode === 100 || creditSenseResponseCode === response) return

          creditSenseResponseCode = parseInt(response)
          // dispatch(bankStatementActions.setCreditSenseResponseCode(parseInt(response)))
          // console.log('RESPONSE IS A NUMBER')
          // console.log('PARSE INT creditSenseIframeResponseCode: ', creditSenseResponseCode)
          // console.log('PARSE INT NUMBER: ', parseInt(response))
        }
        // console.log('MY CONSOLE LOG for IFRAME creditSenseAppId: ', creditSenseAppId)
        switch (response) {
          case '99': // Example status code (Bank statcus success)
            logMsg('Bank details collected successfully')
            break
          case '100': // Example status code
            // console.log('Credit Sense Statement Upload Complete')
            break
        }
      },
    })
  })

  return (
    <Stack direction='column' spacing={downMd ? 2 : 5} justifyContent='center' alignItems='center'>
      <Stack component={motion.div} {...varFade({ distance: 25, durationIn: 0.5, durationOut: 0.5 }).inDown}>
        <Paper elevation={8} sx={{ mt: 2 }}>
          <Alert sx={{ textAlign: 'center' }} variant='standard' color='info' icon={<InfoOutlinedIcon fontSize='medium' />}>
            {/* <AlertTitle>Previous Residence</AlertTitle> */}
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
                {/* <Button
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
                  onClick={() => getCerditSenseAlert()}
                >
                  Get Current Status
                </Button> */}
              </Stack>
              {showCreditSense && (
                <Stack component={motion.div} {...varSubtitle} direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{ pt: 2, width: '100%' }}>
                  {/* <Alert
                    variant='outlined'
                    severity={
                      creditSenseResponseCode == null
                        ? 'info'
                        : creditSenseCodes
                            ?.filter((item) => {
                              return parseInt(item?.Code) === creditSenseResponseCode
                            })
                            ?.map((item) => {
                              return item?.SeverityType
                            })[0]
                    }
                  >
                    <AlertTitle>
                      {creditSenseResponseCode == null
                        ? 'Loading...'
                        : creditSenseCodes
                            ?.filter((item) => {
                              return parseInt(item?.Code) === creditSenseResponseCode
                            })
                            ?.map((item) => {
                              return item?.AlertTitle
                            })[0]}
                    </AlertTitle>
                    {creditSenseResponseCode == null
                      ? 'Please wait while we load the Credie Sense portal.'
                      : creditSenseCodes
                          ?.filter((item) => {
                            return parseInt(item?.Code) === creditSenseResponseCode
                          })
                          ?.map((item) => {
                            return item?.AlertContent
                          })[0]}
                  </Alert> */}
                  <Iframe url={src} width='100%' height='800px' id='fcu-cs-iframe' display='block' position='relative' frameBorder='0' />
                </Stack>
              )}
            </Stack>
            {/* 
              <Box sx={{ minWidth: 275 }}>
                <CardContent>
                  <Stack>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }} color='text.secondary' gutterBottom>
                    Secure Bank Statement Upload
                  </Typography>

                  </Stack>
                  
                </CardContent>
              </Box> */}
          </Stack>
          <Divider variant='fullWidth' sx={{ width: '100%', maxWidth: 500 }}>
            <Chip size='small' label='OR' />
          </Divider>
          <Stack direction='column' spacing={2} sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
            <Stack direction='row' spacing={2} sx={{ width: '100%' }} justifyContent='center' alignItems='center'>
              {/* <Radio size='small' /> */}
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

      {/* <DropZone customValidator={bankStatementValidator} files={acceptedFiles} accept={{ 'application/pdf': ['.pdf'] }} showFiles={true} onChange={handleFileSelect} /> */}
      {/* <Button onClick={handleiFrame}>Get iframe from window</Button> */}
    </Stack>
  )
}
