import React from 'react'
import { format, getTime, formatDistance, formatDistanceStrict, isAfter, sub } from 'date-fns'

export function dateIsAfter(date, dateToCompare) {
  return isAfter(date, dateToCompare)
}

export function subtractXDaysFromDate(dateToSubtractFrom, daysToSubtract) {
  const date = new Date(dateToSubtractFrom)

  return new Date(date.setDate(date.getDate() - daysToSubtract))
}

export function subtractDurationFromDate(dateToSubtractFrom, duration) {
  const date = new Date(dateToSubtractFrom)
  console.log('Date: ', date)
  console.log('Date to Compare: ', duration)
  console.log('Subtracted Date: ', sub(dateToSubtractFrom, { ...duration }))
}

export function numberOfDaysBetweenDates(date1, date2) {}

export function distanceBetweenDateInWords(date, baseDate, options = []) {
  return formatDistance(date, baseDate, options)
}

export function distanceBetweenDatesStrict(date, baseDate, options) {
  return formatDistanceStrict(date, baseDate, options)
}

export function getDateArrayFromStartDateAndEndDate(startDate, endDate) {
  const date = new Date(startDate.getTime())

  const dates = []

  while (date <= endDate) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates
}
