import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'sopItemsSlice'

export const getSopSummary = createAsyncThunk(`${namespace}/getSopSummary`, async (sopConfig) => {
  return await axios(sopConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const initialState = {
  loading: HTTP_STATUS.IDLE,
  error: HTTP_STATUS.IDLE,
  currentRequestId: null,
  // Each amount is for a different frequecy

  sopAssets: [],
  sopLiability: [],
  sopIncome: [],
  sopExpense: [],

  actualLivingExpense: null,
  actualMonthlyCommitments: null,
  benchmarkableCCCFAExpense: null,
  monthlyExpense: null,
  monthlyIncome: null,
  surplusRatio: null,
  nsr: null,
  nsrLower: null,
  nsrUpper: null,
  netAssets: null,
  totalAssets: null,
  totalLiabilities: null,
  liabilityServicing: null,
  monthlySurplus: null,
}

const sopItemsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    //Wages
    setSopAssets: (state, action) => {
      state.sopAssets = action.payload
    },
    setSopLiability: (state, action) => {
      state.sopLiability = action.payload
    },
    setSopIncome: (state, action) => {
      state.sopIncome = action.payload
    },
    setSopExpense: (state, action) => {
      state.sopExpense = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSopSummary.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(getSopSummary.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = HTTP_STATUS.IDLE

          // console.log('PQLC RESPONSE: ', action.payload)

          const pqlcResult = action.payload?.axiosResponse?.result
          const pqlcRequest = action.payload?.axiosResponse?.request

          state.actualLivingExpense = pqlcResult?.actualLivingExpense
          state.actualMonthlyCommitments = pqlcResult?.actualMonthlyCommitments
          state.benchmarkableCCCFAExpense = pqlcResult?.estimatedExpense
          state.monthlyExpense = pqlcResult?.monthlyExpense
          state.monthlyIncome = pqlcResult?.monthlyIncome
          state.surplusRatio = parseFloat(pqlcResult?.SR)

          // console.log('pqlcResult?.SR: ', pqlcResult?.SR)

          state.nsr = pqlcResult?.NSR
          state.nsrLower = pqlcResult?.NSR_lower
          state.nsrUpper = pqlcResult?.NSR_upper
          state.netAssets = pqlcResult?.netAssets
          state.totalAssets = pqlcResult?.totalAssets
          state.totalLiabilities = pqlcResult?.totalLiabilities
          state.monthlySurplus = pqlcResult?.monthlySurplus

          //* Liability Servicing
          //? Find Liability Servicing
          // const liabilityServicingFound = pqlcRequest?.expense?.find((expense) => {
          //   console.log('EXPENSE LSERV: ', expense)
          //   return expense?.type === 'LSERV'
          // })

          // console.log('liabilityServicingFound: ', liabilityServicingFound)

          //? Set Liability Servicing
          // state.liabilityServicing = liabilityServicingFound?.amount3
        }
      })
      .addCase(getSopSummary.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null

          // console.log('Rejected Error: ', action.error)
          // console.log('Rejected Payload: ', action.payload)
          // console.log('Rejected meta: ', action.meta)
          // console.log('Rejected Type: ', action.type)
        }
      })
  },
})

export const sopItemsActions = sopItemsSlice.actions
export default sopItemsSlice
