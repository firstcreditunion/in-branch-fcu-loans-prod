import React, { useEffect, useState } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box, Button, Paper } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import Chip from '@mui/material/Chip'
import LoadingButton from '@mui/lab/LoadingButton'

//* Custom Components
import ComponentBlock from '../../layouts/ComponentBlock'
import PayoutQuoteDialog from './PayoutQuoteDialog'

//* MUI Icons
import DoneIcon from '@mui/icons-material/Done'
import SearchIcon from '@mui/icons-material/Search'
import WarningIcon from '@mui/icons-material/Warning'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

//* MUI - Dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { loanDetailsActions, getPayoutQuote } from '../../redux/slices/loanDetailsSlice'
import { clientSearchActions, getPrimeClientGeneralDetails } from '../../redux/slices/clientSearchSlice'
import { additionalInfoPart2Actions } from '../../redux/slices/additionalInfoPart2Slice'

import { baseRateTypes, creditHistoryTypes, securityTypes } from '../../redux/codes/LoanDetailsCodes'
import { dayOfWeek } from '../../redux/codes/DayOfWeek'

//* date-fns
import addDays from 'date-fns/addDays'
import { isDate } from 'date-fns'

//* Utils
import { getDateArrayFromStartDateAndEndDate } from '../../utils/dateUtilityFunctions'
import { fCurrency } from '../../utils/formatNumber'
import { fDate } from '../../utils/formatDateTime'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHFEditor, RHFSelect, RHFUpload, RHFSwitch, RHFSlider, RHFCheckbox, RHFTextField, RHFRadioGroup, RHFMultiSelect, RHFAutocomplete, RHFMultiCheckbox, RHFLandscapeDatePicker } from '../../components/RHF-mui-compoments'

import { getDocumentType_FromValue, getCreditHistory_FromValue, getSecurity_FromKey } from '../../redux/codes/getKeysOrValues'
import { documentTypes } from '../../redux/codes/DocumentType'
import { fontWeight } from '@mui/system'

