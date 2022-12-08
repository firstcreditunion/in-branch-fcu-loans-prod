import { configureStore } from '@reduxjs/toolkit'

import loanCalculatorSlice from './slices/loanCalculatorSlice'

const store = configureStore({
  reducer: {
    loanCalculatorReducer: loanCalculatorSlice.reducer,
  },
})

export default store
