import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'GlobalControl'

export const initialState = {
  Loading: HTTP_STATUS.IDLE,
  Error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  skipRootNode: false,
  onMount: true,
  themeMode: 'light',

  isMemberEligible: true,

  cognitoToken: null,
  sovereignUser: null,

  returnToHome: null,
}

const globalSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    clearAll: (state, action) => {
      state.Loading = HTTP_STATUS.IDLE
      state.Error = HTTP_STATUS.IDLE
      state.currentRequestId = null

      state.skipRootNode = false
      state.onMount = true

      state.isMemberEligible = true
    },
    setReturnToHome: (state, action) => {
      state.returnToHome = action.payload
    },
    setIsMemberEligible: (state, action) => {
      state.isMemberEligible = action.payload
    },
    setCognitoToken: (state, action) => {
      state.cognitoToken = action.payload
    },
    setSovereignUser: (state, action) => {
      state.sovereignUser = action.payload
    },
  },
})

export const globalActions = globalSlice.actions
export default globalSlice

