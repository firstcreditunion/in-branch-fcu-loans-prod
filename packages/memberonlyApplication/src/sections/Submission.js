import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { useTheme } from '@mui/material/styles'
import { fDate } from '../utils/formatDateTime'
import { fCurrency } from '../utils/formatNumber'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'

//* MUI - Styles
import { styled } from '@mui/material/styles'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import { submissionActions, submitLoanApplication, generateLoanApplicationReport } from '../redux/slices/submissionSlice'

import useMediaQuery from '@mui/material/useMediaQuery'
import { Typography, Alert, AlertTitle, Stack, Divider, Box, Card, Button, Paper } from '@mui/material'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CheckIcon from '@mui/icons-material/Check'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import { css } from '@emotion/react'
import SyncLoader from 'react-spinners/SyncLoader'

// List MUI
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'

//Other MUI
import Checkbox from '@mui/material/Checkbox'
import SendIcon from '@mui/icons-material/Send'
import IconButton from '@mui/material/IconButton'
import CommentIcon from '@mui/icons-material/Comment'
import WarningIcon from '@mui/icons-material/Warning'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

//* API Constants
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv, getCloudFrontEnvironment } from '../redux/utils/apiConstants'
import { getLoanPurpose_FromValue, getTradingBranch_FromValue } from '../redux/codes/getKeysOrValues'

//* Utils
import { convertToUTCCustom } from '../utils/convertDatetoUTC'
import { fDateCustom } from '../utils/formatDateTime'

const ContentStyle = styled(Paper)(({ theme }) => ({
  borderRadius: 25,
  height: '100%',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  boxSizing: 'border-box',
  maxWidth: 200,
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

const Subtitle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.secondary,
}))

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

