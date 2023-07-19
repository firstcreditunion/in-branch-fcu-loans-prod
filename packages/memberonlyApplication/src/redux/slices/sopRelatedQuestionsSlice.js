import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'sopRelatedQuestionSlice'

export const initialState = {
  loading: HTTP_STATUS.IDLE,
  error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  isIncomeExpensetestComplete: '',

  incomeOverEstimatedComment: '',
  expenseUnderEstimatedComment: '',
  otherExpenses: '',

  canPayWithoutSufferingHardship: '',

  onSubmitResponsibleLending: null,
  isValidResponsibleLending: null,
}

const sopRelatedQuestionSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    clearAffordabilityTest: (state, action) => {
      state.isIncomeExpensetestComplete = ''
      state.incomeOverEstimatedComment = ''
      state.expenseUnderEstimatedComment = ''
      state.otherExpenses = ''
      state.canPayWithoutSufferingHardship = ''
    },

    setIsIncomeExpensetestComplete: (state, action) => {
      state.isIncomeExpensetestComplete = action.payload
    },

    setIncomeOverEstimatedComment: (state, action) => {
      state.incomeOverEstimatedComment = action.payload
    },
    setExpenseUnderEstimatedComment: (state, action) => {
      state.expenseUnderEstimatedComment = action.payload
    },
    setOtherExpenses: (state, action) => {
      state.otherExpenses = action.payload
    },

    setCanPayWithoutSufferingHardship: (state, action) => {
      state.canPayWithoutSufferingHardship = action.payload
    },

    setOnSubmitResponsibleLending: (state, action) => {
      state.onSubmitResponsibleLending = action.payload
    },
    setIsValidResponsibleLending: (state, action) => {
      state.isValidResponsibleLending = action.payload
    },
  },
})

export const sopRelatedQuestionActions = sopRelatedQuestionSlice.actions
export default sopRelatedQuestionSlice
