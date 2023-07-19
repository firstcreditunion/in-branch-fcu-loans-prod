import React, { useEffect } from 'react'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { clientSearchActions } from '../../../redux/slices/clientSearchSlice'

import useMediaQuery from '@mui/material/useMediaQuery'
import { Typography, Alert, AlertTitle, Stack } from '@mui/material'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckIcon from '@mui/icons-material/Check'

//* Utility Functions
import { fDate } from '../../../utils/formatDateTime'

import { isDate } from 'date-fns'

import AppWidget from '../../../components/AppWidget'

import PersonalDetails from './PersonalDetails'
import Funding from './Funding'
import Lending from './Lending'

export default function PrimeEligibility() {
  const dispatch = useDispatch()

  // Mmeber Details state
  const id = useSelector((state) => state.clientSearchReducer.primeid)
  const forenames = useSelector((state) => state.clientSearchReducer.primeforenames)
  const gender = useSelector((state) => state.clientSearchReducer.primegender)
  const age = useSelector((state) => state.clientSearchReducer.primeage)
  const maritalStatus = useSelector((state) => state.clientSearchReducer.primemaritalStatus)
  const recordStatus = useSelector((state) => state.clientSearchReducer.primerecordStatus)
  const surname = useSelector((state) => state.clientSearchReducer.primesurname)
  const title = useSelector((state) => state.clientSearchReducer.primetitle)
  const dateOfBirth = useSelector((state) => state.clientSearchReducer.primedateOfBirth)

  const memberName = title + ' ' + forenames + ' ' + surname

  //Checks
  const missingDateOfBirth = useSelector((state) => state.clientSearchReducer.primemissingDateOfBirth)

  //API States
  const primeclientSearchRequestId = useSelector((state) => state.clientSearchReducer.primecurrentRequestId)
  const primeclientSearchLoading = useSelector((state) => state.clientSearchReducer.primeloading)

  const primememberNumberIsEmpty = id == null || id === ''
  const primememberNumberIsNotEmpty = !(id == null) || !(id === '')
  const primeatLeastOneReqestMade = !(primeclientSearchRequestId == null)
  const primerequestisNotPending = !(primeclientSearchLoading === 'PENDING')

  const primememberNotFound = primememberNumberIsEmpty && primeatLeastOneReqestMade && primerequestisNotPending
  const searchInitiatedAndCompleted = primememberNumberIsNotEmpty && primeatLeastOneReqestMade && primerequestisNotPending

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  if (primememberNotFound) return <></>

  return (
    <Stack direction='column' spacing={5} justifyContent='center' alignItems='center'>
      <AppWidget title={memberName} age={age} maritalStatus={maritalStatus} recordStatus={recordStatus} missingDateOfBirth={missingDateOfBirth} dateOfBirth={dateOfBirth} gender={gender} clientRole='PRIMEB' />
      <Stack direction='column' spacing={2} justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
        <PersonalDetails />
        <Funding />
        <Lending />
      </Stack>
    </Stack>
  )
}
