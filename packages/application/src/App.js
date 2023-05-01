import React, { useEffect } from 'react'
import { Switch, Route, Router } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'

import { useSelector, useDispatch } from 'react-redux'
import { globalActions } from '../src/redux/slices/globalSlice'
import { yourPersonalDetailsActions } from '../src/redux/slices/yourPersonalDetailsSlice'
import { lendingCriteriaQnsActions } from '../src/redux/slices/lendingCriteriaQnsSlice'
import { identificationActions } from '../src/redux/slices/identificationSlice'
import { contactDetailsActions } from '../src/redux/slices/contactDetailsSlice'
import { employmentActions } from '../src/redux/slices/employmentSlice'

import { isValidDriversLicence, isValidPassport, isValidFirearmsLicence, isValidKiwiAccessCard, isValidCommunityServiceCard, isValidBrithCertificate, isValidCurrentStudentId, isValidGoldCard, isValidMobileNumber, isValidWorkPhoneNumber, isValidHomePhoneNumber, isValidEmailAddress } from './utils/sovereignDataChecks'

import ThemeConfig from './theme'
import GlobalStyles from './theme/globalStyles'
import ThemePrimaryColor from './components/ui/FirstLoanTheme'

import FirstLoanApplication from './pages/FirstLoan/FirstLoanApplication'
import FirstLoanApplicationSecure from './pages/FirstLoan/FirstLoanApplicationSecure'
import Prequalify from './forms/Prequalify'
import PrequalifySecureRoot from './forms/Prequalify/PrequalifySecureRoot'
import PrequalifyRedirect from './pages/FirstLoan/PrequalifyRedirect'
import ApplicationCompletionPlan from './pages/ApplicationCompletionPlan'

import { concat } from 'lodash'

import { employmentTypeMenu, occupationMenu } from './forms/EmploymentDetails/Codes/EmploymentCodes'
import { genderTypes, maritalStatusMenu, acceptableIdentifications } from './forms/PersonalDetails/Codes/PersonalDetailsCodes'

// Git commit control 10

function getEmploymentTypes(key) {
  return employmentTypeMenu.find((item) => {
    return item.key === key
  })
}

function getOccupationTypes(value) {
  return occupationMenu.find((item) => {
    return item.value === value
  })
}

function getMaritalStatus(key) {
  return maritalStatusMenu.filter((item) => {
    return item.key === key
  })
}

function getGenderType(key) {
  return genderTypes.find((item) => {
    return item.key === key
  })
}

function getMonthDifference(startDate, endDate) {
  return endDate.getMonth() - startDate.getMonth() + 12 * (endDate.getFullYear() - startDate.getFullYear())
}

