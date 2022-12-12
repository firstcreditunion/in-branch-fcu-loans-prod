import React, { useEffect } from 'react'
import { Link as RouterLink, Redirect, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

//* Framer
import { motion } from 'framer-motion'

//* MUI
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

//* MUI - Styles
import { styled } from '@mui/material/styles'

//* MUI - Icons
import DoneAllIcon from '@mui/icons-material/DoneAll'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import DirectionsCarRoundedIcon from '@mui/icons-material/DirectionsCarRounded'

//* Redux
import { useDispatch, useSelector } from 'react-redux'

//* Redux - Actions
import { globalActions } from '../../redux/slices/globalSlice'
import { yourPersonalDetailsActions } from '../../redux/slices/yourPersonalDetailsSlice'
import { identificationActions } from '../../redux/slices/identificationSlice'
import { employmentActions } from '../../redux/slices/employmentSlice'
import { contactDetailsActions } from '../../redux/slices/contactDetailsSlice'
import { vehicleSecurityActions } from '../../redux/slices/vehicleSecuritySlice'
import { financialDetailsActions } from '../../redux/slices/financialDetailsSlice'
import { sopAssetLiabilityActions } from '../../redux/slices/sopAssetsLiabilitiesSlice'
import { sopIncomeExpenditureActions } from '../../redux/slices/sopIncomeExpenditureSlice'
import { bankStatementActions } from '../../redux/slices/bankStatementSlice'
import { privacyActDeclarationActions } from '../../redux/slices/privacyActDeclarationSlice'

//* Custom Components
import Page from '../../components/Page'
import Progress from '../../components/Progress'

// **************** Prime Borrower Details **************** //

//* Personal Details
import YourPersonalDetails from '../../forms/PersonalDetails/YourPersonalDetails'
import Identifications from '../../forms/PersonalDetails/Identifications'

//* Employment
import EmploymentStatus from '../../forms/EmploymentDetails/EmploymentStatus'
import EmployementHistory from '../../forms/EmploymentDetails/EmploymentHistory'

//* Contact
import YourContactDetails from '../../forms/ContactDetails/YourContactDetails'
import ResidentialAddress from '../../forms/ContactDetails/ResidentialAddress'
import PreviousResidentialAddress from '../../forms/ContactDetails/PreviousResidentialAddress'

// **************** Joint Applicant Details ******************** //

//* Personal Details
import JointApplicantPersonalDetails from '../../forms/PersonalDetails/JointApplicantPersonalDetails'
import JointApplicantIdentification from '../../forms/PersonalDetails/JointApplicantIdentification'

//* Employment
import JointEmploymentStatus from '../../forms/EmploymentDetails/JointEmploymentStatus'
import JointEmploymentHistory from '../../forms/EmploymentDetails/JointEmploymentHistory'

//* Contact Details
import JointContactDetails from '../../forms/ContactDetails/JointContactDetails'
import JointResidentialAddress from '../../forms/ContactDetails/JointResidentialAddress'
import JointPreviousResidentialAddress from '../../forms/ContactDetails/JointPreviousResidentialAddress'

// **************** Details common to Prime and Joint Applicants ******************** //

//* Security Panels

import VehicleSecurity from '../../forms/Securities/VehicleSecurity'

//* Financial
import LoanDetails from '../../forms/LoanDetails/LoanDetails'
import SopAssetLiability from '../../forms/LoanDetails/SopAssetLiability'
import SopIncomeExpenditure from '../../forms/LoanDetails/SopIncomeExpenditure'

//* Attachments
import BankStatement from '../../forms/attachments/BankStatement'

//* Final
import PrivacyActDeclaration from '../../forms/Final/PrivacyActDeclaration'
import Submission from '../../forms/Final/Submission'

const varButtonClick = {
  hover: { scale: 1.1 },
  tap: { scale: 0.96 },
}

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
  zIndex: 1,
  color: theme.palette.common.white,
  width: 40,
  height: 40,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.secondary.main} 0%, rgb(184, 184, 66) 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main}  100%)`,
  }),
}))

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
}

function ColorlibStepIcon(props) {
  const { active, completed, className } = props

  const icons = {
    1: <PersonRoundedIcon />,
    2: <WorkRoundedIcon />,
    3: <PhoneRoundedIcon />,
    4: <DirectionsCarRoundedIcon />,
    5: <AttachMoneyRoundedIcon />,
    6: <DoneAllIcon />,
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

let numberOfChildren = null
let currentChildCount = null

export default function FirstLoanApplication({ loanAmount, interestRate, term, paymentFrequency, creditCheck, creditSense, motorWebCheck, ppsrRegistration, docuSignSigning, cloudCheckIdVerification, cloudCheckPEP, hasLpiPrimeDeath, hasLpiPrimeDisability, hasLpiPrimeCriticalIllness, hasLpiPrimeBankruptcy, awsCalculatedLpiAmount }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const [progress, setProgress] = React.useState(0)
  const [activeStep, setActiveStep] = React.useState(0)
  const [activeChildNode, setActiveChildNode] = React.useState(0)
  const [isOkayToProceed, setIsOkayToProceed] = React.useState(false)
  const [isPrevNode, setIsPrevNode] = React.useState(null)
  const [numberOfNodes, setNumberOfNodes] = React.useState(5)

  const onMount = useSelector((state) => state.globalReducer.onMount)

  // Listener for Joint Application
  const jointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplication.value)
  const preQualifyCompleted = useSelector((state) => state.lendingCritetiaQnsReducer.preQualifyCompleted)

  // Prime Borrower //
  const listenOnSubmitYourPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.listenOnSubmitYourPersonalDetails)
  const isValidYourPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.isValidYourPersonalDetails)

  const onSubmitIdentificationDetails = useSelector((state) => state.identificationReducer.onSubmitIdentificationDetails)
  const isValidIdentificationDetails = useSelector((state) => state.identificationReducer.isValidIdentificationDetails)

  const onSubmitEmploymentDetails = useSelector((state) => state.employmentReducer.onSubmitEmploymentDetails)
  const isValidEmploymentDetails = useSelector((state) => state.employmentReducer.isValidEmploymentDetails)
  const showEmploymentDetails = useSelector((state) => state.employmentReducer.showEmploymentDetails)
  const showPrevEmp = useSelector((state) => state.employmentReducer.showPrevEmp)

  const onSubmitEmploymentHistory = useSelector((state) => state.employmentReducer.onSubmitEmploymentHistory)
  const isValidEmploymentHistory = useSelector((state) => state.employmentReducer.isValidEmploymentHistory)

  const onSubmitYourContactDetails = useSelector((state) => state.conatctDetailsReducer.onSubmitYourContactDetails)
  const isValidYourContactDetails = useSelector((state) => state.conatctDetailsReducer.isValidYourContactDetails)

  const onSubmitResidenceDetails = useSelector((state) => state.conatctDetailsReducer.onSubmitResidenceDetails)
  const isValidResidenceDetails = useSelector((state) => state.conatctDetailsReducer.isValidResidenceDetails)

  const skipPrevResidence = useSelector((state) => state.conatctDetailsReducer.skipPrevResidence)
  const onSubmitPrevResidenceDetails = useSelector((state) => state.conatctDetailsReducer.onSubmitPrevResidenceDetails)
  const isValidPrevResidenceDetails = useSelector((state) => state.conatctDetailsReducer.isValidPrevResidenceDetails)

  // Joint Applicant //
  const onSubmitJointPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.onSubmitJointPersonalDetails)
  const isValidJointPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.isValidJointPersonalDetails)

  const jointonSubmitIdentificationDetails = useSelector((state) => state.identificationReducer.jointonSubmitIdentificationDetails)
  const jointisValidIdentificationDetails = useSelector((state) => state.identificationReducer.jointisValidIdentificationDetails)

  const jointonSubmitEmploymentDetails = useSelector((state) => state.employmentReducer.jointonSubmitEmploymentDetails)
  const jointisValidEmploymentDetails = useSelector((state) => state.employmentReducer.jointisValidEmploymentDetails)
  const jointshowEmploymentDetails = useSelector((state) => state.employmentReducer.jointshowEmploymentDetails)
  const jointshowPrevEmp = useSelector((state) => state.employmentReducer.jointshowPrevEmp)

  const jointonSubmitEmploymentHistory = useSelector((state) => state.employmentReducer.jointonSubmitEmploymentHistory)
  const jointisValidEmploymentHistory = useSelector((state) => state.employmentReducer.jointisValidEmploymentHistory)

  const jointonSubmitYourContactDetails = useSelector((state) => state.conatctDetailsReducer.jointonSubmitYourContactDetails)
  const jointisValidYourContactDetails = useSelector((state) => state.conatctDetailsReducer.jointisValidYourContactDetails)

  const jointonSubmitResidenceDetails = useSelector((state) => state.conatctDetailsReducer.jointonSubmitResidenceDetails)
  const jointisValidResidenceDetails = useSelector((state) => state.conatctDetailsReducer.jointisValidResidenceDetails)

  const jointskipPrevResidence = useSelector((state) => state.conatctDetailsReducer.jointskipPrevResidence)
  const jointonSubmitPrevResidenceDetails = useSelector((state) => state.conatctDetailsReducer.jointonSubmitPrevResidenceDetails)
  const jointisValidPrevResidenceDetails = useSelector((state) => state.conatctDetailsReducer.jointisValidPrevResidenceDetails)

  //* -----------------  Common ----------------- //

  //* Vehicle Security
  const onSubmitVehicleSecurityDetails = useSelector((state) => state.vehicleSecurityReducer.onSubmitVehicleSecurityDetails)
  const isValidVehicleSecurityDetails = useSelector((state) => state.vehicleSecurityReducer.isValidVehicleSecurityDetails)

  //* Financial Details
  const onSubmitYourFinancialDetails = useSelector((state) => state.financialDetailsReducer.onSubmitYourFinancialDetails)
  const isValidYourFinancialDetails = useSelector((state) => state.financialDetailsReducer.isValidYourFinancialDetails)

  //* Asset-Liability
  const onSubmitSopAssetLiability = useSelector((state) => state.sopAssetLiabilityReducer.onSubmitSopAssetLiability)
  const isValidSopAssetLiability = useSelector((state) => state.sopAssetLiabilityReducer.isValidSopAssetLiability)

  //* Income-Expenditure
  const onSubmitSopIncomeExpenditure = useSelector((state) => state.sopIncomeExpenditureReducer.onSubmitSopIncomeExpenditure)
  const isValidSopIncomeExpenditure = useSelector((state) => state.sopIncomeExpenditureReducer.isValidSopIncomeExpenditure)

  //* Credit Sense and Bank Statement
  const onSubmitBankStatement = useSelector((state) => state.bankStatementReducer.onSubmitBankStatement)
  const isValidBankStatement = useSelector((state) => state.bankStatementReducer.isValidBankStatement)

  //* Privacy declaration
  const onSubmitPrivacyActDeclaration = useSelector((state) => state.privacyDeclarationReducer.onSubmitPrivacyActDeclaration)
  const isValidPrivacyActDeclaration = useSelector((state) => state.privacyDeclarationReducer.isValidPrivacyActDeclaration)

  //* Auth - Guest
  const guestSessionID = useSelector((state) => state.globalReducer.guestSessionID)
  const guestSessionExpiry = useSelector((state) => state.globalReducer.guestSessionExpiry)
  const onlineApplication = useSelector((state) => state.globalReducer.onlineApplication)

  //* First Loan Steps
  const rootNode = [
    {
      step: 0,
      label: 'Personal',
      showStepper: true,
      showProgress: true,
    },
    {
      step: 1,
      label: 'Employment',
      showStepper: true,
      showProgress: true,
    },
    {
      step: 2,
      label: 'Contact',
      showStepper: true,
      showProgress: true,
    },
    {
      step: 3,
      label: 'Loan Security Details',
      showStepper: true,
      showProgress: true,
    },
    {
      step: 4,
      label: 'Financial',
      showStepper: true,
      showProgress: true,
    },
    {
      step: 5,
      label: 'Final',
      showStepper: true,
      showProgress: true,
    },
  ]

  const children = [
    { index: 0, root: 0, code: 'PPD', label: 'Your Personal Details', render: <BankStatement />, fullwidth: false, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Prime' },
    { index: 1, root: 0, code: 'JPD', label: 'Joint Applicant Personal Details', render: <JointApplicantPersonalDetails />, fullwidth: false, showtitle: true, showProgress: true, skipStep: !jointApplication, dataRelatedTo: 'Joint' },
    { index: 2, root: 0, code: 'PAI', label: 'Identifications', render: <Identifications />, fullwidth: false, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Prime' },
    { index: 3, root: 0, code: 'JAI', label: 'Joint Applicant Identifications', render: <JointApplicantIdentification />, fullwidth: false, showtitle: true, showProgress: true, skipStep: !jointApplication, dataRelatedTo: 'Joint' },

    { index: 0, root: 1, code: 'PED', label: 'Employment Details', render: <EmploymentStatus />, fullwidth: false, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Prime' },
    { index: 1, root: 1, code: 'PEH', label: 'Employment History', render: <EmployementHistory />, fullwidth: false, showtitle: true, showProgress: true, skipStep: !showEmploymentDetails || !showPrevEmp, dataRelatedTo: 'Prime' },
    { index: 2, root: 1, code: 'JED', label: 'Joint Applicant Employment Details', render: <JointEmploymentStatus />, fullwidth: false, showtitle: true, showProgress: true, skipStep: !jointApplication, dataRelatedTo: 'Joint' },
    { index: 3, root: 1, code: 'JEH', label: 'Joint Applicant Employment History', render: <JointEmploymentHistory />, fullwidth: false, showtitle: true, showProgress: true, skipStep: !jointApplication || !jointshowEmploymentDetails || !jointshowPrevEmp, dataRelatedTo: 'Joint' },

    { index: 0, root: 2, code: 'PCD', label: 'Your Contact Details', render: <YourContactDetails />, fullwidth: false, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Prime' },
    { index: 1, root: 2, code: 'PRA', label: 'Residential Address', render: <ResidentialAddress />, fullwidth: false, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Prime' },
    { index: 2, root: 2, code: 'PPRA', label: 'Previous Residential Address', render: <PreviousResidentialAddress />, fullwidth: false, showtitle: true, showProgress: true, skipStep: skipPrevResidence, dataRelatedTo: 'Prime' },
    { index: 3, root: 2, code: 'JCD', label: 'Joint Applicant Contact Details', render: <JointContactDetails />, fullwidth: false, showtitle: true, showProgress: true, skipStep: !jointApplication, dataRelatedTo: 'Joint' },
    { index: 4, root: 2, code: 'JRA', label: 'Joint Applicant Residential Address', render: <JointResidentialAddress />, fullwidth: false, showtitle: true, showProgress: true, skipStep: !jointApplication, dataRelatedTo: 'Joint' },
    { index: 5, root: 2, code: 'JPRA', label: 'Joint Applicant Previous Residential Address', render: <JointPreviousResidentialAddress />, fullwidth: false, showtitle: true, showProgress: true, skipStep: !jointApplication || jointskipPrevResidence, dataRelatedTo: 'Joint' },

    { index: 0, root: 3, code: 'PVSD', label: 'Vehicle Details', render: <VehicleSecurity />, fullwidth: false, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Common' },
    { index: 1, root: 3, code: 'PFD', label: 'Financial Details', render: <LoanDetails />, fullwidth: false, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Common' },
    { index: 2, root: 3, code: 'PAL', label: 'Asset and Liabilities', render: <SopAssetLiability />, fullwidth: true, showtitle: false, showProgress: true, skipStep: false, dataRelatedTo: 'Common' },
    { index: 3, root: 3, code: 'PIE', label: 'Income and Expenditure', render: <SopIncomeExpenditure />, fullwidth: true, showtitle: false, showProgress: true, skipStep: false, dataRelatedTo: 'Common' },
    { index: 4, root: 3, code: 'PSTMT', label: 'Bank Statement & Supporting Documents', render: <BankStatement />, fullwidth: true, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Common' },

    { index: 0, root: 4, code: 'PPAD', label: 'Privacy Act Declaration', render: <PrivacyActDeclaration />, fullwidth: true, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Common' },
    { index: 1, root: 4, code: 'SUB', label: 'Submission', render: <Submission />, fullwidth: false, showtitle: true, showProgress: true, skipStep: false, dataRelatedTo: 'Common' },
  ]

  const currentChildrenSteps = children.filter((child) => {
    return child.skipStep === false && child.root === activeStep
  })

  const childrenSteps = children.filter((child) => {
    return child.skipStep === false
  })

  // ******* Functions to handle Submission for forms *******

  // ******* Prime Borrower ******* //

  //* Personal details Submission
  const handleYourPersonalDetailsSubmit = () => {
    if (listenOnSubmitYourPersonalDetails === null) {
      dispatch(yourPersonalDetailsActions.setOnSubmitYourPersonalDetails(true))
    } else {
      dispatch(yourPersonalDetailsActions.setOnSubmitYourPersonalDetails(!listenOnSubmitYourPersonalDetails))
    }
  }

  //* Identification details Submission
  const handleYourIdentificationSubmit = () => {
    if (onSubmitIdentificationDetails === null) {
      dispatch(identificationActions.setOnSubmitIdentificationDetails(true))
    } else {
      dispatch(identificationActions.setOnSubmitIdentificationDetails(!onSubmitIdentificationDetails))
    }
  }

  //* Employment details Submission
  const handleEmploymentDetailsSubmit = () => {
    if (onSubmitEmploymentDetails === null) {
      dispatch(employmentActions.setOnSubmitEmploymentDetails(true))
    } else {
      dispatch(employmentActions.setOnSubmitEmploymentDetails(!onSubmitEmploymentDetails))
    }
  }

  //* Employment History Submission
  const handleEmploymentHistorySubmit = () => {
    if (onSubmitEmploymentHistory === null) {
      dispatch(employmentActions.setOnSubmitEmploymentHistory(true))
    } else {
      dispatch(employmentActions.setOnSubmitEmploymentHistory(!onSubmitEmploymentHistory))
    }
  }

  //* Contact details Submission
  const handleContactDetailsSubmit = () => {
    if (onSubmitYourContactDetails === null) {
      dispatch(contactDetailsActions.setOnSubmitYourContactDetails(true))
    } else {
      dispatch(contactDetailsActions.setOnSubmitYourContactDetails(!onSubmitYourContactDetails))
    }
  }

  //* Current Residence Submission
  const handleResidenceSubmit = () => {
    if (onSubmitResidenceDetails === null) {
      dispatch(contactDetailsActions.setOnSubmitResidenceDetails(true))
    } else {
      dispatch(contactDetailsActions.setOnSubmitResidenceDetails(!onSubmitResidenceDetails))
    }
  }

  //* Previous Residence Submission
  const handlePreviousResidenceSubmit = () => {
    if (onSubmitPrevResidenceDetails === null) {
      dispatch(contactDetailsActions.setOnSubmitPrevResidenceDetails(true))
    } else {
      dispatch(contactDetailsActions.setOnSubmitPrevResidenceDetails(!onSubmitPrevResidenceDetails))
    }
  }

  // ******* Joint Applicant ******* //

  //* Personal details Submission
  const handleJointPersonalDetailsSubmit = () => {
    if (onSubmitJointPersonalDetails === null) {
      dispatch(yourPersonalDetailsActions.setOnSubmitJointPersonalDetails(true))
    } else {
      dispatch(yourPersonalDetailsActions.setOnSubmitJointPersonalDetails(!onSubmitJointPersonalDetails))
    }
  }

  //* Identification Submission
  const handleJointIdentificationDetailsSubmit = () => {
    if (jointonSubmitIdentificationDetails === null) {
      dispatch(identificationActions.setOnSubmitJointIdentificationDetails(true))
    } else {
      dispatch(identificationActions.setOnSubmitJointIdentificationDetails(!jointonSubmitIdentificationDetails))
    }
  }

  //* Employment details Submission
  const handleJointEmploymentDetailsSubmit = () => {
    if (jointonSubmitEmploymentDetails === null) {
      dispatch(employmentActions.setJointOnSubmitEmploymentDetails(true))
    } else {
      dispatch(employmentActions.setJointOnSubmitEmploymentDetails(!jointonSubmitEmploymentDetails))
    }
  }

  //* Employment History Submission
  const handleJointEmploymentHistorySubmit = () => {
    if (jointonSubmitEmploymentHistory === null) {
      dispatch(employmentActions.setJointOnSubmitEmploymentHistory(true))
    } else {
      dispatch(employmentActions.setJointOnSubmitEmploymentHistory(!jointonSubmitEmploymentHistory))
    }
  }

  //* Contact details Submission
  const handleJointContactDetailsSubmit = () => {
    if (jointonSubmitYourContactDetails === null) {
      dispatch(contactDetailsActions.setJointOnSubmitYourContactDetails(true))
    } else {
      dispatch(contactDetailsActions.setJointOnSubmitYourContactDetails(!jointonSubmitYourContactDetails))
    }
  }

  //* Current Residence Submission
  const handleJointResidenceSubmit = () => {
    if (jointonSubmitResidenceDetails === null) {
      dispatch(contactDetailsActions.setJointOnSubmitResidenceDetails(true))
    } else {
      dispatch(contactDetailsActions.setJointOnSubmitResidenceDetails(!jointonSubmitResidenceDetails))
    }
  }

  //* Previous Residence Submission
  const handleJointPreviousResidenceSubmit = () => {
    if (jointonSubmitPrevResidenceDetails === null) {
      dispatch(contactDetailsActions.setJointOnSubmitPrevResidenceDetails(true))
    } else {
      dispatch(contactDetailsActions.setJointOnSubmitPrevResidenceDetails(!jointonSubmitPrevResidenceDetails))
    }
  }

  // ******* Common for Prime and Joint applicants ******* //

  //* Vehicle Security details Submission
  const handleVehicleDetailsSubmit = () => {
    if (onSubmitVehicleSecurityDetails === null) {
      dispatch(vehicleSecurityActions.setOnSubmitVehicleSecurityDetails(true))
    } else {
      dispatch(vehicleSecurityActions.setOnSubmitVehicleSecurityDetails(!onSubmitVehicleSecurityDetails))
    }
  }

  //* Financial details Submission
  const handleFinancialDetailsSubmit = () => {
    if (onSubmitYourFinancialDetails === null) {
      dispatch(financialDetailsActions.setOnSubmitYourFinancialDetails(true))
    } else {
      dispatch(financialDetailsActions.setOnSubmitYourFinancialDetails(!onSubmitYourFinancialDetails))
    }
  }

  //* Asset and Liability Submission
  const handleSopAssetLiabilitySubmit = () => {
    if (onSubmitSopAssetLiability === null) {
      dispatch(sopAssetLiabilityActions.setOnSubmitSopAssetLiabilityDetails(true))
    } else {
      dispatch(sopAssetLiabilityActions.setOnSubmitSopAssetLiabilityDetails(!onSubmitSopAssetLiability))
    }
  }

  //* Income and Expenditure Submission
  const handleSopIncomeExpenditureSubmit = () => {
    if (onSubmitSopIncomeExpenditure === null) {
      dispatch(sopIncomeExpenditureActions.setOnSubmitSopIncomeExpenditureDetails(true))
    } else {
      dispatch(sopIncomeExpenditureActions.setOnSubmitSopIncomeExpenditureDetails(!onSubmitSopIncomeExpenditure))
    }
  }

  //* Credit Sense or Bank Statement
  const handleCreditSenseOrBankStatement = () => {
    if (onSubmitBankStatement === null) {
      dispatch(bankStatementActions.setOnSubmitBankStatements(true))
    } else {
      dispatch(bankStatementActions.setOnSubmitBankStatements(!onSubmitBankStatement))
    }
  }

  //* Privacy Act Declaration Submission
  const handlePrivacyActDeclarationSubmit = () => {
    if (onSubmitPrivacyActDeclaration === null) {
      dispatch(privacyActDeclarationActions.setOnSubmitPrivacyActDeclaration(true))
    } else {
      dispatch(privacyActDeclarationActions.setOnSubmitPrivacyActDeclaration(!onSubmitPrivacyActDeclaration))
    }
  }

  // ************* Function that triggers submission based on which step the user is curretly submitting ******** //
  const validateFields = () => {
    //* Personal
    if (getCurrentStep()?.code === 'PPD') {
      handleYourPersonalDetailsSubmit()
      return isValidYourPersonalDetails
    }

    if (getCurrentStep()?.code === 'JPD') {
      handleJointPersonalDetailsSubmit()
      return isValidJointPersonalDetails
    }

    //* Identification
    if (getCurrentStep()?.code === 'PAI') {
      handleYourIdentificationSubmit()
      return isValidIdentificationDetails
    }

    if (getCurrentStep()?.code === 'JAI') {
      handleJointIdentificationDetailsSubmit()
      return jointisValidIdentificationDetails
    }

    //* EmploymentDetails
    if (getCurrentStep()?.code === 'PED') {
      handleEmploymentDetailsSubmit()
      return isValidEmploymentDetails
    }

    if (getCurrentStep()?.code === 'JED') {
      handleJointEmploymentDetailsSubmit()
      return jointisValidEmploymentDetails
    }

    //* Employment History
    if (getCurrentStep()?.code === 'PEH') {
      handleEmploymentHistorySubmit()
      return isValidEmploymentHistory
    }

    if (getCurrentStep()?.code === 'JEH') {
      handleJointEmploymentHistorySubmit()
      return jointisValidEmploymentHistory
    }

    //* Contact Details
    if (getCurrentStep()?.code === 'PCD') {
      handleContactDetailsSubmit()
      return isValidYourContactDetails
    }

    if (getCurrentStep()?.code === 'JCD') {
      handleJointContactDetailsSubmit()
      return jointisValidYourContactDetails
    }

    //* Current Residence
    if (getCurrentStep()?.code === 'PRA') {
      handleResidenceSubmit()
      return isValidResidenceDetails
    }

    if (getCurrentStep()?.code === 'JRA') {
      handleJointResidenceSubmit()
      return jointisValidResidenceDetails
    }

    //* Previous Residence
    if (getCurrentStep()?.code === 'PPRA') {
      handlePreviousResidenceSubmit()
      return isValidPrevResidenceDetails
    }

    if (getCurrentStep()?.code === 'JPRA') {
      handleJointPreviousResidenceSubmit()
      return jointisValidPrevResidenceDetails
    }

    //* Financial
    if (getCurrentStep()?.code === 'PVSD') {
      handleVehicleDetailsSubmit()
      return isValidVehicleSecurityDetails
    }

    //* Financial
    if (getCurrentStep()?.code === 'PFD') {
      handleFinancialDetailsSubmit()
      return isValidYourFinancialDetails
    }

    //* Statement of Position - Asset and Liability
    if (getCurrentStep()?.code === 'PAL') {
      handleSopAssetLiabilitySubmit()
      return isValidSopAssetLiability
    }

    //* Statement of Position - Income and Expenditure
    if (getCurrentStep()?.code === 'PIE') {
      handleSopIncomeExpenditureSubmit()
      return isValidSopIncomeExpenditure
    }

    if (getCurrentStep()?.code === 'PSTMT') {
      handleCreditSenseOrBankStatement()
      return isValidBankStatement
    }

    if (getCurrentStep()?.code === 'PPAD') {
      handlePrivacyActDeclarationSubmit()
      return isValidPrivacyActDeclaration
    }
  }

  // **************** Navigation Handlers *********** //

  const changeChildNodeNext = () => {
    if (activeChildNode === currentChildrenSteps.length - 1) {
      handleRootNodeNext()
      handleChildNodeNext_NextRootNode()
    } else {
      handleChildNodeNext_CurrentRootNode()
    }
  }

  //* Navigates to next main step
  const handleNextCurrentStep = () => {
    setIsOkayToProceed(validateFields())
  }

  //* Navigates to previous main step
  const handleBackCurrentStep = () => {
    if (activeChildNode === 0) {
      handleRootNodeBack()
      return
    }

    if (activeChildNode != 0) {
      handleChildNodeBack_CurrentNode()
      return
    }
  }

  //* Point to next node
  const handleRootNodeNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    // setProgress(((activeStep + 1) / numberOfChildren) * 100)
  }

  //* Point to previous node
  const handleRootNodeBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setIsPrevNode(!isPrevNode)
  }

  //* Point to next child node in current node
  const handleChildNodeNext_CurrentRootNode = () => {
    setActiveChildNode((prevActiveChildNode) => prevActiveChildNode + 1)
  }

  //* Point to first child node in the next root node
  const handleChildNodeNext_NextRootNode = () => {
    setActiveChildNode(0)
  }

  const handleChildNodeBack_PreviousRootNode = () => {
    const childNode = currentChildrenSteps.length - 1
    setActiveChildNode(childNode)
  }

  //* Point to previous child node in current node
  const handleChildNodeBack_CurrentNode = () => {
    setActiveChildNode((prevActiveChildNode) => prevActiveChildNode - 1)
  }

  function getRootNode() {
    return rootNode.find(({ step }) => step === activeStep)
  }

  function getCurrentStep() {
    return currentChildrenSteps[activeChildNode]
  }

  useEffect(() => {
    if (!(preQualifyCompleted == null)) {
      numberOfChildren = childrenSteps?.length
      currentChildCount = activeChildNode + 1
      return null
    }

    // history.push('/application/prequalify')
  }, [])

  useEffect(() => {
    if (!preQualifyCompleted) return

    if (onMount) {
      dispatch(financialDetailsActions.setLoanAmount(loanAmount))
      dispatch(financialDetailsActions.setInterestRate(interestRate))
      dispatch(financialDetailsActions.setTerm(term))
      dispatch(financialDetailsActions.setPaymentFrequency(paymentFrequency))

      //* Lost Cost Recovery Fees
      dispatch(financialDetailsActions.setCreditCheckFee(creditCheck))
      dispatch(financialDetailsActions.setCreditSenseFee(creditSense))
      dispatch(financialDetailsActions.setMotorwebCheckFee(motorWebCheck))
      dispatch(financialDetailsActions.setPPSRFee(ppsrRegistration))
      dispatch(financialDetailsActions.setDocusignFee(docuSignSigning))
      dispatch(financialDetailsActions.setcCloudCheckIdVerificationFee(cloudCheckIdVerification))
      dispatch(financialDetailsActions.setCloudCheckPEPSanctionsFee(cloudCheckPEP))

      //* LPI Components Chosen in the Financial Calculator panel
      dispatch(financialDetailsActions.sethasLpiPrimeDeath(hasLpiPrimeDeath))
      dispatch(financialDetailsActions.sethasLpiPrimeDisability(hasLpiPrimeDisability))
      dispatch(financialDetailsActions.sethasLpiPrimeBankruptcy(hasLpiPrimeBankruptcy))
      dispatch(financialDetailsActions.sethasLpiPrimeCriticalIllness(hasLpiPrimeCriticalIllness))

      //* LPI
      dispatch(financialDetailsActions.setAwsCalculatedLpiAmount(awsCalculatedLpiAmount))

      dispatch(globalActions.setOnMount(false))
    }
  }, [onMount])

  useEffect(() => {
    if (isPrevNode != null) {
      handleChildNodeBack_PreviousRootNode()
      currentChildCount = currentChildCount - 1
      setProgress((currentChildCount / numberOfChildren) * 100)
    }
  }, [isPrevNode])

  useEffect(() => {
    if (isOkayToProceed) {
      changeChildNodeNext()
      setIsOkayToProceed(!isOkayToProceed)
      currentChildCount = currentChildCount + 1
      setProgress((currentChildCount / numberOfChildren) * 100)
      return
    }
  }, [isOkayToProceed])

  return (
    <RootStyle title='Personal Loan Application | FCU'>
      <Box
        component={motion.div}
        sx={{
          minHeight: '100vh',
          margin: 0,
        }}
      >
        <Box sx={{ pt: 3 }}>
          <Container maxWidth='lg' disableGutters={downSm ? true : false}>
            <Card square={downSm ? true : false} elevation={downSm ? 0 : 1} sx={{ pb: 5, px: downSm ? 0 : 3 }}>
              {getRootNode().showProgress && (
                <Box>
                  <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
                    <Grid item xs={12}>
                      <Progress progressProp={{ label: 'Progress', value: progress }} />
                    </Grid>
                  </Grid>
                </Box>
              )}
              <Box sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', pb: 3 }}>
                <Grid item container direction='column' alignItems='center' justifyContent='center' spacing={2} sx={{ width: '100%', ml: 0, my: 2 }}>
                  <Grid
                    item
                    sx={(theme) => ({
                      mb: theme.breakpoints.down('md') ? 0 : 2,
                    })}
                  >
                    {getCurrentStep()?.showtitle && (
                      <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
                        <Typography variant='h6'>{getCurrentStep()?.label}</Typography>
                        {getCurrentStep()?.dataRelatedTo === 'Prime' && <Chip color='primary' size={downSm ? 'small' : 'medium'} icon={<PersonRoundedIcon />} label='Prime Applicant' />}
                        {getCurrentStep()?.dataRelatedTo === 'Joint' && <Chip color='secondary' size={downSm ? 'small' : 'medium'} icon={<PeopleAltRoundedIcon />} label='Joint Applicant' />}
                      </Stack>
                    )}
                  </Grid>
                  <Box
                    sx={(theme) => ({
                      display: 'flex',
                      width: downMd || getCurrentStep()?.fullwidth ? '90%' : '50%',
                      p: downMd ? (downSm ? 0 : 2) : 3,
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      alignContent: 'center',
                    })}
                  >
                    {getCurrentStep()?.render}
                  </Box>
                </Grid>
              </Box>
              {getCurrentStep()?.code !== 'SUB' && (
                <Stack direction='row' justifyContent={downSm ? 'center' : 'space-between'} alignItems='center' spacing={3}>
                  <Button color='inherit' disabled={activeStep === 0 && activeChildNode === 0} onClick={handleBackCurrentStep} sx={{ mr: 1 }}>
                    Back
                  </Button>
                  <Button
                    component={motion.button}
                    variants={varButtonClick}
                    endIcon={<NavigateNextRoundedIcon />}
                    whileHover='hover'
                    whileTap='tap'
                    disabled={getCurrentStep()?.label === 'Submission'}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'common.white',
                      borderRadius: '49px',
                      width: '100px',
                      border: 'none',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      transition: '.5s',
                    }}
                    variant='contained'
                    onClick={handleNextCurrentStep}
                  >
                    Next
                  </Button>
                </Stack>
              )}
            </Card>
          </Container>
        </Box>
      </Box>
    </RootStyle>
  )
}
