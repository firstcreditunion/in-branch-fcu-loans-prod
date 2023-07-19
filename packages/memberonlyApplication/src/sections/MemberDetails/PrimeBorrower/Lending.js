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
import { fCurrency } from '../../../utils/formatNumber'

import { isDate } from 'date-fns'

export default function PersonalDetails() {
  const dispatch = useDispatch()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  //API States
  const clientSearchRequestId = useSelector((state) => state.clientSearchReducer.primecurrentRequestId)
  const clientSearchLoading = useSelector((state) => state.clientSearchReducer.primeloading)

  // Mmeber Details state
  const id = useSelector((state) => state.clientSearchReducer.primeid)
  const totalExposure = useSelector((state) => state.clientSearchReducer.primeLending.totalExposure)
  const totalArrears = useSelector((state) => state.clientSearchReducer.primeLending.totalArrears)
  const activeAccountCount = useSelector((state) => state.clientSearchReducer.primeLending.activeAccountCount)
  const settledAccountCount = useSelector((state) => state.clientSearchReducer.primeLending.settledAccountCount)

  const activeRecvAccountCount = useSelector((state) => state.clientSearchReducer.primeRecovery.activeAccountCount)
  const inactiveRecvAccountCount = useSelector((state) => state.clientSearchReducer.primeRecovery.inactiveAccountCount)
  const recvBalance = useSelector((state) => state.clientSearchReducer.primeRecovery.balance)

  //Constants to Check Against
  const memberSinceInMonthsDefault = useSelector((state) => state.clientSearchReducer.primememberSinceInMonthsDefault) //3

  //Checks
  const isAdult = useSelector((state) => state.clientSearchReducer.primeisAdult)
  const durationSinceJoinedInMonths = useSelector((state) => state.clientSearchReducer.primedurationSinceJoinedInMonths)

  const totalLoanExposureUpperLimit = useSelector((state) => state.clientSearchReducer.totalLoanExposureUpperLimit)
  const exceedsLoanExposureLimit = totalExposure > totalLoanExposureUpperLimit

  const atLeastOneReqestMade = !(clientSearchRequestId == null)
  const requestisNotPending = !(clientSearchLoading === 'PENDING')

  return (
    <Stack direction='column' spacing={3} sx={{ width: '100%', maxWidth: '700px' }}>
      <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
        <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1} sx={{ px: 2 }}>
          {!exceedsLoanExposureLimit ? <CheckIcon color='success' /> : <ErrorOutlineIcon color='error' />}
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5}>
            <Typography variant='caption' sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
              Total Loan Exposure
            </Typography>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5} sx={{ width: '100%' }}>
              <Typography variant='body1'>{fCurrency(totalExposure)}</Typography>
              {exceedsLoanExposureLimit && (
                <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                  Exceeds Maximum Loan Exposure of {fCurrency(totalLoanExposureUpperLimit)}.
                </Typography>
              )}
              {!exceedsLoanExposureLimit && (
                <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                  Within Maximum Loan Exposure.
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1} sx={{ px: 2 }}>
          {totalArrears <= 0 ? <CheckIcon color='success' /> : <ErrorOutlineIcon color='error' />}
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5}>
            <Typography variant='caption' sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
              Arrears Balance
            </Typography>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5} sx={{ width: '100%' }}>
              <Typography variant='body1'>{fCurrency(totalArrears)}</Typography>
              {totalArrears > 0 && (
                <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                  Member is in arrears.
                </Typography>
              )}
              {totalArrears === 0 && (
                <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                  Member is not in Arrears
                </Typography>
              )}
              {totalArrears < 0 && (
                <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                  Member is in advance
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
        <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1} sx={{ px: 2 }}>
          {totalArrears <= 0 ? <CheckIcon color='success' /> : <ErrorOutlineIcon color='error' />}
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5}>
            <Typography variant='caption' sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
              Recovery Account Balance
            </Typography>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5} sx={{ width: '100%' }}>
              <Typography variant='body1'> {fCurrency(recvBalance)}</Typography>
              {activeRecvAccountCount + inactiveRecvAccountCount > 0 && (
                <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                  Member has {activeRecvAccountCount} active accounts and {inactiveRecvAccountCount} inactive accounts.
                </Typography>
              )}
              {activeRecvAccountCount + inactiveRecvAccountCount === 0 && (
                <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                  Member has never been in recovery.
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
