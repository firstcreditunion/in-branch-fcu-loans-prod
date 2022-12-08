import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import employmentTypesAPI from '../utils/employmentTypesAPI'

import { HTTP_STATUS } from '../utils/apiConstants'
import { concat } from 'lodash'

const defEffectiveDate = new Date()

const namespace = 'EmploymentDetails'

export const getAddresses = createAsyncThunk(`${namespace}/getaddresses`, async (addressfinderconfig) => {
  return await axios(addressfinderconfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
})

export const getAddressMetaData = createAsyncThunk(`${namespace}/getaddressmetadata`, async (addressMetaConfig) => {
  return await axios(addressMetaConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
})

export const getAddressesPrevEmp = createAsyncThunk(`${namespace}/getaddressesPrevEmp`, async (addressfinderconfig) => {
  return await axios(addressfinderconfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
})

export const getAddressMetaDataPrevEmp = createAsyncThunk(`${namespace}/getaddressmetadataPrevEmp`, async (addressMetaConfig) => {
  return await axios(addressMetaConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
})

export const initialState = {
  renderingPrime: true,

  loading: HTTP_STATUS.IDLE,
  currentRequestId: null,
  error: null,

  loadingMeta: HTTP_STATUS.IDLE,
  currentRequestIdMeta: null,
  errorMeta: null,

  loadingPrev: HTTP_STATUS.IDLE,
  currentRequestIdPrev: null,
  errorPrev: null,

  loadingMetaPrev: HTTP_STATUS.IDLE,
  currentRequestIdMetaPrev: null,
  errorMetaPrev: null,

  // ****** Prime ****** //
  showEmploymentDetails: false,
  employmentType: '',
  occupation: '',
  employerName: null,
  empHistYears: 0,
  empHistMonths: 0,
  empEffectiveDate: defEffectiveDate,
  empAddStreet: null,

  sovemploymentType: '',
  sovoccupation: '',
  sovemployerName: null,
  sovempEffectiveDate: 0,
  sovempHistYears: 0,
  sovempHistMonths: 0,
  sovcurrEmpID: null,
  sovcurrEmpType: null,
  sovcurrEmpAttributes: null,
  sovcurrEmpUpdate: null,
  sovcurrEmpExpire: null,

  // Prime Emp - Address Finder
  empAddressFinderConfig: null,
  empAddressFinderCompletions: null,
  empAddressFinderSucess: null,
  empAddressSelectedAddress: null,
  empAddressSelectedPxid: null,
  empAddressSelectedMetaData: null,
  empAddressToDisplayLine1: null,
  empAddressToDisplayLine2: null,
  empAddressToDisplayLine3: null,
  empAddressToDisplayLine4: null,

  // Prime Emp - Address Finder - Loan Submission

  empAddressSelectedUnitType: null,
  empAddressSelectedApartment: null,
  empAddressSelectedBuilding: null,
  empAddressSelectedStreetNumber: { from: '', to: '' },
  empAddressSelectedAlpha: null,
  empAddressSelectedStreetOrPostalName: null,
  empAddressSelectedStreetDirection: null,
  empAddressSelectedStreetType: null,
  empAddressSelectedSuburb: null,
  empAddressSelectedCity: null,
  empAddressSelectedState: null,
  empAddressSelectedPostCode: null,
  empAddressSelectedCountry: { code: '', description: '' },

  showPrevEmp: true,

  // ******************************************************* //

  // ****** Prime Prev Emp ****** //
  prevEmpshowEmploymentDetails: false,
  prevEmpemploymentType: '',
  prevEmpoccupation: '',
  prevEmpemployerName: null,
  prevEmpempHistYears: 0,
  prevEmpempHistMonths: 0,
  prevEmpempEffectiveDate: defEffectiveDate,
  prevEmpempAddStreet: null,

  sovprevEmpemploymentType: '',
  sovprevEmpoccupation: '',
  sovprevEmpemployerName: null,
  sovprevEmpempHistYears: 0,
  sovprevEmpempHistMonths: 0,
  sovprevEmpID: null,
  sovprevEmpType: null,
  sovprevEmpAttributes: null,
  sovprevEmpUpdate: null,
  sovprevEmpExpire: null,

  // Prime Prev Emp - Address Finder
  prevEmpempAddressFinderConfig: null,
  prevEmpempAddressFinderCompletions: null,
  prevEmpempAddressFinderSucess: null,
  prevEmpempAddressSelectedAddress: null,
  prevEmpempAddressSelectedPxid: null,
  prevEmpempAddressSelectedMetaData: null,
  prevEmpempAddressToDisplayLine1: null,
  prevEmpempAddressToDisplayLine2: null,
  prevEmpempAddressToDisplayLine3: null,
  prevEmpempAddressToDisplayLine4: null,

  // Prime Prev Emp - Address Finder - Loan Submission

  prevEmpempAddressSelectedUnitType: null,
  prevEmpempAddressSelectedApartment: null,
  prevEmpempAddressSelectedBuilding: null,
  prevEmpempAddressSelectedStreetNumber: { from: '', to: '' },
  prevEmpempAddressSelectedAlpha: null,
  prevEmpempAddressSelectedStreetOrPostalName: null,
  prevEmpempAddressSelectedStreetDirection: null,
  prevEmpempAddressSelectedStreetType: null,
  prevEmpempAddressSelectedSuburb: null,
  prevEmpempAddressSelectedCity: null,
  prevEmpempAddressSelectedState: null,
  prevEmpempAddressSelectedPostCode: null,
  prevEmpempAddressSelectedCountry: { code: '', description: '' },

  // ******************************************************* //

  // ****** Joint ****** //
  jointshowEmploymentDetails: false,
  jointemploymentType: '',
  jointoccupation: '',
  jointemployerName: null,
  jointempAddStreet: null,

  // Joint Emp - Address Finder
  jointempAddressFinderConfig: null,
  jointempAddressFinderCompletions: null,
  jointempAddressFinderSucess: null,
  jointempAddressSelectedAddress: null,
  jointempAddressSelectedPxid: null,
  jointempAddressSelectedMetaData: null,
  jointempAddressToDisplayLine1: null,
  jointempAddressToDisplayLine2: null,
  jointempAddressToDisplayLine3: null,
  jointempAddressToDisplayLine4: null,

  // Joint Emp - Address Finder - Loan Submission

  jointempAddressSelectedUnitType: null,
  jointempAddressSelectedApartment: null,
  jointempAddressSelectedBuilding: null,
  jointempAddressSelectedStreetNumber: { from: '', to: '' },
  jointempAddressSelectedAlpha: null,
  jointempAddressSelectedStreetOrPostalName: null,
  jointempAddressSelectedStreetDirection: null,
  jointempAddressSelectedStreetType: null,
  jointempAddressSelectedSuburb: null,
  jointempAddressSelectedCity: null,
  jointempAddressSelectedState: null,
  jointempAddressSelectedPostCode: null,
  jointempAddressSelectedCountry: { code: '', description: '' },

  jointempHistYears: 0,
  jointempHistMonths: 0,
  jointempEffectiveDate: defEffectiveDate,

  jointshowPrevEmp: true,

  // ******************************************************* //

  // ****** Joint Prev Emp ****** //
  jointprevEmpshowEmploymentDetails: false,
  jointprevEmpemploymentType: null,
  jointprevEmpoccupation: null,
  jointprevEmpemployerName: null,
  jointprevEmpempAddStreet: null,

  // Joint Prev Emp - Address Finder
  jointprevEmpempAddressFinderConfig: null,
  jointprevEmpempAddressFinderCompletions: null,
  jointprevEmpempAddressFinderSucess: null,
  jointprevEmpempAddressSelectedAddress: null,
  jointprevEmpempAddressSelectedPxid: null,
  jointprevEmpempAddressSelectedMetaData: null,
  jointprevEmpempAddressToDisplayLine1: null,
  jointprevEmpempAddressToDisplayLine2: null,
  jointprevEmpempAddressToDisplayLine3: null,
  jointprevEmpempAddressToDisplayLine4: null,

  // Joint Prev Emp - Address Finder - Loan Submission

  jointprevEmpempAddressSelectedUnitType: null,
  jointprevEmpempAddressSelectedApartment: null,
  jointprevEmpempAddressSelectedBuilding: null,
  jointprevEmpempAddressSelectedStreetNumber: { from: '', to: '' },
  jointprevEmpempAddressSelectedAlpha: null,
  jointprevEmpempAddressSelectedStreetOrPostalName: null,
  jointprevEmpempAddressSelectedStreetDirection: null,
  jointprevEmpempAddressSelectedStreetType: null,
  jointprevEmpempAddressSelectedSuburb: null,
  jointprevEmpempAddressSelectedCity: null,
  jointprevEmpempAddressSelectedState: null,
  jointprevEmpempAddressSelectedPostCode: null,
  jointprevEmpempAddressSelectedCountry: { code: '', description: '' },

  jointprevEmpempHistYears: 0,
  jointprevEmpempHistMonths: 0,
  jointprevEmpempEffectiveDate: defEffectiveDate,

  // ******************************************************* //

  // Prime
  onSubmitEmploymentDetails: null,
  isValidEmploymentDetails: null,

  onSubmitEmploymentHistory: null,
  isValidEmploymentHistory: null,

  // Joint
  jointonSubmitEmploymentDetails: null,
  jointisValidEmploymentDetails: null,

  jointonSubmitEmploymentHistory: null,
  jointisValidEmploymentHistory: null,

  verifiedEmploymentnDetailsSecure: false,

  // ************************* Sovereign Employment Relationships ****************************** //

  sovEmploymentRelationships: [],

  // ************************* Sovereign data checks ****************************** //

  sovHasCurrentEmpDetails: false,
  isValidCurrentEmployment: null,

  isValidemploymentType: true,
  isValidoccupation: true,
  isValidemployerName: true,
  isValidempHistYears: true,
  isValidempHistMonths: true,

  sovHasPreviousEmpDetails: false,
  isValidPreviousEmployment: null,

  isValidprevEmpemploymentType: true,
  isValidprevEmpoccupation: true,
  isValidprevEmpemployerName: true,
  isValidprevEmpempHistYears: true,
  isValidprevEmpempHistMonths: true,
}

const employmentSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setSovEmploymentRelationships: (state, action) => {
      state.sovEmploymentRelationships = action.payload
    },

    setRenderingPrime: (state, action) => {
      state.renderingPrime = action.payload
    },

    // ************** Prime Employment Details ************** //

    setShowEmploymnetDetails: (state, action) => {
      state.showEmploymentDetails = action.payload
    },
    setEmploymnetType: (state, action) => {
      state.employmentType = action.payload
    },
    setOccupation: (state, action) => {
      state.occupation = action.payload
    },
    setemployerName: (state, action) => {
      state.employerName = action.payload
    },
    setEmpAddStreet: (state, action) => {
      state.empAddStreet = action.payload
    },

    setsovEmploymnetType: (state, action) => {
      state.sovemploymentType = action.payload
    },
    setsovOccupation: (state, action) => {
      state.sovoccupation = action.payload
    },
    setsovemployerName: (state, action) => {
      state.sovemployerName = action.payload
    },
    setsovempEffectiveDate: (state, action) => {
      state.sovempEffectiveDate = action.payload
    },
    setsovempHistYears: (state, action) => {
      state.sovempHistYears = action.payload
    },
    setsovempHistMonths: (state, action) => {
      state.sovempHistMonths = action.payload
    },
    setsovcurrEmpID: (state, action) => {
      state.sovcurrEmpID = action.payload
    },
    setsovcurrEmpType: (state, action) => {
      state.sovcurrEmpType = action.payload
    },
    setsovcurrEmpAttributes: (state, action) => {
      state.sovcurrEmpAttributes = action.payload
    },
    setsovcurrEmpUpdate: (state, action) => {
      state.sovcurrEmpUpdate = action.payload
    },
    setsovcurrEmpExpire: (state, action) => {
      state.sovcurrEmpExpire = action.payload
    },

    // ************* Prime Employment Details - Address Finder *************** //

    setEmpAddressFinderConfig: (state, action) => {
      console.log('action.payload Config: ', action.payload)
      state.empAddressFinderConfig = action.payload
    },
    setEmpAddressSelectedAddress: (state, action) => {
      state.empAddressSelectedAddress = action.payload
    },
    setEmpAddressSelectedPxid: (state, action) => {
      state.empAddressSelectedPxid = action.payload
    },

    // *************** Prime Employment Details - Selected from Address Finder *************** //

    // To Display
    setEmpAddressToDisplayLine1: (state, action) => {
      state.empAddressToDisplayLine1 = action.payload
    },
    setEmpAddressToDisplayLine2: (state, action) => {
      state.empAddressToDisplayLine2 = action.payload
    },
    setEmpAddressToDisplayLine3: (state, action) => {
      state.empAddressToDisplayLine3 = action.payload
    },
    setEmpAddressToDisplayLine4: (state, action) => {
      state.empAddressToDisplayLine4 = action.payload
    },

    // *************** Prime Employment Details - To Send to Sovereign *************** //

    // 1 Unit Type
    setEmpAddressSelectedUnitType: (state, action) => {
      state.empAddressSelectedUnitType = action.payload
    },
    // 2 Apartment
    setEmpAddressSelectedApartment: (state, action) => {
      state.empAddressSelectedApartment = action.payload
    },
    // 3 Building
    setEmpAddressSelectedBuilding: (state, action) => {
      state.empAddressSelectedBuilding = action.payload
    },
    // 4 Street From
    setEmpAddressSelectedStreetNumberFrom: (state, action) => {
      state.empAddressSelectedStreetNumber.from = action.payload
    },
    // 5 Street To
    setEmpAddressSelectedStreetNumberTo: (state, action) => {
      state.empAddressSelectedStreetNumber.to = action.payload
    },
    // 6 Street Alpha
    setEmpAddressSelectedAlpha: (state, action) => {
      state.empAddressSelectedAlpha = action.payload
    },
    // 7 Street or Postal Name
    setEmpAddressSelectedStreetOrPostalName: (state, action) => {
      state.empAddressSelectedStreetOrPostalName = action.payload
    },
    // 8 Street Direction
    setEmpAddressSelectedStreetDirection: (state, action) => {
      state.empAddressSelectedStreetDirection = action.payload
    },
    // 9 Street Type
    setEmpAddressSelectedStreetType: (state, action) => {
      state.empAddressSelectedStreetType = action.payload
    },
    // 10 Suburb
    setEmpAddressSelectedSuburb: (state, action) => {
      state.empAddressSelectedSuburb = action.payload
    },
    // 11 City
    setEmpAddressSelectedCity: (state, action) => {
      state.empAddressSelectedCity = action.payload
    },
    // 12 State
    setEmpAddressSelectedState: (state, action) => {
      state.empAddressSelectedState = action.payload
    },
    // 13 post Code
    setEmpAddressSelectedPostCode: (state, action) => {
      state.empAddressSelectedPostCode = action.payload
    },
    // 14 Country Code
    setEmpAddressSelectedCountryCode: (state, action) => {
      state.empAddressSelectedCountry.code = action.payload
    },
    // 15 Country Description
    setEmpAddressSelectedCountryDesc: (state, action) => {
      state.empAddressSelectedCountry.description = action.payload
    },

    setshowPrevEmp: (state, action) => {
      state.showPrevEmp = action.payload
    },

    setEmpHistYears: (state, action) => {
      state.empHistYears = action.payload
      state.empEffectiveDate.setFullYear(new Date().getFullYear() - action.payload)
    },

    setEmpHistMonths: (state, action) => {
      state.empHistMonths = action.payload
      state.empEffectiveDate.setMonth(new Date().getMonth() - action.payload)
    },

    toggleEmpHistPrevEmploymnet(state, action) {
      if ((state.empHistYears > 0 && state.empHistYears < 2) || (state.empHistYears === 0 && state.empHistMonths <= 11)) {
        state.showPrevEmp = true
      } else {
        state.showPrevEmp = false
        state.isValidPreviousEmployment = true
        state.isValidEmploymentHistory = true
      }
    },

    // *************** Prime Previous Employment Details *************** //

    setShowPrevEmploymnetDetails: (state, action) => {
      state.prevEmpshowEmploymentDetails = action.payload
    },
    setPrevEmploymnetType: (state, action) => {
      state.prevEmpemploymentType = action.payload
    },
    setPrevOccupation: (state, action) => {
      state.prevEmpoccupation = action.payload
    },
    setPrevemployerName: (state, action) => {
      state.prevEmpemployerName = action.payload
    },
    setPrevEmpAddStreet: (state, action) => {
      state.prevEmpempAddStreet = action.payload
    },

    setsovPrevEmploymnetType: (state, action) => {
      state.sovprevEmpemploymentType = action.payload
    },
    setsovPrevOccupation: (state, action) => {
      state.sovprevEmpoccupation = action.payload
    },
    setsovPrevemployerName: (state, action) => {
      state.sovprevEmpemployerName = action.payload
    },
    setsovprevEmpempHistYears: (state, action) => {
      state.sovprevEmpempHistYears = action.payload
    },
    setsovprevEmpempHistMonths: (state, action) => {
      state.sovprevEmpempHistMonths = action.payload
    },
    setsovprevEmpID: (state, action) => {
      state.sovprevEmpID = action.payload
    },
    setsovprevEmpType: (state, action) => {
      state.sovprevEmpType = action.payload
    },
    setsovprevEmpAttributes: (state, action) => {
      state.sovprevEmpAttributes = action.payload
    },
    setsovprevEmpUpdate: (state, action) => {
      state.sovprevEmpUpdate = action.payload
    },
    setsovprevEmpExpire: (state, action) => {
      state.sovprevEmpExpire = action.payload
    },

    // ************* Prime Previous Employment Details - Address Finder *************** //

    setPrevEmpAddressFinderConfig: (state, action) => {
      state.prevEmpempAddressFinderConfig = action.payload
    },
    setPrevEmpAddressSelectedAddress: (state, action) => {
      state.prevEmpempAddressSelectedAddress = action.payload
    },
    setPrevEmpAddressSelectedPxid: (state, action) => {
      state.prevEmpempAddressSelectedPxid = action.payload
    },

    // *************** Prime Previous Employment Details - Selected from Address Finder *************** //

    // To Display
    setPrevEmpAddressToDisplayLine1: (state, action) => {
      state.prevEmpempAddressToDisplayLine1 = action.payload
    },
    setPrevEmpAddressToDisplayLine2: (state, action) => {
      state.prevEmpempAddressToDisplayLine2 = action.payload
    },
    setPrevEmpAddressToDisplayLine3: (state, action) => {
      state.prevEmpempAddressToDisplayLine3 = action.payload
    },
    setPrevEmpAddressToDisplayLine4: (state, action) => {
      state.prevEmpempAddressToDisplayLine4 = action.payload
    },

    // *************** Prime Previous Employment Details - To Send to Sovereign *************** //

    setPrevEmpAddressSelectedUnitType: (state, action) => {
      state.prevEmpempAddressSelectedUnitType = action.payload
    },
    setPrevEmpAddressSelectedApartment: (state, action) => {
      state.prevEmpempAddressSelectedApartment = action.payload
    },
    setPrevEmpAddressSelectedBuilding: (state, action) => {
      state.prevEmpempAddressSelectedBuilding = action.payload
    },
    setPrevEmpAddressSelectedStreetNumberFrom: (state, action) => {
      state.prevEmpempAddressSelectedStreetNumber.from = action.payload
    },
    setPrevEmpAddressSelectedStreetNumberTo: (state, action) => {
      state.prevEmpempAddressSelectedStreetNumber.to = action.payload
    },
    setPrevEmpAddressSelectedAlpha: (state, action) => {
      state.prevEmpempAddressSelectedAlpha = action.payload
    },
    setPrevEmpAddressSelectedStreetOrPostalName: (state, action) => {
      state.prevEmpempAddressSelectedStreetOrPostalName = action.payload
    },
    setPrevEmpAddressSelectedStreetDirection: (state, action) => {
      state.prevEmpempAddressSelectedStreetDirection = action.payload
    },
    setPrevEmpAddressSelectedStreetType: (state, action) => {
      state.prevEmpempAddressSelectedStreetType = action.payload
    },
    setPrevEmpAddressSelectedSuburb: (state, action) => {
      state.prevEmpempAddressSelectedSuburb = action.payload
    },
    setPrevEmpAddressSelectedCity: (state, action) => {
      state.prevEmpempAddressSelectedCity = action.payload
    },
    setPrevEmpAddressSelectedState: (state, action) => {
      state.prevEmpempAddressSelectedState = action.payload
    },
    setPrevEmpAddressSelectedPostCode: (state, action) => {
      state.prevEmpempAddressSelectedPostCode = action.payload
    },
    setPrevEmpAddressSelectedCountryCode: (state, action) => {
      state.prevEmpempAddressSelectedCountry.code = action.payload
    },
    setPrevEmpAddressSelectedCountryDesc: (state, action) => {
      state.prevEmpempAddressSelectedCountry.description = action.payload
    },

    setPrevEmpHistYears: (state, action) => {
      state.prevEmpempHistYears = action.payload
      state.prevEmpempEffectiveDate.setFullYear(new Date().getFullYear() - action.payload)
    },
    setPrevEmpHistMonths: (state, action) => {
      state.prevEmpempHistMonths = action.payload
      state.prevEmpempEffectiveDate.setMonth(new Date().getMonth() - action.payload)
    },

    // ******************************************************************************************************************** //

    // ************** Joint Employment Details ************** //

    setJointShowEmploymnetDetails: (state, action) => {
      state.jointshowEmploymentDetails = action.payload
    },
    setJointEmploymnetType: (state, action) => {
      state.jointemploymentType = action.payload
    },
    setJointOccupation: (state, action) => {
      state.jointoccupation = action.payload
    },
    setJointemployerName: (state, action) => {
      state.jointemployerName = action.payload
    },
    setJointEmpAddStreet: (state, action) => {
      state.jointempAddStreet = action.payload
    },

    // ************* Joint Employment Details - Address Finder *************** //

    setJointEmpAddressFinderConfig: (state, action) => {
      state.jointempAddressFinderConfig = action.payload
    },
    setJointEmpAddressSelectedAddress: (state, action) => {
      state.jointempAddressSelectedAddress = action.payload
    },
    setJointEmpAddressSelectedPxid: (state, action) => {
      state.jointempAddressSelectedPxid = action.payload
    },

    // *************** Joint Employment Details - Selected from Address Finder *************** //

    // To Display
    setJointEmpAddressToDisplayLine1: (state, action) => {
      state.jointempAddressToDisplayLine1 = action.payload
    },
    setJointEmpAddressToDisplayLine2: (state, action) => {
      state.jointempAddressToDisplayLine2 = action.payload
    },
    setJointEmpAddressToDisplayLine3: (state, action) => {
      state.jointempAddressToDisplayLine3 = action.payload
    },
    setJointEmpAddressToDisplayLine4: (state, action) => {
      state.jointempAddressToDisplayLine4 = action.payload
    },

    // *************** Joint Employment Details - To Send to Sovereign *************** //

    setJointEmpAddressSelectedUnitType: (state, action) => {
      state.jointempAddressSelectedUnitType = action.payload
    },
    setJointEmpAddressSelectedApartment: (state, action) => {
      state.jointempAddressSelectedApartment = action.payload
    },
    setJointEmpAddressSelectedBuilding: (state, action) => {
      state.jointempAddressSelectedBuilding = action.payload
    },
    setJointEmpAddressSelectedStreetNumberFrom: (state, action) => {
      state.jointempAddressSelectedStreetNumber.from = action.payload
    },
    setJointEmpAddressSelectedStreetNumberTo: (state, action) => {
      state.jointempAddressSelectedStreetNumber.to = action.payload
    },
    setJointEmpAddressSelectedAlpha: (state, action) => {
      state.jointempAddressSelectedAlpha = action.payload
    },
    setJointEmpAddressSelectedStreetOrPostalName: (state, action) => {
      state.jointempAddressSelectedStreetOrPostalName = action.payload
    },
    setJointEmpAddressSelectedStreetDirection: (state, action) => {
      state.jointempAddressSelectedStreetDirection = action.payload
    },
    setJointEmpAddressSelectedStreetType: (state, action) => {
      state.jointempAddressSelectedStreetType = action.payload
    },
    setJointEmpAddressSelectedSuburb: (state, action) => {
      state.jointempAddressSelectedSuburb = action.payload
    },
    setJointEmpAddressSelectedCity: (state, action) => {
      state.jointempAddressSelectedCity = action.payload
    },
    setJointEmpAddressSelectedState: (state, action) => {
      state.jointempAddressSelectedState = action.payload
    },
    setJointEmpAddressSelectedPostCode: (state, action) => {
      state.jointempAddressSelectedPostCode = action.payload
    },
    setJointEmpAddressSelectedCountryCode: (state, action) => {
      state.jointempAddressSelectedCountry.code = action.payload
    },
    setJointEmpAddressSelectedCountryDesc: (state, action) => {
      state.jointempAddressSelectedCountry.description = action.payload
    },

    setjointshowPrevEmp: (state, action) => {
      state.jointshowPrevEmp = action.payload
    },
    setJointEmpHistYears: (state, action) => {
      state.jointempHistYears = action.payload
      state.jointempEffectiveDate.setFullYear(new Date().getFullYear() - action.payload)
    },
    setJointEmpHistMonths: (state, action) => {
      state.jointempHistMonths = action.payload
      state.jointempEffectiveDate.setMonth(new Date().getMonth() - action.payload)
    },
    toggleJointEmpHistPrevEmploymnet(state, action) {
      if ((state.jointempHistYears > 0 && state.jointempHistYears < 2) || (state.jointempHistYears === 0 && state.jointempHistMonths <= 11)) {
        state.jointshowPrevEmp = true
      } else {
        state.jointshowPrevEmp = false
      }
    },

    // *************** Joint Previous Employment Details *************** //

    setJointShowPrevEmploymnetDetails: (state, action) => {
      state.jointprevEmpshowEmploymentDetails = action.payload
    },
    setJointPrevEmploymnetType: (state, action) => {
      state.jointprevEmpemploymentType = action.payload
    },
    setJointPrevOccupation: (state, action) => {
      state.jointprevEmpoccupation = action.payload
    },
    setJointPrevemployerName: (state, action) => {
      state.jointprevEmpemployerName = action.payload
    },
    setJointPrevEmpAddStreet: (state, action) => {
      state.jointprevEmpempAddStreet = action.payload
    },

    // ************* Joint Previous Employment Details - Address Finder *************** //

    setJointPrevEmpAddressFinderConfig: (state, action) => {
      state.jointprevEmpempAddressFinderConfig = action.payload
    },
    setJointPrevEmpAddressSelectedAddress: (state, action) => {
      state.jointprevEmpempAddressSelectedAddress = action.payload
    },
    setJointPrevEmpAddressSelectedPxid: (state, action) => {
      state.jointprevEmpempAddressSelectedPxid = action.payload
    },

    // *************** Joint Previous Employment Details - Selected from Address Finder *************** //

    // To Display
    setJointPrevEmpAddressToDisplayLine1: (state, action) => {
      state.jointprevEmpempAddressToDisplayLine1 = action.payload
    },
    setJointPrevEmpAddressToDisplayLine2: (state, action) => {
      state.jointprevEmpempAddressToDisplayLine2 = action.payload
    },
    setJointPrevEmpAddressToDisplayLine3: (state, action) => {
      state.jointprevEmpempAddressToDisplayLine3 = action.payload
    },
    setJointPrevEmpAddressToDisplayLine4: (state, action) => {
      state.jointprevEmpempAddressToDisplayLine4 = action.payload
    },

    // *************** Joint Previous Employment Details - To Send to Sovereign *************** //

    setJointPrevEmpAddressSelectedUnitType: (state, action) => {
      state.jointprevEmpempAddressSelectedUnitType = action.payload
    },
    setJointPrevEmpAddressSelectedApartment: (state, action) => {
      state.jointprevEmpempAddressSelectedApartment = action.payload
    },
    setJointPrevEmpAddressSelectedBuilding: (state, action) => {
      state.jointprevEmpempAddressSelectedBuilding = action.payload
    },
    setJointPrevEmpAddressSelectedStreetNumberFrom: (state, action) => {
      state.jointprevEmpempAddressSelectedStreetNumber.from = action.payload
    },
    setJointPrevEmpAddressSelectedStreetNumberTo: (state, action) => {
      state.jointprevEmpempAddressSelectedStreetNumber.to = action.payload
    },
    setJointPrevEmpAddressSelectedAlpha: (state, action) => {
      state.jointprevEmpempAddressSelectedAlpha = action.payload
    },
    setJointPrevEmpAddressSelectedStreetOrPostalName: (state, action) => {
      state.jointprevEmpempAddressSelectedStreetOrPostalName = action.payload
    },
    setJointPrevEmpAddressSelectedStreetDirection: (state, action) => {
      state.jointprevEmpempAddressSelectedStreetDirection = action.payload
    },
    setJointPrevEmpAddressSelectedStreetType: (state, action) => {
      state.jointprevEmpempAddressSelectedStreetType = action.payload
    },
    setJointPrevEmpAddressSelectedSuburb: (state, action) => {
      state.jointprevEmpempAddressSelectedSuburb = action.payload
    },
    setJointPrevEmpAddressSelectedCity: (state, action) => {
      state.jointprevEmpempAddressSelectedCity = action.payload
    },
    setJointPrevEmpAddressSelectedState: (state, action) => {
      state.jointprevEmpempAddressSelectedState = action.payload
    },
    setJointPrevEmpAddressSelectedPostCode: (state, action) => {
      state.jointprevEmpempAddressSelectedPostCode = action.payload
    },
    setJointPrevEmpAddressSelectedCountryCode: (state, action) => {
      state.jointprevEmpempAddressSelectedCountry.code = action.payload
    },
    setJointPrevEmpAddressSelectedCountryDesc: (state, action) => {
      state.jointprevEmpempAddressSelectedCountry.description = action.payload
    },

    setJointPrevEmpHistYears: (state, action) => {
      state.jointprevEmpempHistYears = action.payload
      state.jointprevEmpempEffectiveDate.setFullYear(new Date().getFullYear() - action.payload)
    },
    setJointPrevEmpHistMonths: (state, action) => {
      state.jointprevEmpempHistMonths = action.payload
      state.jointprevEmpempEffectiveDate.setMonth(new Date().getMonth() - action.payload)
    },

    // Submission and Validation

    //Prime
    setOnSubmitEmploymentDetails: (state, action) => {
      state.onSubmitEmploymentDetails = action.payload
    },
    setIsValidEmploymentDetails: (state, action) => {
      state.isValidEmploymentDetails = action.payload
    },
    setOnSubmitEmploymentHistory: (state, action) => {
      state.onSubmitEmploymentHistory = action.payload
    },
    setIsValidEmploymentHistory: (state, action) => {
      state.isValidEmploymentHistory = action.payload
    },

    //Joint
    setJointOnSubmitEmploymentDetails: (state, action) => {
      state.jointonSubmitEmploymentDetails = action.payload
    },
    setJointIsValidEmploymentDetails: (state, action) => {
      state.jointisValidEmploymentDetails = action.payload
    },
    setJointOnSubmitEmploymentHistory: (state, action) => {
      state.jointonSubmitEmploymentHistory = action.payload
    },
    setJointIsValidEmploymentHistory: (state, action) => {
      state.jointisValidEmploymentHistory = action.payload
    },

    setVerifiedEmploymentnDetailsSecure: (state, action) => {
      state.verifiedEmploymentnDetailsSecure = action.payload
    },

    // ************************* Sovereign data checks ****************************** //

    // Current
    setSovHasCurrentEmpDetails: (state, action) => {
      state.sovHasCurrentEmpDetails = action.payload
    },
    setisValidCurrentEmployment: (state, action) => {
      state.isValidCurrentEmployment = action.payload
    },
    setisValidemploymentType: (state, action) => {
      state.isValidemploymentType = action.payload
    },
    setisValidoccupation: (state, action) => {
      state.isValidoccupation = action.payload
    },
    setisValidemployerName: (state, action) => {
      state.isValidemployerName = action.payload
    },
    setisValidempHistYears: (state, action) => {
      state.isValidempHistYears = action.payload
    },
    setisValidempHistMonths: (state, action) => {
      state.isValidempHistMonths = action.payload
    },

    // Previous
    setSovHasPreviousEmpDetails: (state, action) => {
      state.sovHasPreviousEmpDetails = action.payload
    },
    setisValidPreviousEmployment: (state, action) => {
      state.isValidPreviousEmployment = action.payload
    },
    setisValidprevEmpemploymentType: (state, action) => {
      state.isValidprevEmpemploymentType = action.payload
    },
    setisValidprevEmpoccupation: (state, action) => {
      state.isValidprevEmpoccupation = action.payload
    },
    setisValidprevEmpemployerName: (state, action) => {
      state.isValidprevEmpemployerName = action.payload
    },
    setisValidprevEmpempHistYears: (state, action) => {
      state.isValidprevEmpempHistYears = action.payload
    },
    setisValidprevEmpempHistMonths: (state, action) => {
      state.isValidprevEmpempHistMonths = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddresses.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(getAddresses.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          // Prime Current Employment Address

          if (state.renderingPrime === true) {
            state.empAddressFinderCompletions = action.payload?.completions
            state.empAddressFinderSucess = action.payload?.success
            state.loading = HTTP_STATUS.IDLE
            state.currentRequestId = null
            return
          }
          // Joint Current Employment Address
          if (state.renderingPrime === false) {
            state.jointempAddressFinderCompletions = action.payload?.completions
            state.jointempAddressFinderSucess = action.payload?.success
            state.loading = HTTP_STATUS.IDLE
            state.currentRequestId = null
            return
          }
        }
      })
      .addCase(getAddresses.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null
        }
      })
      .addCase(getAddressMetaData.pending, (state, action) => {
        if (state.loadingMeta === 'IDLE') {
          state.loadingMeta = HTTP_STATUS.PENDING
          state.currentRequestIdMeta = action.meta.requestId
        }
      })
      .addCase(getAddressMetaData.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loadingMeta === 'PENDING' && state.currentRequestIdMeta === requestId) {
          // Prime Current Employment Address Meta
          if (state.renderingPrime === true) {
            state.empAddressSelectedMetaData = action.payload
            state.loadingMeta = HTTP_STATUS.IDLE
            state.currentRequestIdMeta = null
            return
          }
          // Joint Current Employment Address Meta
          if (state.renderingPrime === false) {
            state.jointempAddressSelectedMetaData = action.payload
            state.loadingMeta = HTTP_STATUS.IDLE
            state.currentRequestIdMeta = null
            return
          }
        }
      })
      .addCase(getAddressMetaData.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loadingMeta === 'PENDING' && state.currentRequestIdMeta === requestId) {
          state.loadingMeta = 'IDLE'
          state.errorMeta = action.error
          state.currentRequestIdMeta = null
        }
      }) // *********** End of Current *********** //
      .addCase(getAddressesPrevEmp.pending, (state, action) => {
        if (state.loadingPrev === 'IDLE') {
          state.loadingPrev = HTTP_STATUS.PENDING
          state.currentRequestIdPrev = action.meta.requestId
        }
      })
      .addCase(getAddressesPrevEmp.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loadingPrev === 'PENDING' && state.currentRequestIdPrev === requestId) {
          // Prime Previous Employment Address
          if (state.renderingPrime === true) {
            state.prevEmpempAddressFinderCompletions = action.payload?.completions
            state.prevEmpempAddressFinderSucess = action.payload?.success
            state.loadingPrev = HTTP_STATUS.IDLE
            state.currentRequestIdPrev = null
            return
          }
          // Joint Previous Employment Address
          if (state.renderingPrime === false) {
            state.jointprevEmpempAddressFinderCompletions = action.payload?.completions
            state.jointprevEmpempAddressFinderSucess = action.payload?.success
            state.loadingPrev = HTTP_STATUS.IDLE
            state.currentRequestIdPrev = null
            return
          }
        }
      })
      .addCase(getAddressesPrevEmp.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loadingPrev === 'PENDING' && state.currentRequestIdPrev === requestId) {
          state.loadingPrev = 'IDLE'
          state.errorPrev = action.error
          state.currentRequestIdPrev = null
        }
      })
      .addCase(getAddressMetaDataPrevEmp.pending, (state, action) => {
        if (state.loadingMetaPrev === 'IDLE') {
          state.loadingMetaPrev = HTTP_STATUS.PENDING
          state.currentRequestIdMetaPrev = action.meta.requestId
        }
      })
      .addCase(getAddressMetaDataPrevEmp.fulfilled, (state, action) => {
        const { requestId } = action.meta

        if (state.loadingMetaPrev === 'PENDING' && state.currentRequestIdMetaPrev === requestId) {
          // Prime Previous Employment Address Meta
          if (state.renderingPrime === true) {
            state.prevEmpempAddressSelectedMetaData = action.payload
            state.loadingMetaPrev = HTTP_STATUS.IDLE
            state.currentRequestIdMetaPrev = null
            return
          }
          // Joint Previous Employment Address Meta
          if (state.renderingPrime === false) {
            state.jointprevEmpempAddressSelectedMetaData = action.payload
            state.loadingMetaPrev = HTTP_STATUS.IDLE
            state.currentRequestIdMetaPrev = null
            return
          }
        }
      })
      .addCase(getAddressMetaDataPrevEmp.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loadingMetaPrev === 'PENDING' && state.currentRequestIdMetaPrev === requestId) {
          state.loadingMetaPrev = 'IDLE'
          state.errorMetaPrev = action.error
          state.currentRequestIdMetaPrev = null
        }
      })
  },
})

export const employmentActions = employmentSlice.actions
export default employmentSlice
