import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box, Chip } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

//* MUI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { sopIncomeGridSliceActions } from '../../redux/slices/sopIncomeSlice'
import { sopItemsActions, getSopSummary } from '../../redux/slices/sopItemsSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHF_SOP_Input } from '../../components/RHF-mui-compoments'

export default function RHFSOPIncome() {
  const dispatch = useDispatch()

  const wagesAmt1 = useSelector((state) => state.sopIncomeDataGridReducer.wages.amount1)
  const wagesAmt2 = useSelector((state) => state.sopIncomeDataGridReducer.wages.amount2)
  const wagesAmt3 = useSelector((state) => state.sopIncomeDataGridReducer.wages.amount3)

  const secondWages1 = useSelector((state) => state.sopIncomeDataGridReducer.secondWages.amount1)
  const secondWages2 = useSelector((state) => state.sopIncomeDataGridReducer.secondWages.amount2)
  const secondWages3 = useSelector((state) => state.sopIncomeDataGridReducer.secondWages.amount3)

  const winzBenefit1 = useSelector((state) => state.sopIncomeDataGridReducer.winzBenefit.amount1)
  const winzBenefit2 = useSelector((state) => state.sopIncomeDataGridReducer.winzBenefit.amount2)
  const winzBenefit3 = useSelector((state) => state.sopIncomeDataGridReducer.winzBenefit.amount3)

  const selfEmployed1 = useSelector((state) => state.sopIncomeDataGridReducer.selfEmployed.amount1)
  const selfEmployed2 = useSelector((state) => state.sopIncomeDataGridReducer.selfEmployed.amount2)
  const selfEmployed3 = useSelector((state) => state.sopIncomeDataGridReducer.selfEmployed.amount3)

  const nzSuper1 = useSelector((state) => state.sopIncomeDataGridReducer.nzSuper.amount1)
  const nzSuper2 = useSelector((state) => state.sopIncomeDataGridReducer.nzSuper.amount2)
  const nzSuper3 = useSelector((state) => state.sopIncomeDataGridReducer.nzSuper.amount3)

  const studyLink1 = useSelector((state) => state.sopIncomeDataGridReducer.studyLink.amount1)
  const studyLink2 = useSelector((state) => state.sopIncomeDataGridReducer.studyLink.amount2)
  const studyLink3 = useSelector((state) => state.sopIncomeDataGridReducer.studyLink.amount3)

  const rentalIncome1 = useSelector((state) => state.sopIncomeDataGridReducer.rentalIncome.amount1)
  const rentalIncome2 = useSelector((state) => state.sopIncomeDataGridReducer.rentalIncome.amount2)
  const rentalIncome3 = useSelector((state) => state.sopIncomeDataGridReducer.rentalIncome.amount3)

  const childSupport1 = useSelector((state) => state.sopIncomeDataGridReducer.childSupport.amount1)
  const childSupport2 = useSelector((state) => state.sopIncomeDataGridReducer.childSupport.amount2)
  const childSupport3 = useSelector((state) => state.sopIncomeDataGridReducer.childSupport.amount3)

  const workingForFamilies1 = useSelector((state) => state.sopIncomeDataGridReducer.workingForFamilies.amount1)
  const workingForFamilies2 = useSelector((state) => state.sopIncomeDataGridReducer.workingForFamilies.amount2)
  const workingForFamilies3 = useSelector((state) => state.sopIncomeDataGridReducer.workingForFamilies.amount3)

  const boarderIncome1 = useSelector((state) => state.sopIncomeDataGridReducer.boarderIncome.amount1)
  const boarderIncome2 = useSelector((state) => state.sopIncomeDataGridReducer.boarderIncome.amount2)
  const boarderIncome3 = useSelector((state) => state.sopIncomeDataGridReducer.boarderIncome.amount3)

  const onSubmitIncomeDetails = useSelector((state) => state.sopIncomeDataGridReducer.onSubmitIncomeDetails)

  const incomeItems = [
    {
      id: 1,
      title: 'Wages',
      groupBy: 'income',
      amount1: wagesAmt1,
      amount2: wagesAmt2,
      amount3: wagesAmt3,
      label: 'Wages',
      controlName: '',
      sovereignKey: 'WAGES',
      sovereignValue: 'Wages',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setWagesAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setWagesAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setWagesAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 2,
      title: 'Second Wage',
      groupBy: 'income',
      amount1: secondWages1,
      amount2: secondWages2,
      amount3: secondWages3,
      label: 'Second Wage',
      controlName: '',
      sovereignKey: 'OTHIN1',
      sovereignValue: 'Other Income',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setSecondWagesAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setSecondWagesAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setSecondWagesAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 3,
      title: 'WINZ Benefit',
      groupBy: 'income',
      amount1: winzBenefit1,
      amount2: winzBenefit2,
      amount3: winzBenefit3,
      label: 'WINZ Benefit',
      controlName: '',
      sovereignKey: 'BENFIT',
      sovereignValue: 'WINZ Benefit',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setWinzAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setWinzAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setWinzAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 4,
      title: 'Self Employed',
      groupBy: 'income',
      amount1: selfEmployed1,
      amount2: selfEmployed2,
      amount3: selfEmployed3,
      label: 'Self Employed',
      controlName: '',
      sovereignKey: 'SLFEMP',
      sovereignValue: 'Self Employed',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setSelfEmployedAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setSelfEmployedAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setSelfEmployedAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 5,
      title: 'NZ Superannuation',
      groupBy: 'income',
      amount1: nzSuper1,
      amount2: nzSuper2,
      amount3: nzSuper3,
      label: 'NZ Super',
      controlName: '',
      sovereignKey: 'SUPER',
      sovereignValue: 'Superannuation',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setNzSuperAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setNzSuperAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setNzSuperAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 6,
      title: 'Study Link',
      groupBy: 'income',
      amount1: studyLink1,
      amount2: studyLink2,
      amount3: studyLink3,
      label: 'Study Link',
      controlName: '',
      sovereignKey: 'STDYLK',
      sovereignValue: 'Study Link',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setStudyLinkAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setStudyLinkAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setStudyLinkAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 7,
      title: 'Rental Income',
      groupBy: 'income',
      amount1: rentalIncome1,
      amount2: rentalIncome2,
      amount3: rentalIncome3,
      label: 'Rental Income',
      controlName: '',
      sovereignKey: 'RENTAL',
      sovereignValue: 'Rental Income',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setRentalIncomeAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setRentalIncomeAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setRentalIncomeAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 8,
      title: 'Child Support',
      groupBy: 'income',
      amount1: childSupport1,
      amount2: childSupport2,
      amount3: childSupport3,
      label: 'Rental Income',
      controlName: '',
      sovereignKey: 'CHDSUP',
      sovereignValue: 'Child Support',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setChildSupportAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setChildSupportAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setChildSupportAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 9,
      title: 'Working for Families',
      groupBy: 'income',
      amount1: workingForFamilies1,
      amount2: workingForFamilies2,
      amount3: workingForFamilies3,
      label: 'Working for Families',
      controlName: '',
      sovereignKey: 'WKFAM',
      sovereignValue: 'Working for Families',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setWorkingForFamiliesAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setWorkingForFamiliesAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setWorkingForFamiliesAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 10,
      title: 'Boarder Income',
      groupBy: 'income',
      amount1: boarderIncome1,
      amount2: boarderIncome2,
      amount3: boarderIncome3,
      label: 'Boarder Income',
      sovereignKey: 'PYGBRD',
      sovereignValue: 'Boarder Income',
      callbackfnAmt1: (event) => {
        dispatch(sopIncomeGridSliceActions.setBoarderIncomeAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopIncomeGridSliceActions.setBoarderIncomeAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopIncomeGridSliceActions.setBoarderIncomeAmount3(parseFloat(event.target.value)))
      },
    },
  ]

  // Defualt Values for React Hook Form
  const defaultValues = {
    wagesAmt1: wagesAmt1,
    wagesAmt2: wagesAmt2,
    wagesAmt3: wagesAmt3,

    secondWages1: secondWages1,
    secondWages2: secondWages2,
    secondWages3: secondWages3,

    winzBenefit1: winzBenefit1,
    winzBenefit2: winzBenefit2,
    winzBenefit3: winzBenefit3,

    selfEmployed1: selfEmployed1,
    selfEmployed2: selfEmployed2,
    selfEmployed3: selfEmployed3,

    nzSuper1: nzSuper1,
    nzSuper2: nzSuper2,
    nzSuper3: nzSuper3,

    studyLink1: studyLink1,
    studyLink2: studyLink2,
    studyLink3: studyLink3,

    rentalIncome1: rentalIncome1,
    rentalIncome2: rentalIncome2,
    rentalIncome3: rentalIncome3,

    childSupport1: childSupport1,
    childSupport2: childSupport2,
    childSupport3: childSupport3,

    workingForFamilies1: workingForFamilies1,
    workingForFamilies2: workingForFamilies2,
    workingForFamilies3: workingForFamilies3,

    boarderIncome1: boarderIncome1,
    boarderIncome2: boarderIncome2,
    boarderIncome3: boarderIncome3,
  }

  // Schema
  // const IncomeSchema = Yup.object().shape({
  //   wagesAmt1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   wagesAmt2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   wagesAmt3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   secondWages1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   secondWages2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   secondWages3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   winzBenefit1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   winzBenefit2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   winzBenefit3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   selfEmployed1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   selfEmployed2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   selfEmployed3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   nzSuper1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   nzSuper2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   nzSuper3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   studyLink1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   studyLink2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   studyLink3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   rentalIncome1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   rentalIncome2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   rentalIncome3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   childSupport1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   childSupport2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   childSupport3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   workingForFamilies1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   workingForFamilies2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   workingForFamilies3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  //   boarderIncome1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   boarderIncome2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  //   boarderIncome3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  // })

  //UseForm Methods from RHF
  const methods = useForm({
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
    if (onSubmitIncomeDetails == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitIncomeDetails])

  useEffect(() => {
    dispatch(sopIncomeGridSliceActions.setIsValidIncomeDetails(isValid))
  }, [isValid])

  // dispatch(sopItemsActions.setSopIncome(incomeData))

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={5}>
          <Divider flexItem>
            <Chip label='Income' />
          </Divider>
          <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
            <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 150 }}>
              Income Item
            </Typography>
            <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 120 }}>
              Weekly
            </Typography>
            <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 120 }}>
              Fortnightly
            </Typography>
            <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 120 }}>
              Monthly
            </Typography>
          </Stack>
        </Stack>
        {incomeItems.map((incomeItem) => {
          return (
            <Box key={incomeItem?.id} sx={{ flexGrow: 1, py: 0.5 }}>
              <RHF_SOP_Input key={incomeItem?.id} name={incomeItem?.sovereignKey} itemNameLength={150} incomeItemName={incomeItem?.title} amount1={incomeItem?.amount1} amount2={incomeItem?.amount2} amount3={incomeItem?.amount3} onAmount1Change={incomeItem?.callbackfnAmt1} onAmount2Change={incomeItem?.callbackfnAmt2} onAmount3Change={incomeItem?.callbackfnAmt3} />
            </Box>
          )
        })}
      </FormProvider>
    </>
  )
}
