import { createSlice } from '@reduxjs/toolkit'

const namespace = 'testValidation'

export const initialState = {
  name: '',
}

const testValidationSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
  },
})

export const testValidationActions = testValidationSlice.actions
export default testValidationSlice
