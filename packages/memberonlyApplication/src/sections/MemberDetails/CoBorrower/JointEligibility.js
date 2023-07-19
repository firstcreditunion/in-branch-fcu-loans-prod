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
import ClientSummaryPortal from './ClientSummaryPortal'

export default function JointEligibility() {
  const dispatch = useDispatch()

  // Mmeber Details state
  const id = useSelector((state) => state.clientSearchReducer.jointid)
  const forenames = useSelector((state) => state.clientSearchReducer.jointforenames)
  const gender = useSelector((state) => state.clientSearchReducer.jointgender)
  const age = useSelector((state) => state.clientSearchReducer.jointage)
  const maritalStatus = useSelector((state) => state.clientSearchReducer.jointmaritalStatus)
  const recordStatus = useSelector((state) => state.clientSearchReducer.jointrecordStatus)
  const surname = useSelector((state) => state.clientSearchReducer.jointsurname)
  const title = useSelector((state) => state.clientSearchReducer.jointtitle)
  const dateOfBirth = useSelector((state) => state.clientSearchReducer.jointdateOfBirth)

  const memberName = title + ' ' + forenames + ' ' + surname

  //Checks
  const missingDateOfBirth = useSelector((state) => state.clientSearchReducer.jointmissingDateOfBirth)

  //API States
  const jointclientSearchRequestId = useSelector((state) => state.clientSearchReducer.jointcurrentRequestId)
  const jointclientSearchLoading = useSelector((state) => state.clientSearchReducer.jointloading)

  const jointmemberNumberIsEmpty = id == null || id === ''
  const jointmemberNumberIsNotEmpty = !(id == null) || !(id === '')
  const jointatLeastOneReqestMade = !(jointclientSearchRequestId == null)
  const jointrequestisNotPending = !(jointclientSearchLoading === 'PENDING')

  const jointmemberNotFound = jointmemberNumberIsEmpty && jointatLeastOneReqestMade && jointrequestisNotPending
  const searchInitiatedAndCompleted = jointmemberNumberIsNotEmpty && jointatLeastOneReqestMade && jointrequestisNotPending

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  if (jointmemberNotFound) return <></>

  return (
    <Stack direction='column' spacing={5} justifyContent='center' alignItems='center'>
      <ClientSummaryPortal />
      <AppWidget title={memberName} age={age} maritalStatus={maritalStatus} recordStatus={recordStatus} missingDateOfBirth={missingDateOfBirth} dateOfBirth={dateOfBirth} gender={gender} clientRole='COBOR' />
      <Stack direction='column' spacing={2} justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
        <PersonalDetails />
        <Funding />
        <Lending />
      </Stack>
    </Stack>
  )
}
