import React, { useEffect } from 'react'

//* MUI
import { styled } from '@mui/material/styles'
import { Box, Paper, Stack, Typography, Divider, Skeleton } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'

import CountUp from 'react-countup'
import { NumericFormat } from 'react-number-format'

import { isDate } from 'date-fns'

//* redux
import { useDispatch, useSelector } from 'react-redux'
import { processNodeEnv, BASE_URL_AWS_APP, BASE_URL_LOCAL_APP } from '../../redux/utils/apiConstants'
import { getRepaymentDetails } from '../../redux/slices/loanCalculatorSlice'
import { loanDetailsActions } from '../../redux/slices/loanDetailsSlice'

import { convertToUTCCustom } from '../../utils/convertDatetoUTC'
import { fCurrency, fNumberCust } from '../../utils/formatNumber'
import { fDate } from '../../utils/formatDateTime'

import Loading from '../../components/Loading'

const LoanCalculator = () => {
  const DataTitleTypography = styled(Typography)(({ theme }) => ({
    fontWeight: '300',
  }))

  const DataLabelTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#FDF7FF' : '#4B4453',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.85rem',
    },
    fontWeight: '400',
  }))

  const DataValueTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#FDF7FF' : '#4B4453',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.85rem',
    },
    fontWeight: '500',
  }))

  const dispatch = useDispatch()

  const requestedLoanAmount = useSelector((state) => state.loanDetailsReducer.requestedLoanAmount)
  const baseInterestRate = useSelector((state) => state.loanDetailsReducer.baseInterestRate)
  const estimatedInterestRate = useSelector((state) => state.loanDetailsReducer.estimatedInterestRate)
  const loanTerm = useSelector((state) => state.loanDetailsReducer.loanTerm)
  const paymentFrequency = useSelector((state) => state.loanDetailsReducer.paymentFrequency)
  const defEffectiveDate = new Date()

  const primeIreEstimate = useSelector((state) => state.clientSearchReducer.primeIreEstimate)
  const documentationTypes = useSelector((state) => state.loanDetailsReducer.documentationTypes)

  const estimatedInterestRateReCalc = useSelector((state) => state.clientSearchReducer.primeIreEstimate.estimatedInterestRate)

  //* Financial Calculator API response

  const lncalc_loading = useSelector((state) => state.loanCalculatorReducer.loading)
  const lncalc_error = useSelector((state) => state.loanCalculatorReducer.error)
  const lncalc_currentRequestId = useSelector((state) => state.loanCalculatorReducer.currentRequestId)

  const lncalc_AmountFinanced = useSelector((state) => state.loanCalculatorReducer.lncalc_AmountFinanced)
  const lncalc_AmountPayable = useSelector((state) => state.loanCalculatorReducer.lncalc_AmountPayable)
  const lncalc_disclosedRate = useSelector((state) => state.loanCalculatorReducer.lncalc_disclosedRate)
  const feeCharged = useSelector((state) => state.loanCalculatorReducer.feeCharged)

  const lncalc_Instalments = useSelector((state) => state.loanCalculatorReducer.lncalc_Instalments)
  const lncalc_InstalmentPrincipal = useSelector((state) => state.loanCalculatorReducer.lncalc_InstalmentBreakdownTotal.principal)

  const lncalc_InstalmentAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_InstalmentAmount)
  const lncalc_InstalmentType = useSelector((state) => state.loanCalculatorReducer.lncalc_InstalmentType)
  const lncalc_InstalmentStartDate = useSelector((state) => state.loanCalculatorReducer.lncalc_InstalmentStartDate)
  const lncalc_InstalmentEndDate = useSelector((state) => state.loanCalculatorReducer.lncalc_InstalmentEndDate)
  const lncalc_NumberofInstalments = useSelector((state) => state.loanCalculatorReducer.lncalc_NumberofInstalments)

  const lncalc_FinalInstalmentAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_FinalInstalmentAmount)
  const lncalc_FinalInstalmentType = useSelector((state) => state.loanCalculatorReducer.lncalc_FinalInstalmentType)
  const lncalc_FinalInstalmentStartDate = useSelector((state) => state.loanCalculatorReducer.lncalc_FinalInstalmentStartDate)
  const lncalc_FinalInstalmentEndDate = useSelector((state) => state.loanCalculatorReducer.lncalc_FinalInstalmentEndDate)
  const lncalc_FinalInstalmentCount = useSelector((state) => state.loanCalculatorReducer.lncalc_FinalInstalmentCount)

  const lncalc_InterestAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_InterestAmount)
  const lncalc_InterestRate = useSelector((state) => state.loanCalculatorReducer.lncalc_InterestRate)
  const lncalc_MaturityDate = useSelector((state) => state.loanCalculatorReducer.lncalc_MaturityDate)
  const lncalc_PaymentFrequencyValue = useSelector((state) => state.loanCalculatorReducer.lncalc_PaymentFrequency.value)
  const lncalc_PaymentFrequencyUnit = useSelector((state) => state.loanCalculatorReducer.lncalc_PaymentFrequency.unit)
  const lncalc_PrimaryClientType = useSelector((state) => state.loanCalculatorReducer.lncalc_PrimaryClientType)
  const lncalc_ProductCode = useSelector((state) => state.loanCalculatorReducer.lncalc_ProductCode)

  //* Weekly Payment Details
  const weekly_FirstPaymentDate = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsWeekly.firstPaymentDate)
  const weekly_NumberOfPayments = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsWeekly.numberOfPayments)
  const weekly_PaymentAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsWeekly.paymentAmount)

  //* Fortnightly Payment Details
  const fornightly_FirstPaymentDate = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsFortnightly.firstPaymentDate)
  const fornightly_NumberOfPayments = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsFortnightly.numberOfPayments)
  const fornightly_PaymentAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsFortnightly.paymentAmount)

  //* Monthly Payment Details
  const monthly_FirstPaymentDate = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsMonthly.firstPaymentDate)
  const monthly_NumberOfPayments = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsMonthly.numberOfPayments)
  const monthly_PaymentAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_RepaymentOptionsMonthly.paymentAmount)

  const lncalc_ResidualValue = useSelector((state) => state.loanCalculatorReducer.lncalc_ResidualValue)
  const lncalc_SettlementDate = useSelector((state) => state.loanCalculatorReducer.lncalc_SettlementDate)
  const lncalc_TermUnit = useSelector((state) => state.loanCalculatorReducer.lncalc_Term.unit)
  const lncalc_TermValue = useSelector((state) => state.loanCalculatorReducer.lncalc_Term.value)

  useEffect(() => {
    if (requestedLoanAmount === 0.0 || requestedLoanAmount == null || isNaN(requestedLoanAmount)) return

    let insurance = []

    const selectedDocumentTypes = documentationTypes?.map((type) => {
      return type?.feeCode
    })

    var financialData = JSON.stringify({
      product: 'MBRO',
      costOfGoods: requestedLoanAmount,
      interestRate: estimatedInterestRateReCalc,
      term: loanTerm,
      paymentFrequency: paymentFrequency,
      startDate: convertToUTCCustom(defEffectiveDate, 'useEffect'),
      insurance: insurance,
      fees: selectedDocumentTypes,
    })

    const config = {
      url: '/financialcalculator',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: financialData,
    }

    dispatch(getRepaymentDetails(config))
  }, [requestedLoanAmount, estimatedInterestRate, feeCharged, loanTerm, paymentFrequency, lncalc_InstalmentAmount, documentationTypes, estimatedInterestRateReCalc])

  useEffect(() => {
    if (lncalc_InstalmentStartDate === null || lncalc_InstalmentStartDate === undefined || lncalc_InstalmentStartDate === '') return

    dispatch(loanDetailsActions.setFirstPaymentDate(new Date(lncalc_InstalmentStartDate)))
  }, [lncalc_InstalmentStartDate])

  if (lncalc_loading === 'PENDING') {
    return (
      <Stack direction='column' alignItems='center' justifyContent='flex-start' spacing={2} sx={{ width: '100%', height: '100%' }}>
        <Skeleton animation='wave' width='50%' />
        <Loading />
        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ width: '100%' }}>
          <Skeleton animation='wave' width='100%' />
          <Skeleton animation='wave' width='100%' />
          <Skeleton animation='wave' width='100%' />
          <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ width: '100%' }}>
            <Divider sx={{ width: '100%' }} />
            <Skeleton animation='wave' width='100%' />
            <Divider sx={{ width: '100%' }} />
          </Stack>
        </Stack>
        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ width: '100%', pt: 2 }}>
          <Skeleton animation='wave' width='100%' />
          <Skeleton animation='wave' width='100%' />
          <Skeleton animation='wave' width='100%' />
        </Stack>
        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ width: '100%', pt: 2 }}>
          <Skeleton animation='wave' width='100%' />
          <Skeleton animation='wave' width='100%' />
        </Stack>
        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ width: '100%', pt: 2 }}>
          <Skeleton animation='wave' width='100%' />
          <Skeleton animation='wave' width='100%' />
        </Stack>
      </Stack>
      // <Stack direction='column' alignItems='center' justifyContent='center' sx={{ width: '100%', height: '100%' }}>
      //   <Loading />
      // </Stack>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <Stack direction='column' alignItems='center' justifyContent='center' sx={{ width: '100%', height: '100%', minHeight: '100%' }}>
        <DataTitleTypography variant='body1' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#FDF7FF' : '#4B4453'), letterSpacing: 2, textTransform: 'uppercase', py: 1 }}>
          Estimated Payment
        </DataTitleTypography>
        <Stack direction='row' justifyContent='center' alignItems='baseline' sx={{ width: '100%', pb: 2 }}>
          <Typography sx={{ fontWeight: '700' }} color='primary' variant='h3'>
            {fCurrency(lncalc_InstalmentAmount)}
          </Typography>
          <Typography sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#FDF7FF' : '#4B4453'), fontWeight: 'light' }} variant='h6'>
            {lncalc_PaymentFrequencyUnit === 'M' ? '/month' : lncalc_PaymentFrequencyUnit === 'F' ? '/fortnight' : '/week'}
          </Typography>
        </Stack>
        <Stack direction='column' spacing={1} sx={{ width: '100%', pb: 3 }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>Loan Amount</DataLabelTypography>
            <DataValueTypography variant='subtitle1'>{fCurrency(requestedLoanAmount)}</DataValueTypography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>Interest</DataLabelTypography>
            <DataValueTypography variant='subtitle1'>{fCurrency(lncalc_InterestAmount)}</DataValueTypography>
          </Stack>
          <Stack direction='column' spacing={2}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <DataLabelTypography variant='subtitle1'>Fees</DataLabelTypography>
              <DataValueTypography variant='subtitle1'>{fCurrency(feeCharged)}</DataValueTypography>
            </Stack>
            <Divider sx={{ width: '100%' }} />
            <Stack direction='column' spacing={1}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                  Total Amount Payable
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
                  {fCurrency(lncalc_AmountPayable)}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ width: '100%' }} />
          </Stack>
        </Stack>
        <Stack direction='column' spacing={1} sx={{ width: '100%', pb: 3 }}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>Loan Term</DataLabelTypography>
            <DataValueTypography variant='subtitle1'>{lncalc_TermValue} Months</DataValueTypography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>Interest Rate</DataLabelTypography>
            <DataValueTypography variant='subtitle1'>{fNumberCust(lncalc_InterestRate)}% p.a.</DataValueTypography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>Maturity Date</DataLabelTypography>
            {!(lncalc_MaturityDate == null) && lncalc_MaturityDate != '' && <DataValueTypography variant='subtitle1'>{!(lncalc_MaturityDate == null) && lncalc_MaturityDate != '' ? fDate(new Date(lncalc_MaturityDate)) : ''}</DataValueTypography>}
          </Stack>
        </Stack>
        <Stack direction='column' spacing={1} sx={{ width: '100%', py: 2 }}>
          <Typography variant='overline' color='primary'>
            Payment Details
          </Typography>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>Number of Payments</DataLabelTypography>
            <DataValueTypography variant='subtitle1'>{lncalc_NumberofInstalments}</DataValueTypography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>First Payment Date</DataLabelTypography>
            {!(lncalc_InstalmentStartDate == null) && lncalc_InstalmentStartDate != '' && <DataValueTypography variant='subtitle1'>{!(lncalc_InstalmentStartDate == null) && lncalc_InstalmentStartDate != '' ? fDate(new Date(lncalc_InstalmentStartDate)) : ''}</DataValueTypography>}
          </Stack>
        </Stack>
        <Stack direction='column' spacing={1} sx={{ width: '100%', py: 2 }}>
          <Typography variant='overline' color='primary'>
            Final Payment Details
          </Typography>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>Final Payment Amount</DataLabelTypography>
            <DataValueTypography variant='subtitle1'>{fCurrency(lncalc_FinalInstalmentAmount)}</DataValueTypography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <DataLabelTypography variant='subtitle1'>Final Payment Date</DataLabelTypography>
            {!(lncalc_FinalInstalmentStartDate == null) && lncalc_FinalInstalmentStartDate != '' && <DataValueTypography variant='subtitle1'>{!(lncalc_FinalInstalmentStartDate == null) && lncalc_FinalInstalmentStartDate != '' ? fDate(new Date(lncalc_FinalInstalmentStartDate)) : ''}</DataValueTypography>}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default LoanCalculator
