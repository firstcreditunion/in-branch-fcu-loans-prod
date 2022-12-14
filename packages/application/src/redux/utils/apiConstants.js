//* Endpoints
const AUTH_BASE = 'https://45ftmoapxl.execute-api.ap-southeast-2.amazonaws.com'
const OCC_BASE_URL_APP = 'https://6s6pe9scql.execute-api.ap-southeast-2.amazonaws.com'

//* Resources - Application
export const BASE_URL_LOCAL_APP = `${OCC_BASE_URL_APP}/SS-DEV`
export const BASE_URL_AWS_APP = `${OCC_BASE_URL_APP}/SS-DEV`

//* Resources - Authentication
export const BASE_URL_LOCAL_AUTH = `${AUTH_BASE}/TEST_AUTH`
export const BASE_URL_AWS_AUTH = `${AUTH_BASE}/TEST_AUTH`

export const HTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  IDLE: 'IDLE',
})

export const HEADER_CONSTANTS = Object.freeze({
  clientID: 'boss.test22!',
  ClientSecret: '2022Collingwood!',
  mode: 'G', // Set Mode to L for Login token_
})

export const processNodeEnv = () => {
  return process.env.NODE_ENV
}

// export const awKMSAccessKey = () => {
//   return process.env.REACT_APP_KMS_GUEST_ACCESS_KEY
// }

// export const awKMSSecretKey = () => {
//   return process.env.REACT_APP_KMS_GUEST_SECRET_KEY
// }
