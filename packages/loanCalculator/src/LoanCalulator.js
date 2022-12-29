import React, { useEffect } from 'react'

import CountUp from 'react-countup'
import { NumericFormat } from 'react-number-format'

import { format, getTime, formatDistanceToNow } from 'date-fns'

//* Framer
import { motion } from 'framer-motion'
import { varFade } from './components/ui/animate'

import { useForm } from 'react-hook-form'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// API constants
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from './redux/utils/apiConstants'

import { useDispatch, useSelector } from 'react-redux'
import { loanCalculatorActions } from './redux/slices/loanCalculatorSlice'
import { getLoanRepaymentSchedule } from './redux/slices/loanCalculatorSlice'

import { styled } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import { Dialog, DialogContent, DialogTitle, Divider } from '@mui/material'
import Stack from '@mui/material/Stack'
import Radio from '@mui/material/Radio'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'

// Card components imports
import Card from '@mui/material/Card'
import Collapse from '@mui/material/Collapse'
import CardMedia from '@mui/material/CardMedia'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import Page from './components/Page'
import RadioGroup from './components/RadioGroups'
import CustomSlider from './components/CustomSlider'
import TextField_Custom from './components/ui/mui-custom-styled-components/TextField_Custom'

// Sections
import AreaChart from './components/charts/AreaChart'
import DonutChart from './components/charts/DonutChart'
import LoanProtectionInsurance from './sections/LoanProtectionInsurance'
import CostRecoveryFeesModal from './sections/CostRecoveryFeesModal'

import { fCurrency, fNumber } from './utils/formatNumber'

import { Link as RouterLink } from 'react-router-dom'
import { PATH_PAGE } from './links/externalLinks'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

const CaptionTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}))

const SliderLabelTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
}))

const SliderSelectedValTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[700],
  fontWeight: '700',
}))

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

export function fDateYYYY_MM_DD(date) {
  return format(new Date(date), 'yyyy-MM-dd')
}

function convertUnixToUTCTimestamp(date) {
  const unixTimestamp = date

  const dateFormat = new Date(unixTimestamp)

  // const timeZoneOffsetInHours = (-1 * dateFormat.getTimezoneOffset()) / 60
  dateFormat.setUTCHours(0, 0, 0, 0)

  // const isoDate = dateFormat.toISOString()
  // console.log('UNIX iso date: ', isoDate)
  const sovereignDate = fDateYYYY_MM_DD(dateFormat)
  return sovereignDate
}

function convertToUTCTimestamp(date, callfrom) {
  if (date === null) {
    return
  }

  if (typeof date === 'number') {
    return convertUnixToUTCTimestamp(date)
  }

  const dateFormat = new Date(date)

  const timeZoneOffsetInHours = (-1 * dateFormat.getTimezoneOffset()) / 60
  dateFormat.setUTCHours(timeZoneOffsetInHours, 0, 0, 0)

  if (typeof dateFormat === 'number') {
    return convertUnixToUTCTimestamp(dateFormat)
  }

  const sovereignDate = fDateYYYY_MM_DD(dateFormat)

  // console.log('BEFORE ISO CONVERSION: ', dateFormat)
  // const isoDate = dateFormat.toISOString()
  // console.log('UTC ISO date: ', isoDate)

  return sovereignDate
}

