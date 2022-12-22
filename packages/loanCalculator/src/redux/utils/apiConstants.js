//* Endpoints
const AUTH_BASE = 'https://45ftmoapxl.execute-api.ap-southeast-2.amazonaws.com'
const OCC_BASE_URL_APP = 'https://6s6pe9scql.execute-api.ap-southeast-2.amazonaws.com'

//* Resources - Application
export const BASE_URL_LOCAL_APP = `${OCC_BASE_URL_APP}/${getCloudFrontEnvironment()}`
export const BASE_URL_AWS_APP = `${OCC_BASE_URL_APP}/${getCloudFrontEnvironment()}`

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

function getCloudFrontEnvironment() {
  if (location_origin === 'https://d26kpxwzomgzm2.cloudfront.net' || location_origin === 'https://loans.firstcreditunion.co.nz') {
    return 'SS-PROD'
  }
  if (location_origin === 'http://localhost:3001' || location_origin === 'https://d2m9u9efe3xh9m.cloudfront.net' || location_origin === 'https://testloans.firstcreditunion.co.nz') {
    return 'SS-DEV'
  }
}
