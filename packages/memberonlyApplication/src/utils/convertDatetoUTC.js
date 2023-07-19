import React from 'react'

import { fDateYYYY_MM_DD } from '../utils/formatDateTime'

function convertUnixToUTCTimestamp(date) {
  const unixTimestamp = date

  const dateFormat = new Date(unixTimestamp)

  dateFormat.setUTCHours(0, 0, 0, 0)
  const isoDate = dateFormat.toISOString()
  return isoDate
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

export function convertToUTCCustom(date, callfrom) {
  if (date === null) {
    return
  }

  if (typeof date === 'number') {
    return convertUnixToUTCTimestamp(date)
  }

  const dateFormat = new Date(date)
  const timeZoneOffsetInHours = (-1 * dateFormat.getTimezoneOffset()) / 60
  dateFormat.setUTCHours(timeZoneOffsetInHours, 0, 0, 0)

  if (typeof dateFormat === 'number') {
    return convertUnixToUTCTimestamp(dateFormat)
  }

  const sovereignDate = fDateYYYY_MM_DD(dateFormat)
  return sovereignDate
}