export default function LoanCalulator({ onLoanAmountChange, onInterestChange, onTermChange, onPaymentFrequencyChange, setCreditSense, setCreditCheck, setMotorwebCheck, setPPSR, setDocusign, setCloudCheckId, setCloudCheckPEP, sethasLpiPrimeDeath, sethasLpiPrimeDisability, sethasLpiPrimeCriticalIllness, sethasLpiPrimeBankruptcy, setLPIUpfrontFee }) {
  const upMd = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const downLg = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const [expanded, setExpanded] = React.useState(true)

  const [openCostRecoveryModal, setOpenCostRecoveryModal] = React.useState(false)
  const handleOpenCostRecoveryModal = () => setOpenCostRecoveryModal(true)
  const handleCloseCostRecoveryModal = () => setOpenCostRecoveryModal(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  // console.log(convertToUTCTimestamp(defEffectiveDate, 'Logging'))

  const defLoanAmount = useSelector((state) => state.loanCalculatorReducer.defLoanAmount)
  const defIntererstRate = useSelector((state) => state.loanCalculatorReducer.defIntererstRate)
  const defTerm = useSelector((state) => state.loanCalculatorReducer.defTerm.value)

  // Git Commit Control
  const loanAmount = useSelector((state) => state.loanCalculatorReducer.loanAmount)
  const loanAmountCust = useSelector((state) => state.loanCalculatorReducer.loanAmountCust)
  const interestRate = useSelector((state) => state.loanCalculatorReducer.interestRate)
  const term = useSelector((state) => state.loanCalculatorReducer.term.value)
  const paymentFrequency = useSelector((state) => state.loanCalculatorReducer.paymentFrequency.unit)

  const sovAmountFinanced = useSelector((state) => state.loanCalculatorReducer.sovAmountFinanced)
  const sovInterestAmount = useSelector((state) => state.loanCalculatorReducer.sovInterestAmount)
  const sovAmountPayable = useSelector((state) => state.loanCalculatorReducer.sovAmountPayable)
  const sovPaymentFrequencyType1 = useSelector((state) => state.loanCalculatorReducer.sovPaymentFrequencyType1)
  const sovInstalmentAmount = useSelector((state) => state.loanCalculatorReducer.sovInstalmentAmount)

  //* ----------- Fees -----------

  //* LPI
  const awsCalculatedLpiGrossPremiumAmount = useSelector((state) => state.loanCalculatorReducer.awsCalculatedLpiGrossPremiumAmount)

  const lpiGrossPremium = awsCalculatedLpiGrossPremiumAmount == null ? 0 : awsCalculatedLpiGrossPremiumAmount

  //* Loan Cost Recovery Fees
  const sovCreditCheckAmount = useSelector((state) => state.loanCalculatorReducer.sovCreditCheckAmount)
  const sovCreditSenseAmount = useSelector((state) => state.loanCalculatorReducer.sovCreditSenseAmount)
  const sovCloudCheckIdVerificationAmount = useSelector((state) => state.loanCalculatorReducer.sovCloudCheckIdVerificationAmount)
  const sovCloudCheckPEPSanctionsAmount = useSelector((state) => state.loanCalculatorReducer.sovCloudCheckPEPSanctionsAmount)
  const sovMotorwebCheckAmount = useSelector((state) => state.loanCalculatorReducer.sovMotorwebCheckAmount)
  const sovDocusignAmount = useSelector((state) => state.loanCalculatorReducer.sovDocusignAmount)
  const sovPPSRAmount = useSelector((state) => state.loanCalculatorReducer.sovPPSRAmount)

  const lpiDeathCode = useSelector((state) => state.loanCalculatorReducer.lpiDeathCode)
  const lpiDisabilityCode = useSelector((state) => state.loanCalculatorReducer.lpiDisabilityCode)
  const lpiBankruptcyCode = useSelector((state) => state.loanCalculatorReducer.lpiBankruptcyCode)
  const lpiCriticalIllnessCode = useSelector((state) => state.loanCalculatorReducer.lpiCriticalIllnessCode)

  const hasLpiPrimeDeath = useSelector((state) => state.loanCalculatorReducer.hasLpiPrimeDeath)
  const hasLpiPrimeDisability = useSelector((state) => state.loanCalculatorReducer.hasLpiPrimeDisability)
  const hasLpiPrimeBankruptcy = useSelector((state) => state.loanCalculatorReducer.hasLpiPrimeBankruptcy)
  const hasLpiPrimeCriticalIllness = useSelector((state) => state.loanCalculatorReducer.hasLpiPrimeCriticalIllness)

  const MIN_LOAN_AMOUNT = 499.9999
  const MAX_LOAN_AMOUNT = 50000.0001

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

  const handleLoanAmount = (event) => {
    if (typeof event.target.value === 'string' && event.target.value === '') return
    const loanAmountToDispatch = typeof event.target.value === 'string' ? parseFloat(event.target.value) : event.target.value
    dispatch(loanCalculatorActions.setLoanAmount(loanAmountToDispatch))
    onLoanAmountChange(loanAmountToDispatch)
  }

  const handleTerm = (event) => {
    dispatch(loanCalculatorActions.setTerm(event.target.value))
    onTermChange(event.target.value)
  }

  const handlePaymentFrequency = (event) => {
    dispatch(loanCalculatorActions.setPaymentFrequency(event.target.value))
    onPaymentFrequencyChange(event.target.value)
  }

  // ****************** For Future Use if required ******************* //

  // const handleInterestRate = (event) => {
  //   dispatch(loanCalculatorActions.setInterestRate(event.target.value))
  //   onInterestChange(event.target.value)
  // }

  const defEffectiveDate = new Date()

  useEffect(() => {
    if (downMd && expanded) {
      setExpanded(!expanded)
      return
    }
    if (upMd) {
      setExpanded(true)
      return
    }
  }, [downMd, upMd])

  const handleOnClick = () => {
    setCreditCheck(sovCreditCheckAmount)
    setCreditSense(sovCreditSenseAmount)
    setMotorwebCheck(sovMotorwebCheckAmount)
    setPPSR(sovPPSRAmount)
    setDocusign(sovDocusignAmount)
    setCloudCheckId(sovCloudCheckIdVerificationAmount)
    setCloudCheckPEP(sovCloudCheckPEPSanctionsAmount)
  }

  useEffect(() => {
    // if (loanAmount < MIN_LOAN_AMOUNT || loanAmount > MAX_LOAN_AMOUNT) return
    // Finacial Calculator API Data

    let insurance = [
      {
        component: lpiDeathCode,
        joint: 'N',
        discount: 'N',
        selected: hasLpiPrimeDeath,
      },
      {
        component: lpiDisabilityCode,
        joint: 'N',
        discount: 'N',
        selected: hasLpiPrimeDisability,
      },
      {
        component: lpiBankruptcyCode,
        joint: 'N',
        discount: 'N',
        selected: hasLpiPrimeBankruptcy,
      },
      {
        component: lpiCriticalIllnessCode,
        joint: 'N',
        discount: 'N',
        selected: hasLpiPrimeCriticalIllness,
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
          return item?.selected === true
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
    const loanSchedule = dispatch(getLoanRepaymentSchedule(config))
  }, [loanAmount, loanAmountCust, interestRate, term, paymentFrequency, hasLpiPrimeDeath, hasLpiPrimeDisability, hasLpiPrimeBankruptcy, hasLpiPrimeCriticalIllness])

  const {
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      loanAmount: defLoanAmount,
      loanAmountCust: loanAmountCust,
      interestRate: defIntererstRate,
      term: defTerm,
      paymentFrequency: paymentFrequency,
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const HOW_MUCH_TO_BORROW_TEXT = 'How much would you like to borrow?'

  return (
    <RootStyle title='Personal Loan Calculator | FCU'>
      <Container maxWidth='lg'>
        <Box
          sx={{
            display: 'grid',
            alignItems: 'flex-start',
            gap: 3,
            pt: downSm ? 3 : 1,
            borderColor: (theme) => theme.palette.primary.main,
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderRadius: 2,
            px: downLg ? 1 : downSm ? 0 : 5,
            textAlign: 'flex-start',
            minHeight: '80vh',
          }}
        >
          {upMd && (
            <Box sx={{ gridColumn: 'span 2', my: 13, p: 0 }}>
              <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={7} sx={{ px: 5 }}>
                <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={3}>
                  <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={7}>
                    <Stack direction='column' alignItems='center' spacing={0}>
                      <motion.div variants={varFade().in}>
                        <Typography
                          variant='h4'
                          component='div'
                          sx={{
                            color: (theme) => (theme.palette.mode === 'dark' ? '#FDF7FF' : '#4B4453'),
                            fontWeight: 'light',
                            letterSpacing: 0,
                          }}
                        >
                          {HOW_MUCH_TO_BORROW_TEXT.split('').map((letter, index) => (
                            <motion.span key={index} variants={varFade().in}>
                              {letter}
                            </motion.span>
                          ))}
                        </Typography>
                      </motion.div>

                      <CaptionTypography
                        variant='caption'
                        sx={{
                          fontWeight: 'default',
                        }}
                      >
                        Figures shown are indicative only and may differ from your application.
                      </CaptionTypography>
                      {/* <CaptionTypography variant='body2' sx={{ fontWeight: 'default' }}>
                    These figures do not include Loan Protection Insurance and Loan Cost Recovery Fees. If your application is successful, a loan offer will be made that will include these additional costs.
                  </CaptionTypography> */}
                    </Stack>
                    <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%', m: 0, p: 0 }}>
                      <Typography sx={{ color: 'text.secondary' }} variant='caption'>
                        Enter the amount you would like to borrow.
                      </Typography>
                      <TextField_Custom
                        label='Loan Amount'
                        name='loanAmountCust'
                        onChange={handleLoanAmount}
                        value={loanAmount}
                        fullWidth
                        size='small'
                        sx={{ width: '80%' }}
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
                    {/* <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
                        <SliderLabelTypography variant='subtitle2'>Loan Amount</SliderLabelTypography>
                        <SliderSelectedValTypography variant='h6'>{fCurrency(loanAmount)}</SliderSelectedValTypography>
                      </Stack>
                      <CustomSlider id='loanAmount' name='loanAmount' label='loanAmountSlider' min={500} max={50000} control={control} onSliderChange={handleLoanAmount} valueLabelDisplay='auto' value={loanAmount} marks={false} defaultValue={3000} step={500} />
                    </Stack> */}
                    {/* <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                  <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
                    <SliderLabelTypography variant='subtitle2'>Interest Rate</SliderLabelTypography>
                    <SliderSelectedValTypography variant='h6'>{interestRate} %</SliderSelectedValTypography>
                  </Stack>
                  <CustomSlider id='interestRate' name='interestRate' label='InterestRateSlider' min={9.95} max={18.0} control={control} onSliderChange={handleInterestRate} valueLabelDisplay='auto' value={interestRate} marks={true} defaultValue={12.5} step={0.5} />
                </Stack> */}
                    <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
                        <SliderLabelTypography variant='subtitle2'>Loan Term</SliderLabelTypography>
                        <SliderSelectedValTypography variant='h6'>{term} Months</SliderSelectedValTypography>
                      </Stack>
                      <CustomSlider id='term' name='term' label='TermSlider' min={6} max={84} onSliderChange={handleTerm} valueLabelDisplay='auto' value={term} marks={false} control={control} defaultValue={36} step={6} />
                    </Stack>
                    <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                      <SliderLabelTypography variant='subtitle2'>How often would you like to make your payment?</SliderLabelTypography>
                      <RadioGroup id='paymentFrequency2' name='paymentFrequency2' onRadioChange={handlePaymentFrequency} value={paymentFrequency} control={control} variant='' defaultValue={''}>
                        <FormControlLabel value='W' control={<Radio />} label='Weekly' />
                        <FormControlLabel value='F' control={<Radio />} label='Fortnightly' />
                        <FormControlLabel value='M' control={<Radio />} label='Monthly' />
                      </RadioGroup>
                    </Stack>
                  </Stack>

                  <Divider sx={{ width: '100%', m: 0, p: 0 }} />
                  <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                    <Stack direction='column' justifyContent='center' alignItems='flex-start' sx={{ width: '100%', m: 0, p: 0 }}>
                      <SliderLabelTypography variant='subtitle2'>Loan Protection Insurance</SliderLabelTypography>
                      <Typography variant='caption'>
                        This is your optional Loan Protection Insurance. To learn more about Loan Protection Insurance,
                        <Link color='secondary.main' href={PATH_PAGE.loanprotectioninsurance} target='_blank'>
                          {' '}
                          click here
                        </Link>
                        {'. '}
                        Please choose the insurance covers required:
                      </Typography>
                    </Stack>
                    <LoanProtectionInsurance sethasLpiPrimeDeath={sethasLpiPrimeDeath} sethasLpiPrimeDisability={sethasLpiPrimeDisability} sethasLpiPrimeCriticalIllness={sethasLpiPrimeCriticalIllness} sethasLpiPrimeBankruptcy={sethasLpiPrimeBankruptcy} setLPIUpfrontFee={setLPIUpfrontFee} />
                  </Stack>
                </Stack>
                <Stack direction='row' justifyContent='flex-end' alignItems='center'>
                  <Button variant='contained' color='secondary' onClick={handleOnClick} sx={{ borderRadius: 32 }} component={RouterLink} to={'/LoanPrerequisites'}>
                    Start your Application
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gridColumn: downMd ? 'span 3' : 'span 1',
            }}
          >
            <Card
              sx={{
                width: '100%',
              }}
            >
              <Paper
                sx={{
                  minWidth: '100%',
                }}
              >
                <CardContent
                  sx={{
                    width: '100%',
                  }}
                >
                  <Box sx={{ mb: downMd ? 2 : 5, textAlign: 'center' }}>
                    <Stack>
                      <DataTitleTypography variant='h6' sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#FDF7FF' : '#4B4453'), letterSpacing: 2, textTransform: 'uppercase', py: 2 }}>
                        Estimated Payment
                      </DataTitleTypography>
                      <Stack direction='row' justifyContent='center' alignItems='baseline' sx={{ width: '100%' }}>
                        <CountUp start={0} end={sovInstalmentAmount} decimals={2} prefix='$ ' duration={2}>
                          {({ countUpRef }) => (
                            <div>
                              <Typography sx={{ fontWeight: '700' }} color='primary' variant='h2' ref={countUpRef} />
                            </div>
                          )}
                        </CountUp>
                        <Typography sx={{ color: (theme) => (theme.palette.mode === 'dark' ? '#FDF7FF' : '#4B4453'), fontWeight: 'light' }} variant='h6'>
                          {sovPaymentFrequencyType1 === 'M' ? '/month' : sovPaymentFrequencyType1 === 'F' ? '/fortnight' : '/week'}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  {downMd && (
                    <Box sx={{ py: 2 }}>
                      <Stack direction='column' spacing={2} sx={{ px: 0 }}>
                        {/* <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                          <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
                            <SliderLabelTypography variant='subtitle2'>Loan Amount</SliderLabelTypography>
                            <Typography variant='subtitle2'>{fCurrency(loanAmount)}</Typography>
                          </Stack>
                          <CustomSlider id='loanAmount' name='loanAmount' label='loanAmountSlider' min={500} max={50000} control={control} onSliderChange={handleLoanAmount} valueLabelDisplay='auto' value={loanAmount} marks={false} defaultValue={3000} step={50} />
                        </Stack> */}
                        <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%', py: 3 }}>
                          <Typography sx={{ color: 'text.secondary' }} variant='caption'>
                            Enter the amount you would like to borrow.
                          </Typography>
                          <TextField_Custom
                            label='Loan Amount'
                            name='loanAmountCust'
                            onChange={handleLoanAmount}
                            value={loanAmount}
                            fullWidth
                            size='small'
                            sx={{ width: '80%' }}
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
                        <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                          <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
                            <SliderLabelTypography variant='subtitle2'>Loan Term</SliderLabelTypography>
                            <Typography variant='subtitle2'>{term} Months</Typography>
                          </Stack>
                          <CustomSlider id='term' name='term' label='TermSlider' min={6} max={84} onSliderChange={handleTerm} valueLabelDisplay='auto' value={term} marks={false} control={control} defaultValue={36} step={6} />
                        </Stack>
                        {/* <Stack direction='column' justifyContent='flex-start' alignItems='flex-start' spacing={1}>
                          <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
                            <SliderLabelTypography variant='subtitle2'>Interest Rate</SliderLabelTypography>
                            <Typography variant='subtitle2'>{interestRate} %</Typography>
                          </Stack>
                          <CustomSlider id='interestRate' name='interestRate' label='InterestRateSlider' min={9.95} max={18.0} control={control} onSliderChange={handleInterestRate} valueLabelDisplay='auto' value={interestRate} marks={true} defaultValue={12.5} step={0.5} />
                        </Stack> */}
                        <Stack direction='column'>
                          <LabelStyle sx={{ textAlign: 'center' }}>How often would you like to make your payment?</LabelStyle>
                          <RadioGroup id='paymentFrequency1' name='paymentFrequency1' onRadioChange={handlePaymentFrequency} value={paymentFrequency} control={control} variant='' defaultValue={''} alignItems='center' row={downSm ? false : true}>
                            <FormControlLabel sx={{ alignItems: 'center' }} value='W' control={<Radio size='small' />} label='Weekly' />
                            <FormControlLabel sx={{ alignItems: 'center' }} value='F' control={<Radio size='small' />} label='Fortnightly' />
                            <FormControlLabel sx={{ alignItems: 'center' }} value='M' control={<Radio size='small' />} label='Monthly' />
                          </RadioGroup>
                        </Stack>
                        <Divider sx={{ width: '100%', m: 0, p: 0 }} />
                        <Stack direction='column' justifyContent='center' alignItems='center'>
                          <SliderLabelTypography variant='subtitle2'>
                            Loan Protection Insurance <Typography variant='caption'>(optional)</Typography>
                          </SliderLabelTypography>
                          <Stack direction='column' justifyContent='center' alignItems='center' sx={{ width: '100%', m: 0, p: 0 }}></Stack>
                          <Stack direction='column' justifyContent='center' alignItems='center' sx={{ py: 2 }}>
                            <Typography variant='caption' sx={{ textAlign: 'center' }}>
                              Please choose the insurance covers required:
                            </Typography>
                            <LoanProtectionInsurance sethasLpiPrimeDeath={sethasLpiPrimeDeath} sethasLpiPrimeDisability={sethasLpiPrimeDisability} sethasLpiPrimeCriticalIllness={sethasLpiPrimeCriticalIllness} sethasLpiPrimeBankruptcy={sethasLpiPrimeBankruptcy} setLPIUpfrontFee={setLPIUpfrontFee} />
                          </Stack>
                          <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                            <Typography variant='caption' sx={{ textAlign: 'center' }}>
                              To learn more about Loan Protection Insurance,
                              <Link color='secondary.main' href={PATH_PAGE.loanprotectioninsurance} target='_blank'>
                                {' '}
                                click here
                              </Link>
                              {'. '}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Divider sx={{ width: '100%' }} />
                      </Stack>
                    </Box>
                  )}
                  <Stack direction='column' spacing={4} sx={{ width: '100%', mt: 2 }}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        bgcolor: 'grey.200',
                        p: 3,
                      }}
                    >
                      <Stack direction='column' spacing={4} sx={{ width: '100%' }}>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                          <DataLabelTypography variant='subtitle1'>Loan Amount</DataLabelTypography>
                          <DataValueTypography variant='subtitle1'>{fCurrency(loanAmount)}</DataValueTypography>
                        </Stack>
                        <Stack direction='row' justifyContent='space-between' alignItems='center'>
                          <DataLabelTypography variant='subtitle1'>Loan Protection Insurance</DataLabelTypography>
                          <DataValueTypography variant='subtitle1'>{fCurrency(lpiGrossPremium)}</DataValueTypography>
                        </Stack>
                        <Stack direction='column' spacing={2}>
                          <Stack direction='row' justifyContent='space-between' alignItems='center'>
                            <DataLabelTypography variant='subtitle1'>Cost Recovery Fees*</DataLabelTypography>
                            <DataValueTypography variant='subtitle1'>{fCurrency(sovCreditCheckAmount + sovCreditSenseAmount + sovCloudCheckIdVerificationAmount + sovCloudCheckPEPSanctionsAmount + sovMotorwebCheckAmount + sovDocusignAmount + sovPPSRAmount)}</DataValueTypography>
                          </Stack>
                          <Divider sx={{ width: '100%' }} />
                          <Stack direction='column' spacing={1}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                              <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>
                                Principal Amount
                              </Typography>
                              <Typography variant='subtitle1' sx={{ fontWeight: '500' }}>
                                {fCurrency(sovAmountFinanced)}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Box>

                    {/* <Divider sx={{ width: '100%' }} /> */}

                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <DataLabelTypography variant='subtitle1'>Loan Term</DataLabelTypography>
                      <DataValueTypography variant='subtitle1'>{term} Months</DataValueTypography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <DataLabelTypography variant='subtitle1'>Interest Rate</DataLabelTypography>
                      <DataValueTypography variant='subtitle1'>{interestRate}% p.a.</DataValueTypography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <DataLabelTypography variant='subtitle1'>Total Interest</DataLabelTypography>
                      <DataValueTypography variant='subtitle1'>{fCurrency(sovInterestAmount)}</DataValueTypography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                      <DataLabelTypography variant='subtitle1'>Total Amount Payable</DataLabelTypography>
                      <DataValueTypography variant='subtitle1'>{fCurrency(sovAmountPayable)}</DataValueTypography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                      <Typography variant='caption'>
                        <Link onClick={handleOpenCostRecoveryModal}>*Click here to learn more about loan cost recovery fees.</Link>
                      </Typography>
                    </Stack>
                    <Stack direction='column' sx={{ width: '100%' }}>
                      {downMd && (
                        <CardActions disableSpacing>
                          <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={1} sx={{ width: '100%' }}>
                            <Typography variant='caption' sx={{ fontWeight: 'light' }}>
                              Show payment breakdown
                            </Typography>
                            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
                              <ExpandMoreRoundedIcon />
                            </ExpandMore>
                          </Stack>
                        </CardActions>
                      )}
                      <Collapse in={expanded} timeout='auto'>
                        <Stack justifyContent='center' alignItems='center' sx={{ my: 2 }}>
                          <DonutChart />
                        </Stack>
                      </Collapse>
                    </Stack>
                  </Stack>
                  {downMd && (
                    <Stack direction='column' spacing={2}>
                      <Divider />
                      <Stack direction='row' justifyContent='center' alignItems='center' sx={{ py: 3 }}>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: 32 }} component={RouterLink} to={'/LoanPrerequisites'}>
                          Start your Application
                        </Button>
                      </Stack>
                    </Stack>
                  )}
                </CardContent>
              </Paper>
            </Card>
          </Box>
        </Box>
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
                  <Typography variant='body1'>{fCurrency(sovCreditCheckAmount)}</Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1'>Credit Sense</Typography>
                  <Typography variant='body1'>{fCurrency(sovCreditSenseAmount)}</Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1'>Motorweb Check</Typography>
                  <Typography variant='body1'>{fCurrency(sovMotorwebCheckAmount)}</Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1'>PPSR Registration</Typography>
                  <Typography variant='body1'>{fCurrency(sovPPSRAmount)}</Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1'>Docusign (Remote signing) </Typography>
                  <Typography variant='body1'>{fCurrency(sovDocusignAmount)}</Typography>
                </Stack>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1'>Cloud Check - ID Verification</Typography>
                  <Typography variant='body1'>{fCurrency(sovCloudCheckIdVerificationAmount)}</Typography>
                </Stack>
                <Stack direction='column' spacing={2}>
                  <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='body1'>Cloud Check PEP & Sanctions</Typography>
                    <Typography variant='body1'>{fCurrency(sovCloudCheckPEPSanctionsAmount)}</Typography>
                  </Stack>
                  <Divider sx={{ width: '100%' }} />
                  <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography variant='body1' sx={{ fontWeight: 500 }}>
                      Total
                    </Typography>
                    <Typography variant='body1' sx={{ fontWeight: 500 }}>
                      {fCurrency(fCurrency(sovCreditCheckAmount + sovCreditSenseAmount + sovCloudCheckIdVerificationAmount + sovCloudCheckPEPSanctionsAmount + sovMotorwebCheckAmount + sovDocusignAmount + sovPPSRAmount))}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Paper>
          </DialogContent>
        </Dialog>
      </Container>
    </RootStyle>
  )
}

// Git commit control 1
