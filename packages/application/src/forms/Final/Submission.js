import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//* AWS-KMS SDK
// import { KMSClient, GenerateDataKeyCommand, DecryptCommand } from '@aws-sdk/client-kms'

// API Constants
import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, BASE_URL_LOCAL_AUTH, BASE_URL_AWS_AUTH, AXIOS_NETWOR_ERROR, SUBMISSION_STATUS, processNodeEnv } from '../../redux/utils/apiConstants'
import { HEADER_CONSTANTS } from '../../redux/utils/apiConstants'

import { PRIMARY } from '../../theme/palette'

import * as jose from 'jose'

//Redux
import { submissionActions } from '../../redux/slices/submissionSlice'
import { submitLoanApplication, generateLoanApplicationReport } from '../../redux/slices/submissionSlice'
import { onlineAppAuth } from '../../redux/slices/submissionSlice'

// MUI - Styles
import { styled } from '@mui/material/styles'

// MUI
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

// Codes
import { maritalStatusMenu } from '../PersonalDetails/Codes/PersonalDetailsCodes'
import { employmentTypeMenu, occupationMenu } from '../EmploymentDetails/Codes/EmploymentCodes'

// Utils
import { fCurrency, fNumber, fData } from '../../utils/formatNumber'
import { getLoanPurposeFromKey, getTradingBranchFromKey, getCountryFromKey } from '../../utils/getKeysOrValues'
import { fDateYYYY_MM_DD, fDate, convertToUTCTimestamp, convertUnixToUTCTimestamp, fDateCustom } from '../../utils/formatDateTime'

// Spinner
import { css } from '@emotion/react'
import SyncLoader from 'react-spinners/SyncLoader'

