import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

//* MUI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { loanDetailsActions } from '../../redux/slices/loanDetailsSlice'

import { documentTypes } from '../../redux/codes/DocumentType'
import { baseRateTypes, creditHistoryTypes, securityTypes } from '../../redux/codes/LoanDetailsCodes'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHFEditor, RHFSelect, RHFUpload, RHFSwitch, RHFSlider, RHFCheckbox, RHFTextField, RHFRadioGroup, RHFMultiSelect, RHFAutocomplete, RHFMultiCheckbox } from '../../components/RHF-mui-compoments'

import { getDocumentType_FromValue } from '../../redux/codes/getKeysOrValues'
import PreviewLoanDetailsPortal from '../../sections/FinancialDetails/PreviewLoanDetailsPortal'

export default function LoanDetails() {
  const dispatch = useDispatch()

  // Redux Selectors
  const requestedLoanAmount = useSelector((state) => state.loanDetailsReducer.requestedLoanAmount)
  const documentationType = useSelector((state) => state.loanDetailsReducer.documentationType)

  // Interest Rates
  const baseInterestRate = useSelector((state) => state.loanDetailsReducer.baseInterestRate)
  const creditHistory = useSelector((state) => state.loanDetailsReducer.creditHistory)
  const security = useSelector((state) => state.loanDetailsReducer.security)

  //Discuount on Interest Rate
  const membershipLoyaltyDiscountCheck = useSelector((state) => state.loanDetailsReducer.membershipLoyaltyDiscountCheck)
  const loanHistCreditCheckDiscountCheck = useSelector((state) => state.loanDetailsReducer.loanHistCreditCheckDiscountCheck)
  const threrOrMoreProductDiscountCheck = useSelector((state) => state.loanDetailsReducer.threrOrMoreProductDiscountCheck)

  // Repayments
  const paymentFrequency = useSelector((state) => state.loanDetailsReducer.paymentFrequency)
  const loanTerm = useSelector((state) => state.loanDetailsReducer.loanTerm)
  const creditBeingSought = useSelector((state) => state.loanDetailsReducer.creditBeingSought)

  const finalCalculatedInterestRate = useSelector((state) => state.loanDetailsReducer.finalCalculatedInterestRate)

  const onSubmitLoanDetails = useSelector((state) => state.loanDetailsReducer.onSubmitLoanDetails)

  // Defualt Values for React Hook Form
  const defaultValues = {
    requestedLoanAmount: requestedLoanAmount,
    creditBeingSought: creditBeingSought,
    documentationType: documentationType,
    baseInterestRate: baseInterestRate,
    creditHistory: creditHistory,
    security: security,
    membershipLoyaltyDiscountCheck: membershipLoyaltyDiscountCheck,
    loanHistCreditCheckDiscountCheck: loanHistCreditCheckDiscountCheck,
    threrOrMoreProductDiscountCheck: threrOrMoreProductDiscountCheck,
    paymentFrequency: paymentFrequency,
    loanTerm: loanTerm,
  }

  // Schema
  const LoanDetailsSchema = Yup.object().shape({
    requestedLoanAmount: Yup.string().required('Requested Loan Amount is required.'),
    creditBeingSought: Yup.string().required('Credit Limit is required.'),
    documentationType: Yup.string().required('Documentation Type is required.'),
    baseInterestRate: Yup.string().required('Base Rate Type is required.'),
    creditHistory: Yup.string().required('Credit History is required.'),
    security: Yup.string().required('Security is required.'),
    membershipLoyaltyDiscountCheck: Yup.boolean(),
    loanHistCreditCheckDiscountCheck: Yup.boolean(),
    threrOrMoreProductDiscountCheck: Yup.boolean(),
    paymentFrequency: Yup.string().required('Payment frequency is required'),
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
  function setDocumentationType(event) {
    dispatch(loanDetailsActions.setDocumentationType(event.target.value))
  }
  function setBaseInterestRate(event) {
    dispatch(loanDetailsActions.setBaseRateInterest(event.target.value))
  }
  function setCreditHistory(event) {
    dispatch(loanDetailsActions.setCreditHistory(event.target.value))
  }
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
  function setLoanTerm(event) {
    dispatch(loanDetailsActions.setLoanTerm(event.target.value))
  }
  function setCreditBeingSought(event) {
    dispatch(loanDetailsActions.setCreditBeingSought(event.target.value))
  }

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
        <PreviewLoanDetailsPortal />
        <Stack
          direction='column'
          justifyContent='flex-start'
          spacing={3}
          sx={{
            minWidth: '350px',
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
            Loan Details
          </Typography>
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
          <RHFTextField
            name='creditBeingSought'
            label='Credit Limit'
            helperText='How much credit is being sought?'
            autoFocus={true}
            type='number'
            onInputChange={setCreditBeingSought}
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

          <RHFSelect name='documentationType' label='Documentation Type' value={documentationType} onSelectChange={setDocumentationType}>
            <MenuItem value='' disabled>
              Select Documentation Type
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {documentTypes.map((type) => (
              <MenuItem key={type?.key} value={type?.value}>
                {type?.value}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>

        <Stack direction='column' justifyContent='flex-start' spacing={3} sx={{ minWidth: '350px', width: '100%', pb: 7 }}>
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
            Interest Rates
          </Typography>

          <RHFSelect name='baseInterestRate' label='Base Interest Rate' value={baseInterestRate} onSelectChange={setBaseInterestRate}>
            <MenuItem value='' disabled>
              Select Base Interest Rate
            </MenuItem>
            <Divider sx={{ borderStyle: 'dashed' }} />
            {baseRateTypes.map((type) => (
              <MenuItem key={type?.key} value={type?.value}>
                {type?.value}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect name='creditHistory' label='Credit History' value={creditHistory} onSelectChange={setCreditHistory}>
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
          <RHFSelect name='security' label='Security' value={security} onSelectChange={setSecurity}>
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
          <Stack direction='column' justifyContent='flex-start' spacing={2} sx={{ minWidth: '350px', width: '100%' }}>
            <RHFCheckbox name='membershipLoyaltyDiscountCheck' label='Apply Membership Loyalty Discount?' onCheckboxChange={setMembershipLoyaltyDiscountCheck} checked={membershipLoyaltyDiscountCheck} />
            <RHFCheckbox name='loanHistCreditCheckDiscountCheck' label='Apply Discount for Loan History or Credit Check?' onCheckboxChange={setLoanHistCreditCheckDiscountCheck} checked={loanHistCreditCheckDiscountCheck} />
            <RHFCheckbox name='threrOrMoreProductDiscountCheck' label='Apply Discount for having three or more products?' onCheckboxChange={setThreeOrMoreProductsDiscountCheck} checked={threrOrMoreProductDiscountCheck} />
          </Stack>
        </Stack>
        <Stack direction='column' justifyContent='flex-start' spacing={3} sx={{ minWidth: '350px', width: '100%' }}>
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
            Repayments
          </Typography>
          <RHFRadioGroup
            row
            name='paymentFrequency'
            label='Payment Frequency'
            spacing={4}
            onRadioChange={setPaymentFrequency}
            value={paymentFrequency}
            options={[
              { value: 'W', label: 'Weekly' },
              { value: 'F', label: 'Fortnightly' },
              { value: 'M', label: 'Monthly' },
            ]}
          />
          <Stack direction='column' justifyContent='flex-start' spacing={0.5} sx={{ minWidth: '350px', width: '100%' }}>
            <RHFSlider name='loanTerm' min={1} max={48} onSliderChange={setLoanTerm} valueLabelDisplay='auto' value={loanTerm} marks={true} defaultValue={12} />
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Typography>Loan Term</Typography>
              <Typography variant='subtitle1'>{loanTerm} Months</Typography>
            </Stack>
          </Stack>
        </Stack>
      </FormProvider>
    </>
  )
}
