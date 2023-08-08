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
import { submissionActions, submitLoanApplication } from '../redux/slices/submissionSlice'

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
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv } from '../redux/utils/apiConstants'
import { getLoanPurpose_FromValue, getTradingBranch_FromValue } from '../redux/codes/getKeysOrValues'

//* Utils
import { convertToUTCCustom } from '../utils/convertDatetoUTC'

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

  const loading = useSelector((state) => state.submissionReducer.loading)
  const applicationNumber = useSelector((state) => state.submissionReducer.applicationNumber)
  const serverError = useSelector((state) => state.submissionReducer.serverError)

  const requestedLoanAmount = useSelector((state) => state.loanDetailsReducer.requestedLoanAmount)
  const interestRate = useSelector((state) => state.clientSearchReducer.primeIreEstimate.estimatedInterestRate)

  //* Repayment Amount
  const lncalc_InterestAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_InterestAmount)
  const feeCharged = useSelector((state) => state.loanCalculatorReducer.feeCharged)
  const lncalc_AmountPayable = useSelector((state) => state.loanCalculatorReducer.lncalc_AmountPayable)
  const lncalc_PaymentFrequencyUnit = useSelector((state) => state.loanCalculatorReducer.lncalc_PaymentFrequency.unit)
  const lncalc_TermValue = useSelector((state) => state.loanCalculatorReducer.lncalc_Term.value)
  const lncalc_InterestRate = useSelector((state) => state.loanCalculatorReducer.lncalc_InterestRate)
  const firstPaymentDate = useSelector((state) => state.loanCalculatorReducer.firstPaymentDate)
  const documentationTypes = useSelector((state) => state.loanDetailsReducer.documentationTypes)

  const repayFreq = useSelector((state) => state.loanCalculatorReducer.lncalc_PaymentFrequency?.unit)
  const lncalc_InstalmentAmount = useSelector((state) => state.loanCalculatorReducer.lncalc_InstalmentAmount)

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
  const incomeOverEstimatedComment = useSelector((state) => state.sopRelatedQuestionsReducer.incomeOverEstimatedComment)
  const expenseUnderEstimatedComment = useSelector((state) => state.sopRelatedQuestionsReducer.expenseUnderEstimatedComment)
  const otherExpenses = useSelector((state) => state.sopRelatedQuestionsReducer.otherExpenses)
  const canPayWithoutSufferingHardship = useSelector((state) => state.sopRelatedQuestionsReducer.canPayWithoutSufferingHardship)

  const memoLines = ['', '___________ SUSTAINABILITY TEST - PART 1 ___________', '', `Is the Credit Report Complete?: ${isCreditScoreComplete === 'Y' ? 'Yes' : 'No'}`, '', `Did credit score exceed 300? ${isScoreExceedsThreshold === 'Y' ? 'Yes' : 'No'}`, '', `Does the member have any unpaid defualts? - ${hasUnpaidDefualtCollections === 'Y' ? 'Yes' : 'No'}`, '', `Unpaid Default Notes - ${hasUnpaidDefualtCollections === 'Y' ? detailsUnpaidDefualt : 'N/A'}`, '', `Is the member under any hardship arrangement? - ${isMemberUnderHardship === 'Y' ? 'Yes' : 'No'}`, '', `Has the member been bankrupt? - ${hasMemberBeenBankrupt === 'Y' ? 'Yes' : 'No'}`, '', `Is member in arrears with FCU? - ${isMemberInArrearsWithFCU === 'Y' ? 'Yes' : 'No'}`, '', `Credit Limit - How much credit is being sought? - ${creditBeingSought}`, '', `How long is the credit being sought for? - ${termForCreditBeingSought}`, '', '', '', '___________ SUSTAINABILITY TEST - PART 2 ___________', '', `Inquiry made to obtain quotes? - ${inquiryMadeToObtainQuotes === 'Y' ? 'Yes' : 'No'}`, '', `Does member qualify for both Member-Only loan and personal loan? - ${qualifyForMbroAndPern === 'Y' ? 'Yes' : 'No'}`, '', `Did member accept Member-Only loan? - ${didMemberAcceptMbro === 'Y' ? 'Yes' : 'No'}`, '', `Why did the member accept or decline Member-Only loan? - ${whyMemberAcceptedMbro}`, '', `Is the credit used to refinance another lender and/or an exisitng FCU loan? If so is the member aware of the additional costs? - ${isCreditUsedForRefinance === 'Y' ? 'Yes' : 'No'}`, '', `Refinance Notes - ${isCreditUsedForRefinanceComments}`, '', `90 days bank statement obtained? - ${ninetyDayBankStatementObtained === 'Y' ? 'Yes' : 'No'}`, '', `Is the quote/proposed loan suitable to the member? - ${isMemberHappyWithQuote === 'Y' ? 'Yes' : 'No'}`, '', `Is the member happy with the quote? - ${isMemberHappyWithQuote ? 'Yes' : 'No'}`, '', `Other Comments- ${anyOtherComments}`, '', '', '', '___________ AFFORDABILITY TEST ___________', '', `Full Income and Expense Estimate Test (Reg 4AF) Completed? ${isIncomeExpensetestComplete === 'Y' ? 'Yes - The full income vs expense test completed with sufficient Surplus evident.' : 'No - The full income vs expense test is not complete. The loan will be withdrawn or declined'}`, '', `Likely income may be overestimated - Notes: ${incomeOverEstimatedComment}`, '', `Likely relevant expenses may be underestimated - Notes: ${expenseUnderEstimatedComment}`, '', `Or borrower may incur other expenses that cause them to suffer substantial hardship? ${otherExpenses === 'Y' ? 'No other expenses identified or likely that may cause the member to suffer financial hardship.' : 'Other expenses identified which may lead to financial hardship. The loan will be withdrawn/declined.'}`, '', `Based on the above answers, are you satisfied on reasonable grounds that the borrower will be able to make payments without suffering substantial hardship ${canPayWithoutSufferingHardship === 'Y' ? 'Yes, the borrower will be able to make repayments without suffering substantial hardship.' : 'No, the borrower may suffer financial hardship. The loan will be withdrawn/ declined.'}`, '', '', '', '___________ PRIVACY DECLARATION ___________', '', `Declaration Item 1 - Accpted? - ${declarationObject?.CreditWorthiness?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 2 - Accpted? - ${declarationObject?.AuthoriseFCU?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 3 - Accpted? - ${declarationObject?.TrueInformation?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 4 - Accpted? - ${declarationObject?.AmlCftObligations?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 5 - Accpted? - ${declarationObject?.StorePersonalInfo?.accept ? 'Yes' : 'No'}`, '', `Declaration Item 6 - Accpted? - ${declarationObject?.InsureLoan?.accept ? 'Yes' : 'No'}`]

  //TODO Privacy Declaration - Add to Memo Lines
  const declarationObject = useSelector((state) => state.authorisationReducer.declarationItems)
  const declarationItems = Object.values(declarationObject)

  //* Personal Details

  const primetitle = useSelector((state) => state.clientSearchReducer.primetitle)
  const primeforenames = useSelector((state) => state.clientSearchReducer.primeforenames)
  const primesurname = useSelector((state) => state.clientSearchReducer.primesurname)
  const primegender = useSelector((state) => state.clientSearchReducer.primegender)
  const primedateOfBirth = useSelector((state) => state.clientSearchReducer.primedateOfBirth)

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
  const income_wages = useSelector((state) => state.sopIncomeDataGridReducer.wages)
  const income_secondWages = useSelector((state) => state.sopIncomeDataGridReducer.secondWages)
  const income_winzBenefit = useSelector((state) => state.sopIncomeDataGridReducer.winzBenefit)
  const income_selfEmployed = useSelector((state) => state.sopIncomeDataGridReducer.selfEmployed)
  const income_nzSuper = useSelector((state) => state.sopIncomeDataGridReducer.nzSuper)
  const income_studyLink = useSelector((state) => state.sopIncomeDataGridReducer.studyLink)
  const income_rentalIncome = useSelector((state) => state.sopIncomeDataGridReducer.rentalIncome)
  const income_childSupport = useSelector((state) => state.sopIncomeDataGridReducer.childSupport)
  const income_workingForFamilies = useSelector((state) => state.sopIncomeDataGridReducer.workingForFamilies)
  const income_boarderIncome = useSelector((state) => state.sopIncomeDataGridReducer.boarderIncome)

  const inomceAll = [income_wages, income_secondWages, income_winzBenefit, income_selfEmployed, income_nzSuper, income_studyLink, income_rentalIncome, income_childSupport, income_workingForFamilies, income_boarderIncome]

  //? Expenses
  const expenses_rentingBoarding = useSelector((state) => state.sopExpenseReducer.rentingBoarding)
  const expenses_liabilitiesServicing = useSelector((state) => state.sopExpenseReducer.liabilitiesServicing)
  const expenses_powerOrGas = useSelector((state) => state.sopExpenseReducer.powerOrGas)
  const expenses_groceries = useSelector((state) => state.sopExpenseReducer.groceries)
  const expenses_phoneOrInternet = useSelector((state) => state.sopExpenseReducer.phoneOrInternet)
  const expenses_fuel = useSelector((state) => state.sopExpenseReducer.fuel)
  const expenses_s6_or_savings = useSelector((state) => state.sopExpenseReducer.s6_or_savings)
  const expenses_wof_rego = useSelector((state) => state.sopExpenseReducer.wof_rego)
  const expenses_clothing = useSelector((state) => state.sopExpenseReducer.clothing)
  const expenses_medicalExpense = useSelector((state) => state.sopExpenseReducer.medicalExpense)
  const expenses_gym = useSelector((state) => state.sopExpenseReducer.gym)
  const expenses_recreation = useSelector((state) => state.sopExpenseReducer.recreation)
  const expenses_tithing = useSelector((state) => state.sopExpenseReducer.tithing)
  const expenses_insurance = useSelector((state) => state.sopExpenseReducer.insurance)
  const expenses_savings = useSelector((state) => state.sopExpenseReducer.savings)

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

  async function submitApplication() {
    const config = await getRequestConfig()

    await dispatch(submitLoanApplication(config))
  }

  // let stringifiedSubmissionDataAsync = ''

  const stringifiedSubmissionData = createMailingBodyData()
  const submissionDataWithoutOpeningBraces = stringifiedSubmissionData.replace('{', '+')
  const submissionDataWithoutBraces = submissionDataWithoutOpeningBraces.replace('}', '-')
  const submissionDataWithoutQuotes = submissionDataWithoutBraces.replace('"', '?')

  console.log('submissionDataWithoutBraces: ', submissionDataWithoutQuotes)

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
