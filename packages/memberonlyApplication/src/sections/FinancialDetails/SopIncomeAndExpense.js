import React, { useEffect, useState } from 'react'

import RHFSOPIncome from '../../forms/FinancialDetails/RHFSOPIncome'
import RHFSOPExpense from '../../forms/FinancialDetails/RHFSOPExpense'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { getSopSummary } from '../../redux/slices/sopItemsSlice'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

//* MUI
import { Typography, Stack, Divider, Switch } from '@mui/material'

import SOPSummaryPortal from './SOPSummaryPortal'
import Expand from '../../components/ExpandMore'

const SopIncomeAndExpense = () => {
  const dispatch = useDispatch()

  const [showSummary, setShowSummary] = useState(true)

  //? Income

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

  const incomeItems = [
    {
      id: 1,
      title: 'Wages',
      groupBy: 'income',
      amount1: wagesAmt1,
      amount2: wagesAmt2,
      amount3: wagesAmt3,
      label: 'Wages',
      sovereignKey: 'WAGES',
      sovereignValue: 'Wages',
    },
    {
      id: 2,
      title: 'Second Wage',
      groupBy: 'income',
      amount1: secondWages1,
      amount2: secondWages2,
      amount3: secondWages3,
      label: 'Second Wage',
      sovereignKey: 'OTHIN1',
      sovereignValue: 'Other Income',
    },
    {
      id: 3,
      title: 'WINZ Benefit',
      groupBy: 'income',
      amount1: winzBenefit1,
      amount2: winzBenefit2,
      amount3: winzBenefit3,
      label: 'WINZ Benefit',
      sovereignKey: 'BENFIT',
      sovereignValue: 'WINZ Benefit',
    },
    {
      id: 4,
      title: 'Self Employed',
      groupBy: 'income',
      amount1: selfEmployed1,
      amount2: selfEmployed2,
      amount3: selfEmployed3,
      label: 'Self Employed',
      sovereignKey: 'SLFEMP',
      sovereignValue: 'Self Employed',
    },
    {
      id: 5,
      title: 'NZ Superannuation',
      groupBy: 'income',
      amount1: nzSuper1,
      amount2: nzSuper2,
      amount3: nzSuper3,
      label: 'NZ Super',
      sovereignKey: 'SUPER',
      sovereignValue: 'Superannuation',
    },
    {
      id: 6,
      title: 'Study Link',
      groupBy: 'income',
      amount1: studyLink1,
      amount2: studyLink2,
      amount3: studyLink3,
      label: 'Study Link',
      sovereignKey: 'STDYLK',
      sovereignValue: 'Study Link',
    },
    {
      id: 7,
      title: 'Rental Income',
      groupBy: 'income',
      amount1: rentalIncome1,
      amount2: rentalIncome2,
      amount3: rentalIncome3,
      label: 'Rental Income',
      sovereignKey: 'RENTAL',
      sovereignValue: 'Rental Income',
    },
    {
      id: 8,
      title: 'Child Support',
      groupBy: 'income',
      amount1: childSupport1,
      amount2: childSupport2,
      amount3: childSupport3,
      label: 'Rental Income',
      sovereignKey: 'CHDSUP',
      sovereignValue: 'Child Support',
    },
    {
      id: 9,
      title: 'Working for Families',
      groupBy: 'income',
      amount1: workingForFamilies1,
      amount2: workingForFamilies2,
      amount3: workingForFamilies3,
      label: 'Working for Families',
      sovereignKey: 'WKFAM',
      sovereignValue: 'Working for Families',
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
    },
  ]

  const incomeData = incomeItems?.map((incomeItem) => {
    if (!(incomeItem?.amount1 == null) || !(incomeItem?.amount2 == null) || !(incomeItem?.amount3 == null)) {
      return {
        type: incomeItem?.sovereignKey,
        amount1: incomeItem?.amount1 === null || incomeItem?.amount1 === undefined || incomeItem?.amount1 === NaN ? 0 : incomeItem?.amount1,
        amount2: incomeItem?.amount2 === null || incomeItem?.amount2 === undefined || incomeItem?.amount2 === NaN ? 0 : incomeItem?.amount2,
        amount3: incomeItem?.amount3 === null || incomeItem?.amount3 === undefined || incomeItem?.amount3 === NaN ? 0 : incomeItem?.amount3,
      }
    }
  })

  //? Expense

  const rentingBoarding1 = useSelector((state) => state.sopExpenseReducer.rentingBoarding.amount1)
  const rentingBoarding2 = useSelector((state) => state.sopExpenseReducer.rentingBoarding.amount2)
  const rentingBoarding3 = useSelector((state) => state.sopExpenseReducer.rentingBoarding.amount3)

  const liabilitiesServicing1 = useSelector((state) => state.sopExpenseReducer.liabilitiesServicing.amount1)
  const liabilitiesServicing2 = useSelector((state) => state.sopExpenseReducer.liabilitiesServicing.amount2)
  const liabilitiesServicing3 = useSelector((state) => state.sopExpenseReducer.liabilitiesServicing.amount3)

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

  const expenseItems = [
    {
      id: 1,
      title: 'Renting or Boarding',
      groupBy: 'expense',
      amount1: rentingBoarding1,
      amount2: rentingBoarding2,
      amount3: rentingBoarding3,
      label: 'Renting or Boarding',
      sovereignKey: 'RENTI',
      sovereignValue: 'Renting or Boarding',
    },
    {
      id: 2,
      title: 'Liabilities Servicing',
      groupBy: 'expense',
      amount1: liabilitiesServicing1,
      amount2: liabilitiesServicing2,
      amount3: liabilitiesServicing3,
      label: 'Liabilities Servicing',
      sovereignKey: 'LSERV',
      sovereignValue: 'Liabilities servicing',
    },
    {
      id: 3,
      title: 'Power or Gas',
      groupBy: 'expense',
      amount1: powerOrGas1,
      amount2: powerOrGas2,
      amount3: powerOrGas3,
      label: 'Power or Gas',
      sovereignKey: 'POWER',
      sovereignValue: 'Power or Gas',
    },
    {
      id: 4,
      title: 'Groceries',
      groupBy: 'expense',
      amount1: groceries1,
      amount2: groceries2,
      amount3: groceries3,
      label: 'Groceries',
      sovereignKey: 'GROCER',
      sovereignValue: 'Groceries',
    },
    {
      id: 5,
      title: 'Phone or Internet',
      groupBy: 'expense',
      amount1: phoneOrInternet1,
      amount2: phoneOrInternet2,
      amount3: phoneOrInternet3,
      label: 'Phone or Internet',
      sovereignKey: 'PHONE',
      sovereignValue: 'Phone or Internet',
    },
    {
      id: 6,
      title: 'Fuel',
      groupBy: 'expense',
      amount1: fuel1,
      amount2: fuel2,
      amount3: fuel3,
      label: 'Fuel',
      sovereignKey: 'FUEL',
      sovereignValue: 'Fuel',
    },
    {
      id: 7,
      title: 'S6 or Savings',
      groupBy: 'expense',
      amount1: s6_or_savings1,
      amount2: s6_or_savings2,
      amount3: s6_or_savings3,
      label: 'S6 or Savings',
      sovereignKey: 'S6',
      sovereignValue: 'S6 or Savings',
    },
    {
      id: 8,
      title: 'Wof and Registration',
      groupBy: 'expense',
      amount1: wof_rego1,
      amount2: wof_rego2,
      amount3: wof_rego3,
      label: 'Wof and Registration',
      sovereignKey: 'VEH',
      sovereignValue: 'Wof and Registration',
    },
    {
      id: 9,
      title: 'Clothing',
      groupBy: 'expense',
      amount1: clothing1,
      amount2: clothing2,
      amount3: clothing3,
      label: 'Clothing',
      sovereignKey: 'CLOTH',
      sovereignValue: 'Clothing',
    },
    {
      id: 10,
      title: 'Medical Expense',
      groupBy: 'expense',
      amount1: medicalExpense1,
      amount2: medicalExpense2,
      amount3: medicalExpense3,
      label: 'Medical Expense',
      sovereignKey: 'MEDC',
      sovereignValue: 'Medical Expense',
    },
    {
      id: 11,
      title: 'Gym',
      groupBy: 'expense',
      amount1: gym1,
      amount2: gym2,
      amount3: gym3,
      label: 'Gym',
      sovereignKey: 'GYM',
      sovereignValue: 'Gym',
    },
    {
      id: 12,
      title: 'Recreation',
      groupBy: 'expense',
      amount1: recreation1,
      amount2: recreation2,
      amount3: recreation3,
      label: 'Recreation',
      sovereignKey: 'RECR',
      sovereignValue: 'Recreation',
    },
    {
      id: 13,
      title: 'Tithing',
      groupBy: 'expense',
      amount1: tithing1,
      amount2: tithing2,
      amount3: tithing3,
      label: 'Tithing',
      sovereignKey: 'TITH',
      sovereignValue: 'Tithing',
    },
    {
      id: 14,
      title: 'Insurance',
      groupBy: 'expense',
      amount1: insurance1,
      amount2: insurance2,
      amount3: insurance3,
      label: 'Insurance',
      sovereignKey: 'INSURE',
      sovereignValue: 'Insurance',
    },
    {
      id: 15,
      title: 'Savings',
      amount1: savings1,
      amount2: savings2,
      amount3: savings3,
      label: 'Savings',
      sovereignKey: 'SAVG',
      sovereignValue: 'Savings',
    },
  ]

  const expenseData = expenseItems?.map((expenseItem) => {
    if (!(expenseItem?.amount1 == null) || !(expenseItem?.amount2 == null) || !(expenseItem?.amount3 == null)) {
      return {
        type: expenseItem?.sovereignKey,
        amount1: expenseItem?.amount1 === null || expenseItem?.amount1 === undefined || expenseItem?.amount1 === NaN ? 0 : expenseItem?.amount1,
        amount2: expenseItem?.amount2 === null || expenseItem?.amount2 === undefined || expenseItem?.amount2 === NaN ? 0 : expenseItem?.amount2,
        amount3: expenseItem?.amount3 === null || expenseItem?.amount3 === undefined || expenseItem?.amount3 === NaN ? 0 : expenseItem?.amount3,
      }
    }
  })

  const income = incomeData?.filter((data) => {
    return !(data == null)
  })

  const expense = expenseData?.filter((data) => {
    return !(data == null)
  })

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  return (
    <>
      <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ pb: 2 }}>
        <Stack direction='row' justifyContent='center' alignItems='center' spacing={5} sx={{ width: '100%' }}>
          <Typography
            variant='h4'
            color='primary'
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'light',
              letterSpacing: 3,
              pb: 3,
            }}
          >
            Income and Expenses
          </Typography>
          <Divider orientation='vertical' flexItem />
          <Stack>
            <Switch
              checked={showSummary}
              onChange={() => {
                setShowSummary(!showSummary)
              }}
              inputProps={{ 'aria-label': 'Summary' }}
            />
            <Typography variant='caption' color='secondary'>
              {showSummary ? 'Hide Summary' : 'Show Summary'}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction='row' justifyContent='center' alignItems='flex-start' spacing={7}>
          <RHFSOPIncome />
          <RHFSOPExpense />
        </Stack>
      </Stack>
      {showSummary && <SOPSummaryPortal />}
    </>
  )
}