//* Test Data
import { primeAndJointOnlyDataTest, primeOnlyData, primeAndJointPDFData } from './testDataForSubmission'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const ContentStyle = styled(Paper)(({ theme }) => ({
  borderRadius: 25,
  height: '100%',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  boxSizing: 'border-box',
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

const today = new Date()
const defExpiryDate = today.setDate(today.getDate() - 1)
const defEffectiveDate = new Date()
const defPrevEmpEffective = new Date().setFullYear(new Date().getFullYear() - 100)

// ************************************************************************** //

function maritalStatusMenuItems(maritalStatus) {
  return maritalStatusMenu.find((item) => {
    return item?.key === maritalStatus
  })
}

function employmentTypes(value) {
  return employmentTypeMenu.find((item) => {
    return item?.value === value
  })
}

function isNotAnEmployment(value) {
  const employmentTypeCodes = employmentTypeMenu
    .filter((item) => {
      return item.key === 'BNF' || item.key === 'HMK' || item.key === 'BNF' || item.key === 'UNE'
    })
    .map((item) => {
      return item.value
    })

  if (employmentTypeCodes.includes(value)) return true
  return false
}

function occupationTypes(value) {
  return occupationMenu.find((item) => {
    return item?.value === value
  })
}

function getAccommodation(years, residenceType) {
  if (residenceType === 'BOARD') {
    return { code: 'BRD', description: 'Board' }
  }
  if (residenceType === 'HOME') {
    return { code: 'OWM', description: 'Own with Mortgage' }
  }
  if (residenceType === 'RENT' && years < 2) {
    return { code: 'RNT2', description: 'Renting less than 2' }
  }
  if (residenceType === 'RENT' && years >= 2) {
    return { code: 'RNTX', description: 'Renting More than 2 years' }
  }
}

// ************************************************************************** //

let CIPHER_TEXT_BLOB = null
let CIPHER_TEXT = null

export default function Submission() {
  const [submit, triggerSubmit] = React.useState(null)
  const [loanSubmissionData, setLoanSubmissionData] = React.useState(null)

  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const downSm = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  // Back-end response to application submission
  const loading = useSelector((state) => state.submissionReducer.loading)
  const onlinetoken = useSelector((state) => state.submissionReducer.onlinetoken)

  const declarationItems = useSelector((state) => state.privacyDeclarationReducer.declarationItems)

  const errorsSubmission = useSelector((state) => state.submissionReducer.errorSubmission)
  const loadingSubmission = useSelector((state) => state.submissionReducer.loadingSubmission)
  const applicationReference = useSelector((state) => state.submissionReducer.applicationReference)
  const serverErrorSubmission = useSelector((state) => state.submissionReducer.serverErrorSubmission)
  const currentRequestIdSubmission = useSelector((state) => state.submissionReducer.currentRequestIdSubmission)

  //* Axios Network Errors
  const axiosCode = useSelector((state) => state.submissionReducer.axiosCode)
  const axiosCodeMessage = useSelector((state) => state.submissionReducer.axiosCodeMessage)
  const axiosCodeName = useSelector((state) => state.submissionReducer.axiosCodeName)
  const axiosRequestStatus = useSelector((state) => state.submissionReducer.axiosRequestStatus)
  const axiosRequestStatusText = useSelector((state) => state.submissionReducer.axiosRequestStatusText)

  //* Submission Results
  const submissionStatusCode = useSelector((state) => state.submissionReducer.submissionStatusCode)
  const submissionFulfilled = useSelector((state) => state.submissionReducer.submissionFulfilled)

  //* ID logon session
  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)

  //* Loan Details
  const loanAmount = useSelector((state) => state.financialDetailsReducer.loanAmount)
  const interestRate = useSelector((state) => state.financialDetailsReducer.interestRate)
  const term = useSelector((state) => state.financialDetailsReducer.term.value)
  const repayFreq = useSelector((state) => state.financialDetailsReducer.paymentFrequency.unit)
  const sovInstalmentAmount = useSelector((state) => state.financialDetailsReducer.sovInstalmentAmount)
  const sovPaymentFrequencyType1 = useSelector((state) => state.financialDetailsReducer.sovPaymentFrequencyType1)
  const sovInterestAmount = useSelector((state) => state.financialDetailsReducer.sovInterestAmount)
  const sovAmountPayable = useSelector((state) => state.financialDetailsReducer.sovAmountPayable)

  //* ID logon session
  const secureClientID = useSelector((state) => state.globalReducer.secureClientID)
  const secureClientGeneralDetails = useSelector((state) => state.globalReducer.secureClientGeneralDetails)
  const secureClientBankAccounts = useSelector((state) => state.globalReducer.secureClientBankAccounts)

  //* ------------ Credit Sense Details ------------ //

  const creditSenseAppRef = useSelector((state) => state.bankStatementReducer.creditSenseAppRef)

  //* ------------ Security Details ------------ //

  //* Vehicle Security

  const vehicleRelatedLoanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.vehicleRelatedLoanPurpose)
  const wouldYoulikeToProvideVehicleSecurity = useSelector((state) => state.vehicleSecurityReducer.wouldYoulikeToProvideVehicleSecurity)
  const hasPurchsedVehicle = useSelector((state) => state.vehicleSecurityReducer.hasPurchsedVehicle)

  const vehicleRegistrationNumber = useSelector((state) => state.vehicleSecurityReducer.vehicleRegistrationNumber)

  // -------------- Fees --------------

  //* Loan Cost recovery Fees
  const creditCheckAmount = useSelector((state) => state.financialDetailsReducer.creditCheckAmount)
  const creditSenseAmount = useSelector((state) => state.financialDetailsReducer.creditSenseAmount)
  const cloudCheckIdVerificationAmount = useSelector((state) => state.financialDetailsReducer.cloudCheckIdVerificationAmount)
  const cloudCheckPEPSanctionsAmount = useSelector((state) => state.financialDetailsReducer.cloudCheckPEPSanctionsAmount)
  const motorwebCheckAmount = useSelector((state) => state.financialDetailsReducer.motorwebCheckAmount)
  const docusignAmount = useSelector((state) => state.financialDetailsReducer.docusignAmount)
  const ppsrAmount = useSelector((state) => state.financialDetailsReducer.ppsrAmount)

  // ************* Lending Criteria Details ************* //

  const jointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplication.value)
  const jointApplicantClientNo = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplicantClientNo)
  const jointApplication_key = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplication.key)

  const citizen = useSelector((state) => state.lendingCritetiaQnsReducer.citizenship)
  const isNzCitizen = useSelector((state) => state.lendingCritetiaQnsReducer.isNzCitizen.value)
  const resident = useSelector((state) => state.lendingCritetiaQnsReducer.residency)
  const isNzResident = useSelector((state) => state.lendingCritetiaQnsReducer.isNzResident.value)
  const loanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.loanPurpose)
  const tradingBranch = useSelector((state) => state.lendingCritetiaQnsReducer.tradingBranch)

  const hasWorkPermit = useSelector((state) => state.lendingCritetiaQnsReducer.hasWorkPermit)
  const hasRegularIncome = useSelector((state) => state.lendingCritetiaQnsReducer.hasRegularIncome)
  const incomeCreditedToFCU = useSelector((state) => state.lendingCritetiaQnsReducer.incomeCreditedToFCU)
  const wasDeclaredBankrupt = useSelector((state) => state.lendingCritetiaQnsReducer.wasDeclaredBankrupt)
  const bankruptcyDate = useSelector((state) => state.lendingCritetiaQnsReducer.bankruptcyDate)

  // *************  Personal Details Details ************* //

  // *** Prime *** //
  const forenames = useSelector((state) => state.yourPersonalDetailReducer.forenames)
  const lastName = useSelector((state) => state.yourPersonalDetailReducer.lastName)
  const title = useSelector((state) => state.yourPersonalDetailReducer.title)
  const dob = useSelector((state) => state.yourPersonalDetailReducer.dob)

  const gender = useSelector((state) => state.yourPersonalDetailReducer.gender)
  const maritalStatus = useSelector((state) => state.yourPersonalDetailReducer.maritalStatus)
  const dependents = useSelector((state) => state.yourPersonalDetailReducer.dependents)
  const otherNames = useSelector((state) => state.yourPersonalDetailReducer.otherNames)

  // *** Joint *** //
  const jointforenames = useSelector((state) => state.yourPersonalDetailReducer.jointforenames)
  const jointlastName = useSelector((state) => state.yourPersonalDetailReducer.jointlastName)
  const jointtitle = useSelector((state) => state.yourPersonalDetailReducer.jointtitle)
  const jointdob = useSelector((state) => state.yourPersonalDetailReducer.jointdob)
  const jointgender = useSelector((state) => state.yourPersonalDetailReducer.jointgender)
  const jointmaritalStatus = useSelector((state) => state.yourPersonalDetailReducer.jointmaritalStatus)
  const jointdependents = useSelector((state) => state.yourPersonalDetailReducer.jointdependents)
  const jointotherNames = useSelector((state) => state.yourPersonalDetailReducer.jointotherNames)

  // ************* Contact Details ************* //

  // ********* Prime Contact ******* //

  const emailAddress = useSelector((state) => state.conatctDetailsReducer.emailAddress)

  const mobileCountryCode = useSelector((state) => state.conatctDetailsReducer.mobileCountryCode)
  const mobileProviderCode = useSelector((state) => state.conatctDetailsReducer.mobileProviderCode)
  const mobileNumberLastDigits = useSelector((state) => state.conatctDetailsReducer.mobileNumberLastDigits)

  const homePhoneCountryCode = useSelector((state) => state.conatctDetailsReducer.homePhoneCountryCode)
  const homePhoneStdCode = useSelector((state) => state.conatctDetailsReducer.homePhoneStdCode)
  const homePhoneLastDigits = useSelector((state) => state.conatctDetailsReducer.homePhoneLastDigits)

  const workPhoneCountryCode = useSelector((state) => state.conatctDetailsReducer.workPhoneCountryCode)
  const workPhoneStdCode = useSelector((state) => state.conatctDetailsReducer.workPhoneStdCode)
  const workPhoneLastDigits = useSelector((state) => state.conatctDetailsReducer.workPhoneLastDigits)

  // ######## Joint Contact ######## //

  const jointaddress = useSelector((state) => state.conatctDetailsReducer.jointemailAddress)
  const jointmobileCountryCode = useSelector((state) => state.conatctDetailsReducer.jointmobileCountryCode)
  const jointmobileProviderCode = useSelector((state) => state.conatctDetailsReducer.jointmobileProviderCode)
  const jointmobileLastDigits = useSelector((state) => state.conatctDetailsReducer.jointmobileLastDigits)

  const jointhomePhoneCountryCode = useSelector((state) => state.conatctDetailsReducer.jointhomePhoneCountryCode)
  const jointhomePhoneStdCode = useSelector((state) => state.conatctDetailsReducer.jointhomePhoneStdCode)
  const jointhomePhoneLastDigits = useSelector((state) => state.conatctDetailsReducer.jointhomePhoneLastDigits)

  const jointworkPhoneCountryCode = useSelector((state) => state.conatctDetailsReducer.jointworkPhoneCountryCode)
  const jointworkPhoneStdCode = useSelector((state) => state.conatctDetailsReducer.jointworkPhoneStdCode)
  const jointworkPhoneLastDigits = useSelector((state) => state.conatctDetailsReducer.jointworkPhoneLastDigits)
  const jointprefContactType = useSelector((state) => state.conatctDetailsReducer.jointprefContactType)

  // *******  Prime Current Residence ****** //

  const currResAddressSelectedUnitType = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedUnitType)
  const currResAddressSelectedApartment = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedApartment)
  const currResAddressSelectedBuilding = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedBuilding)
  const currResAddressSelectedStreetNumberFrom = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedStreetNumber?.from)
  const currResAddressSelectedStreetNumberTo = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedStreetNumber?.to)
  const currResAddressSelectedAlpha = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedAlpha)
  const currResAddressSelectedStreetOrPostalName = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedStreetOrPostalName)
  const currResAddressSelectedStreetDirection = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedStreetDirection)
  const currResAddressSelectedStreetType = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedStreetType)
  const currResAddressSelectedSuburb = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedSuburb)
  const currResAddressSelectedCity = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedCity)
  const currResAddressSelectedPostCode = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedPostCode)
  const currResAddressSelectedCountryCode = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedCountry?.code)
  const currResAddressSelectedCountryDescription = useSelector((state) => state.conatctDetailsReducer.currResAddressSelectedCountry?.description)
  const currResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.currResEffectiveDate)
  const currResYears = useSelector((state) => state.conatctDetailsReducer.currResYears)
  const residenceType = useSelector((state) => state.conatctDetailsReducer.residenceType)

  const sovCurrentAddressUpdate = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressUpdate)
  const sovCurrentAddressExpire = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressExpire)
  const sovCurrentAddressType = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressType)
  const sovCurrentAddressId = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressId)
  const sovCurrentAddressAttributes = useSelector((state) => state.conatctDetailsReducer.sovCurrentAddressAttributes)

  // The Display lines 1-4 to be sent to the PDF endpoint
  const currResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine1)
  const currResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine2)
  const currResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine3)
  const currResAddressToDisplayLine4 = useSelector((state) => state.conatctDetailsReducer.currResAddressToDisplayLine4)

  // ******** Prime Previous Residence ******** //

  const prevResAddressSelectedUnitType = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedUnitType)
  const prevResAddressSelectedApartment = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedApartment)
  const prevResAddressSelectedBuilding = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedBuilding)
  const prevResAddressSelectedStreetNumberFrom = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedStreetNumber?.from)
  const prevResAddressSelectedStreetNumberTo = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedStreetNumber?.to)
  const prevResAddressSelectedAlpha = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedAlpha)
  const prevResAddressSelectedStreetOrPostalName = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedStreetOrPostalName)
  const prevResAddressSelectedStreetDirection = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedStreetDirection)
  const prevResAddressSelectedStreetType = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedStreetType)
  const prevResAddressSelectedSuburb = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedSuburb)
  const prevResAddressSelectedCity = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedCity)
  const prevResAddressSelectedPostCode = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedPostCode)
  const prevResAddressSelectedCountryCode = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedCountry?.code)
  const prevResAddressSelectedCountryDescription = useSelector((state) => state.conatctDetailsReducer.prevResAddressSelectedCountry?.description)
  const prevResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.prevResEffectiveDate)

  const sovPreviousAddressUpdate = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressUpdate)
  const sovPreviousAddressExpire = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressExpire)
  const sovPreviousAddressType = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressType)
  const sovPreviousAddressId = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressId)
  const sovPreviousAddressAttributes = useSelector((state) => state.conatctDetailsReducer.sovPreviousAddressAttributes)

  // The Display lines 1-4 to be sent to the PDF endpoint
  const prevResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine1)
  const prevResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine2)
  const prevResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine3)
  const prevResAddressToDisplayLine4 = useSelector((state) => state.conatctDetailsReducer.prevResAddressToDisplayLine4)

  // ########  Joint Current Residence ######## //

  const jointcurrResAddressSelectedUnitType = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedUnitType)
  const jointcurrResAddressSelectedApartment = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedApartment)
  const jointcurrResAddressSelectedBuilding = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedBuilding)
  const jointcurrResAddressSelectedStreetNumberFrom = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedStreetNumber?.from)
  const jointcurrResAddressSelectedStreetNumberTo = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedStreetNumber?.to)
  const jointcurrResAddressSelectedAlpha = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedAlpha)
  const jointcurrResAddressSelectedStreetOrPostalName = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedStreetOrPostalName)
  const jointcurrResAddressSelectedStreetDirection = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedStreetDirection)
  const jointcurrResAddressSelectedStreetType = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedStreetType)
  const jointcurrResAddressSelectedSuburb = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedSuburb)
  const jointcurrResAddressSelectedCity = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedCity)
  const jointcurrResAddressSelectedPostCode = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedPostCode)
  const jointcurrResAddressSelectedCountryCode = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedCountry?.code)
  const jointcurrResAddressSelectedCountryDescription = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressSelectedCountry?.description)
  const jointcurrResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.jointcurrResEffectiveDate)
  const jointcurrResYears = useSelector((state) => state.conatctDetailsReducer.jointcurrResYears)
  const jointresidenceType = useSelector((state) => state.conatctDetailsReducer.jointresidenceType)

  // The Display lines 1-4 to be sent to the PDF endpoint
  const jointcurrResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressToDisplayLine1)
  const jointcurrResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressToDisplayLine2)
  const jointcurrResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressToDisplayLine3)
  const jointcurrResAddressToDisplayLine4 = useSelector((state) => state.conatctDetailsReducer.jointcurrResAddressToDisplayLine4)

  // ######## Joint Previous Residence ######## //

  const jointprevResAddressSelectedUnitType = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedUnitType)
  const jointprevResAddressSelectedApartment = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedApartment)
  const jointprevResAddressSelectedBuilding = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedBuilding)
  const jointprevResAddressSelectedStreetNumberFrom = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedStreetNumber?.from)
  const jointprevResAddressSelectedStreetNumberTo = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedStreetNumber?.to)
  const jointprevResAddressSelectedAlpha = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedAlpha)
  const jointprevResAddressSelectedStreetOrPostalName = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedStreetOrPostalName)
  const jointprevResAddressSelectedStreetDirection = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedStreetDirection)
  const jointprevResAddressSelectedStreetType = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedStreetType)
  const jointprevResAddressSelectedSuburb = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedSuburb)
  const jointprevResAddressSelectedCity = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedCity)
  const jointprevResAddressSelectedPostCode = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedPostCode)
  const jointprevResAddressSelectedCountryCode = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedCountry?.code)
  const jointprevResAddressSelectedCountryDescription = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressSelectedCountry?.description)
  const jointprevResEffectiveDate = useSelector((state) => state.conatctDetailsReducer.jointprevResEffectiveDate)

  // The Display lines 1-4 to be sent to the PDF endpoint
  const jointprevResAddressToDisplayLine1 = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressToDisplayLine1)
  const jointprevResAddressToDisplayLine2 = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressToDisplayLine3)
  const jointprevResAddressToDisplayLine3 = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressToDisplayLine4)
  const jointprevResAddressToDisplayLine4 = useSelector((state) => state.conatctDetailsReducer.jointprevResAddressToDisplayLine3)

  // ************* Identification Details ************* //

  // ***************** PRIME ******************** //

  // Selected Identifications
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)
  const checkedJointIdentificationTypes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)

  // Driver Licence
  const all_identifications = useSelector((state) => state.identificationReducer.identificationTypes)
  const driversLicenseType = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.licenceType)
  const driversLicense = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.driversLicenceNo)
  const driversLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.driversLicenceVersion)
  const drLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.drLicenceIssueDate)
  const drLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.drLicenceExpiryDate)

  const sovTypeUpdateddrLicence = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovTypeUpdated)
  const sovTypeExpiredrLicence = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovTypeExpire)
  const sovTypedrLicence = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovType)
  const soviddrLicence = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovid)
  const sovAttributesdrLicence = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovAttributes)
  const sovTypedrLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovTypeversion)
  const soviddrLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovidversion)
  const sovAttributesdrLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.data.sovAttributesversion)

  // Passport
  const passportNo = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportNo)
  const passportIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportIssueDate)
  const passportExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportExpiryDate)
  const passportPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.passportPhotoUrl)

  const sovTypeUpdatedpassport = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovTypeUpdated)
  const sovTypeExpirepassport = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovTypeExpire)
  const sovTypepassport = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovType)
  const sovidpassport = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovid)
  const sovAttributespassport = useSelector((state) => state.identificationReducer.identificationTypes.passport.data.sovAttributes)

  // Firearms Licence
  const firearmsLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceNo)
  const firearmsLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceIssueDate)
  const firearmsLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicenceExpiryDate)
  const firearmsLicencePhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.firearmsLicencePhotoUrl)

  const sovTypeUpdatedfirearms_licence = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovTypeUpdated)
  const sovTypeExpirefirearms_licence = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovTypeExpire)
  const sovTypefirearms_licence = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovType)
  const sovidfirearms_licence = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovid)
  const sovAttributesfirearms_licence = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.data.sovAttributes)

  // Kiwi Access Card
  const kiwiAccessCardNo = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardNo)
  const kiwiAccessCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardIssueDate)
  const kiwiAccessCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardExpiryDate)
  const kiwiAccessCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.kiwiAccessCardPhotoUrl)

  const sovTypeUpdatedkiwi_access_card = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovTypeUpdated)
  const sovTypeExpirekiwi_access_card = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovTypeExpire)
  const sovTypekiwi_access_card = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovType)
  const sovidkiwi_access_card = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovid)
  const sovAttributeskiwi_access_card = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.data.sovAttributes)

  // Community Service Card
  const commServiceCardNo = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardNo)
  const commServiceCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardIssueDate)
  const commServiceCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardExpiryDate)
  const commServiceCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.commServiceCardPhotoUrl)

  const sovTypeUpdatedcommunity_service_card = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovTypeUpdated)
  const sovTypeExpirecommunity_service_card = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovTypeExpire)
  const sovTypecommunity_service_card = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovType)
  const sovidcommunity_service_card = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovid)
  const sovAttributescommunity_service_card = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.data.sovAttributes)

  // Birth Certifiate
  const birthCertificateRegNo = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.birthCertificateRegNo)
  const sovbirthCertificateRegNo = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovbirthCertificateRegNo)
  const datOfBirth = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.datOfBirth)
  const placeOfBirth = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.placeOfBirth)
  const birthCertificatePhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.birthCertificatePhotoUrl)

  const sovTypeUpdatedbirth_certificate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovTypeUpdated)
  const sovTypeExpirebirth_certificate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovTypeExpire)
  const sovTypebirth_certificate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovType)
  const sovidbirth_certificate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovid)
  const sovAttributesbirth_certificate = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.data.sovAttributes)

  // Current Student ID
  const currStudentIdNo = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdNo)
  const currStudentIdIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdIssueDate)
  const currStudentIdExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdExpiryDate)
  const currStudentIdPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.currStudentIdPhotoUrl)

  const sovTypeUpdatedcurrent_Student_id = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovTypeUpdated)
  const sovTypeExpirecurrent_Student_id = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovTypeExpire)
  const sovTypecurrent_Student_id = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovType)
  const sovidcurrent_Student_id = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovid)
  const sovAttributescurrent_Student_id = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.data.sovAttributes)

  // Gold Card
  const goldCardNo = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardNo)
  const goldCardValidFromDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.goldCardValidFromDate)

  const sovTypeUpdatedgold_card = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.sovTypeUpdated)
  const sovTypeExpiregold_card = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.sovTypeExpire)
  const sovTypegold_card = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.sovType)
  const sovidgold_card = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.sovid)
  const sovAttributesgold_card = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.data.sovAttributes)

  // ***************** JOINT ******************** //

  // Driver Licence
  const jointdriversLicense = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.driversLicenceNo)
  const jointdriversLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.driversLicenceVersion)
  const jointlicenceType = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.licenceType)
  const jointdrLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.drLicenceIssueDate)
  const jointdrLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.drLicenceExpiryDate)
  const jointdrLicencePhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.drivers_licence.jointdata.drLicencePhotoUrl)

  // Passport
  const jointpassportNo = useSelector((state) => state.identificationReducer.identificationTypes.passport.jointdata.passportNo)
  const jointpassportIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.jointdata.passportIssueDate)
  const jointpassportExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.passport.jointdata.passportExpiryDate)
  const jointpassportPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.passport.jointdata.passportPhotoUrl)

  // Firearms Licence
  const jointfirearmsLicenceNo = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicenceNo)
  const jointfirearmsLicenceVersion = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicenceVersion)
  const jointfirearmsLicenceIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicenceIssueDate)
  const jointfirearmsLicenceExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicenceExpiryDate)
  const jointfirearmsLicencePhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.firearms_licence.jointdata.firearmsLicencePhotoUrl)

  // Kiwi Access Card
  const jointkiwiAccessCardNo = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardNo)
  const jointkiwiAccessCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardIssueDate)
  const jointkiwiAccessCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardExpiryDate)
  const jointkiwiAccessCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.kiwi_access_card.jointdata.kiwiAccessCardPhotoUrl)

  // Community Service Card
  const jointcommServiceCardNo = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.jointdata.commServiceCardNo)
  const jointcommServiceCardIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.jointdata.commServiceCardIssueDate)
  const jointcommServiceCardExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.jointdata.commServiceCardExpiryDate)
  const jointcommServiceCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.community_service_card.jointdata.commServiceCardPhotoUrl)

  // Birth Certifiate
  const jointbirthCertificateRegNo = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.jointdata.birthCertificateRegNo)
  const jointdatOfBirth = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.jointdata.datOfBirth)
  const jointplaceOfBirth = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.jointdata.placeOfBirth)
  const jointbirthCertificatePhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.birth_certificate.jointdata.birthCertificatePhotoUrl)

  // Current Student ID
  const jointcurrStudentIdNo = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdNo)
  const jointcurrStudentIdIssueDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdIssueDate)
  const jointcurrStudentIdExpiryDate = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdExpiryDate)
  const jointcurrStudentIdPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.current_Student_id.jointdata.currStudentIdPhotoUrl)

  // Gold Card
  const jointgoldCardNo = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.jointdata.goldCardNo)
  const jointgoldCardValidFromDate = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.jointdata.goldCardValidFromDate)
  const jointgoldCardPhotoUrl = useSelector((state) => state.identificationReducer.identificationTypes.gold_card.jointdata.goldCardPhotoUrl)

  // ************* Employment Details ************* //

  // ****************** PRIME ******************

  // Current Employment
  const employmentType = useSelector((state) => state.employmentReducer.employmentType)
  const occupation = useSelector((state) => state.employmentReducer.occupation)
  const employerName = useSelector((state) => state.employmentReducer.employerName)
  const empEffectiveDate = useSelector((state) => state.employmentReducer.empEffectiveDate)

  // Sovereign Attributes to expire - Current Employemnt
  const sovcurrEmpUpdate = useSelector((state) => state.employmentReducer.sovcurrEmpUpdate)
  const sovcurrEmpExpire = useSelector((state) => state.employmentReducer.sovcurrEmpExpire)
  const sovcurrEmpType = useSelector((state) => state.employmentReducer.sovcurrEmpType)
  const sovcurrEmpID = useSelector((state) => state.employmentReducer.sovcurrEmpID)
  const sovcurrEmpAttributes = useSelector((state) => state.employmentReducer.sovcurrEmpAttributes)

  // To be add to the PDF
  const empAddressToDisplayLine1 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine1)
  const empAddressToDisplayLine2 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine2)
  const empAddressToDisplayLine3 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine3)
  const empAddressToDisplayLine4 = useSelector((state) => state.employmentReducer.empAddressToDisplayLine4)

  // Previous Employment
  const prevEmpemploymentType = useSelector((state) => state.employmentReducer.prevEmpemploymentType)
  const prevEmpoccupation = useSelector((state) => state.employmentReducer.prevEmpoccupation)
  const prevEmpemployerName = useSelector((state) => state.employmentReducer.prevEmpemployerName)
  const prevEmpempEffectiveDate = useSelector((state) => state.employmentReducer.prevEmpempEffectiveDate)

  // Sovereign Attributes to expire - Current Employemnt

  const sovprevEmpUpdate = useSelector((state) => state.employmentReducer.sovprevEmpUpdate)
  const sovprevEmpExpire = useSelector((state) => state.employmentReducer.sovprevEmpExpire)
  const sovprevEmpType = useSelector((state) => state.employmentReducer.sovprevEmpType)
  const sovprevEmpID = useSelector((state) => state.employmentReducer.sovprevEmpID)
  const sovprevEmpAttributes = useSelector((state) => state.employmentReducer.sovprevEmpAttributes)

  // To be add to the PDF
  const prevEmpempAddressToDisplayLine1 = useSelector((state) => state.employmentReducer.prevEmpempAddressToDisplayLine1)
  const prevEmpempAddressToDisplayLine2 = useSelector((state) => state.employmentReducer.prevEmpempAddressToDisplayLine2)
  const prevEmpempAddressToDisplayLine3 = useSelector((state) => state.employmentReducer.prevEmpempAddressToDisplayLine3)
  const prevEmpempAddressToDisplayLine4 = useSelector((state) => state.employmentReducer.prevEmpempAddressToDisplayLine4)

  // ****************** JOINT ******************

  // Current Employment
  const jointemploymentType = useSelector((state) => state.employmentReducer.jointemploymentType)
  const jointoccupation = useSelector((state) => state.employmentReducer.jointoccupation)
  const jointemployerName = useSelector((state) => state.employmentReducer.jointemployerName)
  const jointempEffectiveDate = useSelector((state) => state.employmentReducer.jointempEffectiveDate)

  // To be add to the PDF
  const jointempAddressToDisplayLine1 = useSelector((state) => state.employmentReducer.jointempAddressToDisplayLine1)
  const jointempAddressToDisplayLine2 = useSelector((state) => state.employmentReducer.jointempAddressToDisplayLine2)
  const jointempAddressToDisplayLine3 = useSelector((state) => state.employmentReducer.jointempAddressToDisplayLine3)
  const jointempAddressToDisplayLine4 = useSelector((state) => state.employmentReducer.jointempAddressToDisplayLine4)

  // Previous Employment
  const jointprevEmpemploymentType = useSelector((state) => state.employmentReducer.jointprevEmpemploymentType)
  const jointprevEmpoccupation = useSelector((state) => state.employmentReducer.jointprevEmpoccupation)
  const jointprevEmpemployerName = useSelector((state) => state.employmentReducer.jointprevEmpemployerName)
  const jointprevEmpempEffectiveDate = useSelector((state) => state.employmentReducer.jointprevEmpempEffectiveDate)

  // To be add to the PDF
  const jointprevEmpempAddressToDisplayLine1 = useSelector((state) => state.employmentReducer.jointprevEmpempAddressToDisplayLine1)
  const jointprevEmpempAddressToDisplayLine2 = useSelector((state) => state.employmentReducer.jointprevEmpempAddressToDisplayLine2)
  const jointprevEmpempAddressToDisplayLine3 = useSelector((state) => state.employmentReducer.jointprevEmpempAddressToDisplayLine3)
  const jointprevEmpempAddressToDisplayLine4 = useSelector((state) => state.employmentReducer.jointprevEmpempAddressToDisplayLine4)

  const checkedAssetCodes = useSelector((state) => state.sopAssetLiabilityReducer.checkedAssetCodes)
  const checkedLiabilityCodes = useSelector((state) => state.sopAssetLiabilityReducer.checkedLiabilityCodes)
  const checkedIncomeCodes = useSelector((state) => state.sopIncomeExpenditureReducer.checkedIncomeCodes)
  const checkedExpenseCodes = useSelector((state) => state.sopIncomeExpenditureReducer.checkedExpenseCodes)

  const asset = useSelector((state) => state.sopAssetLiabilityReducer.asset)
  const liability = useSelector((state) => state.sopAssetLiabilityReducer.liability)
  const income = useSelector((state) => state.sopIncomeExpenditureReducer.income)
  const expense = useSelector((state) => state.sopIncomeExpenditureReducer.expense)

  const primePhone = [
    {
      countryCode: workPhoneCountryCode,
      stdCode: workPhoneStdCode,
      number: workPhoneLastDigits,
      preferredMethod: 'N',
      effectiveDate: convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate'),
      type: 'WK',
      seq: '1',
    },
    {
      countryCode: homePhoneCountryCode,
      stdCode: homePhoneStdCode,
      number: homePhoneLastDigits,
      preferredMethod: 'N',
      effectiveDate: convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate'),
      type: 'HM',
      seq: '1',
    },
  ]

  const primeMobile = [
    {
      countryCode: mobileCountryCode,
      networkCode: mobileProviderCode,
      number: mobileNumberLastDigits,
      preferredMethod: 'N',
      effectiveDate: convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate'),
      type: 'MB',
      seq: '1',
    },
  ]

  const primeEmail = [
    {
      address: emailAddress,
      preferredMethod: 'Y',
      effectiveDate: convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate'),
      type: 'HM',
      seq: '1',
    },
  ]

  const jointPhone = [
    {
      countryCode: jointworkPhoneCountryCode,
      stdCode: jointworkPhoneStdCode,
      number: jointworkPhoneLastDigits,
      preferredMethod: 'N',
      effectiveDate: convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate'),
      type: 'WK',
      seq: '1',
    },
    {
      countryCode: jointhomePhoneCountryCode,
      stdCode: jointhomePhoneStdCode,
      number: jointhomePhoneLastDigits,
      preferredMethod: 'N',
      effectiveDate: convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate'),
      type: 'HM',
      seq: '1',
    },
  ]

  const jointMobile = [
    {
      countryCode: jointmobileCountryCode,
      networkCode: jointmobileProviderCode,
      number: jointmobileLastDigits,
      preferredMethod: 'N',
      effectiveDate: convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate'),
      type: 'MB',
      seq: '1',
    },
  ]

  const jointEmail = [
    {
      address: jointaddress,
      preferredMethod: 'Y',
      effectiveDate: convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate'),
      type: 'HM',
      seq: '1',
    },
  ]

  const primeResidentialDetails = [
    {
      careOfName: '',
      unitType: currResAddressSelectedUnitType,
      apartment: currResAddressSelectedApartment,
      building: currResAddressSelectedBuilding,
      streetNumber: {
        from: currResAddressSelectedStreetNumberFrom,
        to: currResAddressSelectedStreetNumberTo,
      },
      alpha: currResAddressSelectedAlpha,
      streetOrPostalName: currResAddressSelectedStreetOrPostalName,
      streetDirection: currResAddressSelectedStreetDirection,
      streetType: null,
      suburb: currResAddressSelectedSuburb,
      city: currResAddressSelectedCity,
      state: '',
      postCode: currResAddressSelectedPostCode,
      country: {
        code: currResAddressSelectedCountryCode,
        description: currResAddressSelectedCountryDescription,
      },
      contactId: '258790',
      purpose: 'R',
      effectiveDate: convertToUTCTimestamp(currResEffectiveDate, 'currResEffectiveDate'),
      type: 'S',
      seq: '1',
      externalSystemReference: '',
    },
    {
      careOfName: '',
      unitType: prevResAddressSelectedUnitType,
      apartment: prevResAddressSelectedApartment,
      streetNumber: {
        from: prevResAddressSelectedStreetNumberFrom,
        to: prevResAddressSelectedStreetNumberTo,
      },
      alpha: prevResAddressSelectedAlpha,
      streetOrPostalName: prevResAddressSelectedStreetOrPostalName,
      streetDirection: prevResAddressSelectedStreetDirection,
      streetType: null,
      suburb: prevResAddressSelectedSuburb,
      city: prevResAddressSelectedCity,
      state: '',
      postCode: prevResAddressSelectedPostCode,
      country: {
        code: prevResAddressSelectedCountryCode,
        description: prevResAddressSelectedCountryDescription,
      },
      contactId: '258790',
      purpose: 'R',
      effectiveDate: convertToUTCTimestamp(new Date(convertToUTCTimestamp(prevResEffectiveDate, 'currResEffectiveDate')).setFullYear(new Date(convertToUTCTimestamp(prevResEffectiveDate, 'currResEffectiveDate')).getFullYear() - currResYears), ''),
      type: 'S',
      seq: '1',
      externalSystemReference: '',
    },
  ]

  const primeResidentialDetailsSecure = [
    {
      stateData: {
        careOfName: '',
        unitType: currResAddressSelectedUnitType,
        apartment: currResAddressSelectedApartment,
        building: currResAddressSelectedBuilding,
        streetNumber: {
          from: currResAddressSelectedStreetNumberFrom,
          to: currResAddressSelectedStreetNumberTo,
        },
        alpha: currResAddressSelectedAlpha,
        streetOrPostalName: currResAddressSelectedStreetOrPostalName,
        streetDirection: currResAddressSelectedStreetDirection,
        streetType: null,
        suburb: currResAddressSelectedSuburb,
        city: currResAddressSelectedCity,
        state: '',
        postCode: currResAddressSelectedPostCode,
        country: {
          code: currResAddressSelectedCountryCode,
          description: currResAddressSelectedCountryDescription,
        },
        contactId: '258790',
        purpose: 'R',
        effectiveDate: convertToUTCTimestamp(currResEffectiveDate, 'currResEffectiveDate'),
        type: 'S',
        seq: '1',
        externalSystemReference: '',
      },
      update: sovCurrentAddressUpdate,
      expire: sovCurrentAddressExpire,
      sovType: sovCurrentAddressType,
      sovId: sovCurrentAddressId,
      sovAttributes: { expiryDate: convertUnixToUTCTimestamp(defExpiryDate), ...sovCurrentAddressAttributes },
    },
    {
      stateData: {
        careOfName: '',
        unitType: prevResAddressSelectedUnitType,
        apartment: prevResAddressSelectedApartment,
        streetNumber: {
          from: prevResAddressSelectedStreetNumberFrom,
          to: prevResAddressSelectedStreetNumberTo,
        },
        alpha: prevResAddressSelectedAlpha,
        streetOrPostalName: prevResAddressSelectedStreetOrPostalName,
        streetDirection: prevResAddressSelectedStreetDirection,
        streetType: null,
        suburb: prevResAddressSelectedSuburb,
        city: prevResAddressSelectedCity,
        state: '',
        postCode: prevResAddressSelectedPostCode,
        country: {
          code: prevResAddressSelectedCountryCode,
          description: prevResAddressSelectedCountryDescription,
        },
        contactId: '258790',
        purpose: 'R',
        effectiveDate: convertToUTCTimestamp(new Date(convertToUTCTimestamp(prevResEffectiveDate, 'currResEffectiveDate')).setFullYear(new Date(convertToUTCTimestamp(prevResEffectiveDate, 'currResEffectiveDate')).getFullYear() - currResYears), ''),
        type: 'S',
        seq: '1',
        externalSystemReference: '',
      },
      update: sovPreviousAddressUpdate,
      expire: sovPreviousAddressExpire,
      sovType: sovPreviousAddressType,
      sovId: sovPreviousAddressId,
      sovAttributes: { expiryDate: convertUnixToUTCTimestamp(defExpiryDate), ...sovPreviousAddressAttributes },
    },
  ]

  const primeResidentialDetailsSecureToAdd = primeResidentialDetailsSecure
    .filter((residence) => {
      return residence?.update === false && residence?.expire === true
    })
    .map((item) => {
      return { ...item?.stateData }
    })

  const jointResidentialDetails = [
    {
      careOfName: '',
      unitType: jointcurrResAddressSelectedUnitType,
      apartment: jointcurrResAddressSelectedApartment,
      building: jointcurrResAddressSelectedBuilding,
      streetNumber: {
        from: jointcurrResAddressSelectedStreetNumberFrom,
        to: jointcurrResAddressSelectedStreetNumberTo,
      },
      alpha: jointcurrResAddressSelectedAlpha,
      streetOrPostalName: jointcurrResAddressSelectedStreetOrPostalName,
      streetDirection: jointcurrResAddressSelectedStreetDirection,
      streetType: null,
      suburb: jointcurrResAddressSelectedSuburb,
      city: jointcurrResAddressSelectedCity,
      state: '',
      postCode: jointcurrResAddressSelectedPostCode,
      country: {
        code: jointcurrResAddressSelectedCountryCode,
        description: jointcurrResAddressSelectedCountryDescription,
      },
      contactId: '258790',
      purpose: 'R',
      effectiveDate: convertToUTCTimestamp(jointcurrResEffectiveDate, 'currResEffectiveDate'),
      type: 'S',
      seq: '1',
      externalSystemReference: '',
    },
    {
      careOfName: '',
      unitType: jointprevResAddressSelectedUnitType,
      apartment: jointprevResAddressSelectedApartment,
      building: jointprevResAddressSelectedBuilding,
      streetNumber: {
        from: jointprevResAddressSelectedStreetNumberFrom,
        to: jointprevResAddressSelectedStreetNumberTo,
      },
      alpha: jointprevResAddressSelectedAlpha,
      streetOrPostalName: jointprevResAddressSelectedStreetOrPostalName,
      streetDirection: jointprevResAddressSelectedStreetDirection,
      streetType: null,
      suburb: jointprevResAddressSelectedSuburb,
      city: jointprevResAddressSelectedCity,
      state: '',
      postCode: jointprevResAddressSelectedPostCode,
      country: {
        code: jointprevResAddressSelectedCountryCode,
        description: jointprevResAddressSelectedCountryDescription,
      },
      contactId: '258790',
      purpose: 'R',
      effectiveDate: convertToUTCTimestamp(new Date(convertToUTCTimestamp(jointprevResEffectiveDate, 'currResEffectiveDate')).setFullYear(new Date(convertToUTCTimestamp(jointprevResEffectiveDate, 'currResEffectiveDate')).getFullYear() - jointcurrResYears), ''),
      type: 'S',
      seq: '1',
      externalSystemReference: '',
    },
  ]

  const primeClientIdentification = [
    {
      idCode1: checkedIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
      effectiveDate: checkedIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(drLicenceIssueDate, 'drLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(drLicenceExpiryDate, 'drLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: driversLicense,
      seq: '1',
    },
    {
      idCode1: checkedIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
      idCode2: checkedIdentificationTypes.includes('DRVLSC') ? 'DLVERSION' : null,
      effectiveDate: checkedIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(drLicenceIssueDate, 'drLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(drLicenceExpiryDate, 'drLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: driversLicenceVersion,
      seq: '1',
    },
    {
      idCode1: checkedIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
      effectiveDate: checkedIdentificationTypes.includes('PASPRT') ? convertToUTCTimestamp(passportIssueDate, 'passportIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('PASPRT') ? convertToUTCTimestamp(passportExpiryDate, 'passportExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: passportNo,
      seq: '1',
    },
    {
      idCode1: checkedIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
      effectiveDate: checkedIdentificationTypes.includes('FIRELICENS') ? convertToUTCTimestamp(firearmsLicenceIssueDate, 'firearmsLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('FIRELICENS') ? convertToUTCTimestamp(firearmsLicenceExpiryDate, 'firearmsLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: firearmsLicenceNo,
      seq: '1',
    },
    {
      idCode1: checkedIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
      effectiveDate: checkedIdentificationTypes.includes('KIWACCCRD') ? convertToUTCTimestamp(kiwiAccessCardIssueDate, 'kiwiAccessCardIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('KIWACCCRD') ? convertToUTCTimestamp(kiwiAccessCardExpiryDate, 'kiwiAccessCardExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: kiwiAccessCardNo,
      seq: '1',
    },
    {
      idCode1: checkedIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
      effectiveDate: checkedIdentificationTypes.includes('COMSERVCRD') ? convertToUTCTimestamp(commServiceCardIssueDate, 'commServiceCardIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('COMSERVCRD') ? convertToUTCTimestamp(commServiceCardExpiryDate, 'commServiceCardExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: commServiceCardNo,
      seq: '1',
    },
    {
      idCode1: checkedIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
      effectiveDate: checkedIdentificationTypes.includes('BIRTHCERT') ? convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: birthCertificateRegNo,
      seq: '1',
    },
    {
      idCode1: checkedIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
      effectiveDate: checkedIdentificationTypes.includes('CURSTUDID') ? convertToUTCTimestamp(currStudentIdIssueDate, 'currStudentIdIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('CURSTUDID') ? convertToUTCTimestamp(currStudentIdExpiryDate, 'currStudentIdIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: currStudentIdNo,
      seq: '1',
    },
    {
      idCode1: checkedIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
      effectiveDate: checkedIdentificationTypes.includes('GOLDCARD') ? convertToUTCTimestamp(goldCardValidFromDate, 'goldCardValidFromDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: goldCardNo,
      seq: '1',
    },
  ]

  const primeClientIdentificationSecure = [
    {
      idCode1: checkedIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
      effectiveDate: checkedIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(drLicenceIssueDate, 'drLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(drLicenceExpiryDate, 'drLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: driversLicense,
      seq: '1',
      updated: sovTypeUpdateddrLicence,
      expire: sovTypeExpiredrLicence,
      sovType: sovTypedrLicence,
      sovId: soviddrLicence,
      sovAttributes: sovAttributesdrLicence,
    },
    {
      idCode1: checkedIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
      idCode2: checkedIdentificationTypes.includes('DRVLSC') ? 'DLVERSION' : null,
      effectiveDate: checkedIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(drLicenceIssueDate, 'drLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(drLicenceExpiryDate, 'drLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: driversLicenceVersion,
      seq: '1',
      updated: sovTypeUpdateddrLicence,
      expire: sovTypeExpiredrLicence,
      sovType: sovTypedrLicenceVersion,
      sovId: soviddrLicenceVersion,
      sovAttributes: sovAttributesdrLicenceVersion,
    },
    {
      idCode1: checkedIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
      effectiveDate: checkedIdentificationTypes.includes('PASPRT') ? convertToUTCTimestamp(passportIssueDate, 'passportIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('PASPRT') ? convertToUTCTimestamp(passportExpiryDate, 'passportExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: passportNo,
      seq: '1',
      updated: sovTypeUpdatedpassport,
      expire: sovTypeExpirepassport,
      sovType: sovTypepassport,
      sovId: sovidpassport,
      sovAttributes: sovAttributespassport,
    },
    {
      idCode1: checkedIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
      effectiveDate: checkedIdentificationTypes.includes('FIRELICENS') ? convertToUTCTimestamp(firearmsLicenceIssueDate, 'firearmsLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('FIRELICENS') ? convertToUTCTimestamp(firearmsLicenceExpiryDate, 'firearmsLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: firearmsLicenceNo,
      seq: '1',
      updated: sovTypeUpdatedfirearms_licence,
      expire: sovTypeExpirefirearms_licence,
      sovType: sovTypefirearms_licence,
      sovId: sovidfirearms_licence,
      sovAttributes: sovAttributesfirearms_licence,
    },
    {
      idCode1: checkedIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
      effectiveDate: checkedIdentificationTypes.includes('KIWACCCRD') ? convertToUTCTimestamp(kiwiAccessCardIssueDate, 'kiwiAccessCardIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('KIWACCCRD') ? convertToUTCTimestamp(kiwiAccessCardExpiryDate, 'kiwiAccessCardExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: kiwiAccessCardNo,
      seq: '1',
      updated: sovTypeUpdatedkiwi_access_card,
      expire: sovTypeExpirekiwi_access_card,
      sovType: sovTypekiwi_access_card,
      sovId: sovidkiwi_access_card,
      sovAttributes: sovAttributeskiwi_access_card,
    },
    {
      idCode1: checkedIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
      effectiveDate: checkedIdentificationTypes.includes('COMSERVCRD') ? convertToUTCTimestamp(commServiceCardIssueDate, 'commServiceCardIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('COMSERVCRD') ? convertToUTCTimestamp(commServiceCardExpiryDate, 'commServiceCardExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: commServiceCardNo,
      seq: '1',
      updated: sovTypeUpdatedcommunity_service_card,
      expire: sovTypeExpirecommunity_service_card,
      sovType: sovTypecommunity_service_card,
      sovId: sovidcommunity_service_card,
      sovAttributes: sovAttributescommunity_service_card,
    },
    {
      idCode1: checkedIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
      effectiveDate: checkedIdentificationTypes.includes('BIRTHCERT') ? convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: birthCertificateRegNo,
      seq: '1',
      updated: sovTypeUpdatedbirth_certificate,
      expire: sovTypeExpirebirth_certificate,
      sovType: sovTypebirth_certificate,
      sovId: sovidbirth_certificate,
      sovAttributes: sovAttributesbirth_certificate,
    },
    {
      idCode1: checkedIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
      effectiveDate: checkedIdentificationTypes.includes('CURSTUDID') ? convertToUTCTimestamp(currStudentIdIssueDate, 'currStudentIdIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: checkedIdentificationTypes.includes('CURSTUDID') ? convertToUTCTimestamp(currStudentIdExpiryDate, 'currStudentIdIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: currStudentIdNo,
      seq: '1',
      updated: sovTypeUpdatedcurrent_Student_id,
      expire: sovTypeExpirecurrent_Student_id,
      sovType: sovTypecurrent_Student_id,
      sovId: sovidcurrent_Student_id,
      sovAttributes: sovAttributescurrent_Student_id,
    },
    {
      idCode1: checkedIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
      effectiveDate: checkedIdentificationTypes.includes('GOLDCARD') ? convertToUTCTimestamp(goldCardValidFromDate, 'goldCardValidFromDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: goldCardNo,
      seq: '1',
      updated: sovTypeUpdatedgold_card,
      expire: sovTypeExpiregold_card,
      sovType: sovTypegold_card,
      sovId: sovidgold_card,
      sovAttributes: sovAttributesgold_card,
    },
  ]

  const primeClientIdentificationSecureToAdd = primeClientIdentificationSecure.filter((identification) => {
    return identification.idCode1 !== null && ((identification.updated === null && identification.expire === false) || (identification.updated === false && identification.expire === true))
  })

  const primeClientIdentificationSecureToExpire = primeClientIdentificationSecure
    .filter((identification) => {
      return identification.idCode1 !== null && ((identification.updated === true && identification.expire === true) || (identification.updated === false && identification.expire === true))
    })
    .map((item) => {
      return { type: item.sovType, id: item.sovId, attributes: item.sovAttributes }
    })

  const jointClientIdentification = [
    {
      idCode1: checkedJointIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(jointdrLicenceIssueDate, 'jointdrLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: jointApplication && checkedJointIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(jointdrLicenceExpiryDate, 'jointdrLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointdriversLicense,
      seq: '1',
    },
    {
      idCode1: checkedJointIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
      idCode2: checkedJointIdentificationTypes.includes('DRVLSC') ? 'DLVERSION' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(jointdrLicenceIssueDate, 'jointdrLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: jointApplication && checkedJointIdentificationTypes.includes('DRVLSC') ? convertToUTCTimestamp(jointdrLicenceExpiryDate, 'jointdrLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointdriversLicenceVersion,
      seq: '1',
    },
    {
      idCode1: checkedJointIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('PASPRT') ? convertToUTCTimestamp(jointpassportIssueDate, 'jointpassportIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: jointApplication && checkedJointIdentificationTypes.includes('PASPRT') ? convertToUTCTimestamp(jointpassportExpiryDate, 'jointpassportExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointpassportNo,
      seq: '1',
    },
    {
      idCode1: checkedJointIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('FIRELICENS') ? convertToUTCTimestamp(jointfirearmsLicenceIssueDate, 'jointfirearmsLicenceIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: jointApplication && checkedJointIdentificationTypes.includes('FIRELICENS') ? convertToUTCTimestamp(jointfirearmsLicenceExpiryDate, 'jointfirearmsLicenceExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointfirearmsLicenceNo,
      seq: '1',
    },
    {
      idCode1: checkedJointIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('KIWACCCRD') ? convertToUTCTimestamp(jointkiwiAccessCardIssueDate, 'jointkiwiAccessCardIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: jointApplication && checkedJointIdentificationTypes.includes('KIWACCCRD') ? convertToUTCTimestamp(jointkiwiAccessCardExpiryDate, 'jointkiwiAccessCardExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointkiwiAccessCardNo,
      seq: '1',
    },
    {
      idCode1: checkedJointIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('COMSERVCRD') ? convertToUTCTimestamp(jointcommServiceCardIssueDate, 'jointcommServiceCardIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: jointApplication && checkedJointIdentificationTypes.includes('COMSERVCRD') ? convertToUTCTimestamp(jointcommServiceCardExpiryDate, 'jointcommServiceCardExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointcommServiceCardNo,
      seq: '1',
    },
    {
      idCode1: checkedJointIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('BIRTHCERT') ? convertToUTCTimestamp(defEffectiveDate, 'defEffectiveDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointbirthCertificateRegNo,
      seq: '1',
    },
    {
      idCode1: checkedJointIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('CURSTUDID') ? convertToUTCTimestamp(jointcurrStudentIdIssueDate, 'jointcurrStudentIdIssueDate') : convertToUTCTimestamp(defEffectiveDate),
      expiryDate: jointApplication && checkedJointIdentificationTypes.includes('CURSTUDID') ? convertToUTCTimestamp(jointcurrStudentIdExpiryDate, 'jointcurrStudentIdExpiryDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointcurrStudentIdNo,
      seq: '1',
    },
    {
      idCode1: checkedJointIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
      effectiveDate: jointApplication && checkedJointIdentificationTypes.includes('GOLDCARD') ? convertToUTCTimestamp(jointgoldCardValidFromDate, 'jointgoldCardValidFromDate') : convertToUTCTimestamp(defEffectiveDate),
      reference: jointgoldCardNo,
      seq: '1',
    },
  ]

  const primeEmployment = [
    {
      employmentType: {
        type: employmentTypes(employmentType)?.key,
        description: employmentTypes(employmentType)?.value,
      },
      occupation: isNotAnEmployment(employmentType) ? null : occupationTypes(occupation)?.key,
      jobDescription: isNotAnEmployment(employmentType) ? employmentTypes(employmentType)?.value : occupationTypes(occupation)?.value,
      employerName: isNotAnEmployment(employmentType) ? employmentTypes(employmentType)?.value : employerName,
      effectiveDate: convertToUTCTimestamp(empEffectiveDate, 'empEffectiveDate'),
      seq: '1',
    },
    {
      employmentType: {
        type: employmentTypes(prevEmpemploymentType)?.key,
        description: employmentTypes(prevEmpemploymentType)?.value,
      },
      occupation: isNotAnEmployment(prevEmpemploymentType) ? null : occupationTypes(prevEmpoccupation)?.key,
      jobDescription: isNotAnEmployment(prevEmpemploymentType) ? employmentTypes(prevEmpemploymentType)?.value : occupationTypes(prevEmpoccupation)?.value,
      employerName: isNotAnEmployment(prevEmpemploymentType) ? employmentTypes(prevEmpemploymentType)?.value : prevEmpemployerName,
      effectiveDate: convertToUTCTimestamp(defPrevEmpEffective, 'empEffectiveDate'),
      seq: '1',
    },
  ]

  const primeClientEmploymentSecure = [
    {
      type: sovcurrEmpType,
      id: sovcurrEmpID,
      attributes: { expiryDate: fDateYYYY_MM_DD(defExpiryDate), ...sovcurrEmpAttributes },
      update: sovcurrEmpUpdate,
      expire: sovcurrEmpExpire,
    },
    {
      type: sovprevEmpType,
      id: sovprevEmpID,
      attributes: sovprevEmpAttributes,
      update: sovprevEmpUpdate,
      expire: sovprevEmpExpire,
    },
  ]

  const primeClientEmploymentSecureToExpire = primeClientEmploymentSecure.filter((item) => {
    return item?.update === false && item?.expire === true
  })

  const jointEmployment = [
    {
      employmentType: {
        type: employmentTypes(jointemploymentType)?.key,
        description: employmentTypes(jointemploymentType)?.value,
      },
      occupation: isNotAnEmployment(jointemploymentType) ? null : occupationTypes(jointoccupation)?.key,
      jobDescription: isNotAnEmployment(jointemploymentType) ? employmentTypes(jointemploymentType)?.value : occupationTypes(jointoccupation)?.value,
      employerName: isNotAnEmployment(jointemploymentType) ? employmentTypes(jointemploymentType)?.value : jointemployerName,
      effectiveDate: convertToUTCTimestamp(jointempEffectiveDate, 'jointempEffectiveDate'),
      seq: '1',
    },
    {
      employmentType: {
        type: employmentTypes(jointprevEmpemploymentType)?.key,
        description: employmentTypes(jointprevEmpemploymentType)?.value,
      },
      occupation: isNotAnEmployment(jointprevEmpemploymentType) ? null : occupationTypes(jointprevEmpoccupation)?.key,
      jobDescription: isNotAnEmployment(jointprevEmpemploymentType) ? employmentTypes(jointemploymentType)?.value : occupationTypes(jointprevEmpoccupation)?.value,
      employerName: isNotAnEmployment(jointprevEmpemploymentType) ? employmentTypes(jointprevEmpemploymentType)?.value : jointprevEmpemployerName,
      effectiveDate: convertToUTCTimestamp(defPrevEmpEffective, 'empEffectiveDate'),
      seq: '1',
    },
  ]

  const employmentDetailsForPDF = {
    primeCurrentEmployment: {
      employmentType: employmentTypes(employmentType)?.value,
      occupation: isNotAnEmployment(employmentType) ? null : occupationTypes(occupation)?.value,
      jobDescription: isNotAnEmployment(employmentType) ? employmentTypes(employmentType)?.value : occupationTypes(occupation)?.value,
      employerName: isNotAnEmployment(employmentType) ? employmentTypes(employmentType)?.value : employerName,
      effectiveDate: fDate(empEffectiveDate),
      addressLine1: empAddressToDisplayLine1,
      addressLine2: empAddressToDisplayLine2,
      addressLine3: empAddressToDisplayLine3,
      addressLine4: empAddressToDisplayLine4,
    },
    primePreviousEmployment: {
      employmentType: employmentTypes(prevEmpemploymentType)?.value,
      occupation: isNotAnEmployment(prevEmpemploymentType) ? null : occupationTypes(prevEmpoccupation)?.value,
      jobDescription: isNotAnEmployment(prevEmpemploymentType) ? employmentTypes(prevEmpemploymentType)?.value : occupationTypes(prevEmpoccupation)?.value,
      employerName: isNotAnEmployment(prevEmpemploymentType) ? employmentTypes(prevEmpemploymentType)?.value : prevEmpemployerName,
      effectiveDate: fDate(defPrevEmpEffective),
      addressLine1: prevEmpempAddressToDisplayLine1,
      addressLine2: prevEmpempAddressToDisplayLine2,
      addressLine3: prevEmpempAddressToDisplayLine3,
      addressLine4: prevEmpempAddressToDisplayLine4,
    },
    jointCurrentEmployment: {
      employmentType: employmentTypes(jointemploymentType)?.value,
      occupation: isNotAnEmployment(jointemploymentType) ? null : occupationTypes(jointoccupation)?.value,
      jobDescription: isNotAnEmployment(jointemploymentType) ? employmentTypes(jointemploymentType)?.value : occupationTypes(jointoccupation)?.value,
      employerName: isNotAnEmployment(jointemploymentType) ? employmentTypes(jointemploymentType)?.value : jointemployerName,
      effectiveDate: fDate(jointempEffectiveDate),
      addressLine1: jointempAddressToDisplayLine1,
      addressLine2: jointempAddressToDisplayLine2,
      addressLine3: jointempAddressToDisplayLine3,
      addressLine4: jointempAddressToDisplayLine4,
    },
    jointPreviousEmployment: {
      employmentType: employmentTypes(jointprevEmpemploymentType)?.value,
      occupation: isNotAnEmployment(employmentType) ? null : occupationTypes(occupation)?.value,
      jobDescription: isNotAnEmployment(employmentType) ? employmentTypes(employmentType)?.value : occupationTypes(occupation)?.value,
      employerName: isNotAnEmployment(employmentType) ? employmentTypes(employmentType)?.value : employerName,
      effectiveDate: fDate(empEffectiveDate),
      addressLine1: jointprevEmpempAddressToDisplayLine1,
      addressLine2: jointprevEmpempAddressToDisplayLine2,
      addressLine3: jointprevEmpempAddressToDisplayLine3,
      addressLine4: jointprevEmpempAddressToDisplayLine4,
    },
  }

  //* LPI Components Codes
  const lpiDeathCode = useSelector((state) => state.financialDetailsReducer.lpiDeathCode)
  const lpiDisabilityCode = useSelector((state) => state.financialDetailsReducer.lpiDisabilityCode)
  const lpiBankruptcyCode = useSelector((state) => state.financialDetailsReducer.lpiBankruptcyCode)
  const lpiCriticalIllnessCode = useSelector((state) => state.financialDetailsReducer.lpiCriticalIllnessCode)

  //* LPI Components for Prime (optional)
  const hasLpiPrimeDeath = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeDeath)
  const hasLpiPrimeDisability = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeDisability)
  const hasLpiPrimeBankruptcy = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeBankruptcy)
  const hasLpiPrimeCriticalIllness = useSelector((state) => state.financialDetailsReducer.hasLpiPrimeCriticalIllness)

  //* LPI Components for Joint (optional)
  const hasLpiJointDeath = useSelector((state) => state.financialDetailsReducer.hasLpiJointDeath)
  const hasLpiJointDisability = useSelector((state) => state.financialDetailsReducer.hasLpiJointDisability)
  const hasLpiJointBankruptcy = useSelector((state) => state.financialDetailsReducer.hasLpiJointBankruptcy)
  const hasLpiJointCriticalIllness = useSelector((state) => state.financialDetailsReducer.hasLpiJointCriticalIllness)

  //* LPI Upfront Fee Calculated using an external program (received from AWS during LPI Calculation or when user gets to the loan details panel)
  const awsCalculatedLpiAmount = useSelector((state) => state.financialDetailsReducer.awsCalculatedLpiAmount)

  let insurance = [
    {
      component: lpiDeathCode,
      joint: 'N',
      discount: 'N',
      selected: hasLpiPrimeDeath ? 'Y' : 'N',
    },
    {
      component: lpiDeathCode,
      joint: 'Y',
      discount: 'N',
      selected: hasLpiJointDeath ? 'Y' : 'N',
    },
    {
      component: lpiDisabilityCode,
      joint: 'N',
      discount: hasLpiPrimeDisability && hasLpiJointDisability ? 'Y' : 'N',
      selected: hasLpiPrimeDisability ? 'Y' : 'N',
    },
    {
      component: lpiDisabilityCode,
      joint: 'Y',
      discount: hasLpiPrimeDisability && hasLpiJointDisability ? 'Y' : 'N',
      selected: hasLpiJointDisability ? 'Y' : 'N',
    },
    {
      component: lpiBankruptcyCode,
      joint: 'N',
      discount: hasLpiPrimeBankruptcy && hasLpiJointBankruptcy ? 'Y' : 'N',
      selected: hasLpiPrimeBankruptcy ? 'Y' : 'N',
    },
    {
      component: lpiBankruptcyCode,
      joint: 'Y',
      discount: hasLpiPrimeBankruptcy && hasLpiJointBankruptcy ? 'Y' : 'N',
      selected: hasLpiJointBankruptcy ? 'Y' : 'N',
    },
    {
      component: lpiCriticalIllnessCode,
      joint: 'N',
      discount: hasLpiPrimeCriticalIllness && hasLpiJointCriticalIllness ? 'Y' : 'N',
      selected: hasLpiPrimeCriticalIllness ? 'Y' : 'N',
    },
    {
      component: lpiCriticalIllnessCode,
      joint: 'Y',
      discount: hasLpiPrimeCriticalIllness && hasLpiJointCriticalIllness ? 'Y' : 'N',
      selected: hasLpiJointCriticalIllness ? 'Y' : 'N',
    },
  ]

  const primeAssets = [
    {
      amount: asset.asset_home.amount,
      description: asset.asset_home.sovereign.value,
      code: asset.asset_home.sovereign.key,
    },
    {
      amount: asset.asset_Home_and_Contents.amount,
      description: asset.asset_Home_and_Contents.sovereign.value,
      code: asset.asset_Home_and_Contents.sovereign.key,
    },
    {
      amount: asset.asset_vehicles.amount,
      description: asset.asset_vehicles.sovereign.value,
      code: asset.asset_vehicles.sovereign.key,
    },
    {
      amount: asset.asset_boat.amount,
      description: asset.asset_boat.sovereign.value,
      code: asset.asset_boat.sovereign.key,
    },
    {
      amount: asset.asset_savings.amount,
      description: asset.asset_savings.sovereign.value,
      code: asset.asset_savings.sovereign.key,
    },
    {
      amount: asset.asset_kiwisaver.amount,
      description: asset.asset_kiwisaver.sovereign.value,
      code: asset.asset_kiwisaver.sovereign.key,
    },
    {
      amount: asset.asset_nzsuper.amount,
      description: asset.asset_nzsuper.sovereign.value,
      code: asset.asset_nzsuper.sovereign.key,
    },
    {
      amount: asset.asset_s6.amount,
      description: asset.asset_s6.sovereign.value,
      code: asset.asset_s6.sovereign.key,
    },
  ]

  // *****  Prime Liabilities *********** //

  const primeLiabilities = [
    {
      amount: liability.liability_mortgage.amount,
      description: liability.liability_mortgage.sovereign.value,
      code: liability.liability_mortgage.sovereign.key,
    },
    {
      amount: liability.liability_storecard.amount,
      description: liability.liability_storecard.sovereign.value,
      code: liability.liability_storecard.sovereign.key,
    },
    {
      amount: liability.liability_Mastercard.amount,
      description: liability.liability_Mastercard.sovereign.value,
      code: liability.liability_Mastercard.sovereign.key,
    },
    {
      amount: liability.liability_Visa.amount,
      description: liability.liability_Visa.sovereign.value,
      code: liability.liability_Visa.sovereign.key,
    },
    {
      amount: liability.liability_studentloan.amount,
      description: liability.liability_studentloan.sovereign.value,
      code: liability.liability_studentloan.sovereign.key,
    },
  ]
  // *****  Prime Income *********** //

  const primeIncomeUnfiltered = [
    {
      cust_amount: { value: income.income_wages1.amount },
      description: income.income_wages1.sovereign.value,
      frequency: income.income_wages1.frequency.unit,
      code: income.income_wages1.sovereign.key,
    },
    {
      cust_amount: { value: income.income_wages2.amount },
      description: income.income_wages2.sovereign.value,
      frequency: income.income_wages2.frequency.unit,
      code: income.income_wages2.sovereign.key,
    },
    {
      cust_amount: { value: income.income_winz.amount },
      description: income.income_winz.sovereign.value,
      frequency: income.income_winz.frequency.unit,
      code: income.income_winz.sovereign.key,
    },
    {
      cust_amount: { value: income.income_selfemploy.amount },
      description: income.income_selfemploy.sovereign.value,
      frequency: income.income_selfemploy.frequency.unit,
      code: income.income_selfemploy.sovereign.key,
    },
    {
      cust_amount: { value: income.income_nzsuper.amount },
      description: income.income_nzsuper.sovereign.value,
      frequency: income.income_nzsuper.frequency.unit,
      code: income.income_nzsuper.sovereign.key,
    },
    {
      cust_amount: { value: income.income_studylink.amount },
      description: income.income_studylink.sovereign.value,
      frequency: income.income_studylink.frequency.unit,
      code: income.income_studylink.sovereign.key,
    },
    {
      cust_amount: { value: income.income_rentalincome.amount },
      description: income.income_rentalincome.sovereign.value,
      frequency: income.income_rentalincome.frequency.unit,
      code: income.income_rentalincome.sovereign.key,
    },
    {
      cust_amount: { value: income.income_childsupport.amount },
      description: income.income_childsupport.sovereign.value,
      frequency: income.income_childsupport.frequency.unit,
      code: income.income_childsupport.sovereign.key,
    },
    {
      cust_amount: { value: income.income_workingforfamilies.amount },
      description: income.income_workingforfamilies.sovereign.value,
      frequency: income.income_workingforfamilies.frequency.unit,
      code: income.income_workingforfamilies.sovereign.key,
    },
    {
      cust_amount: { value: income.income_broaderincome.amount },
      description: income.income_broaderincome.sovereign.value,
      frequency: income.income_broaderincome.frequency.unit,
      code: income.income_broaderincome.sovereign.key,
    },
  ]

  const primeIncomeWeekly = primeIncomeUnfiltered
    .filter((incomeType) => {
      return incomeType?.frequency === 'W' && !(incomeType?.cust_amount?.value == null)
    })
    .map((incomeType) => {
      return { amount1: incomeType?.cust_amount, description: incomeType?.description, code: incomeType?.code }
    })

  const primeIncomeFortnightly = primeIncomeUnfiltered
    .filter((incomeType) => {
      return incomeType?.frequency === 'F' && !(incomeType?.cust_amount?.value == null)
    })
    .map((incomeType) => {
      return { amount2: incomeType?.cust_amount, description: incomeType?.description, code: incomeType?.code }
    })

  const primeIncomeMonthly = primeIncomeUnfiltered
    .filter((incomeType) => {
      return incomeType?.frequency === 'M' && !(incomeType?.cust_amount?.value == null)
    })
    .map((incomeType) => {
      return { amount3: incomeType?.cust_amount, description: incomeType?.description, code: incomeType?.code }
    })

  const primeIncome = [...primeIncomeWeekly, ...primeIncomeFortnightly, ...primeIncomeMonthly]

  // ***********  Prime Expenses *********** //

  const primeExpensesUnfiltered = [
    {
      cust_amount: { value: expense.expense_RentingBoarding.amount },
      description: expense.expense_RentingBoarding.sovereign.value,
      frequency: expense.expense_RentingBoarding.frequency.unit,
      code: expense.expense_RentingBoarding.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_S6_or_Savings.amount },
      description: expense.expense_S6_or_Savings.sovereign.value,
      frequency: expense.expense_S6_or_Savings.frequency.unit,
      code: expense.expense_S6_or_Savings.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Groceries.amount },
      description: expense.expense_Groceries.sovereign.value,
      frequency: expense.expense_Groceries.frequency.unit,
      code: expense.expense_Groceries.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Power_or_Gas.amount },
      description: expense.expense_Power_or_Gas.sovereign.value,
      frequency: expense.expense_Power_or_Gas.frequency.unit,
      code: expense.expense_Power_or_Gas.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Phone_or_Internet.amount },
      description: expense.expense_Phone_or_Internet.sovereign.value,
      frequency: expense.expense_Phone_or_Internet.frequency.unit,
      code: expense.expense_Phone_or_Internet.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Fuel.amount },
      description: expense.expense_Fuel.sovereign.value,
      frequency: expense.expense_Fuel.frequency.unit,
      code: expense.expense_Fuel.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Wof_Rego.amount },
      description: expense.expense_Wof_Rego.sovereign.value,
      frequency: expense.expense_Wof_Rego.frequency.unit,
      code: expense.expense_Wof_Rego.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Clothing.amount },
      description: expense.expense_Clothing.sovereign.value,
      frequency: expense.expense_Clothing.frequency.unit,
      code: expense.expense_Clothing.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_MedicalExpense.amount },
      description: expense.expense_MedicalExpense.sovereign.value,
      frequency: expense.expense_MedicalExpense.frequency.unit,
      code: expense.expense_MedicalExpense.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Gym.amount },
      description: expense.expense_Gym.sovereign.value,
      frequency: expense.expense_Gym.frequency.unit,
      code: expense.expense_Gym.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Recreation.amount },
      description: expense.expense_Recreation.sovereign.value,
      frequency: expense.expense_Recreation.frequency.unit,
      code: expense.expense_Recreation.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Tithing.amount },
      description: expense.expense_Tithing.sovereign.value,
      frequency: expense.expense_Tithing.frequency.unit,
      code: expense.expense_Tithing.sovereign.key,
    },
    {
      cust_amount: { value: expense.expense_Savings.amount },
      description: expense.expense_Savings.sovereign.value,
      frequency: expense.expense_Savings.frequency.unit,
      code: expense.expense_Savings.sovereign.key,
    },
  ]

  const primeExpensesWeekly = primeExpensesUnfiltered
    .filter((expenseType) => {
      return expenseType?.frequency === 'W' && !(expenseType?.cust_amount?.value == null)
    })
    .map((expenseType) => {
      return { amount1: expenseType?.cust_amount, description: expenseType?.description, code: expenseType?.code }
    })

  const primeExpensesFortnightly = primeExpensesUnfiltered
    .filter((expenseType) => {
      return expenseType?.frequency === 'F' && !(expenseType?.cust_amount?.value == null)
    })
    .map((expenseType) => {
      return { amount2: expenseType?.cust_amount, description: expenseType?.description, code: expenseType?.code }
    })

  const primeExpensesMonthly = primeExpensesUnfiltered
    .filter((expenseType) => {
      return expenseType?.frequency === 'M' && !(expenseType?.cust_amount?.value == null)
    })
    .map((expenseType) => {
      return { amount3: expenseType?.cust_amount, description: expenseType?.description, code: expenseType?.code }
    })

  const primeExpenses = [...primeExpensesWeekly, ...primeExpensesFortnightly, ...primeExpensesMonthly]

  // ----------------  Prime income and expenses for PDF Generation -------------

  const primeIncomeForPDF = [
    {
      amount: income.income_wages1.amount,
      code: income.income_wages1.sovereign.key,
      description: income.income_wages1.sovereign.value,
      frequency: income.income_wages1.frequency.unit,
    },
    {
      amount: income.income_wages2.amount,
      code: income.income_wages2.sovereign.key,
      description: income.income_wages2.sovereign.value,
      frequency: income.income_wages2.frequency.unit,
    },
    {
      amount: income.income_winz.amount,
      code: income.income_winz.sovereign.key,
      description: income.income_winz.sovereign.value,
      frequency: income.income_winz.frequency.unit,
    },
    {
      amount: income.income_selfemploy.amount,
      code: income.income_selfemploy.sovereign.key,
      description: income.income_selfemploy.sovereign.value,
      frequency: income.income_selfemploy.frequency.unit,
    },
    {
      amount: income.income_nzsuper.amount,
      code: income.income_nzsuper.sovereign.key,
      description: income.income_nzsuper.sovereign.value,
      frequency: income.income_nzsuper.frequency.unit,
    },
    {
      amount: income.income_studylink.amount,
      code: income.income_studylink.sovereign.key,
      description: income.income_studylink.sovereign.value,
      frequency: income.income_studylink.frequency.unit,
    },
    {
      amount: income.income_rentalincome.amount,
      code: income.income_rentalincome.sovereign.key,
      description: income.income_rentalincome.sovereign.value,
      frequency: income.income_rentalincome.frequency.unit,
    },
    {
      amount: income.income_childsupport.amount,
      code: income.income_childsupport.sovereign.key,
      description: income.income_childsupport.sovereign.value,
      frequency: income.income_childsupport.frequency.unit,
    },
    {
      amount: income.income_workingforfamilies.amount,
      code: income.income_workingforfamilies.sovereign.key,
      description: income.income_workingforfamilies.sovereign.value,
      frequency: income.income_workingforfamilies.frequency.unit,
    },
    {
      amount: income.income_broaderincome.amount,
      code: income.income_broaderincome.sovereign.key,
      description: income.income_broaderincome.sovereign.value,
      frequency: income.income_broaderincome.frequency.unit,
    },
  ]

  const primeExpensesForPDF = [
    {
      amount: expense.expense_RentingBoarding.amount,
      code: expense.expense_RentingBoarding.sovereign.key,
      description: expense.expense_RentingBoarding.sovereign.value,
      frequency: expense.expense_RentingBoarding.frequency.unit,
    },
    {
      amount: expense.expense_S6_or_Savings.amount,
      code: expense.expense_S6_or_Savings.sovereign.key,
      description: expense.expense_S6_or_Savings.sovereign.value,
      frequency: expense.expense_S6_or_Savings.frequency.unit,
    },
    {
      amount: expense.expense_Groceries.amount,
      code: expense.expense_Groceries.sovereign.key,
      description: expense.expense_Groceries.sovereign.value,
      frequency: expense.expense_Groceries.frequency.unit,
    },
    {
      amount: expense.expense_Power_or_Gas.amount,
      code: expense.expense_Power_or_Gas.sovereign.key,
      description: expense.expense_Power_or_Gas.sovereign.value,
      frequency: expense.expense_Power_or_Gas.frequency.unit,
    },
    {
      amount: expense.expense_Phone_or_Internet.amount,
      code: expense.expense_Phone_or_Internet.sovereign.key,
      description: expense.expense_Phone_or_Internet.sovereign.value,
      frequency: expense.expense_Phone_or_Internet.frequency.unit,
    },
    {
      amount: expense.expense_Fuel.amount,
      code: expense.expense_Fuel.sovereign.key,
      description: expense.expense_Fuel.sovereign.value,
      frequency: expense.expense_Fuel.frequency.unit,
    },
    {
      amount: expense.expense_Wof_Rego.amount,
      code: expense.expense_Wof_Rego.sovereign.key,
      description: expense.expense_Wof_Rego.sovereign.value,
      frequency: expense.expense_Wof_Rego.frequency.unit,
    },
    {
      amount: expense.expense_Clothing.amount,
      code: expense.expense_Clothing.sovereign.key,
      description: expense.expense_Clothing.sovereign.value,
      frequency: expense.expense_Clothing.frequency.unit,
    },
    {
      amount: expense.expense_MedicalExpense.amount,
      code: expense.expense_MedicalExpense.sovereign.key,
      description: expense.expense_MedicalExpense.sovereign.value,
      frequency: expense.expense_MedicalExpense.frequency.unit,
    },
    {
      amount: expense.expense_Gym.amount,
      code: expense.expense_Gym.sovereign.key,
      description: expense.expense_Gym.sovereign.value,
      frequency: expense.expense_Gym.frequency.unit,
    },
    {
      amount: expense.expense_Recreation.amount,
      code: expense.expense_Recreation.sovereign.key,
      description: expense.expense_Recreation.sovereign.value,
      frequency: expense.expense_Recreation.frequency.unit,
    },
    {
      amount: expense.expense_Tithing.amount,
      code: expense.expense_Tithing.sovereign.key,
      description: expense.expense_Tithing.sovereign.value,
      frequency: expense.expense_Tithing.frequency.unit,
    },
    {
      amount: expense.expense_Savings.amount,
      code: expense.expense_Savings.sovereign.key,
      description: expense.expense_Savings.sovereign.value,
      frequency: expense.expense_Savings.frequency.unit,
    },
  ]

  const expireIdentificationRelationships = [
    primeClientIdentificationSecureToExpire.map((item) => {
      return { type: item?.type, id: item?.id }
    }),
  ]

  const expireIdentificationIncluded = primeClientIdentificationSecureToExpire.map((item) => {
    return { type: item?.type, id: item?.id, attributes: item?.attributes }
  })

  const expireEmploymentRelationships = [
    primeClientEmploymentSecureToExpire.map((item) => {
      return { type: item?.type, id: item?.id }
    }),
  ]

  const expireEmploymentIncluded = primeClientEmploymentSecureToExpire.map((item) => {
    return { type: item?.type, id: item?.id, attributes: item?.attributes }
  })

  const expireIncluded = [...expireIdentificationIncluded, ...expireEmploymentIncluded]

  const preliminaryQuestions_MemoLines = ['', '------ Credit Sense ------', '', `Reference: ${creditSenseAppRef == null ? 'N/A' : creditSenseAppRef}`, '', '------ Loan Protection Insurance ------', '', `Total Premium: $${awsCalculatedLpiAmount}`, '', `Prime Borrower Covers: ${hasLpiPrimeDeath ? 'Death' : ''} ${hasLpiPrimeDisability ? ', Disability' : ''} ${hasLpiPrimeBankruptcy ? ', Bankruptcy' : ''} ${hasLpiPrimeCriticalIllness ? ', Critical Illness' : ''}`, '', `Co-Borrower Covers: ${hasLpiJointDeath ? 'Death' : ''} ${hasLpiJointDisability ? ', Disability' : ''} ${hasLpiJointBankruptcy ? ', Bankruptcy' : ''} ${hasLpiJointCriticalIllness ? ', Critical Illness' : ''}`, '', '------ Vehicle Details for Security ------', '', `Vehicle-related Loan Purpose? : ${vehicleRelatedLoanPurpose ? 'Yes' : 'No'}`, '', `Would you like to provide vehicle as loan security? : ${!vehicleRelatedLoanPurpose || vehicleRelatedLoanPurpose == null ? wouldYoulikeToProvideVehicleSecurity : 'N/A'}`, '', `Have you purchased the vehicle yet? : ${hasPurchsedVehicle}`, '', `Vehicle Rego : ${vehicleRegistrationNumber}`, '', '------ Preliminary Questions ------', '', `Are you applying for a joint loan? : ${jointApplication_key}`, '', `What is the purpose of this loan? : ${getLoanPurposeFromKey(loanPurpose)?.value}`, '', `Trading Branch : ${getTradingBranchFromKey(tradingBranch)?.value}`, '', `Citizenship? : ${getCountryFromKey(citizen)?.label}`, '', `Residency : ${isNzCitizen ? 'N/A' : getCountryFromKey(resident)?.label}`, '', `Do you have a work permit? : ${isNzResident ? 'N/A' : hasWorkPermit?.key}`, '', `Do you have a regular income? : ${hasRegularIncome?.key}`, '', `Is your income credited to your FCU Account?: ${incomeCreditedToFCU?.key}`, '', `Have you been declared bankrupt before? : ${wasDeclaredBankrupt?.key}`, '', `Bankruptcy Date: ${wasDeclaredBankrupt?.key === 'No' ? 'N/A' : fDate(bankruptcyDate)}`, '', '------ Privacy Declaration -------', '', `1. Accepted Credit Assesment Checks- ${declarationItems?.CreditAssesment?.accept === true ? 'Yes' : 'No'}`, '', `2. Authorise FCU to disclose data to third parties - ${declarationItems?.AuthoriseFCU?.accept === true ? 'Yes' : 'No'}`, '', `3. Information is true and correct - ${declarationItems?.TrueInformation?.accept === true ? 'Yes' : 'No'}`, '', `4. Comply with AML/CFT obligations - ${declarationItems?.AmlCftObligations?.accept === true ? 'Yes' : 'No'}`, '', `5. Authorise FCU to collect, use and store data - ${declarationItems?.StorePersonalInfo?.accept === true ? 'Yes' : 'No'}`]

  const dispatch = useDispatch()

  function createSubmissionData() {
    if (jointApplication) {
      return JSON.stringify({
        draft: 'N',
        loanAmount: loanAmount,
        interestRate: interestRate,
        repayAmount: sovInstalmentAmount,
        repayFreq: repayFreq,
        loanPurpose: loanPurpose,
        term: term,
        tradingBranch: tradingBranch,
        insurance: insurance
          .filter((item) => {
            return item?.selected === 'Y'
          })
          .map((item) => {
            return { component: item?.component, joint: item?.joint, discount: item?.discount }
          }),
        associatedClients: {
          data: [
            {
              id: '0001022184',
              type: 'associatedClients',
            },
            {
              id: '0000000001',
              type: 'associatedClients',
            },
          ],
        },
        securities: {
          data: [
            {
              type: 'securities',
              id: '0000299612',
            },
          ],
        },
        memoLines: preliminaryQuestions_MemoLines.map((item) => {
          return item
        }),
        included: [
          {
            type: 'associatedClients',
            id: '0001022184',
            attributes: {
              role: 'PRIMEB',
              seq: '1',
              signatureRequired: 'M',
              creditCheckAuthorised: declarationItems?.StorePersonalInfo?.accept === true ? 'Y' : 'N',
              order: '1',
              clientReference: null,
              clientMaint: {
                clientID: '0001022184',
                generalDetails: {
                  externalSystemReference: '',
                  clientType: 'I',
                  status: {
                    code: 'A',
                  },
                  gna: 'N',
                  existingClient: 'Y',
                  defaultManager: '0000148335',
                  individualDetails: {
                    title: title,
                    forename: forenames,
                    surname: lastName,
                    clientOtherNamesExist: otherNames === '' ? 'N' : 'Y',
                    gender: gender,
                    dateOfBirth: convertToUTCTimestamp(dob, 'dob'),
                    dateOfBirthRefused: 'N',
                    maritalStatus: maritalStatusMenuItems(maritalStatus.key)?.key,
                    countryOfResidence: resident,
                    countryOfCitizenship: citizen,
                    numberOfDependants: dependents.toString(),
                    accommodation: {
                      code: getAccommodation(currResYears, residenceType)?.code,
                      description: getAccommodation(currResYears, residenceType)?.description,
                    },
                    resident: isNzCitizen === true ? 'Y' : 'N',
                    smoker: 'N',
                  },
                },
                clientIdentifications: primeClientIdentification.filter((identification) => {
                  return identification.idCode1 !== null
                }),
                contactDetails: {
                  address: primeResidentialDetails.filter((address) => {
                    return address.streetOrPostalName !== null
                  }),
                  phone: primePhone.filter((phone) => {
                    return phone.number !== ''
                  }),
                  mobile: primeMobile.filter((mobile) => {
                    return mobile.number !== ''
                  }),
                  email: primeEmail.filter((email) => {
                    return email.address !== ''
                  }),
                },
                employmentDetails: primeEmployment.filter((emp) => {
                  return emp.employerName !== null
                }),
                clientCapacity: {
                  capacityAssessment: {
                    anyExpectedChanges: 'Y',
                    changeDetails: 'N',
                    assessmentQuestionsAsked: 'Y',
                    selfDeclarationAccepted: 'Y',
                  },
                  joint: 'N',
                  assets: primeAssets.filter((asset) => {
                    return asset.amount !== null
                  }),
                  liabilities: primeLiabilities.filter((liability) => {
                    return liability.amount !== null
                  }),
                  incomes: primeIncome.filter((income) => {
                    return income.amount3 !== null
                  }),
                  expenses: primeExpenses.filter((expense) => {
                    return expense.amount3 !== null
                  }),
                },
                mode: 'Add',
              },
            },
          },
          {
            type: 'associatedClients',
            id: '0000000001',
            attributes: {
              role: 'CO-BOR',
              seq: '2',
              signatureRequired: 'O',
              creditCheckAuthorised: declarationItems?.StorePersonalInfo?.accept === true ? 'Y' : 'N',
              order: '2',
              clientReference: null,
              clientMaint: {
                clientID: '0000000001',
                generalDetails: {
                  externalSystemReference: '',
                  clientType: 'I',
                  status: {
                    code: 'A',
                  },
                  gna: 'N',
                  existingClient: 'Y',
                  defaultManager: '0000148335',
                  individualDetails: {
                    title: jointtitle,
                    forename: jointforenames,
                    surname: jointlastName,
                    clientOtherNamesExist: jointotherNames === '' ? 'N' : 'Y',
                    gender: jointgender,
                    dateOfBirth: convertToUTCTimestamp(jointdob, 'jointdob'),
                    dateOfBirthRefused: 'N',
                    maritalStatus: maritalStatusMenuItems(jointmaritalStatus.key)?.key,
                    countryOfResidence: 'NZD',
                    countryOfCitizenship: 'NZD',
                    numberOfDependants: jointdependents.toString(),
                    accommodation: {
                      code: getAccommodation(jointcurrResYears, jointresidenceType)?.code,
                      description: getAccommodation(jointcurrResYears, jointresidenceType)?.description,
                    },
                    resident: 'Y',
                    smoker: 'N',
                  },
                },
                clientIdentifications: jointClientIdentification.filter((identification) => {
                  return identification.idCode1 !== null
                }),
                contactDetails: {
                  address: jointResidentialDetails.filter((address) => {
                    return address.streetOrPostalName !== null
                  }),
                  phone: jointPhone.filter((phone) => {
                    return phone.number !== ''
                  }),
                  mobile: jointMobile.filter((mobile) => {
                    return mobile.number !== ''
                  }),
                  email: jointEmail.filter((email) => {
                    return email.address !== ''
                  }),
                },
                employmentDetails: jointEmployment.filter((emp) => {
                  return emp.employerName !== null
                }),
                mode: 'Add',
              },
            },
          },
          {
            type: 'securities',
            id: '0000299612',
            attributes: {
              seq: '1',
              accountSecurity: {
                primaryCollateral: 'P',
                effectiveDate: convertToUTCTimestamp(defEffectiveDate),
                clientSecurityRelationship: 'O',
              },
              asset: {
                assetType: 'S',
                classificationCode: 'VEHI',
                securityPercentageToUse: '100',
                condition: {
                  code: 'U',
                  description: '',
                },
                securityStatus: {
                  code: 'C',
                  description: '',
                },
              },
              vehicleMaint: {
                assetExtras: [],
                vehicle: {
                  value: '0000000000',
                  refType: 'ASSIGN',
                },
                vehicleDetails: {
                  // TODO To be added later from redux
                  externalSystemReference: '',
                  make: '',
                  model: '',
                  registrationYear: '',
                  colour: '',
                  nonStandardVehicle: {
                    code: 'Y',
                    description: '',
                  },
                  registrationNumber: vehicleRegistrationNumber,
                  odometer: '0',
                },
              },
            },
          },
        ],
      })
    }

    // * Prime non-member
    return JSON.stringify({
      draft: 'N',
      loanAmount: loanAmount,
      interestRate: interestRate,
      repayAmount: sovInstalmentAmount,
      repayFreq: repayFreq,
      loanPurpose: loanPurpose,
      term: term,
      tradingBranch: tradingBranch,
      insurance: insurance
        .filter((item) => {
          return item?.selected === 'Y'
        })
        .map((item) => {
          return { component: item?.component, joint: item?.joint, discount: item?.discount }
        }),
      associatedClients: {
        data: [
          {
            id: '0001022184',
            type: 'associatedClients',
          },
        ],
      },
      securities: {
        data: [
          {
            type: 'securities',
            id: '0000299612',
          },
        ],
      },
      memoLines: preliminaryQuestions_MemoLines.map((item) => {
        return item
      }),
      included: [
        {
          type: 'associatedClients',
          id: '0001022184',
          attributes: {
            role: 'PRIMEB',
            seq: '1',
            signatureRequired: 'M',
            creditCheckAuthorised: declarationItems?.StorePersonalInfo?.accept === true ? 'Y' : 'N',
            order: '1',
            clientReference: null,
            clientMaint: {
              clientID: '0001022184',
              generalDetails: {
                externalSystemReference: '',
                clientType: 'I',
                status: {
                  code: 'A',
                },
                gna: 'N',
                existingClient: 'Y',
                defaultManager: '0000148335',
                individualDetails: {
                  title: title,
                  forename: forenames,
                  surname: lastName,
                  clientOtherNamesExist: otherNames === '' ? 'N' : 'Y',
                  gender: gender,
                  dateOfBirth: convertToUTCTimestamp(dob, 'dob'),
                  dateOfBirthRefused: 'N',
                  maritalStatus: maritalStatusMenuItems(maritalStatus.key)?.key,
                  countryOfResidence: resident,
                  countryOfCitizenship: citizen,
                  numberOfDependants: dependents.toString(),
                  accommodation: {
                    code: getAccommodation(currResYears, residenceType)?.code,
                    description: getAccommodation(currResYears, residenceType)?.description,
                  },
                  resident: isNzCitizen === true ? 'Y' : 'N',
                  smoker: 'N',
                },
              },
              clientIdentifications: primeClientIdentification.filter((identification) => {
                return identification.idCode1 !== null
              }),
              contactDetails: {
                address: primeResidentialDetails.filter((address) => {
                  return address.streetOrPostalName !== null
                }),
                phone: primePhone.filter((phone) => {
                  return phone.number !== ''
                }),
                mobile: primeMobile.filter((mobile) => {
                  return mobile.number !== ''
                }),
                email: primeEmail.filter((email) => {
                  return email.address !== ''
                }),
              },
              employmentDetails: primeEmployment.filter((emp) => {
                return emp.employerName !== null
              }),
              clientCapacity: {
                capacityAssessment: {
                  anyExpectedChanges: 'Y',
                  changeDetails: 'N',
                  assessmentQuestionsAsked: 'Y',
                  selfDeclarationAccepted: 'Y',
                },
                joint: 'N',
                assets: primeAssets.filter((asset) => {
                  return asset.amount !== null
                }),
                liabilities: primeLiabilities.filter((liability) => {
                  return liability.amount !== null
                }),
                incomes: primeIncome.filter((income) => {
                  return income?.amount3?.value !== null
                }),
                expenses: primeExpenses.filter((expense) => {
                  return expense?.amount3?.value !== null
                }),
              },
              mode: 'Add',
            },
          },
        },
        {
          type: 'securities',
          id: '0000299612',
          attributes: {
            seq: '1',
            accountSecurity: {
              primaryCollateral: 'P',
              effectiveDate: convertToUTCTimestamp(defEffectiveDate),
              clientSecurityRelationship: 'O',
            },
            asset: {
              assetType: 'S',
              classificationCode: 'VEHI',
              securityPercentageToUse: '100',
              condition: {
                code: 'U',
                description: '',
              },
              securityStatus: {
                code: 'C',
                description: '',
              },
            },
            vehicleMaint: {
              assetExtras: [],
              vehicle: {
                value: '0000000000',
                refType: 'ASSIGN',
              },
              vehicleDetails: {
                // TODO To be added later from redux
                externalSystemReference: '',
                make: '',
                model: '',
                registrationYear: '',
                colour: '',
                nonStandardVehicle: {
                  code: 'Y',
                  description: '',
                },
                registrationNumber: vehicleRegistrationNumber,
                odometer: '0',
              },
            },
          },
        },
      ],
    })
  }

  function createPdfData() {
    // For New Members

    if (jointApplication) {
      return {
        creditSense: {
          reference: `${creditSenseAppRef == null ? 'N/A' : creditSenseAppRef}`,
        },
        loanProtectionInsurance: {
          totalPremium: awsCalculatedLpiAmount,
          prime: {
            death: hasLpiPrimeDeath ? 'Yes' : 'No',
            disability: hasLpiPrimeDisability ? 'Yes' : 'No',
            bankrptcy: hasLpiPrimeBankruptcy ? 'Yes' : 'No',
            criticalIllness: hasLpiPrimeCriticalIllness ? 'Yes' : 'No',
          },
          coborrower: {
            death: hasLpiJointDeath ? 'Yes' : 'No',
            disability: hasLpiJointDisability ? 'Yes' : 'No',
            bankrptcy: hasLpiJointBankruptcy ? 'Yes' : 'No',
            criticalIllness: hasLpiJointCriticalIllness ? 'Yes' : 'No',
          },
        },
        securityDetails: {
          vehicle: {
            registrationNumber: vehicleRegistrationNumber ? vehicleRegistrationNumber : 'N/A',
            vehicleRelatedLoanPurpose: vehicleRelatedLoanPurpose ? 'Yes' : 'No',
            wouldYouLikeToProvideVehicleAsSecurity: !vehicleRelatedLoanPurpose || vehicleRelatedLoanPurpose == null ? wouldYoulikeToProvideVehicleSecurity : 'N/A',
            haveYouPurchasedTheVehicle: hasPurchsedVehicle,
          },
        },
        primeDetails: {
          applicationNumber: applicationReference,
          individualDetails: {
            title: title,
            forename: forenames,
            surname: lastName,
            clientOtherNamesExist: otherNames === '' ? 'N' : 'Y',
            gender: gender,
            dateOfBirth: fDate(dob),
            dateOfBirthRefused: 'N',
            maritalStatus: maritalStatusMenuItems(maritalStatus.key)?.value,
            countryOfResidence: resident,
            countryOfCitizenship: citizen,
            numberOfDependants: dependents.toString(),
            accommodationDesc: getAccommodation(currResYears, residenceType)?.description,
            resident: isNzCitizen === true ? 'Y' : 'N',
            smoker: 'N',
          },
          identification: {
            drLicence: {
              isPresent: checkedIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
              reference: driversLicense,
              driversLicenceVersion: driversLicenceVersion,
              driversLicenceType: driversLicenseType,
              issueDate: fDate(drLicenceIssueDate),
              expiryDate: fDate(drLicenceExpiryDate),
            },
            passport: {
              isPresent: checkedIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
              reference: passportNo,
              issueDate: fDate(passportIssueDate),
              expiryDate: fDate(passportExpiryDate),
            },
            firearmsLicence: {
              isPresent: checkedIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
              reference: firearmsLicenceNo,
              issueDate: fDate(firearmsLicenceIssueDate),
              expiryDate: fDate(firearmsLicenceExpiryDate),
            },
            kiwiAccessCard: {
              isPresent: checkedIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
              reference: kiwiAccessCardNo,
              issueDate: convertToUTCTimestamp(kiwiAccessCardIssueDate),
              expiryDate: convertToUTCTimestamp(kiwiAccessCardExpiryDate),
            },
            communityServiceCard: {
              isPresent: checkedIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
              reference: commServiceCardNo,
              issueDate: fDate(commServiceCardIssueDate),
              expiryDate: fDate(commServiceCardExpiryDate),
            },
            birthCertificate: {
              isPresent: checkedIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
              reference: birthCertificateRegNo,
              issueDate: fDate(defEffectiveDate),
            },
            currentStudentId: {
              isPresent: checkedIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
              reference: currStudentIdNo,
              issueDate: fDate(currStudentIdIssueDate),
              expiryDate: fDate(currStudentIdExpiryDate),
            },
            goldCard: {
              isPresent: checkedIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
              reference: goldCardNo,
              issueDate: fDate(goldCardValidFromDate),
            },
          },
          address: {
            primeCurrentResidence: {
              addressLine1: currResAddressToDisplayLine1,
              addressLine2: currResAddressToDisplayLine2,
              addressLine3: currResAddressToDisplayLine3,
              addressLine4: currResAddressToDisplayLine4,
            },
            primePreviousResidence: {
              addressLine1: prevResAddressToDisplayLine1,
              addressLine2: prevResAddressToDisplayLine2,
              addressLine3: prevResAddressToDisplayLine3,
              addressLine4: prevResAddressToDisplayLine4,
            },
          },
          phone: primePhone.filter((phone) => {
            return phone.number !== ''
          })
            ? primePhone.filter((phone) => {
                return phone.number !== ''
              })
            : null,
          mobile: primeMobile.filter((mobile) => {
            return mobile.number !== ''
          })
            ? primeMobile.filter((mobile) => {
                return mobile.number !== ''
              })
            : null,
          email: primeEmail.filter((email) => {
            return email.address !== ''
          })
            ? primeEmail.filter((email) => {
                return email.address !== ''
              })
            : null,
          employemnt: employmentDetailsForPDF,
          assets: primeAssets.filter((asset) => {
            return asset.amount !== null
          })
            ? primeAssets.filter((asset) => {
                return asset.amount !== null
              })
            : null,
          liabilities: primeLiabilities.filter((liability) => {
            return liability.amount !== null
          })
            ? primeLiabilities.filter((liability) => {
                return liability.amount !== null
              })
            : null,
          incomes: primeIncomeForPDF,
          expenses: primeExpensesForPDF,
        },
        jointDetails: {
          applicationNumber: applicationReference,
          individualDetails: {
            title: jointtitle,
            forename: jointforenames,
            surname: jointlastName,
            clientOtherNamesExist: jointotherNames === '' ? 'N' : 'Y',
            gender: jointgender,
            dateOfBirth: fDate(jointdob, 'jointdob'),
            dateOfBirthRefused: 'N',
            maritalStatus: maritalStatusMenuItems(jointmaritalStatus.key)?.value,
            countryOfResidence: 'NZD',
            countryOfCitizenship: 'NZD',
            numberOfDependants: jointdependents.toString(),
            accommodationDesc: getAccommodation(jointcurrResYears, jointresidenceType)?.description,
          },
          identification: {
            drLicence: {
              isPresent: checkedJointIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
              reference: jointdriversLicense,
              driversLicenceVersion: jointdriversLicenceVersion,
              driversLicenceType: jointlicenceType,
              issueDate: fDate(jointdrLicenceIssueDate),
              expiryDate: fDate(jointdrLicenceExpiryDate),
            },
            passport: {
              isPresent: checkedJointIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
              reference: jointpassportNo,
              issueDate: fDate(jointpassportIssueDate),
              expiryDate: fDate(jointpassportExpiryDate),
            },
            firearmsLicence: {
              isPresent: checkedJointIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
              reference: jointfirearmsLicenceNo,
              issueDate: fDate(jointfirearmsLicenceIssueDate),
              expiryDate: fDate(jointfirearmsLicenceExpiryDate),
            },
            kiwiAccessCard: {
              isPresent: checkedJointIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
              reference: jointkiwiAccessCardNo,
              issueDate: fDate(jointkiwiAccessCardIssueDate),
              expiryDate: fDate(jointkiwiAccessCardExpiryDate),
            },
            communityServiceCard: {
              isPresent: checkedJointIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
              reference: jointcommServiceCardNo,
              issueDate: fDate(jointcommServiceCardIssueDate),
              expiryDate: fDate(jointcommServiceCardExpiryDate),
            },
            birthCertificate: {
              isPresent: checkedJointIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
              reference: jointbirthCertificateRegNo,
              issueDate: fDate(defEffectiveDate),
            },
            currentStudentId: {
              isPresent: checkedJointIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
              reference: jointcurrStudentIdNo,
              issueDate: fDate(jointcurrStudentIdIssueDate),
              expiryDate: fDate(jointcurrStudentIdExpiryDate),
            },
            goldCard: {
              isPresent: checkedJointIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
              reference: jointgoldCardNo,
              issueDate: fDate(jointgoldCardValidFromDate),
            },
          },
          address: {
            jointCurrentResidence: {
              addressLine1: jointcurrResAddressToDisplayLine1,
              addressLine2: jointcurrResAddressToDisplayLine2,
              addressLine3: jointcurrResAddressToDisplayLine3,
              addressLine4: jointcurrResAddressToDisplayLine4,
            },
            jointPreviousResidence: {
              addressLine1: jointprevResAddressToDisplayLine1,
              addressLine2: jointprevResAddressToDisplayLine2,
              addressLine3: jointprevResAddressToDisplayLine3,
              addressLine4: jointprevResAddressToDisplayLine4,
            },
          },
          phone: jointPhone.filter((phone) => {
            return phone.number !== ''
          })
            ? jointPhone.filter((phone) => {
                return phone.number !== ''
              })
            : null,
          mobile: jointMobile.filter((mobile) => {
            return mobile.number !== ''
          })
            ? jointMobile.filter((mobile) => {
                return mobile.number !== ''
              })
            : null,
          email: jointEmail.filter((email) => {
            return email.address !== ''
          })
            ? jointEmail.filter((email) => {
                return email.address !== ''
              })
            : null,
          employemnt: employmentDetailsForPDF,
        },
        financialDetails: {
          loanAmount: loanAmount,
          interestRate: interestRate,
          repayAmount: sovInstalmentAmount,
          repayFreq: repayFreq,
          term: term,
        },
        preliminaryQuestions: {
          loanPurpose: getLoanPurposeFromKey(loanPurpose)?.value,
          tradingBranch: getTradingBranchFromKey(tradingBranch)?.value,
          citizen: citizen,
          isNzCitizen: isNzCitizen,
          resident: resident,
          isNzResident: isNzResident,
          hasWorkPermit: hasWorkPermit,
          hasRegularIncome: hasRegularIncome,
          incomeCreditedToFCU: incomeCreditedToFCU,
          wasDeclaredBankrupt: wasDeclaredBankrupt,
          bankruptcyDate: bankruptcyDate,
        },

        privacyDeclaration: {
          acceptCreditAssesment: declarationItems?.CreditAssesment?.accept,
          acceptAuthoriseFCUToUseData: declarationItems?.AuthoriseFCU?.accept,
          acceptTrueInformation: declarationItems?.TrueInformation?.accept,
          acceptAMLCFTObligations: declarationItems?.AmlCftObligations?.accept,
          acceptStorePersonalInfo: declarationItems?.StorePersonalInfo?.accept,
        },
      }
    }

    return {
      creditSense: {
        reference: `${creditSenseAppRef == null ? 'N/A' : creditSenseAppRef}`,
      },
      loanProtectionInsurance: {
        totalPremium: awsCalculatedLpiAmount,
        prime: { death: hasLpiPrimeDeath ? 'Yes' : 'No', disability: hasLpiPrimeDisability ? 'Yes' : 'No', bankrptcy: hasLpiPrimeBankruptcy ? 'Yes' : 'No', criticalIllness: hasLpiPrimeCriticalIllness ? 'Yes' : 'No' },
      },
      securityDetails: {
        vehicle: {
          registrationNumber: vehicleRegistrationNumber ? vehicleRegistrationNumber : 'N/A',
          vehicleRelatedLoanPurpose: vehicleRelatedLoanPurpose ? 'Yes' : 'No',
          wouldYouLikeToProvideVehicleAsSecurity: !vehicleRelatedLoanPurpose || vehicleRelatedLoanPurpose == null ? wouldYoulikeToProvideVehicleSecurity : 'N/A',
          haveYouPurchasedTheVehicle: hasPurchsedVehicle,
        },
      },
      primeDetails: {
        applicationNumber: applicationReference,
        individualDetails: {
          title: title,
          forename: forenames,
          surname: lastName,
          clientOtherNamesExist: otherNames === '' ? 'N' : 'Y',
          gender: gender,
          dateOfBirth: convertToUTCTimestamp(dob, 'dob'),
          dateOfBirthRefused: 'N',
          maritalStatus: maritalStatusMenuItems(maritalStatus.key)?.value,
          countryOfResidence: resident,
          countryOfCitizenship: citizen,
          numberOfDependants: dependents.toString(),
          accommodationDesc: getAccommodation(currResYears, residenceType)?.description,
          resident: isNzCitizen === true ? 'Y' : 'N',
          smoker: 'N',
        },
        identification: {
          drLicence: {
            isPresent: checkedIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
            reference: driversLicense,
            driversLicenceVersion: driversLicenceVersion,
            driversLicenceType: driversLicenseType,
            issueDate: fDate(drLicenceIssueDate),
            expiryDate: fDate(drLicenceExpiryDate),
          },
          passport: {
            isPresent: checkedIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
            reference: passportNo,
            issueDate: fDate(passportIssueDate),
            expiryDate: fDate(passportExpiryDate),
          },
          firearmsLicence: {
            isPresent: checkedIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
            reference: firearmsLicenceNo,
            issueDate: fDate(firearmsLicenceIssueDate),
            expiryDate: fDate(firearmsLicenceExpiryDate),
          },
          kiwiAccessCard: {
            isPresent: checkedIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
            reference: kiwiAccessCardNo,
            issueDate: fDate(kiwiAccessCardIssueDate),
            expiryDate: fDate(kiwiAccessCardExpiryDate),
          },
          communityServiceCard: {
            isPresent: checkedIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
            reference: commServiceCardNo,
            issueDate: fDate(commServiceCardIssueDate),
            expiryDate: fDate(commServiceCardExpiryDate),
          },
          birthCertificate: {
            isPresent: checkedIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
            reference: birthCertificateRegNo,
            issueDate: fDate(defEffectiveDate),
          },
          currentStudentId: {
            isPresent: checkedIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
            reference: currStudentIdNo,
            issueDate: fDate(currStudentIdIssueDate),
            expiryDate: fDate(currStudentIdExpiryDate),
          },
          goldCard: {
            isPresent: checkedIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
            reference: goldCardNo,
            issueDate: fDate(goldCardValidFromDate),
          },
        },
        address: {
          primeCurrentResidence: {
            addressLine1: currResAddressToDisplayLine1,
            addressLine2: currResAddressToDisplayLine2,
            addressLine3: currResAddressToDisplayLine3,
            addressLine4: currResAddressToDisplayLine4,
          },
          primePreviousResidence: {
            addressLine1: prevResAddressToDisplayLine1,
            addressLine2: prevResAddressToDisplayLine2,
            addressLine3: prevResAddressToDisplayLine3,
            addressLine4: prevResAddressToDisplayLine4,
          },
        },
        phone: primePhone.filter((phone) => {
          return phone.number !== ''
        })
          ? primePhone.filter((phone) => {
              return phone.number !== ''
            })
          : null,
        mobile: primeMobile.filter((mobile) => {
          return mobile.number !== ''
        })
          ? primeMobile.filter((mobile) => {
              return mobile.number !== ''
            })
          : null,
        email: primeEmail.filter((email) => {
          return email.address !== ''
        })
          ? primeEmail.filter((email) => {
              return email.address !== ''
            })
          : null,
        employemnt: employmentDetailsForPDF,
        assets: primeAssets.filter((asset) => {
          return asset.amount !== null
        })
          ? primeAssets.filter((asset) => {
              return asset.amount !== null
            })
          : null,
        liabilities: primeLiabilities.filter((liability) => {
          return liability.amount !== null
        })
          ? primeLiabilities.filter((liability) => {
              return liability.amount !== null
            })
          : null,
        incomes: primeIncomeForPDF,
        expenses: primeExpensesForPDF,
      },
      financialDetails: {
        loanAmount: loanAmount,
        interestRate: interestRate,
        repayAmount: sovInstalmentAmount,
        repayFreq: repayFreq,
        term: term,
      },
      preliminaryQuestions: {
        loanPurpose: getLoanPurposeFromKey(loanPurpose)?.value,
        tradingBranch: getTradingBranchFromKey(tradingBranch)?.value,
        citizen: citizen,
        isNzCitizen: isNzCitizen,
        resident: resident,
        isNzResident: isNzResident,
        hasWorkPermit: hasWorkPermit,
        hasRegularIncome: hasRegularIncome,
        incomeCreditedToFCU: incomeCreditedToFCU,
        wasDeclaredBankrupt: wasDeclaredBankrupt,
        bankruptcyDate: bankruptcyDate,
      },
      privacyDeclaration: {
        acceptCreditAssesment: declarationItems?.CreditAssesment?.accept,
        acceptAuthoriseFCUToUseData: declarationItems?.AuthoriseFCU?.accept,
        acceptTrueInformation: declarationItems?.TrueInformation?.accept,
        acceptAMLCFTObligations: declarationItems?.AmlCftObligations?.accept,
        acceptStorePersonalInfo: declarationItems?.StorePersonalInfo?.accept,
      },
    }
  }

  useEffect(() => {
    if (submissionFulfilled == null) return

    const timestamp = new Date()
    const generatePdfConfig = {
      url: '/generate-pdf',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 60000,
      data: JSON.stringify({
        applicationData: createPdfData(),
        applicationNumber: applicationReference == null ? forenames + ' ' + lastName + ' ' + fDateCustom(timestamp) : applicationReference,
        submissionAPIResults: {
          axiosCode: axiosCode,
          axiosCodeMessage: axiosCodeMessage,
          axiosCodeName: axiosCodeName,
          axiosRequestStatus: axiosRequestStatus,
          axiosRequestStatusText: axiosRequestStatusText,
          submissionStatusCode: submissionStatusCode,
          submissionFulfilled: submissionFulfilled,
          serverErrorSubmission: serverErrorSubmission,
        },
      }),
    }

    dispatch(generateLoanApplicationReport(generatePdfConfig))
  }, [submissionFulfilled])

  function getRequestConfig() {
    const config = {
      url: '/submitonlineapp',
      method: 'POST',
      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
      headers: {
        'Content-Type': 'application/json',
        authorizationToken: onlinetoken,
        _y: `${processNodeEnv() === 'development' ? 0 : 1}`,
      },
      timeout: 60000,
      data: createSubmissionData(),
    }

    return config
  }

  useEffect(() => {
    if (onlinetoken === null) {
      const authConfig = {
        url: '/online-token',
        method: 'POST',
        baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_AUTH : BASE_URL_AWS_AUTH}`,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
        data: JSON.stringify({
          clientID: HEADER_CONSTANTS.clientID,
          mode: HEADER_CONSTANTS.mode,
        }),
      }

      dispatch(onlineAppAuth(authConfig))
    }

    if (submit !== null) {
      const config = getRequestConfig()
      dispatch(submitLoanApplication(config))

      return
    }
  }, [submit])

  // **************** useEffect for generating PDF - To be completed in the next release *************** //

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  function handleLoanSubmission() {
    if (submit === null) {
      triggerSubmit(true)
      return
    }
    triggerSubmit(!submit)
  }

  const mailTo = `mailto:loans@firstcu.co.nz?subject=${applicationReference == null ? 'Online%20Application%20-%20' + title + '%20' + forenames + '%20' + lastName : 'Online%20Application%20-%20' + applicationReference}`

  return (
    <>
      {loadingSubmission === 'IDLE' && loading === 'IDLE' && applicationReference === null && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
          <ContentStyle sx={{ width: '100%', maxWidth: '100%' }}>
            <Box sx={{ pb: 3, textAlign: 'center' }}>
              <Typography variant='h6' sx={{ fontWeight: 'light' }}>
                Loan Summary
              </Typography>
            </Box>
            <Stack direction='column' justifyContent='flex-start' spacing={3}>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Estimated Payment</SummaryLabel>
                <Stack direction='row' justifyContent='flex-end' alignItems='center' spacing={0.5}>
                  <ValueTypography>{fCurrency(sovInstalmentAmount)}</ValueTypography>
                  <Typography sx={{ fontSize: 12 }} variant='caption'>
                    {sovPaymentFrequencyType1 === 'M' ? ' /month' : sovPaymentFrequencyType1 === 'F' ? ' /fortnight' : ' /week'}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Loan Amount</SummaryLabel>
                <ValueTypography>{fCurrency(loanAmount)}</ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Loan Protection Insurance</SummaryLabel>
                <ValueTypography>{fCurrency(awsCalculatedLpiAmount)}</ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'}>Loan Cost Recovery Fees</SummaryLabel>
                <ValueTypography>{fCurrency(creditCheckAmount + creditSenseAmount + motorwebCheckAmount + cloudCheckIdVerificationAmount + cloudCheckPEPSanctionsAmount + ppsrAmount + docusignAmount)}</ValueTypography>
              </Stack>
              <Divider sx={{ backgroundColor: 'secondary.main', width: '100%' }} />
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel variant={downSm ? 'caption' : 'subtitle2'} sx={{ fontWeight: 'medium' }}>
                  Principal Amount
                </SummaryLabel>
                <ValueTypography variant={downSm ? 'caption' : 'subtitle2'} sx={{ fontWeight: 'medium' }}>
                  {fCurrency(loanAmount + awsCalculatedLpiAmount + creditCheckAmount + creditSenseAmount + cloudCheckIdVerificationAmount + cloudCheckPEPSanctionsAmount + motorwebCheckAmount + docusignAmount + ppsrAmount)}
                </ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Loan Term</SummaryLabel>
                <ValueTypography>{term} month(s)</ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Interest Rate</SummaryLabel>
                <ValueTypography>{interestRate}% p.a.</ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Total Interest</SummaryLabel>
                <ValueTypography>{fCurrency(sovInterestAmount)}</ValueTypography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <SummaryLabel>Total Amount Payable</SummaryLabel>
                <ValueTypography>{fCurrency(sovAmountPayable)}</ValueTypography>
              </Stack>
            </Stack>
          </ContentStyle>
          <Button variant='contained' color='secondary' onClick={handleLoanSubmission} sx={{ borderRadius: 49 }} endIcon={<SendRoundedIcon />}>
            Submit Application
          </Button>
        </Stack>
      )}
      {loadingSubmission === 'IDLE' && applicationReference !== null && errorsSubmission == null && serverErrorSubmission == null && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
          <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
            <Box sx={{ py: 2 }}>
              <CheckCircleRoundedIcon color='success' sx={{ fontSize: 80 }} />
            </Box>
            <Subtitle variant='h6' clor='primary' sx={{ textAlign: 'center' }}>
              Thank you for submiting your loan application.
            </Subtitle>
          </Stack>
          {submissionStatusCode === SUBMISSION_STATUS?.CODE && (
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={1} sx={{ display: 'flex', flexGrow: 1, width: '100%' }}>
              <Typography variant='body1' sx={{ fontWeight: 'light' }}>
                Your Application Number is:
              </Typography>
              <Typography variant='body1' color='primary' sx={{ fontWeight: 'bold' }}>
                {applicationReference}
              </Typography>
            </Stack>
          )}
          <Typography variant='subtitle2' sx={{ fontWeight: 'light', textAlign: 'center' }}>
            We will let you know if your loan application has been approved as soon we can. If you need to make any changes or would like to enquire as to the progress, please contact us on <strong>(07) 834 4810</strong> during normal office hours or{' '}
            <strong>
              <a href={mailTo}>loans@firstcu.co.nz</a>
            </strong>{' '}
            quoting the above application number.
          </Typography>
        </Stack>
      )}
      {loading === 'PENDING' && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ display: 'flex', flexGrow: 1, width: '100%', minHeight: '30vh' }}>
          <SyncLoader css={override} size={15} color={PRIMARY.main} loading={true} speedMultiplier={1.5} />
          <Typography variant='body2' sx={{ fontWeight: 'default' }}>
            Validating Session
          </Typography>
        </Stack>
      )}
      {loadingSubmission === 'PENDING' && (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={5} sx={{ display: 'flex', flexGrow: 1, width: '100%', minHeight: '30vh' }}>
          <SyncLoader css={override} size={15} color={PRIMARY.main} loading={true} speedMultiplier={1.5} />
          <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
            Please wait while we submit your application...
          </Typography>
        </Stack>
      )}
    </>
  )
}

{
  /* <Stack direction='row' justifyContent='center' alignItems='center'>
                  <RepaymentSchedule fullWidth={true} maxWidth='lg' open={open} handleClose={handleClosePreview} sovInstalments={sovInstalments} />
                </Stack> */
}

// function handlePdfDocument() {
//   let pdfDataForPrimeOnlyApplication = {
//     primeDetails: {
//       applicationNumber: '0020816724',
//       individualDetails: {
//         title: 'Mr',
//         forename: 'Herb',
//         surname: 'Wulff',
//         clientOtherNamesExist: 'N',
//         gender: 'Male',
//         dateOfBirth: '1991-06-20T00:00:00.000Z',
//         dateOfBirthRefused: 'N',
//         maritalStatus: 'Single',
//         countryOfResidence: 'LC',
//         countryOfCitizenship: 'DO',
//         numberOfDependants: '3',
//         accommodationDesc: 'Renting less than 2',
//         resident: 'N',
//         smoker: 'N',
//       },
//       identification: {
//         drLicence: {
//           isPresent: 'DRVLSC',
//           reference: 'GE123456',
//           driversLicenceVersion: '714',
//           driversLicenceType: 'Learners',
//           issueDate: '21 June 2012',
//           expiryDate: '21 June 2022',
//         },
//         passport: {
//           isPresent: 'PASPRT',
//           reference: 'XT123456',
//           issueDate: '21 June 2012',
//           expiryDate: '21 June 2022',
//         },
//         firearmsLicence: {
//           isPresent: null,
//           reference: '',
//           issueDate: '01 January 1970',
//           expiryDate: '01 January 1970',
//         },
//         kiwiAccessCard: {
//           isPresent: null,
//           reference: '',
//           issueDate: '01 January 1970',
//           expiryDate: '01 January 1970',
//         },
//         communityServiceCard: {
//           isPresent: null,
//           reference: '',
//           issueDate: '01 January 1970',
//           expiryDate: '01 January 1970',
//         },
//         birthCertificate: {
//           isPresent: null,
//           reference: '',
//           issueDate: '05 October 2022',
//         },
//         currentStudentId: {
//           isPresent: null,
//           reference: '',
//           issueDate: '01 January 1970',
//           expiryDate: '01 January 1970',
//         },
//         goldCard: {
//           isPresent: null,
//           reference: '',
//           issueDate: '01 January 1970',
//         },
//       },
//       address: {
//         primeCurrentResidence: {
//           addressLine1: 'Unit 2',
//           addressLine2: '16 Manning Street',
//           addressLine3: 'Hamilton Central',
//           addressLine4: 'Hamilton 3204',
//         },
//         primePreviousResidence: {
//           addressLine1: '63 Ascot Road',
//           addressLine2: 'Chartwell',
//           addressLine3: 'Hamilton 3210',
//           addressLine4: null,
//         },
//       },
//       phone: [],
//       mobile: [
//         {
//           countryCode: '64',
//           networkCode: '21',
//           number: '2549633',
//           preferredMethod: 'N',
//           effectiveDate: '2022-10-04T00:00:00.000Z',
//           type: 'MB',
//           seq: '1',
//         },
//       ],
//       email: [
//         {
//           address: 'samisaac75@gmail.com',
//           preferredMethod: 'Y',
//           effectiveDate: '2022-10-04T00:00:00.000Z',
//           type: 'HM',
//           seq: '1',
//         },
//       ],
//       employemnt: {
//         primeCurrentEmployment: {
//           employmentType: 'Full-Time Employment',
//           occupation: 'Managers',
//           jobDescription: 'Managers',
//           employerName: 'First Credit Union',
//           effectiveDate: '05 October 2015',
//           addressLine1: '111 Collingwood Street',
//           addressLine2: 'Hamilton Central',
//           addressLine3: 'Hamilton 3204',
//           addressLine4: null,
//         },
//         primePreviousEmployment: {
//           employmentType: 'Full-Time Employment',
//           occupation: 'Professionals',
//           jobDescription: 'Professionals',
//           employerName: 'Bank of New Zealand',
//           effectiveDate: '05 October 1922',
//           addressLine1: '54 Green Lane',
//           addressLine2: 'Motueka 7120',
//           addressLine3: null,
//           addressLine4: null,
//         },
//         jointCurrentEmployment: {
//           employerName: null,
//           effectiveDate: '05 October 2015',
//           addressLine1: null,
//           addressLine2: null,
//           addressLine3: null,
//           addressLine4: null,
//         },
//         jointPreviousEmployment: {
//           occupation: '001',
//           jobDescription: 'Managers',
//           employerName: 'First Credit Union',
//           effectiveDate: '05 October 2015',
//           addressLine1: null,
//           addressLine2: null,
//           addressLine3: null,
//           addressLine4: null,
//         },
//       },
//       assets: [
//         {
//           amount: 1000000,
//           description: 'Home',
//           code: 'HOME',
//         },
//         {
//           amount: 500000,
//           description: 'Household Contents',
//           code: 'HSHLDCNT',
//         },
//         {
//           amount: 75000,
//           description: 'Motor Vehicle/s',
//           code: 'MTRVHCAS',
//         },
//         {
//           amount: 55500,
//           description: 'Boat',
//           code: 'BOAT',
//         },
//         {
//           amount: 50000000,
//           description: 'Savings',
//           code: 'SAVNG',
//         },
//         {
//           amount: 1000,
//           description: 'Kiwisaver/Superannuation',
//           code: 'KIWISUPER',
//         },
//         {
//           amount: 500,
//           description: 'New Zealand Super',
//           code: 'NZSUPER',
//         },
//         {
//           amount: 5000,
//           description: 'Bank Account S6',
//           code: 'ACCNTS6',
//         },
//       ],
//       liabilities: [
//         {
//           amount: 1500000,
//           description: 'First Mortgage',
//           code: '1STMORT',
//         },
//         {
//           amount: 50000,
//           description: 'Store Cards/Hire Purchase',
//           code: 'SCRDHPUR',
//         },
//         {
//           amount: 40000,
//           description: 'Mastercard',
//           code: 'MSCARD',
//         },
//         {
//           amount: 50060,
//           description: 'Visa Card',
//           code: 'VISACARD',
//         },
//         {
//           amount: 100000,
//           description: 'Student Loan',
//           code: 'STUDENTLO',
//         },
//       ],
//       incomes: [
//         {
//           amount: 50000,
//           code: 'WAGES',
//           description: 'Wages',
//           frequency: 'F',
//         },
//         {
//           amount: 10000,
//           code: 'OTHIN1',
//           description: 'Other Income',
//           frequency: 'W',
//         },
//         {
//           amount: 5000,
//           code: 'BENFIT',
//           description: 'WINZ Benefit',
//           frequency: 'W',
//         },
//         {
//           amount: 450000,
//           code: 'SLFEMP',
//           description: 'Self Employed',
//           frequency: 'W',
//         },
//         {
//           amount: 50000,
//           code: 'SUPER',
//           description: 'Superannuation',
//           frequency: 'M',
//         },
//         {
//           amount: 5000,
//           code: 'STDYLK',
//           description: 'Study Link',
//           frequency: 'W',
//         },
//         {
//           amount: 100000,
//           code: 'RENTAL',
//           description: 'Rental Income',
//           frequency: 'F',
//         },
//         {
//           amount: 5000,
//           code: 'CHDSUP',
//           description: 'Child Support',
//           frequency: 'W',
//         },
//         {
//           amount: 8000,
//           code: 'WKFAM',
//           description: 'Working for Families',
//           frequency: 'W',
//         },
//         {
//           amount: 6000,
//           code: 'PYGBRD',
//           description: 'Boarder Income',
//           frequency: 'M',
//         },
//       ],
//       expenses: [
//         {
//           amount: 2000,
//           code: 'RENTI',
//           description: 'Renting or Boarding',
//           frequency: 'W',
//         },
//         {
//           amount: 1000,
//           code: 'S6',
//           description: 'S6/Savings',
//           frequency: 'W',
//         },
//         {
//           amount: 500,
//           code: 'GROCER',
//           description: 'Groceries',
//           frequency: 'W',
//         },
//         {
//           amount: 500,
//           code: 'POWER',
//           description: 'Power or Gas',
//           frequency: 'M',
//         },
//         {
//           amount: 200,
//           code: 'PHONE',
//           description: 'Phone or Internet',
//           frequency: 'M',
//         },
//         {
//           amount: 500,
//           code: 'FUEL',
//           description: 'Fuel',
//           frequency: 'W',
//         },
//         {
//           amount: 900,
//           code: 'VEH',
//           description: 'Vehicle on road costs',
//           frequency: 'W',
//         },
//         {
//           amount: 1000,
//           code: 'CLOTH',
//           description: 'Clothing',
//           frequency: 'M',
//         },
//         {
//           amount: 10,
//           code: 'MEDC',
//           description: 'Medical',
//           frequency: 'W',
//         },
//         {
//           amount: 50,
//           code: 'GYM',
//           description: 'Gym',
//           frequency: 'F',
//         },
//         {
//           amount: 10000,
//           code: 'RECR',
//           description: 'Recreation',
//           frequency: 'W',
//         },
//         {
//           amount: 40000,
//           code: 'TITH',
//           description: 'Tithing',
//           frequency: 'M',
//         },
//         {
//           amount: 500000,
//           code: 'SAVG',
//           description: 'Savings',
//           frequency: 'W',
//         },
//       ],
//     },
//     financialDetails: {
//       loanAmount: 10000,
//       interestRate: 12.5,
//       repayAmount: 84.18,
//       repayFreq: 'W',
//       term: 36,
//     },
//     preliminaryQuestions: {
//       loanPurpose: 'Travel & Vacation Costs',
//       tradingBranch: 'Hamilton',
//       citizen: 'DO',
//       isNzCitizen: false,
//       resident: 'LC',
//       isNzResident: false,
//       hasWorkPermit: {
//         key: 'Yes',
//         value: true,
//       },
//       hasRegularIncome: {
//         key: 'Yes',
//         value: true,
//       },
//       incomeCreditedToFCU: {
//         key: 'Yes',
//         value: true,
//       },
//       wasDeclaredBankrupt: {
//         key: 'No',
//         value: false,
//       },
//       bankruptcyDate: null,
//     },
//     privacyDeclaration: {
//       acceptCreditAssesment: true,
//       acceptAuthoriseFCUToUseData: true,
//       acceptTrueInformation: true,
//       acceptAMLCFTObligations: true,
//       acceptStorePersonalInfo: true,
//     },
//   }

//   const generatePdfConfig = {
//     url: '/generate-pdf',
//     method: 'POST',
//      baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     timeout: 50000,
//     data: JSON.stringify({
//       applicationData: pdfDataForPrimeOnlyApplication,
//       applicationNumber: '0020816724',
//     }),
//   }
//   console.log(
//     'JSON Stringified: ',
//     JSON.stringify({
//       applicationData: pdfDataForPrimeOnlyApplication,
//       applicationNumber: '0020816724',
//     })
//   )
//   dispatch(generateLoanApplicationReport(generatePdfConfig))
// }

//! -------------  Secure Session Submission Data ----------------

// if (secureSessionID) {
//   if (jointApplication) {
//     return JSON.stringify({
//       draft: 'N',
//       loanAmount: loanAmount,
//       interestRate: interestRate,
//       repayAmount: sovInstalmentAmount,
//       repayFreq: repayFreq,
//       loanPurpose: loanPurpose,
//       term: term,
//       tradingBranch: tradingBranch,
//       insurance: insurance
//         .filter((item) => {
//           return item?.selected === 'Y'
//         })
//         .map((item) => {
//           return { component: item?.component, joint: item?.joint, discount: item?.discount }
//         }),
//       associatedClients: {
//         data: [
//           {
//             id: secureClientID,
//             type: 'associatedClients',
//           },
//           {
//             id: '0000000001',
//             type: 'associatedClients',
//           },
//         ],
//       },
//       securities: {
//         data: [
//           {
//             type: 'securities',
//             id: '0000299612',
//           },
//         ],
//       },
//       memoLines: preliminaryQuestions_MemoLines.map((item) => {
//         return item
//       }),
//       included: [
//         {
//           type: 'associatedClients',
//           id: secureClientID,
//           attributes: {
//             role: 'PRIMEB',
//             seq: '1',
//             signatureRequired: 'M',
//             creditCheckAuthorised: declarationItems?.StorePersonalInfo?.accept === true ? 'Y' : 'N',
//             order: '1',
//             clientReference: secureClientID,
//             clientMaint: {
//               clientID: secureClientID,
//               generalDetails: {
//                 externalSystemReference: '',
//                 clientType: 'I',
//                 status: {
//                   code: 'A',
//                 },
//                 gna: 'N',
//                 existingClient: 'Y',
//                 defaultManager: '0000148335',
//                 individualDetails: {
//                   title: title,
//                   forename: forenames,
//                   surname: lastName,
//                   clientOtherNamesExist: otherNames === '' ? 'N' : 'Y',
//                   gender: gender,
//                   dateOfBirth: convertToUTCTimestamp(dob, 'dob'),
//                   dateOfBirthRefused: 'N',
//                   maritalStatus: maritalStatusMenuItems(maritalStatus.key)?.key,
//                   countryOfResidence: resident,
//                   countryOfCitizenship: citizen,
//                   numberOfDependants: dependents.toString(),
//                   accommodation: {
//                     code: getAccommodation(currResYears, residenceType)?.code,
//                     description: getAccommodation(currResYears, residenceType)?.description,
//                   },
//                   resident: isNzCitizen === true ? 'Y' : 'N',
//                   smoker: 'N',
//                 },
//               },
//               clientIdentifications: primeClientIdentification.filter((identification) => {
//                 return identification.idCode1 !== null
//               }),
//               contactDetails: {
//                 address: primeResidentialDetailsSecureToAdd,

//                 phone: primePhone.filter((phone) => {
//                   return phone.number !== ''
//                 }),
//                 mobile: primeMobile.filter((mobile) => {
//                   return mobile.number !== ''
//                 }),
//                 email: primeEmail.filter((email) => {
//                   return email.address !== ''
//                 }),
//               },
//               employmentDetails: primeEmployment.filter((emp) => {
//                 return emp.employerName !== null
//               }),
//               clientCapacity: {
//                 capacityAssessment: {
//                   anyExpectedChanges: 'Y',
//                   changeDetails: 'N',
//                   assessmentQuestionsAsked: 'Y',
//                   selfDeclarationAccepted: 'Y',
//                 },
//                 joint: 'N',
//                 assets: primeAssets.filter((asset) => {
//                   return asset.amount !== null
//                 }),
//                 liabilities: primeLiabilities.filter((liability) => {
//                   return liability.amount !== null
//                 }),
//                 incomes: primeIncome.filter((income) => {
//                   return income.amount3 !== null
//                 }),
//                 expenses: primeExpenses.filter((expense) => {
//                   return expense.amount3 !== null
//                 }),
//               },
//               mode: 'Add',
//             },
//           },
//         },
//         {
//           type: 'associatedClients',
//           id: '0000000001',
//           attributes: {
//             role: 'CO-BOR',
//             seq: '2',
//             signatureRequired: 'O',
//             creditCheckAuthorised: declarationItems?.StorePersonalInfo?.accept === true ? 'Y' : 'N',
//             order: '2',
//             clientReference: null,
//             clientMaint: {
//               clientID: '0000000001',
//               generalDetails: {
//                 externalSystemReference: '',
//                 clientType: 'I',
//                 status: {
//                   code: 'A',
//                 },
//                 gna: 'N',
//                 existingClient: 'Y',
//                 defaultManager: '0000148335',
//                 individualDetails: {
//                   title: jointtitle,
//                   forename: jointforenames,
//                   surname: jointlastName,
//                   clientOtherNamesExist: jointotherNames === '' ? 'N' : 'Y',
//                   gender: jointgender,
//                   dateOfBirth: convertToUTCTimestamp(jointdob, 'jointdob'),
//                   dateOfBirthRefused: 'N',
//                   maritalStatus: maritalStatusMenuItems(jointmaritalStatus.key)?.key,
//                   countryOfResidence: 'NZD',
//                   countryOfCitizenship: 'NZD',
//                   numberOfDependants: jointdependents.toString(),
//                   accommodation: {
//                     code: getAccommodation(jointcurrResYears, jointresidenceType)?.code,
//                     description: getAccommodation(jointcurrResYears, jointresidenceType)?.description,
//                   },
//                   resident: 'Y',
//                   smoker: 'N',
//                 },
//               },
//               clientIdentifications: jointClientIdentification.filter((identification) => {
//                 return identification.idCode1 !== null
//               }),
//               contactDetails: {
//                 address: jointResidentialDetails.filter((address) => {
//                   return address.streetOrPostalName !== null
//                 }),
//                 phone: jointPhone.filter((phone) => {
//                   return phone.number !== ''
//                 }),
//                 mobile: jointMobile.filter((mobile) => {
//                   return mobile.number !== ''
//                 }),
//                 email: jointEmail.filter((email) => {
//                   return email.address !== ''
//                 }),
//               },
//               employmentDetails: jointEmployment.filter((emp) => {
//                 return emp.employerName !== null
//               }),
//               mode: 'Add',
//             },
//           },
//         },
//         {
//           type: 'securities',
//           id: '0000299612',
//           attributes: {
//             seq: '1',
//             accountSecurity: {
//               primaryCollateral: 'P',
//               effectiveDate: convertToUTCTimestamp(defEffectiveDate),
//               clientSecurityRelationship: 'O',
//             },
//             asset: {
//               assetType: 'S',
//               classificationCode: 'VEHI',
//               securityPercentageToUse: '100',
//               condition: {
//                 code: 'U',
//                 description: '',
//               },
//               securityStatus: {
//                 code: 'C',
//                 description: '',
//               },
//             },
//             vehicleMaint: {
//               assetExtras: [],
//               vehicle: {
//                 value: '0000000000',
//                 refType: 'ASSIGN',
//               },
//               vehicleDetails: {
//                 // TODO To be added later from redux
//                 externalSystemReference: '',
//                 make: '',
//                 model: '',
//                 registrationYear: '',
//                 colour: '',
//                 nonStandardVehicle: {
//                   code: 'Y',
//                   description: '',
//                 },
//                 registrationNumber: vehicleRegistrationNumber,
//                 odometer: '0',
//               },
//             },
//           },
//         },
//       ],
//     })
//   }

//   return JSON.stringify({
//     draft: 'N',
//     loanAmount: loanAmount,
//     interestRate: interestRate,
//     repayAmount: sovInstalmentAmount,
//     repayFreq: repayFreq,
//     loanPurpose: loanPurpose,
//     term: term,
//     tradingBranch: tradingBranch,
//     insurance: insurance
//       .filter((item) => {
//         return item?.selected === 'Y'
//       })
//       .map((item) => {
//         return { component: item?.component, joint: item?.joint, discount: item?.discount }
//       }),
//     associatedClients: {
//       data: [
//         {
//           id: secureClientID,
//           type: 'associatedClients',
//         },
//       ],
//     },
//     securities: {
//       data: [
//         {
//           type: 'securities',
//           id: '0000299612',
//         },
//       ],
//     },
//     memoLines: preliminaryQuestions_MemoLines.map((item) => {
//       return item
//     }),
//     included: [
//       {
//         type: 'associatedClients',
//         id: secureClientID,
//         attributes: {
//           role: 'PRIMEB',
//           seq: '1',
//           signatureRequired: 'M',
//           creditCheckAuthorised: declarationItems?.StorePersonalInfo?.accept === true ? 'Y' : 'N',
//           order: '1',
//           clientReference: secureClientID,
//           clientMaint: {
//             clientID: secureClientID,
//             generalDetails: {
//               externalSystemReference: '',
//               clientType: 'I',
//               status: {
//                 code: 'A',
//               },
//               gna: 'N',
//               existingClient: 'Y',
//               defaultManager: '0000148335',
//               individualDetails: {
//                 title: title,
//                 forename: forenames,
//                 surname: lastName,
//                 clientOtherNamesExist: otherNames === '' ? 'N' : 'Y',
//                 gender: gender,
//                 dateOfBirth: convertToUTCTimestamp(dob, 'dob'),
//                 dateOfBirthRefused: 'N',
//                 maritalStatus: maritalStatusMenuItems(maritalStatus.key)?.key,
//                 countryOfResidence: resident,
//                 countryOfCitizenship: citizen,
//                 numberOfDependants: dependents.toString(),
//                 accommodation: {
//                   code: getAccommodation(currResYears, residenceType)?.code,
//                   description: getAccommodation(currResYears, residenceType)?.description,
//                 },
//                 resident: isNzCitizen === true ? 'Y' : 'N',
//                 smoker: 'N',
//               },
//             },
//             clientIdentifications: primeClientIdentification.filter((identification) => {
//               return identification.idCode1 !== null
//             }),
//             contactDetails: {
//               address: primeResidentialDetailsSecureToAdd,

//               phone: primePhone.filter((phone) => {
//                 return phone.number !== ''
//               }),
//               mobile: primeMobile.filter((mobile) => {
//                 return mobile.number !== ''
//               }),
//               email: primeEmail.filter((email) => {
//                 return email.address !== ''
//               }),
//             },
//             employmentDetails: primeEmployment.filter((emp) => {
//               return emp.employerName !== null
//             }),
//             clientCapacity: {
//               capacityAssessment: {
//                 anyExpectedChanges: 'Y',
//                 changeDetails: 'N',
//                 assessmentQuestionsAsked: 'Y',
//                 selfDeclarationAccepted: 'Y',
//               },
//               joint: 'N',
//               assets: primeAssets.filter((asset) => {
//                 return asset.amount !== null
//               }),
//               liabilities: primeLiabilities.filter((liability) => {
//                 return liability.amount !== null
//               }),
//               incomes: primeIncome.filter((income) => {
//                 return income.amount3 !== null
//               }),
//               expenses: primeExpenses.filter((expense) => {
//                 return expense.amount3 !== null
//               }),
//             },
//             mode: 'Add',
//           },
//         },
//       },
//       {
//         type: 'securities',
//         id: '0000299612',
//         attributes: {
//           seq: '1',
//           accountSecurity: {
//             primaryCollateral: 'P',
//             effectiveDate: convertToUTCTimestamp(defEffectiveDate),
//             clientSecurityRelationship: 'O',
//           },
//           asset: {
//             assetType: 'S',
//             classificationCode: 'VEHI',
//             securityPercentageToUse: '100',
//             condition: {
//               code: 'U',
//               description: '',
//             },
//             securityStatus: {
//               code: 'C',
//               description: '',
//             },
//           },
//           vehicleMaint: {
//             assetExtras: [],
//             vehicle: {
//               value: '0000000000',
//               refType: 'ASSIGN',
//             },
//             vehicleDetails: {
//               // TODO To be added later from redux
//               externalSystemReference: '',
//               make: '',
//               model: '',
//               registrationYear: '',
//               colour: '',
//               nonStandardVehicle: {
//                 code: 'Y',
//                 description: '',
//               },
//               registrationNumber: vehicleRegistrationNumber,
//               odometer: '0',
//             },
//           },
//         },
//       },
//     ],

//     expire: [
//       {
//         data: {
//           type: 'clients',
//           id: secureClientID,
//           attributes: {
//             generalDetails: secureClientGeneralDetails,
//             bankAccounts: secureClientBankAccounts,
//           },
//           relationships: {
//             employments: {
//               data: expireEmploymentRelationships,
//             },
//             contacts: {
//               data: [],
//             },
//             addresses: {
//               data: [],
//             },
//             identifications: {
//               data: expireIdentificationRelationships,
//             },
//           },
//         },
//         included: expireIncluded,
//       },
//     ],
//   })
//

// if (secureSessionID) {
//   const secureConfig = {
//     url: '/submit-secure-app',
//     method: 'POST',
//     baseURL: `${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}`,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     timeout: 60000,
//     withCredentials: true,
//     data: createSubmissionData(),
//   }
//   return secureConfig
// }

//* PDF Template for Secure Login - To be used in the future

// if (secureSessionID) {
//   if (jointApplication) {
//     return {
//       primeDetails: {
//         applicationNumber: applicationReference,
//         individualDetails: {
//           title: title,
//           forename: forenames,
//           surname: lastName,
//           clientOtherNamesExist: otherNames === '' ? 'N' : 'Y',
//           gender: gender,
//           dateOfBirth: fDate(dob),
//           dateOfBirthRefused: 'N',
//           maritalStatus: maritalStatusMenuItems(maritalStatus.key)?.value,
//           countryOfResidence: resident,
//           countryOfCitizenship: citizen,
//           numberOfDependants: dependents.toString(),
//           accommodationDesc: getAccommodation(currResYears, residenceType)?.description,
//           resident: isNzCitizen === true ? 'Y' : 'N',
//           smoker: 'N',
//         },
//         identification: {
//           drLicence: {
//             isPresent: checkedIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
//             reference: driversLicense,
//             driversLicenceVersion: driversLicenceVersion,
//             driversLicenceType: driversLicenseType,
//             issueDate: fDate(drLicenceIssueDate),
//             expiryDate: fDate(drLicenceExpiryDate),
//           },
//           passport: {
//             isPresent: checkedIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
//             reference: passportNo,
//             issueDate: fDate(passportIssueDate),
//             expiryDate: fDate(passportExpiryDate),
//           },
//           firearmsLicence: {
//             isPresent: checkedIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
//             reference: firearmsLicenceNo,
//             issueDate: fDate(firearmsLicenceIssueDate),
//             expiryDate: fDate(firearmsLicenceExpiryDate),
//           },
//           kiwiAccessCard: {
//             isPresent: checkedIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
//             reference: kiwiAccessCardNo,
//             issueDate: fDate(kiwiAccessCardIssueDate),
//             expiryDate: fDate(kiwiAccessCardExpiryDate),
//           },
//           communityServiceCard: {
//             isPresent: checkedIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
//             reference: commServiceCardNo,
//             issueDate: fDate(commServiceCardIssueDate),
//             expiryDate: fDate(commServiceCardExpiryDate),
//           },
//           birthCertificate: {
//             isPresent: checkedIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
//             reference: birthCertificateRegNo,
//             issueDate: fDate(defEffectiveDate),
//           },
//           currentStudentId: {
//             isPresent: checkedIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
//             reference: currStudentIdNo,
//             issueDate: fDate(currStudentIdIssueDate),
//             expiryDate: fDate(currStudentIdExpiryDate),
//           },
//           goldCard: {
//             isPresent: checkedIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
//             reference: goldCardNo,
//             issueDate: fDate(goldCardValidFromDate),
//           },
//         },
//         address: {
//           primeCurrentResidence: {
//             addressLine1: currResAddressToDisplayLine1,
//             addressLine2: currResAddressToDisplayLine2,
//             addressLine3: currResAddressToDisplayLine3,
//             addressLine4: currResAddressToDisplayLine4,
//           },
//           primePreviousResidence: {
//             addressLine1: prevResAddressToDisplayLine1,
//             addressLine2: prevResAddressToDisplayLine2,
//             addressLine3: prevResAddressToDisplayLine3,
//             addressLine4: prevResAddressToDisplayLine4,
//           },
//         },
//         phone: primePhone.filter((phone) => {
//           return phone.number !== ''
//         })
//           ? primePhone.filter((phone) => {
//               return phone.number !== ''
//             })
//           : null,
//         mobile: primeMobile.filter((mobile) => {
//           return mobile.number !== ''
//         })
//           ? primeMobile.filter((mobile) => {
//               return mobile.number !== ''
//             })
//           : null,
//         email: primeEmail.filter((email) => {
//           return email.address !== ''
//         })
//           ? primeEmail.filter((email) => {
//               return email.address !== ''
//             })
//           : null,
//         employemnt: employmentDetailsForPDF,
//         assets: primeAssets.filter((asset) => {
//           return asset.amount !== null
//         })
//           ? primeAssets.filter((asset) => {
//               return asset.amount !== null
//             })
//           : null,
//         liabilities: primeLiabilities.filter((liability) => {
//           return liability.amount !== null
//         })
//           ? primeLiabilities.filter((liability) => {
//               return liability.amount !== null
//             })
//           : null,
//         incomes: primeIncomeForPDF,
//         expenses: primeExpensesForPDF,
//       },
//       jointDetails: {
//         applicationNumber: applicationReference,
//         individualDetails: {
//           title: jointtitle,
//           forename: jointforenames,
//           surname: jointlastName,
//           clientOtherNamesExist: jointotherNames === '' ? 'N' : 'Y',
//           gender: jointgender,
//           dateOfBirth: fDate(jointdob),
//           dateOfBirthRefused: 'N',
//           maritalStatus: maritalStatusMenuItems(jointmaritalStatus.key)?.value,
//           countryOfResidence: 'NZD',
//           countryOfCitizenship: 'NZD',
//           numberOfDependants: jointdependents.toString(),
//           accommodationDesc: getAccommodation(jointcurrResYears, jointresidenceType)?.description,
//         },
//         identification: {
//           drLicence: {
//             isPresent: checkedJointIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
//             reference: jointdriversLicense,
//             driversLicenceVersion: jointdriversLicenceVersion,
//             driversLicenceType: jointlicenceType,
//             issueDate: fDate(jointdrLicenceIssueDate),
//             expiryDate: fDate(jointdrLicenceExpiryDate),
//           },
//           passport: {
//             isPresent: checkedJointIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
//             reference: jointpassportNo,
//             issueDate: fDate(jointpassportIssueDate),
//             expiryDate: fDate(jointpassportExpiryDate),
//           },
//           firearmsLicence: {
//             isPresent: checkedJointIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
//             reference: jointfirearmsLicenceNo,
//             issueDate: fDate(jointfirearmsLicenceIssueDate),
//             expiryDate: fDate(jointfirearmsLicenceExpiryDate),
//           },
//           kiwiAccessCard: {
//             isPresent: checkedJointIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
//             reference: jointkiwiAccessCardNo,
//             issueDate: fDate(jointkiwiAccessCardIssueDate),
//             expiryDate: fDate(jointkiwiAccessCardExpiryDate),
//           },
//           communityServiceCard: {
//             isPresent: checkedJointIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
//             reference: jointcommServiceCardNo,
//             issueDate: fDate(jointcommServiceCardIssueDate),
//             expiryDate: fDate(jointcommServiceCardExpiryDate),
//           },
//           birthCertificate: {
//             isPresent: checkedJointIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
//             reference: jointbirthCertificateRegNo,
//             issueDate: fDate(defEffectiveDate),
//           },
//           currentStudentId: {
//             isPresent: checkedJointIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
//             reference: jointcurrStudentIdNo,
//             issueDate: fDate(jointcurrStudentIdIssueDate),
//             expiryDate: fDate(jointcurrStudentIdExpiryDate),
//           },
//           goldCard: {
//             isPresent: checkedJointIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
//             reference: jointgoldCardNo,
//             issueDate: fDate(jointgoldCardValidFromDate),
//           },
//         },
//         address: {
//           jointCurrentResidence: {
//             addressLine1: jointcurrResAddressToDisplayLine1,
//             addressLine2: jointcurrResAddressToDisplayLine2,
//             addressLine3: jointcurrResAddressToDisplayLine3,
//             addressLine4: jointcurrResAddressToDisplayLine4,
//           },
//           jointPreviousResidence: {
//             addressLine1: jointprevResAddressToDisplayLine1,
//             addressLine2: jointprevResAddressToDisplayLine2,
//             addressLine3: jointprevResAddressToDisplayLine3,
//             addressLine4: jointprevResAddressToDisplayLine4,
//           },
//         },
//         phone: jointPhone.filter((phone) => {
//           return phone.number !== ''
//         })
//           ? jointPhone.filter((phone) => {
//               return phone.number !== ''
//             })
//           : null,
//         mobile: jointMobile.filter((mobile) => {
//           return mobile.number !== ''
//         })
//           ? jointMobile.filter((mobile) => {
//               return mobile.number !== ''
//             })
//           : null,
//         email: jointEmail.filter((email) => {
//           return email.address !== ''
//         })
//           ? jointEmail.filter((email) => {
//               return email.address !== ''
//             })
//           : null,
//         employemnt: employmentDetailsForPDF,
//       },
//       financialDetails: {
//         loanAmount: loanAmount,
//         interestRate: interestRate,
//         repayAmount: sovInstalmentAmount,
//         repayFreq: repayFreq,
//         term: term,
//       },
//       preliminaryQuestions: {
//         loanPurpose: getLoanPurposeFromKey(loanPurpose)?.value,
//         tradingBranch: getTradingBranchFromKey(tradingBranch)?.value,
//         citizen: citizen,
//         isNzCitizen: isNzCitizen,
//         resident: resident,
//         isNzResident: isNzResident,
//         hasWorkPermit: hasWorkPermit,
//         hasRegularIncome: hasRegularIncome,
//         incomeCreditedToFCU: incomeCreditedToFCU,
//         wasDeclaredBankrupt: wasDeclaredBankrupt,
//         bankruptcyDate: bankruptcyDate,
//       },
//       privacyDeclaration: {
//         acceptCreditAssesment: declarationItems?.CreditAssesment?.accept,
//         acceptAuthoriseFCUToUseData: declarationItems?.AuthoriseFCU?.accept,
//         acceptTrueInformation: declarationItems?.TrueInformation?.accept,
//         acceptAMLCFTObligations: declarationItems?.AmlCftObligations?.accept,
//         acceptStorePersonalInfo: declarationItems?.StorePersonalInfo?.accept,
//       },
//     }
//   }

//   return {
//     primeDetails: {
//       applicationNumber: applicationReference,
//       individualDetails: {
//         title: title,
//         forename: forenames,
//         surname: lastName,
//         clientOtherNamesExist: otherNames === '' ? 'N' : 'Y',
//         gender: gender,
//         dateOfBirth: fDate(dob),
//         dateOfBirthRefused: 'N',
//         maritalStatus: maritalStatusMenuItems(maritalStatus.key)?.value,
//         countryOfResidence: resident,
//         countryOfCitizenship: citizen,
//         numberOfDependants: dependents.toString(),
//         accommodationDesc: getAccommodation(currResYears, residenceType)?.description,
//         resident: isNzCitizen === true ? 'Y' : 'N',
//         smoker: 'N',
//       },
//       identification: {
//         drLicence: {
//           isPresent: checkedIdentificationTypes.includes('DRVLSC') ? 'DRVLSC' : null,
//           reference: driversLicense,
//           driversLicenceVersion: driversLicenceVersion,
//           driversLicenceType: driversLicenseType,
//           issueDate: fDate(drLicenceIssueDate),
//           expiryDate: fDate(drLicenceExpiryDate),
//         },
//         passport: {
//           isPresent: checkedIdentificationTypes.includes('PASPRT') ? 'PASPRT' : null,
//           reference: passportNo,
//           issueDate: fDate(passportIssueDate),
//           expiryDate: fDate(passportExpiryDate),
//         },
//         firearmsLicence: {
//           isPresent: checkedIdentificationTypes.includes('FIRELICENS') ? 'FIRELICENS' : null,
//           reference: firearmsLicenceNo,
//           issueDate: fDate(firearmsLicenceIssueDate),
//           expiryDate: fDate(firearmsLicenceExpiryDate),
//         },
//         kiwiAccessCard: {
//           isPresent: checkedIdentificationTypes.includes('KIWACCCRD') ? 'KIWACCCRD' : null,
//           reference: kiwiAccessCardNo,
//           issueDate: fDate(kiwiAccessCardIssueDate),
//           expiryDate: fDate(kiwiAccessCardExpiryDate),
//         },
//         communityServiceCard: {
//           isPresent: checkedIdentificationTypes.includes('COMSERVCRD') ? 'COMSERVCRD' : null,
//           reference: commServiceCardNo,
//           issueDate: fDate(commServiceCardIssueDate),
//           expiryDate: fDate(commServiceCardExpiryDate),
//         },
//         birthCertificate: {
//           isPresent: checkedIdentificationTypes.includes('BIRTHCERT') ? 'BIRTHCERT' : null,
//           reference: birthCertificateRegNo,
//           issueDate: fDate(defEffectiveDate),
//         },
//         currentStudentId: {
//           isPresent: checkedIdentificationTypes.includes('CURSTUDID') ? 'CURSTUDID' : null,
//           reference: currStudentIdNo,
//           issueDate: fDate(currStudentIdIssueDate),
//           expiryDate: fDate(currStudentIdExpiryDate),
//         },
//         goldCard: {
//           isPresent: checkedIdentificationTypes.includes('GOLDCARD') ? 'GOLDCARD' : null,
//           reference: goldCardNo,
//           issueDate: fDate(goldCardValidFromDate),
//         },
//       },
//       address: {
//         primeCurrentResidence: {
//           addressLine1: currResAddressToDisplayLine1,
//           addressLine2: currResAddressToDisplayLine2,
//           addressLine3: currResAddressToDisplayLine3,
//           addressLine4: currResAddressToDisplayLine4,
//         },
//         primePreviousResidence: {
//           addressLine1: prevResAddressToDisplayLine1,
//           addressLine2: prevResAddressToDisplayLine2,
//           addressLine3: prevResAddressToDisplayLine3,
//           addressLine4: prevResAddressToDisplayLine4,
//         },
//       },
//       phone: primePhone.filter((phone) => {
//         return phone.number !== ''
//       })
//         ? primePhone.filter((phone) => {
//             return phone.number !== ''
//           })
//         : null,
//       mobile: primeMobile.filter((mobile) => {
//         return mobile.number !== ''
//       })
//         ? primeMobile.filter((mobile) => {
//             return mobile.number !== ''
//           })
//         : null,
//       email: primeEmail.filter((email) => {
//         return email.address !== ''
//       })
//         ? primeEmail.filter((email) => {
//             return email.address !== ''
//           })
//         : null,
//       employemnt: employmentDetailsForPDF,
//       assets: primeAssets.filter((asset) => {
//         return asset.amount !== null
//       })
//         ? primeAssets.filter((asset) => {
//             return asset.amount !== null
//           })
//         : null,
//       liabilities: primeLiabilities.filter((liability) => {
//         return liability.amount !== null
//       })
//         ? primeLiabilities.filter((liability) => {
//             return liability.amount !== null
//           })
//         : null,
//       incomes: primeIncomeForPDF,
//       expenses: primeExpensesForPDF,
//     },
//     financialDetails: {
//       loanAmount: loanAmount,
//       interestRate: interestRate,
//       repayAmount: sovInstalmentAmount,
//       repayFreq: repayFreq,
//       term: term,
//     },
//     preliminaryQuestions: {
//       loanPurpose: getLoanPurposeFromKey(loanPurpose)?.value,
//       tradingBranch: getTradingBranchFromKey(tradingBranch)?.value,
//       citizen: citizen,
//       isNzCitizen: isNzCitizen,
//       resident: resident,
//       isNzResident: isNzResident,
//       hasWorkPermit: hasWorkPermit,
//       hasRegularIncome: hasRegularIncome,
//       incomeCreditedToFCU: incomeCreditedToFCU,
//       wasDeclaredBankrupt: wasDeclaredBankrupt,
//       bankruptcyDate: bankruptcyDate,
//     },
//     privacyDeclaration: {
//       acceptCreditAssesment: declarationItems?.CreditAssesment?.accept,
//       acceptAuthoriseFCUToUseData: declarationItems?.AuthoriseFCU?.accept,
//       acceptTrueInformation: declarationItems?.TrueInformation?.accept,
//       acceptAMLCFTObligations: declarationItems?.AmlCftObligations?.accept,
//       acceptStorePersonalInfo: declarationItems?.StorePersonalInfo?.accept,
//     },
//   }
// }
