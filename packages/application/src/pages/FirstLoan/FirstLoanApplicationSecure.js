import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

//Framer
import { motion } from 'framer-motion'
import { varFade, varBounce } from '../../components/ui/animate'

// MUI
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

// MUI - Cards
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'

// MUI - Styles
import { styled } from '@mui/material/styles'

// MUI - Icons
import AddIcon from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// Redux - Actions
import { globalActions } from '../../redux/slices/globalSlice'
import { yourPersonalDetailsActions } from '../../redux/slices/yourPersonalDetailsSlice'
import { identificationActions } from '../../redux/slices/identificationSlice'
import { employmentActions } from '../../redux/slices/employmentSlice'
import { contactDetailsActions } from '../../redux/slices/contactDetailsSlice'
import { financialDetailsActions } from '../../redux/slices/financialDetailsSlice'
import { sopAssetLiabilityActions } from '../../redux/slices/sopAssetsLiabilitiesSlice'
import { sopIncomeExpenditureActions } from '../../redux/slices/sopIncomeExpenditureSlice'
import { privacyActDeclarationActions } from '../../redux/slices/privacyActDeclarationSlice'

// Custom Components
import Page from '../../components/Page'
import Progress from '../../components/Progress'
import MobileProgress from '../../components/MobileProgress'

// Display Panels
import PersonalDetails from '../../sections/DataDisplaySecure/PersonalDetails'
import Identification from '../../sections/DataDisplaySecure/Identification'
import ContactDetails from '../../sections/DataDisplaySecure/ContactDetails'
import EmploymentDetails from '../../sections/DataDisplaySecure/EmploymentDetails'
import ResidentialDetails from '../../sections/DataDisplaySecure/ResidentialDetails'

// Edit Panels - Prime Applicant
import YourPersonalDetails from '../../forms/PersonalDetails/YourPersonalDetails'
import Identifications from '../../forms/PersonalDetails/Identifications'
import YourContactDetails from '../../forms/ContactDetails/YourContactDetails'
import EmploymentStatus from '../../forms/EmploymentDetails/EmploymentStatus'
import EmploymentHistory from '../../forms/EmploymentDetails/EmploymentHistory'
import ResidentialAddress from '../../forms/ContactDetails/ResidentialAddress'
import PreviousResidentialAddress from '../../forms/ContactDetails/PreviousResidentialAddress'

// Edit Panels - Joint Applicant
import JointApplicantPersonalDetails from '../../forms/PersonalDetails/JointApplicantPersonalDetails'
import JointApplicantIdentification from '../../forms/PersonalDetails/JointApplicantIdentification'
import JointContactDetails from '../../forms/ContactDetails/JointContactDetails'
import JointEmploymentStatus from '../../forms/EmploymentDetails/JointEmploymentStatus'
import JointEmploymentHistory from '../../forms/EmploymentDetails/JointEmploymentHistory'
import JointResidentialAddress from '../../forms/ContactDetails/JointResidentialAddress'
import JointPreviousResidentialAddress from '../../forms/ContactDetails/JointPreviousResidentialAddress'

// Common Panels for Prime and Joint
import LoanDetails from '../../forms/LoanDetails/LoanDetails'
import SopAssetLiability from '../../forms/LoanDetails/SopAssetLiability'
import SopIncomeExpenditure from '../../forms/LoanDetails/SopIncomeExpenditure'
import PrivacyActDeclaration from '../../forms/Final/PrivacyActDeclaration'
import Submission from '../../forms/Final/Submission'

const RootStyle = styled(Page)(({ theme }) => ({
  paddingBottom: theme.spacing(15),
}))

