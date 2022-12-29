import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'

//* Third-party
import { NumericFormat } from 'react-number-format'

import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux'
import { financialDetailsActions } from '../../redux/slices/financialDetailsSlice'
import { getLoanRepayments } from '../../redux/slices/financialDetailsSlice'

// API Constants
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { styled } from '@mui/material/styles'

//* MUI
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import LinearProgress from '@mui/material/LinearProgress'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'

//* MUI - Icons
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'

//* MUI - Dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

//* MUI - Table
import { Table, TableRow, TableBody, TableHead, TableCell, TableContainer, Button, IconButton } from '@mui/material'

//* RHF Custom Components
import Form from '../../components/Form'
import DatePickerFinancial from './Interface/DatePickerFinancial'
import InputTextField from '../../components/rhf-components/Input'
import RadioGroups from '../../components/rhf-components/RadioGroups'
import CustomSlider from '../../components/rhf-components/CustomSlider'
import TextField_Cust from '../../components/ui/mui-custom-styled-components/TextField_Custom'

//* Sections
import CostRecoveryModal from './Sections/CostRecoveryModal'
import LoanProtectionInsurance from './Sections/LoanProtectionInsurance'

//* Utils
import { fCurrency, fNumber } from '../../utils/formatNumber'
import { convertToUTCTimestamp } from '../../utils/formatDateTime'
import { conver } from '../../utils/formatDateTime'
import { borderRadius, height } from '@mui/system'

const SliderLabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontWeight: '400',
}))

const SliderSelectedValTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  fontWeight: '700',
}))

const ContentStyle = styled(Paper)(({ theme }) => ({
  borderRadius: 25,
  height: '100%',
  color: theme.palette.common.white,
  boxSizing: 'border-box',
  backgroundImage: `linear-gradient( 135deg,${theme.palette.primary.light} 0%,${theme.palette.primary.dark} 100%)`,
}))

const SummaryLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[200],
  fontWeight: '300',
}))

const ValueTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: '500',
}))

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
}))

const AmountFormat = React.forwardRef(function AmountFormat(props, ref) {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      thousandSeparator={true}
    />
  )
})