export default ({ loanAmount, interestRate, term, paymentFrequency, creditCheck, creditSense, motorWebCheck, ppsrRegistration, docuSignSigning, cloudCheckIdVerification, cloudCheckPEP, hasLpiPrimeDeath, hasLpiPrimeDisability, hasLpiPrimeCriticalIllness, hasLpiPrimeBankruptcy, awsCalculatedLpiAmount, history, themeMode, memberInstance }) => {
  const dispatch = useDispatch()
  // const IdsSlice = useSelector((state) => state.identificationReducer.identificationTypes)

  const expiryDateSetOnMigration = new Date()
  expiryDateSetOnMigration.setFullYear(2039)
  expiryDateSetOnMigration.setMonth(5)
  expiryDateSetOnMigration.setDate(30)
  expiryDateSetOnMigration.setHours(0, 0, 0, 0)

  useEffect(() => {
    setTimeout(() => {
      if (memberInstance?.data?.data) {
        dispatch(globalActions.setSecureSessionID(memberInstance?.data?.SID))
        dispatch(globalActions.setSecureSessionExpiry(memberInstance?.data?.expires_in))
        dispatch(globalActions.setSecureSessionExpiry(memberInstance?.data?.expires_in))

        // >>>>>>>>>>>>>>>>>>>>>>>>>>>> PERSONAL DETAILS <<<<<<<<<<<<<<<<< //

        const individualDetails = memberInstance?.data?.data?.body?.data?.attributes?.generalDetails?.individualDetails

        const secureClientID = memberInstance?.data?.data?.body?.data?.id
        const secureClientGeneralDetails = memberInstance?.data?.data?.body?.data?.attributes?.generalDetails
        const secureClientBankAccounts = memberInstance?.data?.data?.body?.data?.attributes?.bankAccounts

        dispatch(globalActions.setSecureClientID(secureClientID))
        dispatch(globalActions.setSecureClientGeneralDetails(secureClientGeneralDetails))
        dispatch(globalActions.setSecureClientBankAccounts(secureClientBankAccounts))

        const title = individualDetails?.title
        const forenames = individualDetails?.forenames
        const surname = individualDetails?.surname
        const dateOfBirth = individualDetails?.dateOfBirth
        const gender = getGenderType(individualDetails?.gender)?.value
        const numberOfDependants = parseInt(individualDetails?.numberOfDependants)
        const maritalStatus = getMaritalStatus(individualDetails?.maritalStatus)[0]

        // ********** Your Personal Details - Disptach to Redux Store ********** //

        dispatch(yourPersonalDetailsActions.setTitle(title))
        dispatch(yourPersonalDetailsActions.setForenames(forenames))
        dispatch(yourPersonalDetailsActions.setLastName(surname))
        dispatch(yourPersonalDetailsActions.setDob(dateOfBirth))
        dispatch(yourPersonalDetailsActions.setGender(gender))
        dispatch(yourPersonalDetailsActions.setDependents(numberOfDependants))
        dispatch(yourPersonalDetailsActions.setMaritalStatus(maritalStatus))

        // ********** Lending Criteria Qns ********** //

        // // Citizenship
        // if (memberInstance?.data?.data?.body?.data?.attributes?.generalDetails?.individualDetails?.countryOfCitizenship === 'NZD') {
        //   dispatch(lendingCriteriaQnsActions.setIsNzCitizen({ key: 'Yes', value: true }))
        // } else {
        //   dispatch(lendingCriteriaQnsActions.setIsNzCitizen({ key: 'No', value: false }))
        // }
        // dispatch(lendingCriteriaQnsActions.setCitizenship(memberInstance?.data?.data?.body?.data?.attributes?.generalDetails?.individualDetails?.countryOfCitizenship))

        // // Residency
        // if (memberInstance?.data?.data?.body?.data?.attributes?.generalDetails?.individualDetails?.countryOfResidence === 'NZD') {
        //   dispatch(lendingCriteriaQnsActions.setIsNzResident({ key: 'Yes', value: true }))
        // } else {
        //   dispatch(lendingCriteriaQnsActions.setIsNzResident({ key: 'No', value: false }))
        // }
        // dispatch(lendingCriteriaQnsActions.setResidency(memberInstance?.data?.data?.body?.data?.attributes?.generalDetails?.individualDetails?.countryOfResidence))

        const included = memberInstance?.data?.data?.body?.included
        const relationshipsAddress = memberInstance?.data?.data?.body?.data?.relationships?.addresses?.data
        const relationshipsContacts = memberInstance?.data?.data?.body?.data?.relationships?.contacts?.data
        const relationshipsEmployments = memberInstance?.data?.data?.body?.data?.relationships?.employments?.data
        const relationshipsIdentifications = memberInstance?.data?.data?.body?.data?.relationships?.identifications?.data

        if (relationshipsAddress) dispatch(contactDetailsActions.setSovAddressRelationships(relationshipsAddress))
        if (relationshipsContacts) dispatch(contactDetailsActions.setSovContactRelationships(relationshipsContacts))
        if (relationshipsEmployments) dispatch(employmentActions.setSovEmploymentRelationships(relationshipsEmployments))
        if (relationshipsIdentifications) dispatch(identificationActions.setSovIdentificationRelationships(relationshipsIdentifications))

        if (included) {
          // START >>>>>>>>>>>>>>>>>>>> IDENTIFICATIONS <<<<<<<<<<<<<<<<<<<<<<<< START //

          const identifications = included.filter((items) => {
            return items?.type === 'identification'
          })

          const identificationTypesInSovereignIncluded = identifications
            .map((includedTypes) => {
              return { ...includedTypes?.attributes, id: includedTypes?.id, type: includedTypes?.type }
            })
            .filter((sovidentifications) => {
              return !sovidentifications?.expiryDate || (new Date(sovidentifications?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(sovidentifications?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0))
            })
            .map((items) => {
              return { ...items, id: items?.id, type: items?.type, attributes: items?.attributes }
            })

          // Get Ids present In sovereign for the client
          const identificationTypesInSovereign = identificationTypesInSovereignIncluded.map((items) => {
            return items?.idType1
          })

          // Check the above array against an array of acceptable Ids
          const activeMemberIdsSovereign = acceptableIdentifications
            .filter((item) => {
              return identificationTypesInSovereign.includes(item?.key)
            })
            .map((item) => {
              return item?.key
            })

          // Insert the Ids found in the match to redux for the auto-complete to pick up on edit
          dispatch(identificationActions.setSelectedIdentificationTypes(activeMemberIdsSovereign))
          dispatch(identificationActions.setIdsInSovereignOnMount(activeMemberIdsSovereign.length))
          dispatch(identificationActions.setIdsSelected(activeMemberIdsSovereign.length))

          // ********* Drivers Licence ********* //

          const driversLicence = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'DRVLSC' && item?.idType2 === '' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const driversLicenceVersion = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'DRVLSC' && item?.idType2 === 'DLVERSION' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const driersLicenceIssuedDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'DRVLSC' && item?.idType2 === '' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.effectiveDate

          const driversLicenceExpiryDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'DRVLSC' && item?.idType2 === '' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.expiryDate

          // Sov ID and Type for Licence Number
          const driversLicenceSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'DRVLSC' && item?.idType2 === '' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const driversLicenceSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'DRVLSC' && item?.idType2 === '' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          // Sov ID and Type for Version
          const driversLicenceVersionSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'DRVLSC' && item?.idType2 === 'DLVERSION' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const driversLicenceVersionSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'DRVLSC' && item?.idType2 === 'DLVERSION' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          if (!(driversLicence == null)) dispatch(identificationActions.setdriversLicenceNo(driversLicence))
          if (!(driversLicenceVersion == null)) dispatch(identificationActions.setdriversLicenceVersion(driversLicenceVersion))
          if (!(driersLicenceIssuedDate == null)) dispatch(identificationActions.setdrLicenceIssueDate(driersLicenceIssuedDate))
          if (!(driversLicenceExpiryDate == null)) dispatch(identificationActions.setdrLicenceExpiryDate(driversLicenceExpiryDate))

          // Sovereign Data
          if (!(driversLicence == null)) dispatch(identificationActions.setsovdriversLicenceNo(driversLicence))
          if (!(driversLicenceVersion == null)) dispatch(identificationActions.setsovdriversLicenceVersion(driversLicenceVersion))
          if (!(driersLicenceIssuedDate == null)) dispatch(identificationActions.setsovdriversLicenceIssueDate(driersLicenceIssuedDate))
          if (!(driversLicenceExpiryDate == null)) dispatch(identificationActions.setsovdriversLicenceExpiryDate(driversLicenceExpiryDate))
          if (!(driversLicenceSovId == null)) dispatch(identificationActions.setdrLicenceSovId(driversLicenceSovId))
          if (!(driversLicenceSovType == null)) dispatch(identificationActions.setdrLicenceSovType(driversLicenceSovType))
          if (!(driversLicenceVersionSovId == null)) dispatch(identificationActions.setdrLicenceSovIdVersion(driversLicenceVersionSovId))
          if (!(driversLicenceVersionSovType == null)) dispatch(identificationActions.setdrLicenceSovTypeVersion(driversLicenceVersionSovType))

          // ********* PASSPORT ********* //

          const passportNo = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'PASPRT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const passportIssuedDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'PASPRT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.effectiveDate

          const passportExpiryDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'PASPRT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.expiryDate
          const passportSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'PASPRT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const passportSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'PASPRT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          if (!(passportNo == null)) dispatch(identificationActions.setPassportNo(passportNo))
          if (!(passportIssuedDate == null)) dispatch(identificationActions.setPassportIssueDate(passportIssuedDate))
          if (!(passportExpiryDate == null)) dispatch(identificationActions.setPassportExpiryDate(passportExpiryDate))

          // Sovereign Data
          if (!(passportNo == null)) dispatch(identificationActions.setsovpassportNo(passportNo))
          if (!(passportIssuedDate == null)) dispatch(identificationActions.setsovpassportIssueDate(passportIssuedDate))
          if (!(passportExpiryDate == null)) dispatch(identificationActions.setsovpassportExpiryDate(passportExpiryDate))
          if (!(passportSovId == null)) dispatch(identificationActions.setpassportSovId(passportSovId))
          if (!(passportSovType == null)) dispatch(identificationActions.setpassportSovType(passportSovType))

          // ********* Firearms Licence ********* //

          const firearmsLicenceNo = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'FIRELICENS' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const firearmsLicenceIssuedDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'FIRELICENS' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.effectiveDate

          const firearmsLicenceExpiryDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'FIRELICENS' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.expiryDate
          const firearmsLicenceSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'FIRELICENS' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const firearmsLicenceSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'FIRELICENS' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          if (!(firearmsLicenceNo == null)) dispatch(identificationActions.setFirearmsLicenceNo(firearmsLicenceNo))
          if (!(firearmsLicenceIssuedDate == null)) dispatch(identificationActions.setFirearmsLicenceIssueDate(firearmsLicenceIssuedDate))
          if (!(firearmsLicenceExpiryDate == null)) dispatch(identificationActions.setFirearmsLicenceExpiryDate(firearmsLicenceExpiryDate))

          // Sovereign Data
          if (!(firearmsLicenceNo == null)) dispatch(identificationActions.setsovfirearmsLicenceNo(firearmsLicenceNo))
          if (!(firearmsLicenceIssuedDate == null)) dispatch(identificationActions.setsovfirearmsLicenceIssueDate(firearmsLicenceIssuedDate))
          if (!(firearmsLicenceExpiryDate == null)) dispatch(identificationActions.setsovfirearmsLicenceExpiryDate(firearmsLicenceExpiryDate))
          if (!(firearmsLicenceSovId == null)) dispatch(identificationActions.setfirearms_licenceSovId(firearmsLicenceSovId))
          if (!(firearmsLicenceSovType == null)) dispatch(identificationActions.setfirearms_licenceSovType(firearmsLicenceSovType))

          // ********* Kiwi Access Card ********* //

          const kiwiAccessCardNo = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'KIWACCCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const kiwiAccessCardIssuedDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'KIWACCCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.effectiveDate

          const kiwiAccessCardExpiryDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'KIWACCCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.expiryDate
          const kiwiAccessCardSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'KIWACCCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const kiwiAccessCardSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'KIWACCCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          if (!(kiwiAccessCardNo == null)) dispatch(identificationActions.setKiwiAccessCardNo(kiwiAccessCardNo))
          if (!(kiwiAccessCardIssuedDate == null)) dispatch(identificationActions.setKiwiAccessCardIssueDate(kiwiAccessCardIssuedDate))
          if (!(kiwiAccessCardExpiryDate == null)) dispatch(identificationActions.setKiwiAccessCardExpiryDate(kiwiAccessCardExpiryDate))

          // Sovereign Data
          if (!(kiwiAccessCardNo == null)) dispatch(identificationActions.setsovkiwiAccessCardNo(kiwiAccessCardNo))
          if (!(kiwiAccessCardIssuedDate == null)) dispatch(identificationActions.setsovkiwiAccessCardIssueDate(kiwiAccessCardIssuedDate))
          if (!(kiwiAccessCardExpiryDate == null)) dispatch(identificationActions.setsovkiwiAccessCardExpiryDate(kiwiAccessCardExpiryDate))
          if (!(kiwiAccessCardSovId == null)) dispatch(identificationActions.setkiwi_access_cardSovId(kiwiAccessCardSovId))
          if (!(kiwiAccessCardSovType == null)) dispatch(identificationActions.setkiwi_access_cardSovType(kiwiAccessCardSovType))

          // ********* Community Service Card ********* //

          const communityServiceCardNo = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'COMSERVCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const communityServiceCardIssuedDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'COMSERVCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.effectiveDate

          const communityServiceCardExpiryDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'COMSERVCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.expiryDate
          const communityServiceCardSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'COMSERVCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const communityServiceCardSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'COMSERVCRD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          if (!(communityServiceCardNo == null)) dispatch(identificationActions.setCommunityServiceCardNo(communityServiceCardNo))
          if (!(communityServiceCardIssuedDate == null)) dispatch(identificationActions.setCommunityServiceCardIssueDate(communityServiceCardIssuedDate))
          if (!(communityServiceCardExpiryDate == null)) dispatch(identificationActions.setCommunityServiceCardExpiryDate(communityServiceCardExpiryDate))

          // Sovereign Data
          if (!(communityServiceCardNo == null)) dispatch(identificationActions.setsovcommServiceCardNo(communityServiceCardNo))
          if (!(communityServiceCardIssuedDate == null)) dispatch(identificationActions.setsovcommServiceCardIssueDate(communityServiceCardIssuedDate))
          if (!(communityServiceCardExpiryDate == null)) dispatch(identificationActions.setsovcommServiceCardExpiryDate(communityServiceCardExpiryDate))
          if (!(communityServiceCardSovId == null)) dispatch(identificationActions.setcommunity_service_cardSovId(communityServiceCardSovId))
          if (!(communityServiceCardSovType == null)) dispatch(identificationActions.setcommunity_service_cardSovType(communityServiceCardSovType))

          // ********* Birth Certificate ********* //

          const birthCertRegNo = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'BIRTHCERT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const birthCertRegDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'BIRTHCERT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.effectiveDate
          const birthCertSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'BIRTHCERT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const birthCertSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'BIRTHCERT' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          if (!(birthCertRegNo == null)) dispatch(identificationActions.setBirthCertificateRegNo(birthCertRegNo))
          if (!(birthCertRegDate == null)) dispatch(identificationActions.setDateOfBirth(birthCertRegDate))

          // Sovereign Data
          if (!(birthCertRegNo == null)) dispatch(identificationActions.setsovbirthCertificateRegNo(birthCertRegNo))
          if (!(birthCertRegDate == null)) dispatch(identificationActions.setsovbirthCertificateIssueDate(birthCertRegDate))
          if (!(birthCertSovId == null)) dispatch(identificationActions.setbirth_certificateSovId(birthCertSovId))
          if (!(birthCertSovType == null)) dispatch(identificationActions.setbirth_certificateSovType(birthCertSovType))

          // ********* Current Student ID ********* //

          const currentStudentIdNo = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'CURSTUDID' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const currentStudentIdIssuedDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'CURSTUDID' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.effectiveDate

          const curretStudentIdExpiryDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'CURSTUDID' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.expiryDate
          const curretStudentIdSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'CURSTUDID' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const curretStudentIdSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'CURSTUDID' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          if (!(currentStudentIdNo == null)) dispatch(identificationActions.setCurrentStudentIdNo(currentStudentIdNo))
          if (!(currentStudentIdIssuedDate == null)) dispatch(identificationActions.setCurrentStudentIdIssueDate(currentStudentIdIssuedDate))
          if (!(curretStudentIdExpiryDate == null)) dispatch(identificationActions.setCurrentStudentIdExpiryDate(curretStudentIdExpiryDate))

          // Sovereign Data
          if (!(currentStudentIdNo == null)) dispatch(identificationActions.setsovcurrStudentIdNo(currentStudentIdNo))
          if (!(currentStudentIdIssuedDate == null)) dispatch(identificationActions.setsovcurrStudentIdNo(currentStudentIdIssuedDate))
          if (!(curretStudentIdExpiryDate == null)) dispatch(identificationActions.setsovcurrStudentIdNo(curretStudentIdExpiryDate))
          if (!(curretStudentIdSovId == null)) dispatch(identificationActions.setcurrent_Student_idSovId(curretStudentIdSovId))
          if (!(curretStudentIdSovType == null)) dispatch(identificationActions.setcurrent_Student_idSovType(curretStudentIdSovType))

          // ********* Gold Card ********* //

          const goldCardNo = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'GOLDCARD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.reference

          const goldCardValidFromDate = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'GOLDCARD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.effectiveDate
          const goldCardSovId = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'GOLDCARD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.id
          const goldCardSovType = identificationTypesInSovereignIncluded.find((item) => {
            return item?.idType1 === 'GOLDCARD' && (!item?.expiryDate || new Date(item?.expiryDate).setHours(0, 0, 0, 0) !== expiryDateSetOnMigration || (new Date(item?.expiryDate).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0) && new Date(item?.expiryDate).setHours(0, 0, 0, 0) < new Date(expiryDateSetOnMigration).setHours(0, 0, 0, 0)))
          })?.type

          if (!(goldCardNo == null)) dispatch(identificationActions.setGoldCardNo(goldCardNo))
          if (!(goldCardValidFromDate == null)) dispatch(identificationActions.setGoldCardValidFromDate(goldCardValidFromDate))

          // Sovereign Data
          if (!(goldCardNo == null)) dispatch(identificationActions.setsovgoldCardNo(goldCardNo))
          if (!(goldCardValidFromDate == null)) dispatch(identificationActions.setsovgoldCardIssueDate(goldCardValidFromDate))
          if (!(goldCardSovId == null)) dispatch(identificationActions.setgold_cardSovId(goldCardSovId))
          if (!(goldCardSovType == null)) dispatch(identificationActions.setgold_cardSovType(goldCardSovType))

          // END >>>>>>>>>>>>>>>>>>>> IDENTIFICATIONS <<<<<<<<<<<<<<<<<<<<<<<< END //

          // START >>>>>>>>>>>>>>>> EMPLOYMENT DETAILS <<<<<<<<<<<<<<<<<<<<< START //

          const employments = included
            .filter((items) => {
              return items?.type === 'employment'
            })
            .map((items) => {
              return items?.attributes
            })

          const employmentsIncludedInSovereign = included
            .filter((items) => {
              return items?.type === 'employment'
            })
            .map((item) => {
              return { ...item?.attributes, id: item?.id, type: item?.type, attributes: item?.attributes }
            })

          const currentEmployments = employmentsIncludedInSovereign
            .filter((emp) => {
              return !emp?.expiryDate
            })
            ?.sort(function (a, b) {
              return new Date(b.effectiveDate) - new Date(a?.effectiveDate)
            })

          const currentEmployment = currentEmployments ? currentEmployments[0] : null
          const currentEmploymentType = currentEmployments ? getEmploymentTypes(currentEmployments[0]?.employmentType)?.value : null
          const currentOccupation = currentEmployments ? currentEmployments[0]?.occupation?.description : null
          const currentEmployerName = currentEmployments ? currentEmployments[0]?.employerName : null
          const currentEmploymentEffectiveDate = currentEmployments ? currentEmployments[0]?.effectiveDate : null

          if (!(currentEmploymentType == null)) dispatch(employmentActions.setEmploymnetType(currentEmploymentType))
          if (!(currentEmploymentType == null)) dispatch(employmentActions.setShowEmploymnetDetails(true))
          if (!(currentOccupation == null)) dispatch(employmentActions.setOccupation(currentOccupation))
          if (!(currentEmployerName == null)) dispatch(employmentActions.setemployerName(currentEmployerName))
          if (currentEmployments?.length > 0) dispatch(employmentActions.setSovHasCurrentEmpDetails(true))
          if (!(currentEmploymentEffectiveDate == null)) {
            const actualDifferenceInMonths = getMonthDifference(new Date(currentEmploymentEffectiveDate), new Date())
            const currentEmploymentPeriodYearPart = Math.floor(actualDifferenceInMonths / 12)
            const currentEmploymentPeriodYearPartInMonths = currentEmploymentPeriodYearPart * 12
            const currentEmploymentPeriodMonthPart = actualDifferenceInMonths - currentEmploymentPeriodYearPartInMonths

            if (!(currentEmploymentPeriodYearPart == null)) {
              dispatch(employmentActions.setEmpHistYears(currentEmploymentPeriodYearPart))

              if (currentEmploymentPeriodYearPart < 2) {
                dispatch(employmentActions.setshowPrevEmp(true))
              } else {
                dispatch(employmentActions.setshowPrevEmp(false))
                dispatch(employmentActions.setisValidPreviousEmployment(true))
              }
            }
            if (!(currentEmploymentPeriodMonthPart == null)) dispatch(employmentActions.setEmpHistMonths(currentEmploymentPeriodMonthPart))

            if (!(currentEmploymentPeriodYearPart == null)) dispatch(employmentActions.setsovempHistYears(currentEmploymentPeriodYearPart))
            if (!(currentEmploymentPeriodMonthPart == null)) dispatch(employmentActions.setsovempHistMonths(currentEmploymentPeriodMonthPart))
          }

          if (!(currentEmploymentType == null)) dispatch(employmentActions.setsovEmploymnetType(currentEmploymentType))
          if (!(currentOccupation == null)) dispatch(employmentActions.setsovOccupation(currentOccupation))
          if (!(currentEmployerName == null)) dispatch(employmentActions.setsovemployerName(currentEmployerName))

          const currentEmpSovId = currentEmployments ? currentEmployments[0]?.id : null
          const currentEmpSovType = currentEmployments ? currentEmployments[0]?.type : null
          const currentEmpSovAttributes = currentEmployments ? currentEmployments[0]?.attributes : null

          if (!(currentEmpSovId == null)) dispatch(employmentActions.setsovcurrEmpID(currentEmpSovId))
          if (!(currentEmpSovType == null)) dispatch(employmentActions.setsovcurrEmpType(currentEmpSovType))
          if (!(currentEmpSovAttributes == null)) dispatch(employmentActions.setsovcurrEmpAttributes(currentEmpSovAttributes))

          const expiredEmployments = employmentsIncludedInSovereign
            .filter((emp) => {
              return emp?.expiryDate
            })
            ?.sort(function (a, b) {
              return new Date(b.effectiveDate) - new Date(a.effectiveDate)
            })

          const previousEmployment = expiredEmployments ? expiredEmployments[0] : null
          const previousEmploymentType = expiredEmployments ? getEmploymentTypes(expiredEmployments[0]?.employmentType)?.value : null
          const previousOccupation = expiredEmployments ? expiredEmployments[0]?.occupation?.description : null
          const previousEmployerName = expiredEmployments ? expiredEmployments[0]?.employerName : null
          const previousEmploymentEffectiveDate = expiredEmployments ? expiredEmployments[0]?.effectiveDate : null
          const previousEmploymentExpiryDate = expiredEmployments ? expiredEmployments[0]?.expiryDate : null

          if (!(previousEmploymentType == null)) dispatch(employmentActions.setPrevEmploymnetType(previousEmploymentType))
          if (!(previousEmploymentType == null)) dispatch(employmentActions.setShowPrevEmploymnetDetails(true))
          if (!(previousOccupation == null)) dispatch(employmentActions.setPrevOccupation(previousOccupation))
          if (!(previousEmployerName == null)) dispatch(employmentActions.setPrevemployerName(previousEmployerName))
          if (expiredEmployments?.length > 0) dispatch(employmentActions.setSovHasPreviousEmpDetails(true))
          if (!(previousEmploymentEffectiveDate == null)) {
            const actualDifferenceInMonths = getMonthDifference(new Date(previousEmploymentEffectiveDate), new Date(previousEmploymentExpiryDate))
            const previousEmploymentPeriodYearPart = Math.floor(actualDifferenceInMonths / 12)
            const previousEmploymentPeriodYearPartInMonths = previousEmploymentPeriodYearPart * 12
            const previousEmploymentPeriodMonthPart = actualDifferenceInMonths - previousEmploymentPeriodYearPartInMonths

            if (!(previousEmploymentPeriodYearPart == null)) {
              dispatch(employmentActions.setPrevEmpHistYears(previousEmploymentPeriodYearPart))
              if (previousEmploymentPeriodYearPart < 2) {
                dispatch(employmentActions.setjointshowPrevEmp(true))
              } else {
                dispatch(employmentActions.setjointshowPrevEmp(false))
              }
            }
            if (!(previousEmploymentPeriodMonthPart == null)) dispatch(employmentActions.setPrevEmpHistMonths(previousEmploymentPeriodMonthPart))

            if (!(previousEmploymentPeriodYearPart == null)) dispatch(employmentActions.setsovprevEmpempHistYears(previousEmploymentPeriodYearPart))
            if (!(previousEmploymentPeriodMonthPart == null)) dispatch(employmentActions.setsovprevEmpempHistMonths(previousEmploymentPeriodMonthPart))
          }

          if (!(previousEmploymentType == null)) dispatch(employmentActions.setsovPrevEmploymnetType(previousEmploymentType))
          if (!(previousOccupation == null)) dispatch(employmentActions.setsovPrevOccupation(previousOccupation))
          if (!(previousEmployerName == null)) dispatch(employmentActions.setsovPrevemployerName(previousEmployerName))

          const previousEmpSovId = previousEmployment ? previousEmployment[0]?.id : null
          const previousEmpSovType = previousEmployment ? previousEmployment[0]?.type : null
          const previousEmpSovAttributes = previousEmployment ? previousEmployment[0]?.attributes : null

          if (!(previousEmpSovId == null)) dispatch(employmentActions.setsovprevEmpID(previousEmpSovId))
          if (!(previousEmpSovType == null)) dispatch(employmentActions.setsovprevEmpType(previousEmpSovType))
          if (!(previousEmpSovAttributes == null)) dispatch(employmentActions.setsovprevEmpAttributes(previousEmpSovAttributes))

          //* END >>>>>>>>>>>>>>>>> EMPLOYMENT DETAILS <<<<<<<<<<<<<<<<<<<<<< END //

          //* START >>>>>>>>>>>>>>>>> CONTACT DETAILS <<<<<<<<<<<<<<<<<<<<<< START //

          // ********* Home Email ********* //

          const emails = included
            .filter((items) => {
              return items?.type === 'email'
            })
            .map((items) => {
              return items?.attributes
            })

          const emailAddress = emails.find((email) => {
            return email?.contactType === 'HM' && !email?.expiryDate
          })?.address

          if (!(emailAddress == null)) dispatch(contactDetailsActions.setEmailAddress(emailAddress))

          // ********* Phone numbers ********* //

          const countryCode = '+64'

          const phones = included
            .filter((items) => {
              return items?.type === 'phone'
            })
            .map((items) => {
              return items?.attributes
            })

          // *----- Home Phone ----- //

          const homePhone = phones.find((phone) => {
            return phone?.contactType === 'HM' && !phone?.expiryDate
          })

          const homePhoneNumber = countryCode.concat(' ', homePhone?.stdCode.concat(' ', homePhone?.number))

          if (!(homePhone == null)) dispatch(contactDetailsActions.setHomePhone(homePhoneNumber))

          // *----- Work Phone ----- //

          const workPhone = phones.find((phone) => {
            return phone?.contactType === 'WK' && !phone?.expiryDate
          })

          const workPhoneNumber = countryCode.concat(' ', workPhone?.stdCode.concat(' ', workPhone?.number))

          if (!(workPhone == null)) dispatch(contactDetailsActions.setWorkPhone(workPhoneNumber))

          // *------ Mobile ------ //

          const mobiles = included
            .filter((items) => {
              return items?.type === 'mobile'
            })
            .map((items) => {
              return items?.attributes
            })

          const mobile = mobiles.find((mobile) => {
            return mobile?.contactType === 'MB' && !mobile?.expiryDate
          })

          const mobileNumber = countryCode.concat(' ', mobile?.networkCode.concat(' ', mobile?.number))
          if (!(mobile == null)) dispatch(contactDetailsActions.setMobileNumber(mobileNumber))

          // *Number of active contact methods in soverign
          const conctactMethods = [emailAddress, homePhone, workPhone, mobile]
          const numberOfActiveContactsInSovereign = conctactMethods.filter((method) => {
            return !(method == null)
          }).length

          if (numberOfActiveContactsInSovereign > 0) dispatch(contactDetailsActions.setNumberOfContactMethods(numberOfActiveContactsInSovereign))
          if (numberOfActiveContactsInSovereign < 2 || !isValidEmailAddress || !isValidMobileNumber || !isValidHomePhoneNumber || !isValidWorkPhoneNumber) dispatch(contactDetailsActions.setIsValidSovContactMethods(false))

          const currResAddressesIncludedInSovereign = included
            ?.filter((item) => {
              return item?.type === 'address'
            })
            ?.map((item) => {
              return { ...item?.attributes, id: item?.id, type: item?.type, attributes: item?.attributes }
            })
            ?.filter((address) => {
              return !address?.expiryDate
            })
            ?.sort(function (a, b) {
              return new Date(b.effectiveDate) - new Date(a.effectiveDate)
            })

          // .filter((address) => {
          //   return !address?.expiryDate
          // })
          // ?.sort(function (a, b) {
          //   return new Date(b.effectiveDate) - new Date(a.effectiveDate)
          // })

          const recentActiveAddress = currResAddressesIncludedInSovereign ? currResAddressesIncludedInSovereign[0] : null
          if (recentActiveAddress) {
            dispatch(contactDetailsActions.setsovHasCurrentResidentialDetails(true))
            dispatch(contactDetailsActions.setCurrHomeAddStreet(recentActiveAddress?.streetOrPostalName + 'Address present'))
          }

          const recentActiveAddressEffectiveDate = recentActiveAddress?.effectiveDate

          const currentResidenceTypeCode = individualDetails?.accommodation?.code

          if (!(recentActiveAddress?.addressType == null)) dispatch(contactDetailsActions.setsovCurrentAddressType(recentActiveAddress?.addressType))
          if (!(recentActiveAddress?.alpha == null)) dispatch(contactDetailsActions.setsovCurrentAddressAlpha(recentActiveAddress?.alpha))
          if (!(recentActiveAddress?.apartment == null)) dispatch(contactDetailsActions.setsovCurrentAddressapartment(recentActiveAddress?.apartment))
          if (!(recentActiveAddress?.building == null)) dispatch(contactDetailsActions.setsovCurrentAddressbuilding(recentActiveAddress?.building))
          if (!(recentActiveAddress?.careOfName == null)) dispatch(contactDetailsActions.setsovCurrentAddresscareOfName(recentActiveAddress?.careOfName))
          if (!(recentActiveAddress?.city == null)) dispatch(contactDetailsActions.setsovCurrentAddresscity(recentActiveAddress?.city))
          if (!(recentActiveAddress?.contactType == null)) dispatch(contactDetailsActions.setsovCurrentAddresscontactType(recentActiveAddress?.contactType))
          if (!(recentActiveAddress?.country?.code == null)) dispatch(contactDetailsActions.setsovCurrentAddresscountryCode(recentActiveAddress?.country?.code))
          if (!(recentActiveAddress?.country?.description == null)) dispatch(contactDetailsActions.setsovCurrentAddresscountryDescription(recentActiveAddress?.country?.description))
          if (!(recentActiveAddress?.effectiveDate == null)) dispatch(contactDetailsActions.setsovCurrentAddresseffective(recentActiveAddress?.effectiveDate))
          if (!(recentActiveAddress?.floor == null)) dispatch(contactDetailsActions.setsovCurrentAddressfloor(recentActiveAddress?.floor))
          if (!(recentActiveAddress?.postCode == null)) dispatch(contactDetailsActions.setsovCurrentAddresspostCode(recentActiveAddress?.postCode))
          if (!(recentActiveAddress?.purpose == null)) dispatch(contactDetailsActions.setsovCurrentAddresspurpose(recentActiveAddress?.purpose))
          if (!(recentActiveAddress?.streetDirection == null)) dispatch(contactDetailsActions.setsovCurrentAddressstreetDirection(recentActiveAddress?.streetDirection))
          if (!(recentActiveAddress?.streetNumber?.from == null)) dispatch(contactDetailsActions.setsovCurrentAddressstreetNumberFrom(recentActiveAddress?.streetNumber?.from))
          if (!(recentActiveAddress?.streetNumber?.to == null)) dispatch(contactDetailsActions.setsovCurrentAddressstreetNumberTo(recentActiveAddress?.streetNumber?.to))
          if (!(recentActiveAddress?.streetOrPostalName == null)) dispatch(contactDetailsActions.setsovCurrentAddressstreetOrPostalName(recentActiveAddress?.streetOrPostalName))
          if (!(recentActiveAddress?.streetType == null)) dispatch(contactDetailsActions.setsovCurrentAddressstreetType(recentActiveAddress?.streetType))
          if (!(recentActiveAddress?.suburb == null)) dispatch(contactDetailsActions.setsovCurrentAddresssuburb(recentActiveAddress?.suburb))
          if (!(recentActiveAddress?.unitType == null)) dispatch(contactDetailsActions.setsovCurrentAddressunitType(recentActiveAddress?.unitType))

          if (recentActiveAddress) {
            if (!(currentResidenceTypeCode == null)) {
              if (currentResidenceTypeCode === 'BRD') dispatch(contactDetailsActions.setResidenceType('BOARD'))
              if (currentResidenceTypeCode === 'OWM') dispatch(contactDetailsActions.setResidenceType('HOME'))
              if (currentResidenceTypeCode === 'RNTX' || currentResidenceTypeCode === 'RNT2') dispatch(contactDetailsActions.setResidenceType('RENT'))
            }

            if ((!(recentActiveAddress?.streetNumber?.from == null) || recentActiveAddress?.streetNumber?.to == null) && recentActiveAddress?.streetOrPostalName == null) dispatch(contactDetailsActions.setIsValidSovCurrentResidentialDetails(false))
            if (recentActiveAddress?.streetNumber?.from == null && !(recentActiveAddress?.streetOrPostalName == null)) dispatch(contactDetailsActions.setIsValidSovCurrentResidentialDetails(false))
            if (recentActiveAddress?.suburb == null) dispatch(contactDetailsActions.setIsValidSovCurrentResidentialDetails(false))
            if (recentActiveAddress?.city == null) dispatch(contactDetailsActions.setIsValidSovCurrentResidentialDetails(false))
            if (recentActiveAddress?.postCode == null) dispatch(contactDetailsActions.setIsValidSovCurrentResidentialDetails(false))
          }

          if (!(recentActiveAddressEffectiveDate == null)) {
            dispatch(contactDetailsActions.setsovcurrResEffectiveDate(recentActiveAddressEffectiveDate))

            const actualDifferenceInMonths = getMonthDifference(new Date(recentActiveAddressEffectiveDate), new Date())
            const currentResidencePeriodYearPart = Math.floor(actualDifferenceInMonths / 12)
            const currentResidencePeriodYearPartInMonths = currentResidencePeriodYearPart * 12
            const currentResidencePeriodMonthPart = actualDifferenceInMonths - currentResidencePeriodYearPartInMonths

            if (!(currentResidencePeriodYearPart == null)) {
              dispatch(contactDetailsActions.setCurrResYears(currentResidencePeriodYearPart))
              dispatch(contactDetailsActions.setsovcurrResYears(currentResidencePeriodYearPart))
              if (currentResidencePeriodYearPart < 3) dispatch(contactDetailsActions.setSkipPrevResidence(false))
            }
            if (!(currentResidencePeriodMonthPart == null)) dispatch(contactDetailsActions.setCurrResMonths(currentResidencePeriodMonthPart))
            if (!(currentResidencePeriodMonthPart == null)) dispatch(contactDetailsActions.setsovcurrResMonths(currentResidencePeriodMonthPart))

            if (currentResidencePeriodYearPart === 0 && currentResidencePeriodMonthPart === 0) {
              dispatch(contactDetailsActions.setsovcurrResLengthOfStayIsZero(true))
            }
          }

          const recentActiveAddressSovID = recentActiveAddress ? recentActiveAddress?.id : null
          const recentActiveAddressSovType = recentActiveAddress ? recentActiveAddress?.type : null
          const recentActiveAddressSovAttributes = recentActiveAddress ? recentActiveAddress?.attributes : null

          if (!(recentActiveAddressSovID == null)) dispatch(contactDetailsActions.setsovCurrentAddressId(recentActiveAddressSovID))
          if (!(recentActiveAddressSovType == null)) dispatch(contactDetailsActions.setsovCurrentAddressType(recentActiveAddressSovType))
          if (!(recentActiveAddressSovAttributes == null)) dispatch(contactDetailsActions.setsovCurrentAddressAttributes(recentActiveAddressSovAttributes))

          const prevResAddressIncludedSovereign = included
            .filter((item) => {
              return item?.type === 'address'
            })
            .map((item) => {
              return { ...item?.attributes, id: item?.id, type: item?.type, attributes: item?.attributes }
            })
            .filter((address) => {
              return address.contactType === 'RS'
            })
            .filter((address) => {
              return address?.expiryDate
            })
            ?.sort(function (a, b) {
              return new Date(b.effectiveDate) - new Date(a.effectiveDate)
            })

          if (prevResAddressIncludedSovereign?.length > 0) dispatch(contactDetailsActions.setsovHasPreviousResidentialDetails(true))

          const previousResAddress = prevResAddressIncludedSovereign ? prevResAddressIncludedSovereign[0] : null
          const previousResAddressEffectiveDate = previousResAddress ? previousResAddress?.effectiveDate : null
          const previousResAddressExpiryDate = previousResAddress ? previousResAddress?.expiryDate : null

          if (!(previousResAddress?.addressType == null)) dispatch(contactDetailsActions.setsovPreviousAddressType(previousResAddress?.addressType))
          if (!(previousResAddress?.alpha == null)) dispatch(contactDetailsActions.setsovPreviousAddressAlpha(previousResAddress?.alpha))
          if (!(previousResAddress?.apartment == null)) dispatch(contactDetailsActions.setsovPreviousAddressapartment(previousResAddress?.apartment))
          if (!(previousResAddress?.building == null)) dispatch(contactDetailsActions.setsovPreviousAddressbuilding(previousResAddress?.building))
          if (!(previousResAddress?.careOfName == null)) dispatch(contactDetailsActions.setsovPreviousAddresscareOfName(previousResAddress?.careOfName))
          if (!(previousResAddress?.city == null)) dispatch(contactDetailsActions.setsovPreviousAddresscity(previousResAddress?.city))
          if (!(previousResAddress?.contactType == null)) dispatch(contactDetailsActions.setsovPreviousAddresscontactType(previousResAddress?.contactType))
          if (!(previousResAddress?.country?.code == null)) dispatch(contactDetailsActions.setsovPreviousAddresscountryCode(previousResAddress?.country?.code))
          if (!(previousResAddress?.country?.description == null)) dispatch(contactDetailsActions.setsovPreviousAddresscountryDescription(previousResAddress?.country?.description))
          if (!(previousResAddress?.effectiveDate == null)) dispatch(contactDetailsActions.setsovPreviousAddresseffective(previousResAddress?.effectiveDate))
          if (!(previousResAddress?.floor == null)) dispatch(contactDetailsActions.setsovPreviousAddressfloor(previousResAddress?.floor))
          if (!(previousResAddress?.postCode == null)) dispatch(contactDetailsActions.setsovPreviousAddresspostCode(previousResAddress?.postCode))
          if (!(previousResAddress?.purpose == null)) dispatch(contactDetailsActions.setsovPreviousAddresspurpose(previousResAddress?.purpose))
          if (!(previousResAddress?.streetDirection == null)) dispatch(contactDetailsActions.setsovPreviousAddressstreetDirection(previousResAddress?.streetDirection))
          if (!(previousResAddress?.streetNumber?.from == null)) dispatch(contactDetailsActions.setsovPreviousAddressstreetNumberFrom(previousResAddress?.streetNumber?.from))
          if (!(previousResAddress?.streetNumber?.to == null)) dispatch(contactDetailsActions.setsovPreviousAddressstreetNumberTo(previousResAddress?.streetNumber?.to))
          if (!(previousResAddress?.streetOrPostalName == null)) dispatch(contactDetailsActions.setsovPreviousAddressstreetOrPostalName(previousResAddress?.streetOrPostalName))
          if (!(previousResAddress?.streetType == null)) dispatch(contactDetailsActions.setsovPreviousAddressstreetType(previousResAddress?.streetType))
          if (!(previousResAddress?.suburb == null)) dispatch(contactDetailsActions.setsovPreviousAddresssuburb(previousResAddress?.suburb))
          if (!(previousResAddress?.unitType == null)) dispatch(contactDetailsActions.setsovPreviousAddressunitType(previousResAddress?.unitType))

          if (!(previousResAddressEffectiveDate == null)) {
            dispatch(contactDetailsActions.setsovprevResEffectiveDate(previousResAddressEffectiveDate))
            dispatch(contactDetailsActions.setsovprevResExpiryDate(previousResAddressExpiryDate))

            const actualDifferenceInMonths = getMonthDifference(new Date(previousResAddressEffectiveDate), new Date(previousResAddressExpiryDate))
            const previousResidencePeriodYearPart = Math.floor(actualDifferenceInMonths / 12)
            const previousResidencePeriodYearPartInMonths = previousResidencePeriodYearPart * 12
            const previousResidencePeriodMonthPart = actualDifferenceInMonths - previousResidencePeriodYearPartInMonths

            if (!(previousResidencePeriodYearPart == null)) dispatch(contactDetailsActions.setPrevResYears(previousResidencePeriodYearPart))
            if (!(previousResidencePeriodMonthPart == null)) dispatch(contactDetailsActions.setPrevResMonths(previousResidencePeriodMonthPart))
            if (!(previousResidencePeriodYearPart == null)) dispatch(contactDetailsActions.setsovprevResYears(previousResidencePeriodYearPart))
            if (!(previousResidencePeriodMonthPart == null)) dispatch(contactDetailsActions.setsovprevResMonths(previousResidencePeriodMonthPart))

            if (previousResidencePeriodYearPart === 0 && previousResidencePeriodMonthPart === 0) {
              dispatch(contactDetailsActions.setsovprevResLengthOfStayIsZero(true))
            }
          }

          if (previousResAddress) {
            if ((!(previousResAddress?.streetNumber?.from == null) || previousResAddress?.streetNumber?.to == null) && previousResAddress?.streetOrPostalName == null) dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(false))
            if (previousResAddress?.streetNumber?.from == null && !(previousResAddress?.streetOrPostalName == null)) dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(false))
            if (previousResAddress?.suburb == null) dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(false))
            if (previousResAddress?.city == null) dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(false))
            if (previousResAddress?.postCode == null) dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(false))
          }

          const previousResAddressSovID = previousResAddress ? previousResAddress?.id : null
          const previousResAddressSovType = previousResAddress ? previousResAddress?.type : null
          const previousResAddressSovAttributes = previousResAddress ? previousResAddress?.attributes : null

          if (!(previousResAddressSovID == null)) dispatch(contactDetailsActions.setsovPreviousAddressId(previousResAddressSovID))
          if (!(previousResAddressSovType == null)) dispatch(contactDetailsActions.setsovPreviousAddressType(previousResAddressSovType))
          if (!(previousResAddressSovAttributes == null)) dispatch(contactDetailsActions.setsovPreviousAddressAttributes(previousResAddressSovAttributes))
          // END >>>>>>>>>>>>>>>>>>>> CONTACT DETAILS <<<<<<<<<<<<<<<<<<<<<<<< END //

          // *Personal details sovereign data check
          if (title == null || forenames == null || surname == null || dateOfBirth == null || gender == null || maritalStatus == null) {
            dispatch(yourPersonalDetailsActions.setValidSovereignPersonalDetails(false))
          }
          if (title == null) {
            dispatch(yourPersonalDetailsActions.setValidSovereignPersonalDetailsTitle(false))
          }
          if (forenames == null) {
            dispatch(yourPersonalDetailsActions.setValidSovereignPersonalDetailsForeNames(false))
          }
          if (surname == null) {
            dispatch(yourPersonalDetailsActions.setValidSovereignPersonalDetailsSurname(false))
          }
          if (gender == null) {
            dispatch(yourPersonalDetailsActions.setValidSovereignPersonalDetailsGender(false))
          }
          if (dateOfBirth == null) {
            dispatch(yourPersonalDetailsActions.setValidSovereignPersonalDetailsDob(false))
          }
          if (maritalStatus == null) {
            dispatch(yourPersonalDetailsActions.setValidSovereignPersonalDetailsMaritalStatus(false))
          }

          // *---------- Identification Checks ---------- //

          //* 1. Drivers Licence
          const { isValidLicenceNo, isValidLicenceVersion, isActiveDrLicence, isDrValidExpiry } = isValidDriversLicence(driversLicence, driversLicenceVersion, driersLicenceIssuedDate, driversLicenceExpiryDate)

          //* Set the validation varibales based on the validation checks
          if (isValidLicenceNo && isValidLicenceVersion && isActiveDrLicence && isDrValidExpiry) {
            dispatch(identificationActions.setIsValidDrLicenceCounter(1))
            dispatch(identificationActions.setIsValidDrLicenceDetails(true))
            dispatch(identificationActions.setisValidSovDriversLicence(true))
          } else {
            dispatch(identificationActions.setIsValidDrLicenceCounter(0))
            dispatch(identificationActions.setIsValidDrLicenceDetails(false))
            dispatch(identificationActions.setisValidSovDriversLicence(false))
          }

          dispatch(identificationActions.setisValidSovDriversLicenceNo(isValidLicenceNo))
          dispatch(identificationActions.setisValidSovDriversLicenceVersion(isValidLicenceVersion))
          dispatch(identificationActions.setisValidSovDriversLicenceIssuedDate(isActiveDrLicence))
          dispatch(identificationActions.setisValidSovDriversLicenceExpiryDate(isDrValidExpiry))

          //* 2. Passport
          const { isValidPassportNo, isActivePassport, isValidPassportExpiry } = isValidPassport(passportNo, passportIssuedDate, passportExpiryDate)

          dispatch(identificationActions.setisValidSovPassport(isValidPassportNo && isActivePassport && isValidPassportExpiry))

          dispatch(identificationActions.setisValidSovPassportNo(isValidPassportNo))
          dispatch(identificationActions.setisValidSovPassportIssuedDate(isActivePassport))
          dispatch(identificationActions.setisValidSovPassportExpiryDate(isValidPassportExpiry))

          //* 3. Firearms Licence
          const { isValidFireamrsNo, isActiveFireamrs, isValidFireamrsExpiry } = isValidFirearmsLicence(firearmsLicenceNo, firearmsLicenceIssuedDate, firearmsLicenceExpiryDate)
          dispatch(identificationActions.setisValidSovFirearmsLicence(isValidFireamrsNo && isActiveFireamrs && isValidFireamrsExpiry))

          dispatch(identificationActions.setisValidSovFirearmsLicenceNo(isValidFireamrsNo))
          dispatch(identificationActions.setisValidSovFirearmsLicenceIssuedDate(isActiveFireamrs))
          dispatch(identificationActions.setisValidSovFirearmsLicenceExpiryDate(isValidFireamrsExpiry))

          //* 4. Kiwi Access Card
          const { isValidKiwiAccessCardNo, isActiveKiwiAccessCard, isValidKiwiAccessCardExpiry } = isValidKiwiAccessCard(kiwiAccessCardNo, kiwiAccessCardIssuedDate, kiwiAccessCardExpiryDate)
          dispatch(identificationActions.setisValidSovKiwiAccessCard(isValidKiwiAccessCardNo && isActiveKiwiAccessCard && isValidKiwiAccessCardExpiry))

          dispatch(identificationActions.setisValidSovKiwiAccessCardNo(isValidKiwiAccessCardNo))
          dispatch(identificationActions.setisValidSovKiwiAccessCardIssuedDate(isActiveKiwiAccessCard))
          dispatch(identificationActions.setisValidSovKiwiAccessCardExpiryDate(isValidKiwiAccessCardExpiry))

          //* 5. Community Service Card
          const { isValidCommunityServiceCardNo, isActiveCommunityServiceCard, isValidCommunityServiceCardExpiry } = isValidCommunityServiceCard(communityServiceCardNo, communityServiceCardIssuedDate, communityServiceCardExpiryDate)
          dispatch(identificationActions.setisValidSovCommunityServiceCard(isValidCommunityServiceCardNo && isActiveCommunityServiceCard && isValidCommunityServiceCardExpiry))

          dispatch(identificationActions.setisValidSovCommunityServiceCardNo(isValidCommunityServiceCardNo))
          dispatch(identificationActions.setisValidSovCommunityServiceCardIssuedDate(isActiveCommunityServiceCard))
          dispatch(identificationActions.setisValidSovCommunityServiceCardExpiryDate(isValidCommunityServiceCardExpiry))

          //* 6. Birth Certificate
          const { isValidBirthCertRegNo, isVaildBirthCertRegistrationDate } = isValidBrithCertificate(birthCertRegNo, birthCertRegDate)
          dispatch(identificationActions.setisValidSovBirthCertificate(isValidBirthCertRegNo && isVaildBirthCertRegistrationDate))

          dispatch(identificationActions.setisValidSovBirthCertificateRegNo(isValidBirthCertRegNo))
          dispatch(identificationActions.setisValidSovBirthCertificateRegDate(isVaildBirthCertRegistrationDate))

          //* 7. Current Student ID
          const { isValidStudentIdNo, isActiveStudentId, isValidStudentIdExpiry } = isValidCurrentStudentId(currentStudentIdNo, currentStudentIdIssuedDate, curretStudentIdExpiryDate)
          dispatch(identificationActions.setisValidSovCurrentStudentID(isValidStudentIdNo && isActiveStudentId && isValidStudentIdExpiry))

          dispatch(identificationActions.setisValidSovCurrentStudentIdNo(isValidStudentIdNo))
          dispatch(identificationActions.setisValidSovCurrentStudentIdIssuedDate(isActiveStudentId))
          dispatch(identificationActions.setisValidSovCurrentStudentIdExpiryDate(isValidStudentIdExpiry))

          //* 7. Gold Card
          const { isValidGoldCardNo, isVaildGoldCardIssuedDate } = isValidGoldCard(goldCardNo, goldCardValidFromDate)
          dispatch(identificationActions.setisValidSovGoldCard(isValidGoldCardNo && isVaildGoldCardIssuedDate))

          dispatch(identificationActions.setisValidSovGoldCard(isValidGoldCardNo))
          dispatch(identificationActions.setisValidSovGoldCard(isVaildGoldCardIssuedDate))

          //* ---------- Employement Detail Checks ---------- //

          //* Current Employment

          if (currentEmployment) {
            if (currentEmploymentType == null || currentOccupation == null || currentEmployerName == null || currentEmploymentEffectiveDate == null) {
              dispatch(employmentActions.setisValidCurrentEmployment(false))
            }

            if (currentEmploymentType == null) {
              dispatch(employmentActions.setisValidemploymentType(false))
            }
            if (currentOccupation == null) {
              dispatch(employmentActions.setisValidoccupation(false))
            }
            if (currentEmployerName == null) {
              dispatch(employmentActions.setisValidemployerName(false))
            }
            if (currentEmploymentEffectiveDate == null) {
              dispatch(employmentActions.setisValidempHistYears(false))
              dispatch(employmentActions.setisValidempHistMonths(false))
            }
          }

          //* Previous Employment

          if (previousEmployment) {
            if (previousEmploymentType == null || previousOccupation == null || previousEmployerName == null || previousEmploymentEffectiveDate == null) {
              dispatch(employmentActions.setisValidPreviousEmployment(false))
            }

            if (previousEmploymentType == null) {
              dispatch(employmentActions.setisValidprevEmpemploymentType(false))
            }
            if (previousOccupation == null) {
              dispatch(employmentActions.setisValidprevEmpoccupation(false))
            }
            if (previousEmployerName == null) {
              dispatch(employmentActions.setisValidprevEmpemployerName(false))
            }
            if (previousEmploymentEffectiveDate == null) {
              dispatch(employmentActions.setisValidprevEmpempHistYears(false))
              dispatch(employmentActions.setisValidprevEmpempHistMonths(false))
            }
          } else {
            dispatch(employmentActions.setisValidPreviousEmployment(true))
          }

          //* ---------- Current Residential Detail Checks ---------- //
          if (recentActiveAddress) {
            if (currentResidenceTypeCode == null || recentActiveAddress == null) {
              dispatch(contactDetailsActions.setIsValidResidenceDetails(false))
            }
          } else {
            dispatch(contactDetailsActions.setIsValidResidenceDetails(null))
          }

          //* ---------- Previous Residential Detail Checks ---------- //

          if (previousResAddress) {
            if (previousResAddress == null && currentResidencePeriodYearPart < 3) {
              dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(false))
            } else {
              dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(null))
            }
          } else {
            dispatch(contactDetailsActions.setIsValidSovPreviousResidentialDetails(null))
          }

          //* ---------- Contact Detail Checks ---------- //

          if (emailAddress) dispatch(contactDetailsActions.setisValidSovEmailAddress(isValidEmailAddress(emailAddress)))
          if (homePhone) dispatch(contactDetailsActions.setisValidSovHomePhoneNumber(isValidHomePhoneNumber(homePhoneNumber)))
          if (workPhone) dispatch(contactDetailsActions.setisValidSovWorkPhoneNumber(isValidWorkPhoneNumber(workPhoneNumber)))
          if (mobile) dispatch(contactDetailsActions.setisValidSovMobileNumber(isValidMobileNumber(mobileNumber)))
        }
      }
    }, 2000)
  }, [])

  return (
    <>
      <ThemeConfig>
        <ThemePrimaryColor>
          <GlobalStyles />
          <Router history={history}>
            <Switch>
              <Route path='/application/prequalify'>
                <Prequalify memberInstance={memberInstance} />
              </Route>
              <Route path='/application/lendingcriteria'>
                <PrequalifySecureRoot memberInstance={memberInstance} />
              </Route>
              <Route path='/application/eligibility' component={PrequalifyRedirect} />
              <Route path='/application/verify' component={ApplicationCompletionPlan} />
              <Route path='/application/personal_loan'>
                <FirstLoanApplication loanAmount={loanAmount} interestRate={interestRate} term={term} paymentFrequency={paymentFrequency} creditCheck={creditCheck} creditSense={creditSense} motorWebCheck={motorWebCheck} ppsrRegistration={ppsrRegistration} docuSignSigning={docuSignSigning} cloudCheckIdVerification={cloudCheckIdVerification} cloudCheckPEP={cloudCheckPEP} hasLpiPrimeDeath={hasLpiPrimeDeath} hasLpiPrimeDisability={hasLpiPrimeDisability} hasLpiPrimeCriticalIllness={hasLpiPrimeCriticalIllness} hasLpiPrimeBankruptcy={hasLpiPrimeBankruptcy} awsCalculatedLpiAmount={awsCalculatedLpiAmount} />
              </Route>
              {/* <Route path='/application/personal_loan-secure'>
                <FirstLoanApplicationSecure loanAmount={loanAmount} interestRate={interestRate} term={term} paymentFrequency={paymentFrequency} creditCheck={creditCheck} creditSense={creditSense} motorWebCheck={motorWebCheck} ppsrRegistration={ppsrRegistration} docuSignSigning={docuSignSigning} cloudCheckIdVerification={cloudCheckIdVerification} cloudCheckPEP={cloudCheckPEP} hasLpiPrimeDeath={hasLpiPrimeDeath} hasLpiPrimeDisability={hasLpiPrimeDisability} hasLpiPrimeCriticalIllness={hasLpiPrimeCriticalIllness} hasLpiPrimeBankruptcy={hasLpiPrimeBankruptcy} awsCalculatedLpiAmount={awsCalculatedLpiAmount} />
              </Route> */}
            </Switch>
          </Router>
        </ThemePrimaryColor>
      </ThemeConfig>
    </>
  )
}

// git commit control 7
