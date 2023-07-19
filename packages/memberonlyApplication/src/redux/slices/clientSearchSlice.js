import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { HTTP_STATUS } from '../utils/apiConstants'

import { format, getTime, formatDistance, formatDistanceStrict, isAfter, sub, isDate, differenceInMonths } from 'date-fns'

const namespace = 'searchclientnumber'

const dobUpperLimit = new Date().setFullYear(new Date().getFullYear() - 18)

export const getPrimeClientGeneralDetails = createAsyncThunk(`${namespace}/getPrimeClientGeneralDetails`, async (primeclientGeneralDetailsConfig) => {
  return await axios(primeclientGeneralDetailsConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const updateInterestRateEstimation = createAsyncThunk(`${namespace}/updateInterestRateEstimation`, async (ireConfig) => {
  return await axios(ireConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const getJointClientGeneralDetails = createAsyncThunk(`${namespace}/getJointClientGeneralDetails`, async (jointclientGeneralDetailsConfig) => {
  return await axios(jointclientGeneralDetailsConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const initialState = {
  primeloading: HTTP_STATUS.IDLE,
  primecurrentRequestId: null,
  primeerror: null,

  jointloading: HTTP_STATUS.IDLE,
  jointcurrentRequestId: null,
  jointerror: null,

  ireloading: HTTP_STATUS.IDLE,
  irecurrentRequestId: null,
  ireerror: null,

  isJointLoan: 'N',

  //* PRIME BORROWER

  primeclientNumber: '',

  primeclientType: '',
  primedateOfBirth: null,
  primeforenames: '',
  primegender: '',
  primeid: '',
  primeloadedDate: null,
  primemaritalStatus: '',
  primerecordStatus: '',
  primesurname: '',
  primetitle: '',

  //IRE
  primeIreEstimate: {
    baseRate: 0,
    creditHistory: 0,
    discounts: {
      loyalty: 0,
      history: 0,
      products: 0,
    },
    estimatedInterestRate: 0,
    security: 0,
  },

  // Funding
  primeFunding: {
    s6Balance: 0,
    activeAccountCount: 0,
    settledAccountCount: 0,
  },

  // Lending
  primeLending: {
    totalExposure: 0,
    totalArrears: 0,
    activeAccountCount: 0,
    settledAccountCount: 0,
  },

  totalLoanExposureUpperLimit: 4000,

  // Recovery
  primeRecovery: {
    activeAccountCount: 0,
    inactiveAccountCount: 0,
    balance: 0,
  },

  // Security
  primeSecurity: {
    securityPercentage: 0,
  },

  //Constants
  primememberSinceInMonthsDefault: 3,

  //Checks
  primeisAdult: false,
  primeage: '',
  primedurationSinceJoined: '',
  primedurationSinceJoinedInMonths: '',
  primemissingDateOfBirth: '',
  primeeligibleForMemberOnlyLoans: false,

  //* CO-BORROWER

  jointclientNumber: '',

  jointclientType: '',
  jointdateOfBirth: null,
  jointforenames: '',
  jointgender: '',
  jointid: '',
  jointloadedDate: null,
  jointmaritalStatus: '',
  jointrecordStatus: '',
  jointsurname: '',
  jointtitle: '',

  // IRE
  jointIreEstimate: {
    baseRate: 0,
    creditHistory: 0,
    discounts: {
      loyalty: 0,
      history: 0,
      products: 0,
    },
    estimatedInterestRate: 0,
    security: 0,
  },

  // Funding
  jointFunding: {
    s6Balance: 0,
    activeAccountCount: 0,
    settledAccountCount: 0,
  },

  // Lending
  jointLending: {
    totalExposure: 0,
    totalArrears: 0,
    activeAccountCount: 0,
    settledAccountCount: 0,
  },

  // Recovery
  jointRecovery: {
    activeAccountCount: 0,
    inactiveAccountCount: 0,
    balance: 0,
  },

  // Security
  jointSecurity: {
    securityPercentage: 0,
  },

  //Constants
  jointmemberSinceInMonthsDefault: 3,

  //Checks
  jointisAdult: false,
  jointage: '',
  jointdurationSinceJoined: '',
  jointdurationSinceJoinedInMonths: '',
  jointmissingDateOfBirth: '',
  jointeligibleForMemberOnlyLoans: false,

  onSubmitQuestionJointApplicant: null,
  isValidQuestionJointApplicant: null,
}

const clientSearchSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setIsJointLoan: (state, action) => {
      state.isJointLoan = action.payload
    },
    setOnSubmitQuestionJointApplicant: (state, action) => {
      state.onSubmitQuestionJointApplicant = action.payload
    },
    setIsValidQuestionJointApplicant: (state, action) => {
      state.isValidQuestionJointApplicant = action.payload
    },

    //* Prime Borrower
    setPrimeClientNumber: (state, action) => {
      state.primeclientNumber = action.payload
    },
    setPrimeEligibleForMemberOnlyLoans: (state, action) => {
      state.primeeligibleForMemberOnlyLoans = action.payload
    },
    clearPrimeMemberDetails: (state, action) => {
      state.primeclientType = ''
      state.primedateOfBirth = null
      state.primeforenames = ''
      state.primegender = ''
      state.primeid = ''
      state.primeloadedDate = null
      state.primemaritalStatus = ''
      state.primerecordStatus = ''
      state.primesurname = ''
      state.primetitle = ''
      state.primeisAdult = false
      state.primeage = ''
      state.primedurationSinceJoined = ''
      state.primedurationSinceJoinedInMonths = ''
      state.primemissingDateOfBirth = ''
      state.primeeligibleForMemberOnlyLoans = false
    },

    //* Co-Borrower
    setJointClientNumber: (state, action) => {
      state.jointclientNumber = action.payload
    },
    setJointEligibleForMemberOnlyLoans: (state, action) => {
      state.jointeligibleForMemberOnlyLoans = action.payload
    },
    clearJointMemberDetails: (state, action) => {
      state.jointclientType = ''
      state.jointdateOfBirth = null
      state.jointforenames = ''
      state.jointgender = ''
      state.jointid = ''
      state.jointloadedDate = null
      state.jointmaritalStatus = ''
      state.jointrecordStatus = ''
      state.jointsurname = ''
      state.jointtitle = ''
      state.jointisAdult = false
      state.jointage = ''
      state.jointdurationSinceJoined = ''
      state.jointdurationSinceJoinedInMonths = ''
      state.jointmissingDateOfBirth = ''
      state.jointeligibleForMemberOnlyLoans = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPrimeClientGeneralDetails.pending, (state, action) => {
        if (state.primeloading === 'IDLE') {
          state.primeloading = HTTP_STATUS.PENDING
          state.primecurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getPrimeClientGeneralDetails.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.primeloading === 'PENDING' && state.primecurrentRequestId === requestId) {
          state.primeloading = HTTP_STATUS.IDLE

          console.log('Prime Borrower Data: ', action.payload)

          const response = action.payload?.axiosResponse
          const generalDetails = response?.generalDetails
          const IRE_estimate = response?.IRE_estimate
          const funding = response?.funding
          const lending = response?.lending
          const recovery = response?.recovery
          const securityEvaluation = response?.securityEvaluation

          // Personal Details
          state.primeid = generalDetails?.id
          state.primeclientType = generalDetails?.clientType
          state.primerecordStatus = generalDetails?.status
          state.primetitle = generalDetails?.title
          state.primesurname = generalDetails?.surname
          state.primeforenames = generalDetails?.forenames
          state.primegender = generalDetails?.gender
          state.primedateOfBirth = generalDetails?.dateOfBirth
          state.primemaritalStatus = generalDetails?.maritalStatus
          state.primeloadedDate = generalDetails?.loadedDate

          // IRE
          state.primeIreEstimate.baseRate = IRE_estimate?.Base
          state.primeIreEstimate.discounts.history = IRE_estimate?.Discounts?.History
          state.primeIreEstimate.discounts.loyalty = IRE_estimate?.Discounts?.Loyalty
          state.primeIreEstimate.discounts.products = IRE_estimate?.Discounts?.Products
          state.primeIreEstimate.estimatedInterestRate = IRE_estimate?.Estimated_interest_rate
          state.primeIreEstimate.security = IRE_estimate?.Security
          state.primeIreEstimate.creditHistory = IRE_estimate?.creditHistory

          // Funding
          state.primeFunding.activeAccountCount = funding?.Total_accounts_active
          state.primeFunding.settledAccountCount = funding?.Total_accounts_settled
          state.primeFunding.s6Balance = funding?.s6

          // Lending
          state.primeLending.activeAccountCount = lending?.Total_accounts_active
          state.primeLending.settledAccountCount = lending?.Total_accounts_settled
          state.primeLending.totalExposure = lending?.Total_outstanding
          state.primeLending.totalArrears = lending?.Total_arrears

          // Recovery
          state.primeRecovery.activeAccountCount = recovery?.Total_active
          state.primeRecovery.inactiveAccountCount = recovery?.Total_inactive
          state.primeRecovery.balance = recovery?.Total_balance

          // Security
          state.primeSecurity.securityPercentage = securityEvaluation?.securityPercentage

          // Set Utility States
          if (action.payload?.axiosResponse?.generalDetails?.id) {
            if (new Date(generalDetails?.dateOfBirth) && !(generalDetails?.dateOfBirth === '')) {
              state.primeisAdult = isAfter(new Date(dobUpperLimit), new Date(generalDetails?.dateOfBirth))
              state.primeage = formatDistance(new Date(generalDetails?.dateOfBirth), new Date())
              state.primemissingDateOfBirth = false
            } else {
              state.primemissingDateOfBirth = true
            }
            if (isDate(new Date(generalDetails?.loadedDate))) {
              state.primedurationSinceJoined = formatDistance(new Date(generalDetails?.loadedDate), new Date())
              state.primedurationSinceJoinedInMonths = differenceInMonths(new Date(), new Date(generalDetails?.loadedDate))
            }
          }
        }
      })
      .addCase(getPrimeClientGeneralDetails.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.primeloading === 'PENDING' && state.primecurrentRequestId === requestId) {
          state.primeloading = 'IDLE'
          state.primeerror = action.error
          state.primecurrentRequestId = null

          console.log('Rejected Error: ', action.error)
          console.log('Rejected Payload: ', action.payload)
          console.log('Rejected meta: ', action.meta)
          console.log('Rejected Type: ', action.type)
        }
      })

      //!-------------------------------- CO-BORROWER ---------------------------------------//

      //* CO-BORROWER
      .addCase(getJointClientGeneralDetails.pending, (state, action) => {
        if (state.jointloading === 'IDLE') {
          state.jointloading = HTTP_STATUS.PENDING
          state.jointcurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getJointClientGeneralDetails.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.jointloading === 'PENDING' && state.jointcurrentRequestId === requestId) {
          state.jointloading = HTTP_STATUS.IDLE

          const response = action.payload?.axiosResponse
          const generalDetails = response?.generalDetails
          const IRE_estimate = response?.IRE_estimate
          const funding = response?.funding
          const lending = response?.lending
          const recovery = response?.recovery
          const securityEvaluation = response?.securityEvaluation

          // Personal Details
          state.jointid = generalDetails?.id
          state.jointclientType = generalDetails?.clientType
          state.jointrecordStatus = generalDetails?.status
          state.jointtitle = generalDetails?.title
          state.jointsurname = generalDetails?.surname
          state.jointforenames = generalDetails?.forenames
          state.jointgender = generalDetails?.gender
          state.jointdateOfBirth = generalDetails?.dateOfBirth
          state.jointmaritalStatus = generalDetails?.maritalStatus
          state.jointloadedDate = generalDetails?.loadedDate

          // IRE
          state.jointIreEstimate.baseRate = IRE_estimate?.Base
          state.jointIreEstimate.discounts.history = IRE_estimate?.Discounts?.History
          state.jointIreEstimate.discounts.loyalty = IRE_estimate?.Discounts?.Loyalty
          state.jointIreEstimate.discounts.products = IRE_estimate?.Discounts?.Products
          state.jointIreEstimate.estimatedInterestRate = IRE_estimate?.Estimated_interest_rate
          state.jointIreEstimate.security = IRE_estimate?.Security
          state.jointIreEstimate.creditHistory = IRE_estimate?.creditHistory

          // Funding
          state.jointFunding.activeAccountCount = funding?.Total_accounts_active
          state.jointFunding.settledAccountCount = funding?.Total_accounts_settled
          state.jointFunding.s6Balance = funding?.s6

          // Lending
          state.jointLending.activeAccountCount = lending?.Total_accounts_active
          state.jointLending.settledAccountCount = lending?.Total_accounts_settled
          state.jointLending.totalExposure = lending?.Total_outstanding
          state.jointLending.totalArrears = lending?.Total_arrears

          // Recovery
          state.jointRecovery.activeAccountCount = recovery?.Total_active
          state.jointRecovery.inactiveAccountCount = recovery?.Total_inactive
          state.jointRecovery.balance = recovery?.Total_balance

          // Security
          state.jointSecurity.securityPercentage = securityEvaluation?.securityPercentage

          // Set Utility States
          if (action.payload?.axiosResponse?.generalDetails?.id) {
            if (isDate(new Date(action.payload?.axiosResponse?.generalDetails?.dateOfBirth)) && !(action.payload?.axiosResponse?.generalDetails?.dateOfBirth === '')) {
              state.jointisAdult = isAfter(new Date(dobUpperLimit), new Date(action.payload?.axiosResponse?.generalDetails?.dateOfBirth))
              state.jointage = formatDistance(new Date(action.payload?.axiosResponse?.generalDetails?.dateOfBirth), new Date())
              state.jointmissingDateOfBirth = false
            } else {
              state.jointmissingDateOfBirth = true
            }
            if (isDate(new Date(action.payload?.axiosResponse?.generalDetails?.loadedDate))) {
              state.jointdurationSinceJoined = formatDistance(new Date(action.payload?.axiosResponse?.generalDetails?.loadedDate), new Date())
              state.jointdurationSinceJoinedInMonths = differenceInMonths(new Date(), new Date(action.payload?.axiosResponse?.generalDetails?.loadedDate))
            }
          }
        }
      })
      .addCase(getJointClientGeneralDetails.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.jointloading === 'PENDING' && state.jointcurrentRequestId === requestId) {
          state.jointloading = 'IDLE'
          state.jointerror = action.error
          state.jointcurrentRequestId = null

          console.log('Rejected Error: ', action.error)
          console.log('Rejected Payload: ', action.payload)
          console.log('Rejected meta: ', action.meta)
          console.log('Rejected Type: ', action.type)
        }
      })

      //* Interest Rate Estimate Update
      .addCase(updateInterestRateEstimation.pending, (state, action) => {
        if (state.ireloading === 'IDLE') {
          state.ireloading = HTTP_STATUS.PENDING
          state.irecurrentRequestId = action.meta.requestId
        }
      })
      .addCase(updateInterestRateEstimation.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.ireloading === 'PENDING' && state.irecurrentRequestId === requestId) {
          state.ireloading = HTTP_STATUS.IDLE

          console.log('IRE Result: ', action.payload)

          const response = action.payload?.axiosResponse?.IRE_estimate

          state.primeIreEstimate.creditHistory = response?.creditHistory

          state.primeIreEstimate.estimatedInterestRate = response?.Estimated_interest_rate
        }
      })
      .addCase(updateInterestRateEstimation.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.ireloading === 'PENDING' && state.irecurrentRequestId === requestId) {
          state.ireloading = 'IDLE'
          state.ireerror = action.error
          state.irecurrentRequestId = null

          console.log('Rejected Error: ', action.error)
          console.log('Rejected Payload: ', action.payload)
          console.log('Rejected meta: ', action.meta)
          console.log('Rejected Type: ', action.type)
        }
      })
  },
})

export const clientSearchActions = clientSearchSlice.actions
export default clientSearchSlice