export default function FirstLoanApplicationSecure({ loanAmount, interestRate, term, paymentFrequency }) {
  const dispatch = useDispatch()
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const [stepsToRender, setStepsToRender] = React.useState(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const [activeStepToRender, setActiveStepToRender] = React.useState(0)
  const [activeStep, setActiveStep] = React.useState(0)
  const [activeChildNode, setActiveChildNode] = React.useState(0)
  const [isOkayToProceed, setIsOkayToProceed] = React.useState(false)
  const [isPrevNode, setIsPrevNode] = React.useState(null)
  const [numberOfNodes, setNumberOfNodes] = React.useState(7)

  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  // >>>>>>>>>>>>>>> Redux Selectors - Data Verification <<<<<<<<<<<<<<<<<<< //

  // Personal Detail Selectors - Data Verification //

  const validSovereignPersonalDetailsTitle = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsTitle)
  const validSovereignPersonalDetailsForenames = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsForenames)
  const validSovereignPersonalDetailsSurname = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsSurname)
  const validSovereignPersonalDetailsGender = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsGender)
  const validSovereignPersonalDetailsDob = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsDob)
  const validSovereignPersonalDetailsMaritalStatus = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetailsMaritalStatus)
  const validSovereignPersonalDetails = useSelector((state) => state.yourPersonalDetailReducer.validSovereignPersonalDetails)
  const verifiedPersonalDetailsSecure = useSelector((state) => state.yourPersonalDetailReducer.verifiedPersonalDetailsSecure)

  // Identification Selectors - Data Verification //

  const isValidDrLicenceDetails = useSelector((state) => state.identificationReducer.isValidDrLicenceDetails)
  const isValidSovDriversLicence = useSelector((state) => state.identificationReducer.isValidSovDriversLicence)
  const isValidSovPassport = useSelector((state) => state.identificationReducer.isValidSovPassport)
  const isValidSovFireArmsLicence = useSelector((state) => state.identificationReducer.isValidSovFireArmsLicence)
  const isValidSovKiwiAccessCard = useSelector((state) => state.identificationReducer.isValidSovKiwiAccessCard)
  const isValidSovCommunityServiceCard = useSelector((state) => state.identificationReducer.isValidSovCommunityServiceCard)
  const isValidSovBirthCertificate = useSelector((state) => state.identificationReducer.isValidSovBirthCertificate)
  const isValidSovCurrentStudentID = useSelector((state) => state.identificationReducer.isValidSovCurrentStudentID)
  const isValidSovGoldCard = useSelector((state) => state.identificationReducer.isValidSovGoldCard)

  const idSelected = useSelector((state) => state.identificationReducer.idSelected)
  const idsInSovereignOnMount = useSelector((state) => state.identificationReducer.idsInSovereignOnMount)
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)
  const verifiedIdentificationDetailsSecure = useSelector((state) => state.identificationReducer.verifiedIdentificationDetailsSecure)

  const identificationValidation = [
    {
      idType: 'DRVLSC',
      isValid: isValidDrLicenceDetails,
    },
    {
      idType: 'PASPRT',
      isValid: isValidSovPassport,
    },
    {
      idType: 'FIRELICENS',
      isValid: isValidSovFireArmsLicence,
    },
    {
      idType: 'KIWACCCRD',
      isValid: isValidSovKiwiAccessCard,
    },
    {
      idType: 'COMSERVCRD',
      isValid: isValidSovCommunityServiceCard,
    },
    {
      idType: 'BIRTHCERT',
      isValid: isValidSovBirthCertificate,
    },
    {
      idType: 'CURSTUDID',
      isValid: isValidSovCurrentStudentID,
    },
    {
      idType: 'GOLDCARD',
      isValid: isValidSovGoldCard,
    },
  ]

  const selectedIdentificationValidation = identificationValidation
    .filter((identification) => {
      return checkedIdentificationTypes.includes(identification?.idType)
    })
    .map((item) => {
      return item?.isValid
    })

  function customValidationtextIdentification() {
    if (idsInSovereignOnMount < 1) {
      return {
        customValidation: true,
        severity: 'info',
        text: <Typography variant='caption'>Please add your identification details!</Typography>,
      }
    }

    if ((!checkedIdentificationTypes.includes('PASPRT') || !checkedIdentificationTypes.includes('FIRELICENS')) && idsInSovereignOnMount === 1) {
      return {
        customValidation: true,
        severity: 'warning',
        text: (
          <Typography variant='caption'>
            <strong>One</strong> more identification required!
          </Typography>
        ),
      }
    }

    return { customValidation: false, severity: 'success', text: '' }
  }

  // Current Employment Selectors - Data Verification //

  const sovHasCurrentEmpDetails = useSelector((state) => state.employmentReducer.sovHasCurrentEmpDetails)
  const isValidCurrentEmployment = useSelector((state) => state.employmentReducer.isValidCurrentEmployment)

  // Previous Employment Selectors - Data Verification //

  const sovHasPreviousEmpDetails = useSelector((state) => state.employmentReducer.sovHasPreviousEmpDetails)
  const isValidPreviousEmployment = useSelector((state) => state.employmentReducer.isValidPreviousEmployment)

  const verifiedEmploymentnDetailsSecure = useSelector((state) => state.employmentReducer.verifiedEmploymentnDetailsSecure)

  // Contact details Selectors - Data Verification //
  const numberOfContactMethods = useSelector((state) => state.conatctDetailsReducer.numberOfContactMethods)
  const isValidSovContactMethods = useSelector((state) => state.conatctDetailsReducer.isValidSovContactMethods)
  const verifiedContactDetailsSecure = useSelector((state) => state.conatctDetailsReducer.verifiedContactDetailsSecure)

  const currResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.currResEffectiveDate)

  function customValidationtextContactDetails() {
    if (numberOfContactMethods === 0) {
      return {
        customValidation: true,
        severity: 'info',
        text: (
          <Typography variant='caption'>
            <strong>Two</strong> valid contact methods are required.
          </Typography>
        ),
      }
    }

    if (numberOfContactMethods <= 1) {
      return {
        customValidation: true,
        severity: 'warning',
        text: (
          <Typography variant='caption'>
            <strong>One</strong> more contact method required!
          </Typography>
        ),
      }
    }

    return { customValidation: false, severity: 'success', text: '' }
  }

  // Residential details Selectors - Data Verification //
  const isValidSovCurrentResidentialDetails = useSelector((state) => state.conatctDetailsReducer.isValidSovCurrentResidentialDetails)
  const isValidSovPreviousResidentialDetails = useSelector((state) => state.conatctDetailsReducer.isValidSovPreviousResidentialDetails)

  const sovHasCurrentResidentialDetails = useSelector((state) => state.conatctDetailsReducer.sovHasCurrentResidentialDetails)
  const sovHasPreviousResidentialDetails = useSelector((state) => state.conatctDetailsReducer.sovHasPreviousResidentialDetails)

  const verifiedResidentialDetailsSecure = useSelector((state) => state.conatctDetailsReducer.verifiedResidentialDetailsSecure)

  // Redux Selectors - Navigation - Prime Borrower

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

  // Redux Selectors - Navigation - Co Borrower

  const jointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplication?.value)
  const jointApplicantClientNo = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplicantClientNo)

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

  // Redux Selector - Navigation - Common

  const onSubmitYourFinancialDetails = useSelector((state) => state.financialDetailsReducer.onSubmitYourFinancialDetails)
  const isValidYourFinancialDetails = useSelector((state) => state.financialDetailsReducer.isValidYourFinancialDetails)

  const onSubmitSopAssetLiability = useSelector((state) => state.sopAssetLiabilityReducer.onSubmitSopAssetLiability)
  const isValidSopAssetLiability = useSelector((state) => state.sopAssetLiabilityReducer.isValidSopAssetLiability)

  const onSubmitSopIncomeExpenditure = useSelector((state) => state.sopIncomeExpenditureReducer.onSubmitSopIncomeExpenditure)
  const isValidSopIncomeExpenditure = useSelector((state) => state.sopIncomeExpenditureReducer.isValidSopIncomeExpenditure)

  const onSubmitPrivacyActDeclaration = useSelector((state) => state.privacyDeclarationReducer.onSubmitPrivacyActDeclaration)
  const isValidPrivacyActDeclaration = useSelector((state) => state.privacyDeclarationReducer.isValidPrivacyActDeclaration)

  // First Loan Steps

  const rootNode = [
    {
      step: 0,
      label: 'Personal',
      icon: <PersonRoundedIcon color='secondary' />,
      skipStep: false,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 1,
      label: 'Identification',
      icon: <BadgeRoundedIcon color='secondary' />,
      skipStep: false,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 2,
      label: 'Employment',
      icon: <WorkRoundedIcon color='secondary' />,
      skipStep: false,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 3,
      label: 'Contact',
      icon: <CallRoundedIcon color='secondary' />,
      skipStep: false,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 4,
      label: 'Residence',
      icon: <HomeRoundedIcon color='secondary' />,
      skipStep: false,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 5,
      label: 'Joint Applicant Personal',
      icon: <HomeRoundedIcon color='secondary' />,
      skipStep: !jointApplication,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 6,
      label: 'Joint Applicant Identification',
      icon: <HomeRoundedIcon color='secondary' />,
      skipStep: !jointApplication,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 7,
      label: 'Joint Applicant Employment',
      icon: <HomeRoundedIcon color='secondary' />,
      skipStep: !jointApplication,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 8,
      label: 'Joint Applicant Contact',
      icon: <HomeRoundedIcon color='secondary' />,
      skipStep: !jointApplication,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 9,
      label: 'Joint Applicant Residence',
      icon: <HomeRoundedIcon color='secondary' />,
      skipStep: !jointApplication,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 10,
      label: 'Financial',
      icon: <PersonRoundedIcon color='secondary' />,
      skipStep: false,
      showStepper: true,
      showProgress: true,
    },
    {
      step: 11,
      label: 'Final',
      icon: <PersonRoundedIcon color='secondary' />,
      skipStep: false,
      showStepper: true,
      showProgress: true,
    },
  ]

  const children = [
    {
      index: 0,
      root: 0,
      code: 'PPD',
      label: 'Your Personal Details',
      display: <PersonalDetails />,
      edit: <YourPersonalDetails />,
      showEditOnMount: false,
      showEditButton: true,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: verifiedPersonalDetailsSecure && (isValidYourPersonalDetails === null || isValidYourPersonalDetails === true),
      validData: (validSovereignPersonalDetailsTitle && validSovereignPersonalDetailsForenames && validSovereignPersonalDetailsSurname && validSovereignPersonalDetailsGender && validSovereignPersonalDetailsDob && validSovereignPersonalDetailsMaritalStatus) || (isValidYourPersonalDetails === null && validSovereignPersonalDetails === true) || (isValidYourPersonalDetails === true && validSovereignPersonalDetails === true),
      validDataHelperText: 'Please complete the fields marked in red',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: false,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Prime',
    },
    {
      index: 0,
      root: 1,
      code: 'PAI',
      label: 'Identifications',
      display: <Identification />,
      edit: <Identifications />,
      showEditOnMount: idsInSovereignOnMount < 1,
      showEditButton: true,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: verifiedIdentificationDetailsSecure && (isValidIdentificationDetails === null || isValidIdentificationDetails === true),
      validData: !selectedIdentificationValidation.includes(false),
      validDataHelperText: '',
      showCustomValidationText: customValidationtextIdentification()?.customValidation,
      customValidationHelperText: customValidationtextIdentification()?.text,
      customValidationHelperTextSeverity: customValidationtextIdentification()?.severity,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: false,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Prime',
    },
    {
      index: 0,
      root: 2,
      code: 'PED',
      label: 'Employment Details',
      display: <EmploymentDetails />,
      edit: <EmploymentStatus />,
      showEditOnMount: false,
      showEditButton: true,
      changeEditButtonText: (sovHasCurrentEmpDetails === false && sovHasPreviousEmpDetails === false) || sovHasCurrentEmpDetails === false,
      editButtonText: 'Add Employment',
      EditButtonIcon: <AddIcon />,
      proceed: verifiedEmploymentnDetailsSecure && (isValidCurrentEmployment === true || (isValidCurrentEmployment === true && isValidEmploymentDetails === true) || (isValidCurrentEmployment === true && isValidEmploymentDetails === null)) && (isValidPreviousEmployment === true || (isValidPreviousEmployment === true && isValidEmploymentHistory === true) || (isValidPreviousEmployment === true && isValidEmploymentHistory === null)),
      validData: (isValidCurrentEmployment === true || (isValidCurrentEmployment === true && isValidEmploymentDetails === true) || (isValidCurrentEmployment === true && isValidEmploymentDetails === null)) && (isValidPreviousEmployment === true || isValidPreviousEmployment === null || (isValidPreviousEmployment === true && isValidEmploymentHistory === true) || (isValidPreviousEmployment === true && isValidEmploymentHistory === null)),
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: false,
      showAlternateButton: showPrevEmp ? true : false,
      alternateButtonText: 'Next',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Prime',
    },
    {
      index: 1,
      root: 2,
      code: 'PEH',
      label: 'Employment History',
      display: <EmploymentDetails />,
      edit: <EmploymentHistory />,
      showEditOnMount: false,
      showEditButton: true,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: '',
      validData: isValidPreviousEmployment === true || (isValidPreviousEmployment === true && isValidEmploymentHistory === true) || (isValidPreviousEmployment === true && isValidEmploymentHistory === null),
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: !showEmploymentDetails || !showPrevEmp,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Prime',
    },
    {
      index: 0,
      root: 3,
      code: 'PCD',
      label: 'Your Contact Details',
      display: <ContactDetails />,
      edit: <YourContactDetails />,
      showEditOnMount: false,
      showEditButton: true,
      changeEditButtonText: numberOfContactMethods <= 1,
      editButtonText: 'Add Contact',
      EditButtonIcon: <AddIcon />,
      proceed: verifiedContactDetailsSecure && ((numberOfContactMethods >= 2 && isValidSovContactMethods) || (numberOfContactMethods >= 2 && isValidYourContactDetails === true)),
      validData: (numberOfContactMethods >= 2 && isValidSovContactMethods) || (numberOfContactMethods >= 2 && isValidYourContactDetails === true),
      validDataHelperText: '',
      showCustomValidationText: customValidationtextContactDetails()?.customValidation,
      customValidationHelperText: customValidationtextContactDetails()?.text,
      customValidationHelperTextSeverity: customValidationtextContactDetails()?.severity,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: false,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Prime',
    },
    {
      index: 0,
      root: 4,
      code: 'PRA',
      label: 'Residential Address',
      display: <ResidentialDetails />,
      edit: <ResidentialAddress />,
      showEditOnMount: isValidSovCurrentResidentialDetails === false,
      showEditButton: true,
      changeEditButtonText: (sovHasCurrentResidentialDetails === false && sovHasPreviousResidentialDetails === false) || sovHasCurrentResidentialDetails === false,
      editButtonText: 'Add Residence',
      EditButtonIcon: <AddIcon />,
      proceed: verifiedResidentialDetailsSecure && (isValidSovCurrentResidentialDetails === true || (isValidSovCurrentResidentialDetails === true && isValidPrevResidenceDetails === true) || (isValidSovCurrentResidentialDetails === true && isValidPrevResidenceDetails === null)) && (isValidSovPreviousResidentialDetails === true || isValidSovPreviousResidentialDetails === null || (isValidSovPreviousResidentialDetails === true && isValidPrevResidenceDetails === true) || (isValidSovPreviousResidentialDetails === true && isValidPrevResidenceDetails === null)),
      validData: (isValidSovCurrentResidentialDetails === true || (isValidSovCurrentResidentialDetails === true && isValidResidenceDetails === true) || (isValidSovCurrentResidentialDetails === true && isValidResidenceDetails === null)) && (isValidSovPreviousResidentialDetails === true || isValidSovPreviousResidentialDetails === null || (isValidSovPreviousResidentialDetails === true && isValidPrevResidenceDetails === true) || (isValidSovPreviousResidentialDetails === true && isValidPrevResidenceDetails === null)) && sovHasCurrentResidentialDetails === true,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: false,
      showAlternateButton: !skipPrevResidence ? true : false,
      alternateButtonText: 'Next',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Prime',
    },
    {
      index: 1,
      root: 4,
      code: 'PPRA',
      label: 'Previous Residential Address',
      display: <PreviousResidentialAddress />,
      edit: <PreviousResidentialAddress />,
      showEditOnMount: false,
      showEditButton: true,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: '',
      validData: isValidSovPreviousResidentialDetails === true || (isValidSovPreviousResidentialDetails === true && isValidPrevResidenceDetails === true) || (isValidSovPreviousResidentialDetails === true && isValidPrevResidenceDetails === null),
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: skipPrevResidence,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Prime',
    },
    {
      index: 0,
      root: 5,
      code: 'JPD',
      label: 'Joint Applicant Personal Details',
      display: <JointApplicantPersonalDetails />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: isValidJointPersonalDetails,
      validData: isValidJointPersonalDetails,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: !jointApplication,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Joint',
    },
    {
      index: 0,
      root: 6,
      code: 'JAI',
      label: 'Joint Applicant Identification',
      display: <JointApplicantIdentification />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: jointisValidIdentificationDetails,
      validData: jointisValidIdentificationDetails,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: !jointApplication,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Joint',
    },
    {
      index: 0,
      root: 7,
      code: 'JED',
      label: 'Joint Applicant Employment',
      display: <JointEmploymentStatus />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: jointisValidEmploymentDetails,
      validData: jointisValidEmploymentDetails,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: !jointApplication,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Joint',
    },
    {
      index: 1,
      root: 7,
      code: 'JEH',
      label: 'Joint Applicant Employment History',
      display: <JointEmploymentHistory />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: jointisValidEmploymentHistory,
      validData: jointisValidEmploymentHistory,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: !jointApplication || !jointshowEmploymentDetails || !jointshowPrevEmp,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Joint',
    },
    {
      index: 0,
      root: 8,
      code: 'JCD',
      label: 'Joint Applicant Contact',
      display: <JointContactDetails />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: jointisValidYourContactDetails,
      validData: jointisValidYourContactDetails,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: !jointApplication,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Joint',
    },
    {
      index: 0,
      root: 9,
      code: 'JRA',
      label: 'Joint Applicant Residence',
      display: <JointResidentialAddress />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: jointisValidResidenceDetails,
      validData: jointisValidResidenceDetails,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: !jointApplication,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Joint',
    },
    {
      index: 1,
      root: 9,
      code: 'JPRA',
      label: 'Joint Applicant Previous Residence',
      display: <JointPreviousResidentialAddress />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: jointisValidResidenceDetails,
      validData: jointisValidResidenceDetails,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: !jointApplication || jointskipPrevResidence,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Joint',
    },
    {
      index: 0,
      root: 10,
      code: 'PFD',
      label: 'Financial Details',
      display: <LoanDetails />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: isValidYourFinancialDetails,
      validData: isValidYourFinancialDetails,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: false,
      showtitle: true,
      showProgress: true,
      skipStep: false,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Common',
    },
    {
      index: 1,
      root: 10,
      code: 'PAL',
      label: 'Asset and Liabilities',
      display: <SopAssetLiability />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: isValidSopAssetLiability,
      validData: isValidSopAssetLiability,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: true,
      showtitle: false,
      showProgress: true,
      skipStep: false,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Common',
    },
    {
      index: 2,
      root: 10,
      code: 'PIE',
      label: 'Income and Expenditure',
      display: <SopIncomeExpenditure />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: isValidSopIncomeExpenditure,
      validData: isValidSopIncomeExpenditure,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: true,
      showtitle: false,
      showProgress: true,
      skipStep: false,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Common',
    },

    {
      index: 0,
      root: 11,
      code: 'PPAD',
      label: 'Privacy Act Declaration',
      display: <PrivacyActDeclaration />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: isValidPrivacyActDeclaration,
      validData: isValidPrivacyActDeclaration,
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: true,
      showtitle: true,
      showProgress: true,
      skipStep: false,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Common',
    },
    {
      index: 1,
      root: 11,
      code: 'SUB',
      label: 'Submission',
      display: <Submission />,
      edit: false,
      showEditOnMount: false,
      showEditButton: false,
      changeEditButtonText: false,
      editButtonText: '',
      EditButtonIcon: '',
      proceed: '',
      validData: '',
      validDataHelperText: '',
      showCustomValidationText: false,
      customValidationHelperText: null,
      customValidationHelperTextSeverity: null,
      fullwidth: true,
      showtitle: true,
      showProgress: true,
      skipStep: false,
      showAlternateButton: false,
      alternateButtonText: '',
      alternateButtonIcon: <NavigateNextRoundedIcon />,
      dataRelatedTo: 'Common',
    },
  ]

  // >>>>>>>>>>>>>>>>>>>>> Navigation <<<<<<<<<<<<<<<<<<<<<<< //

  const currentChildrenSteps = children.filter((child) => {
    return child.skipStep === false && child.root === activeStep
  })

  const currentRootNode = function getRootNode() {
    return rootNode.find(({ step }) => step === activeStep)
  }

  const currentChild = function getCurrentStep() {
    return currentChildrenSteps[activeChildNode]
  }

  // >>>>>>>>>>>>>>>>>>> on click NEXT handlers <<<<<<<<<<<<<<<<<<<< //

  const handleNext = () => {
    if (activeStepToRender === 2 && activeChildNode === 0) {
      handleRootNodeNext()
      handleChildNodeNext_NextRootNode()
      return
    }

    if (activeStepToRender === 4 && activeChildNode === 0) {
      handleRootNodeNext()
      handleChildNodeNext_NextRootNode()
      return
    }

    if (activeChildNode === currentChildrenSteps.length - 1) {
      handleRootNodeNext()
      handleChildNodeNext_NextRootNode()
    } else {
      handleChildNodeNext_CurrentRootNode()
    }
  }

  // Point to Next Node
  const handleRootNodeNext = () => {
    setActiveStepToRender((prevActiveStepToRender) => prevActiveStepToRender + 1)
  }

  // Point to first child node in the next root node
  const handleChildNodeNext_NextRootNode = () => {
    setActiveChildNode(0)
  }

  // Point to next child node in current node
  const handleChildNodeNext_CurrentRootNode = () => {
    setActiveChildNode((prevActiveChildNode) => prevActiveChildNode + 1)
  }

  // >>>>>>>>>>>>>>>>>>> on click BACK handlers <<<<<<<<<<<<<<<<<<<< //

  const handleBack = () => {
    if (activeStepToRender === 3 && activeChildNode === 0) {
      setActiveStepToRender((prevActiveStepToRender) => prevActiveStepToRender - 1)
      setActiveChildNode(0)
      return
    }
    if (activeStepToRender === 5 && activeChildNode === 0) {
      setActiveStepToRender((prevActiveStepToRender) => prevActiveStepToRender - 1)
      setActiveChildNode(0)
      return
    }

    if (activeChildNode === 0) {
      handleRootNodeBack()
      return
    }

    if (activeChildNode != 0) {
      handleChildNodeBack_CurrentNode()
      return
    }
  }

  // Point to previous node
  const handleRootNodeBack = () => {
    setActiveStepToRender((prevActiveStepToRender) => prevActiveStepToRender - 1)
    setIsPrevNode(!isPrevNode)
  }

  // Point to previous child node in current node
  const handleChildNodeBack_CurrentNode = () => {
    setActiveChildNode((prevActiveChildNode) => prevActiveChildNode - 1)
  }

  const handleChildNodeBack_PreviousRootNode = () => {
    const childNode = currentChildrenSteps?.length - 1
    setActiveChildNode(0)
  }

  // Navigates to next main step
  const handleAlternateButtonAction = () => {
    if (activeStep === 2 && activeChildNode === 0 && showPrevEmp === true) {
      const isValidCurrentEmployment = validateFields()
      if (isValidCurrentEmployment) setActiveChildNode(1)
      return
    }
    if (activeStep === 2 && activeChildNode === 1 && showPrevEmp === true) {
      const isValidPreviousEmployment = validateFields()
      if (isValidPreviousEmployment) setActiveChildNode(0)
      return
    }
    if (activeStep === 4 && activeChildNode === 0 && skipPrevResidence === false) {
      const isValidCurrentResidence = validateFields()
      if (isValidCurrentResidence) setActiveChildNode(1)
      return
    }
    if (activeStep === 4 && activeChildNode === 1 && skipPrevResidence === false) {
      const isValidpreviousResidence = validateFields()
      if (isValidpreviousResidence) setActiveChildNode(0)
      return
    }
  }

  // Navigates to next main step
  const handleSave = () => {
    if (activeStep === 2 && activeChildNode === 1 && showPrevEmp === true) {
      const isValidPreviousEmployment = validateFields()
      if (isValidPreviousEmployment) {
        handleBack()
        setIsEditing(false)
      }
      return
    }

    if (activeStep === 4 && activeChildNode === 1 && skipPrevResidence === false) {
      const isValidPreviousResidence = validateFields()
      if (isValidPreviousResidence) {
        handleBack()
        setIsEditing(false)
      }
      return
    }

    setIsOkayToProceed(validateFields())
  }

  useEffect(() => {
    if (isPrevNode != null) {
      handleChildNodeBack_PreviousRootNode()
    }
  }, [isPrevNode])

  // ******* Functions to handle Submission for forms *******

  // ******* Prime Borrower ******* //

  // Personal details Submission
  const handleYourPersonalDetailsSubmit = () => {
    if (listenOnSubmitYourPersonalDetails === null) {
      dispatch(yourPersonalDetailsActions.setOnSubmitYourPersonalDetails(true))
    } else {
      dispatch(yourPersonalDetailsActions.setOnSubmitYourPersonalDetails(!listenOnSubmitYourPersonalDetails))
    }
  }

  // Identification details Submission
  const handleYourIdentificationSubmit = () => {
    if (onSubmitIdentificationDetails === null) {
      dispatch(identificationActions.setOnSubmitIdentificationDetails(true))
    } else {
      dispatch(identificationActions.setOnSubmitIdentificationDetails(!onSubmitIdentificationDetails))
    }
  }

  // Employment details Submission
  const handleEmploymentDetailsSubmit = () => {
    if (onSubmitEmploymentDetails === null) {
      dispatch(employmentActions.setOnSubmitEmploymentDetails(true))
    } else {
      dispatch(employmentActions.setOnSubmitEmploymentDetails(!onSubmitEmploymentDetails))
    }
  }

  // Employment History Submission
  const handleEmploymentHistorySubmit = () => {
    if (onSubmitEmploymentHistory === null) {
      dispatch(employmentActions.setOnSubmitEmploymentHistory(true))
    } else {
      dispatch(employmentActions.setOnSubmitEmploymentHistory(!onSubmitEmploymentHistory))
    }
  }

  // Contact details Submission
  const handleContactDetailsSubmit = () => {
    if (onSubmitYourContactDetails === null) {
      dispatch(contactDetailsActions.setOnSubmitYourContactDetails(true))
    } else {
      dispatch(contactDetailsActions.setOnSubmitYourContactDetails(!onSubmitYourContactDetails))
    }
  }

  // Current Residence Submission
  const handleResidenceSubmit = () => {
    if (onSubmitResidenceDetails === null) {
      dispatch(contactDetailsActions.setOnSubmitResidenceDetails(true))
    } else {
      dispatch(contactDetailsActions.setOnSubmitResidenceDetails(!onSubmitResidenceDetails))
    }
  }

  // Previous Residence Submission
  const handlePreviousResidenceSubmit = () => {
    if (onSubmitPrevResidenceDetails === null) {
      dispatch(contactDetailsActions.setOnSubmitPrevResidenceDetails(true))
    } else {
      dispatch(contactDetailsActions.setOnSubmitPrevResidenceDetails(!onSubmitPrevResidenceDetails))
    }
  }

  // ******* Co Borrwer ******* //

  // Personal details Submission
  const handleJointPersonalDetailsSubmit = () => {
    if (onSubmitJointPersonalDetails === null) {
      dispatch(yourPersonalDetailsActions.setOnSubmitJointPersonalDetails(true))
    } else {
      dispatch(yourPersonalDetailsActions.setOnSubmitJointPersonalDetails(!onSubmitJointPersonalDetails))
    }
  }

  // Identification Submission
  const handleJointIdentificationDetailsSubmit = () => {
    if (jointonSubmitIdentificationDetails === null) {
      dispatch(identificationActions.setOnSubmitJointIdentificationDetails(true))
    } else {
      dispatch(identificationActions.setOnSubmitJointIdentificationDetails(!jointonSubmitIdentificationDetails))
    }
  }

  // Employment details Submission
  const handleJointEmploymentDetailsSubmit = () => {
    if (jointonSubmitEmploymentDetails === null) {
      dispatch(employmentActions.setJointOnSubmitEmploymentDetails(true))
    } else {
      dispatch(employmentActions.setJointOnSubmitEmploymentDetails(!jointonSubmitEmploymentDetails))
    }
  }

  // Employment History Submission
  const handleJointEmploymentHistorySubmit = () => {
    if (jointonSubmitEmploymentHistory === null) {
      dispatch(employmentActions.setJointOnSubmitEmploymentHistory(true))
    } else {
      dispatch(employmentActions.setJointOnSubmitEmploymentHistory(!jointonSubmitEmploymentHistory))
    }
  }

  // Contact details Submission
  const handleJointContactDetailsSubmit = () => {
    if (jointonSubmitYourContactDetails === null) {
      dispatch(contactDetailsActions.setJointOnSubmitYourContactDetails(true))
    } else {
      dispatch(contactDetailsActions.setJointOnSubmitYourContactDetails(!jointonSubmitYourContactDetails))
    }
  }

  // Current Residence Submission
  const handleJointResidenceSubmit = () => {
    if (jointonSubmitResidenceDetails === null) {
      dispatch(contactDetailsActions.setJointOnSubmitResidenceDetails(true))
    } else {
      dispatch(contactDetailsActions.setJointOnSubmitResidenceDetails(!jointonSubmitResidenceDetails))
    }
  }

  // Previous Residence Submission
  const handleJointPreviousResidenceSubmit = () => {
    if (jointonSubmitPrevResidenceDetails === null) {
      dispatch(contactDetailsActions.setJointOnSubmitPrevResidenceDetails(true))
    } else {
      dispatch(contactDetailsActions.setJointOnSubmitPrevResidenceDetails(!jointonSubmitPrevResidenceDetails))
    }
  }

  // ******* Common for Prime and Joint applicants ******* //

  // Financial details Submission
  const handleFinancialDetailsSubmit = () => {
    if (onSubmitYourFinancialDetails === null) {
      dispatch(financialDetailsActions.setOnSubmitYourFinancialDetails(true))
    } else {
      dispatch(financialDetailsActions.setOnSubmitYourFinancialDetails(!onSubmitYourFinancialDetails))
    }
  }

  // Asset and Liability Submission
  const handleSopAssetLiabilitySubmit = () => {
    if (onSubmitSopAssetLiability === null) {
      dispatch(sopAssetLiabilityActions.setOnSubmitSopAssetLiabilityDetails(true))
    } else {
      dispatch(sopAssetLiabilityActions.setOnSubmitSopAssetLiabilityDetails(!onSubmitSopAssetLiability))
    }
  }

  // Income and Expenditure Submission
  const handleSopIncomeExpenditureSubmit = () => {
    if (onSubmitSopIncomeExpenditure === null) {
      dispatch(sopIncomeExpenditureActions.setOnSubmitSopIncomeExpenditureDetails(true))
    } else {
      dispatch(sopIncomeExpenditureActions.setOnSubmitSopIncomeExpenditureDetails(!onSubmitSopIncomeExpenditure))
    }
  }

  // Privacy Act Declaration Submission
  const handlePrivacyActDeclarationSubmit = () => {
    if (onSubmitPrivacyActDeclaration === null) {
      dispatch(privacyActDeclarationActions.setOnSubmitPrivacyActDeclaration(true))
    } else {
      dispatch(privacyActDeclarationActions.setOnSubmitPrivacyActDeclaration(!onSubmitPrivacyActDeclaration))
    }
  }

  // ************* Function that triggers submission based on which step the user is curretly submitting ******** //

  const validateFields = () => {
    // Personal
    if (currentChild()?.code === 'PPD') {
      handleYourPersonalDetailsSubmit()
      return isValidYourPersonalDetails
    }

    // Identification
    if (currentChild()?.code === 'PAI') {
      handleYourIdentificationSubmit()
      return isValidIdentificationDetails
    }

    // EmploymentDetails
    if (currentChild()?.code === 'PED') {
      handleEmploymentDetailsSubmit()
      return isValidEmploymentDetails
    }

    // Employment History
    if (currentChild()?.code === 'PEH') {
      handleEmploymentHistorySubmit()
      return isValidEmploymentHistory
    }

    // Contact Details
    if (currentChild()?.code === 'PCD') {
      handleContactDetailsSubmit()
      return isValidYourContactDetails
    }

    // Current Residence
    if (currentChild()?.code === 'PRA') {
      handleResidenceSubmit()
      return isValidResidenceDetails
    }

    // Previous Residence
    if (currentChild()?.code === 'PPRA') {
      handlePreviousResidenceSubmit()
      return isValidPrevResidenceDetails
    }

    // Joint - Personal Details
    if (getCurrentStep()?.code === 'JPD') {
      handleJointPersonalDetailsSubmit()
      return isValidJointPersonalDetails
    }

    // Joint - Identifications
    if (getCurrentStep()?.code === 'JAI') {
      handleJointIdentificationDetailsSubmit()
      return jointisValidIdentificationDetails
    }

    // Joint - Employment Details
    if (getCurrentStep()?.code === 'JED') {
      handleJointEmploymentDetailsSubmit()
      return jointisValidEmploymentDetails
    }

    // Joint - Employment History
    if (getCurrentStep()?.code === 'JEH') {
      handleJointEmploymentHistorySubmit()
      return jointisValidEmploymentHistory
    }

    // Joint - Contact Details
    if (getCurrentStep()?.code === 'JCD') {
      handleJointContactDetailsSubmit()
      return jointisValidYourContactDetails
    }

    // Joint - Residential details
    if (getCurrentStep()?.code === 'JRA') {
      handleJointResidenceSubmit()
      return jointisValidResidenceDetails
    }

    // Joint - Previous Residence
    if (getCurrentStep()?.code === 'JPRA') {
      handleJointPreviousResidenceSubmit()
      return jointisValidPrevResidenceDetails
    }

    // Financial
    if (currentChild()?.code === 'PFD') {
      handleFinancialDetailsSubmit()
      return isValidYourFinancialDetails
    }

    // Statement of Position - Asset and Liability
    if (currentChild()?.code === 'PAL') {
      handleSopAssetLiabilitySubmit()
      return isValidSopAssetLiability
    }

    // Statement of Position - Income and Expenditure
    if (currentChild()?.code === 'PIE') {
      handleSopIncomeExpenditureSubmit()
      return isValidSopIncomeExpenditure
    }

    if (currentChild()?.code === 'PPAD') {
      handlePrivacyActDeclarationSubmit()
      return isValidPrivacyActDeclaration
    }
  }

  useEffect(() => {
    dispatch(globalActions.setCurrentChildCode(activeChildNode))
    dispatch(globalActions.setcurrentStepCode(activeStep))

    if (activeStep === 1 && activeChildNode === 0 && idsInSovereignOnMount < 1) {
      setIsEditing(true)
      return
    }
  }, [activeStep, activeChildNode])

  useEffect(() => {
    if (!stepsToRender) return
    setActiveStep(stepsToRender[activeStepToRender])
  }, [activeStepToRender])

  useEffect(() => {
    if (isOkayToProceed) {
      setIsEditing(!isEditing)
      setIsOkayToProceed(!isOkayToProceed)
      return
    }
  }, [isOkayToProceed])

  useEffect(() => {
    setStepsToRender(
      rootNode
        .filter((rootStep) => {
          return rootStep.skipStep === false
        })
        .map((rootStep) => {
          return rootStep.step
        })
    )
  }, [])

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Handlers <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const varDisplayDivider = isEditing
    ? varBounce({
        durationIn: 0.5,
        durationOut: 0.5,
      }).out
    : currentChild()?.validData
    ? varFade().in
    : varBounce({
        durationIn: 0.5,
        durationOut: 0.5,
      }).in

  const varButtonClick = {
    hover: { scale: 1.1 },
    tap: { scale: 0.96 },
  }

  const varSaveAndAlternate = varFade({
    distance: 20,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inUp

  return (
    <RootStyle title='Review Details | First Credit Union Loans'>
      <Box
        component={motion.div}
        sx={{
          minHeight: '100%',
          margin: 0,
          display: 'flex',
          justifyContent: 'center',
          flexGrow: 1,
        }}
      >
        <Box sx={{ pt: downSm ? 0 : 3, display: 'flex', justifyContent: 'center', flexGrow: 1, height: '100%' }}>
          <Container sx={{ m: 0, p: 0, height: '100%' }} maxWidth={currentChild()?.code == 'PAL' || currentChild()?.code === 'PIE' ? 'lg' : 'md'}>
            <Card elevation={downSm ? 0 : 8} sx={{ pb: 2, px: downSm ? 0 : 3, height: '100%' }}>
              <Box sx={{ borderTopRightRadius: 10, borderTopLeftRadius: 10, height: 85, px: downSm ? 2 : 0, minWidth: '100%', minHeight: '100%' }}>
                <Stack key='titleAndProgress' direction='row' justifyContent='flex-start' alignItems='center' spacing={2} sx={{ height: '100%', minWidth: '100%' }}>
                  {currentRootNode()?.icon}
                  <Typography variant='h6' color='grey.700' sx={{ fontWeight: 500, textTransform: 'uppercase', flexGrow: 1 }}>
                    {currentRootNode()?.label}
                  </Typography>
                  <MobileProgress title='Completed' currentStep={activeStepToRender + 1} totalSteps={stepsToRender?.length} color='success.main' percent={((activeStepToRender + 1) / stepsToRender?.length) * 100} />
                </Stack>
                <Divider sx={{ bgcolor: 'secondary.main', opacity: 0.5 }} />
                {!isEditing && currentChild()?.dataRelatedTo === 'Prime' && (
                  <Stack direction='row' justifyContent='flex-end' alignItems='center' sx={{ minWidth: '100%', m: 0, pt: 5 }}>
                    {!isEditing && (
                      <Button onClick={() => setIsEditing(!isEditing)} sx={{ borderRadius: 32, minWidth: '90px' }} color='secondary' variant='contained' size={downSm ? 'small' : 'medium'} startIcon={currentChild()?.changeEditButtonText ? currentChild()?.EditButtonIcon : <ModeEditOutlineRoundedIcon />}>
                        {currentChild()?.changeEditButtonText ? currentChild()?.editButtonText : 'Edit'}
                      </Button>
                    )}
                  </Stack>
                )}
              </Box>
              <CardContent sx={{ minWidth: '100%', m: 0, py: 5 }}>
                <Grid item container direction='column' alignItems='center' justifyContent='flex-start' spacing={2} sx={{ width: '100%', m: 0, pt: isEditing ? 0 : 4, minHeight: 200 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      width: isEditing || currentChild()?.dataRelatedTo !== 'Prime' ? (downMd || currentChild()?.fullwidth ? '90%' : '70%') : '100%',
                      p: 0,
                      flexDirection: 'column',
                      alignItems: 'stretch',
                      alignContent: 'center',
                    }}
                  >
                    {isEditing ? currentChild()?.edit : currentChild()?.display}
                  </Box>
                </Grid>
              </CardContent>
              {!isEditing && (
                <Box>
                  {currentChild()?.dataRelatedTo === 'Prime' && (
                    <Box component={motion.div} {...varDisplayDivider} sx={{ px: downSm ? 2 : 0 }}>
                      <Divider>
                        <Chip
                          variant='outlined'
                          color={currentChild()?.validData ? 'success' : currentChild()?.showCustomValidationText ? currentChild()?.customValidationHelperTextSeverity : 'error'}
                          icon={currentChild()?.validData ? <CheckCircleRoundedIcon /> : <ErrorRoundedIcon />}
                          label={
                            currentChild()?.validData ? (
                              <Typography variant='caption' color='text.secondary'>
                                Please <strong>confirm</strong> and proceed to <strong>next</strong> step!
                              </Typography>
                            ) : currentChild()?.showCustomValidationText ? (
                              currentChild()?.customValidationHelperText
                            ) : (
                              <Typography variant='caption'>
                                Please <strong>edit</strong> and update the details marked in <strong>red!</strong>
                              </Typography>
                            )
                          }
                        />
                      </Divider>
                    </Box>
                  )}
                  <Stack direction='row' justifyContent={downSm ? 'center' : 'space-between'} alignItems='center' spacing={3} sx={{ py: 5 }}>
                    <Button
                      color='inherit'
                      disabled={activeStep === 0 && activeChildNode === 0}
                      onClick={handleBack}
                      sx={{
                        mr: 1,
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      component={motion.button}
                      variants={varButtonClick}
                      endIcon={<NavigateNextRoundedIcon />}
                      whileHover='hover'
                      whileTap='tap'
                      disabled={!currentChild()?.proceed}
                      onClick={handleNext}
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'common.white',
                        borderRadius: '49px',
                        width: '100px',
                        border: 'none',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                      variant='contained'
                    >
                      Next
                    </Button>
                  </Stack>
                </Box>
              )}
              {isEditing && currentChild()?.showAlternateButton && (
                <Stack component={motion.div} {...varSaveAndAlternate} direction='row' justifyContent='center' alignItems='center' spacing={3} sx={{ pb: 2 }}>
                  <Button
                    component={motion.button}
                    variants={varButtonClick}
                    endIcon={currentChild()?.showAlternateButton ? currentChild()?.alternateButtonIcon : <SaveIcon />}
                    whileHover='hover'
                    whileTap='tap'
                    disabled={false}
                    onClick={handleAlternateButtonAction}
                    sx={{
                      bgcolor: 'secondary.main',
                      color: 'common.white',
                      borderRadius: 32,
                      width: '100px',
                      border: 'none',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                    variant='contained'
                  >
                    {currentChild()?.showAlternateButton ? currentChild()?.alternateButtonText : 'Save'}
                  </Button>
                </Stack>
              )}
              {isEditing && !currentChild()?.showAlternateButton && (
                <Stack component={motion.div} {...varSaveAndAlternate} direction='row' justifyContent='center' alignItems='center' spacing={3} sx={{ pb: 2 }}>
                  <Button
                    component={motion.button}
                    variants={varButtonClick}
                    endIcon={<SaveIcon />}
                    whileHover='hover'
                    whileTap='tap'
                    disabled={false}
                    onClick={handleSave}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'common.white',
                      borderRadius: 32,
                      width: '100px',
                      border: 'none',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                    variant='contained'
                  >
                    Save
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
