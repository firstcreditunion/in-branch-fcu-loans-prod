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
