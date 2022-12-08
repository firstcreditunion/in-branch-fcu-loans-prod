import { configureStore } from '@reduxjs/toolkit'

import globalSlice from './slices/globalSlice'
import preliminaryQnsSlice from './slices/preliminaryQnsSlice'
import lendingCritetiaQnsSlice from './slices/lendingCriteriaQnsSlice'
import yourPersonalDetailsSlice from './slices/yourPersonalDetailsSlice'
import identificationSlice from './slices/identificationSlice'
import employmentSlice from './slices/employmentSlice'
import contactDetailsSlice from './slices/contactDetailsSlice'
import vehicleSecuritySlice from './slices/vehicleSecuritySlice'
import financialDetailsSlice from './slices/financialDetailsSlice'
import sopIncomeExpenditureSlice from './slices/sopIncomeExpenditureSlice'
import sopAssetsLiabilitiesSlice from './slices/sopAssetsLiabilitiesSlice'
import privacyActDeclarationSlice from './slices/privacyActDeclarationSlice'
import submissionSlice from './slices/submissionSlice'
import bankStatementSlice from './slices/bankStatementSlice'

const store = configureStore({
  reducer: {
    globalReducer: globalSlice.reducer,
    preliminaryQnsReducer: preliminaryQnsSlice.reducer,
    lendingCritetiaQnsReducer: lendingCritetiaQnsSlice.reducer,
    yourPersonalDetailReducer: yourPersonalDetailsSlice.reducer,
    identificationReducer: identificationSlice.reducer,
    employmentReducer: employmentSlice.reducer,
    conatctDetailsReducer: contactDetailsSlice.reducer,
    vehicleSecurityReducer: vehicleSecuritySlice.reducer,
    financialDetailsReducer: financialDetailsSlice.reducer,
    sopAssetLiabilityReducer: sopAssetsLiabilitiesSlice.reducer,
    sopIncomeExpenditureReducer: sopIncomeExpenditureSlice.reducer,
    privacyDeclarationReducer: privacyActDeclarationSlice.reducer,
    submissionReducer: submissionSlice.reducer,
    bankStatementReducer: bankStatementSlice.reducer,
  },
})

export default store
