import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { format } from 'date-fns'

import { BASE_URL_LOCAL_APP, BASE_URL_AWS_APP, processNodeEnv, HTTP_STATUS } from '../utils/apiConstants'

import axios from 'axios'

const defDate = new Date(new Date().setFullYear(new Date().getFullYear() - 18))

const namespace = 'yourPersonalDetails'

export const fecthMartialStatus = createAsyncThunk(`${namespace}/fecthMartialStatus`, async () => {
  const { data } = await axios.get(`${processNodeEnv() === 'development' ? BASE_URL_LOCAL_APP : BASE_URL_AWS_APP}/loanpurposecodes`)
  return data
})

export const initialState = {
  // Prime Borrower
  title: '',
  preferredTitle: '',
  forenames: '',
  lastName: '',
  otherNames: '',
  gender: '',
  dobDefDate: defDate,
  dob: null,
  maritalStatus: '',
  errorTitle: false,
  showOtherTitleField: false,
  dependents: 0,

  // Co-Borrower
  jointtitle: '',
  jointpreferredTitle: '',
  jointforenames: '',
  jointlastName: '',
  jointotherNames: '',
  jointgender: '',
  jointdobDefDate: defDate,
  jointdob: null,
  jointmaritalStatus: null,
  jointerrorTitle: false,
  jointshowOtherTitleField: false,
  jointdependents: 0,

  loading: null,
  data: null,

  onSubmitYourPersonalDetails: null,
  isValidYourPersonalDetails: null,

  onSubmitJointPersonalDetails: null,
  isValidJointPersonalDetails: null,

  validSovereignPersonalDetailsTitle: true,
  validSovereignPersonalDetailsForenames: true,
  validSovereignPersonalDetailsSurname: true,
  validSovereignPersonalDetailsGender: true,
  validSovereignPersonalDetailsDob: true,
  validSovereignPersonalDetailsMaritalStatus: true,

  validSovereignPersonalDetails: null,
  verifiedPersonalDetailsSecure: false,
}

const yourPersonalDetailsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    // Prime Borrower Details
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setPreferredTitle: (state, action) => {
      state.preferredTitle = action.payload
    },
    setForenames: (state, action) => {
      state.forenames = action.payload
    },
    setLastName: (state, action) => {
      state.lastName = action.payload
    },
    setOtherNames: (state, action) => {
      state.otherNames = action.payload
    },
    setGender: (state, action) => {
      state.gender = action.payload
    },
    setDob: (state, action) => {
      console.log('action.payload Date:', action.payload)
      state.dob = action.payload
    },
    setMaritalStatus: (state, action) => {
      state.maritalStatus = action.payload
    },
    setDependents: (state, action) => {
      state.dependents = action.payload
    },

    // Co-Borrower Details
    setJointTitle: (state, action) => {
      state.jointtitle = action.payload
    },
    setJointPreferredTitle: (state, action) => {
      state.jointpreferredTitle = action.payload
    },
    setJointForenames: (state, action) => {
      state.jointforenames = action.payload
    },
    setJointLastName: (state, action) => {
      state.jointlastName = action.payload
    },
    setJointOtherNames: (state, action) => {
      state.jointotherNames = action.payload
    },
    setJointGender: (state, action) => {
      state.jointgender = action.payload
    },
    setJointDob: (state, action) => {
      state.jointdob = action.payload
    },
    setJointMaritalStatus: (state, action) => {
      state.jointmaritalStatus = action.payload
    },
    setJointDependents: (state, action) => {
      state.jointdependents = action.payload
    },

    setOnSubmitYourPersonalDetails: (state, action) => {
      state.onSubmitYourPersonalDetails = action.payload
    },
    setIsValidYourPersonalDetails: (state, action) => {
      state.isValidYourPersonalDetails = action.payload
    },

    setOnSubmitJointPersonalDetails: (state, action) => {
      state.onSubmitJointPersonalDetails = action.payload
    },
    setIsValidJointPersonalDetails: (state, action) => {
      state.isValidJointPersonalDetails = action.payload
    },

    toggleOtherTitle(state, action) {
      state.tempTitle = action.payload
      if (state.tempTitle === 'Other') {
        state.showOtherTitleField = true
      } else {
        state.showOtherTitleField = false
      }
    },

    toggleJointOtherTitle(state, action) {
      state.tempJointTitle = action.payload
      if (state.tempJointTitle === 'Other') {
        state.jointshowOtherTitleField = true
      } else {
        state.jointshowOtherTitleField = false
      }
    },

    setValidSovereignPersonalDetailsTitle: (state, action) => {
      state.validSovereignPersonalDetailsTitle = action.payload
    },
    setValidSovereignPersonalDetailsForeNames: (state, action) => {
      state.validSovereignPersonalDetailsForenames = action.payload
    },
    setValidSovereignPersonalDetailsSurname: (state, action) => {
      state.validSovereignPersonalDetailsSurname = action.payload
    },
    setValidSovereignPersonalDetailsGender: (state, action) => {
      state.validSovereignPersonalDetailsGender = action.payload
    },
    setValidSovereignPersonalDetailsDob: (state, action) => {
      state.validSovereignPersonalDetailsDob = action.payload
    },
    setValidSovereignPersonalDetailsMaritalStatus: (state, action) => {
      state.validSovereignPersonalDetailsMaritalStatus = action.payload
    },

    setValidSovereignPersonalDetails: (state, action) => {
      state.validSovereignPersonalDetails = action.payload
    },
    setVerifiedPersonalDetailsSecure: (state, action) => {
      state.verifiedPersonalDetailsSecure = action.payload
    },
  },
  extraReducers: {
    [fecthMartialStatus.pending](state) {
      state.loading = HTTP_STATUS.PENDING
    },
    [fecthMartialStatus.fulfilled](state, { payload }) {
      state.loading = HTTP_STATUS.FULFILLED
      state.maritalStatus = payload.body
    },
    [fecthMartialStatus.rejected](state) {
      state.loading = HTTP_STATUS.REJECTED
    },
  },
})

export const yourPersonalDetailsActions = yourPersonalDetailsSlice.actions
export default yourPersonalDetailsSlice
