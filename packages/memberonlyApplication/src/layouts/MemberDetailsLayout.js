import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

//* Redux
import { useDispatch, useSelector } from 'react-redux'
import useMediaQuery from '@mui/material/useMediaQuery'

import { globalActions } from '../redux/slices/globalSlice'
import { loanDetailsActions } from '../redux/slices/loanDetailsSlice'
import { clientSearchActions } from '../redux/slices/clientSearchSlice'
import { creditScoreActions } from '../redux/slices/creditScoreSlice'
import { additionalInfoPart2Actions } from '../redux/slices/additionalInfoPart2Slice'
import { verifyPrimeDetailsActions } from '../redux/slices/verifyPrimeDetailsSlice'
import { sopAssetActions } from '../redux/slices/sopAssetsSlice'
import { sopLiabilitiesActions } from '../redux/slices/sopLiabilitiesSlice'
import { sopIncomeGridSliceActions } from '../redux/slices/sopIncomeSlice'
import { sopExpenseAction } from '../redux/slices/sopExpenseSlice'
import { sopRelatedQuestionActions } from '../redux/slices/sopRelatedQuestionsSlice'
import { paymentInstructionActions } from '../redux/slices/paymentInstructionSlice'
import { authorisationActions } from '../redux/slices/authorisationSlice'

//* MUI
import { Box, Container, Grid, Paper, Typography, Alert, AlertTitle, Stack, Button, Divider, Chip } from '@mui/material'
import Zoom from '@mui/material/Zoom'

//* MUI Icons
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

import QuestionJointApplicant from '../forms/QuestionJointApplicant'

import SearchClientNumber from '../forms/SearchMember/SearchClientNumber'
import SearchJointClientNumber from '../forms/SearchMember/SearchJointClientNumber'

import PrimeEligibility from '../sections/MemberDetails/PrimeBorrower/PrimeEligibility'
import JointEligibility from '../sections/MemberDetails/CoBorrower/JointEligibility'

import LoanDetails from '../sections/FinancialDetails/LoanDetails'
import AdditionalInfoPart1 from '../sections/AdditionalInfoAndQuestions/AdditionalInfoPart1'
import AdditionalInfoPart2 from '../sections/AdditionalInfoAndQuestions/AdditionalInfoPart2'
import VerifyPrimeBorrowerDetails from '../sections/MemberDetails/PrimeBorrower/VerifyPrimeBorrowerDetails'

import SopAssetsAndLiabilities from '../sections/FinancialDetails/SopAssetsAndLiabilities'
import SopIncomeAndExpense from '../sections/FinancialDetails/SopIncomeAndExpense'

import ResponsibleLendingQuestions from '../sections/FinancialDetails/SOPRelatedQuestionsSections'
import InstalmentDebit from '../sections/InstalmentDebit'
import Ackwonlegement from '../sections/Ackwonlegement'
import Submission from '../sections/Submission'

