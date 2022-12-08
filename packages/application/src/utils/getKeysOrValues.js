import React from 'react'

import { typesOfResidence } from '../forms/ContactDetails/Codes/ResidentialCodes'
import { streetTypes } from '../forms/ContactDetails/Codes/StreetTypes'

import { loanPurpose, tradingBranch, countries } from '../forms/Prequalify/Codes/PrelimaryQuestionCodes'

export function getResidenceType_Key(key) {
  return typesOfResidence.find((item) => {
    return item.key === key
  })
}

export function getResidenceType_Value(value) {
  return typesOfResidence.find((item) => {
    return item.value === value
  })
}

export function getStreetTypeFromKey(key) {
  return streetTypes.find((item) => {
    return item.key === key
  })
}

export function getStreetTypeFromValue(value) {
  return streetTypes.find((item) => {
    return item.value === value
  })
}

// ------------- Get loan Purpose ------------

export function getLoanPurposeFromKey(key) {
  return loanPurpose.find((item) => {
    return item.key === key
  })
}

export function getLoanPurposeFromValue(value) {
  return loanPurpose.find((item) => {
    return item.value === value
  })
}

// ------------- Get trading branch ------------

export function getTradingBranchFromKey(key) {
  return tradingBranch.find((item) => {
    return item.key === key
  })
}

export function getTradingBranchFromValue(value) {
  return tradingBranch.find((item) => {
    return item.value === value
  })
}

// ------------- Get Country ------------

export function getCountryFromKey(key) {
  return countries.find((item) => {
    return item.code === key
  })
}

export function getCountryFromValue(value) {
  return countries.find((item) => {
    return item.label === value
  })
}
