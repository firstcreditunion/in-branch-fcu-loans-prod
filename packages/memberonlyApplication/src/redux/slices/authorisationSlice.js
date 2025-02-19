import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'authorisationSlice'

export const initialState = {
  Loading: HTTP_STATUS.IDLE,
  Error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  declarationItems: {
    CreditWorthiness: {
      index: 0,
      title: { key: 'CRAS', value: 'Credit Worthiness' },
      header: 'I understand that the information will be used to assess My/Our credit worthiness and financial position, to process my application',
      children: [],
      openChildren: false,
      accept: false,
    },
    AuthoriseFCU: {
      index: 1,
      title: { key: 'AUFC', value: 'Authorise First Credit Union' },
      header: 'By Signing this application, I authorise First Credit Union Incorporated to:',
      children: ['Make enquiries about me and disclose and obtain any additional information with LTSA,', 'Disclose my personal information (including payment default information) to potential or actual assignees, to insurers and other third parties that may have or may intend to take security over any of my assets, to credit rating and credit reporting agencies and any other person that First Credit Union may appoint to collect any outstanding debt from me.'],
      openChildren: true,
      accept: false,
    },
    TrueInformation: {
      index: 2,
      title: { key: 'TRIF', value: 'True Information' },
      header: ' I declare the information I have provided in this application is true and correct.',
      children: [],
      openChildren: false,
      accept: false,
    },
    AmlCftObligations: {
      index: 3,
      title: { key: 'AML', value: 'AML/CFT Obligations' },
      header: 'I understand that for First Credit Union Incorporated to comply with AML/CFT obligations:',
      children: ['I agree to our identification, Full Name, Address and Date of Birth to be verified through a third party such as Verify ID.'],
      openChildren: true,
      accept: false,
    },
    StorePersonalInfo: {
      index: 4,
      title: { key: 'STPI', value: 'Storage of Personal Information' },
      header: 'I understand that First Credit Union Incorporated will meet its privacy obligations in the collection, use and storage of all my personal information.',
      children: [],
      openChildren: false,
      accept: false,
    },
  },

  onSubmitPrivacyActDeclaration: null,
  isValidPrivacyActDeclaration: null,
}

const authorisationSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    // Form Submission setters
    clearAll: (state, action) => {
      state.Loading = HTTP_STATUS.IDLE
      state.Error = HTTP_STATUS.IDLE
      state.currentRequestId = null

      state.declarationItems.CreditWorthiness.accept = false
      state.declarationItems.AuthoriseFCU.accept = false
      state.declarationItems.TrueInformation.accept = false
      state.declarationItems.AmlCftObligations.accept = false
      state.declarationItems.StorePersonalInfo.accept = false

      state.onSubmitPrivacyActDeclaration = null
      state.isValidPrivacyActDeclaration = null
    },
    setOnSubmitPrivacyActDeclaration: (state, action) => {
      state.onSubmitPrivacyActDeclaration = action.payload
    },
    setIsValidPrivacyActDeclaration: (state, action) => {
      state.isValidPrivacyActDeclaration = action.payload
    },
    clearPrivacyDeclaration: (state, action) => {
      state.declarationItems.CreditWorthiness.accept = action.payload
      state.declarationItems.AuthoriseFCU.accept = action.payload
      state.declarationItems.TrueInformation.accept = action.payload
      state.declarationItems.AmlCftObligations.accept = action.payload
      state.declarationItems.StorePersonalInfo.accept = action.payload
    },

    // Declaration setters
    setAcceptCreditWorthiness: (state, action) => {
      state.declarationItems.CreditWorthiness.accept = action.payload
    },
    setAcceptAuthoriseFCU: (state, action) => {
      state.declarationItems.AuthoriseFCU.accept = action.payload
    },
    setAcceptTrueInformation: (state, action) => {
      state.declarationItems.TrueInformation.accept = action.payload
    },
    setAcceptAmlCftObligations: (state, action) => {
      state.declarationItems.AmlCftObligations.accept = action.payload
    },
    setAcceptStorePersonalInfo: (state, action) => {
      state.declarationItems.StorePersonalInfo.accept = action.payload
    },

    // Setters to show or hide children
    setOpenChildrenCreditWorthiness: (state, action) => {
      state.declarationItems.CreditWorthiness.openChildren = action.payload
    },
    setOpenChildrenAuthoriseFCU: (state, action) => {
      state.declarationItems.AuthoriseFCU.openChildren = action.payload
    },
    setOpenChildrenTrueInformation: (state, action) => {
      state.declarationItems.TrueInformation.openChildren = action.payload
    },
    setOpenChildrenAmlCftObligations: (state, action) => {
      state.declarationItems.AmlCftObligations.openChildren = action.payload
    },
    setOpenChildrenStorePersonalInfo: (state, action) => {
      state.declarationItems.StorePersonalInfo.openChildren = action.payload
    },
  },
})

export const authorisationActions = authorisationSlice.actions
export default authorisationSlice
