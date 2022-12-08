import React, { useEffect } from 'react'

import { motion, AnimatePresence } from 'framer-motion'
import { varFade } from '../../components/ui/animate'

// Yup
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { sopIncomeExpenditureActions } from '../../redux/slices/sopIncomeExpenditureSlice'

// Custom componenets for SOP
import SOPTextField from './SOP-userInterface/SopTextField'
import IncomeAutocomplete from './SOP-userInterface/IncomeAutocomplete'
import ExpenseAutocomplete from './SOP-userInterface/ExpenseAutocomplete'

// MUI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Chip, Divider } from '@mui/material'

// schema passed to React Hook Form
const schema = yup.object().shape({
  // Income
  income_wages1: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_wages2: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_winz: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_selfemploy: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_nzsuper: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_studylink: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_rentalincome: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_childsupport: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_workingforfamilies: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_broaderincome: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_otherincome1: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),
  income_otherincome2: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Value should be greater than $0.00').nullable(),

  // Expenses
  expense_RentingBoarding: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_S6_or_Savings: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Groceries: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Power_or_Gas: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Phone_or_Internet: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Fuel: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Wof_Rego: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Clothing: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_MedicalExpense: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Gym: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Recreation: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Tithing: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_Savings: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
  expense_otherExpense1: yup.number().typeError('Please remove non-numeric charaters').positive('Must be a greater than Zero').moreThan(0, 'Amount should be greater than $0.00').nullable(),
})

