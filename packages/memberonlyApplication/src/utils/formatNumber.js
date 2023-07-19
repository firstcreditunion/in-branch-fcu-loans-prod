import { replace } from 'lodash'
import numeral from 'numeral'

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format('$0,0.00')
}

export function fPercent(number) {
  return numeral(number / 100).format('0%')
}

export function fNumber(number) {
  return numeral(number).format()
}

export function fNumberCust(number) {
  return numeral(number).format('0.00')
}

export function fShortenNumber(number) {
  return replace(numeral(number).format('0.00a'), '.00', '')
}

export function fData(number) {
  return numeral(number).format('0.0 b')
}
