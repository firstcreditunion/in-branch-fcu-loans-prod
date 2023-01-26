import React, { useEffect } from 'react'

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
// import { useForm, Controller } from 'react-hook-form'

// * MUI - Styles
import { styled } from '@mui/material/styles'

// * MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Modal from '@mui/material/Modal'
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

import { getCloudFrontEnvironment } from '../../redux/utils/apiConstants'
import { genericStatusCodes, bankStatusCodes, supportingDocsStatusCodes } from './codes/CreditSense'

import LoadingScreen from '../../components/LoadingScreen'

import { fDateCustom } from '../../utils/formatDateTime'

const maxLength = 50

const CreditSenseBorder = styled('div')(({ theme }) => ({
  outline: 'none',
  position: 'relative',
  height: '100%',
  transition: theme.transitions.create('padding'),
}))

let creditSenseAppId = null
var creditSenseResponseCode = null

const useCreditsense = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('useStopwatch useEffect')
    const interval = setInterval(() => {
      console.log(`Count = ${count}`)
      setCount((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return count
}

export default function BankStatement() {
  const [showCreditSense, setShowCreditSense] = React.useState(false)
  const [creditSenseResponse, setCreditSenseResponse] = React.useState(null)
  const [reRender, setReRender] = React.useState(false)
  const creditSenseCodes = [...genericStatusCodes, ...bankStatusCodes, ...supportingDocsStatusCodes]
  const [creditSenseIframeResposne, setCreditSenseIframeResposne] = React.useState(null)

  const handleClose = () => setShowCreditSense(false)

  const employmentType = useSelector((state) => state.employmentReducer.employmentType)
  const lastName = useSelector((state) => state.yourPersonalDetailReducer.lastName)
  // const creditSenseResponseCode = useSelector((state) => state.bankStatementReducer.creditSenseResponseCode)

  const dispatch = useDispatch()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: downMd ? '100%' : 970,
    height: downMd ? '90%' : '580px',
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    borderRadius: 2,
    boxShadow: 24,
    p: downMd ? 2 : 4,
  }

  //? Standard iFrame - const src = `https://creditsense.co.nz/apply/${getCloudFrontEnvironment() === 'SS-PROD' ? 'FSCU01' : 'FSCU03'}/?method=iframe&uniqueAppRef=true&appRef=${getAppRef()}&debugBanks=${getCloudFrontEnvironment() === 'SS-PROD' ? 'false' : 'true'}&termsBeforeCredentials=true&winz=${employmentType === 'Beneficiary' ? 'ask' : 'skip'}`

  const src = `https://creditsense.co.nz/apply/${getCloudFrontEnvironment() === 'SS-PROD' ? 'FSCU01' : 'FSCU03'}/?method=iframe`

  function logMsg(message) {
    if (typeof console == 'object') console.log(message)
    else alert(message)
  }

  jQuery(function () {
    $.CreditSense.Iframe({
      client: `${getCloudFrontEnvironment() === 'SS-PROD' ? 'FSCU01' : 'FSCU03'}`,
      elementSelector: '#fcu-cs-iframe',
      enableDynamicHeight: true,
      params: {
        appRef: getAppRef(),
        uniqueAppRef: true,
        debugBanks: `${getCloudFrontEnvironment() === 'SS-PROD' ? false : true}`,
        multibank: true,
        termsBeforeCredentials: true,
        winz: `${employmentType === 'Beneficiary' ? 'ask' : 'skip'}`,
        askOnlineBanking: true,
      },
      callback: function (response, data) {
        if (creditSenseAppId == null) creditSenseAppId = data

        if (Number(response)) {
          if (creditSenseResponseCode === 100 || creditSenseResponseCode === response) return
          creditSenseResponseCode = parseInt(response)
          console.log('PARSE INT NUMBER: ', parseInt(response))
        }

        switch (response) {
          case '99': // Example status code (Bank statcus success)
            logMsg('Bank details collected successfully')
            break
          case '100': // Example status code
            console.log('Credit Sense Statement Upload Complete')
            break
        }
      },
    })
  })
  return (
    <Stack direction='column' spacing={downMd ? 2 : 5} justifyContent='center' alignItems='center' sx={{ minHeight: '100%' }}>
      <Stack component={motion.div} {...varFade({ distance: 25, durationIn: 0.5, durationOut: 0.5 }).inDown}>
        <Paper elevation={8} sx={{ mt: 2 }}>
          <Alert sx={{ textAlign: 'center' }} variant='standard' color='info' icon={<InfoOutlinedIcon fontSize='medium' />}>
            Due to regulation changes, we need your bank statements for the last <strong>90 days</strong>.
          </Alert>
        </Paper>
      </Stack>
      <Stack direction='column' justifyContent='center' alignItems='center' spacing={8} sx={{ width: '100%', height: '100%', minHeight: '100%' }}>
        <Stack direction='column' sx={{ width: '100%', height: '100%', minHeight: '100%' }} justifyContent='center' alignItems='center'>
          <Stack direction='column' spacing={2} sx={{ width: '100%', height: '100%', minHeight: '100%' }} justifyContent='center' alignItems='center'>
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
            <Stack
              direction='column'
              spacing={2}
              sx={{
                width: '100%',
                height: '100%',
                minHeight: '100%',
              }}
              justifyContent='center'
              alignItems='center'
            >
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
              <Modal open={showCreditSense} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} sx={style}>
                  <Iframe id='fcu-cs-iframe' url={src} width='100%' height='100%' display='block' overflow='visible' frameBorder='0' />
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      borderRadius: '49px',
                      width: 400,
                      border: 'none',
                      fontWeight: 600,
                      transition: '.5s',
                    }}
                    onClick={handleClose}
                  >
                    Return to Application
                  </Button>
                </Stack>
              </Modal>
            </Stack>
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
      {/* </CreditSenseBorder> */}
    </Stack>
  )
}

