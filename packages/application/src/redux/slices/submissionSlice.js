import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'submission'

const options = {
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
}

export const submitLoanApplication = createAsyncThunk(`${namespace}/submitApp`, async (submissionConfig) => {
  return await axios(submissionConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (errorResponse) {
      return errorResponse
    })
})

export const generateLoanApplicationReport = createAsyncThunk(`${namespace}/generatePdf`, async (genreratePdfConfig) => {
  return await axios(genreratePdfConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (errorResponse) {
      return errorResponse
    })
})

export const onlineAppAuth = createAsyncThunk(`${namespace}/authApp`, async (authConfig) => {
  return await axios(authConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (errorResponse) {
      return errorResponse
    })
})

export const sendCipherText = createAsyncThunk(`${namespace}/sendCipherText`, async (sendCipherTextConfig) => {
  return await axios(sendCipherTextConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (errorResponse) {
      return errorResponse
    })
})

export const initialState = {
  submissionStatusCode: null,
  submissionFulfilled: null,

  axiosCode: null,
  axiosCodeMessage: null,
  axiosCodeName: null,
  axiosRequestStatus: null,
  axiosRequestStatusText: null,

  loading: HTTP_STATUS.IDLE,
  currentRequestId: null,
  error: null,
  serverError: null,

  loadingSubmission: HTTP_STATUS.IDLE,
  currentRequestIdSubmission: null,
  errorSubmission: null,
  serverErrorSubmission: null,

  loadingGeneratePdf: HTTP_STATUS.IDLE,
  currentRequestIdGeneratePdf: null,
  errorGeneratePdf: null,
  serverErrorGeneratePdf: null,

  loadingCipherText: HTTP_STATUS.IDLE,
  currentRequestIdCipherText: null,
  errorCipherText: null,
  serverErrorCipherText: null,

  applicationReference: null,
  onlinetoken: null,

  onSubmitApplication: null,
  isValidApplication: null,

  kmsDataKeySuccess: false,
  kmsDataKeyError: null,

  kmsCipherTextBlob: null,
  kmsPlainText: null,

  guestData_JWE: null,
}

const submissionSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setSubmissionData: (state, action) => {
      state.data = action.payload
    },
    setKmsDataKeySuccess: (state, action) => {
      state.kmsDataKeySuccess = action.payload
    },
    setKmsDataKeyError: (state, action) => {
      state.kmsDataKeyError = action.payload
    },
    setKmsCipherTextBlob: (state, action) => {
      state.kmsCipherTextBlob = action.payload
    },
    setKmsPlainText: (state, action) => {
      state.kmsPlainText = action.payload
    },
    setGuestData_JWE: (state, action) => {
      state.guestData_JWE = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitLoanApplication.pending, (state, action) => {
        if (state.loadingSubmission === 'IDLE') {
          state.loadingSubmission = HTTP_STATUS.PENDING
          state.currentRequestIdSubmission = action.meta.requestId
        }
      })
      .addCase(submitLoanApplication.fulfilled, (state, action) => {
        const { requestId } = action.meta
        // console.log('Submit Application FULFILLED META: ', action.meta)
        // console.log('Submit Application FULFILLED PAYLOAD: ', action.payload)
        // console.log('Submit Application FULFILLED TYPE: ', action.type)

        state.submissionFulfilled = true

        let errorArray = action.payload?.body?.appErrors

        state.axiosCodeMessage = errorArray.map((obj) => obj.errorMessage).join(', ')

        state.axiosCodeName = action.payload?.name
        state.axiosRequestStatus = action.payload?.request?.status
        state.axiosRequestStatusText = action.payload?.request?.statusText

        state.submissionStatusCode = action.payload?.statusCode

        if (state.loadingSubmission === 'PENDING' && state.currentRequestIdSubmission === requestId) {
          state.loadingSubmission = HTTP_STATUS.IDLE
          state.currentRequestIdSubmission = null
          state.applicationReference = action.payload?.body?.data?.attributes?.applicationRef
        }

        if (action.payload?.body?.errors?.length > 0) {
          state.errorSubmission = action.payload?.body?.errors
        }
        if (action.payload?.errorMessage !== '') {
          state.serverErrorSubmission = action.payload?.stackTrace
        }
      })
      .addCase(submitLoanApplication.rejected, (state, action) => {
        const { requestId } = action.meta

        // console.log('Submit Application REJECTED META: ', action.meta)
        // console.log('Submit Application REJECTED PAYLOAD: ', action.payload)
        // console.log('Submit Application REJECTED TYPE: ', action.type)

        if (action.payload) {
          state.errorSubmission = action.payload?.errorMessage
        } else {
          state.errorSubmission = action.error?.message
        }
        if (state.loadingSubmission === 'PENDING' && state.currentRequestIdSubmission === requestId) {
          state.loadingSubmission = 'IDLE'
          state.errorSubmission = action.error
          state.currentRequestIdSubmission = null
        }
      })
      .addCase(generateLoanApplicationReport.pending, (state, action) => {
        if (state.loadingGeneratePdf === 'IDLE') {
          state.loadingGeneratePdf = HTTP_STATUS.PENDING
          state.currentRequestIdGeneratePdf = action.meta.requestId
        }
      })
      .addCase(generateLoanApplicationReport.fulfilled, (state, action) => {
        const { requestId } = action.meta

        // console.log('PDF FULFILLED META: ', action.meta)
        // console.log('PDF FULFILLED PAYLOAD: ', action.payload)
        // console.log('PDF FULFILLED TYPE: ', action.type)

        if (state.loadingGeneratePdf === 'PENDING' && state.currentRequestIdGeneratePdf === requestId) {
          state.loadingGeneratePdf = HTTP_STATUS.IDLE
          state.currentRequestIdGeneratePdf = null
        }

        if (action.payload?.body?.errors?.length > 0) {
          state.errorGeneratePdf = action.payload?.body?.errors
        }
        if (action.payload?.errorMessage !== '') {
          state.serverErrorGeneratePdf = action.payload?.stackTrace
        }
      })
      .addCase(generateLoanApplicationReport.rejected, (state, action) => {
        const { requestId } = action.meta
        if (action.payload) {
          state.errorGeneratePdf = action.payload?.errorMessage
        } else {
          state.errorGeneratePdf = action.error?.message
        }
        if (state.loadingGeneratePdf === 'PENDING' && state.currentRequestIdGeneratePdf === requestId) {
          state.loadingGeneratePdf = 'IDLE'
          state.errorGeneratePdf = action.error
          state.currentRequestIdGeneratePdf = null
        }
      })

      .addCase(onlineAppAuth.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(onlineAppAuth.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.onlinetoken = action?.payload?.token
          state.loading = HTTP_STATUS.IDLE
          state.currentRequestId = null
        }

        if (action.payload?.body?.errors?.length > 0) {
          state.error = action.payload?.body?.errors
        }
        if (action.payload?.errorMessage !== '') {
          state.serverError = action.payload?.stackTrace
        }
      })
      .addCase(onlineAppAuth.rejected, (state, action) => {
        const { requestId } = action.meta
        if (action.payload) {
          state.error = action.payload?.errorMessage
        } else {
          state.error = action.error?.message
        }
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null
        }
      })

    // .addCase(sendCipherText.pending, (state, action) => {
    //   if (state.loadingCipherText === 'IDLE') {
    //     state.loadingCipherText = HTTP_STATUS.PENDING
    //     state.currentRequestIdCipherText = action.meta.requestId
    //   }
    // })
    // .addCase(sendCipherText.fulfilled, (state, action) => {
    //   const { requestId } = action.meta
    //   if (state.loadingCipherText === 'PENDING' && state.currentRequestIdCipherText === requestId) {
    //     state.loadingCipherText = HTTP_STATUS.IDLE
    //     state.currentRequestIdCipherText = null
    //   }
    // })
    // .addCase(sendCipherText.rejected, (state, action) => {
    //   const { requestId } = action.meta
    //   if (action.payload) {
    //     state.errorCipherText = action.payload?.errorMessage
    //   } else {
    //     state.errorCipherText = action.error?.message
    //   }
    //   if (state.loadingCipherText === 'PENDING' && state.currentRequestIdCipherText === requestId) {
    //     state.loadingCipherText = 'IDLE'
    //     state.errorCipherText = action.error
    //     state.currentRequestIdCipherText = null
    //   }
    // })
  },
})

export const submissionActions = submissionSlice.actions
export default submissionSlice
