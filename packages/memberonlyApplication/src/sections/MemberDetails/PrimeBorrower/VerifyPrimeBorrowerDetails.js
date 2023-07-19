import React, { useEffect, useState } from 'react'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { verifyPrimeDetailsActions } from '../../../redux/slices/verifyPrimeDetailsSlice'

import useMediaQuery from '@mui/material/useMediaQuery'
import { Typography, Alert, AlertTitle, Stack, Divider, Snackbar } from '@mui/material'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../../redux/utils/apiConstants'

import { getPrimeIdentification, getPrimeEmploymentDetails, getPrimeContactDetails, getPrimeAddresses } from '../../../redux/slices/verifyPrimeDetailsSlice'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckIcon from '@mui/icons-material/Check'

import PersonalDetailsDisplay from './DisplayComponents/PersonalDetails'
import Identifications from './DisplayComponents/Identifications'
import EmployemntDetails from './DisplayComponents/EmployemntDetails'
import ContactDetails from './DisplayComponents/ContactDetails'
import Addresses from './DisplayComponents/Addresses'

import { isDate } from 'date-fns'

import Loading from '../../../components/Loading'

export default function PersonalDetails() {
  const [open, setOpen] = useState(false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  const dispatch = useDispatch()

  //* Member Details
  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)

  const primePersonalDetailsVerified = useSelector((state) => state.verifyPrimeDetailsReducer.primePersonalDetailsVerified)

  const primeIdentificationDetailsVerified = useSelector((state) => state.verifyPrimeDetailsReducer.primeIdentificationDetailsVerified)
  const hasIdentifications = useSelector((state) => state.verifyPrimeDetailsReducer.hasIdentifications)

  const primeEmploymentDetailsVerified = useSelector((state) => state.verifyPrimeDetailsReducer.primeEmploymentDetailsVerified)
  const hasEmploymentDetails = useSelector((state) => state.verifyPrimeDetailsReducer.hasEmploymentDetails)

  const primeContactDetailsVerified = useSelector((state) => state.verifyPrimeDetailsReducer.primeContactDetailsVerified)
  const hasContactDetails = useSelector((state) => state.verifyPrimeDetailsReducer.hasContactDetails)

  const primeAddressesVerified = useSelector((state) => state.verifyPrimeDetailsReducer.primeAddressesVerified)
  const hasAddresses = useSelector((state) => state.verifyPrimeDetailsReducer.hasAddresses)

  const onSubmitVerifyPrimeDetails = useSelector((state) => state.verifyPrimeDetailsReducer.onSubmitVerifyPrimeDetails)
  const isValidVerifyPrimeDetails = useSelector((state) => state.verifyPrimeDetailsReducer.isValidVerifyPrimeDetails)

  useEffect(async () => {
    //* Data:
    //? Identification
    var clientIdentificationData = JSON.stringify({
      clientID: primeClientNumber,
      include: 'identifications',
    })

    //? Employment
    var clientEmploymentData = JSON.stringify({
      clientID: primeClientNumber,
      include: 'employments',
    })

    //? Contact
    var clientContactData = JSON.stringify({
      clientID: primeClientNumber,
      include: 'contacts',
    })

    //? Addresses
    var clientAddressData = JSON.stringify({
      clientID: primeClientNumber,
      include: 'addresses',
    })

    const identificationDetailsConfig = {
      url: '/client-details',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: clientIdentificationData,
    }

    const employmentDetailsConfig = {
      url: '/client-details',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: clientEmploymentData,
    }

    const contactDetailsConfig = {
      url: '/client-details',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: clientContactData,
    }

    const addressDetailsConfig = {
      url: '/client-details',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: clientAddressData,
    }

    //* Request
    const primeIdentificationResult = await dispatch(getPrimeIdentification(identificationDetailsConfig))
    const primeEmploymentResult = await dispatch(getPrimeEmploymentDetails(employmentDetailsConfig))
    const primeContactResult = await dispatch(getPrimeContactDetails(contactDetailsConfig))
    const primeAddressResult = await dispatch(getPrimeAddresses(addressDetailsConfig))
  }, [])

  useEffect(() => {
    if (primePersonalDetailsVerified && (primeIdentificationDetailsVerified || !hasIdentifications) && (primeEmploymentDetailsVerified || !hasEmploymentDetails) && (primeContactDetailsVerified || !hasContactDetails) && (primeAddressesVerified || !hasAddresses)) {
      dispatch(verifyPrimeDetailsActions.setIsValidVerifyPrimeDetails(true))
    } else {
      dispatch(verifyPrimeDetailsActions.setIsValidVerifyPrimeDetails(false))
    }
  }, [primePersonalDetailsVerified, primeIdentificationDetailsVerified, primeEmploymentDetailsVerified, primeContactDetailsVerified, primeAddressesVerified])

  useEffect(() => {
    if (primePersonalDetailsVerified && primeIdentificationDetailsVerified && primeEmploymentDetailsVerified && primeContactDetailsVerified && primeAddressesVerified) {
      setOpen(false)
      return
    }

    if (onSubmitVerifyPrimeDetails == null) return

    setOpen(true)
  }, [onSubmitVerifyPrimeDetails])

  return (
    <Stack direction='column' spacing={3} sx={{ width: '100%' }}>
      <Stack direction='column' alignItems='center' justifyContent='center' spacing={1}>
        <Typography
          variant='h4'
          color='primary'
          sx={{
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: 'light',
            letterSpacing: 3,
          }}
        >
          Verify Member Details
        </Typography>
        <Typography variant='subtitle2' sx={{ color: 'text.secondary', fontWeight: 'light' }}>
          Please go through each section and make sure that the details are <strong>correct</strong> and <strong>relevant</strong>.
        </Typography>
      </Stack>

      <PersonalDetailsDisplay />
      <Identifications />
      <EmployemntDetails />
      <ContactDetails />
      <Addresses />
      <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity='error' sx={{ width: '100%' }}>
          Please verify each section before proceeding!
        </Alert>
      </Snackbar>
    </Stack>
  )
}