export default SopIncomeAndExpense

// const homeAmt1 = useSelector((state) => state.sopAssetsReducer.home.amount1)
//   const homeAndContents1 = useSelector((state) => state.sopAssetsReducer.homeAndContents.amount1)
//   const vehicles1 = useSelector((state) => state.sopAssetsReducer.vehicles.amount1)
//   const boat1 = useSelector((state) => state.sopAssetsReducer.boat.amount1)
//   const assetsavings1 = useSelector((state) => state.sopAssetsReducer.savings.amount1)
//   const kiwisaver1 = useSelector((state) => state.sopAssetsReducer.kiwisaver.amount1)
//   const s61 = useSelector((state) => state.sopAssetsReducer.s6.amount1)

//   const assetItems = [
//     {
//       id: 1,
//       title: 'Home',
//       groupBy: 'asset',
//       amount1: homeAmt1,
//       label: 'Home',
//       sovereignKey: 'HOME',
//       sovereignValue: 'Home',
//       callbackfnAmt1: (event) => {
//         dispatch(sopAssetActions.sethomeAmount1(parseFloat(event.target.value)))
//       },
//     },
//     {
//       id: 2,
//       title: 'Home and Contents',
//       groupBy: 'asset',
//       amount1: homeAndContents1,
//       label: 'Home and Contents',
//       sovereignKey: 'HSHLDCNT',
//       sovereignValue: 'Household Contents',
//       callbackfnAmt1: (event) => {
//         dispatch(sopAssetActions.setHomeAndContentsAmount1(parseFloat(event.target.value)))
//       },
//     },
//     {
//       id: 3,
//       title: 'Vehicles',
//       groupBy: 'asset',
//       amount1: vehicles1,
//       label: 'Vehicles',
//       sovereignKey: 'MTRVHCAS',
//       sovereignValue: 'Motor Vehicle/s',
//       callbackfnAmt1: (event) => {
//         dispatch(sopAssetActions.setVehiclesAmount1(parseFloat(event.target.value)))
//       },
//     },
//     {
//       id: 4,
//       title: 'Boat',
//       groupBy: 'asset',
//       amount1: boat1,
//       label: 'Boat',
//       sovereignKey: 'BOAT',
//       sovereignValue: 'Boat',
//       callbackfnAmt1: (event) => {
//         dispatch(sopAssetActions.setBoatAmount1(parseFloat(event.target.value)))
//       },
//     },
//     {
//       id: 5,
//       title: 'Savings',
//       groupBy: 'asset',
//       amount1: assetsavings1,
//       label: 'Savings',
//       sovereignKey: 'SAVNG',
//       sovereignValue: 'Savings',
//       callbackfnAmt1: (event) => {
//         dispatch(sopAssetActions.setSavingsAmount1(parseFloat(event.target.value)))
//       },
//     },
//     {
//       id: 6,
//       title: 'Kiwi Saver',
//       groupBy: 'asset',
//       amount1: kiwisaver1,
//       label: 'Kiwi Saver',
//       sovereignKey: 'KIWISUPER',
//       sovereignValue: 'Kiwisaver/Superannuation',
//       callbackfnAmt1: (event) => {
//         dispatch(sopAssetActions.setKiwisaverAmount1(parseFloat(event.target.value)))
//       },
//     },
//     {
//       id: 7,
//       title: 'FCU Loan Provider',
//       groupBy: 'asset',
//       amount1: s61,
//       label: 'FCU Loan Provider',
//       sovereignKey: 'ACCNTS6',
//       sovereignValue: 'Bank Account S6',
//       callbackfnAmt1: (event) => {
//         dispatch(sopAssetActions.setS6Amount1(parseFloat(event.target.value)))
//       },
//     },
//   ]