export default function SopIncomeExpenditure() {
  // State for Frequency Modal on SOP textfield
  const [open, setOpen] = React.useState(false)

  //***************** Income Selectors *********************/

  // Income and expenses Selected by user
  const checkedIncomeCodes = useSelector((state) => state.sopIncomeExpenditureReducer.checkedIncomeCodes)
  const checkedExpenseCodes = useSelector((state) => state.sopIncomeExpenditureReducer.checkedExpenseCodes)

  // Income objects from redux
  const income_wages1 = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_wages1)
  const income_wages2 = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_wages2)
  const income_winz = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_winz)
  const income_selfemploy = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_selfemploy)
  const income_nzsuper = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_nzsuper)
  const income_studylink = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_studylink)
  const income_rentalincome = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_rentalincome)
  const income_childsupport = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_childsupport)
  const income_workingforfamilies = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_workingforfamilies)
  const income_broaderincome = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_broaderincome)
  const income_otherincome1 = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_otherincome1)
  const income_otherincome2 = useSelector((state) => state.sopIncomeExpenditureReducer.income.income_otherincome2)

  //***************** Expense Selectors *********************/

  // Expense objects from redux
  const expense_RentingBoarding = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_RentingBoarding)
  // const expense_LiabilitiesServicing = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_LiabilitiesServicing)
  // const expense_ProposedLoan = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_ProposedLoan)
  const expense_S6_or_Savings = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_S6_or_Savings)
  const expense_Groceries = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Groceries)
  const expense_Power_or_Gas = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Power_or_Gas)
  const expense_Phone_or_Internet = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Phone_or_Internet)
  const expense_Fuel = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Fuel)
  const expense_Wof_Rego = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Wof_Rego)
  const expense_Clothing = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Clothing)
  const expense_MedicalExpense = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_MedicalExpense)
  const expense_Gym = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Gym)
  const expense_Recreation = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Recreation)
  const expense_Tithing = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Tithing)
  const expense_Savings = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_Savings)
  const expense_otherExpense1 = useSelector((state) => state.sopIncomeExpenditureReducer.expense.expense_otherExpense1)

  // Form submission
  const onSubmitSopIncomeExpenditure = useSelector((state) => state.sopIncomeExpenditureReducer.onSubmitSopIncomeExpenditure)

  //---------------- state to control dialog box for frequency

  const dispatch = useDispatch()

  // *********** Income dispatch ********** //

  // Autocomplete MUI to handle Income and Expense Types
  const handleIncomeTypeChange = (event, newValue) => {
    //Get Income Codes from autocomplete object in redux state
    const checkedIncomeCodesAutocomplete = newValue.map((income) => {
      return income.code
    })

    dispatch(sopIncomeExpenditureActions.setSelectedIncomeTypes(checkedIncomeCodesAutocomplete))
  }

  const handleExpenseTypeChange = (event, newValue) => {
    //Get Income Codes from autocomplete object in redux state
    const checkedExpenseCodesAutocomplete = newValue.map((expense) => {
      return expense.code
    })

    dispatch(sopIncomeExpenditureActions.setSelectedExpenseTypes(checkedExpenseCodesAutocomplete))
  }

  //--------------------------- Functions to handle SOP Income Textfield ----------------------------------- //

  // Wage 1
  const handleIncomeWages1Amount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeWages1Amount(parseInt(event.target.value) - 0))
  }
  const handleIncomeWages1Frequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeWages1Frequency(event.target.value))
  }

  // Wage 2
  const handleIncomeWages2Amount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeWages2Amount(parseInt(event.target.value) - 0))
  }
  const handleIncomeWages2Frequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeWages2Frequency(event.target.value))
  }

  // Winz
  const handleIncomeWinzAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeWinzAmount(parseInt(event.target.value) - 0))
  }
  const handleIncomeWinzFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeWinzFrequency(event.target.value))
  }

  //Self Employ
  const handleIncomeSelfEmployAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeSelfEmployAmount(parseInt(event.target.value) - 0))
  }
  const handleIncomeSelfEmployFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeSelfEmployFrequency(event.target.value))
  }

  //NZ Super
  const handleIncomeNzSuperAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeNzSuperAmount(parseInt(event.target.value) - 0))
  }
  const handleIncomeNzSuperFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeNzSuperFrequency(event.target.value))
  }

  //Study Link
  const handleIncomeStudyLinkAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeStudyLinkAmount(parseInt(event.target.value) - 0))
  }
  const handleIncomeStudyLinkFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeStudyLinkFrequency(event.target.value))
  }

  //Rental Income
  const handleRentalIncomeAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeRentalIncomeAmount(parseInt(event.target.value) - 0))
  }
  const handleRentalIncomeFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeRentalIncomeFrequency(event.target.value))
  }

  //Child Support
  const handleIncomeChildSupportAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeChildSupportAmount(parseInt(event.target.value) - 0))
  }
  const handleIncomeChildSupportFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeChildSupportFrequency(event.target.value))
  }

  //Working For Families
  const handleIncomeWorkingForFamiliesAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeWorkingForFamiliesAmount(parseInt(event.target.value) - 0))
  }
  const handleIncomeWorkingForFamiliesFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeWorkingForFamiliesFrequency(event.target.value))
  }

  //Broader Income
  const handleBroaderIncomeAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeBroaderIncomeAmount(parseInt(event.target.value) - 0))
  }
  const handleBroaderIncomeFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeBroaderIncomeFrequency(event.target.value))
  }

  //Other Income 1
  const handleOtherIncome1Amount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeOtherIncome1Amount(parseInt(event.target.value) - 0))
  }
  const handleOtherIncome1Frequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeOtherIncome1Frequency(event.target.value))
  }

  // Other Income 2
  const handleOtherIncome2Amount = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeOtherIncome2Amount(parseInt(event.target.value) - 0))
  }
  const handleOtherIncome2Frequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setIncomeOtherIncome2Frequency(event.target.value))
  }
  // -------------- End of Income dispatch ----------------- //

  //***************** Expense Disptach *********************/

  //--------------------------- Functions to handle SOP Expense Textfield ----------------------------------- //

  // Rent and Board
  const handleExpenseRentBoardAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseRentBoardAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseRentBoardFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseRentBoardFrequency(event.target.value))
  }

  // Liabilities Servicing
  // const handleExpenseLiabilitiesServicingAmount = (event) => {
  //   dispatch(sopIncomeExpenditureActions.setExpenseLiabilitiesServicingAmount(parseInt(event.target.value) - 0))
  // }
  // const handleExpenseLiabilitiesServicingFrequency = (event) => {
  //   dispatch(sopIncomeExpenditureActions.setExpenseLiabilitiesServicingFrequency(event.target.value))
  // }

  // Proposed loan
  // const handleExpenseProposedLoanAmount = (event) => {
  //   dispatch(sopIncomeExpenditureActions.setExpenseProposedLoanAmount(parseInt(event.target.value) - 0))
  // }
  // const handleExpenseProposedLoanFrequency = (event) => {
  //   dispatch(sopIncomeExpenditureActions.setExpenseProposedLoanFrequency(event.target.value))
  // }

  // S6 Savings
  const handleExpenseS6_SavingsAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseS6_SavingsAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseS6_SavingsFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseS6_SavingsFrequency(event.target.value))
  }

  // Groceries
  const handleExpenseGroceriesAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseGroceriesAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseGroceriesFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseGroceriesFrequency(event.target.value))
  }

  //Power and Gas
  const handleExpensePower_GasAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpensePower_GasAmount(parseInt(event.target.value) - 0))
  }
  const handleExpensePower_GasFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpensePower_GasFrequency(event.target.value))
  }

  //Phone and Internet
  const handleExpensePhone_InternetAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpensePhone_InternetAmount(parseInt(event.target.value) - 0))
  }
  const handleExpensePhone_InternetFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpensePhone_InternetFrequency(event.target.value))
  }

  //Fuel
  const handleExpenseFuelAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseFuelAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseFuelFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseFuelFrequency(event.target.value))
  }

  //Wof and Rego
  const handleExpenseWof_RegoAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseWof_RegoAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseWof_RegoFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseWof_RegoFrequency(event.target.value))
  }

  //Clothing
  const handleExpenseClothingAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseClothingAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseClothingFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseClothingFrequency(event.target.value))
  }

  //Medical Expense
  const handleExpenseMedicalExpenseAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseMedicalExpenseAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseMedicalExpenseFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseMedicalExpenseFrequency(event.target.value))
  }

  //Gym
  const handleExpenseGymAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseGymAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseGymFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseGymFrequency(event.target.value))
  }

  //Recreation
  const handleExpenseRecreationAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseRecreationAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseRecreationFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseRecreationFrequency(event.target.value))
  }

  //Tithing
  const handleExpenseTithingAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseTithingAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseTithingFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseTithingFrequency(event.target.value))
  }

  //Savings
  const handleExpenseSavingsAmount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseSavingsAmount(parseInt(event.target.value) - 0))
  }
  const handleExpenseSavingsFrequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseSavingsFrequency(event.target.value))
  }

  //Other Expense 1
  const handleExpenseOtherExpense1Amount = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseOtherExpense1Amount(parseInt(event.target.value) - 0))
  }
  const handleExpenseOtherExpense1Frequency = (event) => {
    dispatch(sopIncomeExpenditureActions.setExpenseOtherExpense1Frequency(event.target.value))
  }

  // -------------- End of Expense dispatch ----------------- //

  // Media Queries
  const downlg = useMediaQuery((theme) => theme.breakpoints.down('lg'))
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  // React-Hook-Form
  const {
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: {
      income_wages1: income_wages1.amount,
      income_wages2: income_wages2.amount,
      income_winz: income_winz.amount,
      income_selfemploy: income_selfemploy.amount,
      income_nzsuper: income_nzsuper.amount,
      income_studylink: income_studylink.amount,
      income_rentalincome: income_rentalincome.amount,
      income_childsupport: income_childsupport.amount,
      income_workingforfamilies: income_workingforfamilies.amount,
      income_broaderincome: income_broaderincome.amount,
      income_otherincome1: income_otherincome1.amount,
      income_otherincome2: income_otherincome2.amount,

      expense_RentingBoarding: expense_RentingBoarding.amount,
      expense_S6_or_Savings: expense_S6_or_Savings.amount,
      expense_Groceries: expense_Groceries.amount,
      expense_Power_or_Gas: expense_Power_or_Gas.amount,
      expense_Phone_or_Internet: expense_Phone_or_Internet.amount,
      expense_Fuel: expense_Fuel.amount,
      expense_Wof_Rego: expense_Wof_Rego.amount,
      expense_Clothing: expense_Clothing.amount,
      expense_MedicalExpense: expense_MedicalExpense.amount,
      expense_Gym: expense_Gym.amount,
      expense_Recreation: expense_Recreation.amount,
      expense_Tithing: expense_Tithing.amount,
      expense_Savings: expense_Savings.amount,
      expense_otherExpense1: expense_otherExpense1.amount,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    dispatch(sopIncomeExpenditureActions.setIsValidSopIncomeExpenditureDetails(isValid))
  }, [isValid])

  useEffect(() => {
    if (onSubmitSopIncomeExpenditure != null) {
      handleSubmit(onSubmit())()
      return
    }
  }, [onSubmitSopIncomeExpenditure])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  function onSubmit() {
    console.log('Income and Expenditure Submitted')
  }

  // Framer Motion for Income SOP text fields
  const varWage1 = checkedIncomeCodes.includes('WGE1')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varWage2 = checkedIncomeCodes.includes('WGE2')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varWinz = checkedIncomeCodes.includes('WINZ')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varSelfEmploy = checkedIncomeCodes.includes('SELF')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varNzSuper = checkedIncomeCodes.includes('SUPR')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varStudyLink = checkedIncomeCodes.includes('STLNK')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varRentalIncome = checkedIncomeCodes.includes('RNTI')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varChildSupport = checkedIncomeCodes.includes('CHSP')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varWorkingForFam = checkedIncomeCodes.includes('WKFM')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varBroaderIncome1 = checkedIncomeCodes.includes('BRINC')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varOtherIncome1 = checkedIncomeCodes.includes('OTH1')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  const varOtherIncome2 = checkedIncomeCodes.includes('OTH2')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  // Framaer Motion for Expense SOP text fields

  const varRentBoard = checkedExpenseCodes.includes('ERTBR')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  // const varLiabilitySer = checkedExpenseCodes.includes('ELSR')
  //   ? varFade({
  //       distance: 100,
  //       durationIn: 0.32,
  //       durationOut: 0.32,
  //     }).inRight
  //   : varFade({
  //       distance: 100,
  //       durationIn: 0.32,
  //       durationOut: 0.32,
  //     }).outRight
  // const varProposedLoan = checkedExpenseCodes.includes('EPLN')
  //   ? varFade({
  //       distance: 100,
  //       durationIn: 0.32,
  //       durationOut: 0.32,
  //     }).inRight
  //   : varFade({
  //       distance: 100,
  //       durationIn: 0.32,
  //       durationOut: 0.32,
  //     }).outRight
  const varS6_Savings = checkedExpenseCodes.includes('ESVG')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varGroceries = checkedExpenseCodes.includes('EGRC')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varPowerGas = checkedExpenseCodes.includes('EPG')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varPhoneInternet = checkedExpenseCodes.includes('EPHO')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varFuel = checkedExpenseCodes.includes('EFUL')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varWofRego = checkedExpenseCodes.includes('EWRG')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varClothing = checkedExpenseCodes.includes('ECLO')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varMedical = checkedExpenseCodes.includes('EMED')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varGym = checkedExpenseCodes.includes('EGYM')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varRecreation = checkedExpenseCodes.includes('ERCR')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varTithing = checkedExpenseCodes.includes('ETITH')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varSavings = checkedExpenseCodes.includes('ESAV')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight
  const varOtherExpense1 = checkedExpenseCodes.includes('OTHEX1')
    ? varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).inRight
    : varFade({
        distance: 100,
        durationIn: 0.32,
        durationOut: 0.32,
      }).outRight

  //JSX
  return (
    <Box sx={{ px: 0, height: '100%' }}>
      {/* <LabelStyle>Please fill in the table below and select the appropriate option to show how often you are paid/pay each item.</LabelStyle> */}
      <Stack direction={downMd ? 'column' : 'row'} justifyContent='space-evenly' alignItems='center' spacing={4} sx={{ height: '100%' }}>
        <Card sx={{ width: downMd ? '100%' : '50%', height: '100%', px: downSm ? 0 : 5, pb: 3, boxShadow: (theme) => theme.customShadows.dropdwon }}>
          <CardHeader title='Your Income' subheader='' />
          <CardContent sx={{ p: downSm ? 1 : 2 }}>
            <Stack direction='column' spacing={2} justifyContent='flex-start' alignItems='stretch'>
              <IncomeAutocomplete name='incometypes' control={control} onIncomeChange={handleIncomeTypeChange} helperTextInput='Choose all your income types' />
              {checkedIncomeCodes.length > 0 && (
                <Divider sx={{ pb: 2 }}>
                  <Chip label={<Typography sx={{ fontSize: 11 }}>How much do you earn?</Typography>} />
                </Divider>
              )}
              <AnimatePresence>
                {checkedIncomeCodes.includes('WGE1') && (
                  <motion.div {...varWage1}>
                    <SOPTextField control={control} name='income_wages1' label={income_wages1.label} frequencyUnit={income_wages1.frequency.unit} dialogContentText={income_wages1.frequency.dialogTitleText} onSopTextFieldChange={handleIncomeWages1Amount} frequencyChange={handleIncomeWages1Frequency} radioValue={income_wages1.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('WGE2') && (
                  <motion.div {...varWage2}>
                    <SOPTextField control={control} name='income_wages2' label={income_wages2.label} frequencyUnit={income_wages2.frequency.unit} dialogContentText={income_wages2.frequency.dialogTitleText} onSopTextFieldChange={handleIncomeWages2Amount} frequencyChange={handleIncomeWages2Frequency} radioValue={income_wages2.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('WINZ') && (
                  <motion.div {...varWinz}>
                    <SOPTextField control={control} name='income_winz' label={income_winz.label} frequencyUnit={income_winz.frequency.unit} dialogContentText={income_winz.frequency.dialogTitleText} onSopTextFieldChange={handleIncomeWinzAmount} frequencyChange={handleIncomeWinzFrequency} radioValue={income_winz.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('SELF') && (
                  <motion.div {...varSelfEmploy}>
                    <SOPTextField control={control} name='income_selfemploy' label={income_selfemploy.label} frequencyUnit={income_selfemploy.frequency.unit} dialogContentText={income_selfemploy.frequency.dialogTitleText} onSopTextFieldChange={handleIncomeSelfEmployAmount} frequencyChange={handleIncomeSelfEmployFrequency} radioValue={income_selfemploy.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('SUPR') && (
                  <motion.div {...varNzSuper}>
                    <SOPTextField control={control} name='income_nzsuper' label={income_nzsuper.label} frequencyUnit={income_nzsuper.frequency.unit} dialogContentText={income_nzsuper.frequency.dialogTitleText} onSopTextFieldChange={handleIncomeNzSuperAmount} frequencyChange={handleIncomeNzSuperFrequency} radioValue={income_nzsuper.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('STLNK') && (
                  <motion.div {...varStudyLink}>
                    <SOPTextField control={control} name='income_studylink' label={income_studylink.label} frequencyUnit={income_studylink.frequency.unit} dialogContentText={income_studylink.frequency.dialogTitleText} onSopTextFieldChange={handleIncomeStudyLinkAmount} frequencyChange={handleIncomeStudyLinkFrequency} radioValue={income_studylink.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('RNTI') && (
                  <motion.div {...varRentalIncome}>
                    <SOPTextField control={control} name='income_rentalincome' label={income_rentalincome.label} frequencyUnit={income_rentalincome.frequency.unit} dialogContentText={income_rentalincome.frequency.dialogTitleText} onSopTextFieldChange={handleRentalIncomeAmount} frequencyChange={handleRentalIncomeFrequency} radioValue={income_rentalincome.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('CHSP') && (
                  <motion.div {...varChildSupport}>
                    <SOPTextField control={control} name='income_childsupport' label={income_childsupport.label} frequencyUnit={income_childsupport.frequency.unit} dialogContentText={income_childsupport.frequency.dialogTitleText} onSopTextFieldChange={handleIncomeChildSupportAmount} frequencyChange={handleIncomeChildSupportFrequency} radioValue={income_childsupport.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('WKFM') && (
                  <motion.div {...varWorkingForFam}>
                    <SOPTextField control={control} name='income_workingforfamilies' label={income_workingforfamilies.label} frequencyUnit={income_workingforfamilies.frequency.unit} dialogContentText={income_workingforfamilies.frequency.dialogTitleText} onSopTextFieldChange={handleIncomeWorkingForFamiliesAmount} frequencyChange={handleIncomeWorkingForFamiliesFrequency} radioValue={income_workingforfamilies.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('BRINC') && (
                  <motion.div {...varBroaderIncome1}>
                    <SOPTextField control={control} name='income_broaderincome' label={income_broaderincome.label} frequencyUnit={income_broaderincome.frequency.unit} dialogContentText={income_broaderincome.frequency.dialogTitleText} onSopTextFieldChange={handleBroaderIncomeAmount} frequencyChange={handleBroaderIncomeFrequency} radioValue={income_broaderincome.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('OTH1') && (
                  <motion.div {...varOtherIncome1}>
                    <SOPTextField control={control} name='income_otherincome1' label={income_otherincome1.label} frequencyUnit={income_otherincome1.frequency.unit} dialogContentText={income_otherincome1.frequency.dialogTitleText} onSopTextFieldChange={handleOtherIncome1Amount} frequencyChange={handleOtherIncome1Frequency} radioValue={income_otherincome1.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedIncomeCodes.includes('OTH2') && (
                  <motion.div {...varOtherIncome2}>
                    <SOPTextField control={control} name='income_otherincome2' label={income_otherincome2.label} frequencyUnit={income_otherincome2.frequency.unit} dialogContentText={income_otherincome2.frequency.dialogTitleText} onSopTextFieldChange={handleOtherIncome2Amount} frequencyChange={handleOtherIncome2Frequency} radioValue={income_otherincome2.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{ width: downMd ? '100%' : '50%', height: '100%', px: downSm ? 0 : 5, pb: 3, boxShadow: (theme) => theme.customShadows.dropdwon }}>
          <CardHeader title='Your Expenses' subheader='' />
          <CardContent sx={{ p: downSm ? 1 : 2 }}>
            <Stack direction='column' spacing={2} justifyContent='flex-start' alignItems='stretch'>
              <ExpenseAutocomplete name='expensetypes' control={control} onExpenseChange={handleExpenseTypeChange} helperTextInput='Choose all your expense types' />
              {checkedExpenseCodes.length > 0 && (
                <Divider sx={{ pb: 2 }}>
                  <Chip label={<Typography sx={{ fontSize: 11 }}>How much do you spend?</Typography>} />
                </Divider>
              )}
              <AnimatePresence>
                {checkedExpenseCodes.includes('ERTBR') && (
                  <motion.div {...varRentBoard}>
                    <SOPTextField control={control} name='expense_RentingBoarding' label={expense_RentingBoarding.label} frequencyUnit={expense_RentingBoarding.frequency.unit} dialogContentText={expense_RentingBoarding.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseRentBoardAmount} frequencyChange={handleExpenseRentBoardFrequency} radioValue={expense_RentingBoarding.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('EPG') && (
                  <motion.div {...varPowerGas}>
                    <SOPTextField control={control} name='expense_Power_or_Gas' label={expense_Power_or_Gas.label} frequencyUnit={expense_Power_or_Gas.frequency.unit} dialogContentText={expense_Power_or_Gas.frequency.dialogTitleText} onSopTextFieldChange={handleExpensePower_GasAmount} frequencyChange={handleExpensePower_GasFrequency} radioValue={expense_Power_or_Gas.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('EGRC') && (
                  <motion.div {...varGroceries}>
                    <SOPTextField control={control} name='expense_Groceries' label={expense_Groceries.label} frequencyUnit={expense_Groceries.frequency.unit} dialogContentText={expense_Groceries.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseGroceriesAmount} frequencyChange={handleExpenseGroceriesFrequency} radioValue={expense_Groceries.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('EPHO') && (
                  <motion.div {...varPhoneInternet}>
                    <SOPTextField control={control} name='expense_Phone_or_Internet' label={expense_Phone_or_Internet.label} frequencyUnit={expense_Phone_or_Internet.frequency.unit} dialogContentText={expense_Phone_or_Internet.frequency.dialogTitleText} onSopTextFieldChange={handleExpensePhone_InternetAmount} frequencyChange={handleExpensePhone_InternetFrequency} radioValue={expense_Phone_or_Internet.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              {/* <AnimatePresence>
                {checkedExpenseCodes.includes('ELSR') && (
                  <motion.div {...varLiabilitySer}>
                    <SOPTextField control={control} name='expense_LiabilitiesServicing' label={expense_LiabilitiesServicing.label} frequencyUnit={expense_LiabilitiesServicing.frequency.unit} dialogContentText={expense_LiabilitiesServicing.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseLiabilitiesServicingAmount} frequencyChange={handleExpenseLiabilitiesServicingFrequency} radioValue={expense_LiabilitiesServicing.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence> */}
              {/* <AnimatePresence>
                {checkedExpenseCodes.includes('EPLN') && (
                  <motion.div {...varProposedLoan}>
                    <SOPTextField control={control} name='expense_ProposedLoan' label={expense_ProposedLoan.label} frequencyUnit={expense_ProposedLoan.frequency.unit} dialogContentText={expense_ProposedLoan.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseProposedLoanAmount} frequencyChange={handleExpenseProposedLoanFrequency} radioValue={expense_ProposedLoan.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence> */}
              <AnimatePresence>
                {checkedExpenseCodes.includes('ESVG') && (
                  <motion.div {...varS6_Savings}>
                    <SOPTextField control={control} name='expense_S6_or_Savings' label={expense_S6_or_Savings.label} frequencyUnit={expense_S6_or_Savings.frequency.unit} dialogContentText={expense_S6_or_Savings.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseS6_SavingsAmount} frequencyChange={handleExpenseS6_SavingsFrequency} radioValue={expense_S6_or_Savings.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {checkedExpenseCodes.includes('EFUL') && (
                  <motion.div {...varFuel}>
                    <SOPTextField control={control} name='expense_Fuel' label={expense_Fuel.label} frequencyUnit={expense_Fuel.frequency.unit} dialogContentText={expense_Fuel.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseFuelAmount} frequencyChange={handleExpenseFuelFrequency} radioValue={expense_Fuel.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('EWRG') && (
                  <motion.div {...varWofRego}>
                    <SOPTextField control={control} name='expense_Wof_Rego' label={expense_Wof_Rego.label} frequencyUnit={expense_Wof_Rego.frequency.unit} dialogContentText={expense_Wof_Rego.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseWof_RegoAmount} frequencyChange={handleExpenseWof_RegoFrequency} radioValue={expense_Wof_Rego.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('ECLO') && (
                  <motion.div {...varClothing}>
                    <SOPTextField control={control} name='expense_Clothing' label={expense_Clothing.label} frequencyUnit={expense_Clothing.frequency.unit} dialogContentText={expense_Clothing.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseClothingAmount} frequencyChange={handleExpenseClothingFrequency} radioValue={expense_Clothing.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('EMED') && (
                  <motion.div {...varMedical}>
                    <SOPTextField control={control} name='expense_MedicalExpense' label={expense_MedicalExpense.label} frequencyUnit={expense_MedicalExpense.frequency.unit} dialogContentText={expense_MedicalExpense.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseMedicalExpenseAmount} frequencyChange={handleExpenseMedicalExpenseFrequency} radioValue={expense_MedicalExpense.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('EGYM') && (
                  <motion.div {...varGym}>
                    <SOPTextField control={control} name='expense_Gym' label={expense_Gym.label} frequencyUnit={expense_Gym.frequency.unit} dialogContentText={expense_Gym.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseGymAmount} frequencyChange={handleExpenseGymFrequency} radioValue={expense_Gym.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('ERCR') && (
                  <motion.div {...varRecreation}>
                    <SOPTextField control={control} name='expense_Recreation' label={expense_Recreation.label} frequencyUnit={expense_Recreation.frequency.unit} dialogContentText={expense_Recreation.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseRecreationAmount} frequencyChange={handleExpenseRecreationFrequency} radioValue={expense_Recreation.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('ETITH') && (
                  <motion.div {...varTithing}>
                    <SOPTextField control={control} name='expense_Tithing' label={expense_Tithing.label} frequencyUnit={expense_Tithing.frequency.unit} dialogContentText={expense_Tithing.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseTithingAmount} frequencyChange={handleExpenseTithingFrequency} radioValue={expense_Tithing.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('ESAV') && (
                  <motion.div {...varSavings}>
                    <SOPTextField control={control} name='expense_Savings' label={expense_Savings.label} frequencyUnit={expense_Savings.frequency.unit} dialogContentText={expense_Savings.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseSavingsAmount} frequencyChange={handleExpenseSavingsFrequency} radioValue={expense_Savings.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {checkedExpenseCodes.includes('OTHEX1') && (
                  <motion.div {...varOtherExpense1}>
                    <SOPTextField control={control} name='expense_otherExpense1' label={expense_otherExpense1.label} frequencyUnit={expense_otherExpense1.frequency.unit} dialogContentText={expense_otherExpense1.frequency.dialogTitleText} onSopTextFieldChange={handleExpenseOtherExpense1Amount} frequencyChange={handleExpenseOtherExpense1Frequency} radioValue={expense_otherExpense1.frequency.unit} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
