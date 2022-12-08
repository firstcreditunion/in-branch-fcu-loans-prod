import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

// Codes
import { maritalStatusMenu } from '../forms/PersonalDetails/Codes/PersonalDetailsCodes'
import { employmentTypeMenu, occupationMenu } from '../forms/EmploymentDetails/Codes/EmploymentCodes'

// Utils
import { fDateYYYY_MM_DD, convertToUTCTimestamp, convertUnixToUTCTimestamp } from '../utils/formatDateTime'
import { fCurrency, fNumber, fData } from '../utils/formatNumber'

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

export default function prepareLoanData(dataExportType) {
  const today = new Date()
  const defExpiryDate = today.setDate(today.getDate() - 1)
  const defEffectiveDate = new Date()
  const defPrevEmpEffective = new Date().setFullYear(new Date().getFullYear() - 100)

  // ID logon session
  const secureSessionID = useSelector((state) => state.globalReducer.secureSessionID)
  const secureClientID = useSelector((state) => state.globalReducer.secureClientID)
  const secureClientGeneralDetails = useSelector((state) => state.globalReducer.secureClientGeneralDetails)
  const secureClientBankAccounts = useSelector((state) => state.globalReducer.secureClientBankAccounts)

  // ************* Lending Criteria Details ************* //

  const jointApplication = useSelector((state) => state.lendingCritetiaQnsReducer.jointApplication.value)

  const citizen = useSelector((state) => state.lendingCritetiaQnsReducer.citizenship)
  const isNzCitizen = useSelector((state) => state.lendingCritetiaQnsReducer.isNzCitizen.value)
  const resident = useSelector((state) => state.lendingCritetiaQnsReducer.residency)
  const isNzResident = useSelector((state) => state.lendingCritetiaQnsReducer.isNzResident.value)
  const loanPurpose = useSelector((state) => state.lendingCritetiaQnsReducer.loanPurpose)
  const tradingBranch = useSelector((state) => state.lendingCritetiaQnsReducer.tradingBranch)

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

  // ************* Identification Details ************* //

  // ***************** PRIME ******************** //

  // Selected Identifications
  const checkedIdentificationTypes = useSelector((state) => state.identificationReducer.checkedIdentificationTypes)
  const checkedJointIdentificationTypes = useSelector((state) => state.identificationReducer.checkedJointIdentificationTypes)

  // Driver Licence
  const all_identifications = useSelector((state) => state.identificationReducer.identificationTypes)
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

  // ****************** JOINT ******************

  // Current Employment
  const jointemploymentType = useSelector((state) => state.employmentReducer.jointemploymentType)
  const jointoccupation = useSelector((state) => state.employmentReducer.jointoccupation)
  const jointemployerName = useSelector((state) => state.employmentReducer.jointemployerName)
  const jointempEffectiveDate = useSelector((state) => state.employmentReducer.jointempEffectiveDate)

  // Previous Employment
  const jointprevEmpemploymentType = useSelector((state) => state.employmentReducer.jointprevEmpemploymentType)
  const jointprevEmpoccupation = useSelector((state) => state.employmentReducer.jointprevEmpoccupation)
  const jointprevEmpemployerName = useSelector((state) => state.employmentReducer.jointprevEmpemployerName)
  const jointprevEmpempEffectiveDate = useSelector((state) => state.employmentReducer.jointprevEmpempEffectiveDate)

  // Loan Details
  const loanAmount = useSelector((state) => state.financialDetailsReducer.loanAmount)
  const interestRate = useSelector((state) => state.financialDetailsReducer.interestRate)
  const term = useSelector((state) => state.financialDetailsReducer.term.value)
  const repayFreq = useSelector((state) => state.financialDetailsReducer.paymentFrequency.unit)
  const sovInstalmentAmount = useSelector((state) => state.financialDetailsReducer.sovInstalmentAmount)
  const sovPaymentFrequencyType1 = useSelector((state) => state.financialDetailsReducer.sovPaymentFrequencyType1)
  const sovInterestAmount = useSelector((state) => state.financialDetailsReducer.sovInterestAmount)
  const sovAmountPayable = useSelector((state) => state.financialDetailsReducer.sovAmountPayable)

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

  const primeIncome = [
    {
      amount3: { value: income.income_wages1.amount },
      description: income.income_wages1.sovereign.value,
      code: income.income_wages1.sovereign.key,
    },
    {
      amount3: { value: income.income_wages2.amount },
      description: income.income_wages2.sovereign.value,
      code: income.income_wages2.sovereign.key,
    },
    {
      amount3: { value: income.income_winz.amount },
      description: income.income_winz.sovereign.value,
      code: income.income_winz.sovereign.key,
    },
    {
      amount3: { value: income.income_selfemploy.amount },
      description: income.income_selfemploy.sovereign.value,
      code: income.income_selfemploy.sovereign.key,
    },
    {
      amount3: { value: income.income_nzsuper.amount },
      description: income.income_nzsuper.sovereign.value,
      code: income.income_nzsuper.sovereign.key,
    },
    {
      amount3: { value: income.income_studylink.amount },
      description: income.income_studylink.sovereign.value,
      code: income.income_studylink.sovereign.key,
    },
    {
      amount3: { value: income.income_rentalincome.amount },
      description: income.income_rentalincome.sovereign.value,
      code: income.income_rentalincome.sovereign.key,
    },
    {
      amount3: { value: income.income_childsupport.amount },
      description: income.income_childsupport.sovereign.value,
      code: income.income_childsupport.sovereign.key,
    },
    {
      amount3: { value: income.income_workingforfamilies.amount },
      description: income.income_workingforfamilies.sovereign.value,
      code: income.income_workingforfamilies.sovereign.key,
    },
    {
      amount3: { value: income.income_broaderincome.amount },
      description: income.income_broaderincome.sovereign.value,
      code: income.income_broaderincome.sovereign.key,
    },
  ]

  // ***********  Prime Expenses *********** //

  const primeExpenses = [
    {
      amount3: { value: expense.expense_RentingBoarding.amount },
      description: expense.expense_RentingBoarding.sovereign.value,
      code: expense.expense_RentingBoarding.sovereign.key,
    },
    {
      amount3: { value: expense.expense_S6_or_Savings.amount },
      description: expense.expense_S6_or_Savings.sovereign.value,
      code: expense.expense_S6_or_Savings.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Groceries.amount },
      description: expense.expense_Groceries.sovereign.value,
      code: expense.expense_Groceries.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Power_or_Gas.amount },
      description: expense.expense_Power_or_Gas.sovereign.value,
      code: expense.expense_Power_or_Gas.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Phone_or_Internet.amount },
      description: expense.expense_Phone_or_Internet.sovereign.value,
      code: expense.expense_Phone_or_Internet.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Fuel.amount },
      description: expense.expense_Fuel.sovereign.value,
      code: expense.expense_Fuel.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Wof_Rego.amount },
      description: expense.expense_Wof_Rego.sovereign.value,
      code: expense.expense_Wof_Rego.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Clothing.amount },
      description: expense.expense_Clothing.sovereign.value,
      code: expense.expense_Clothing.sovereign.key,
    },
    {
      amount3: { value: expense.expense_MedicalExpense.amount },
      description: expense.expense_MedicalExpense.sovereign.value,
      code: expense.expense_MedicalExpense.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Gym.amount },
      description: expense.expense_Gym.sovereign.value,
      code: expense.expense_Gym.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Recreation.amount },
      description: expense.expense_Recreation.sovereign.value,
      code: expense.expense_Recreation.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Tithing.amount },
      description: expense.expense_Tithing.sovereign.value,
      code: expense.expense_Tithing.sovereign.key,
    },
    {
      amount3: { value: expense.expense_Savings.amount },
      description: expense.expense_Savings.sovereign.value,
      code: expense.expense_Savings.sovereign.key,
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

  if (dataExportType === 'submitloan') {
    if (secureSessionID) {
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
          associatedClients: {
            data: [
              {
                id: secureClientID,
                type: 'associatedClients',
              },
              {
                id: '0000000001',
                type: 'associatedClients',
              },
            ],
          },
          included: [
            {
              type: 'associatedClients',
              id: secureClientID,
              attributes: {
                role: 'PRIMEB',
                seq: '1',
                signatureRequired: 'M',
                trustee: 'N',
                actingAsPartnership: 'N',
                creditCheckAuthorised: 'N',
                order: '1',
                clientReference: secureClientID,
                clientMaint: {
                  clientID: secureClientID,
                  generalDetails: {
                    externalSystemReference: '',
                    clientType: 'I',
                    status: {
                      code: 'A',
                    },
                    gna: 'N',
                    mailOutRestriction: 'N',
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
                    address: primeResidentialDetailsSecureToAdd,

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
              relationships: {},
            },
            {
              type: 'associatedClients',
              id: '0000000001',
              attributes: {
                role: 'CO-BOR',
                seq: '2',
                signatureRequired: 'O',
                trustee: 'N',
                actingAsPartnership: 'N',
                creditCheckAuthorised: 'N',
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
                    mailOutRestriction: 'N',
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
              relationships: {},
            },
          ],
        })
      }

      return JSON.stringify({
        draft: 'N',
        loanAmount: loanAmount,
        interestRate: interestRate,
        repayAmount: sovInstalmentAmount,
        repayFreq: repayFreq,
        loanPurpose: loanPurpose,
        term: term,
        tradingBranch: tradingBranch,
        associatedClients: {
          data: [
            {
              id: secureClientID,
              type: 'associatedClients',
            },
          ],
        },
        included: [
          {
            type: 'associatedClients',
            id: secureClientID,
            attributes: {
              role: 'PRIMEB',
              seq: '1',
              signatureRequired: 'M',
              trustee: 'N',
              actingAsPartnership: 'N',
              creditCheckAuthorised: 'N',
              order: '1',
              clientReference: secureClientID,
              clientMaint: {
                clientID: secureClientID,
                generalDetails: {
                  externalSystemReference: '',
                  clientType: 'I',
                  status: {
                    code: 'A',
                  },
                  gna: 'N',
                  mailOutRestriction: 'N',
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
                  address: primeResidentialDetailsSecureToAdd,

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
            relationships: {},
          },
        ],

        expire: [
          {
            data: {
              type: 'clients',
              id: secureClientID,
              attributes: {
                generalDetails: secureClientGeneralDetails,
                bankAccounts: secureClientBankAccounts,
              },
              relationships: {
                employments: {
                  data: expireEmploymentRelationships,
                },
                contacts: {
                  data: [],
                },
                addresses: {
                  data: [],
                },
                identifications: {
                  data: expireIdentificationRelationships,
                },
              },
            },
            included: expireIncluded,
          },
        ],
      })
    }

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
        included: [
          {
            type: 'associatedClients',
            id: '0001022184',
            attributes: {
              role: 'PRIMEB',
              seq: '1',
              signatureRequired: 'M',
              trustee: 'N',
              actingAsPartnership: 'N',
              creditCheckAuthorised: 'N',
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
                  mailOutRestriction: 'N',
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
            relationships: {},
          },
          {
            type: 'associatedClients',
            id: '0000000001',
            attributes: {
              role: 'CO-BOR',
              seq: '2',
              signatureRequired: 'O',
              trustee: 'N',
              actingAsPartnership: 'N',
              creditCheckAuthorised: 'N',
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
                  mailOutRestriction: 'N',
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
            relationships: {},
          },
        ],
      })
    }

    return JSON.stringify({
      draft: 'N',
      loanAmount: loanAmount,
      interestRate: interestRate,
      repayAmount: sovInstalmentAmount,
      repayFreq: repayFreq,
      loanPurpose: loanPurpose,
      term: term,
      tradingBranch: tradingBranch,
      associatedClients: {
        data: [
          {
            id: '0001022184',
            type: 'associatedClients',
          },
        ],
      },
      included: [
        {
          type: 'associatedClients',
          id: '0001022184',
          attributes: {
            role: 'PRIMEB',
            seq: '1',
            signatureRequired: 'M',
            trustee: 'N',
            actingAsPartnership: 'N',
            creditCheckAuthorised: 'N',
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
                mailOutRestriction: 'N',
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
          relationships: {},
        },
      ],
    })
  }

  // ******************* To be completed in the next release ******************* //

  // if (dataExportType === 'submitloan') {
  //   return {
  //     primetitle: title,
  //     primeforenames: forenames,
  //     primegender: gender,
  //     primedob: dob,
  //     primemaritalStatus: maritalStatus,
  //     primedependents: dependents,
  //   }
  // }
}