//   const assetData = assetItems?.map((assetItem) => {
//     if (assetItem?.amount1 != null) {
//       return {
//         type: assetItem?.sovereignKey,
//         amount: assetItem?.amount1 == null ? 0 : assetItem?.amount1,
//       }
//     }
//   })

//   const mortgageConsolidate = useSelector((state) => state.sopLiabilitiesReducer.mortgage.consolidate)
//   const mortgageCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.mortgage.creditLimit)
//   const mortgageOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.mortgage.outstandingBalance)
//   const mortgageAmt1 = useSelector((state) => state.sopLiabilitiesReducer.mortgage.amount1)
//   const mortgageAmt2 = useSelector((state) => state.sopLiabilitiesReducer.mortgage.amount2)
//   const mortgageAmt3 = useSelector((state) => state.sopLiabilitiesReducer.mortgage.amount3)

//   const storecardConsolidate = useSelector((state) => state.sopLiabilitiesReducer.storecard.consolidate)
//   const storecardCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.storecard.creditLimit)
//   const storecardOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.storecard.outstandingBalance)
//   const storecard1 = useSelector((state) => state.sopLiabilitiesReducer.storecard.amount1)
//   const storecard2 = useSelector((state) => state.sopLiabilitiesReducer.storecard.amount2)
//   const storecard3 = useSelector((state) => state.sopLiabilitiesReducer.storecard.amount3)

