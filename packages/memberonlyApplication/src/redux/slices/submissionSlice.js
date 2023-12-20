import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'
import axios from 'axios'

const namespace = 'submissionSlice'

export const submitLoanApplication = createAsyncThunk(`${namespace}/submitLoanApplication`, async (submitConfig) => {
  return await axios(submitConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const generateLoanApplicationReport = createAsyncThunk(`${namespace}/generateLoanApplicationReport`, async (pdfConfig) => {
  return await axios(pdfConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const initialState = {

  submissionStatusCode: null,
  submissionFulfilled: null,

  loading: HTTP_STATUS.IDLE,
  error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  pdfloading: HTTP_STATUS.IDLE,
  pdferror: HTTP_STATUS.IDLE,
  pdfcurrentRequestId: null,

  applicationNumber: null,
  serverError: null,

  skipRootNode: false,
  onMount: true,
  themeMode: 'light',
}

const submissionSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    clearAll: (state, action) => {
      state.submissionStatusCode = null
      state.submissionFulfilled = null

      state.loading = HTTP_STATUS.IDLE
      state.error = HTTP_STATUS.IDLE
      state.currentRequestId = null

      state.pdfloading = HTTP_STATUS.IDLE
      state.pdferror = HTTP_STATUS.IDLE
      state.pdfcurrentRequestId = null

      state.applicationNumber = null
      state.serverError = null

      state.skipRootNode = false
      state.onMount = true
    },

  },
  extraReducers: (builder) => {
    builder // Submission builders
      .addCase(submitLoanApplication.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(submitLoanApplication.fulfilled, (state, action) => {
        const { requestId } = action.meta

        state.submissionFulfilled = true

        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = HTTP_STATUS.IDLE
          const axiosResponseErrors = action.payload?.axiosResponse?.errors
          const submissionAttributes = action.payload?.axiosResponse?.body?.data?.attributes

          state.applicationNumber = submissionAttributes?.applicationRef
          state.serverError = axiosResponseErrors
        }
      })
      .addCase(submitLoanApplication.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null
        }
      })

      // Pdf builder cases
      .addCase(generateLoanApplicationReport.pending, (state, action) => {
        if (state.pdfloading === 'IDLE') {
          state.pdfloading = HTTP_STATUS.PENDING
          state.pdfcurrentRequestId = action.meta.requestId
        }
      })
      .addCase(generateLoanApplicationReport.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.pdfloading = HTTP_STATUS.IDLE
        }
      })
      .addCase(generateLoanApplicationReport.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.pdfloading === 'PENDING' && state.pdfcurrentRequestId === requestId) {
          state.pdfloading = 'IDLE'
          state.pdferror = action.error
          state.pdfcurrentRequestId = null

        }
      })
  },
})

export const submissionActions = submissionSlice.actions
export default submissionSlice