export default function MemberDetailsLayout({ cognitoToken, sovereignUser }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const redirect = useSelector((state) => state.globalReducer.redirect)

  const applicationNumber = useSelector((state) => state.submissionReducer.applicationNumber)

  //API States
  const primeclientSearchRequestId = useSelector((state) => state.clientSearchReducer.primecurrentRequestId)
  const primeclientSearchLoading = useSelector((state) => state.clientSearchReducer.primeloading)

  const jointclientSearchRequestId = useSelector((state) => state.clientSearchReducer.jointcurrentRequestId)
  const jointclientSearchLoading = useSelector((state) => state.clientSearchReducer.jointloading)

  // Joint Application Submission
  const onSubmitQuestionJointApplicant = useSelector((state) => state.clientSearchReducer.onSubmitQuestionJointApplicant)
  const isValidQuestionJointApplicant = useSelector((state) => state.clientSearchReducer.isValidQuestionJointApplicant)

  // Loan Details Submission
  const onSubmitLoanDetails = useSelector((state) => state.loanDetailsReducer.onSubmitLoanDetails)
  const isValidLoanDetails = useSelector((state) => state.loanDetailsReducer.isValidLoanDetails)

  // Credit Score Details Submission
  const onSubmitCreditScoreDetails = useSelector((state) => state.creditScoreReducer.onSubmitCreditScoreDetails)
  const isValidCreditScoreDetails = useSelector((state) => state.creditScoreReducer.isValidCreditScoreDetails)

  // Credit Score Details Submission
  const onSubmitAddtionInfoPart2 = useSelector((state) => state.additionalInfoPart2Reducer.onSubmitAddtionInfoPart2)
  const isValidAdditionalInfoPart2 = useSelector((state) => state.additionalInfoPart2Reducer.isValidAdditionalInfoPart2)

  // Credit Score Details Submission
  const onSubmitVerifyPrimeDetails = useSelector((state) => state.verifyPrimeDetailsReducer.onSubmitVerifyPrimeDetails)
  const isValidVerifyPrimeDetails = useSelector((state) => state.verifyPrimeDetailsReducer.isValidVerifyPrimeDetails)

  // Asset
  const isValidAssetDetails = useSelector((state) => state.sopAssetsReducer.isValidAssetDetails)
  const onSubmitAssetDetails = useSelector((state) => state.sopAssetsReducer.onSubmitAssetDetails)

  // Liability
  const isValidLiabilityDetails = useSelector((state) => state.sopLiabilitiesReducer.isValidLiabilityDetails)
  const onSubmitLiabilityDetails = useSelector((state) => state.sopLiabilitiesReducer.onSubmitLiabilityDetails)

  // Income
  const isValidIncomeDetails = useSelector((state) => state.sopIncomeDataGridReducer.isValidIncomeDetails)
  const onSubmitIncomeDetails = useSelector((state) => state.sopIncomeDataGridReducer.onSubmitIncomeDetails)

  // Expense
  const isValidExpenseDetails = useSelector((state) => state.sopExpenseReducer.isValidExpenseDetails)
  const onSubmitExpenseDetails = useSelector((state) => state.sopExpenseReducer.onSubmitExpenseDetails)

  // Responsible Lending Questions
  const isValidResponsibleLending = useSelector((state) => state.sopRelatedQuestionsReducer.isValidResponsibleLending)
  const onSubmitResponsibleLending = useSelector((state) => state.sopRelatedQuestionsReducer.onSubmitResponsibleLending)

  // Privacy Declaration
  const isValidPrivacyActDeclaration = useSelector((state) => state.authorisationReducer.isValidPrivacyActDeclaration)
  const onSubmitPrivacyActDeclaration = useSelector((state) => state.authorisationReducer.onSubmitPrivacyActDeclaration)

  // Privacy Declaration
  const isValidPaymentInstruction = useSelector((state) => state.paymentInstructionReducer.isValidPaymentInstruction)
  const onSubmitPaymentInstruction = useSelector((state) => state.paymentInstructionReducer.onSubmitPaymentInstruction)

  // Mmeber Details state
  const primeid = useSelector((state) => state.clientSearchReducer.primeid)
  const jointid = useSelector((state) => state.clientSearchReducer.jointid)
  const isJointLoan = useSelector((state) => state.clientSearchReducer.isJointLoan)
  const primeIsJoint = primeid === jointid

  const primememberNumberIsEmpty = primeid == null || primeid === ''
  const primememberNumberIsNotEmpty = !(primeid == null) || !(primeid === '')
  const primeatLeastOneReqestMade = !(primeclientSearchRequestId == null)
  const primerequestisNotPending = !(primeclientSearchLoading === 'PENDING')

  const jointmemberNumberIsEmpty = jointid == null || jointid === ''
  const jointmemberNumberIsNotEmpty = !(jointid == null) || !(jointid === '')
  const jointatLeastOneReqestMade = !(jointclientSearchRequestId == null)
  const jointrequestisNotPending = !(jointclientSearchLoading === 'PENDING')

  const numberOfApplicantsNotSelected = (isValidQuestionJointApplicant === false || isValidQuestionJointApplicant == null) && !(onSubmitQuestionJointApplicant == null)

  const primesearchInitiatedAndCompleted = primememberNumberIsNotEmpty && primeatLeastOneReqestMade && primerequestisNotPending
  const primememberNotFound = primememberNumberIsEmpty && primeatLeastOneReqestMade && primerequestisNotPending

  const jointsearchInitiatedAndCompleted = jointmemberNumberIsNotEmpty && jointatLeastOneReqestMade && jointrequestisNotPending
  const jointmemberNotFound = jointmemberNumberIsEmpty && jointatLeastOneReqestMade && jointrequestisNotPending

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (cognitoToken != null && sovereignUser != null) {
      dispatch(globalActions.setCognitoToken(cognitoToken))
      dispatch(globalActions.setSovereignUser(sovereignUser))
      return
    }

    history.push('/')
  }, [])

  const navigation = [
    {
      index: 0,
      stepCount: 1,
      code: 'PBD',
      label: 'Prime Borrower Details',
      role: 'PRIMEB',
      render: <PrimeEligibility />,
      showClientSearchBar: true,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: primesearchInitiatedAndCompleted,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: isJointLoan === 'Y' ? 'Add Joint Applicant' : 'Start Application',
      disableContinueButton: primememberNotFound,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 1,
      stepCount: 2,
      code: 'PRIVDEC',
      label: 'Privacy Declaration',
      role: 'COMM',
      render: <Ackwonlegement />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 2,
      stepCount: 3,
      code: 'LND',
      label: 'Loan Details',
      role: 'COMM',
      render: <LoanDetails />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 3,
      stepCount: 4,
      code: 'ADDQNS1',
      label: 'Additional Information',
      role: 'COMM',
      render: <AdditionalInfoPart1 />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 4,
      stepCount: 5,
      code: 'ADDQNS2',
      label: 'Additional Information 2',
      role: 'COMM',
      render: <AdditionalInfoPart2 />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 5,
      stepCount: 6,
      code: 'VERPRIME',
      label: 'Verify Prime Borrower Details',
      role: 'COMM',
      render: <VerifyPrimeBorrowerDetails />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 7,
      stepCount: 8,
      code: 'ASSETLIAB',
      label: 'Assets and Liabilities',
      role: 'COMM',
      render: <SopAssetsAndLiabilities />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 30,
      showStep: true,
      skipStep: true,
      customContainerWidth: 'xl',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 9,
      stepCount: 10,
      code: 'INCOMEEXP',
      label: 'Income and Expenses',
      role: 'COMM',
      render: <SopIncomeAndExpense />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 30,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'xl',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 10,
      stepCount: 11,
      code: 'RESLEND',
      label: 'Responsible Lending Questions',
      role: 'COMM',
      render: <ResponsibleLendingQuestions />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 11,
      stepCount: 12,
      code: 'PAYINST',
      label: 'Payment Instruction',
      role: 'COMM',
      render: <InstalmentDebit />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: true,
      showBackButton: true,
    },
    {
      index: 12,
      stepCount: 13,
      code: 'SUBLN',
      label: 'Submit Loan App',
      role: 'COMM',
      render: <Submission />,
      showClientSearchBar: false,
      showContinueButton: true,
      paddingToAddToNavigationButtons: 0,
      showStep: true,
      skipStep: false,
      customContainerWidth: 'lg',
      customNextButtonText: null,
      disableContinueButton: false,
      showContinueButton: false,
      showBackButton: applicationNumber == null,
    },
  ]

  const getCurrentStep = navigation.filter((steps) => {
    return steps?.index === activeStep && steps?.skipStep === false
  })

  //* Function to Continue
  function onContinueClick() {
    if (validateFields() === false) return

    //? Logic - set the active step to the minimum index that returns skip === true for index > activeStep
    const stepsRemaining = navigation.filter((children) => {
      return children.index > activeStep && children?.skipStep === false
    })

    setActiveStep(stepsRemaining[0]?.index)
  }

  //* Function To Navigate Back
  function onBackClick() {
    const completedSteps = navigation.filter((children) => {
      return children.index < activeStep && children?.skipStep === false
    })

    const completedStepsLength = completedSteps.length

    if (completedStepsLength === 1) {
      setActiveStep(completedSteps[0]?.index)
    } else {
      setActiveStep(completedSteps[completedStepsLength - 1]?.index)
    }
  }

  function validateFields() {
    if (getCurrentStep[0]?.code === 'PBD') {
      handleQuestionJointApplicantSubmit()
      return isValidQuestionJointApplicant
    }
    if (getCurrentStep[0]?.code === 'PRIVDEC') {
      handlePrivacyDeclaration()
      return isValidPrivacyActDeclaration
    }
    if (getCurrentStep[0]?.code === 'LND') {
      handleLoanDetailsSubmit()
      return isValidLoanDetails
    }
    if (getCurrentStep[0]?.code === 'ADDQNS1') {
      handleAdditionalDetails1Submit()
      return isValidCreditScoreDetails
    }
    if (getCurrentStep[0]?.code === 'ADDQNS2') {
      handleAdditionalDetails2Submit()
      return isValidAdditionalInfoPart2
    }
    if (getCurrentStep[0]?.code === 'VERPRIME') {
      handleVerifyPrimeBorrowerDetails()
      return isValidVerifyPrimeDetails
    }
    if (getCurrentStep[0]?.code === 'ASSETLIAB') {
      handleAssetLiabilityDetails()
      return true
    }
    if (getCurrentStep[0]?.code === 'INCOMEEXP') {
      handleIncomeExpenseDetails()
      return true
    }
    if (getCurrentStep[0]?.code === 'RESLEND') {
      handleResponsibleLendingSubmit()
      return isValidResponsibleLending
    }
    if (getCurrentStep[0]?.code === 'PAYINST') {
      handlePaymentInstructionSubmit()
      return isValidPaymentInstruction
    }
  }

  function handleQuestionJointApplicantSubmit() {
    if (onSubmitQuestionJointApplicant === null) {
      dispatch(clientSearchActions.setOnSubmitQuestionJointApplicant(true))
    } else {
      dispatch(clientSearchActions.setOnSubmitQuestionJointApplicant(!onSubmitQuestionJointApplicant))
    }
  }

  function handleLoanDetailsSubmit() {
    if (onSubmitLoanDetails === null) {
      dispatch(loanDetailsActions.setOnSubmitLoanDetails(true))
    } else {
      dispatch(loanDetailsActions.setOnSubmitLoanDetails(!onSubmitLoanDetails))
    }
  }

  function handleAdditionalDetails1Submit() {
    if (onSubmitCreditScoreDetails === null) {
      dispatch(creditScoreActions.setOnSubmitCreditScoreDetails(true))
    } else {
      dispatch(creditScoreActions.setOnSubmitCreditScoreDetails(!onSubmitCreditScoreDetails))
    }
  }

  function handleAdditionalDetails2Submit() {
    if (onSubmitAddtionInfoPart2 === null) {
      dispatch(additionalInfoPart2Actions.setOnSubmitAddtionInfoPart2(true))
    } else {
      dispatch(additionalInfoPart2Actions.setOnSubmitAddtionInfoPart2(!onSubmitAddtionInfoPart2))
    }
  }

  function handleVerifyPrimeBorrowerDetails() {
    if (onSubmitVerifyPrimeDetails === null) {
      dispatch(verifyPrimeDetailsActions.setOnSubmitVerifyPrimeDetails(true))
    } else {
      dispatch(verifyPrimeDetailsActions.setOnSubmitVerifyPrimeDetails(!onSubmitVerifyPrimeDetails))
    }
  }

  function handleAssetLiabilityDetails() {
    if (onSubmitAssetDetails === null) {
      dispatch(sopAssetActions.setOnSubmitAssetDetails(true))
    } else {
      dispatch(sopAssetActions.setOnSubmitAssetDetails(!onSubmitAssetDetails))
    }

    if (onSubmitLiabilityDetails === null) {
      dispatch(sopLiabilitiesActions.setOnSubmitLiabilityDetails(true))
    } else {
      dispatch(sopLiabilitiesActions.setOnSubmitLiabilityDetails(!onSubmitLiabilityDetails))
    }
  }

  function handleIncomeExpenseDetails() {
    if (onSubmitIncomeDetails === null) {
      dispatch(sopIncomeGridSliceActions.setOnSubmitIncomeDetails(true))
    } else {
      dispatch(sopIncomeGridSliceActions.setOnSubmitIncomeDetails(!onSubmitIncomeDetails))
    }

    if (onSubmitExpenseDetails === null) {
      dispatch(sopExpenseAction.setOnSubmitExpenseDetails(true))
    } else {
      dispatch(sopExpenseAction.setOnSubmitExpenseDetails(!onSubmitExpenseDetails))
    }
  }

  function handleResponsibleLendingSubmit() {
    if (onSubmitResponsibleLending === null) {
      dispatch(sopRelatedQuestionActions.setOnSubmitResponsibleLending(true))
    } else {
      dispatch(sopRelatedQuestionActions.setOnSubmitResponsibleLending(!onSubmitResponsibleLending))
    }
  }

  function handlePrivacyDeclaration() {
    if (onSubmitPrivacyActDeclaration === null) {
      dispatch(authorisationActions.setOnSubmitPrivacyActDeclaration(true))
    } else {
      dispatch(authorisationActions.setOnSubmitPrivacyActDeclaration(!onSubmitPrivacyActDeclaration))
    }
  }

  function handlePaymentInstructionSubmit() {
    if (onSubmitPaymentInstruction === null) {
      dispatch(paymentInstructionActions.setOnSubmitPaymentInstruction(true))
    } else {
      dispatch(paymentInstructionActions.setOnSubmitPaymentInstruction(!onSubmitPaymentInstruction))
    }
  }

  return (
    <Container maxWidth={getCurrentStep[0]?.customContainerWidth == null ? 'lg' : getCurrentStep[0]?.customContainerWidth} sx={{ pr: getCurrentStep[0]?.paddingToAddToNavigationButtons }}>
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pb: 3,
          mt: primesearchInitiatedAndCompleted ? 5 : 0,
        }}
      >
        <Stack direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ width: '100%', ml: 0 }}>
          {getCurrentStep[0]?.code === 'PBD' && getCurrentStep[0]?.showClientSearchBar && (
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{ pb: 5 }}>
              <SearchClientNumber />
              {primesearchInitiatedAndCompleted && primememberNotFound && (
                <Zoom in={primememberNotFound}>
                  <Alert severity='error' color='error'>
                    Member does not exist in the system!
                  </Alert>
                </Zoom>
              )}
            </Stack>
          )}
          {/* {getCurrentStep[0]?.code === 'CBD' && getCurrentStep[0]?.showClientSearchBar && (
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={3} sx={{ pb: 5, pr: getCurrentStep[0]?.paddingToAddToNavigationButtons }}>
              <SearchJointClientNumber />
              {jointsearchInitiatedAndCompleted && jointmemberNotFound && (
                <Zoom in={jointmemberNotFound}>
                  <Alert severity='error' color='error'>
                    <AlertTitle>Member does not exist in the system!</AlertTitle>
                    Please return to previous step and select <strong>No</strong> for the joint applicant question if co-borrower is not in the system.
                  </Alert>
                </Zoom>
              )}
              {jointsearchInitiatedAndCompleted && primeIsJoint && (
                <Zoom in={jointsearchInitiatedAndCompleted && primeIsJoint}>
                  <Alert severity='error' color='error'>
                    <AlertTitle>Co-Borrower should not be same as Prime Borrower!</AlertTitle>
                    Please go to previous step and select <strong>No</strong> for the joint applicant question if co-borrower is not in the system.
                  </Alert>
                </Zoom>
              )}
            </Stack>
          )} */}

          {primesearchInitiatedAndCompleted && (
            <Box
              sx={(theme) => ({
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                alignItems: 'stretch',
                alignContent: 'center',
                justifyContent: 'center',
              })}
            >
              <Paper
                elevation={24}
                sx={{
                  display: 'flex',
                  minWidth: '100%',
                  minHeight: '100%',
                  p: 7,
                  borderRadius: 2,
                  boxShadow: (theme) => theme.customShadows.z20,
                }}
              >
                <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ display: 'flex', flexGrow: 1, width: '100%', maxWidth: '100%', maxHeight: '100%' }}>
                  {getCurrentStep[0]?.showStep && <Box sx={{ width: '100%' }}>{getCurrentStep[0]?.render}</Box>}
                  {!primememberNotFound && primesearchInitiatedAndCompleted && (
                    <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ width: '100%' }}>
                      {getCurrentStep[0]?.showBackButton && (
                        <Button onClick={onBackClick} disabled={getCurrentStep[0]?.index === 0} sx={{ borderRadius: 20, width: '120px' }}>
                          Back
                        </Button>
                      )}
                      {getCurrentStep[0]?.showContinueButton && (
                        <Button onClick={onContinueClick} variant='contained' sx={{ borderRadius: 20, maxWidth: '250px' }} endIcon={<NavigateNextIcon />} disabled={getCurrentStep[0]?.disableContinueButton}>
                          {getCurrentStep[0]?.customNextButtonText == null || getCurrentStep[0]?.customNextButtonText === '' ? 'Continue' : getCurrentStep[0]?.customNextButtonText}
                        </Button>
                      )}
                    </Stack>
                  )}
                </Stack>
              </Paper>
            </Box>
          )}
          {/* {!primememberNotFound && primesearchInitiatedAndCompleted && getCurrentStep[0]?.code === 'PBD' && (
            <>
              <Divider sx={{ width: '40rem' }}>
                <Chip label='Joint Application?' color={numberOfApplicantsNotSelected ? 'error' : isJointLoan === 'Y' ? 'secondary' : 'default'} />
              </Divider>
              <Stack direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%' }}>
                <QuestionJointApplicant />
              </Stack>
            </>
          )} */}
        </Stack>
      </Box>
    </Container>
  )
}
