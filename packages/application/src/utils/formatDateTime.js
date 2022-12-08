import { format, getTime, formatDistanceToNow } from 'date-fns'

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy')
}

export function fDateCustom(date) {
  return format(new Date(date), 'ddMMyyyyHHmmss')
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm')
}

export function fTimestamp(date) {
  return getTime(new Date(date))
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p')
}

export function fDateYYYY_MM_DD(date) {
  return format(new Date(date), 'yyyy-MM-dd')
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  })
}

export function convertUnixToUTCTimestamp(date) {
  const unixTimestamp = date

  const dateFormat = new Date(unixTimestamp)

  const timeZoneOffsetInHours = (-1 * dateFormat.getTimezoneOffset()) / 60
  dateFormat.setUTCHours(timeZoneOffsetInHours, 0, 0, 0)

  // const isoDate = dateFormat.toISOString()
  // console.log('UNIX iso date: ', isoDate)
  const sovereignDate = fDateYYYY_MM_DD(dateFormat)
  console.log('sovereignDate UNIX: ', sovereignDate)
  return sovereignDate
}

export function convertToUTCTimestamp(date, callfrom) {
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

  console.log('sovereignDate UTC: ', sovereignDate)

  // console.log('BEFORE ISO CONVERSION: ', dateFormat)
  // const isoDate = dateFormat.toISOString()
  // console.log('UTC ISO date: ', isoDate)

  return sovereignDate
}
