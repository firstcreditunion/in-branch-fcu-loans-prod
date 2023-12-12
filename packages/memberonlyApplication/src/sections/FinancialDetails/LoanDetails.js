import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, Box, Paper, Divider, FormControl, Switch } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import Grid from '@mui/material/Unstable_Grid2'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { loanDetailsActions } from '../../redux/slices/loanDetailsSlice'
import { clientSearchActions, getPrimeClientGeneralDetails, updateInterestRateEstimation } from '../../redux/slices/clientSearchSlice'
import { creditHistoryTypes } from '../../redux/codes/LoanDetailsCodes'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

import { getCreditHistory_FromValue } from '../../redux/codes/getKeysOrValues'

import RHFLoanDetails from '../../forms/FinancialDetails/RHFLoanDetails'
import LoanCalculator from './LoanCalculator'
import SummaryPortal from './SummaryPortal'

export default function LoanDetails() {
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const dispatch = useDispatch()

  const showLoanSummary = useSelector((state) => state.loanDetailsReducer.showSummary)

  const requestedLoanAmount = useSelector((state) => state.loanDetailsReducer.requestedLoanAmount)
  const creditHistory = useSelector((state) => state.loanDetailsReducer.creditHistory)
  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)

  const loading = useSelector((state) => state.loanCalculatorReducer.loading)
  const currentRequestId = useSelector((state) => state.loanCalculatorReducer.currentRequestId)

  // const defaultValues = {
  //   showLoanSummary: showLoanSummary,
  // }

  // Schema
  // const LoanDetailsSchema = Yup.object().shape({
  //   isJointLoan: Yup.string(),
  //   jointclientNumber: Yup.string().when('isJointLoan', {
  //     is: (jointApplicant) => {
  //       return jointApplicant === 'N'
  //     },
  //     then: Yup.string().nullable(),
  //     otherwise: Yup.string().required('Joint member number is required.').nullable(),
  //   }),
  // })

  //UseForm Methods from RHF

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  useEffect(async () => {

    var clientData = JSON.stringify({
      clientID: primeClientNumber,
      include: '',
      proposedLoan: requestedLoanAmount,
      creditHistory: getCreditHistory_FromValue(creditHistory)?.key,
    })
    // console.log('Making Client DATA', clientData)
    const personalDetialsConfig = {
      url: '/client-details',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: clientData,
    }
    // console.log('Making Client Data Request CONFIG', personalDetialsConfig)
    const clientDetailsResult = await dispatch(updateInterestRateEstimation(personalDetialsConfig))

    // console.log('Making Client Data RESPONSE', clientDetailsResult)
  }, [creditHistory])

  function showSummary() {
    dispatch(loanDetailsActions.setShowSummary(!showLoanSummary))
  }

  return (
    <>
      <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ maxWidth: '100%', minHeight: '100%' }}>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={5} sx={{ width: '100%' }}>
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
            Financial Details
          </Typography>
          <Divider orientation='vertical' flexItem />
          <FormControl>
            <Stack>
              <Switch checked={showLoanSummary} onChange={showSummary} inputProps={{ 'aria-label': 'Summary' }} />
              <Typography variant='caption' color='secondary'>
                {showLoanSummary ? 'Hide Summary' : 'Show Summary'}
              </Typography>
            </Stack>
          </FormControl>
        </Stack>
        <Grid container spacing={10} sx={{ width: '100%' }}>
          <Grid md={6}>
            <RHFLoanDetails />
          </Grid>
          <Grid md={6}>
            <LoanCalculator />
          </Grid>
        </Grid>
      </Stack>
      {showLoanSummary && <SummaryPortal />}
    </>
  )
}
