import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

//* MUI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { sopLiabilitiesActions } from '../../redux/slices/sopLiabilitiesSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHF_SOP_Input } from '../../components/RHF-mui-compoments'

export default function RHFSOPAsset() {
  const dispatch = useDispatch()

  const mortgageConsolidate = useSelector((state) => state.sopLiabilitiesReducer.mortgage.consolidate)
  const mortgageCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.mortgage.creditLimit)
  const mortgageOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.mortgage.outstandingBalance)
  const mortgageAmt1 = useSelector((state) => state.sopLiabilitiesReducer.mortgage.amount1)
  const mortgageAmt2 = useSelector((state) => state.sopLiabilitiesReducer.mortgage.amount2)
  const mortgageAmt3 = useSelector((state) => state.sopLiabilitiesReducer.mortgage.amount3)

  const storecardConsolidate = useSelector((state) => state.sopLiabilitiesReducer.storecard.consolidate)
  const storecardCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.storecard.creditLimit)
  const storecardOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.storecard.outstandingBalance)
  const storecard1 = useSelector((state) => state.sopLiabilitiesReducer.storecard.amount1)
  const storecard2 = useSelector((state) => state.sopLiabilitiesReducer.storecard.amount2)
  const storecard3 = useSelector((state) => state.sopLiabilitiesReducer.storecard.amount3)

  const mastercardConsolidate = useSelector((state) => state.sopLiabilitiesReducer.mastercard.consolidate)
  const mastercardCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.mastercard.creditLimit)
  const mastercardOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.mastercard.outstandingBalance)
  const mastercard1 = useSelector((state) => state.sopLiabilitiesReducer.mastercard.amount1)
  const mastercard2 = useSelector((state) => state.sopLiabilitiesReducer.mastercard.amount2)
  const mastercard3 = useSelector((state) => state.sopLiabilitiesReducer.mastercard.amount3)

  const visaConsolidate = useSelector((state) => state.sopLiabilitiesReducer.visa.consolidate)
  const visaCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.visa.creditLimit)
  const visaOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.visa.outstandingBalance)
  const visa1 = useSelector((state) => state.sopLiabilitiesReducer.visa.amount1)
  const visa2 = useSelector((state) => state.sopLiabilitiesReducer.visa.amount2)
  const visa3 = useSelector((state) => state.sopLiabilitiesReducer.visa.amount3)

  const studentloanConsolidate = useSelector((state) => state.sopLiabilitiesReducer.studentloan.consolidate)
  const studentloanCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.studentloan.creditLimit)
  const studentloanOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.studentloan.outstandingBalance)
  const studentloan1 = useSelector((state) => state.sopLiabilitiesReducer.studentloan.amount1)
  const studentloan2 = useSelector((state) => state.sopLiabilitiesReducer.studentloan.amount2)
  const studentloan3 = useSelector((state) => state.sopLiabilitiesReducer.studentloan.amount3)

  const otherloan1Consolidate = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.consolidate)
  const otherloan1CreditLimit = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.creditLimit)
  const otherloan1OutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.outstandingBalance)
  const otherloan11 = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.amount1)
  const otherloan12 = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.amount2)
  const otherloan13 = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.amount3)

  const onSubmitLiabilityDetails = useSelector((state) => state.sopLiabilitiesReducer.onSubmitLiabilityDetails)

  const liabilityItems = [
    {
      id: 1,
      title: 'Mortgage',
      groupBy: 'liability',
      consolidate: mortgageConsolidate,
      creditLimit: mortgageCreditLimit,
      outStandingBalance: mortgageOutstandingBalance,
      amount1: mortgageAmt1,
      amount2: mortgageAmt2,
      amount3: mortgageAmt3,
      label: 'Mortgage',
      controlName: '',
      sovereignKey: '1STMORT',
      sovereignValue: 'First Mortgage',
      callbackConsolidate: (event) => {
        dispatch(sopLiabilitiesActions.setMortgageConsolidate(event.target.checked))
      },
      callbackCreditLimit: (event) => {
        dispatch(sopLiabilitiesActions.setMortgageCreditLimit(parseFloat(event.target.value)))
      },
      callbackOutstandingBal: (event) => {
        dispatch(sopLiabilitiesActions.setMortgageOutstandingBalance(parseFloat(event.target.value)))
      },
      callbackfnAmt1: (event) => {
        dispatch(sopLiabilitiesActions.setMortgageAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopLiabilitiesActions.setMortgageAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopLiabilitiesActions.setMortgageAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 2,
      title: 'Storecard',
      groupBy: 'liability',
      consolidate: storecardConsolidate,
      creditLimit: storecardCreditLimit,
      outStandingBalance: storecardOutstandingBalance,
      amount1: storecard1,
      amount2: storecard2,
      amount3: storecard3,
      label: 'Storecard',
      controlName: '',
      sovereignKey: 'SCRDHPUR',
      sovereignValue: 'Store Cards/Hire Purchase',
      callbackConsolidate: (event) => {
        dispatch(sopLiabilitiesActions.setStorecardConsolidate(event.target.checked))
      },
      callbackCreditLimit: (event) => {
        dispatch(sopLiabilitiesActions.setStorecardCreditLimit(parseFloat(event.target.value)))
      },
      callbackOutstandingBal: (event) => {
        dispatch(sopLiabilitiesActions.setStorecardOutstandingBalance(parseFloat(event.target.value)))
      },
      callbackfnAmt1: (event) => {
        dispatch(sopLiabilitiesActions.setStorecardAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopLiabilitiesActions.setStorecardAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopLiabilitiesActions.setStorecardAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 3,
      title: 'Mastercard',
      groupBy: 'liability',
      consolidate: mastercardConsolidate,
      creditLimit: mastercardCreditLimit,
      outStandingBalance: mastercardOutstandingBalance,
      amount1: mastercard1,
      amount2: mastercard2,
      amount3: mastercard3,
      label: 'Mastercard',
      controlName: '',
      sovereignKey: 'MSCARD',
      sovereignValue: 'Mastercard',
      callbackConsolidate: (event) => {
        dispatch(sopLiabilitiesActions.setMastercardConsolidate(event.target.checked))
      },
      callbackCreditLimit: (event) => {
        dispatch(sopLiabilitiesActions.setMastercardCreditLimit(parseFloat(event.target.value)))
      },
      callbackOutstandingBal: (event) => {
        dispatch(sopLiabilitiesActions.setMastercardOutstandingBalance(parseFloat(event.target.value)))
      },
      callbackfnAmt1: (event) => {
        dispatch(sopLiabilitiesActions.setMastercardAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopLiabilitiesActions.setMastercardAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopLiabilitiesActions.setMastercardAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 4,
      title: 'Visa Card',
      groupBy: 'liability',
      consolidate: visaConsolidate,
      creditLimit: visaCreditLimit,
      outStandingBalance: visaOutstandingBalance,
      amount1: visa1,
      amount2: visa2,
      amount3: visa3,
      label: 'Visa Card',
      controlName: '',
      sovereignKey: 'VISACARD',
      sovereignValue: 'Visa Card',
      callbackConsolidate: (event) => {
        dispatch(sopLiabilitiesActions.setVisaConsolidate(event.target.checked))
      },
      callbackCreditLimit: (event) => {
        dispatch(sopLiabilitiesActions.setVisaCreditLimit(parseFloat(event.target.value)))
      },
      callbackOutstandingBal: (event) => {
        dispatch(sopLiabilitiesActions.setVisaOutstandingBalance(parseFloat(event.target.value)))
      },
      callbackfnAmt1: (event) => {
        dispatch(sopLiabilitiesActions.setVisaAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopLiabilitiesActions.setVisaAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopLiabilitiesActions.setVisaAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 5,
      title: 'Student Loan',
      groupBy: 'liability',
      consolidate: studentloanConsolidate,
      creditLimit: studentloanCreditLimit,
      outStandingBalance: studentloanOutstandingBalance,
      amount1: studentloan1,
      amount2: studentloan2,
      amount3: studentloan3,
      label: 'Student Loan',
      controlName: '',
      sovereignKey: 'STUDENTLO',
      sovereignValue: 'Student Loan',
      callbackConsolidate: (event) => {
        dispatch(sopLiabilitiesActions.setStudentloanConsolidate(event.target.checked))
      },
      callbackCreditLimit: (event) => {
        dispatch(sopLiabilitiesActions.setStudentloanCreditLimit(parseFloat(event.target.value)))
      },
      callbackOutstandingBal: (event) => {
        dispatch(sopLiabilitiesActions.setStudentloanOutstandingBalance(parseFloat(event.target.value)))
      },
      callbackfnAmt1: (event) => {
        dispatch(sopLiabilitiesActions.setStudentloanAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopLiabilitiesActions.setStudentloanAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopLiabilitiesActions.setStudentloanAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 6,
      title: 'Other Loan 1',
      groupBy: 'liability',
      consolidate: otherloan1Consolidate,
      creditLimit: otherloan1CreditLimit,
      outStandingBalance: otherloan1OutstandingBalance,
      amount1: otherloan11,
      amount2: otherloan12,
      amount3: otherloan13,
      label: 'Other Loan 1',
      controlName: '',
      sovereignKey: 'OTHLOAN1',
      sovereignValue: 'Other Loan 1',
      callbackConsolidate: (event) => {
        dispatch(sopLiabilitiesActions.setOtherloan1Consolidate(event.target.checked))
      },
      callbackCreditLimit: (event) => {
        dispatch(sopLiabilitiesActions.setOtherloan1CreditLimit(parseFloat(event.target.value)))
      },
      callbackOutstandingBal: (event) => {
        dispatch(sopLiabilitiesActions.setOtherloan1OutstandingBalance(parseFloat(event.target.value)))
      },
      callbackfnAmt1: (event) => {
        dispatch(sopLiabilitiesActions.setOtherloan1Amount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopLiabilitiesActions.setOtherloan1Amount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopLiabilitiesActions.setOtherloan1Amount3(parseFloat(event.target.value)))
      },
    },
  ]

  // Defualt Values for React Hook Form
  const defaultValues = {
    mortgageConsolidate: mortgageConsolidate,
    mortgageCreditLimit: mortgageCreditLimit,
    mortgageOutstandingBalance: mortgageOutstandingBalance,
    mortgageAmt1: mortgageAmt1,
    mortgageAmt2: mortgageAmt2,
    mortgageAmt3: mortgageAmt3,

    storecardConsolidate: storecardConsolidate,
    storecardCreditLimit: storecardCreditLimit,
    storecardOutstandingBalance: storecardOutstandingBalance,
    storecard1: storecard1,
    storecard2: storecard2,
    storecard3: storecard3,

    mastercardConsolidate: mastercardConsolidate,
    mastercardCreditLimit: mastercardCreditLimit,
    mastercardOutstandingBalance: mastercardOutstandingBalance,
    mastercard1: mastercard1,
    mastercard2: mastercard2,
    mastercard3: mastercard3,

    visaConsolidate: visaConsolidate,
    visaCreditLimit: visaCreditLimit,
    visaOutstandingBalance: visaOutstandingBalance,
    visa1: visa1,
    visa2: visa2,
    visa3: visa3,

    studentloanConsolidate: studentloanConsolidate,
    studentloanCreditLimit: studentloanCreditLimit,
    studentloanOutstandingBalance: studentloanOutstandingBalance,
    studentloan1: studentloan1,
    studentloan2: studentloan2,
    studentloan3: studentloan3,

    otherloan1Consolidate: otherloan1Consolidate,
    otherloan1CreditLimit: otherloan1CreditLimit,
    otherloan1OutstandingBalance: otherloan1OutstandingBalance,
    otherloan11: otherloan11,
    otherloan12: otherloan12,
    otherloan13: otherloan13,
  }

  // Schema
  const AssetSchema = Yup.object().shape({
    mortgageConsolidate: Yup.boolean(),
    mortgageCreditLimit: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    mortgageOutstandingBalance: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    mortgageAmt1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    mortgageAmt2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    mortgageAmt3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    storecardConsolidate: Yup.boolean(),
    storecardCreditLimit: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    storecardOutstandingBalance: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    storecard1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    storecard2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    storecard3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    mastercardConsolidate: Yup.boolean(),
    mastercardCreditLimit: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    mastercardOutstandingBalance: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    mastercard1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    mastercard2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    mastercard3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    visaConsolidate: Yup.boolean(),
    visaCreditLimit: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    visaOutstandingBalance: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    visa1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    visa2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    visa3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    studentloanConsolidate: Yup.boolean(),
    studentloanCreditLimit: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    studentloanOutstandingBalance: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    studentloan1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    studentloan2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    studentloan3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    otherloan1Consolidate: Yup.boolean(),
    otherloan1CreditLimit: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    otherloan1OutstandingBalance: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    otherloan11: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    otherloan12: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    otherloan13: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(AssetSchema),
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
    // console.log('On Submit Loan Details')
  }

  useEffect(() => {
    if (onSubmitLiabilityDetails == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitLiabilityDetails])

  useEffect(() => {
    dispatch(sopLiabilitiesActions.setIsValidLiabilityDetails(isValid))
  }, [isValid])

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
          <Typography variant='overline' color='secondary' sx={{ width: '100%', maxWidth: 180 }}>
            Liability Item
          </Typography>
          <Typography variant='overline' color='secondary' sx={{ minWidth: 120, width: '100%' }}>
            Consolidate?
          </Typography>
          <Typography variant='overline' color='secondary' sx={{ width: '100%', maxWidth: 100 }}>
            Credit Limit
          </Typography>
          <Typography variant='overline' color='secondary' sx={{ width: '100%', maxWidth: 100 }}>
            OS. Balance
          </Typography>
          <Typography variant='overline' color='secondary' sx={{ width: '100%', maxWidth: 100 }}>
            Weekly
          </Typography>
          <Typography variant='overline' color='secondary' sx={{ width: '100%', maxWidth: 100 }}>
            Fortnightly
          </Typography>
          <Typography variant='overline' color='secondary' sx={{ width: '100%', maxWidth: 100 }}>
            Monthly
          </Typography>
        </Stack>
        {liabilityItems.map((liabilityItem) => {
          return (
            <Box key={liabilityItem?.id} sx={{ flexGrow: 1, py: 0.5 }}>
              <RHF_SOP_Input key={liabilityItem?.id} name={liabilityItem?.sovereignKey} incomeItemName={liabilityItem?.title} customTextFieldWidth={100} hasConsolidate={true} checked={liabilityItem?.consolidate} onCheckboxChange={liabilityItem?.callbackConsolidate} hasCreditLimit={true} creditLimit={liabilityItem?.creditLimit} onCreditLimitChange={liabilityItem?.callbackCreditLimit} hasOutStandingBal={true} outStandingBalance={liabilityItem?.outStandingBalance} onOutStandingBalanceChange={liabilityItem?.callbackOutstandingBal} amount1={liabilityItem?.amount1} amount2={liabilityItem?.amount2} amount3={liabilityItem?.amount3} onAmount1Change={liabilityItem?.callbackfnAmt1} onAmount2Change={liabilityItem?.callbackfnAmt2} onAmount3Change={liabilityItem?.callbackfnAmt3} />
            </Box>
          )
        })}
      </FormProvider>
    </>
  )
}
