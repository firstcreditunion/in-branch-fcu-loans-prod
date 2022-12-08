import { createSlice } from '@reduxjs/toolkit'

const namespace = 'privacyactdeclaration'

export const initialState = {
  declarationItems: {
    CreditAssesment: {
      index: 0,
      title: { key: 'CRAS', value: 'Credit Assessment' },
      header: 'The information will be used to assess my/our credit worthiness and financial position, to process my/our application.',
      children: [],
      openChildren: false,
      accept: false,
    },
    AuthoriseFCU: {
      index: 1,
      title: { key: 'AUFC', value: 'Authorise First Credit Union' },
      header: 'By electronically submitting this application, I/we authorise First Credit Union to:',
      children: ['Make enquiries about me/us and disclose and obtain any additional information First Credit Union considers necessary, including checking driver licence/s information with NTZA,', 'Disclose my/our personal information (including payment default information) to potential or actual assignees, to insurers and other third parties that may have or may intend to take security over any of my/our assets, to credit rating and credit reporting agencies and any other person that First Credit Union may appoint to collect any oustanding debt from me/us.'],
      openChildren: true,
      accept: false,
    },
    TrueInformation: {
      index: 2,
      title: { key: 'TRIF', value: 'True Information' },
      header: ' The information I/we have provided in this application is true and correct and not misleading in any way.',
      children: [],
      openChildren: false,
      accept: false,
    },
    AmlCftObligations: {
      index: 3,
      title: { key: 'AML', value: 'AML/CFT Obligations' },
      header: 'For First Credit Union to comply with its AML/CFT obligations:',
      children: ['I/we agree to my/our identification, including full name, address and date of birth to be verified through third parties e.g. CloudCheck Verify.'],
      openChildren: true,
      accept: false,
    },
    StorePersonalInfo: {
      index: 4,
      title: { key: 'STPI', value: 'Storage of Personal Information' },
      header: 'First Credit Union will meet its Privacy obligations in the collection, use and storage of all my/our personal information.',
      children: [],
      openChildren: false,
      accept: false,
    },
  },

  onSubmitPrivacyActDeclaration: null,
  isValidPrivacyActDeclaration: null,
}

const privacyActDeclarationSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    // Form Submission setters
    setOnSubmitPrivacyActDeclaration: (state, action) => {
      state.onSubmitPrivacyActDeclaration = action.payload
    },
    setIsValidPrivacyActDeclaration: (state, action) => {
      state.isValidPrivacyActDeclaration = action.payload
    },

    // Declaration setters
    setAcceptCreditAssesment: (state, action) => {
      state.declarationItems.CreditAssesment.accept = action.payload
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
    setOpenChildrenCreditAssesment: (state, action) => {
      state.declarationItems.CreditAssesment.openChildren = action.payload
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

export const privacyActDeclarationActions = privacyActDeclarationSlice.actions
export default privacyActDeclarationSlice
