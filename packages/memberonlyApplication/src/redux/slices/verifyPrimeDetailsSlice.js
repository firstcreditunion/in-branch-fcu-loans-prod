import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'
import axios from 'axios'

const namespace = 'verifyPrimeDetails'

//* Identification
export const getPrimeIdentification = createAsyncThunk(`${namespace}/getPrimeIdentification`, async (primeIdentificationConfig) => {
  return await axios(primeIdentificationConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

//* Contact Details
export const getPrimeEmploymentDetails = createAsyncThunk(`${namespace}/getPrimeEmploymentDetails`, async (primeEmploymentConfig) => {
  return await axios(primeEmploymentConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

//* Contact Details
export const getPrimeContactDetails = createAsyncThunk(`${namespace}/getPrimeContactDetails`, async (primeContactConfig) => {
  return await axios(primeContactConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

//* Addresses
export const getPrimeAddresses = createAsyncThunk(`${namespace}/getPrimeAddresses`, async (primeAddressesConfig) => {
  return await axios(primeAddressesConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const initialState = {
  identificationloading: HTTP_STATUS.IDLE,
  identificationerror: HTTP_STATUS.IDLE,
  identificationcurrentRequestId: null,

  employmentloading: HTTP_STATUS.IDLE,
  employmenterror: HTTP_STATUS.IDLE,
  employmentcurrentRequestId: null,

  contactloading: HTTP_STATUS.IDLE,
  contacterror: HTTP_STATUS.IDLE,
  contactcurrentRequestId: null,

  addressloading: HTTP_STATUS.IDLE,
  addresserror: HTTP_STATUS.IDLE,
  addresscurrentRequestId: null,

  //* Identification
  identifications: [],

  //* Employment Details
  employmentDetails: [],

  //* Contact Details
  clientContact: [],

  //* Addressses
  addresses: [],

  primePersonalDetailsVerified: false,

  primeIdentificationDetailsVerified: false,
  hasIdentifications: null,

  primeEmploymentDetailsVerified: false,
  hasEmploymentDetails: null,

  primeContactDetailsVerified: false,
  hasContactDetails: null,

  primeAddressesVerified: false,
  hasAddresses: null,

  //* Validation and Submission
  onSubmitVerifyPrimeDetails: null,
  isValidVerifyPrimeDetails: null,
}

const verifyPrimeDetailsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    clearAll: (state, action) => {
      state.identificationloading = HTTP_STATUS.IDLE
      state.identificationerror = HTTP_STATUS.IDLE
      state.identificationcurrentRequestId = null
      state.employmentloading = HTTP_STATUS.IDLE
      state.employmenterror = HTTP_STATUS.IDLE
      state.employmentcurrentRequestId = null
      state.contactloading = HTTP_STATUS.IDLE
      state.contacterror = HTTP_STATUS.IDLE
      state.contactcurrentRequestId = null
      state.addressloading = HTTP_STATUS.IDLE
      state.addresserror = HTTP_STATUS.IDLE
      state.addresscurrentRequestId = null
      state.identifications = []
      state.employmentDetails = []
      state.clientContact = []
      state.addresses = []
      state.primePersonalDetailsVerified = false
      state.primeIdentificationDetailsVerified = false
      state.hasIdentifications = null
      state.primeEmploymentDetailsVerified = false
      state.hasEmploymentDetails = null
      state.primeContactDetailsVerified = false
      state.hasContactDetails = null
      state.primeAddressesVerified = false
      state.hasAddresses = null
      state.onSubmitVerifyPrimeDetails = null
      state.isValidVerifyPrimeDetails = null
    },
    setPrimePersonalDetailsVerified: (state, action) => {
      state.primePersonalDetailsVerified = action.payload
    },

    setPrimeIdentificationDetailsVerified: (state, action) => {
      state.primeIdentificationDetailsVerified = action.payload
    },
    setHasIdentifications: (state, action) => {
      state.hasIdentifications = action.payload
    },
    clearMemberDetailsVerification: (state, action) => {
      state.primePersonalDetailsVerified = false
      state.primeIdentificationDetailsVerified = false
      state.primeEmploymentDetailsVerified = false
      state.primeContactDetailsVerified = false
      state.primeAddressesVerified = false
    },

    setPrimeEmploymentDetailsVerified: (state, action) => {
      state.primeEmploymentDetailsVerified = action.payload
    },
    setHasEmploymentDetails: (state, action) => {
      state.hasEmploymentDetails = action.payload
    },

    setPrimeContactDetailsVerified: (state, action) => {
      state.primeContactDetailsVerified = action.payload
    },
    setHasContactDetails: (state, action) => {
      state.hasContactDetails = action.payload
    },

    setPrimeAddressesVerified: (state, action) => {
      state.primeAddressesVerified = action.payload
    },
    setHasAddresses: (state, action) => {
      state.hasAddresses = action.payload
    },

    setOnSubmitVerifyPrimeDetails: (state, action) => {
      state.onSubmitVerifyPrimeDetails = action.payload
    },
    setIsValidVerifyPrimeDetails: (state, action) => {
      state.isValidVerifyPrimeDetails = action.payload
    },
  },
  extraReducers: (builder) => {
    builder

      //* Identification
      .addCase(getPrimeIdentification.pending, (state, action) => {
        if (state.identificationloading === 'IDLE') {
          state.identificationloading = HTTP_STATUS.PENDING
          state.identificationcurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getPrimeIdentification.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.identificationloading === 'PENDING' && state.identificationcurrentRequestId === requestId) {
          state.identificationloading = HTTP_STATUS.IDLE
          // console.log('IDENTIFICATIONS: ', action.payload?.axiosResponse?.identifications)
          state.identifications = action.payload?.axiosResponse?.identifications
        }
      })
      .addCase(getPrimeIdentification.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.identificationloading === 'PENDING' && state.identificationcurrentRequestId === requestId) {
          state.identificationloading = 'IDLE'
          state.contacterror = action.error
          state.identificationcurrentRequestId = null

          // console.log('Rejected Error: ', action.error)
          // console.log('Rejected Payload: ', action.payload)
          // console.log('Rejected meta: ', action.meta)
          // console.log('Rejected Type: ', action.type)
        }
      })

      //* Employment
      .addCase(getPrimeEmploymentDetails.pending, (state, action) => {
        if (state.employmentloading === 'IDLE') {
          state.employmentloading = HTTP_STATUS.PENDING
          state.employmentcurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getPrimeEmploymentDetails.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.employmentloading === 'PENDING' && state.employmentcurrentRequestId === requestId) {
          state.employmentloading = HTTP_STATUS.IDLE

          state.employmentDetails = action.payload?.axiosResponse?.employment
        }
      })
      .addCase(getPrimeEmploymentDetails.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.employmentloading === 'PENDING' && state.employmentcurrentRequestId === requestId) {
          state.employmentloading = 'IDLE'
          state.employmenterror = action.error
          state.employmentcurrentRequestId = null

          // console.log('Rejected Error: ', action.error)
          // console.log('Rejected Payload: ', action.payload)
          // console.log('Rejected meta: ', action.meta)
          // console.log('Rejected Type: ', action.type)
        }
      })

      //* Client Contacts
      .addCase(getPrimeContactDetails.pending, (state, action) => {
        if (state.contactloading === 'IDLE') {
          state.contactloading = HTTP_STATUS.PENDING
          state.contactcurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getPrimeContactDetails.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.contactloading === 'PENDING' && state.contactcurrentRequestId === requestId) {
          state.contactloading = HTTP_STATUS.IDLE

          state.clientContact = action.payload?.axiosResponse?.contacts
        }
      })
      .addCase(getPrimeContactDetails.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.contactloading === 'PENDING' && state.contactcurrentRequestId === requestId) {
          state.contactloading = 'IDLE'
          state.contacterror = action.error
          state.contactcurrentRequestId = null

          // console.log('Rejected Error: ', action.error)
          // console.log('Rejected Payload: ', action.payload)
          // console.log('Rejected meta: ', action.meta)
          // console.log('Rejected Type: ', action.type)
        }
      })

      //* Client Addresses
      .addCase(getPrimeAddresses.pending, (state, action) => {
        if (state.addressloading === 'IDLE') {
          state.addressloading = HTTP_STATUS.PENDING
          state.addresscurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getPrimeAddresses.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.addressloading === 'PENDING' && state.addresscurrentRequestId === requestId) {
          state.addressloading = HTTP_STATUS.IDLE

          state.addresses = action.payload?.axiosResponse?.addresses
        }
      })
      .addCase(getPrimeAddresses.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.addressloading === 'PENDING' && state.addresscurrentRequestId === requestId) {
          state.addressloading = 'IDLE'
          state.addresserror = action.error
          state.addresscurrentRequestId = null

          // console.log('Rejected Error: ', action.error)
          // console.log('Rejected Payload: ', action.payload)
          // console.log('Rejected meta: ', action.meta)
          // console.log('Rejected Type: ', action.type)
        }
      })
  },
})

export const verifyPrimeDetailsActions = verifyPrimeDetailsSlice.actions
export default verifyPrimeDetailsSlice
