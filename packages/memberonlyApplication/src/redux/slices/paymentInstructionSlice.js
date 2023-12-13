import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'paymentInstruction'

export const initialState = {
  loading: HTTP_STATUS.IDLE,
  error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  backAccountForInstalmentDebit: null,

  onSubmitPaymentInstruction: null,
  isValidPaymentInstruction: null,
}

const paymentInstructionSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    clearAll: (state, action) => {
      state.loading = HTTP_STATUS.IDLE
      state.error = HTTP_STATUS.IDLE
      state.currentRequestId = null

      state.backAccountForInstalmentDebit = null

      state.onSubmitPaymentInstruction = null
      state.isValidPaymentInstruction = null
    },
    setBackAccountForInstalmentDebit: (state, action) => {
      // console.log('Chosen Bank Account - ', action.payload)
      state.backAccountForInstalmentDebit = action.payload
    },
    setOnSubmitPaymentInstruction: (state, action) => {
      state.onSubmitPaymentInstruction = action.payload
    },
    setIsValidPaymentInstruction: (state, action) => {
      state.isValidPaymentInstruction = action.payload
    },
  },
})

export const paymentInstructionActions = paymentInstructionSlice.actions
export default paymentInstructionSlice
