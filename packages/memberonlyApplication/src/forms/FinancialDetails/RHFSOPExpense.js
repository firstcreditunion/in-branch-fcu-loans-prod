import React, { useEffect } from 'react'

//* MUI
import { Stack, Typography, MenuItem, Divider, Box, Chip } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'

//* MUI Icons
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { sopExpenseAction } from '../../redux/slices/sopExpenseSlice'
import { sopItemsActions, getSopSummary } from '../../redux/slices/sopItemsSlice'

//* RHF And Yup
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* RHF Components
import FormProvider, { RHF_SOP_Input } from '../../components/RHF-mui-compoments'

export default function LoanDetails() {
  const dispatch = useDispatch()

  const rentingBoarding1 = useSelector((state) => state.sopExpenseReducer.rentingBoarding.amount1)
  const rentingBoarding2 = useSelector((state) => state.sopExpenseReducer.rentingBoarding.amount2)
  const rentingBoarding3 = useSelector((state) => state.sopExpenseReducer.rentingBoarding.amount3)

  const liabilitiesServicing1 = useSelector((state) => state.sopExpenseReducer.liabilitiesServicing.amount1)
  const liabilitiesServicing2 = useSelector((state) => state.sopExpenseReducer.liabilitiesServicing.amount2)
  const liabilitiesServicing3 = useSelector((state) => state.sopExpenseReducer.liabilitiesServicing.amount3)

  const proposedLoan1 = useSelector((state) => state.sopExpenseReducer.proposedLoan.amount1)
  const proposedLoan2 = useSelector((state) => state.sopExpenseReducer.proposedLoan.amount2)
  const proposedLoan3 = useSelector((state) => state.sopExpenseReducer.proposedLoan.amount3)

  const powerOrGas1 = useSelector((state) => state.sopExpenseReducer.powerOrGas.amount1)
  const powerOrGas2 = useSelector((state) => state.sopExpenseReducer.powerOrGas.amount2)
  const powerOrGas3 = useSelector((state) => state.sopExpenseReducer.powerOrGas.amount3)

  const groceries1 = useSelector((state) => state.sopExpenseReducer.groceries.amount1)
  const groceries2 = useSelector((state) => state.sopExpenseReducer.groceries.amount2)
  const groceries3 = useSelector((state) => state.sopExpenseReducer.groceries.amount3)

  const phoneOrInternet1 = useSelector((state) => state.sopExpenseReducer.phoneOrInternet.amount1)
  const phoneOrInternet2 = useSelector((state) => state.sopExpenseReducer.phoneOrInternet.amount2)
  const phoneOrInternet3 = useSelector((state) => state.sopExpenseReducer.phoneOrInternet.amount3)

  const fuel1 = useSelector((state) => state.sopExpenseReducer.fuel.amount1)
  const fuel2 = useSelector((state) => state.sopExpenseReducer.fuel.amount2)
  const fuel3 = useSelector((state) => state.sopExpenseReducer.fuel.amount3)

  const s6_or_savings1 = useSelector((state) => state.sopExpenseReducer.s6_or_savings.amount1)
  const s6_or_savings2 = useSelector((state) => state.sopExpenseReducer.s6_or_savings.amount2)
  const s6_or_savings3 = useSelector((state) => state.sopExpenseReducer.s6_or_savings.amount3)

  const wof_rego1 = useSelector((state) => state.sopExpenseReducer.wof_rego.amount1)
  const wof_rego2 = useSelector((state) => state.sopExpenseReducer.wof_rego.amount2)
  const wof_rego3 = useSelector((state) => state.sopExpenseReducer.wof_rego.amount3)

  const clothing1 = useSelector((state) => state.sopExpenseReducer.clothing.amount1)
  const clothing2 = useSelector((state) => state.sopExpenseReducer.clothing.amount2)
  const clothing3 = useSelector((state) => state.sopExpenseReducer.clothing.amount3)

  const medicalExpense1 = useSelector((state) => state.sopExpenseReducer.medicalExpense.amount1)
  const medicalExpense2 = useSelector((state) => state.sopExpenseReducer.medicalExpense.amount2)
  const medicalExpense3 = useSelector((state) => state.sopExpenseReducer.medicalExpense.amount3)

  const gym1 = useSelector((state) => state.sopExpenseReducer.gym.amount1)
  const gym2 = useSelector((state) => state.sopExpenseReducer.gym.amount2)
  const gym3 = useSelector((state) => state.sopExpenseReducer.gym.amount3)

  const recreation1 = useSelector((state) => state.sopExpenseReducer.recreation.amount1)
  const recreation2 = useSelector((state) => state.sopExpenseReducer.recreation.amount2)
  const recreation3 = useSelector((state) => state.sopExpenseReducer.recreation.amount3)

  const tithing1 = useSelector((state) => state.sopExpenseReducer.tithing.amount1)
  const tithing2 = useSelector((state) => state.sopExpenseReducer.tithing.amount2)
  const tithing3 = useSelector((state) => state.sopExpenseReducer.tithing.amount3)

  const insurance1 = useSelector((state) => state.sopExpenseReducer.insurance.amount1)
  const insurance2 = useSelector((state) => state.sopExpenseReducer.insurance.amount2)
  const insurance3 = useSelector((state) => state.sopExpenseReducer.insurance.amount3)

  const savings1 = useSelector((state) => state.sopExpenseReducer.savings.amount1)
  const savings2 = useSelector((state) => state.sopExpenseReducer.savings.amount2)
  const savings3 = useSelector((state) => state.sopExpenseReducer.savings.amount3)

  const onSubmitExpenseDetails = useSelector((state) => state.sopExpenseReducer.onSubmitExpenseDetails)

  const expenseItems = [
    {
      id: 1,
      title: 'Renting or Boarding',
      groupBy: 'expense',
      amount1: rentingBoarding1,
      amount2: rentingBoarding2,
      amount3: rentingBoarding3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Renting or Boarding',
      sovereignKey: 'RENTI',
      sovereignValue: 'Renting or Boarding',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setRentingBoardingAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setRentingBoardingAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setRentingBoardingAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 2,
      title: 'Liabilities Servicing',
      groupBy: 'expense',
      amount1: liabilitiesServicing1,
      amount2: liabilitiesServicing2,
      amount3: liabilitiesServicing3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Liabilities Servicing',
      sovereignKey: 'LSERV',
      sovereignValue: 'Liabilities servicing',
      callbackfnAmt1: (event) => {
        return dispatch(sopExpenseAction.setLiabilitiesServicingAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        return dispatch(sopExpenseAction.setLiabilitiesServicingAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        return dispatch(sopExpenseAction.setLiabilitiesServicingAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 3,
      title: 'Proposed Loan',
      groupBy: 'expense',
      amount1: proposedLoan1,
      amount2: proposedLoan2,
      amount3: proposedLoan3,
      amount1Disabled: true,
      amount2Disabled: true,
      amount3Disabled: true,
      label: 'Proposed Loan',
      sovereignKey: 'PLLOAN',
      sovereignValue: 'Proposed Loan',
      callbackfnAmt1: (event) => {
        return dispatch(sopExpenseAction.setProposedLoanAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        return dispatch(sopExpenseAction.setProposedLoanAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        return dispatch(sopExpenseAction.setProposedLoanAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 4,
      title: 'Power or Gas',
      groupBy: 'expense',
      amount1: powerOrGas1,
      amount2: powerOrGas2,
      amount3: powerOrGas3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Power or Gas',
      sovereignKey: 'POWER',
      sovereignValue: 'Power or Gas',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setPowerOrGasAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setPowerOrGasAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setPowerOrGasAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 5,
      title: 'Groceries',
      groupBy: 'expense',
      amount1: groceries1,
      amount2: groceries2,
      amount3: groceries3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Groceries',
      sovereignKey: 'GROCER',
      sovereignValue: 'Groceries',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setGroceriesAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setGroceriesAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setGroceriesAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 6,
      title: 'Phone or Internet',
      groupBy: 'expense',
      amount1: phoneOrInternet1,
      amount2: phoneOrInternet2,
      amount3: phoneOrInternet3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Phone or Internet',
      sovereignKey: 'PHONE',
      sovereignValue: 'Phone or Internet',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setphoneOrInternetAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setphoneOrInternetAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setphoneOrInternetAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 7,
      title: 'Fuel',
      groupBy: 'expense',
      amount1: fuel1,
      amount2: fuel2,
      amount3: fuel3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Fuel',
      sovereignKey: 'FUEL',
      sovereignValue: 'Fuel',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setFuelAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setFuelAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setFuelAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 8,
      title: 'S6 or Savings',
      groupBy: 'expense',
      amount1: s6_or_savings1,
      amount2: s6_or_savings2,
      amount3: s6_or_savings3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'S6 or Savings',
      sovereignKey: 'S6',
      sovereignValue: 'S6 or Savings',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setS6_or_savingsAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setS6_or_savingsAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setS6_or_savingsAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 9,
      title: 'Wof and Registration',
      groupBy: 'expense',
      amount1: wof_rego1,
      amount2: wof_rego2,
      amount3: wof_rego3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Wof and Registration',
      sovereignKey: 'VEH',
      sovereignValue: 'Wof and Registration',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setWof_regoAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setWof_regoAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setWof_regoAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 10,
      title: 'Clothing',
      groupBy: 'expense',
      amount1: clothing1,
      amount2: clothing2,
      amount3: clothing3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Clothing',
      sovereignKey: 'CLOTH',
      sovereignValue: 'Clothing',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setClothingAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setClothingAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setClothingAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 11,
      title: 'Medical Expense',
      groupBy: 'expense',
      amount1: medicalExpense1,
      amount2: medicalExpense2,
      amount3: medicalExpense3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Medical Expense',
      sovereignKey: 'MEDC',
      sovereignValue: 'Medical Expense',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setMedicalExpenseAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setMedicalExpenseAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setMedicalExpenseAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 12,
      title: 'Gym',
      groupBy: 'expense',
      amount1: gym1,
      amount2: gym2,
      amount3: gym3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Gym',
      sovereignKey: 'GYM',
      sovereignValue: 'Gym',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setGymAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setGymAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setGymAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 13,
      title: 'Recreation',
      groupBy: 'expense',
      amount1: recreation1,
      amount2: recreation2,
      amount3: recreation3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Recreation',
      sovereignKey: 'RECR',
      sovereignValue: 'Recreation',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setRecreationAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setRecreationAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setRecreationAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 14,
      title: 'Tithing',
      groupBy: 'expense',
      amount1: tithing1,
      amount2: tithing2,
      amount3: tithing3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Tithing',
      sovereignKey: 'TITH',
      sovereignValue: 'Tithing',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setTithingAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setTithingAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setTithingAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 15,
      title: 'Insurance',
      groupBy: 'expense',
      amount1: insurance1,
      amount2: insurance2,
      amount3: insurance3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Insurance',
      sovereignKey: 'INSURE',
      sovereignValue: 'Insurance',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setInsuranceAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setInsuranceAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setInsuranceAmount3(parseFloat(event.target.value)))
      },
    },
    {
      id: 16,
      title: 'Savings',
      groupBy: 'expense',
      amount1: savings1,
      amount2: savings2,
      amount3: savings3,
      amount1Disabled: false,
      amount2Disabled: false,
      amount3Disabled: false,
      label: 'Savings',
      sovereignKey: 'SAVG',
      sovereignValue: 'Savings',
      callbackfnAmt1: (event) => {
        dispatch(sopExpenseAction.setSavingsAmount1(parseFloat(event.target.value)))
      },
      callbackfnAmt2: (event) => {
        dispatch(sopExpenseAction.setSavingsAmount2(parseFloat(event.target.value)))
      },
      callbackfnAmt3: (event) => {
        dispatch(sopExpenseAction.setSavingsAmount3(parseFloat(event.target.value)))
      },
    },
  ]

  // Defualt Values for React Hook Form
  const defaultValues = {
    rentingBoarding1: rentingBoarding1,
    rentingBoarding2: rentingBoarding2,
    rentingBoarding3: rentingBoarding3,

    liabilitiesServicing1: liabilitiesServicing1,
    liabilitiesServicing2: liabilitiesServicing2,
    liabilitiesServicing3: liabilitiesServicing3,

    proposedLoan1: proposedLoan1,
    proposedLoan2: proposedLoan2,
    proposedLoan3: proposedLoan3,

    powerOrGas1: powerOrGas1,
    powerOrGas2: powerOrGas2,
    powerOrGas3: powerOrGas3,

    groceries1: groceries1,
    groceries2: groceries2,
    groceries3: groceries3,

    phoneOrInternet1: phoneOrInternet1,
    phoneOrInternet2: phoneOrInternet2,
    phoneOrInternet3: phoneOrInternet3,

    fuel1: fuel1,
    fuel2: fuel2,
    fuel3: fuel3,

    s6_or_savings1: s6_or_savings1,
    s6_or_savings2: s6_or_savings2,
    s6_or_savings3: s6_or_savings3,

    wof_rego1: wof_rego1,
    wof_rego2: wof_rego2,
    wof_rego3: wof_rego3,

    clothing1: clothing1,
    clothing2: clothing2,
    clothing3: clothing3,

    medicalExpense1: medicalExpense1,
    medicalExpense2: medicalExpense2,
    medicalExpense3: medicalExpense3,

    gym1: gym1,
    gym2: gym2,
    gym3: gym3,

    recreation1: recreation1,
    recreation2: recreation2,
    recreation3: recreation3,

    tithing1: tithing1,
    tithing2: tithing2,
    tithing3: tithing3,

    insurance1: insurance1,
    insurance2: insurance2,
    insurance3: insurance3,

    savings1: savings1,
    savings2: savings2,
    savings3: savings3,
  }

  // Schema
  const ExpenseSchema = Yup.object().shape({
    rentingBoarding1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    rentingBoarding2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    rentingBoarding3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    liabilitiesServicing1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    liabilitiesServicing2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    liabilitiesServicing3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    proposedLoan1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    proposedLoan2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    proposedLoan3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    powerOrGas1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    powerOrGas2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    powerOrGas3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    groceries1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    groceries2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    groceries3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    phoneOrInternet1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    phoneOrInternet2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    phoneOrInternet3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    fuel1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    fuel2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    fuel3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    s6_or_savings1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    s6_or_savings2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    s6_or_savings3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    wof_rego1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    wof_rego2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    wof_rego3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    clothing1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    clothing2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    clothing3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    medicalExpense1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    medicalExpense2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    medicalExpense3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    gym1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    gym2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    gym3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    recreation1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    recreation2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    recreation3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    tithing1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    tithing2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    tithing3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    insurance1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    insurance2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    insurance3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

    savings1: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    savings2: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
    savings3: Yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  })

  //UseForm Methods from RHF
  const methods = useForm({
    resolver: yupResolver(ExpenseSchema),
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
    if (onSubmitExpenseDetails == null) return

    handleSubmit(onSubmit())()
  }, [onSubmitExpenseDetails])

  useEffect(() => {
    dispatch(sopExpenseAction.setIsValidExpenseDetails(isValid))
  }, [isValid])

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction='column' justifyContent='flex-start' alignItems='center' spacing={5}>
          <Divider flexItem>
            <Chip label='Expense' />
          </Divider>
          <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={2}>
            <Typography variant='overline' color='secondary' sx={{ width: '100%', minWidth: 150 }}>
              Expense Items
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
        {expenseItems.map((expenseItem) => {
          return (
            <Box key={expenseItem?.id} sx={{ flexGrow: 1, py: 0.5 }}>
              <RHF_SOP_Input key={expenseItem?.id} name={expenseItem?.sovereignKey} itemNameLength={150} incomeItemName={expenseItem?.title} amount1={expenseItem?.amount1} disabled1={expenseItem?.amount1Disabled} amount2={expenseItem?.amount2} disabled2={expenseItem?.amount2Disabled} amount3={expenseItem?.amount3} disabled3={expenseItem?.amount3Disabled} onAmount1Change={expenseItem?.callbackfnAmt1} onAmount2Change={expenseItem?.callbackfnAmt2} onAmount3Change={expenseItem?.callbackfnAmt3} />
            </Box>
          )
        })}
      </FormProvider>
    </>
  )
}