export default function FinancialDetails() {
  const [open, setOpen] = React.useState(false)
  const [openCostRecoveryModal, setOpenCostRecoveryModal] = React.useState(false)
  const handleOpenCostRecoveryModal = () => setOpenCostRecoveryModal(true)
  const handleCloseCostRecoveryModal = () => setOpenCostRecoveryModal(false)

  const loanAmount = useSelector((state) => state.financialDetailsReducer.loanAmount)
  const loanAmountCust = useSelector((state) => state.financialDetailsReducer.loanAmountCust)
  const interestRate = useSelector((state) => state.financialDetailsReducer.interestRate)
  const term = useSelector((state) => state.financialDetailsReducer.term.value)
  const paymentFrequency = useSelector((state) => state.financialDetailsReducer.paymentFrequency.unit)
  const loading = useSelector((state) => state.financialDetailsReducer.loading)

  const sovAmountFinanced = useSelector((state) => state.financialDetailsReducer.sovAmountFinanced)
  const sovInterestAmount = useSelector((state) => state.financialDetailsReducer.sovInterestAmount)
  const sovAmountPayable = useSelector((state) => state.financialDetailsReducer.sovAmountPayable)
  // const drawdowndate = useSelector((state) => state.financialDetailsReducer.drawdowndate)
  // const minDrawdowndate = useSelector((state) => state.financialDetailsReducer.minDrawdowndate)
  const sovPaymentFrequencyType1 = useSelector((state) => state.financialDetailsReducer.sovPaymentFrequencyType1)
  const sovInstalmentAmount = useSelector((state) => state.financialDetailsReducer.sovInstalmentAmount)
  const sovInstalments = useSelector((state) => state.financialDetailsReducer.sovInstalments)

  //* Fees Sent from Loan Calculator
  const creditCheckAmount = useSelector((state) => state.financialDetailsReducer.creditCheckAmount)
  const creditSenseAmount = useSelector((state) => state.financialDetailsReducer.creditSenseAmount)
  const cloudCheckIdVerificationAmount = useSelector((state) => state.financialDetailsReducer.cloudCheckIdVerificationAmount)
  const cloudCheckPEPSanctionsAmount = useSelector((state) => state.financialDetailsReducer.cloudCheckPEPSanctionsAmount)
  const motorwebCheckAmount = useSelector((state) => state.financialDetailsReducer.motorwebCheckAmount)
  const docusignAmount = useSelector((state) => state.financialDetailsReducer.docusignAmount)
  const ppsrAmount = useSelector((state) => state.financialDetailsReducer.ppsrAmount)

  //* LPI Components Codes
  const lpiDeathCode = useSelector((state) => state.financialDetailsReducer.lpiDeathCode)
  const lpiDisabilityCode = useSelector((state) => state.financialDetailsReducer.lpiDisabilityCode)
  const lpiBankruptcyCode = useSelector((state) => state.financialDetailsReducer.lpiBankruptcyCode)
  const lpiCriticalIllnessCode = useSelector((state) => state.financialDetailsReducer.lpiCriticalIllnessCode)

  //* LPI Components for Prime (optional)
  const hasLpiPrimeDeath = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeDeath)
  const hasLpiPrimeDisability = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeDisability)
  const hasLpiPrimeBankruptcy = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeBankruptcy)
  const hasLpiPrimeCriticalIllness = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeCriticalIllness)

  //* LPI Components for Joint (optional)
  const hasLpiJointDeath = useSelector((state) => state.financialDetailsReducer.hasLpiJointDeath)
  const hasLpiJointDisability = useSelector((state) => state.financialDetailsReducer.hasLpiJointDisability)
  const hasLpiJointBankruptcy = useSelector((state) => state.financialDetailsReducer.hasLpiJointBankruptcy)
  const hasLpiJointCriticalIllness = useSelector((state) => state.financialDetailsReducer.hasLpiJointCriticalIllness)

  //* LPI Upfront Fee Calculated using an external program (received from AWS during LPI Calculation or when user gets to the loan details panel)
  const awsCalculatedLpiGrossPremiumAmount = useSelector((state) => state.financialDetailsReducer.awsCalculatedLpiGrossPremiumAmount)

  const lpiGrossPremium = awsCalculatedLpiGrossPremiumAmount == null ? 0 : awsCalculatedLpiGrossPremiumAmount

  //* Joint Applicant Insurance Toggle
  const doYouNeedCoverForJoint = useSelector((state) => state.financialDetailsReducer.doYouNeedCoverForJoint)

  // Form submission
  const onSubmitYourFinancialDetails = useSelector((state) => state.financialDetailsReducer.onSubmitYourFinancialDetails)

  const MIN_LOAN_AMOUNT = 499.9999
  const MAX_LOAN_AMOUNT = 50000.0001

  const defEffectiveDate = new Date()

  const schema = yup.object().shape({
    loanAmount: yup.number().required(),
    loanAmountCust: yup
      .number()
      .moreThan(MIN_LOAN_AMOUNT, `Amount to borrow should be between $${fNumber(MIN_LOAN_AMOUNT)} and $${fNumber(MAX_LOAN_AMOUNT)}`)
      .lessThan(MAX_LOAN_AMOUNT, `Amount to borrow should be between $${fNumber(MIN_LOAN_AMOUNT)} and $${fNumber(MAX_LOAN_AMOUNT)}`),
    interestRate: yup.number(),
    term: yup.number(),
    paymentFrequency: yup.string().required('Payment frequency is required'),
  })

  const dispatch = useDispatch()
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  function convertToDDMMMYYYY(date) {
    const newDate = new Date(date)
    const yyyy = newDate.getFullYear()
    let mm = newDate.getMonth() + 1 // Months start at 0!
    let dd = newDate.getDate()

    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm

    const formatedDate = dd + '/' + mm + '/' + yyyy
    return formatedDate
  }

  useEffect(() => {
    let insurance = [
      {
        component: lpiDeathCode,
        joint: 'N',
        discount: 'N',
        selected: hasLpiPrimeDeath ? 'Y' : 'N',
      },
      {
        component: lpiDeathCode,
        joint: 'Y',
        discount: 'N',
        selected: hasLpiJointDeath ? 'Y' : 'N',
      },
      {
        component: lpiDisabilityCode,
        joint: 'N',
        discount: hasLpiPrimeDisability && hasLpiJointDisability ? 'Y' : 'N',
        selected: hasLpiPrimeDisability ? 'Y' : 'N',
      },
      {
        component: lpiDisabilityCode,
        joint: 'Y',
        discount: hasLpiPrimeDisability && hasLpiJointDisability ? 'Y' : 'N',
        selected: hasLpiJointDisability ? 'Y' : 'N',
      },
      {
        component: lpiBankruptcyCode,
        joint: 'N',
        discount: hasLpiPrimeBankruptcy && hasLpiJointBankruptcy ? 'Y' : 'N',
        selected: hasLpiPrimeBankruptcy ? 'Y' : 'N',
      },
      {
        component: lpiBankruptcyCode,
        joint: 'Y',
        discount: hasLpiPrimeBankruptcy && hasLpiJointBankruptcy ? 'Y' : 'N',
        selected: hasLpiJointBankruptcy ? 'Y' : 'N',
      },
      {
        component: lpiCriticalIllnessCode,
        joint: 'N',
        discount: hasLpiPrimeCriticalIllness && hasLpiJointCriticalIllness ? 'Y' : 'N',
        selected: hasLpiPrimeCriticalIllness ? 'Y' : 'N',
      },
      {
        component: lpiCriticalIllnessCode,
        joint: 'Y',
        discount: hasLpiPrimeCriticalIllness && hasLpiJointCriticalIllness ? 'Y' : 'N',
        selected: hasLpiJointCriticalIllness ? 'Y' : 'N',
      },
    ]

    var financialData = JSON.stringify({
      product: 'PERN',
      costOfGoods: loanAmount,
      interestRate: interestRate,
      term: term,
      paymentFrequency: paymentFrequency,
      startDate: convertToUTCTimestamp(defEffectiveDate, 'useEffect'),
      insurance: insurance
        .filter((item) => {
          return item?.selected === 'Y'
        })
        .map((item) => {
          return { component: item?.component, joint: item?.joint, discount: item?.discount }
        }),
    })
    // Finacial Calculator API request Config
    const config = {
      url: '/financialcalculator',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: financialData,
    }
    // Finacial Calculator request
    const loanSchedule = dispatch(getLoanRepayments(config))
  }, [loanAmount, loanAmountCust, interestRate, term, paymentFrequency, doYouNeedCoverForJoint, hasLpiPrimeDeath, hasLpiJointDeath, hasLpiPrimeDisability, hasLpiJointDisability, hasLpiPrimeBankruptcy, hasLpiJointBankruptcy, hasLpiPrimeCriticalIllness, hasLpiJointCriticalIllness])

  const {
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      loanAmount: loanAmount,
      loanAmountCust: loanAmountCust,
      interestRate: interestRate,
      term: term,
      paymentFrequency: paymentFrequency,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(financialDetailsActions.setIsValidYourFinancialDetails(isValid))
  }, [isValid])

  useEffect(() => {
    if (onSubmitYourFinancialDetails != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitYourFinancialDetails])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  function onSubmit() {
    console.log('Financial Details Submitted')
  }

  const handleOpenPreview = () => {
    setOpen(true)
  }

  const handleClosePreview = () => {
    setOpen(false)
  }

  const handleLoanAmount = (event) => {
    if (typeof event.target.value === 'string' && event.target.value === '') return
    const loanAmountToDispatch = typeof event.target.value === 'string' ? parseFloat(event.target.value) : event.target.value
    dispatch(financialDetailsActions.setLoanAmount(loanAmountToDispatch))
  }

  const handleTerm = (event) => {
    dispatch(financialDetailsActions.setTerm(event.target.value))
  }

  const handlePaymentFrequency = (event) => {
    dispatch(financialDetailsActions.setPaymentFrequency(event.target.value))
  }

  // ****************** For Future Use if required ******************* //

  // const handleInterestRate = (event) => {
  //   dispatch(financialDetailsActions.setInterestRate(event.target.value))
  // }

  // const handleDrawdownDate = (date) => {
  //   dispatch(financialDetailsActions.setDrawdownDate(date))
  // }

  // const handleFirstPaymentDate = (date) => {
  //   dispatch(financialDetailsActions.setFirstPaymentDate(date))
  // }

  return (
    <>
      <Form>
        <Stack direction='column' spacing={downMd ? 2 : 5} justifyContent='flex-start'>
          <Stack direction='column' spacing={7} justifyContent='flex-start'>
            <Grid item container>
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ pt: 2, width: '100%' }}>
                <LabelStyle variant={downSm ? 'caption' : 'subtitle2'}>How much would you like to borrow?</LabelStyle>
                <TextField_Cust
                  label='Loan Amount'
                  name='loanAmountCust'
                  hasTooltip={false}
                  onChange={handleLoanAmount}
                  value={loanAmount}
                  fullWidth
                  sx={{ width: downMd ? '100%' : '80%' }}
                  variant='filled'
                  InputProps={{
                    inputComponent: AmountFormat,
                    startAdornment: <InputAdornment position='start'>$</InputAdornment>,
                  }}
                  error={loanAmount < 500 || loanAmount > 50000 ? true : false}
                />
                {(loanAmount < 500 || loanAmount > 50000) && (
                  <FormHelperText error id='laonamount-error-text'>
                    Amount to borrow should be between ${fNumber(MIN_LOAN_AMOUNT)} and ${fNumber(MAX_LOAN_AMOUNT)}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            {/* <Grid item container>
              <CustomSlider id='loanAmount' name='loanAmount' label='LoanAmountSlider' min={500} max={50000} control={control} onSliderChange={handleLoanAmount} valueLabelDisplay='auto' value={loanAmount} marks={false} defaultValue={3000} step={500} />
              <Grid item container md={6} lg={6} xl={6}>
                <SliderLabelTypography>Loan Amount</SliderLabelTypography>
              </Grid>
              <Grid item container justifyContent='flex-end' md={6} lg={6} xl={6}>
                <SliderSelectedValTypography variant='subtitle1'>{fCurrency(loanAmount)}</SliderSelectedValTypography>
              </Grid>
            </Grid> */}
            {/* <Grid item container>
              <CustomSlider id='interestRate' name='interestRate' label='InterestRateSlider' min={9.95} max={18.0} control={control} onSliderChange={handleInterestRate} valueLabelDisplay='auto' value={interestRate} marks={false} defaultValue={12.5} step={0.5} />
              <Grid item container md={6} lg={6} xl={6}>
                <SliderLabelTypography>Interest Rate</SliderLabelTypography>
              </Grid>
              <Grid item container justifyContent='flex-end' md={6} lg={6} xl={6}>
                <SliderSelectedValTypography variant='subtitle1'>{interestRate} %</SliderSelectedValTypography>
              </Grid>
            </Grid> */}
            <Stack direction='column'>
              <LabelStyle variant={downSm ? 'caption' : 'subtitle2'} sx={{ fontWeight: 'bold', py: 1, textAlign: 'center' }}>
                How long do you need to pay back the loan?
              </LabelStyle>
              <CustomSlider id='term' name='term' label='TermSlider' min={6} max={84} onSliderChange={handleTerm} valueLabelDisplay='auto' value={term} marks={false} control={control} defaultValue={12} step={6} />
              {/* <Grid item container md={6} lg={6} xl={6}>
                <SliderLabelTypography>Term</SliderLabelTypography>
              </Grid>
              <Grid item container justifyContent='flex-end' md={6} lg={6} xl={6}>
                <SliderSelectedValTypography variant='subtitle1'>{term} Months</SliderSelectedValTypography>
              </Grid> */}
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SliderLabelTypography>Term</SliderLabelTypography>
                <SliderSelectedValTypography variant='subtitle1'>{term} Months</SliderSelectedValTypography>
              </Stack>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
              <LabelStyle variant={downSm ? 'caption' : 'subtitle2'}>How often can you make your repayments?</LabelStyle>
              <RadioGroups id='paymentFrequency' name='paymentFrequency' alignItems='center' onRadioChange={handlePaymentFrequency} showLabel={false} control={control} variant='' value={paymentFrequency} defaultValue={''}>
                <Stack direction={downSm ? 'column' : 'row'} justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                  <FormControlLabel value='W' control={<Radio size={downSm ? 'small' : 'medium'} />} label='Weekly' />
                  <FormControlLabel value='F' control={<Radio size={downSm ? 'small' : 'medium'} />} label='Fortnightly' />
                  <FormControlLabel value='M' control={<Radio size={downSm ? 'small' : 'medium'} />} label='Monthly' />
                </Stack>
              </RadioGroups>
            </Stack>
            <Box
              sx={{
                width: '100%',
                borderRadius: 2,
                bgcolor: 'grey.50',
                p: 3,
              }}
            >
              <Stack spacing={1} sx={{ width: '100%' }}>
                <LoanProtectionInsurance />
              </Stack>
            </Box>

            {/* <Stack direction={downMd ? 'column' : 'column'} justifyContent='center' alignItems='center' sx={{ width: '100%' }} spacing={2}>
              <LabelStyle sx={{ textAlign: 'center' }}>When would you like to have the funds in your account?</LabelStyle>
              <DatePickerFinancial id='drawdowndate' name='drawdowndate' onDateChange={handleDrawdownDate} label='Loan Advancement Date' control={control} format='dd/MM/yyyy' variant='outlined' openTo='day' date={drawdowndate} minDate={minDrawdowndate} isRequired={true} />
            </Stack> */}
            {/* <Grid item container>
              <LabelStyle>When would you like to make your first payment?</LabelStyle>
              <DatePicker id='firstpaymentdate' name='firstpaymentdate' onDateChange={handleFirstPaymentDate} label='First Payment Date' control={control} format='dd/MM/yyyy' variant='outlined' openTo='year' date={dob} maxDate={dobDefDate} isRequired={true} />
            </Grid> */}
          </Stack>
          <Box>
            <ContentStyle>
              <Box sx={{ py: 3, textAlign: 'center' }}>
                <Typography variant={downSm ? 'body1' : 'h6'}>Summary</Typography>
                {loading === 'PENDING' && <LinearProgress color='secondary' />}
              </Box>
              <Stack direction='column' justifyContent='flex-start' spacing={3}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ px: 3 }}>
                  <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'} sx={{ color: 'common.white', textTransform: 'uppercase', fontWeight: 'bold' }}>
                    Estimated Payment
                  </SummaryLabel>
                  <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={0.5}>
                    <ValueTypography sx={{ color: 'common.white', fontWeight: 'bold' }} variant={downSm ? 'caption' : 'subtitle2'}>
                      {fCurrency(sovInstalmentAmount)}
                    </ValueTypography>
                    <Typography sx={{ fontSize: 12 }} variant={downSm ? 'caption' : 'subtitle2'}>
                      {sovPaymentFrequencyType1 === 'M' ? ' /month' : sovPaymentFrequencyType1 === 'F' ? ' /fortnight' : ' /week'}
                    </Typography>
                  </Stack>
                </Stack>

                {!downSm && (
                  <Box
                    sx={{
                      borderRadius: downSm ? 0 : 2,
                      px: downSm ? 1 : 3,
                      pb: 1,
                    }}
                  >
                    <Stack direction='column' justifyContent='flex-start' spacing={2}>
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Loan Amount</SummaryLabel>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(loanAmount)}</ValueTypography>
                      </Stack>
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Loan Protection Insurance</SummaryLabel>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(lpiGrossPremium)}</ValueTypography>
                      </Stack>
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Loan Cost Recovery Fees</SummaryLabel>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(creditCheckAmount + creditSenseAmount + motorwebCheckAmount + cloudCheckIdVerificationAmount + cloudCheckPEPSanctionsAmount + ppsrAmount + docusignAmount)}</ValueTypography>
                      </Stack>
                      <Divider sx={{ backgroundColor: 'secondary.main', width: '100%' }} />
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>Principal Amount</ValueTypography>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(sovAmountFinanced)}</ValueTypography>
                      </Stack>
                    </Stack>
                  </Box>
                )}

                {downSm && (
                  <Box
                    sx={{
                      borderRadius: 2,
                      px: downSm ? 2 : 3,
                      pb: 1,
                      width: '100%',
                    }}
                  >
                    {/* <Divider sx={{ backgroundColor: 'secondary.main', width: '100%' }} /> */}
                    <Stack direction='column' justifyContent='flex-start' spacing={2}>
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Loan Amount</SummaryLabel>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(loanAmount)}</ValueTypography>
                      </Stack>
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Loan Protection Insurance</SummaryLabel>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(lpiGrossPremium)}</ValueTypography>
                      </Stack>
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Loan Cost Recovery Fees</SummaryLabel>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(creditCheckAmount + creditSenseAmount + motorwebCheckAmount + cloudCheckIdVerificationAmount + cloudCheckPEPSanctionsAmount + ppsrAmount + docusignAmount)}</ValueTypography>
                      </Stack>
                      <Divider sx={{ backgroundColor: 'secondary.main', width: '100%' }} />
                      <Stack direction='row' justifyContent='space-between' alignItems='center'>
                        <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'} sx={{ fontWeight: 'medium' }}>
                          Principal Amount
                        </SummaryLabel>
                        <ValueTypography variant={downSm ? 'caption' : 'subtitle2'} sx={{ fontWeight: 'medium' }}>
                          {fCurrency(sovAmountFinanced)}
                        </ValueTypography>
                      </Stack>
                    </Stack>
                  </Box>
                )}

                <Box sx={{ width: '100%', px: downSm ? 2 : 3 }}>
                  <Stack direction='column' justifyContent='flex-start' spacing={2}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Loan Term</SummaryLabel>
                      <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{term} months</ValueTypography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Interest Rate</SummaryLabel>
                      <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{interestRate}% p.a.</ValueTypography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Total Interest</SummaryLabel>
                      <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(sovInterestAmount)}</ValueTypography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Total Amount Payable</SummaryLabel>
                      <ValueTypography variant={downSm ? 'caption' : 'subtitle2'}>{fCurrency(sovAmountPayable)}</ValueTypography>
                    </Stack>
                  </Stack>
                </Box>

                <Stack direction='row' justifyContent='center' alignItems='center'>
                  <Box sx={{ px: 3 }}>
                    <Button
                      sx={{
                        bgcolor: 'secondary.main',
                        color: 'common.white',
                        borderRadius: '49px',
                        border: 'none',
                        maxWidth: '400px',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                        px: 2,
                        transition: '.5s',
                        fontWeight: downSm ? 'light' : 'medium',
                        '&:hover': {
                          bgcolor: 'secondary.main',
                        },
                      }}
                      endIcon={<NavigateNextRoundedIcon />}
                      onClick={handleOpenPreview}
                    >
                      {downSm ? 'View Repayments' : 'View Repayment Schedule'}
                    </Button>
                  </Box>

                  <Dialog open={open} onClose={handleClosePreview} fullWidth={true} maxWidth='md' scroll='paper' aria-labelledby='scroll-repay-dialog'>
                    <DialogTitle id='scroll-repay-title'>
                      <Stack direction='column' sx={{ mb: 2 }}>
                        <Typography variant='h6'>Repayment Schedule</Typography>
                        <Typography variant='caption' sx={{ fontSize: 10 }}>
                          Figures shown are indicative only and may differ from your application
                        </Typography>
                      </Stack>
                    </DialogTitle>
                    <DialogContent dividers={false}>
                      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 500 }}>
                          <Table stickyHeader sx={{ minWidth: 200 }} aria-label='repayment table'>
                            <TableHead
                              sx={{
                                bgcolor: (theme) => theme.palette.common.white,
                                borderBottom: (theme) => `solid 1px ${theme.palette.secondary.main}`,
                                '& th': { backgroundColor: 'transparent' },
                              }}
                            >
                              <TableRow>
                                <TableCell sx={{ px: 0 }} width={20}>
                                  #
                                </TableCell>
                                <TableCell sx={{ px: 0, minWidth: 20 }} align='left'>
                                  Date
                                </TableCell>
                                <TableCell sx={{ px: 0, minWidth: 50 }} align='right'>
                                  Principal ($)
                                </TableCell>
                                <TableCell sx={{ px: 0 }} align='right'>
                                  Interest ($)
                                </TableCell>
                                <TableCell sx={{ px: 0 }} align='right'>
                                  Instalment ($)
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {sovInstalments.map((row, index) => (
                                <TableRow
                                  key={index}
                                  sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                                  }}
                                >
                                  <TableCell sx={{ px: 0 }} align='left' width={20}>
                                    {index + 1}
                                  </TableCell>
                                  <TableCell sx={{ px: 0 }} align='left'>
                                    {convertToDDMMMYYYY(row.date)}
                                  </TableCell>
                                  <TableCell sx={{ px: 0 }} align='right'>
                                    {row.principal}
                                  </TableCell>
                                  <TableCell sx={{ px: 0 }} align='right'>
                                    {row.interest}
                                  </TableCell>
                                  <TableCell sx={{ px: 0 }} align='right'>
                                    {row.instalmentAmount}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClosePreview}>Close</Button>
                    </DialogActions>
                  </Dialog>
                  {/* <RepaymentSchedule fullWidth={true} maxWidth='lg' open={open} handleClose={handleClosePreview} sovInstalments={sovInstalments} /> */}
                </Stack>
                <Box sx={{ width: '100%', pb: 2, px: 3 }}>
                  <Stack direction='column' justifyContent='center' alignItems='center' spacing={0.5}>
                    <Stack direction='row' justifyContent='center' alignItems='center'>
                      <Typography variant='caption' sx={{ fontSize: downSm ? 8 : 10, color: (theme) => theme.palette.common.white }}>
                        Figures shown are indicative only and may differ.
                      </Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='center' alignItems='center' spacing={0} sx={{ m: 0, p: 0 }}>
                      <Typography variant='caption'>
                        <Link color='secondary.light' variant='caption' sx={{ fontSize: downSm ? 8 : 10 }} onClick={handleOpenCostRecoveryModal}>
                          *Click here to learn more about loan cost recovery fees.
                        </Link>
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </ContentStyle>
          </Box>
        </Stack>
      </Form>
      <Dialog open={openCostRecoveryModal} onClose={handleCloseCostRecoveryModal} fullWidth={true} maxWidth='xs'>
        <DialogTitle>
          <Stack direction='column'>
            <Typography variant='h6' color='primary' sx={{ fontWeight: 'bold' }}>
              Loan Cost Recovery Fees
            </Typography>
            <Divider sx={{ width: '100%', my: 2 }} />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Stack direction='column' spacing={2} sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='body1'>Credit Check</Typography>
                <Typography variant='body1'>{fCurrency(creditCheckAmount)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='body1'>Credit Sense</Typography>
                <Typography variant='body1'>{fCurrency(creditSenseAmount)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='body1'>Motorweb Check</Typography>
                <Typography variant='body1'>{fCurrency(motorwebCheckAmount)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='body1'>PPSR Registration</Typography>
                <Typography variant='body1'>{fCurrency(ppsrAmount)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='body1'>Docusign (Remote signing) </Typography>
                <Typography variant='body1'>{fCurrency(docusignAmount)}</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='body1'>Cloud Check - ID Verification</Typography>
                <Typography variant='body1'>{fCurrency(cloudCheckIdVerificationAmount)}</Typography>
              </Stack>
              <Stack direction='column' spacing={2}>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1'>Cloud Check PEP & Sanctions</Typography>
                  <Typography variant='body1'>{fCurrency(cloudCheckPEPSanctionsAmount)}</Typography>
                </Stack>
                <Divider sx={{ width: '100%' }} />
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1' sx={{ fontWeight: 500 }}>
                    Total
                  </Typography>
                  <Typography variant='body1' sx={{ fontWeight: 500 }}>
                    {fCurrency(fCurrency(creditCheckAmount + creditSenseAmount + cloudCheckIdVerificationAmount + cloudCheckPEPSanctionsAmount + motorwebCheckAmount + docusignAmount + ppsrAmount))}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </DialogContent>
      </Dialog>
    </>
  )
}

// **** For future Use **** //

{
  /* <Grid item container>
            <CustomSlider id='interestRate' name='interestRate' label='InterestRateSlider' min={19.5} max={49.5} control={control} onSliderChange={handleInterestRate} valueLabelDisplay='on' value={interestRate} marks={false} defaultValue={30} step={0.5} />
            <Grid item container md={6} lg={6} xl={6}>
              <SliderLabelTypography>Interest Rate</SliderLabelTypography>
            </Grid>
            <Grid item container justifyContent='flex-end' md={6} lg={6} xl={6}>
              <SliderSelectedValTypography variant='subtitle1'>{interestRate} %</SliderSelectedValTypography>
            </Grid>
          </Grid> */
}

// **** For future Use **** //
