import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/globalSlice'
import clientSearchSlice from './slices/clientSearchSlice'
import loanDetailsSlice from './slices/loanDetailsSlice'
import loanCalculatorSlice from './slices/loanCalculatorSlice'
import creditScoreSlice from './slices/creditScoreSlice'
import additionalInfoPart2Slice from './slices/additionalInfoPart2Slice'
import verifyPrimeDetailsSlice from './slices/verifyPrimeDetailsSlice'
import identificationSlice from './slices/identificationSlice'

import sopAssetsSlice from './slices/sopAssetsSlice'
import sopLiabilitiesSlice from './slices/sopLiabilitiesSlice'
import sopIncomeDataGridSlice from './slices/sopIncomeSlice'
import sopExpenseSlice from './slices/sopExpenseSlice'
import sopItemsSlice from './slices/sopItemsSlice'

import sopRelatedQuestionsSlice from './slices/sopRelatedQuestionsSlice'
import authorisationSlice from './slices/authorisationSlice'
import submissionSlice from './slices/submissionSlice'

//* Setting up reducers
const store = configureStore({
  reducer: {
    globalReducer: globalSlice.reducer,
    clientSearchReducer: clientSearchSlice.reducer,
    loanDetailsReducer: loanDetailsSlice.reducer,
    loanCalculatorReducer: loanCalculatorSlice.reducer,
    creditScoreReducer: creditScoreSlice.reducer,
    additionalInfoPart2Reducer: additionalInfoPart2Slice.reducer,
    verifyPrimeDetailsReducer: verifyPrimeDetailsSlice.reducer,
    identificationReducer: identificationSlice.reducer,
    sopAssetsReducer: sopAssetsSlice.reducer,
    sopLiabilitiesReducer: sopLiabilitiesSlice.reducer,
    sopIncomeDataGridReducer: sopIncomeDataGridSlice.reducer,
    sopExpenseReducer: sopExpenseSlice.reducer,
    sopItemsReducer: sopItemsSlice.reducer,
    sopRelatedQuestionsReducer: sopRelatedQuestionsSlice.reducer,
    authorisationReducer: authorisationSlice.reducer,
    submissionReducer: submissionSlice.reducer,
  },
})

export default store
