import React from 'react'

//* Redux
import { useSelector, useDispatch } from 'react-redux'

//* MUI
import { useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Portal from '@mui/material/Portal'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

import WarningIcon from '@mui/icons-material/Warning'
import CheckIcon from '@mui/icons-material/Check'
import ErrorIcon from '@mui/icons-material/Error'

// Custom Theme Manipulation
import { bgBlur } from '../../theme/customCSS'

import useResponsive from '../../hooks/useResponsive'

import { fCurrency, fNumberCust } from '../../utils/formatNumber'

import { sopItemsActions, getSopSummary } from '../../redux/slices/sopItemsSlice'

//* API Utils
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../../redux/utils/apiConstants'

export default function PreviewSOPSummaryPortal() {
  const dispatch = useDispatch()

  const theme = useTheme()

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

  //? Expense

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
      title: 'Proposed Loan',
      groupBy: 'expense',
      amount1: proposedLoan1,
      amount2: proposedLoan2,
      amount3: proposedLoan3,
      label: 'Proposed Loan',
      sovereignKey: 'PLLOAN',
      sovereignValue: 'Proposed Loan',
    },
    {
      id: 4,
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
      id: 5,
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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
      id: 11,
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
      id: 12,
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
      id: 13,
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
      id: 14,
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
      id: 15,
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
      id: 16,
      title: 'Savings',
      amount1: savings1,
      amount2: savings2,
      amount3: savings3,
      label: 'Savings',
      sovereignKey: 'SAVG',
      sovereignValue: 'Savings',
    },
  ]

  const actualLivingExpense = useSelector((state) => state.sopItemsReducer.actualLivingExpense)
  const actualMonthlyCommitments = useSelector((state) => state.sopItemsReducer.actualMonthlyCommitments)
  const benchmarkableCCCFAExpense = useSelector((state) => state.sopItemsReducer.benchmarkableCCCFAExpense)
  const monthlyExpense = useSelector((state) => state.sopItemsReducer.monthlyExpense)
  const monthlyIncome = useSelector((state) => state.sopItemsReducer.monthlyIncome)
  const surplusRatio = useSelector((state) => state.sopItemsReducer.surplusRatio)
  const nsr = useSelector((state) => state.sopItemsReducer.nsr)
  const nsrLower = useSelector((state) => state.sopItemsReducer.nsrLower)
  const nsrUpper = useSelector((state) => state.sopItemsReducer.nsrUpper)
  const netAssets = useSelector((state) => state.sopItemsReducer.netAssets)
  const totalAssets = useSelector((state) => state.sopItemsReducer.totalAssets)
  const totalLiabilities = useSelector((state) => state.sopItemsReducer.totalLiabilities)
  const monthlySurplus = useSelector((state) => state.sopItemsReducer.monthlySurplus)

  const isGreaterThanOrEqualToOne = surplusRatio >= 1.0

  async function calculateMonthlySurplus() {
    const incomeData = incomeItems
      ?.map((incomeItem) => {
        if (!(incomeItem?.amount1 == null) || !(incomeItem?.amount2 == null) || !(incomeItem?.amount3 == null)) {
          // console.log('Income Item in MAP: ', incomeItem)
          return {
            type: incomeItem?.sovereignKey,
            amount1: incomeItem?.amount1 === null || incomeItem?.amount1 === undefined || incomeItem?.amount1 === NaN ? 0 : incomeItem?.amount1,
            amount2: incomeItem?.amount2 === null || incomeItem?.amount2 === undefined || incomeItem?.amount2 === NaN ? 0 : incomeItem?.amount2,
            amount3: incomeItem?.amount3 === null || incomeItem?.amount3 === undefined || incomeItem?.amount3 === NaN ? 0 : incomeItem?.amount3,
          }
        }
      })
      ?.filter((incomeItem) => {
        return !(incomeItem == null)
      })

    const expenseData = expenseItems
      ?.map((expenseItem) => {
        if (!(expenseItem?.amount1 == null) || !(expenseItem?.amount2 == null) || !(expenseItem?.amount3 == null)) {
          return {
            type: expenseItem?.sovereignKey,
            amount1: expenseItem?.amount1 === null || expenseItem?.amount1 === undefined || expenseItem?.amount1 === NaN ? 0 : expenseItem?.amount1,
            amount2: expenseItem?.amount2 === null || expenseItem?.amount2 === undefined || expenseItem?.amount2 === NaN ? 0 : expenseItem?.amount2,
            amount3: expenseItem?.amount3 === null || expenseItem?.amount3 === undefined || expenseItem?.amount3 === NaN ? 0 : expenseItem?.amount3,
          }
        }
      })
      ?.filter((expenseItem) => {
        return !(expenseItem == null)
      })

    if (incomeData?.length === 0 && expenseData?.length === 0) return

    // console.log('Income NON-MUMBERS - ', Inc_amount1NotANumber, Inc_amount2NotANumber, Inc_amount3NotANumber)
    // console.log('Expense NON-MUMBERS - ', Exp_amount1NotANumber, Exp_amount2NotANumber, Exp_amount3NotANumber)

    //! - Double check this logic
    // if (Inc_amount1NotANumber?.length != 0 || Inc_amount2NotANumber?.length != 0 || Inc_amount3NotANumber?.length != 0) return
    // if (Exp_amount1NotANumber?.length != 0 || Exp_amount2NotANumber?.length != 0 || Exp_amount3NotANumber?.length != 0) return

    const sopData = JSON.stringify({
      assets: [],
      liabilities: [],
      income: incomeData,
      expense: expenseData,
      adults: 0,
      dep: 0,
    })

    const config = {
      url: '/pqlc',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
      data: sopData,
    }

    await dispatch(getSopSummary(config))
  }

  const mdUp = useResponsive('up', 'md')

  if (!mdUp) {
    return null
  }

  return (
    <Portal>
      <Stack
        sx={{
          p: 3,
          top: 0,
          right: 0,
          height: 1,
          width: 380,
          position: 'fixed',
          overflowX: 'auto',
          color: 'common.white',
          zIndex: theme.zIndex.drawer,
          ...bgBlur({ color: theme.palette.grey[900] }),
        }}
      >
        <Typography variant='button' sx={{ color: 'secondary.light', my: 0.5, textTransform: 'uppercase', fontWeight: 'light', letterSpacing: 1 }}>
          Income and Expense
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', pb: 5 }}>
          <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Monthly Income
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(monthlyIncome)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Actual Living Expense
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(actualLivingExpense)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Monthly Financial Commitments
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(actualMonthlyCommitments)}</Typography>
            </Stack>
            <Divider flexItem sx={{ my: 2 }} />
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Stack direction='row' justifyContent='flex-start' alignItems='center' spacing={1}>
                <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                  Monthly Surplus
                </Typography>
                {!isGreaterThanOrEqualToOne ? (
                  <Tooltip title='Sufficient Surplus'>
                    <CheckIcon color='success' fontSize='small' />
                  </Tooltip>
                ) : (
                  <Tooltip title='Insufficient Surplus'>
                    <ErrorIcon color='error' fontSize='small' />
                  </Tooltip>
                )}
              </Stack>
              <Typography variant='subtitle2'>{fCurrency(monthlySurplus)}</Typography>
            </Stack>
            <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Surplus Ratio
              </Typography>
              <Typography variant='subtitle2'>{fNumberCust(surplusRatio)}</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%', py: 2 }}>
            <Button onClick={calculateMonthlySurplus} variant='contained' sx={{ borderRadius: 10, width: '100%' }}>
              Calculate
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Portal>
  )
}

