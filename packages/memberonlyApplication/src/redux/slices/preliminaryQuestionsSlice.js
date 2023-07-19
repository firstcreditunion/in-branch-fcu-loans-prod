import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'preliminaryquestions'

export const initialState = {
  Loading: HTTP_STATUS.IDLE,
  Error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  isJointLoan: null,
  jointApplicantHasSeperateIncome: null,
  loanPurpose: null,

  loanPurpose: null,

  onSubmitPrelimQuestions: null,
  isValidPrelimQuestions: null,
}

const preliminaryQuestionsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    // Prelim Questions
    setIsJointLoan: (state, action) => {
      state.isJointLoan = action.payload
    },
    setJointApplicantHasSeperateIncome: (state, action) => {
      state.jointApplicantHasSeperateIncome = action.payload
    },
    setLoanPurpose: (state, action) => {
      state.loanPurpose = action.payload
    },

    // Submit Preliminary Questions
    setOnSubmitPrelimQuestions: (state, action) => {
      state.onSubmitPrelimQuestions = action.payload
    },
    setIsValidPrelimQuestions: (state, action) => {
      state.isValidPrelimQuestions = action.payload
    },
  },
})

export const preliminaryQuestionsActions = preliminaryQuestionsSlice.actions
export default preliminaryQuestionsSlice
