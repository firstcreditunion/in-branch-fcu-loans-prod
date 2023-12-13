import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'creditScore'

export const initialState = {
  Loading: HTTP_STATUS.IDLE,
  Error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  creditScoreThreshold: 300,

  isCreditScoreComplete: '',
  isScoreExceedsThreshold: '',
  hasUnpaidDefualtCollections: '',
  detailsUnpaidDefualt: '',

  isMemberUnderHardship: '',
  hasMemberBeenBankrupt: '',
  isMemberInArrearsWithFCU: '',

  creditBeingSought: '',
  termForCreditBeingSought: '',

  onSubmitCreditScoreDetails: null,
  isValidCreditScoreDetails: null,
}

const creditScoreSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    clearAll: (state, action) => {
      state.Loading = HTTP_STATUS.IDLE
      state.Error = HTTP_STATUS.IDLE
      state.currentRequestId = null

      state.creditScoreThreshold = 300

      state.isCreditScoreComplete = ''
      state.isScoreExceedsThreshold = ''
      state.hasUnpaidDefualtCollections = ''
      state.detailsUnpaidDefualt = ''

      state.isMemberUnderHardship = ''
      state.hasMemberBeenBankrupt = ''
      state.isMemberInArrearsWithFCU = ''

      state.creditBeingSought = ''
      state.termForCreditBeingSought = ''

      state.onSubmitCreditScoreDetails = null
      state.isValidCreditScoreDetails = null
    },
    setIsCreditScoreComplete: (state, action) => {
      state.isCreditScoreComplete = action.payload
    },
    setCreditScoreExceedsThreshold: (state, action) => {
      state.isScoreExceedsThreshold = action.payload
    },
    setHasUnpaidDefaultCollections: (state, action) => {
      state.hasUnpaidDefualtCollections = action.payload
    },
    setDetailsUnpaidDefault: (state, action) => {
      state.detailsUnpaidDefualt = action.payload
    },
    clearSustainabilityPart1Details: (state, action) => {
      state.isCreditScoreComplete = ''
      state.isScoreExceedsThreshold = ''
      state.hasUnpaidDefualtCollections = ''
      state.detailsUnpaidDefualt = ''
      state.isMemberUnderHardship = ''
      state.hasMemberBeenBankrupt = ''
      state.isMemberInArrearsWithFCU = ''
      state.creditBeingSought = ''
      state.termForCreditBeingSought = ''
    },

    setIsMemberUnderHardship: (state, action) => {
      state.isMemberUnderHardship = action.payload
    },
    setHasMemberBeenBankrupt: (state, action) => {
      state.hasMemberBeenBankrupt = action.payload
    },
    setIsMemberInArrearsWithFCU: (state, action) => {
      state.isMemberInArrearsWithFCU = action.payload
    },
    setCreditBeingSought: (state, action) => {
      state.creditBeingSought = action.payload
    },
    setTermForCreditBeingSought: (state, action) => {
      state.termForCreditBeingSought = action.payload
    },

    setOnSubmitCreditScoreDetails: (state, action) => {
      state.onSubmitCreditScoreDetails = action.payload
    },
    setIsValidCreditScoreDetails: (state, action) => {
      state.isValidCreditScoreDetails = action.payload
    },
  },
})

export const creditScoreActions = creditScoreSlice.actions
export default creditScoreSlice
