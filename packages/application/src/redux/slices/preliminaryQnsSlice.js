import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'preliminaryqns'

export const getSupportedBanks = createAsyncThunk(`${namespace}/getSupportedBanks`, async (supportedBanksConfig) => {
  return await axios(supportedBanksConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
})

export const initialState = {
  loading: HTTP_STATUS.IDLE,
  currentRequestId: null,
  error: null,

  isAdult: null,
}

const preliminaryQnsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setIsAdult: (state, action) => {
      state.isAdult = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSupportedBanks.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(getSupportedBanks.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = HTTP_STATUS.IDLE
          state.currentRequestId = null
        }
      })
      .addCase(getSupportedBanks.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null
        }
      })
  },
})

export const preliminaryQnsAction = preliminaryQnsSlice.actions
export default preliminaryQnsSlice
