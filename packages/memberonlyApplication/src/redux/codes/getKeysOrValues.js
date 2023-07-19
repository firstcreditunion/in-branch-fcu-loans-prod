import React from 'react'

import { typesOfClientRecordStatus } from './ClientRecordStatus'
import { genderTypes } from './Gender'
import { maritalStatus } from './MaritalStatus'
import { documentTypes } from './DocumentType'
import { baseRateTypes, creditHistoryTypes, securityTypes } from './LoanDetailsCodes'
import { loanPurpose } from './LoanPurpose'
import { validIdentifications } from './IdentificationTypes'
import { employmentTypeMenu, occupationMenu } from './EmploymentCodes'
import { streetTypes } from './StreetTypes'
import { tradingBranch } from './TradingBranches'
import { dayOfWeek } from './DayOfWeek'

export function getClientRecordStatus_Key(key) {
  return typesOfClientRecordStatus.find((item) => {
    return item.key === key
  })
}

export function getClientRecordStatus_Value(value) {
  return typesOfClientRecordStatus.find((item) => {
    return item.value === value
  })
}

export function getGender_Key(key) {
  return genderTypes.find((item) => {
    return item.key === key
  })
}

export function getGender_Value(value) {
  return genderTypes.find((item) => {
    return item.value === value
  })
}

export function getMaritalStatus_Key(key) {
  return maritalStatus.find((item) => {
    return item.key === key
  })
}

export function getMaritalStatus_Value(value) {
  return maritalStatus.find((item) => {
    return item.value === value
  })
}

export function getDocumentType_FromKey(key) {
  return documentTypes.find((item) => {
    return item.key === key
  })
}

export function getDocumentType_FromValue(value) {
  return documentTypes.find((item) => {
    return item.value === value
  })
}

export function getBaseRate_FromKey(key) {
  return baseRateTypes.find((item) => {
    return item.key === key
  })
}

export function getBaseRate_FromValue(value) {
  return baseRateTypes.find((item) => {
    return item.value === value
  })
}

export function getCreditHistory_FromKey(key) {
  return creditHistoryTypes.find((item) => {
    return item.key === key
  })
}

export function getCreditHistory_FromValue(value) {
  return creditHistoryTypes.find((item) => {
    return item.value === value
  })
}

export function getSecurity_FromKey(key) {
  return securityTypes.find((item) => {
    return item.key === key
  })
}

export function getSecurity_FromValue(value) {
  return securityTypes.find((item) => {
    return item.value === value
  })
}

export function getLoanPurpose_FromKey(key) {
  return loanPurpose.find((item) => {
    return item.key === key
  })
}

export function getLoanPurpose_FromValue(value) {
  return loanPurpose.find((item) => {
    return item.value === value
  })
}

export function getIdentification_FromKey(key) {
  return validIdentifications.find((item) => {
    return item.key === key
  })
}

export function getIdentification_FromValue(value) {
  return validIdentifications.find((item) => {
    return item.value === value
  })
}

export function getEmployment_FromKey(key) {
  return employmentTypeMenu.find((item) => {
    return item.key === key
  })
}

export function getEmployment_FromValue(value) {
  return employmentTypeMenu.find((item) => {
    return item.value === value
  })
}

export function getOccupation_FromKey(key) {
  return occupationMenu.find((item) => {
    return item.key === key
  })
}

export function getOccupation_FromValue(value) {
  return occupationMenu.find((item) => {
    return item.value === value
  })
}

export function getStreetType_FromKey(key) {
  return streetTypes.find((item) => {
    return item.key === key
  })
}

export function getStreetType_FromValue(value) {
  return streetTypes.find((item) => {
    return item.value === value
  })
}

export function getTradingBranch_FromKey(key) {
  return tradingBranch.find((item) => {
    return item.key === key
  })
}

export function getTradingBranch_FromValue(value) {
  return tradingBranch.find((item) => {
    return item.value === value
  })
}

export function getDayOfWeek_FromKey(key) {
  return dayOfWeek.find((item) => {
    return item.key === key
  })
}

export function getDayOfWeek_FromValue(value) {
  return dayOfWeek.find((item) => {
    return item.value === value
  })
}
