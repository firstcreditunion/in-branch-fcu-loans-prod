//* Endpoints
const AUTH_BASE = 'https://45ftmoapxl.execute-api.ap-southeast-2.amazonaws.com'
const OCC_BASE_URL_APP = 'https://6s6pe9scql.execute-api.ap-southeast-2.amazonaws.com'

const location_origin = window.location.origin

console.log('location_origin: ', location_origin)

//* Resources - Application
export const BASE_URL_LOCAL_APP = `${OCC_BASE_URL_APP}/${getCloudFrontEnvironment()}`
export const BASE_URL_AWS_APP = `${OCC_BASE_URL_APP}/${getCloudFrontEnvironment()}`

//* Resources - Authentication
export const BASE_URL_LOCAL_AUTH = `${AUTH_BASE}/TEST_AUTH`
export const BASE_URL_AWS_AUTH = `${AUTH_BASE}/TEST_AUTH`

export const HTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  IDLE: 'IDLE',
})

export const AXIOS_NETWOR_ERROR = Object.freeze({
  CODE: 'ERR_NETWORK',
  MESSAGE: 'Network Error',
})

export const SUBMISSION_STATUS = Object.freeze({
  CODE: 200,
})

export const HEADER_CONSTANTS = Object.freeze({
  clientID: 'boss.test22!',
  ClientSecret: '2022Collingwood!',
  mode: 'G', // Set Mode to L for Login token_
})

export const processNodeEnv = () => {
  return process.env.NODE_ENV
}

export function getCloudFrontEnvironment() {
  if (location_origin === 'https://d26kpxwzomgzm2.cloudfront.net' || location_origin === 'https://loans.firstcreditunion.co.nz') {
    return 'SS-PROD'
  }
  if (location_origin === 'http://localhost:3001' || location_origin === 'https://d2m9u9efe3xh9m.cloudfront.net' || location_origin === 'https://testloans.firstcreditunion.co.nz') {
    return 'SS-DEV'
  }
}

// export const awKMSAccessKey = () => {
//   return process.env.REACT_APP_KMS_GUEST_ACCESS_KEY
// }

// export const awKMSSecretKey = () => {
//   return process.env.REACT_APP_KMS_GUEST_SECRET_KEY
// }
