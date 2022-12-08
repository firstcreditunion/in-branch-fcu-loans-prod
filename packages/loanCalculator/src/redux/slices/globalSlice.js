import { createSlice } from '@reduxjs/toolkit'

const namespace = 'GlobalStates'

export const initialState = {
  themeMode: 'light',
}

const globalSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload
    },
  },
})

export const globalActions = globalSlice.actions
export default globalSlice