{
  /* //? Removed */
}
{
  /* <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                Estimated Benchmarkable Expenses
              </Typography>
              <Typography variant='subtitle2'>{fCurrency(benchmarkableCCCFAExpense)}</Typography>
            </Stack> */
}
{
  /* <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                NSR Lower
              </Typography>
              <Typography variant='subtitle2'>{nsrLower}</Typography>
            </Stack> */
}
{
  /* <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                NSR
              </Typography>
              <Typography variant='subtitle2'>{nsr}</Typography>
            </Stack> */
}
{
  /* <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
              <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
                NSR Upper
              </Typography>
              <Typography variant='subtitle2'>{nsrUpper}</Typography>
            </Stack> */
}

// <Typography variant='button' sx={{ color: 'secondary.light', my: 0.5, textTransform: 'uppercase', fontWeight: 'light', letterSpacing: 1 }}>
//           Assets and Liabilities
//         </Typography>
//         <Divider sx={{ my: 2 }} />
//         <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2} sx={{ width: '100%', pb: 5 }}>
//           <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={1} sx={{ width: '100%' }}>
//             <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
//               <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
//                 Total Assets
//               </Typography>
//               <Typography variant='subtitle2'>{fCurrency(totalAssets)}</Typography>
//             </Stack>
//             <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
//               <Typography variant='subtitle2' sx={{ fontWeight: 'light' }}>
//                 Total Liability
//               </Typography>
//               <Typography variant='subtitle2'>{fCurrency(totalLiabilities)}</Typography>
//             </Stack>
//           </Stack>
//         </Stack>