function AlertModal() {
  return <Typography>Response Code Text</Typography>
}

//! -------------------------------------------------------- Responsive iFrame --------------------------------------------------------

// let creditSenseAppId = null
// let creditSenseResponseCode = null

// const creditSenseCodes = [...genericStatusCodes, ...bankStatusCodes, ...supportingDocsStatusCodes]

// function bankStatementValidator(file) {
//   if (file?.name?.length > maxLength) {
//     return {
//       code: 'name-too-large',
//       message: `File name is larger than ${maxLength} characters`,
//     }
//   }

//   return null
// }

// const acceptedFiles = useSelector((state) => state.bankStatementReducer.acceptedFiles)
// const iFrameLoaded = useSelector((state) => state.bankStatementReducer.iFrameLoaded)
// const [creditSenseIframeResposne, setCreditSenseIframeResposne] = React.useState(null)

// const creditSenseCodes = [...genericStatusCodes, ...bankStatusCodes, ...supportingDocsStatusCodes]

// const handleFileSelect = useCallback(
//   (acceptedFiles) => {
//     dispatch(bankStatementActions.setAcceptedFiles(acceptedFiles))
//   },
//   [acceptedFiles]
// )

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

// function onApplicationSuccess() {
//   console.log('On Application Success Called')
// }

// function getCerditSenseAlert() {
//   creditSenseCodes?.filter((item) => {
//     return parseInt(item?.Code) === creditSenseResponseCode
//   })

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

// jQuery(function () {
//   $.CreditSense.Iframe({
//     client: `${processNodeEnv() === 'development' ? 'FSCU03' : 'FSCU01'}`,
//     elementSelector: '#fcu-cs-iframe',
//     enableDynamicHeight: true,
//     params: {
//       appRef: getAppRef(),
//       uniqueAppRef: true,
//       debugBanks: true,
//       // debugBanks: `${processNodeEnv() === 'development' ? true : false}`,
//       multibank: true,
//       termsBeforeCredentials: true,
//       centrelink: employmentType === 'Beneficiary' ? 'ask' : 'skip',
//       askOnlineBanking: true,
//     },
//     callback: function (response, data) {
//       // console.log('MY CONSOLE LOG for IFRAME REPONSE =>', response)
//       // console.log('MY CONSOLE LOG for IFRAME DATA: ', data)

//       if (creditSenseAppId == null) creditSenseAppId = data

//       if (Number(response)) {
//         if (creditSenseResponseCode === 100 || creditSenseResponseCode === response) return

//         creditSenseResponseCode = parseInt(response)
//         // dispatch(bankStatementActions.setCreditSenseResponseCode(parseInt(response)))
//         // console.log('RESPONSE IS A NUMBER')
//         // console.log('PARSE INT creditSenseIframeResponseCode: ', creditSenseResponseCode)
//         // console.log('PARSE INT NUMBER: ', parseInt(response))
//       }
//       // console.log('MY CONSOLE LOG for IFRAME creditSenseAppId: ', creditSenseAppId)
//       switch (response) {
//         case '99': // Example status code (Bank statcus success)
//           logMsg('Bank details collected successfully')
//           break
//         case '100': // Example status code
//           // console.log('Credit Sense Statement Upload Complete')
//           break
//       }
//     },
//   })
// })

{
  /* <AlertTitle>Previous Residence</AlertTitle> */
}

{
  /* <Button
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
                </Button> */
}

{
  /* <Alert
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
                  </Alert> */
}

{
  /* 
              <Box sx={{ minWidth: 275 }}>
                <CardContent>
                  <Stack>
                  <Typography variant='body1' sx={{ fontWeight: 'bold' }} color='text.secondary' gutterBottom>
                    Secure Bank Statement Upload
                  </Typography>

                  </Stack>
                  
                </CardContent>
              </Box> */
}

{
  /* <DropZone customValidator={bankStatementValidator} files={acceptedFiles} accept={{ 'application/pdf': ['.pdf'] }} showFiles={true} onChange={handleFileSelect} /> */
}
{
  /* <Button onClick={handleiFrame}>Get iframe from window</Button> */
}
