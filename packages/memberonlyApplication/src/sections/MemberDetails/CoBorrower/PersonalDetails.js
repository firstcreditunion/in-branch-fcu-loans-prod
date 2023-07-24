import React from 'react'

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

export default function PersonalDetails() {
  const dispatch = useDispatch()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  // Mmeber Details state
  const jointid = useSelector((state) => state.clientSearchReducer.jointid)
  const forenames = useSelector((state) => state.clientSearchReducer.jointforenames)
  const gender = useSelector((state) => state.clientSearchReducer.jointgender)
  const maritalStatus = useSelector((state) => state.clientSearchReducer.jointmaritalStatus)
  const recordStatus = useSelector((state) => state.clientSearchReducer.jointrecordStatus)
  const surname = useSelector((state) => state.clientSearchReducer.jointsurname)
  const title = useSelector((state) => state.clientSearchReducer.jointtitle)
  const dateOfBirth = useSelector((state) => state.clientSearchReducer.jointdateOfBirth)
  const loadedDate = useSelector((state) => state.clientSearchReducer.jointloadedDate)

  const memberName = title + ' ' + forenames + ' ' + surname

  //Constants to Check Against
  const memberSinceInMonthsDefault = useSelector((state) => state.clientSearchReducer.jointmemberSinceInMonthsDefault) //3

  //Checks
  const isAdult = useSelector((state) => state.clientSearchReducer.jointisAdult)
  const age = useSelector((state) => state.clientSearchReducer.jointage)
  const durationSinceJoined = useSelector((state) => state.clientSearchReducer.jointdurationSinceJoined)
  const durationSinceJoinedInMonths = useSelector((state) => state.clientSearchReducer.jointdurationSinceJoinedInMonths)
  const missingDateOfBirth = useSelector((state) => state.clientSearchReducer.jointmissingDateOfBirth)
  const totalExposure = useSelector((state) => state.clientSearchReducer.jointLending.totalExposure)
  const totalArrears = useSelector((state) => state.clientSearchReducer.jointLending.totalArrears)
  const jointActiveRecoveryCount = useSelector((state) => state.clientSearchReducer.jointRecovery.activeAccountCount)
  const jointinactiveRecvAccountCount = useSelector((state) => state.clientSearchReducer.jointRecovery.inactiveAccountCount)
  const totalLoanExposureUpperLimit = useSelector((state) => state.clientSearchReducer.totalLoanExposureUpperLimit)
  const exceedsLoanExposureLimit = totalExposure > totalLoanExposureUpperLimit
  const eligibleForMemberOnlyLoans = useSelector((state) => state.clientSearchReducer.jointeligibleForMemberOnlyLoans)

  const minMembershipLengthSatisfied = durationSinceJoinedInMonths >= memberSinceInMonthsDefault

  //API States
  const jointclientSearchRequestId = useSelector((state) => state.clientSearchReducer.jointcurrentRequestId)
  const jointclientSearchLoading = useSelector((state) => state.clientSearchReducer.jointloading)

  const jointmemberNumberIsEmpty = jointid == null || jointid === ''
  const jointmemberNumberIsNotEmpty = !(jointid == null) || !(jointid === '')
  const jointatLeastOneReqestMade = !(jointclientSearchRequestId == null)
  const jointrequestisNotPending = !(jointclientSearchLoading === 'PENDING')

  const jointmemberNotFound = jointmemberNumberIsEmpty && jointatLeastOneReqestMade && jointrequestisNotPending
  const searchInitiatedAndCompleted = jointmemberNumberIsNotEmpty && jointatLeastOneReqestMade && jointrequestisNotPending

  // console.log('durationSinceJoinedInMonths: ', durationSinceJoinedInMonths)
  // console.log('memberSinceInMonthsDefault: ', memberSinceInMonthsDefault)
  // console.log('minMembershipLengthSatisfied: ', minMembershipLengthSatisfied)

  //Eligibility
  if (isAdult && durationSinceJoinedInMonths >= memberSinceInMonthsDefault && !(jointid == null) && !exceedsLoanExposureLimit && totalArrears <= 0 && jointActiveRecoveryCount + jointinactiveRecvAccountCount === 0) {
    dispatch(clientSearchActions.setJointEligibleForMemberOnlyLoans(true))
  } else {
    dispatch(clientSearchActions.setJointEligibleForMemberOnlyLoans(false))
  }

  if (jointmemberNotFound) return <></>

  return (
    <>
      <Stack direction='column' spacing={3} sx={{ width: '100%', maxWidth: '700px' }}>
        {searchInitiatedAndCompleted && (
          <Alert severity={eligibleForMemberOnlyLoans ? 'success' : 'error'}>
            <AlertTitle>Eligibility</AlertTitle>
            {eligibleForMemberOnlyLoans ? 'Member is Eligible for Member-Only Loan.' : 'Please check the item(s) below before applying for a Member-Only Loan.'}
          </Alert>
        )}
        <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
          {missingDateOfBirth && (
            <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1} sx={{ px: 2 }}>
              <ErrorOutlineIcon color='error' />
              <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5}>
                <Typography variant='caption' sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
                  Date of birth
                </Typography>
                <Typography variant='overline'>
                  Date of birth is <strong>missing in G3</strong>.
                </Typography>
              </Stack>
            </Stack>
          )}
          {!missingDateOfBirth && (
            <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1} sx={{ px: 2 }}>
              {isAdult ? <CheckIcon color='success' /> : <ErrorOutlineIcon color='error' />}
              <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5}>
                <Typography variant='caption' sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
                  Date of birth
                </Typography>
                <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5} sx={{ width: '100%' }}>
                  <Typography variant='body1'>{isDate(new Date(dateOfBirth)) ? fDate(dateOfBirth) : ''}</Typography>
                  {!isAdult && (
                    <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                      Member is not 18 years old yet.
                    </Typography>
                  )}
                  {isAdult && (
                    <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                      {age} old.
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>
          )}

          <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1} sx={{ px: 2, width: '100%' }}>
            {minMembershipLengthSatisfied ? <CheckIcon color='success' /> : <ErrorOutlineIcon color='error' />}
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5} sx={{ width: '100%' }}>
              <Typography variant='caption' sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
                Member Since
              </Typography>
              <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5} sx={{ width: '100%' }}>
                <Typography variant='body1'>{isDate(new Date(loadedDate)) ? fDate(loadedDate) : ''}</Typography>
                {!minMembershipLengthSatisfied && (
                  <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                    New member, less than 3 months.
                  </Typography>
                )}
                {minMembershipLengthSatisfied && (
                  <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                    {durationSinceJoined}.
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}
