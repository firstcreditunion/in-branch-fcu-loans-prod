import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { HTTP_STATUS } from '../utils/apiConstants'

const defEffectiveDate = new Date()
const namespace = 'ContactDetails'

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

export const matchClient = createAsyncThunk(`${namespace}/matchClient`, async (matchClientConfig) => {
  return await axios(matchClientConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
})

export const initialState = {
  renderingPrime: true,
  renderingCurrentResidence: true,

  loading: HTTP_STATUS.IDLE,
  currentRequestId: null,
  error: null,

  loadingMeta: HTTP_STATUS.IDLE,
  currentRequestIdMeta: null,
  errorMeta: null,

  matchClientLoadingMeta: HTTP_STATUS.IDLE,
  matchClientCurrentRequestIdMeta: null,
  matchClientErrorMeta: null,

  // ******* Contact Details ********* //
  // Prime

  primeAnalyticsEventPushed: false,
  emailAddress: '',

  mobileCountryCode: '64',
  mobileProviderCode: '',
  mobileNumberLastDigits: '',
  mobileNumber: '',

  homePhoneCountryCode: '64',
  homePhoneStdCode: '',
  homePhoneLastDigits: '',
  homePhone: '',

  workPhoneCountryCode: '64',
  workPhoneStdCode: '',
  workPhoneLastDigits: '',
  workPhone: '',

  fax: '',
  prefContactType: '',
  numberOfContactMethods: 0,

  // Joint

  jointAnalyticsEventPushed: false,

  jointemailAddress: '',

  jointmobileCountryCode: '64',
  jointmobileProviderCode: '',
  jointmobileLastDigits: '',
  jointmobileNumber: '',

  jointhomePhoneCountryCode: '64',
  jointhomePhoneStdCode: '',
  jointhomePhoneLastDigits: '',
  jointhomePhone: '',

  jointworkPhoneCountryCode: '64',
  jointworkPhoneStdCode: '',
  jointworkPhoneLastDigits: '',
  jointworkPhone: '',

  jointfax: '',
  jointprefContactType: '',
  jointnumberOfContactMethods: 0,

  // ************* Sovereign Address - Relationship ************* //

  sovAddressRelationships: [],
  sovContactRelationships: [],

  // ************* Sovereign Address - Current ************* //

  sovCurrentAddressType: null,
  sovCurrentAddressAlpha: null,
  sovCurrentAddressapartment: null,
  sovCurrentAddressbuilding: null,
  sovCurrentAddresscareOfName: null,
  sovCurrentAddresscity: null,
  sovCurrentAddresscontactType: null,
  sovCurrentAddresscountry: { code: null, description: null },
  sovCurrentAddresseffective: null,
  sovCurrentAddressfloor: null,
  sovCurrentAddresspostCode: null,
  sovCurrentAddresspurpose: null,
  sovCurrentAddressstreetDirection: null,
  sovCurrentAddressstreetNumber: { from: null, to: null },
  sovCurrentAddressstreetOrPostalName: null,
  sovCurrentAddressstreetType: null,
  sovCurrentAddresssuburb: null,
  sovCurrentAddressunitType: null,
  sovcurrResEffectiveDate: null,
  sovcurrResYears: 0,
  sovcurrResMonths: 0,
  sovcurrResLengthOfStayIsZero: false,

  sovCurrentAddressId: null,
  sovCurrentAddressType: null,
  sovCurrentAddressAttributes: null,
  sovCurrentAddressUpdate: null,
  sovCurrentAddressExpire: null,

  // ************* Sovereign Address - Previous ************* //

  sovPreviousAddressType: null,
  sovPreviousAddressAlpha: null,
  sovPreviousAddressapartment: null,
  sovPreviousAddressbuilding: null,
  sovPreviousAddresscareOfName: null,
  sovPreviousAddresscity: null,
  sovPreviousAddresscontactType: null,
  sovPreviousAddresscountry: { code: null, description: null },
  sovPreviousAddresseffective: null,
  sovPreviousAddressfloor: null,
  sovPreviousAddresspostCode: null,
  sovPreviousAddresspurpose: null,
  sovPreviousAddressstreetDirection: null,
  sovPreviousAddressstreetNumber: { from: null, to: null },
  sovPreviousAddressstreetOrPostalName: null,
  sovPreviousAddressstreetType: null,
  sovPreviousAddresssuburb: null,
  sovPreviousAddressunitType: null,
  sovprevResEffectiveDate: null,
  sovprevResExpiryDate: null,
  sovprevResYears: 0,
  sovprevResMonths: 0,
  sovprevResLengthOfStayIsZero: false,

  sovPreviousAddressId: null,
  sovPreviousAddressType: null,
  sovPreviousAddressAttributes: null,
  sovPreviousAddressUpdate: null,
  sovPreviousAddressExpire: null,

  // ******* Current Residence ******* //
  //Prime
  // Address Finder
  currResAddressFinderConfig: null,
  currResAddressFinderCompletions: null,
  currResAddressFinderSucess: null,
  currResAddressSelectedAddress: null,
  currResAddressSelectedPxid: null,
  currResAddressSelectedMetaData: null,
  currResAddressToDisplayLine1: null,
  currResAddressToDisplayLine2: null,
  currResAddressToDisplayLine3: null,
  currResAddressToDisplayLine4: null,

  // Address Finder - Loan Submission
  currResAddressSelectedUnitType: null,
  currResAddressSelectedApartment: null,
  currResAddressSelectedBuilding: null,
  currResAddressSelectedStreetNumber: { from: '', to: '' },
  currResAddressSelectedAlpha: null,
  currResAddressSelectedStreetOrPostalName: null,
  currResAddressSelectedStreetDirection: null,
  currResAddressSelectedStreetType: null,
  currResAddressSelectedSuburb: null,
  currResAddressSelectedCity: null,
  currResAddressSelectedState: null,
  currResAddressSelectedPostCode: null,
  currResAddressSelectedCountry: { code: '', description: '' },

  currHomeAddStreet: null,
  currHomeAddSuburb: '',
  currHomeAddCity: '',
  currHomeAddPostCode: '',
  residenceType: '',
  currResYears: 0,
  currResMonths: 0,
  currResEffectiveDate: new Date(),
  currResidenceEffDate: null,
  currResidenceMonths: 0,
  currResTypeCode: null,
  currResTypeDescription: null,

  // Joint
  // Address Finder
  jointcurrResAddressFinderConfig: null,
  jointcurrResAddressFinderCompletions: null,
  jointcurrResAddressFinderSucess: null,
  jointcurrResAddressSelectedAddress: null,
  jointcurrResAddressSelectedPxid: null,
  jointcurrResAddressSelectedMetaData: null,
  jointcurrResAddressToDisplayLine1: null,
  jointcurrResAddressToDisplayLine2: null,
  jointcurrResAddressToDisplayLine3: null,
  jointcurrResAddressToDisplayLine4: null,

  // Address Finder - Loan Submission
  jointcurrResAddressSelectedUnitType: null,
  jointcurrResAddressSelectedApartment: null,
  jointcurrResAddressSelectedBuilding: null,
  jointcurrResAddressSelectedStreetNumber: { from: '', to: '' },
  jointcurrResAddressSelectedAlpha: null,
  jointcurrResAddressSelectedStreetOrPostalName: null,
  jointcurrResAddressSelectedStreetDirection: null,
  jointcurrResAddressSelectedStreetType: null,
  jointcurrResAddressSelectedSuburb: null,
  jointcurrResAddressSelectedCity: null,
  jointcurrResAddressSelectedState: null,
  jointcurrResAddressSelectedPostCode: null,
  jointcurrResAddressSelectedCountry: { code: '', description: '' },

  jointcurrHomeAddStreet: '',
  jointcurrHomeAddSuburb: '',
  jointcurrHomeAddCity: '',
  jointcurrHomeAddPostCode: '',
  jointresidenceType: '',
  jointcurrResYears: 0,
  jointcurrResMonths: 0,
  jointcurrResEffectiveDate: new Date(),
  jointcurrResidenceEffDate: null,
  jointcurrResidenceMonths: 0,

  // ******* Previous Residence ******* //
  // Prime

  // Address Finder
  prevResAddressFinderConfig: null,
  prevResAddressFinderCompletions: null,
  prevResAddressFinderSucess: null,
  prevResAddressSelectedAddress: null,
  prevResAddressSelectedPxid: null,
  prevResAddressSelectedMetaData: null,
  prevResAddressToDisplayLine1: null,
  prevResAddressToDisplayLine2: null,
  prevResAddressToDisplayLine3: null,
  prevResAddressToDisplayLine4: null,

  // Address Finder - Loan Submission

  prevResAddressSelectedUnitType: null,
  prevResAddressSelectedApartment: null,
  prevResAddressSelectedBuilding: null,
  prevResAddressSelectedStreetNumber: { from: '', to: '' },
  prevResAddressSelectedAlpha: null,
  prevResAddressSelectedStreetOrPostalName: null,
  prevResAddressSelectedStreetDirection: null,
  prevResAddressSelectedStreetType: null,
  prevResAddressSelectedSuburb: null,
  prevResAddressSelectedCity: null,
  prevResAddressSelectedState: null,
  prevResAddressSelectedPostCode: null,
  prevResAddressSelectedCountry: { code: '', description: '' },

  skipPrevResidence: false,
  prevHomeAddStreet: '',
  prevHomeAddSuburb: '',
  prevHomeAddCity: '',
  prevHomeAddPostCode: '',
  prevResYears: 0,
  prevResMonths: 0,
  prevResEffectiveDate: new Date(),
  prevResidenceEffDate: null,
  prevResidenceMonths: 0,

  // Joint
  // Address Finder
  jointprevResAddressFinderConfig: null,
  jointprevResAddressFinderCompletions: null,
  jointprevResAddressFinderSucess: null,
  jointprevResAddressSelectedAddress: null,
  jointprevResAddressSelectedPxid: null,
  jointprevResAddressSelectedMetaData: null,
  jointprevResAddressToDisplayLine1: null,
  jointprevResAddressToDisplayLine2: null,
  jointprevResAddressToDisplayLine3: null,
  jointprevResAddressToDisplayLine4: null,

  // Address Finder - Loan Submission

  jointprevResAddressSelectedUnitType: null,
  jointprevResAddressSelectedApartment: null,
  jointprevResAddressSelectedBuilding: null,
  jointprevResAddressSelectedStreetNumber: {
    from: '',
    to: '',
  },
  jointprevResAddressSelectedAlpha: null,
  jointprevResAddressSelectedStreetOrPostalName: null,
  jointprevResAddressSelectedStreetDirection: null,
  jointprevResAddressSelectedStreetType: null,
  jointprevResAddressSelectedSuburb: null,
  jointprevResAddressSelectedCity: null,
  jointprevResAddressSelectedState: null,
  jointprevResAddressSelectedPostCode: null,
  jointprevResAddressSelectedCountry: { code: '', description: '' },

  jointskipPrevResidence: false,
  jointprevHomeAddStreet: '',
  jointprevHomeAddSuburb: '',
  jointprevHomeAddCity: '',
  jointprevHomeAddPostCode: '',
  jointprevResYears: 0,
  jointprevResMonths: 0,
  jointprevResEffectiveDate: new Date(),
  jointprevResidenceEffDate: null,
  jointprevResidenceMonths: 0,

  // ******* Submission and Validation ******* //
  // Prime
  onSubmitYourContactDetails: null,
  isValidYourContactDetails: null,

  onSubmitResidenceDetails: null,
  isValidResidenceDetails: null,

  onSubmitPrevResidenceDetails: null,
  isValidPrevResidenceDetails: null,

  // Joint
  jointonSubmitYourContactDetails: null,
  jointisValidYourContactDetails: null,

  jointonSubmitResidenceDetails: null,
  jointisValidResidenceDetails: null,

  jointonSubmitPrevResidenceDetails: null,
  jointisValidPrevResidenceDetails: null,

  // ******* Sovereign Data Checks - Contact Methods ******* //

  isValidSovContactMethods: true,

  isValidSovMobileNumber: null,
  isValidSovWorkPhoneNumber: null,
  isValidSovHomePhoneNumber: null,
  isValidSovEmailAddress: null,

  verifiedContactDetailsSecure: false,

  // ******* Sovereign Data Checks - Residential Details ******* //

  verifiedResidentialDetailsSecure: false,
  sovHasCurrentResidentialDetails: false,
  sovHasPreviousResidentialDetails: false,

  isValidSovCurrentResidentialDetails: true,
  isValidSovPreviousResidentialDetails: true,
}

const contactDetailsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setSovAddressRelationships: (state, action) => {
      state.sovAddressRelationships = action.payload
    },
    setSovContactRelationships: (state, action) => {
      state.sovContactRelationships = action.payload
    },

    setRenderingPrime: (state, action) => {
      state.renderingPrime = action.payload
    },
    setRenderingCurrentResidence: (state, action) => {
      state.renderingCurrentResidence = action.payload
    },

    // ******* Contact Details ******* //
    // Prime
    setPrimeAnalyticsEventPushed: (state, action) => {
      state.primeAnalyticsEventPushed = action.payload
    },
    setEmailAddress: (state, action) => {
      state.emailAddress = action.payload
    },
    setMobileCountryCode: (state, action) => {
      state.mobileCountryCode = action.payload
    },
    setMobileProviderCode: (state, action) => {
      state.mobileProviderCode = action.payload
    },
    setMobileNumber: (state, action) => {
      const mobileNumberSplit = action.payload.split(' ')
      const providerSplit1 = mobileNumberSplit[1]
      const LastDigitsSplit2 = mobileNumberSplit[2]
      const LastDigitsSplit3 = mobileNumberSplit[3]

      state.mobileNumber = action.payload
      state.mobileProviderCode = providerSplit1
      state.mobileNumberLastDigits = (LastDigitsSplit2 ? LastDigitsSplit2 : '') + (LastDigitsSplit3 ? LastDigitsSplit3 : '')
    },
    setHomePhone: (state, action) => {
      const homeNumberSplit = action.payload.split(' ')
      const areaCodeSplit1 = homeNumberSplit[1]
      const LastDigitsSplit2 = homeNumberSplit[2]
      const LastDigitsSplit3 = homeNumberSplit[3]

      state.homePhone = action.payload
      state.homePhoneStdCode = areaCodeSplit1
      state.homePhoneLastDigits = (LastDigitsSplit2 ? LastDigitsSplit2 : '') + (LastDigitsSplit3 ? LastDigitsSplit3 : '')
    },
    setWorkPhone: (state, action) => {
      const workNumberSplit = action.payload.split(' ')
      const areaCodeSplit1 = workNumberSplit[1]
      const LastDigitsSplit2 = workNumberSplit[2]
      const LastDigitsSplit3 = workNumberSplit[3]
      state.workPhone = action.payload
      state.workPhoneStdCode = areaCodeSplit1
      state.workPhoneLastDigits = (LastDigitsSplit2 ? LastDigitsSplit2 : '') + (LastDigitsSplit3 ? LastDigitsSplit3 : '')
    },
    setFax: (state, action) => {
      state.fax = action.payload
    },
    setPrefContactType: (state, action) => {
      state.prefContactType = action.payload
    },

    // Joint
    setJointAnalyticsEventPushed: (state, action) => {
      state.jointAnalyticsEventPushed = action.payload
    },
    setJointEmailAddress: (state, action) => {
      state.jointemailAddress = action.payload
    },
    setJointMobileCountryCode: (state, action) => {
      state.jointmobileCountryCode = action.payload
    },
    setJointMobileProviderCode: (state, action) => {
      state.jointmobileProviderCode = action.payload
    },
    setJointMobileNumber: (state, action) => {
      const mobileNumberSplit = action.payload.split(' ')
      const providerSplit1 = mobileNumberSplit[1]
      const LastDigitsSplit2 = mobileNumberSplit[2]
      const LastDigitsSplit3 = mobileNumberSplit[3]
      state.jointmobileNumber = action.payload
      state.jointmobileProviderCode = providerSplit1
      state.jointmobileLastDigits = (LastDigitsSplit2 ? LastDigitsSplit2 : '') + (LastDigitsSplit3 ? LastDigitsSplit3 : '')
    },
    setJointHomePhone: (state, action) => {
      const homeNumberSplit = action.payload.split(' ')
      const areaCodeSplit1 = homeNumberSplit[1]
      const LastDigitsSplit2 = homeNumberSplit[2]
      const LastDigitsSplit3 = homeNumberSplit[3]
      state.jointhomePhone = action.payload
      state.jointhomePhoneStdCode = areaCodeSplit1
      state.jointhomePhoneLastDigits = (LastDigitsSplit2 ? LastDigitsSplit2 : '') + (LastDigitsSplit3 ? LastDigitsSplit3 : '')
    },
    setJointWorkPhone: (state, action) => {
      const workNumberSplit = action.payload.split(' ')
      const areaCodeSplit1 = workNumberSplit[1]
      const LastDigitsSplit2 = workNumberSplit[2]
      const LastDigitsSplit3 = workNumberSplit[3]
      state.jointworkPhone = action.payload
      state.jointworkPhoneStdCode = areaCodeSplit1
      state.jointworkPhoneLastDigits = (LastDigitsSplit2 ? LastDigitsSplit2 : '') + (LastDigitsSplit3 ? LastDigitsSplit3 : '')
    },
    setJointFax: (state, action) => {
      state.jointfax = action.payload
    },
    setPrefContactType: (state, action) => {
      state.jointprefContactType = action.payload
    },

    // ******* Sovereign Current Address Setters ******* //

    setsovCurrentAddressType: (state, action) => {
      state.sovCurrentAddressType = action.payload
    },
    setsovCurrentAddressAlpha: (state, action) => {
      state.sovCurrentAddressAlpha = action.payload
    },
    setsovCurrentAddressapartment: (state, action) => {
      state.sovCurrentAddressapartment = action.payload
    },
    setsovCurrentAddressbuilding: (state, action) => {
      state.sovCurrentAddressbuilding = action.payload
    },
    setsovCurrentAddresscareOfName: (state, action) => {
      state.sovCurrentAddresscareOfName = action.payload
    },
    setsovCurrentAddresscity: (state, action) => {
      state.sovCurrentAddresscity = action.payload
    },
    setsovCurrentAddresscontactType: (state, action) => {
      state.sovCurrentAddresscontactType = action.payload
    },
    setsovCurrentAddresscountryCode: (state, action) => {
      state.sovCurrentAddresscountry.code = action.payload
    },
    setsovCurrentAddresscountryDescription: (state, action) => {
      state.sovCurrentAddresscountry.description = action.payload
    },
    setsovCurrentAddresseffective: (state, action) => {
      state.sovCurrentAddresseffective = action.payload
    },
    setsovCurrentAddressfloor: (state, action) => {
      state.sovCurrentAddressfloor = action.payload
    },
    setsovCurrentAddresspostCode: (state, action) => {
      state.sovCurrentAddresspostCode = action.payload
    },
    setsovCurrentAddresspurpose: (state, action) => {
      state.sovCurrentAddresspurpose = action.payload
    },
    setsovCurrentAddressstreetDirection: (state, action) => {
      state.sovCurrentAddressstreetDirection = action.payload
    },
    setsovCurrentAddressstreetNumberFrom: (state, action) => {
      state.sovCurrentAddressstreetNumber.from = action.payload
    },
    setsovCurrentAddressstreetNumberTo: (state, action) => {
      state.sovCurrentAddressstreetNumber.to = action.payload
    },
    setsovCurrentAddressstreetOrPostalName: (state, action) => {
      state.sovCurrentAddressstreetOrPostalName = action.payload
    },
    setsovCurrentAddressstreetType: (state, action) => {
      state.sovCurrentAddressstreetType = action.payload
    },
    setsovCurrentAddresssuburb: (state, action) => {
      state.sovCurrentAddresssuburb = action.payload
    },
    setsovCurrentAddressunitType: (state, action) => {
      state.sovCurrentAddressunitType = action.payload
    },
    setsovcurrResEffectiveDate: (state, action) => {
      state.sovcurrResEffectiveDate = action.payload
    },
    setsovcurrResYears: (state, action) => {
      state.sovcurrResYears = action.payload
    },
    setsovcurrResMonths: (state, action) => {
      state.sovcurrResMonths = action.payload
    },
    setsovcurrResLengthOfStayIsZero: (state, action) => {
      state.sovcurrResLengthOfStayIsZero = action.payload
    },

    setsovCurrentAddressId: (state, action) => {
      state.sovCurrentAddressId = action.payload
    },
    setsovCurrentAddressType: (state, action) => {
      state.sovCurrentAddressType = action.payload
    },
    setsovCurrentAddressAttributes: (state, action) => {
      state.sovCurrentAddressAttributes = action.payload
    },
    setsovCurrentAddressUpdate: (state, action) => {
      state.sovCurrentAddressUpdate = action.payload
    },
    setsovCurrentAddressExpire: (state, action) => {
      state.sovCurrentAddressExpire = action.payload
    },

    // ******* Sovereign Previous Address Setters ******* //

    setsovPreviousAddressType: (state, action) => {
      state.sovPreviousAddressType = action.payload
    },
    setsovPreviousAddressAlpha: (state, action) => {
      state.sovPreviousAddressAlpha = action.payload
    },
    setsovPreviousAddressapartment: (state, action) => {
      state.sovPreviousAddressapartment = action.payload
    },
    setsovPreviousAddressbuilding: (state, action) => {
      state.sovPreviousAddressbuilding = action.payload
    },
    setsovPreviousAddresscareOfName: (state, action) => {
      state.sovPreviousAddresscareOfName = action.payload
    },
    setsovPreviousAddresscity: (state, action) => {
      state.sovPreviousAddresscity = action.payload
    },
    setsovPreviousAddresscontactType: (state, action) => {
      state.sovPreviousAddresscontactType = action.payload
    },
    setsovPreviousAddresscountryCode: (state, action) => {
      state.sovPreviousAddresscountry.code = action.payload
    },
    setsovPreviousAddresscountryDescription: (state, action) => {
      state.sovPreviousAddresscountry.description = action.payload
    },
    setsovPreviousAddresseffective: (state, action) => {
      state.sovPreviousAddresseffective = action.payload
    },
    setsovPreviousAddressfloor: (state, action) => {
      state.sovPreviousAddressfloor = action.payload
    },
    setsovPreviousAddresspostCode: (state, action) => {
      state.sovPreviousAddresspostCode = action.payload
    },
    setsovPreviousAddresspurpose: (state, action) => {
      state.sovPreviousAddresspurpose = action.payload
    },
    setsovPreviousAddressstreetDirection: (state, action) => {
      state.sovPreviousAddressstreetDirection = action.payload
    },
    setsovPreviousAddressstreetNumberFrom: (state, action) => {
      state.sovPreviousAddressstreetNumber.from = action.payload
    },
    setsovPreviousAddressstreetNumberTo: (state, action) => {
      state.sovPreviousAddressstreetNumber.to = action.payload
    },
    setsovPreviousAddressstreetOrPostalName: (state, action) => {
      state.sovPreviousAddressstreetOrPostalName = action.payload
    },
    setsovPreviousAddressstreetType: (state, action) => {
      state.sovPreviousAddressstreetType = action.payload
    },
    setsovPreviousAddresssuburb: (state, action) => {
      state.sovPreviousAddresssuburb = action.payload
    },
    setsovPreviousAddressunitType: (state, action) => {
      state.sovPreviousAddressunitType = action.payload
    },
    setsovprevResEffectiveDate: (state, action) => {
      state.sovprevResEffectiveDate = action.payload
    },
    setsovprevResExpiryDate: (state, action) => {
      state.sovprevResExpiryDate = action.payload
    },
    setsovprevResYears: (state, action) => {
      state.sovprevResYears = action.payload
    },
    setsovprevResMonths: (state, action) => {
      state.sovprevResMonths = action.payload
    },
    setsovprevResLengthOfStayIsZero: (state, action) => {
      state.sovprevResLengthOfStayIsZero = action.payload
    },

    setsovPreviousAddressId: (state, action) => {
      state.sovPreviousAddressId = action.payload
    },
    setsovPreviousAddressType: (state, action) => {
      state.sovPreviousAddressType = action.payload
    },
    setsovPreviousAddressAttributes: (state, action) => {
      state.sovPreviousAddressAttributes = action.payload
    },
    setsovPreviousAddressUpdate: (state, action) => {
      state.sovPreviousAddressUpdate = action.payload
    },
    setsovPreviousAddressExpire: (state, action) => {
      state.sovPreviousAddressExpire = action.payload
    },

    // ******* Current Residence ******* //

    setCurrResEffDate: (state, action) => {
      state.currResidenceEffDate = action.payload
    },
    setCurrResidenceMonths: (state, action) => {
      state.currResidenceMonths = action.payload
    },

    // ************* Address Finder *************** //

    setCurrResAddressFinderConfig: (state, action) => {
      state.currResAddressFinderConfig = action.payload
    },
    setCurrResAddressSelectedAddress: (state, action) => {
      state.currResAddressSelectedAddress = action.payload
    },
    setCurrResAddressSelectedPxid: (state, action) => {
      state.currResAddressSelectedPxid = action.payload
    },

    // *************** Selected from Address Finder *************** //

    // To Display
    setCurrResAddressToDisplayLine1: (state, action) => {
      state.currResAddressToDisplayLine1 = action.payload
    },
    setCurrResAddressToDisplayLine2: (state, action) => {
      state.currResAddressToDisplayLine2 = action.payload
    },
    setCurrResAddressToDisplayLine3: (state, action) => {
      state.currResAddressToDisplayLine3 = action.payload
    },
    setCurrResAddressToDisplayLine4: (state, action) => {
      state.currResAddressToDisplayLine4 = action.payload
    },

    // To Send to Sovereign
    //1
    setCurrResAddressSelectedUnitType: (state, action) => {
      state.currResAddressSelectedUnitType = action.payload
    },
    //2
    setCurrResAddressSelectedApartment: (state, action) => {
      state.currResAddressSelectedApartment = action.payload
    },
    //3
    setCurrResAddressSelectedBuilding: (state, action) => {
      state.currResAddressSelectedBuilding = action.payload
    },
    //4
    setCurrResAddressSelectedStreetNumberFrom: (state, action) => {
      state.currResAddressSelectedStreetNumber.from = action.payload
    },
    //5
    setCurrResAddressSelectedStreetNumberTo: (state, action) => {
      state.currResAddressSelectedStreetNumber.to = action.payload
    },
    //6
    setCurrResAddressSelectedAlpha: (state, action) => {
      state.currResAddressSelectedAlpha = action.payload
    },
    //7
    setCurrResAddressSelectedStreetOrPostalName: (state, action) => {
      state.currResAddressSelectedStreetOrPostalName = action.payload
    },
    //8
    setCurrResAddressSelectedStreetDirection: (state, action) => {
      state.currResAddressSelectedStreetDirection = action.payload
    },
    //9
    setCurrResAddressSelectedStreetType: (state, action) => {
      state.currResAddressSelectedStreetType = action.payload
    },
    //10
    setCurrResAddressSelectedSuburb: (state, action) => {
      state.currResAddressSelectedSuburb = action.payload
    },
    //11
    setCurrResAddressSelectedCity: (state, action) => {
      state.currResAddressSelectedCity = action.payload
    },
    //12
    setCurrResAddressSelectedState: (state, action) => {
      state.currResAddressSelectedState = action.payload
    },
    //13
    setCurrResAddressSelectedPostCode: (state, action) => {
      state.currResAddressSelectedPostCode = action.payload
    },
    //14
    setCurrResAddressSelectedCountryCode: (state, action) => {
      state.currResAddressSelectedCountry.code = action.payload
    },
    //15
    setCurrResAddressSelectedCountryDesc: (state, action) => {
      state.currResAddressSelectedCountry.description = action.payload
    },

    // Prime
    setCurrHomeAddStreet: (state, action) => {
      state.currHomeAddStreet = action.payload
    },
    setCurrHomeAddSuburb: (state, action) => {
      state.currHomeAddSuburb = action.payload
    },
    setCurrHomeAddCity: (state, action) => {
      state.currHomeAddCity = action.payload
    },
    setCurrHomeAddPostCode: (state, action) => {
      state.currHomeAddPostCode = action.payload
    },
    setResidenceType: (state, action) => {
      state.residenceType = action.payload
    },
    setcurrResEffectiveDate: (state, action) => {
      state.currResEffectiveDate = action.payload
    },
    setcurrResTypeCode: (state, action) => {
      state.currResTypeCode = action.payload
    },
    setcurrResTypeDescription: (state, action) => {
      state.currResTypeDescription = action.payload
    },
    setCurrResYears: (state, action) => {
      state.currResYears = action.payload
      state.currResEffectiveDate.setFullYear(new Date().getFullYear() - action.payload)
    },
    setCurrResMonths: (state, action) => {
      state.currResMonths = action.payload
      state.currResEffectiveDate.setMonth(new Date().getMonth() - action.payload)
    },

    //* Joint

    setJointCurrResEffDate: (state, action) => {
      state.jointcurrResidenceEffDate = action.payload
    },
    setJointCurrResidenceMonths: (state, action) => {
      state.jointcurrResidenceMonths = action.payload
    },

    // ************* Address Finder *************** //

    setJointCurrResAddressFinderConfig: (state, action) => {
      state.jointcurrResAddressFinderConfig = action.payload
    },
    setJointCurrResAddressSelectedAddress: (state, action) => {
      state.jointcurrResAddressSelectedAddress = action.payload
    },
    setJointCurrResAddressSelectedPxid: (state, action) => {
      state.jointcurrResAddressSelectedPxid = action.payload
    },

    // *************** Selected from Address Finder *************** //

    // To Display
    setJointCurrResAddressToDisplayLine1: (state, action) => {
      state.jointcurrResAddressToDisplayLine1 = action.payload
    },
    setJointCurrResAddressToDisplayLine2: (state, action) => {
      state.jointcurrResAddressToDisplayLine2 = action.payload
    },
    setJointCurrResAddressToDisplayLine3: (state, action) => {
      state.jointcurrResAddressToDisplayLine3 = action.payload
    },
    setJointCurrResAddressToDisplayLine4: (state, action) => {
      state.jointcurrResAddressToDisplayLine4 = action.payload
    },

    // To Send to Sovereign
    setJointCurrResAddressSelectedUnitType: (state, action) => {
      state.jointcurrResAddressSelectedUnitType = action.payload
    },
    setJointCurrResAddressSelectedApartment: (state, action) => {
      state.jointcurrResAddressSelectedApartment = action.payload
    },
    setJointCurrResAddressSelectedBuilding: (state, action) => {
      state.jointcurrResAddressSelectedBuilding = action.payload
    },
    setJointCurrResAddressSelectedStreetNumberFrom: (state, action) => {
      state.jointcurrResAddressSelectedStreetNumber.from = action.payload
    },
    setJointCurrResAddressSelectedStreetNumberTo: (state, action) => {
      state.jointcurrResAddressSelectedStreetNumber.to = action.payload
    },
    setJointCurrResAddressSelectedAlpha: (state, action) => {
      state.jointcurrResAddressSelectedAlpha = action.payload
    },
    setJointCurrResAddressSelectedStreetOrPostalName: (state, action) => {
      state.jointcurrResAddressSelectedStreetOrPostalName = action.payload
    },
    setJointCurrResAddressSelectedStreetDirection: (state, action) => {
      state.jointcurrResAddressSelectedStreetDirection = action.payload
    },
    setJointCurrResAddressSelectedStreetType: (state, action) => {
      state.jointcurrResAddressSelectedStreetType = action.payload
    },
    setJointCurrResAddressSelectedSuburb: (state, action) => {
      state.jointcurrResAddressSelectedSuburb = action.payload
    },
    setJointCurrResAddressSelectedCity: (state, action) => {
      state.jointcurrResAddressSelectedCity = action.payload
    },
    setJointCurrResAddressSelectedState: (state, action) => {
      state.jointcurrResAddressSelectedState = action.payload
    },
    setJointCurrResAddressSelectedPostCode: (state, action) => {
      state.jointcurrResAddressSelectedPostCode = action.payload
    },
    setJointCurrResAddressSelectedCountryCode: (state, action) => {
      state.jointcurrResAddressSelectedCountry.code = action.payload
    },
    setJointCurrResAddressSelectedCountryDesc: (state, action) => {
      state.jointcurrResAddressSelectedCountry.description = action.payload
    },

    setJointCurrHomeAddStreet: (state, action) => {
      state.jointcurrHomeAddStreet = action.payload
    },
    setJointCurrHomeAddSuburb: (state, action) => {
      state.jointcurrHomeAddSuburb = action.payload
    },
    setJointCurrHomeAddCity: (state, action) => {
      state.jointcurrHomeAddCity = action.payload
    },
    setJointCurrHomeAddPostCode: (state, action) => {
      state.jointcurrHomeAddPostCode = action.payload
    },
    setJointResidenceType: (state, action) => {
      state.jointresidenceType = action.payload
    },
    setJointCurrResYears: (state, action) => {
      state.jointcurrResYears = action.payload
      state.jointcurrResEffectiveDate.setFullYear(new Date().getFullYear() - action.payload)
    },
    setJointCurrResMonths: (state, action) => {
      state.jointcurrResMonths = action.payload
      state.jointcurrResEffectiveDate.setMonth(new Date().getMonth() - action.payload)
    },

    // ******* Previous Residence ******* //

    //* Prime
    setPrevResidenceEffDate: (state, action) => {
      state.prevResidenceEffDate = action.payload
    },
    setPrevResidenceMonths: (state, action) => {
      state.prevResidenceMonths = action.payload
    },

    // ************* Address Finder *************** //

    setPrevResAddressFinderConfig: (state, action) => {
      state.prevResAddressFinderConfig = action.payload
    },
    setPrevResAddressSelectedAddress: (state, action) => {
      state.prevResAddressSelectedAddress = action.payload
    },
    setPrevResAddressSelectedPxid: (state, action) => {
      state.prevResAddressSelectedPxid = action.payload
    },

    // *************** Selected from Address Finder *************** //

    // To Display
    setPrevResAddressToDisplayLine1: (state, action) => {
      state.prevResAddressToDisplayLine1 = action.payload
    },
    setPrevResAddressToDisplayLine2: (state, action) => {
      state.prevResAddressToDisplayLine2 = action.payload
    },
    setPrevResAddressToDisplayLine3: (state, action) => {
      state.prevResAddressToDisplayLine3 = action.payload
    },
    setPrevResAddressToDisplayLine4: (state, action) => {
      state.prevResAddressToDisplayLine4 = action.payload
    },

    // To Send to Sovereign
    setPrevResAddressSelectedUnitType: (state, action) => {
      state.prevResAddressSelectedUnitType = action.payload
    },
    setPrevResAddressSelectedApartment: (state, action) => {
      state.prevResAddressSelectedApartment = action.payload
    },
    setPrevResAddressSelectedBuilding: (state, action) => {
      state.prevResAddressSelectedBuilding = action.payload
    },
    setPrevResAddressSelectedStreetNumberFrom: (state, action) => {
      state.prevResAddressSelectedStreetNumber.from = action.payload
    },
    setPrevResAddressSelectedStreetNumberTo: (state, action) => {
      state.prevResAddressSelectedStreetNumber.to = action.payload
    },
    setPrevResAddressSelectedAlpha: (state, action) => {
      state.prevResAddressSelectedAlpha = action.payload
    },
    setPrevResAddressSelectedStreetOrPostalName: (state, action) => {
      state.prevResAddressSelectedStreetOrPostalName = action.payload
    },
    setPrevResAddressSelectedStreetDirection: (state, action) => {
      state.prevResAddressSelectedStreetDirection = action.payload
    },
    setPrevResAddressSelectedStreetType: (state, action) => {
      state.prevResAddressSelectedStreetType = action.payload
    },
    setPrevResAddressSelectedSuburb: (state, action) => {
      state.prevResAddressSelectedSuburb = action.payload
    },
    setPrevResAddressSelectedCity: (state, action) => {
      state.prevResAddressSelectedCity = action.payload
    },
    setPrevResAddressSelectedState: (state, action) => {
      state.prevResAddressSelectedState = action.payload
    },
    setPrevResAddressSelectedPostCode: (state, action) => {
      state.prevResAddressSelectedPostCode = action.payload
    },
    setPrevResAddressSelectedCountryCode: (state, action) => {
      state.prevResAddressSelectedCountry.code = action.payload
    },
    setPrevResAddressSelectedCountryDesc: (state, action) => {
      state.prevResAddressSelectedCountry.description = action.payload
    },

    setSkipPrevResidence(state, action) {
      state.skipPrevResidence = action.payload
    },
    setPrevHomeAddStreet: (state, action) => {
      state.prevHomeAddStreet = action.payload
    },
    setPrevHomeAddSuburb: (state, action) => {
      state.prevHomeAddSuburb = action.payload
    },
    setPrevHomeAddCity: (state, action) => {
      state.prevHomeAddCity = action.payload
    },
    setPrevHomeAddPostCode: (state, action) => {
      state.prevHomeAddPostCode = action.payload
    },
    setprevResEffectiveDate: (state, action) => {
      state.prevResEffectiveDate = action.payload
    },
    setPrevResYears: (state, action) => {
      state.prevResYears = action.payload
      state.prevResEffectiveDate.setFullYear(new Date().getFullYear() - action.payload)
    },
    setPrevResMonths: (state, action) => {
      state.prevResMonths = action.payload
      state.prevResEffectiveDate.setMonth(new Date().getMonth() - action.payload)
    },

    // Joint

    setJointPrevResidenceEffDate: (state, action) => {
      state.jointprevResidenceEffDate = action.payload
    },
    setJointPrevResidenceMonths: (state, action) => {
      state.jointprevResidenceMonths = action.payload
    },

    // ************* Address Finder *************** //

    setJointPrevResAddressFinderConfig: (state, action) => {
      state.jointprevResAddressFinderConfig = action.payload
    },
    setJointPrevResAddressSelectedAddress: (state, action) => {
      state.jointprevResAddressSelectedAddress = action.payload
    },
    setJointPrevResAddressSelectedPxid: (state, action) => {
      state.jointprevResAddressSelectedPxid = action.payload
    },

    // *************** Selected from Address Finder *************** //

    // To Display
    setJointPrevResAddressToDisplayLine1: (state, action) => {
      state.jointprevResAddressToDisplayLine1 = action.payload
    },
    setJointPrevResAddressToDisplayLine2: (state, action) => {
      state.jointprevResAddressToDisplayLine2 = action.payload
    },
    setJointPrevResAddressToDisplayLine3: (state, action) => {
      state.jointprevResAddressToDisplayLine3 = action.payload
    },
    setJointPrevResAddressToDisplayLine4: (state, action) => {
      state.jointprevResAddressToDisplayLine4 = action.payload
    },

    // To Send to Sovereign
    setJointPrevResAddressSelectedUnitType: (state, action) => {
      state.jointprevResAddressSelectedUnitType = action.payload
    },
    setJointPrevResAddressSelectedApartment: (state, action) => {
      state.jointprevResAddressSelectedApartment = action.payload
    },
    setJointPrevResAddressSelectedBuilding: (state, action) => {
      state.jointprevResAddressSelectedBuilding = action.payload
    },
    setJointPrevResAddressSelectedStreetNumberFrom: (state, action) => {
      state.jointprevResAddressSelectedStreetNumber.from = action.payload
    },
    setJointPrevResAddressSelectedStreetNumberTo: (state, action) => {
      state.jointprevResAddressSelectedStreetNumber.to = action.payload
    },
    setJointPrevResAddressSelectedAlpha: (state, action) => {
      state.jointprevResAddressSelectedAlpha = action.payload
    },
    setJointPrevResAddressSelectedStreetOrPostalName: (state, action) => {
      state.jointprevResAddressSelectedStreetOrPostalName = action.payload
    },
    setJointPrevResAddressSelectedStreetDirection: (state, action) => {
      state.jointprevResAddressSelectedStreetDirection = action.payload
    },
    setJointPrevResAddressSelectedStreetType: (state, action) => {
      state.jointprevResAddressSelectedStreetType = action.payload
    },
    setJointPrevResAddressSelectedSuburb: (state, action) => {
      state.jointprevResAddressSelectedSuburb = action.payload
    },
    setJointPrevResAddressSelectedCity: (state, action) => {
      state.jointprevResAddressSelectedCity = action.payload
    },
    setJointPrevResAddressSelectedState: (state, action) => {
      state.jointprevResAddressSelectedState = action.payload
    },
    setJointPrevResAddressSelectedPostCode: (state, action) => {
      state.jointprevResAddressSelectedPostCode = action.payload
    },
    setJointPrevResAddressSelectedCountryCode: (state, action) => {
      state.jointprevResAddressSelectedCountry.code = action.payload
    },
    setJointPrevResAddressSelectedCountryDesc: (state, action) => {
      state.jointprevResAddressSelectedCountry.description = action.payload
    },

    setJointSkipPrevResidence(state, action) {
      state.jointskipPrevResidence = action.payload
    },
    setJointPrevHomeAddStreet: (state, action) => {
      state.jointprevHomeAddStreet = action.payload
    },
    setJointPrevHomeAddSuburb: (state, action) => {
      state.jointprevHomeAddSuburb = action.payload
    },
    setJointPrevHomeAddCity: (state, action) => {
      state.jointprevHomeAddCity = action.payload
    },
    setJointPrevHomeAddPostCode: (state, action) => {
      state.jointprevHomeAddPostCode = action.payload
    },
    setJointPrevResYears: (state, action) => {
      state.jointprevResYears = action.payload
      state.jointprevResEffectiveDate.setFullYear(new Date().getFullYear() - action.payload)
    },
    setJointPrevResMonths: (state, action) => {
      state.jointprevResMonths = action.payload
      state.jointprevResEffectiveDate.setMonth(new Date().getMonth() - action.payload)
    },

    // ******* Contact methods ******* //
    // Prime
    setNumberOfContactMethods: (state, action) => {
      state.numberOfContactMethods = action.payload
    },
    setOnSubmitYourContactDetails: (state, action) => {
      state.onSubmitYourContactDetails = action.payload
    },
    setIsValidYourContactDetails: (state, action) => {
      state.isValidYourContactDetails = action.payload
    },
    setOnSubmitResidenceDetails: (state, action) => {
      state.onSubmitResidenceDetails = action.payload
    },
    setIsValidResidenceDetails: (state, action) => {
      state.isValidResidenceDetails = action.payload
    },
    setOnSubmitPrevResidenceDetails: (state, action) => {
      state.onSubmitPrevResidenceDetails = action.payload
    },
    setIsValidPrevResidenceDetails: (state, action) => {
      state.isValidPrevResidenceDetails = action.payload
    },

    // Joint
    setJointNumberOfContactMethods: (state, action) => {
      state.jointnumberOfContactMethods = action.payload
    },
    setJointOnSubmitYourContactDetails: (state, action) => {
      state.jointonSubmitYourContactDetails = action.payload
    },
    setJointIsValidYourContactDetails: (state, action) => {
      state.jointisValidYourContactDetails = action.payload
    },
    setJointOnSubmitResidenceDetails: (state, action) => {
      state.jointonSubmitResidenceDetails = action.payload
    },
    setJointIsValidResidenceDetails: (state, action) => {
      state.jointisValidResidenceDetails = action.payload
    },
    setJointOnSubmitPrevResidenceDetails: (state, action) => {
      state.jointonSubmitPrevResidenceDetails = action.payload
    },
    setJointIsValidPrevResidenceDetails: (state, action) => {
      state.jointisValidPrevResidenceDetails = action.payload
    },

    // *********** Setters for Sovereign data checks ********** //

    setIsValidSovContactMethods: (state, action) => {
      state.isValidSovContactMethods = action.payload
    },
    setisValidSovMobileNumber: (state, action) => {
      state.isValidSovMobileNumber = action.payload
    },
    setisValidSovWorkPhoneNumber: (state, action) => {
      state.isValidSovWorkPhoneNumber = action.payload
    },
    setisValidSovHomePhoneNumber: (state, action) => {
      state.isValidSovHomePhoneNumber = action.payload
    },
    setisValidSovEmailAddress: (state, action) => {
      state.isValidSovEmailAddress = action.payload
    },
    setVerifiedContactDetailsSecure: (state, action) => {
      state.verifiedContactDetailsSecure = action.payload
    },
    setVerifiedResidentialDetailsSecure: (state, action) => {
      state.verifiedResidentialDetailsSecure = action.payload
    },
    setsovHasCurrentResidentialDetails: (state, action) => {
      state.sovHasCurrentResidentialDetails = action.payload
    },
    setsovHasPreviousResidentialDetails: (state, action) => {
      state.sovHasPreviousResidentialDetails = action.payload
    },
    setIsValidSovCurrentResidentialDetails: (state, action) => {
      state.isValidSovCurrentResidentialDetails = action.payload
    },
    setIsValidSovPreviousResidentialDetails: (state, action) => {
      state.isValidSovPreviousResidentialDetails = action.payload
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
          if (state.renderingPrime === true && state.renderingCurrentResidence === true) {
            state.currResAddressFinderCompletions = action.payload?.completions
            state.currResAddressFinderSucess = action.payload?.success
            state.loading = HTTP_STATUS.IDLE
            state.currentRequestId = null
            return
          }
          if (state.renderingPrime === true && state.renderingCurrentResidence === false) {
            state.prevResAddressFinderCompletions = action.payload?.completions
            state.prevResAddressFinderSucess = action.payload?.success
            state.loading = HTTP_STATUS.IDLE
            state.currentRequestId = null
            return
          }
          if (state.renderingPrime === false && state.renderingCurrentResidence === true) {
            state.jointcurrResAddressFinderCompletions = action.payload?.completions
            state.jointcurrResAddressFinderSucess = action.payload?.success
            state.loading = HTTP_STATUS.IDLE
            state.currentRequestId = null
            return
          }
          if (state.renderingPrime === false && state.renderingCurrentResidence === false) {
            state.jointprevResAddressFinderCompletions = action.payload?.completions
            state.jointprevResAddressFinderSucess = action.payload?.success
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
          if (state.renderingPrime === true && state.renderingCurrentResidence === true) {
            state.currResAddressSelectedMetaData = action.payload
            state.loadingMeta = HTTP_STATUS.IDLE
            state.currentRequestIdMeta = null
            return
          }
          if (state.renderingPrime === true && state.renderingCurrentResidence === false) {
            state.prevResAddressSelectedMetaData = action.payload
            state.loadingMeta = HTTP_STATUS.IDLE
            state.currentRequestIdMeta = null
            return
          }
          if (state.renderingPrime === false && state.renderingCurrentResidence === true) {
            state.jointcurrResAddressSelectedMetaData = action.payload
            state.loadingMeta = HTTP_STATUS.IDLE
            state.currentRequestIdMeta = null
            return
          }
          if (state.renderingPrime === false && state.renderingCurrentResidence === false) {
            state.jointprevResAddressSelectedMetaData = action.payload
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
      })
      .addCase(matchClient.pending, (state, action) => {
        if (state.matchClientLoadingMeta === 'IDLE') {
          state.matchClientLoadingMeta = HTTP_STATUS.PENDING
          state.matchClientCurrentRequestIdMeta = action.meta.requestId
        }
      })
      .addCase(matchClient.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.matchClientLoadingMeta === 'PENDING' && state.matchClientCurrentRequestIdMeta === requestId) {
          //*Do your thing
          // console.log('Payload: ', action.payload)
          // console.log('Meta: ', action.meta)
          // console.log('Type: ', action.type)
        }
      })
      .addCase(matchClient.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.matchClientLoadingMeta === 'PENDING' && state.matchClientCurrentRequestIdMeta === requestId) {
          state.matchClientLoadingMeta = 'IDLE'
          state.matchClientErrorMeta = action.error
          state.matchClientCurrentRequestIdMeta = null
        }
      })
  },
})

export const contactDetailsActions = contactDetailsSlice.actions
export default contactDetailsSlice