export default function Submission() {
  const history = useHistory()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  const sovereignUser = useSelector((state) => state.globalReducer.sovereignUser)
  let zeroPaddedLoadedBy = ''

  if (sovereignUser != null || sovereignUser != '' || sovereignUser != undefined) {
    const zeroConcatLoadedBy = '0000000000' + sovereignUser?.toString()
    zeroPaddedLoadedBy = zeroConcatLoadedBy.substring(zeroConcatLoadedBy.length - 10, zeroConcatLoadedBy.length)
  }
  //* Submission Results
  const loading = useSelector((state) => state.submissionReducer.loading)
  const applicationNumber = useSelector((state) => state.submissionReducer.applicationNumber)
  const serverError = useSelector((state) => state.submissionReducer.serverError)
  const submissionStatusCode = useSelector((state) => state.submissionReducer.submissionStatusCode)
  const submissionFulfilled = useSelector((state) => state.submissionReducer.submissionFulfilled)

  const requestedLoanAmount = useSelector((state) => state.loanDetailsReducer.requestedLoanAmount) //Added to pdf
  const interestRate = useSelector((state) => state.clientSearchReducer.primeIreEstimate.estimatedInterestRate) //Added to pdf

  //* Repayment Amount
  const lncalc_InterestAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_InterestAmount) //Added to pdf
  const feeCharged = useSelector((state) => state.loanCalculatorReducer.feeCharged) //Added to pdf
  const lncalc_AmountPayable = useSelector((state) => state.loanCalculatorReducer.lncalc_AmountPayable) //Added to pdf
  const lncalc_PaymentFrequencyUnit = useSelector((state) => state.loanCalculatorReducer.lncalc_PaymentFrequency.unit)
  const lncalc_TermValue = useSelector((state) => state.loanCalculatorReducer.lncalc_Term.value) //Added to pdf
  const lncalc_InterestRate = useSelector((state) => state.loanCalculatorReducer.lncalc_InterestRate)
  const firstPaymentDate = useSelector((state) => state.loanCalculatorReducer.firstPaymentDate) //Added to pdf
  const documentationTypes = useSelector((state) => state.loanDetailsReducer.documentationTypes) //Added to pdf

  const repayFreq = useSelector((state) => state.loanCalculatorReducer.lncalc_PaymentFrequency?.unit) //Added to pdf
  const lncalc_InstalmentAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_InstalmentAmount) //Added to pdf

  const term = useSelector((state) => state.loanDetailsReducer.loanTerm)

  //* Associated Clients
  const primeclientNumber = useSelector((state) => state.clientSearchReducer.primeclientNumber)
  const zeroConcatClientNumber = '0000000000' + primeclientNumber.toString()
  const zeroPaddedClientNumber = zeroConcatClientNumber.substring(zeroConcatClientNumber.length - 10, zeroConcatClientNumber.length)

  //* Additional Details - Part 1
  const isCreditScoreComplete = useSelector((state) => state.creditScoreReducer.isCreditScoreComplete)
  const isScoreExceedsThreshold = useSelector((state) => state.creditScoreReducer.isScoreExceedsThreshold)
  const creditScoreThreshold = useSelector((state) => state.creditScoreReducer.creditScoreThreshold)
  const hasUnpaidDefualtCollections = useSelector((state) => state.creditScoreReducer.hasUnpaidDefualtCollections)
  const detailsUnpaidDefualt = useSelector((state) => state.creditScoreReducer.detailsUnpaidDefualt)
  const isMemberUnderHardship = useSelector((state) => state.creditScoreReducer.isMemberUnderHardship)
  const hasMemberBeenBankrupt = useSelector((state) => state.creditScoreReducer.hasMemberBeenBankrupt)
  const isMemberInArrearsWithFCU = useSelector((state) => state.creditScoreReducer.isMemberInArrearsWithFCU)
  const creditBeingSought = useSelector((state) => state.creditScoreReducer.creditBeingSought)
  const termForCreditBeingSought = useSelector((state) => state.creditScoreReducer.termForCreditBeingSought)

  //* Additional Details - Part 2
  const loanPurpose = useSelector((state) => state.additionalInfoPart2Reducer.loanPurposeCode)
  const tradingBranchCode = useSelector((state) => state.additionalInfoPart2Reducer.tradingBranch)

  const inquiryMadeToObtainQuotes = useSelector((state) => state.additionalInfoPart2Reducer.inquiryMadeToObtainQuotes)
  const qualifyForMbroAndPern = useSelector((state) => state.additionalInfoPart2Reducer.qualifyForMbroAndPern)
  const didMemberAcceptMbro = useSelector((state) => state.additionalInfoPart2Reducer.didMemberAcceptMbro)
  const whyMemberAcceptedMbro = useSelector((state) => state.additionalInfoPart2Reducer.whyMemberAcceptedMbro)
  const isCreditUsedForRefinance = useSelector((state) => state.additionalInfoPart2Reducer.isCreditUsedForRefinance)
  const isCreditUsedForRefinanceComments = useSelector((state) => state.additionalInfoPart2Reducer.isCreditUsedForRefinanceComments)
  const ninetyDayBankStatementObtained = useSelector((state) => state.additionalInfoPart2Reducer.ninetyDayBankStatementObtained)
  const isMemberHappyWithQuote = useSelector((state) => state.additionalInfoPart2Reducer.isMemberHappyWithQuote)
  const anyOtherComments = useSelector((state) => state.additionalInfoPart2Reducer.anyOtherComments)

  const isIncomeExpensetestComplete = useSelector((state) => state.sopRelatedQuestionsReducer.isIncomeExpensetestComplete)
  const isIncomeExpensetestCompleteDesc = useSelector((state) => state.sopRelatedQuestionsReducer.isIncomeExpensetestCompleteDesc)
  const incomeOverEstimatedComment = useSelector((state) => state.sopRelatedQuestionsReducer.incomeOverEstimatedComment)
  const expenseUnderEstimatedComment = useSelector((state) => state.sopRelatedQuestionsReducer.expenseUnderEstimatedComment)
  const otherExpenses = useSelector((state) => state.sopRelatedQuestionsReducer.otherExpenses)
  const canPayWithoutSufferingHardship = useSelector((state) => state.sopRelatedQuestionsReducer.canPayWithoutSufferingHardship)

  console.log('isIncomeExpensetestComplete: ', isIncomeExpensetestComplete)
  console.log('isIncomeExpensetestCompleteDesc: ', isIncomeExpensetestCompleteDesc)

  const memoLines = ['', '___________ SUTABILITY TEST - PART 1 ___________', '', `Is the Credit Report Complete?: ${isCreditScoreComplete === 'Y' ? 'Yes' : 'No'}`, '', `Did credit score exceed 300? ${isScoreExceedsThreshold === 'Y' ? 'Yes' : 'No'}`, '', `Does the member have any unpaid defualts? - ${hasUnpaidDefualtCollections === 'Y' ? 'Yes' : 'No'}`, '', `Unpaid Default Notes - ${hasUnpaidDefualtCollections === 'Y' ? detailsUnpaidDefualt : 'N/A'}`, '', `Is the member under any hardship arrangement? - ${isMemberUnderHardship === 'Y' ? 'Yes' : 'No'}`, '', `Has the member been bankrupt? - ${hasMemberBeenBankrupt === 'Y' ? 'Yes' : 'No'}`, '', `Is member in arrears with FCU? - ${isMemberInArrearsWithFCU === 'Y' ? 'Yes' : 'No'}`, '', `Credit Limit - How much credit is being sought? - ${creditBeingSought}`, '', `How long is the credit being sought for? - ${termForCreditBeingSought}`, '', '', '', '___________ SUTABILITY TEST - PART 2 ___________', '', `Inquiry made to obtain quotes? - ${inquiryMadeToObtainQuotes === 'Y' ? 'Yes' : 'No'}`, '', `Does member qualify for both Member-Only loan and personal loan? - ${qualifyForMbroAndPern === 'Y' ? 'Yes' : 'No'}`, '', `Did member accept Member-Only loan? - ${didMemberAcceptMbro === 'Y' ? 'Yes' : 'No'}`, '', `Why did the member accept or decline Member-Only loan? - ${whyMemberAcceptedMbro}`, '', `Is the credit used to refinance another lender and/or an exisitng FCU loan? If so is the member aware of the additional costs? - ${isCreditUsedForRefinance === 'Y' ? 'Yes' : 'No'}`, '', `Refinance Notes - ${isCreditUsedForRefinanceComments}`, '', `90 days bank statement obtained? - ${ninetyDayBankStatementObtained === 'Y' ? 'Yes' : 'No'}`, '', `Is the quote/proposed loan suitable to the member? - ${isMemberHappyWithQuote === 'Y' ? 'Yes' : 'No'}`, '', `Is the member happy with the quote? - ${isMemberHappyWithQuote ? 'Yes' : 'No'}`, '', `Other Comments- ${anyOtherComments}`, '', '', '', '___________ AFFORDABILITY TEST ___________', '', `Full Income and Expense Estimate Test (Reg 4AF) Completed? ${isIncomeExpensetestComplete === 'Y' ? 'Yes - The full income vs expense test completed with sufficient Surplus evident.' : 'No - The full income vs expense test is not complete. The loan will be withdrawn or declined'}`, '', `Likely income may be overestimated - Notes: ${incomeOverEstimatedComment}`, '', `Likely relevant expenses may be underestimated - Notes: ${expenseUnderEstimatedComment}`, '', `Or borrower may incur other expenses that cause them to suffer substantial hardship? ${otherExpenses === 'Y' ? 'No other expenses identified or likely that may cause the member to suffer financial hardship.' : 'Other expenses identified which may lead to financial hardship. The loan will be withdrawn/declined.'}`, '', `Based on the above answers, are you satisfied on reasonable grounds that the borrower will be able to make payments without suffering substantial hardship ${canPayWithoutSufferingHardship === 'Y' ? 'Yes, the borrower will be able to make repayments without suffering substantial hardship.' : 'No, the borrower may suffer financial hardship. The loan will be withdrawn/ declined.'}`, '', '', '', '___________ PRIVACY DECLARATION ___________', '', `Declaration Item 1 - Accpted? - ${declarationObject?.CreditWorthiness?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 2 - Accpted? - ${declarationObject?.AuthoriseFCU?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 3 - Accpted? - ${declarationObject?.TrueInformation?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 4 - Accpted? - ${declarationObject?.AmlCftObligations?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 5 - Accpted? - ${declarationObject?.StorePersonalInfo?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 6 - Accpted? - ${declarationObject?.InsureLoan?.accept ? 'Yes' : 'No'}`]

  //TODO Privacy Declaration - Add to Memo Lines
  const declarationObject = useSelector((state) => state.authorisationReducer.declarationItems)
  const declarationItems = Object.values(declarationObject)

  //* Personal Details

  const primetitle = useSelector((state) => state.clientSearchReducer.primetitle) //Added To Pdf
  const primeforenames = useSelector((state) => state.clientSearchReducer.primeforenames) //Added To Pdf
  const primesurname = useSelector((state) => state.clientSearchReducer.primesurname)  //Added To Pdf
  const primegender = useSelector((state) => state.clientSearchReducer.primegender) //Added To Pdf
  const primedateOfBirth = useSelector((state) => state.clientSearchReducer.primedateOfBirth) //Added To Pdf

  //* SOP Details
  //? Assets
  const asset_home = useSelector((state) => state.sopAssetsReducer.home)
  const asset_homeAndContents = useSelector((state) => state.sopAssetsReducer.homeAndContents)
  const asset_vehicles = useSelector((state) => state.sopAssetsReducer.vehicles)
  const asset_savings = useSelector((state) => state.sopAssetsReducer.savings)
  const asset_kiwisaver = useSelector((state) => state.sopAssetsReducer.kiwisaver)
  const asset_nzsuper = useSelector((state) => state.sopAssetsReducer.nzsuper)
  const asset_s6 = useSelector((state) => state.sopAssetsReducer.s6)

  const asstesAll = [asset_home, asset_homeAndContents, asset_vehicles, asset_savings, asset_kiwisaver, asset_nzsuper]

  //? Liability
  const liability_mortgage = useSelector((state) => state.sopLiabilitiesReducer.mortgage)
  const liability_storecard = useSelector((state) => state.sopLiabilitiesReducer.storecard)
  const liability_mastercard = useSelector((state) => state.sopLiabilitiesReducer.mastercard)
  const liability_visa = useSelector((state) => state.sopLiabilitiesReducer.visa)
  const liability_studentloan = useSelector((state) => state.sopLiabilitiesReducer.studentloan)
  const liability_otherloan1 = useSelector((state) => state.sopLiabilitiesReducer.otherloan1)

  const liabilityAll = [liability_mortgage, liability_storecard, liability_mastercard, liability_visa, liability_studentloan, liability_otherloan1]

  //? Income
  const income_wages = useSelector((state) => state.sopIncomeDataGridReducer.wages) //Added To Pdf
  const income_secondWages = useSelector((state) => state.sopIncomeDataGridReducer.secondWages) //Added To Pdf
  const income_winzBenefit = useSelector((state) => state.sopIncomeDataGridReducer.winzBenefit) //Added To Pdf
  const income_selfEmployed = useSelector((state) => state.sopIncomeDataGridReducer.selfEmployed) //Added To Pdf
  const income_nzSuper = useSelector((state) => state.sopIncomeDataGridReducer.nzSuper) //Added To Pdf
  const income_studyLink = useSelector((state) => state.sopIncomeDataGridReducer.studyLink) //Added To Pdf
  const income_rentalIncome = useSelector((state) => state.sopIncomeDataGridReducer.rentalIncome) //Added To Pdf
  const income_childSupport = useSelector((state) => state.sopIncomeDataGridReducer.childSupport) //Added To Pdf
  const income_workingForFamilies = useSelector((state) => state.sopIncomeDataGridReducer.workingForFamilies) //Added To Pdf
  const income_boarderIncome = useSelector((state) => state.sopIncomeDataGridReducer.boarderIncome) //Added To Pdf

  const inomceAll = [income_wages, income_secondWages, income_winzBenefit, income_selfEmployed, income_nzSuper, income_studyLink, income_rentalIncome, income_childSupport, income_workingForFamilies, income_boarderIncome]

  const primeIncome = [
    {
      amount1: income_wages.amount1,
      amount2: income_wages.amount2,
      amount3: income_wages.amount3,
      code: income_wages.code,
      desc: income_wages.desc,
    },
    {
      amount1: income_secondWages.amount1,
      amount2: income_secondWages.amount2,
      amount3: income_secondWages.amount3,
      code: income_secondWages.code,
      desc: income_secondWages.desc,
    },
    {
      amount1: income_winzBenefit.amount1,
      amount2: income_winzBenefit.amount2,
      amount3: income_winzBenefit.amount3,
      code: income_winzBenefit.code,
      desc: income_winzBenefit.desc,
    },
    {
      amount1: income_selfEmployed.amount1,
      amount2: income_selfEmployed.amount2,
      amount3: income_selfEmployed.amount3,
      code: income_selfEmployed.code,
      desc: income_selfEmployed.desc,
    },
    {
      amount1: income_nzSuper.amount1,
      amount2: income_nzSuper.amount2,
      amount3: income_nzSuper.amount3,
      code: income_nzSuper.code,
      desc: income_nzSuper.desc,
    },
    {
      amount1: income_studyLink.amount1,
      amount2: income_studyLink.amount2,
      amount3: income_studyLink.amount3,
      code: income_studyLink.code,
      desc: income_studyLink.desc,
    },
    {
      amount1: income_rentalIncome.amount1,
      amount2: income_rentalIncome.amount2,
      amount3: income_rentalIncome.amount3,
      code: income_rentalIncome.code,
      desc: income_rentalIncome.desc,
    },
    {
      amount1: income_childSupport.amount1,
      amount2: income_childSupport.amount2,
      amount3: income_childSupport.amount3,
      code: income_childSupport.code,
      desc: income_childSupport.desc,
    },
    {
      amount1: income_workingForFamilies.amount1,
      amount2: income_workingForFamilies.amount2,
      amount3: income_workingForFamilies.amount3,
      code: income_workingForFamilies.code,
      desc: income_workingForFamilies.desc,
    },
    {
      amount1: income_boarderIncome.amount1,
      amount2: income_boarderIncome.amount2,
      amount3: income_boarderIncome.amount3,
      code: income_boarderIncome.code,
      desc: income_boarderIncome.desc,
    },
  ]

  //? Expenses
  const expenses_rentingBoarding = useSelector((state) => state.sopExpenseReducer.rentingBoarding)  //Added To Pdf
  const expenses_liabilitiesServicing = useSelector((state) => state.sopExpenseReducer.liabilitiesServicing)  //Added To Pdf
  const expenses_powerOrGas = useSelector((state) => state.sopExpenseReducer.powerOrGas)  //Added To Pdf
  const expenses_groceries = useSelector((state) => state.sopExpenseReducer.groceries) //Added To Pdf
  const expenses_phoneOrInternet = useSelector((state) => state.sopExpenseReducer.phoneOrInternet) //Added To Pdf
  const expenses_fuel = useSelector((state) => state.sopExpenseReducer.fuel) //Added To Pdf
  const expenses_s6_or_savings = useSelector((state) => state.sopExpenseReducer.s6_or_savings) //Added To Pdf
  const expenses_wof_rego = useSelector((state) => state.sopExpenseReducer.wof_rego) //Added To Pdf
  const expenses_clothing = useSelector((state) => state.sopExpenseReducer.clothing) //Added To Pdf
  const expenses_medicalExpense = useSelector((state) => state.sopExpenseReducer.medicalExpense) //Added To Pdf
  const expenses_gym = useSelector((state) => state.sopExpenseReducer.gym) //Added To Pdf
  const expenses_recreation = useSelector((state) => state.sopExpenseReducer.recreation) //Added To Pdf
  const expenses_tithing = useSelector((state) => state.sopExpenseReducer.tithing) //Added To Pdf
  const expenses_insurance = useSelector((state) => state.sopExpenseReducer.insurance) //Added To Pdf
  const expenses_savings = useSelector((state) => state.sopExpenseReducer.savings) //Added To Pdf

  //Added To Pdf
  const primeExpenses = [
    {
      amount1: expenses_rentingBoarding.amount1,
      amount2: expenses_rentingBoarding.amount2,
      amount3: expenses_rentingBoarding.amount3,
      code: expenses_rentingBoarding.code,
      desc: expenses_rentingBoarding.desc,
    },
    {
      amount1: expenses_liabilitiesServicing.amount1,
      amount2: expenses_liabilitiesServicing.amount2,
      amount3: expenses_liabilitiesServicing.amount3,
      code: expenses_liabilitiesServicing.code,
      desc: expenses_liabilitiesServicing.desc,
    },
    {
      amount1: expenses_powerOrGas.amount1,
      amount2: expenses_powerOrGas.amount2,
      amount3: expenses_powerOrGas.amount3,
      code: expenses_powerOrGas.code,
      desc: expenses_powerOrGas.desc,
    },
    {
      amount1: expenses_groceries.amount1,
      amount2: expenses_groceries.amount2,
      amount3: expenses_groceries.amount3,
      code: expenses_groceries.code,
      desc: expenses_groceries.desc,
    },
    {
      amount1: expenses_phoneOrInternet.amount1,
      amount2: expenses_phoneOrInternet.amount2,
      amount3: expenses_phoneOrInternet.amount3,
      code: expenses_phoneOrInternet.code,
      desc: expenses_phoneOrInternet.desc,
    },
    {
      amount1: expenses_fuel.amount1,
      amount2: expenses_fuel.amount2,
      amount3: expenses_fuel.amount3,
      code: expenses_fuel.code,
      desc: expenses_fuel.desc,
    },
    {
      amount1: expenses_s6_or_savings.amount1,
      amount2: expenses_s6_or_savings.amount2,
      amount3: expenses_s6_or_savings.amount3,
      code: expenses_s6_or_savings.code,
      desc: expenses_s6_or_savings.desc,
    },
    {
      amount1: expenses_wof_rego.amount1,
      amount2: expenses_wof_rego.amount2,
      amount3: expenses_wof_rego.amount3,
      code: expenses_wof_rego.code,
      desc: expenses_wof_rego.desc,
    },
    {
      amount1: expenses_clothing.amount1,
      amount2: expenses_clothing.amount2,
      amount3: expenses_clothing.amount3,
      code: expenses_clothing.code,
      desc: expenses_clothing.desc,
    },
    {
      amount1: expenses_medicalExpense.amount1,
      amount2: expenses_medicalExpense.amount2,
      amount3: expenses_medicalExpense.amount3,
      code: expenses_medicalExpense.code,
      desc: expenses_medicalExpense.desc,
    },
    {
      amount1: expenses_gym.amount1,
      amount2: expenses_gym.amount2,
      amount3: expenses_gym.amount3,
      code: expenses_gym.code,
      desc: expenses_gym.desc,
    },
    {
      amount1: expenses_recreation.amount1,
      amount2: expenses_recreation.amount2,
      amount3: expenses_recreation.amount3,
      code: expenses_recreation.code,
      desc: expenses_recreation.desc,
    },
    {
      amount1: expenses_tithing.amount1,
      amount2: expenses_tithing.amount2,
      amount3: expenses_tithing.amount3,
      code: expenses_tithing.code,
      desc: expenses_tithing.desc,
    },
    {
      amount1: expenses_insurance.amount1,
      amount2: expenses_insurance.amount2,
      amount3: expenses_insurance.amount3,
      code: expenses_insurance.code,
      desc: expenses_insurance.desc,
    },
    {
      amount1: expenses_savings.amount1,
      amount2: expenses_savings.amount2,
      amount3: expenses_savings.amount3,
      code: expenses_savings.code,
      desc: expenses_savings.desc,
    }
  ]

  const actualLivingExpense = useSelector((state) => state.sopItemsReducer.actualLivingExpense)
  const actualMonthlyCommitments = useSelector((state) => state.sopItemsReducer.actualMonthlyCommitments)
  const monthlyIncome = useSelector((state) => state.sopItemsReducer.monthlyIncome)
  const surplusRatio = useSelector((state) => state.sopItemsReducer.surplusRatio)
  const monthlySurplus = useSelector((state) => state.sopItemsReducer.monthlySurplus)


  //* Payment Instruction - Bank Account for Instalment Debit
  const backAccountForInstalmentDebit = useSelector((state) => state.paymentInstructionReducer.backAccountForInstalmentDebit)

  const nsr = useSelector((state) => state.sopItemsReducer.nsr)
  const nsrWithoutPercent = nsr?.substring(0, nsr.length - 1)

  const expensesAll = [expenses_rentingBoarding, expenses_powerOrGas, expenses_groceries, expenses_phoneOrInternet, expenses_fuel, expenses_s6_or_savings, expenses_wof_rego, expenses_clothing, expenses_medicalExpense, expenses_gym, expenses_recreation, expenses_tithing, expenses_insurance, expenses_savings, expenses_liabilitiesServicing]

  const dispatch = useDispatch()

  function onSubmit() {
    // console.log('Privacy Declaration Submitted')
  }

  function createMailingBodyData() {
    // * Prime
    return JSON.stringify({
      draft: 'N',
      loanAmount: requestedLoanAmount,
      interestRate: interestRate,
      repayAmount: lncalc_InstalmentAmount,
      repayFreq: repayFreq,
      loanPurpose: getLoanPurpose_FromValue(loanPurpose)?.key,
      term: term,
      tradingBranch: getTradingBranch_FromValue(tradingBranchCode)?.key,
      paymentMethod: {
        bankAccountNumber: backAccountForInstalmentDebit == null ? null : backAccountForInstalmentDebit,
        paymentMethod: backAccountForInstalmentDebit == null ? 'AUTOPAY' : 'DD',
      },
      fees: documentationTypes?.map((fee) => {
        return fee.feeCode
      }),
      NSR: !(nsrWithoutPercent == null) ? nsrWithoutPercent : '0',
      associatedClients: {
        data: [
          {
            id: zeroPaddedClientNumber,
            type: 'associatedClients',
          },
        ],
      },
      securities: {
        data: [],
      },
      memoLines: memoLines.map((item) => {
        return item
      }),
      included: [
        {
          type: 'associatedClients',
          id: zeroPaddedClientNumber,
          attributes: {
            role: 'PRIMEB',
            seq: '1',
            signatureRequired: 'M',
            creditCheckAuthorised: declarationItems?.StorePersonalInfo?.accept === true ? 'Y' : 'N',
            order: '1',
            clientReference: zeroPaddedClientNumber,
            clientMaint: {
              clientID: zeroPaddedClientNumber,
              generalDetails: {
                externalSystemReference: '',
                clientType: 'I',
                status: {
                  code: 'A',
                },
                gna: 'N',
                existingClient: 'Y',
                individualDetails: {
                  title: primetitle,
                  forename: primeforenames,
                  surname: primesurname,
                  clientOtherNamesExist: 'N',
                  gender: primegender,
                  dateOfBirth: primedateOfBirth,
                },
              },
              clientCapacity: {
                capacityAssessment: {
                  anyExpectedChanges: 'Y',
                  changeDetails: 'N',
                  assessmentQuestionsAsked: 'Y',
                  selfDeclarationAccepted: 'Y',
                },
                joint: 'N',
                assets: asstesAll
                  ?.filter((asset) => {
                    return asset?.amount1 != null
                  })
                  .map((asset) => {
                    return { amount: asset?.amount1 == null ? 0 : parseFloat(asset?.amount1), description: asset?.desc, code: asset?.code }
                  }),
                liabilities: liabilityAll
                  ?.filter((liability) => {
                    return liability?.outstandingBalance != null
                  })
                  .map((liability) => {
                    return { amount: liability?.outstandingBalance == null ? 0 : parseFloat(liability?.outstandingBalance), description: liability?.desc, code: liability?.code }
                  }),
                incomes: inomceAll
                  ?.filter((income) => {
                    return income?.amount1 != null || income?.amount2 != null || income?.amount3 != null
                  })
                  .map((income) => {
                    return { amount1: { value: income?.amount1 == null ? 0 : parseFloat(income?.amount1) }, amount2: { value: income?.amount2 == null ? 0 : parseFloat(income?.amount2) }, amount3: { value: income?.amount3 == null ? 0 : parseFloat(income?.amount3) }, description: income?.desc, code: income?.code }
                  }),
                expenses: expensesAll
                  ?.filter((expense) => {
                    return expense?.amount1 != null || expense?.amount2 != null || expense?.amount3 != null
                  })
                  .map((expense) => {
                    return { amount1: { value: expense?.amount1 == null ? 0 : parseFloat(expense?.amount1) }, amount2: { value: expense?.amount2 == null ? 0 : parseFloat(expense?.amount2) }, amount3: { value: expense?.amount3 == null ? 0 : parseFloat(expense?.amount3) }, description: expense?.desc, code: expense?.code }
                  }),
              },
              mode: 'Add',
            },
          },
        },
      ],
    })
  }

  async function createSubmissionData() {
    // * Prime
    return JSON.stringify({
      loadedByClientNumber: zeroPaddedLoadedBy,
      draft: 'N',
      loanAmount: requestedLoanAmount,
      interestRate: interestRate,
      repayAmount: lncalc_InstalmentAmount,
      repayFreq: repayFreq,
      loanPurpose: getLoanPurpose_FromValue(loanPurpose)?.key,
      term: term,
      tradingBranch: getTradingBranch_FromValue(tradingBranchCode)?.key,
      paymentMethod: {
        bankAccountNumber: backAccountForInstalmentDebit == null ? null : backAccountForInstalmentDebit,
        paymentMethod: backAccountForInstalmentDebit == null ? 'AUTOPAY' : 'DD',
      },
      fees: documentationTypes?.map((fee) => {
        return fee.feeCode
      }),
      NSR: !(nsrWithoutPercent == null) ? nsrWithoutPercent : '0',
      associatedClients: {
        data: [
          {
            id: zeroPaddedClientNumber,
            type: 'associatedClients',
          },
        ],
      },
      securities: {
        data: [],
      },
      memoLines: memoLines.map((item) => {
        return item
      }),
      included: [
        {
          type: 'associatedClients',
          id: zeroPaddedClientNumber,
          attributes: {
            role: 'PRIMEB',
            seq: '1',
            signatureRequired: 'M',
            creditCheckAuthorised: declarationItems?.StorePersonalInfo?.accept === true ? 'Y' : 'N',
            order: '1',
            clientReference: zeroPaddedClientNumber,
            clientMaint: {
              clientID: zeroPaddedClientNumber,
              generalDetails: {
                externalSystemReference: '',
                clientType: 'I',
                status: {
                  code: 'A',
                },
                gna: 'N',
                existingClient: 'Y',
                individualDetails: {
                  title: primetitle,
                  forename: primeforenames,
                  surname: primesurname,
                  clientOtherNamesExist: 'N',
                  gender: primegender,
                  dateOfBirth: primedateOfBirth,
                },
              },
              clientCapacity: {
                capacityAssessment: {
                  anyExpectedChanges: 'Y',
                  changeDetails: 'N',
                  assessmentQuestionsAsked: 'Y',
                  selfDeclarationAccepted: 'Y',
                },
                joint: 'N',
                assets: asstesAll
                  ?.filter((asset) => {
                    return asset?.amount1 != null
                  })
                  .map((asset) => {
                    return { amount: asset?.amount1 == null ? 0 : parseFloat(asset?.amount1), description: asset?.desc, code: asset?.code }
                  }),
                liabilities: liabilityAll
                  ?.filter((liability) => {
                    return liability?.outstandingBalance != null
                  })
                  .map((liability) => {
                    return { amount: liability?.outstandingBalance == null ? 0 : parseFloat(liability?.outstandingBalance), description: liability?.desc, code: liability?.code }
                  }),
                incomes: inomceAll
                  ?.filter((income) => {
                    return income?.amount1 != null || income?.amount2 != null || income?.amount3 != null
                  })
                  .map((income) => {
                    return { amount1: { value: income?.amount1 == null ? 0 : parseFloat(income?.amount1) }, amount2: { value: income?.amount2 == null ? 0 : parseFloat(income?.amount2) }, amount3: { value: income?.amount3 == null ? 0 : parseFloat(income?.amount3) }, description: income?.desc, code: income?.code }
                  }),
                expenses: expensesAll
                  ?.filter((expense) => {
                    return expense?.amount1 != null || expense?.amount2 != null || expense?.amount3 != null
                  })
                  .map((expense) => {
                    return { amount1: { value: expense?.amount1 == null ? 0 : parseFloat(expense?.amount1) }, amount2: { value: expense?.amount2 == null ? 0 : parseFloat(expense?.amount2) }, amount3: { value: expense?.amount3 == null ? 0 : parseFloat(expense?.amount3) }, description: expense?.desc, code: expense?.code }
                  }),
              },
              mode: 'Add',
            },
          },
        },
      ],
    })
  }

  async function getRequestConfig() {
    const config = {
      url: '/submitonlineapp',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000,
      data: await createSubmissionData(),
    }

    return config
  }


  useEffect(() => {
    if (submissionFulfilled == null) return

    console.log('Raw PDF Data: ', createPdfData())
    console.log('JSON Stringified PDF Data: ', JSON.stringify({
      applicationData: createPdfData(),
      applicationNumber: applicationNumber == null ? primeforenames + ' ' + primesurname + ' ' + fDateCustom(timestamp) : applicationNumber,
      submissionAPIResults: {
        submissionStatusCode: submissionStatusCode,
        submissionFulfilled: submissionFulfilled,
        serverError: serverError,
      },
    }))

    const timestamp = new Date()
    const generatePdfConfig = {
      url: `${getCloudFrontEnvironment() === 'Member-Only-Test' ? '/generate-pdf-test' : '/generate-pdf'}`,
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000,
      data: JSON.stringify({
        applicationData: createPdfData(),
        applicationNumber: applicationNumber == null ? primeforenames + ' ' + primesurname + ' ' + fDateCustom(timestamp) : applicationNumber,
        submissionAPIResults: {
          submissionStatusCode: submissionStatusCode,
          submissionFulfilled: submissionFulfilled,
          serverError: serverError,
        },
      }),
    }

    dispatch(generateLoanApplicationReport(generatePdfConfig))

  }, [submissionFulfilled])

  function getIncomeExpenseTestResult(value) {
    const incomeExpenseTestItems = [
      { value: 'Y', label: 'Yes - The full income vs expense test completed with sufficient Surplus evident.' },
      { value: 'N', label: 'No - The full income vs expense test is not complete. The loan will be withdrawn or declined' },
    ]

    return incomeExpenseTestItems.find((item) => {
      return item.value === value
    })
  }

  function getOtherExpensesCausingHardship(value) {
    const otheExpensesCausingHardship = [
      { value: 'Y', label: 'No other expenses identified or likely that may cause the member to suffer financial hardship.' },
      { value: 'N', label: 'Other expenses identified which may lead to financial hardship. The loan will be withdrawn/declined.' },
    ]

    return otheExpensesCausingHardship.find((item) => {
      return item.value === value
    })
  }

  function canMemberPayWithoutHardship(value) {
    const canTheMemberPayWithoutHardship = [
      {
        value: 'Y',
        label: 'Yes, the borrower will be able to make repayments without suffering substantial hardship.',
      },
      {
        value: 'N',
        label: 'No, the borrower may suffer financial hardship. The loan will be withdrawn / declined.',
      },
    ]

    return canTheMemberPayWithoutHardship.find((item) => {
      return item.value === value
    })
  }


  function createPdfData() {

    return {
      loanApplicationDetails: {
        loanPurpose: loanPurpose,
        tradingBranchCode: tradingBranchCode,
      },
      primeDetails: {
        applicationNumber: applicationNumber,
        individualDetails: {
          title: primetitle,
          forename: primeforenames,
          surname: primesurname,
          gender: primegender,
          dateOfBirth: fDate(convertToUTCCustom(primedateOfBirth, 'dob')),
        },
        incomes: primeIncome,
        expenses: primeExpenses,
        incomeExpenseSummary: {
          actualLivingExpense: actualLivingExpense,
          actualMonthlyCommitments: actualMonthlyCommitments,
          monthlyIncome: monthlyIncome,
          surplusRatio: surplusRatio,
          monthlySurplus: monthlySurplus,
          nsr: !(nsrWithoutPercent == null) ? nsrWithoutPercent : 0,
        }
      },
      financialDetails: {
        loanAmount: requestedLoanAmount,
        interestRate: interestRate,
        repayAmount: lncalc_InstalmentAmount,
        repayFreq: repayFreq,
        lncalc_PaymentFrequencyUnit: lncalc_PaymentFrequencyUnit,
        term: lncalc_TermValue,
        lncalc_InterestAmount: lncalc_InterestAmount,
        feeCharged: feeCharged,
        lncalc_AmountPayable: lncalc_AmountPayable,
        firstPaymentDate: firstPaymentDate,
        documentationTypes: documentationTypes,
      },
      sutabilityTestPart1: {
        isCreditScoreComplete: isCreditScoreComplete,
        isScoreExceedsThreshold: isScoreExceedsThreshold,
        creditScoreThreshold: creditScoreThreshold,
        hasUnpaidDefualtCollections: hasUnpaidDefualtCollections,
        detailsUnpaidDefualt: detailsUnpaidDefualt,
        isMemberUnderHardship: isMemberUnderHardship,
        hasMemberBeenBankrupt: hasMemberBeenBankrupt,
        isMemberInArrearsWithFCU: isMemberInArrearsWithFCU,
        creditBeingSought: creditBeingSought,
        termForCreditBeingSought: termForCreditBeingSought,
      },
      sutabilityTestPart2: {
        inquiryMadeToObtainQuotes: inquiryMadeToObtainQuotes,
        qualifyForMbroAndPern: qualifyForMbroAndPern,
        didMemberAcceptMbro: didMemberAcceptMbro,
        whyMemberAcceptedMbro: whyMemberAcceptedMbro,
        isCreditUsedForRefinance: isCreditUsedForRefinance,
        isCreditUsedForRefinanceComments: isCreditUsedForRefinanceComments,
        ninetyDayBankStatementObtained: ninetyDayBankStatementObtained,
        isMemberHappyWithQuote: isMemberHappyWithQuote,
        anyOtherComments: anyOtherComments,
      },
      affordabilityTest: {
        isIncomeExpensetestComplete: getIncomeExpenseTestResult(isIncomeExpensetestComplete)?.label,
        incomeOverEstimatedComment: incomeOverEstimatedComment,
        expenseUnderEstimatedComment: expenseUnderEstimatedComment,
        otherExpenses: getOtherExpensesCausingHardship(otherExpenses)?.label,
        canPayWithoutSufferingHardship: canMemberPayWithoutHardship(canPayWithoutSufferingHardship)?.label,
      }
    }
  }




  async function submitApplication() {
    const config = await getRequestConfig()

    await dispatch(submitLoanApplication(config))
  }

  // let stringifiedSubmissionDataAsync = ''

  const stringifiedSubmissionData = createMailingBodyData()
  const submissionDataWithoutOpeningBraces = stringifiedSubmissionData.replace('{', '+')
  const submissionDataWithoutBraces = submissionDataWithoutOpeningBraces.replace('}', '-')
  const submissionDataWithoutQuotes = submissionDataWithoutBraces.replace('"', '?')

  // console.log('submissionDataWithoutBraces: ', submissionDataWithoutQuotes)

  const mailTo = `mailto:Isaac.Vicliph@firstcu.co.nz;Malakai.Curulala@firstcu.co.nz?cc=Herb.Wulff@firstcu.co.nz&subject=Loan Application Submission Failed&body=${JSON.parse(createMailingBodyData())}`

  return (
    <>
      {loading === 'PENDING' && applicationNumber === null && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ display: 'flex', flexGrow: 1, width: '100%', minHeight: '70vh' }}>
          <SyncLoader color='#bbbb14' />
        </Stack>
      )}
      {loading === 'IDLE' && applicationNumber === null && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ display: 'flex', flexGrow: 1, width: '100%', minHeight: '70vh' }}>
          <ContentStyle sx={{ width: '100%', maxWidth: 700 }}>
            <Box sx={{ pb: 3, textAlign: 'center' }}>
              <Typography variant='h6' sx={{ fontWeight: 'light' }}>
                Loan Summary
              </Typography>
            </Box>
            <Stack direction='column' justifyContent='flex-start' spacing={3}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' color='secondary' sx={{ textTransform: 'uppercase' }}>
                  Estimated Payment
                </Typography>
                <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={0.5}>
                  <Typography variant='h6' color='secondary'>
                    {fCurrency(lncalc_InstalmentAmount)}
                  </Typography>
                  <Typography color='secondary' sx={{ fontSize: 12 }} variant='caption'>
                    {lncalc_PaymentFrequencyUnit === 'M' ? ' /month' : lncalc_PaymentFrequencyUnit === 'F' ? ' /fortnight' : ' /week'}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Loan Amount</SummaryLabel>
                <ValueTypography>{fCurrency(requestedLoanAmount)}</ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Interest</SummaryLabel>
                <ValueTypography>{fCurrency(lncalc_InterestAmount)}</ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Fees</SummaryLabel>
                <ValueTypography>{fCurrency(feeCharged)}</ValueTypography>
              </Stack>
              <Divider sx={{ backgroundColor: 'secondary.main', width: '100%' }} />
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'} sx={{ fontWeight: 'medium' }}>
                  Amount Payable
                </SummaryLabel>
                <ValueTypography variant={downSm ? 'caption' : 'subtitle2'} sx={{ fontWeight: 'medium' }}>
                  {fCurrency(lncalc_AmountPayable)}
                </ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Loan Term</SummaryLabel>
                <ValueTypography>{lncalc_TermValue} month(s)</ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Interest Rate</SummaryLabel>
                <ValueTypography>{lncalc_InterestRate}% p.a.</ValueTypography>
              </Stack>
            </Stack>
          </ContentStyle>
          <Button variant='contained' color='secondary' onClick={submitApplication} sx={{ borderRadius: 49 }} endIcon={<SendIcon />}>
            Submit Application
          </Button>
        </Stack>
      )}
      {loading === 'IDLE' && applicationNumber == null && serverError === '' && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={1} sx={{ display: 'flex', flexGrow: 1, width: '100%', minHeight: '70vh' }}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            <Box sx={{ py: 2 }}>
              <WarningIcon color='warning' sx={{ fontSize: 80 }} />
            </Box>
            <Subtitle variant='h4' clor='primary' sx={{ textAlign: 'center' }}>
              There was an issue while submitting the loan application.
            </Subtitle>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={1} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            <Typography variant='h6' sx={{ fontWeight: 'light', textAlign: 'center' }}>
              Please contact the <strong>Data and Innovation Team</strong> to fix the issue. Click
              <strong>
                <a href={mailTo}>here </a>
              </strong>
              to send an email.
            </Typography>
          </Stack>
        </Stack>
      )}
      {loading === 'IDLE' && applicationNumber != null && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ display: 'flex', flexGrow: 1, width: '100%', minHeight: '70vh' }}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            <Box sx={{ py: 2 }}>
              <CheckCircleIcon color='success' sx={{ fontSize: 80 }} />
            </Box>
            <Subtitle variant='h6' clor='primary' sx={{ textAlign: 'center' }}>
              Application has been submitted successfully!
            </Subtitle>
          </Stack>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={1} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            <Typography variant='body1' sx={{ fontWeight: 'light' }}>
              Application Number is:
            </Typography>
            <Typography variant='body1' color='primary' sx={{ fontWeight: 'bold' }}>
              {applicationNumber}
            </Typography>
            {/* <Stack direction='column' justifyContent='center' alignItems='center' spacing={1} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
              <Button
                variant='contained'
                color='secondary'
                sx={{
                  width: 350,
                  borderRadius: 10,
                }}
                onClick={() => {
                  history.push('/memberonlyloan')
                }}
              >
                Return to Homepage
              </Button>
            </Stack> */}
          </Stack>
        </Stack>
      )}
    </>
  )
}
