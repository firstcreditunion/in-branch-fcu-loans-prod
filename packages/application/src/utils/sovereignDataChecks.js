import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { identificationActions } from '../redux/slices/identificationSlice'

// ----------------------- IDENTIFICATION CHECKS -----------------------------

export function isValidDriversLicence(licenceNo, version, issueDate, expiryDate) {
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()
  const expiryYearUpperLimit = issueDate ? new Date(new Date(issueDate).setFullYear(new Date(issueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()

  const isValidLicenceNo = /^([a-zA-Z][a-zA-Z]\d\d\d\d\d\d*)$/.test(licenceNo)
  const isValidLicenceVersion = /^[0-9]*$/.test(version)
  const isActiveDrLicence = new Date(issueDate).getFullYear() >= issueYearLowerLimit
  const isDrValidExpiry = new Date(expiryDate).getFullYear() <= expiryYearUpperLimit

  return { isValidLicenceNo, isValidLicenceVersion, isActiveDrLicence, isDrValidExpiry }
}

export function isValidPassport(passportNo, issueDate, expiryDate) {
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()
  const expiryYearUpperLimit = issueDate ? new Date(new Date(issueDate).setFullYear(new Date(issueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()

  const isValidPassportNo = /^([A-Z]{2}\d{6})$/.test(passportNo)
  const isActivePassport = new Date(issueDate).getFullYear() >= issueYearLowerLimit
  const isValidPassportExpiry = new Date(expiryDate).getFullYear() <= expiryYearUpperLimit

  return { isValidPassportNo, isActivePassport, isValidPassportExpiry }
}

export function isValidFirearmsLicence(firearmsLicenceNo, issueDate, expiryDate) {
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()
  const expiryYearUpperLimit = issueDate ? new Date(new Date(issueDate).setFullYear(new Date(issueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()

  const isValidFireamrsNo = true
  const isActiveFireamrs = new Date(issueDate).getFullYear() >= issueYearLowerLimit
  const isValidFireamrsExpiry = new Date(expiryDate).getFullYear() <= expiryYearUpperLimit

  return { isValidFireamrsNo, isActiveFireamrs, isValidFireamrsExpiry }
}

export function isValidKiwiAccessCard(kiwiAccessCardNo, issueDate, expiryDate) {
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 10)).getFullYear()
  const expiryYearUpperLimit = issueDate ? new Date(new Date(issueDate).setFullYear(new Date(issueDate).getFullYear() + 10)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 10)).getFullYear()

  const isValidKiwiAccessCardNo = true
  const isActiveKiwiAccessCard = new Date(issueDate).getFullYear() >= issueYearLowerLimit
  const isValidKiwiAccessCardExpiry = new Date(expiryDate).getFullYear() <= expiryYearUpperLimit

  return { isValidKiwiAccessCardNo, isActiveKiwiAccessCard, isValidKiwiAccessCardExpiry }
}

export function isValidCommunityServiceCard(communityServiceCardNo, issueDate, expiryDate) {
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).getFullYear()
  const expiryYearUpperLimit = issueDate ? new Date(new Date(issueDate).setFullYear(new Date(issueDate).getFullYear() + 3)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 3)).getFullYear()

  const isValidCommunityServiceCardNo = true
  const isActiveCommunityServiceCard = new Date(issueDate).getFullYear() >= issueYearLowerLimit
  const isValidCommunityServiceCardExpiry = new Date(expiryDate).getFullYear() <= expiryYearUpperLimit

  return { isValidCommunityServiceCardNo, isActiveCommunityServiceCard, isValidCommunityServiceCardExpiry }
}

export function isValidBrithCertificate(birthCertRegNo, RegistrationDate) {
  const isValidBirthCertRegNo = true
  const isVaildBirthCertRegistrationDate = true

  return { isValidBirthCertRegNo, isVaildBirthCertRegistrationDate }
}

export function isValidCurrentStudentId(studentIdNo, issueDate, expiryDate) {
  const issueYearLowerLimit = new Date(new Date().setFullYear(new Date().getFullYear() - 3)).getFullYear()
  const expiryYearUpperLimit = issueDate ? new Date(new Date(issueDate).setFullYear(new Date(issueDate).getFullYear() + 3)).getFullYear() : new Date(new Date().setFullYear(new Date().getFullYear() + 3)).getFullYear()

  const isValidStudentIdNo = true
  const isActiveStudentId = new Date(issueDate).getFullYear() >= issueYearLowerLimit
  const isValidStudentIdExpiry = new Date(expiryDate).getFullYear() <= expiryYearUpperLimit

  return { isValidStudentIdNo, isActiveStudentId, isValidStudentIdExpiry }
}

export function isValidGoldCard(goldCardNo, issuedDate) {
  const isValidGoldCardNo = true
  const isVaildGoldCardIssuedDate = true

  return { isValidGoldCardNo, isVaildGoldCardIssuedDate }
}

// (?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])

// ----------------------- CONTACT DETAIL CHECKS -----------------------------

export function isValidMobileNumber(mobileNumber) {
  return /^(((\+?64\s*[-\.\ ]?[3-9]|\(?0[3-9]\)?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?\d{4})|((\+?64\s*[-\.\(\ ]?2\d{1,2}[-\.\)\ ]?|\(?02\d{1}\)?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?\d{3,5})|((\+?64\s*[-\.\ ]?[-\.\(\ ]?800[-\.\)\ ]?|[-\.\(\ ]?0800[-\.\)\ ]?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?(\d{2}|\d{5})))|^$$/.test(mobileNumber)
}
export function isValidWorkPhoneNumber(workPhoneNumber) {
  return /^(((\+?64\s*[-\.\ ]?[3-9]|\(?0[3-9]\)?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?\d{4})|((\+?64\s*[-\.\(\ ]?2\d{1,2}[-\.\)\ ]?|\(?02\d{1}\)?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?\d{3,5})|((\+?64\s*[-\.\ ]?[-\.\(\ ]?800[-\.\)\ ]?|[-\.\(\ ]?0800[-\.\)\ ]?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?(\d{2}|\d{5})))|^$$/.test(workPhoneNumber)
}
export function isValidHomePhoneNumber(homePhoneNumber) {
  return /^(((\+?64\s*[-\.\ ]?[3-9]|\(?0[3-9]\)?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?\d{4})|((\+?64\s*[-\.\(\ ]?2\d{1,2}[-\.\)\ ]?|\(?02\d{1}\)?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?\d{3,5})|((\+?64\s*[-\.\ ]?[-\.\(\ ]?800[-\.\)\ ]?|[-\.\(\ ]?0800[-\.\)\ ]?)\s*[-\.\ ]?\d{3}\s*[-\.\ ]?(\d{2}|\d{5})))|^$$/.test(homePhoneNumber)
}
export function isValidEmailAddress(emailAddress) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/.test(emailAddress)
}
