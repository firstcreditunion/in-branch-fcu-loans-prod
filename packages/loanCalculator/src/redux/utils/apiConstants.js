//* Endpoints
const AUTH_BASE = 'https://45ftmoapxl.execute-api.ap-southeast-2.amazonaws.com'
const OCC_BASE_URL_APP = 'https://6s6pe9scql.execute-api.ap-southeast-2.amazonaws.com'

//* Resources - Application
export const BASE_URL_LOCAL_APP = `${OCC_BASE_URL_APP}/SS-PROD`
export const BASE_URL_AWS_APP = `${OCC_BASE_URL_APP}/SS-PROD`

//* Resources - Authentication
export const BASE_URL_LOCAL_AUTH = `${AUTH_BASE}/TEST_AUTH`
export const BASE_URL_AWS_AUTH = `${AUTH_BASE}/TEST_AUTH`

//* Node Environment
export const processNodeEnv = () => {
  return process.env.NODE_ENV
}

export const HTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
  IDLE: 'IDLE',
})