//   const mastercardConsolidate = useSelector((state) => state.sopLiabilitiesReducer.mastercard.consolidate)
//   const mastercardCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.mastercard.creditLimit)
//   const mastercardOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.mastercard.outstandingBalance)
//   const mastercard1 = useSelector((state) => state.sopLiabilitiesReducer.mastercard.amount1)
//   const mastercard2 = useSelector((state) => state.sopLiabilitiesReducer.mastercard.amount2)
//   const mastercard3 = useSelector((state) => state.sopLiabilitiesReducer.mastercard.amount3)

//   const visaConsolidate = useSelector((state) => state.sopLiabilitiesReducer.visa.consolidate)
//   const visaCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.visa.creditLimit)
//   const visaOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.visa.outstandingBalance)
//   const visa1 = useSelector((state) => state.sopLiabilitiesReducer.visa.amount1)
//   const visa2 = useSelector((state) => state.sopLiabilitiesReducer.visa.amount2)
//   const visa3 = useSelector((state) => state.sopLiabilitiesReducer.visa.amount3)

//   const studentloanConsolidate = useSelector((state) => state.sopLiabilitiesReducer.studentloan.consolidate)
//   const studentloanCreditLimit = useSelector((state) => state.sopLiabilitiesReducer.studentloan.creditLimit)
//   const studentloanOutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.studentloan.outstandingBalance)
//   const studentloan1 = useSelector((state) => state.sopLiabilitiesReducer.studentloan.amount1)
//   const studentloan2 = useSelector((state) => state.sopLiabilitiesReducer.studentloan.amount2)
//   const studentloan3 = useSelector((state) => state.sopLiabilitiesReducer.studentloan.amount3)

