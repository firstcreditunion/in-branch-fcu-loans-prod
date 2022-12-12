import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'attachment'

const options = {
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
}

export const initialState = {
  acceptedFiles: [],
  fileRejections: [],

  iFrameLoaded: false,

  onSubmitBankStatement: true,
  isValidBankStatement: true,

  creditSenseAppRef: null,
  creditSenseAppID: null,
  creditSenseResponseCode: null,
}

const bankStatementSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setCreditSenseAppRef: (state, action) => {
      state.creditSenseAppRef = action.payload
    },
    setCreditSenseAppID: (state, action) => {
      state.creditSenseAppID = action.payload
    },
    setCreditSenseResponseCode: (state, action) => {
      state.creditSenseResponseCode = action.payload
    },
    setBankStatement: (state, action) => {
      state.data = action.payload
    },
    setAcceptedFiles: (state, action) => {
      state.acceptedFiles = action.payload
    },
    setFileRejections: (state, action) => {
      state.fileRejections = action.payload
    },
    setIFrameLoaded: (state, action) => {
      state.iFrameLoaded = action.payload
    },
    setOnSubmitBankStatements: (state, action) => {
      state.onSubmitBankStatement = action.payload
    },
    setIsValidBankStatements: (state, action) => {
      state.isValidBankStatement = action.payload
    },
  },
})

export const bankStatementActions = bankStatementSlice.actions
export default bankStatementSlice