export default function LoanDetails() {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [openCostRecoveryModal, setOpenCostRecoveryModal] = useState(false)
  function handleOpenCostRecoveryModal(event, reason) {
    setOpenCostRecoveryModal(true)
  }
  function handleCloseCostRecoveryModal(event, reason) {
    setOpenCostRecoveryModal(false)
  }

  // Redux Selectors
  const requestedLoanAmount = useSelector((state) => state.loanDetailsReducer.requestedLoanAmount)

  const payoutLendingAccountNumber = useSelector((state) => state.loanDetailsReducer.payoutLendingAccountNumber)
  const payoutquoteloading = useSelector((state) => state.loanDetailsReducer.payoutquoteloading)
  const payoutquoteerror = useSelector((state) => state.loanDetailsReducer.payoutquoteerror)
  const payoutquotecurrentRequestId = useSelector((state) => state.loanDetailsReducer.payoutquotecurrentRequestId)
  const payoutQuote_created = useSelector((state) => state.loanDetailsReducer.payoutQuote_created)

  const payoutQuote_settlementAmount = useSelector((state) => state.loanDetailsReducer.payoutQuote_settlementAmount)
  const payoutQuote_validThruDate = useSelector((state) => state.loanDetailsReducer.payoutQuote_validThruDate)

  let validThruDateConverted = ''

  const validThruDateIsDate = isDate(payoutQuote_validThruDate)

  if (validThruDateIsDate) {
    validThruDateConverted = fDate(startDateIsDate)
  }

  console.log('payoutQuote_settlementAmount: ', payoutQuote_settlementAmount)
  console.log('payoutQuote_validThruDate: ', payoutQuote_validThruDate)

  const documentationTypes = useSelector((state) => state.loanDetailsReducer.documentationTypes)

  // Interest Rates
  const baseInterestRate = useSelector((state) => state.loanDetailsReducer.baseInterestRate)
  const estimatedInterestRate = useSelector((state) => state.loanDetailsReducer.estimatedInterestRate)
  const creditHistory = useSelector((state) => state.loanDetailsReducer.creditHistory)
  const security = useSelector((state) => state.loanDetailsReducer.security)
  const securityFromSovereign = useSelector((state) => state.clientSearchReducer.primeIreEstimate.security)

  //Discuount on Interest Rate
  const membershipLoyaltyDiscountCheck = useSelector((state) => state.loanDetailsReducer.membershipLoyaltyDiscountCheck)
  const loanHistCreditCheckDiscountCheck = useSelector((state) => state.loanDetailsReducer.loanHistCreditCheckDiscountCheck)
  const threrOrMoreProductDiscountCheck = useSelector((state) => state.loanDetailsReducer.threrOrMoreProductDiscountCheck)

  //
  const durationSinceJoinedInMonths = useSelector((state) => state.clientSearchReducer.primedurationSinceJoinedInMonths)
  const durationSinceJoined = useSelector((state) => state.clientSearchReducer.primedurationSinceJoined)

  const activeFundingProducts = useSelector((state) => state.clientSearchReducer.primeFunding.activeAccountCount)
  const activeLendingProducts = useSelector((state) => state.clientSearchReducer.primeLending.activeAccountCount)

  // Repayments
  const paymentFrequency = useSelector((state) => state.loanDetailsReducer.paymentFrequency)
  const numberOfDaysUpperLimitFromToday = useSelector((state) => state.loanDetailsReducer.numberOfDaysUpperLimitFromToday)
  const dayOfWeekState = useSelector((state) => state.loanDetailsReducer.dayOfWeek)
  const lncalc_InstalmentStartDate = useSelector((state) => state.loanCalculatorReducer.lncalc_InstalmentStartDate)
  const firstPaymentDate = useSelector((state) => state.loanDetailsReducer.firstPaymentDate)
  const loanTerm = useSelector((state) => state.loanDetailsReducer.loanTerm)
  const isCreditUsedForRefinance = useSelector((state) => state.additionalInfoPart2Reducer.isCreditUsedForRefinance)

  // Removed after meeting with Richard - 20/06/2023 (Data feeding into the existing loan field in the portal)
  // const creditBeingSought = useSelector((state) => state.loanDetailsReducer.creditBeingSought)
  const primeClientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)
  const finalCalculatedInterestRate = useSelector((state) => state.loanDetailsReducer.finalCalculatedInterestRate)

  const onSubmitLoanDetails = useSelector((state) => state.loanDetailsReducer.onSubmitLoanDetails)

  // Defualt Values for React Hook Form
  const defaultValues = {
    requestedLoanAmount: requestedLoanAmount,
    isCreditUsedForRefinance: isCreditUsedForRefinance,
    creditHistory: creditHistory,
    security: security,
    loanHistCreditCheckDiscountCheck: loanHistCreditCheckDiscountCheck,
    threrOrMoreProductDiscountCheck: threrOrMoreProductDiscountCheck,
    paymentFrequency: paymentFrequency,
    dayOfWeekState: dayOfWeekState,
    firstPaymentDate: firstPaymentDate,
    loanTerm: loanTerm,
  }

  // Schema
  const LoanDetailsSchema = Yup.object().shape({
    requestedLoanAmount: Yup.string().required('Requested Loan Amount is required.'),
    isCreditUsedForRefinance: Yup.string().required('Please choose an option.'),
    creditHistory: Yup.string().required(),
    security: Yup.string(),
    membershipLoyaltyDiscountCheck: Yup.boolean(),
    loanHistCreditCheckDiscountCheck: Yup.boolean(),
    threrOrMoreProductDiscountCheck: Yup.boolean(),
    paymentFrequency: Yup.string().required('Payment frequency is required'),
    dayOfWeekState: Yup.string().when('paymentFrequency', {
      is: (paymentFrequency) => {
        return paymentFrequency === 'W' || paymentFrequency === 'F'
      },
      then: Yup.string().required('Please add notes.'),
      otherwise: Yup.string().nullable(),
    }),
    firstPaymentDate: Yup.string().required('First payment date is required.'),
    loanTerm: Yup.number(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(LoanDetailsSchema),
    defaultValues,
  })

  // Destructure Methods
  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods

  const onSubmit = (event) => {
    console.log('On Submit Loan Details')
  }

  // Redux dispatch functions
  function setRequestedLoanAmount(event) {
    dispatch(loanDetailsActions.setRequestedLoanAmount(parseFloat(event.target.value)))
  }
  function setPayoutLendingAccountNumber(event) {
    dispatch(loanDetailsActions.setPayoutLendingAccountNumber(event.target.value))
  }

  function setDocumentationType(event) {
    dispatch(loanDetailsActions.setDocumentationType(event.target.value))
  }

  function setDocumentationTypes(event) {
    const lengthOfTypes = event.target.value.length
    const selectedKey = event.target.value[lengthOfTypes - 1]

    const selectedDocType = documentTypes.filter((type) => {
      return type?.key === selectedKey
    })

    dispatch(loanDetailsActions.setDocumentationTypes(selectedDocType))
  }

  function setCreditHistory(event) {
    console.log('Credit History Event: ', event.target.value)
    dispatch(loanDetailsActions.setCreditHistory(event.target.value))
  }

  const startDate = new Date()
  const fortyDaysFromToday = addDays(startDate, numberOfDaysUpperLimitFromToday)

  const dateArrayResult = getDateArrayFromStartDateAndEndDate(startDate, fortyDaysFromToday)

  function setSecurity(event) {
    dispatch(loanDetailsActions.setSecurity(event.target.value))
  }

  function setMembershipLoyaltyDiscountCheck(event) {
    dispatch(loanDetailsActions.setMembershipLoyaltyDiscountCheck(event.target.checked))
  }

  function setLoanHistCreditCheckDiscountCheck(event) {
    dispatch(loanDetailsActions.setLoanHistCreditCheckDiscountCheck(event.target.checked))
  }

  function setThreeOrMoreProductsDiscountCheck(event) {
    dispatch(loanDetailsActions.setThreeOrMoreProductsDiscountCheck(event.target.checked))
  }

  function setPaymentFrequency(event) {
    dispatch(loanDetailsActions.setPaymentFrequency(event.target.value))
  }

  function setDayOfWeek(event) {
    console.log('Day of Week EVENT: ', event.target.value)
    dispatch(loanDetailsActions.setDayOfWeek(event.target.value))
  }

  function setFirstPaymentDate(date) {
    console.log('First Payment Date: ', date)
    dispatch(loanDetailsActions.setFirstPaymentDate(date))
  }

  function setLoanTerm(event) {
    dispatch(loanDetailsActions.setLoanTerm(event.target.value))
  }

  function setIsCreditUsedForRefinance(event) {
    dispatch(additionalInfoPart2Actions.setIsCreditUsedForRefinance(event.target.value))

    if (event.target.value) {
      dispatch(additionalInfoPart2Actions.setIsCreditUsedForRefinanceComments(''))
    }
  }

  // function setCreditBeingSought(event) {
  //   dispatch(loanDetailsActions.setCreditBeingSought(event.target.value))
  // }

  useEffect(async () => {
    const valueForSovereignSecurity = getSecurity_FromKey(securityFromSovereign?.type)?.value

    await dispatch(loanDetailsActions.setSecurity(valueForSovereignSecurity))
  }, [])

  useEffect(() => {
    if (onSubmitLoanDetails == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitLoanDetails])

  useEffect(() => {
    dispatch(loanDetailsActions.setIsValidLoanDetails(isValid))
  }, [isValid])

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='column' justifyContent='flex-start' spacing={7} sx={{ width: '100%', pt: 5 }}>
          <Stack direction='column' justifyContent='flex-start' spacing={5} sx={{ width: '100%' }}>
            <ComponentBlock>
              <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{ width: '100%', p: 0, m: 0 }}>
                <RHFTextField
                  name='requestedLoanAmount'
                  label='Requested Loan Amount'
                  autoFocus={true}
                  type='number'
                  onInputChange={setRequestedLoanAmount}
                  value={requestedLoanAmount}
                  InputProps={{
                    type: 'number',
                    startAdornment: (
                      <InputAdornment position='start'>
                        <AttachMoneyIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {!payoutQuote_created && <Button onClick={handleOpenCostRecoveryModal}>Request for a Payout Quote</Button>}
                {payoutQuote_created && (
                  <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1}>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                      <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                        Settlement Amount
                      </Typography>
                      <Typography variant='subtitle2'>{fCurrency(payoutQuote_settlementAmount)}</Typography>
                    </Stack>
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                      <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                        Quote Valid Until
                      </Typography>
                      <Typography variant='subtitle2'>{payoutQuote_validThruDate}</Typography>
                    </Stack>
                  </Stack>
                )}
              </Stack>
            </ComponentBlock>

            <RHFSelect name='security' label='Security' inputVariant='filled' helperText='This field is auto-populated' value={security} onSelectChange={setSecurity} disabled={true}>
              <MenuItem value='' disabled>
                Security (as per delegation matrix)
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {securityTypes.map((type) => (
                <MenuItem key={type?.key} value={type?.value}>
                  {type?.value}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFSelect name='creditHistory' label='Credit History' inputVariant='filled' value={creditHistory} onSelectChange={setCreditHistory}>
              <MenuItem value='' disabled>
                Credit History
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {creditHistoryTypes.map((type) => (
                <MenuItem key={type?.key} value={type?.value}>
                  {type?.value}
                </MenuItem>
              ))}
            </RHFSelect>
            <RHFMultiSelect chip inputVariant='filled' checkbox name='documentationTypeMulti' label='Fees' onMultiSelectChange={setDocumentationTypes} values={documentationTypes} options={documentTypes} />
          </Stack>
          {/* //? To be used in the future - The % of security used, % of security left, No. of active assets */}
          {/* <Stack
            direction='column'
            justifyContent='flex-start'
            spacing={3}
            sx={{
              width: '100%',
              pb: 7,
            }}
          >
            <Typography
              variant='caption'
              color='primary'
              sx={{
                textAlign: 'left',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: 1,
                color: 'text.secondary',
              }}
            >
              Security
            </Typography>

            <Stack direction='column' justifyContent='flex-start' spacing={2} sx={{ width: '100%' }}></Stack>
          </Stack> */}
          <Stack direction='column' justifyContent='flex-start' spacing={3} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='flex-start' spacing={5} sx={{ width: '100%' }}>
              <Stack direction='column' justifyContent='flex-start' spacing={0.5} sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5} sx={{ width: '100%' }}>
                  {membershipLoyaltyDiscountCheck ? (
                    <Tooltip title='Eligible'>
                      <DoneIcon color='success' fontSize='small' />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Ineligible'>
                      <WarningIcon color='warning' fontSize='small' />
                    </Tooltip>
                  )}
                  <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1} sx={{ width: '100%' }}>
                    <Typography variant='overline' color='primary'>
                      Membership Loyalty
                    </Typography>
                    <Chip label={`Member for ${durationSinceJoined}`} variant='outlined' size='small' color={membershipLoyaltyDiscountCheck ? 'success' : 'warning'} sx={{ color: 'text.secondary' }} />
                  </Stack>
                </Stack>
                <RHFCheckbox name='membershipLoyaltyDiscountCheck' label='Apply Membership Loyalty Discount?' onCheckboxChange={setMembershipLoyaltyDiscountCheck} checked={membershipLoyaltyDiscountCheck} disabled={true} />
              </Stack>
              <Stack direction='column' justifyContent='flex-start' spacing={0.5} sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5} sx={{ width: '100%' }}>
                  {loanHistCreditCheckDiscountCheck ? (
                    <Tooltip title='Eligible'>
                      <DoneIcon color='success' fontSize='small' />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Ineligible'>
                      <WarningIcon color='warning' fontSize='small' />
                    </Tooltip>
                  )}
                  <Typography variant='overline' color='primary'>
                    Credit Check Discount
                  </Typography>
                </Stack>
                <RHFCheckbox name='loanHistCreditCheckDiscountCheck' label='Apply Discount for Loan History or Credit Check?' onCheckboxChange={setLoanHistCreditCheckDiscountCheck} checked={loanHistCreditCheckDiscountCheck} />
              </Stack>
              <Stack direction='column' justifyContent='flex-start' spacing={0.5} sx={{ width: '100%' }}>
                <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={0.5} sx={{ width: '100%' }}>
                  {threrOrMoreProductDiscountCheck ? (
                    <Tooltip title='Eligible'>
                      <DoneIcon color='success' fontSize='small' />
                    </Tooltip>
                  ) : (
                    <Tooltip title='Ineligible'>
                      <WarningIcon color='warning' fontSize='small' />
                    </Tooltip>
                  )}
                  <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1} sx={{ width: '100%' }}>
                    <Typography variant='overline' color='primary'>
                      Product Discount
                    </Typography>
                    <Chip label={`${activeFundingProducts + activeLendingProducts} active product(s)`} variant='outlined' size='small' color={threrOrMoreProductDiscountCheck ? 'success' : 'warning'} sx={{ color: 'text.secondary' }} />
                  </Stack>
                </Stack>
                <RHFCheckbox name='threrOrMoreProductDiscountCheck' label='Apply Discount for having three or more products?' onCheckboxChange={setThreeOrMoreProductsDiscountCheck} checked={threrOrMoreProductDiscountCheck} disabled={true} />
              </Stack>
            </Stack>
          </Stack>
          <Stack direction='column' justifyContent='flex-start' spacing={5} sx={{ width: '100%' }}>
            <Stack direction='column' justifyContent='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='caption' color='primary' sx={{ textAlign: 'left', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 }}>
                Payment Frequency
              </Typography>
              <RHFRadioGroup
                row
                name='paymentFrequency'
                label=''
                spacing={4}
                onRadioChange={setPaymentFrequency}
                value={paymentFrequency}
                options={[
                  { value: 'W', label: 'Weekly' },
                  { value: 'F', label: 'Fortnightly' },
                  { value: 'M', label: 'Monthly' },
                ]}
              />
            </Stack>
            <Stack direction='column' justifyContent='flex-start' spacing={1} sx={{ minWidth: '350px', width: '100%' }}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='caption' color='primary' sx={{ textAlign: 'left', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 }}>
                  Loan Term
                </Typography>
                <Typography variant='subtitle1'>{loanTerm} Months</Typography>
              </Stack>
              <RHFSlider name='loanTerm' min={1} max={48} onSliderChange={setLoanTerm} valueLabelDisplay='auto' value={loanTerm} marks={true} defaultValue={12} />
            </Stack>
            {/* <Divider flexItem>
              <Chip label='Choose First Payment Date' />
            </Divider> */}
            <Stack direction='column' justifyContent='flex-start' spacing={1} sx={{ width: '100%' }}>
              <Typography variant='caption' color='primary' sx={{ textAlign: 'left', textTransform: 'uppercase', fontWeight: 'bold', letterSpacing: 1 }}>
                First Payment Date
              </Typography>
              <RHFLandscapeDatePicker name='firstPaymentDate' dateValue={firstPaymentDate} onDateChange={setFirstPaymentDate} minDate={startDate} maxDate={fortyDaysFromToday} />
            </Stack>
          </Stack>
        </Stack>
      </FormProvider>
      <PayoutQuoteDialog openDialog={openCostRecoveryModal} setOpenCostRecoveryModalParent={setOpenCostRecoveryModal} />
    </>
  )
}

{
  /* <RHFSelect name='baseInterestRate' label='Base Interest Rate' value={baseInterestRate} onSelectChange={setBaseInterestRate}>
            <MenuItem value='' disabled>
              Select Base Interest Rate
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {baseRateTypes.map((type) => (
              <MenuItem key={type?.key} value={type?.value}>
                {type?.value}
              </MenuItem>
            ))}
          </RHFSelect> */
}
{
  /* //! Removed Credit History Question becuase Chedit Check is not being done at this point. */
}
{
  /* <RHFSelect name='creditHistory' label='Credit History' value={creditHistory} onSelectChange={setCreditHistory}>
              <MenuItem value='' disabled>
                Credit History
              </MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {creditHistoryTypes.map((type) => (
                <MenuItem key={type?.key} value={type?.value}>
                  {type?.value}
                </MenuItem>
              ))}
            </RHFSelect> */
}
