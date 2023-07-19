import React, { useEffect } from 'react'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { clientSearchActions } from '../../../redux/slices/clientSearchSlice'

import useMediaQuery from '@mui/material/useMediaQuery'
import { Typography, Alert, AlertTitle, Stack } from '@mui/material'

import WarningIcon from '@mui/icons-material/Warning'
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
  const clientSearchRequestId = useSelector((state) => state.clientSearchReducer.jointcurrentRequestId)
  const clientSearchLoading = useSelector((state) => state.clientSearchReducer.jointloading)

  // Mmeber Details state
  const id = useSelector((state) => state.clientSearchReducer.jointid)
  const joints6Balance = useSelector((state) => state.clientSearchReducer.jointFunding.s6Balance)

  return (
    <Stack direction='column' spacing={3} sx={{ width: '100%', maxWidth: '700px' }}>
      <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
        <Stack direction='row' justifyContent='flex-start' alignItems='flex-start' spacing={1} sx={{ px: 2 }}>
          {joints6Balance <= 0 ? <WarningIcon color='warning' /> : <CheckIcon color='success' />}
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5}>
            <Typography variant='caption' sx={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'text.secondary' }}>
              S6 Loan Providerjoint Balance
            </Typography>
            <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={0.5} sx={{ width: '100%' }}>
              <Typography variant='body1'>{fCurrency(joints6Balance)}</Typography>
              {joints6Balance <= 0 && (
                <Typography variant='overline' sx={{ textTransform: 'uppercase' }}>
                  Member does not have an S6 account.
                </Typography>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
