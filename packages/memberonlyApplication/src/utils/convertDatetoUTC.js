import React from 'react'

import { fDateYYYY_MM_DD } from '../utils/formatDateTime'

export function convertUnixToUTCTimestamp(date, callfrom) {
  const unixTimestamp = date

  const dateFormat = new Date(unixTimestamp)

  const timeZoneOffsetInHours = (-1 * dateFormat.getTimezoneOffset()) / 60

  const sovereignDate = fDateYYYY_MM_DD(dateFormat)

  return sovereignDate
}

export function convertToUTCTimestamp(date) {
  if (date === null) {
    return
  }

  if (typeof date === 'number') {
    return convertUnixToUTCTimestamp(date)
  }

  const dateFormat = new Date(date).setUTCHours(0, 0, 0, 0)

  if (typeof dateFormat === 'number') {
    return convertUnixToUTCTimestamp(dateFormat)
  }
  const isoDate = date.toISOString()

  return isoDate
}

//* Currently used in Loan Calculator
export function convertToUTCCustom(date, callfrom) {

  //Correct
  if (date === null) {
    return
  }

  //Correct
  if (typeof date === 'number') {
    return convertUnixToUTCTimestamp(date)
  }

  //Correct
  const dateFormat = new Date(date)

  //Correct
  const timeZoneOffsetInHours = (-1 * dateFormat.getTimezoneOffset()) / 60

  // dateFormat.setUTCHours(timeZoneOffsetInHours, 0, 0, 0)

  //Correct
  if (typeof dateFormat === 'number') {
    return convertUnixToUTCTimestamp(dateFormat)
  }

  const sovereignDate = fDateYYYY_MM_DD(dateFormat)

  return sovereignDate

}
