import { createSlice } from '@reduxjs/toolkit'

const namespace = 'identificationSlice'

export const initialState = {
  // Each amount is for a different frequecy

  mostRecentIdentifications: [],

  onSubmitIdentificationDetails: null,
  isValidIdentificationDetails: null,
}

const identificationSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    //Wages
    clearAll: (state, action) => {
      state.mostRecentIdentifications = []

      state.onSubmitIdentificationDetails = null
      state.isValidIdentificationDetails = null
    },
    setMostRecentIdentifications: (state, action) => {
      state.mostRecentIdentifications = action.payload
    },

    setOnSubmitIdentificationDetails: (state, action) => {
      state.onSubmitIdentificationDetails = action.payload
    },
    setIsValidIdentificationDetails: (state, action) => {
      state.isValidIdentificationDetails = action.payload
    },
  },
})

export const identificationActions = identificationSlice.actions
export default identificationSlice