//   const otherloan1Consolidate = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.consolidate)
//   const otherloan1CreditLimit = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.creditLimit)
//   const otherloan1OutstandingBalance = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.outstandingBalance)
//   const otherloan11 = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.amount1)
//   const otherloan12 = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.amount2)
//   const otherloan13 = useSelector((state) => state.sopLiabilitiesReducer.otherloan1.amount3)

//   const liabilityItems = [
//     {
//       id: 1,
//       title: 'Mortgage',
//       groupBy: 'liability',
//       consolidate: mortgageConsolidate,
//       creditLimit: mortgageCreditLimit,
//       outStandingBalance: mortgageOutstandingBalance,
//       amount1: mortgageAmt1,
//       amount2: mortgageAmt2,
//       amount3: mortgageAmt3,
//       label: 'Mortgage',
//       sovereignKey: '1STMORT',
//       sovereignValue: 'First Mortgage',
//     },
//     {
//       id: 2,
//       title: 'Storecard',
//       groupBy: 'liability',
//       consolidate: storecardConsolidate,
//       creditLimit: storecardCreditLimit,
//       outStandingBalance: storecardOutstandingBalance,
//       amount1: storecard1,
//       amount2: storecard2,
//       amount3: storecard3,
//       label: 'Storecard',
//       sovereignKey: 'SCRDHPUR',
//       sovereignValue: 'Store Cards/Hire Purchase',
//     },
//     {
//       id: 3,
//       title: 'Mastercard',
//       groupBy: 'liability',
//       consolidate: mastercardConsolidate,
//       creditLimit: mastercardCreditLimit,
//       outStandingBalance: mastercardOutstandingBalance,
//       amount1: mastercard1,
//       amount2: mastercard2,
//       amount3: mastercard3,
//       label: 'Mastercard',
//       sovereignKey: 'MSCARD',
//       sovereignValue: 'Mastercard',
//     },
//     {
//       id: 4,
//       title: 'Visa Card',
//       groupBy: 'liability',
//       consolidate: visaConsolidate,
//       creditLimit: visaCreditLimit,
//       outStandingBalance: visaOutstandingBalance,
//       amount1: visa1,
//       amount2: visa2,
//       amount3: visa3,
//       label: 'Visa Card',
//       sovereignKey: 'VISACARD',
//       sovereignValue: 'Visa Card',
//     },
//     {
//       id: 5,
//       title: 'Student Loan',
//       groupBy: 'liability',
//       consolidate: studentloanConsolidate,
//       creditLimit: studentloanCreditLimit,
//       outStandingBalance: studentloanOutstandingBalance,
//       amount1: studentloan1,
//       amount2: studentloan2,
//       amount3: studentloan3,
//       label: 'Student Loan',
//       sovereignKey: 'STUDENTLO',
//       sovereignValue: 'Student Loan',
//     },
//     {
//       id: 6,
//       title: 'Other Loan 1',
//       groupBy: 'liability',
//       consolidate: otherloan1Consolidate,
//       creditLimit: otherloan1CreditLimit,
//       outStandingBalance: otherloan1OutstandingBalance,
//       amount1: otherloan11,
//       amount2: otherloan12,
//       amount3: otherloan13,
//       label: 'Other Loan 1',
//       sovereignKey: 'OTHLOAN1',
//       sovereignValue: 'Other Loan 1',
//     },
//   ]

//   const liabilityData = liabilityItems?.map((liabilityItem) => {
//     if (liabilityItem?.amount1 != null || liabilityItem?.amount2 != null || liabilityItem?.amount3 != null) {
//       return {
//         type: liabilityItem?.sovereignKey,
//         creditLimit: liabilityItem?.creditLimit == null ? 0 : liabilityItem?.creditLimit,
//         outstanding: liabilityItem?.outStandingBalance == null ? 0 : liabilityItem?.outStandingBalance,
//         amount1: liabilityItem?.amount1 == null ? 0 : liabilityItem?.amount1,
//         amount2: liabilityItem?.amount2 == null ? 0 : liabilityItem?.amount2,
//         amount3: liabilityItem?.amount3 == null ? 0 : liabilityItem?.amount3,
//         consolidate: liabilityItem?.consolidate === true ? 'Y' : 'N',
//       }
//     }
//   })
