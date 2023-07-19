import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'loanDetails'

export const getPayoutQuote = createAsyncThunk(`${namespace}/getPayoutQuote`, async (payoutQuoteConfig) => {
  return await axios(payoutQuoteConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const createPayoutQuote = createAsyncThunk(`${namespace}/createPayoutQuote`, async (createPayoutQuoteConfig) => {
  return await axios(createPayoutQuoteConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const initialState = {
  payoutquoteloading: HTTP_STATUS.IDLE,
  payoutquoteerror: HTTP_STATUS.IDLE,
  payoutquotecurrentRequestId: null,

  createpayoutquoteloading: HTTP_STATUS.IDLE,
  createpayoutquoteerror: HTTP_STATUS.IDLE,
  createpayoutquotecurrentRequestId: null,

  //* Portal
  showSummary: true,

  // Loan Details
  requestedLoanAmount: 1000,
  memberOnlyLoanThreshold: 4000,
  payoutLendingAccountNumber: '',
  documentationType: '',
  documentationTypes: [],

  // Interest Rates

  baseInterestRate: 13.95,
  creditHistory: '',
  security: '',
  estimatedInterestRate: '',

  membershipLoyaltyDiscountCheck: false,
  loanHistCreditCheckDiscountCheck: false,
  threrOrMoreProductDiscountCheck: false,

  //Repayments
  paymentFrequency: 'W',
  numberOfDaysUpperLimitFromToday: 40,
  dayOfWeek: '',
  firstPaymentDate: '',
  loanTerm: 12,
  creditBeingSought: 0,

  // Loan Detials Summary
  existingLoan: 1000,
  applicationFee: 10.0,
  creditReportAndDocusign: 5.0,
  finalCalculatedInterestRate: 0.0,

  payoutAcc_arrearsBalance: 0,
  payoutAcc_balanceOutstanding: 0,
  payoutAcc_bankAccountNumber: null,
  payoutAcc_client: null,
  payoutAcc_contractEffectiveDate: '',
  payoutAcc_externalAccountNumber: null,
  payoutAcc_productDescription: null,
  payoutAcc_reportingName: null,
  payoutAcc_startDate: '',
  payoutAcc_status: '',
  payoutAcc_statusCode: '',

  payoutQuote_created: null,
  payoutQuote_eodRunning: null,
  payoutQuote_lsqId: null,
  payoutQuote_reasonDesc: null,
  payoutQuote_reasonSubDesc: null,
  payoutQuote_rebateAmount: null,
  payoutQuote_settlementAmount: null,
  payoutQuote_validThruDate: null,

  onSubmitLoanDetails: null,
  isValidLoanDetails: null,
}

const loanDetailsSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    // Portal
    setShowSummary: (state, action) => {
      state.showSummary = action.payload
    },
    resetLoanDetails: (state, action) => {
      state.requestedLoanAmount = 1000
      state.documentationType = ''
      state.documentationTypes = []
      state.baseInterestRate = 13.95
      state.creditHistory = ''
      state.security = ''
      state.estimatedInterestRate = ''
      state.membershipLoyaltyDiscountCheck = false
      state.loanHistCreditCheckDiscountCheck = false
      state.threrOrMoreProductDiscountCheck = false
      state.paymentFrequency = 'W'
      state.loanTerm = 12
      state.creditBeingSought = 0
    },
    // Loan Details
    setRequestedLoanAmount: (state, action) => {
      state.requestedLoanAmount = action.payload
    },
    setPayoutLendingAccountNumber: (state, action) => {
      state.payoutLendingAccountNumber = action.payload
    },
    setDocumentationType: (state, action) => {
      state.documentationType = action.payload
    },
    setDayOfWeek: (state, action) => {
      state.dayOfWeek = action.payload
    },
    setFirstPaymentDate: (state, action) => {
      state.firstPaymentDate = action.payload
    },
    setDocumentationTypes: (state, action) => {
      const selectedKey = action.payload[0]?.key

      if (state.documentationTypes.length === 0) {
        state.documentationTypes = action.payload
        return
      }

      const includesSelectedKey = state.documentationTypes.some((item) => {
        return item?.key === action.payload[0]?.key
      })

      if (includesSelectedKey) {
        const filteredList = state.documentationTypes.filter((item) => {
          return item?.key != selectedKey
        })

        state.documentationTypes = filteredList
      } else {
        state.documentationTypes.push(action.payload[0])
      }
    },

    setPayoutQuote_created: (state, action) => {
      state.payoutQuote_created = action.payload
    },

    //* Interest Rates
    setBaseRateInterest: (state, action) => {
      state.baseInterestRate = action.payload
    },
    setCreditHistory: (state, action) => {
      state.creditHistory = action.payload
    },
    setSecurity: (state, action) => {
      state.security = action.payload
    },
    setEstimatedInterestRate: (state, action) => {
      state.estimatedInterestRate = action.payload
    },

    setMembershipLoyaltyDiscountCheck: (state, action) => {
      state.membershipLoyaltyDiscountCheck = action.payload
    },
    setLoanHistCreditCheckDiscountCheck: (state, action) => {
      state.loanHistCreditCheckDiscountCheck = action.payload
    },
    setThreeOrMoreProductsDiscountCheck: (state, action) => {
      state.threrOrMoreProductDiscountCheck = action.payload
    },

    // Repayments
    setPaymentFrequency: (state, action) => {
      state.paymentFrequency = action.payload
    },
    setLoanTerm: (state, action) => {
      state.loanTerm = action.payload
    },
    setCreditBeingSought: (state, action) => {
      state.creditBeingSought = action.payload
    },

    setFinalCalculatedInterestRate: (state, action) => {
      state.finalCalculatedInterestRate = action.payload
    },

    // Submission Details
    setOnSubmitLoanDetails: (state, action) => {
      state.onSubmitLoanDetails = action.payload
    },
    setIsValidLoanDetails: (state, action) => {
      state.isValidLoanDetails = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPayoutQuote.pending, (state, action) => {
        if (state.payoutquoteloading === 'IDLE') {
          state.payoutquoteloading = HTTP_STATUS.PENDING
          state.payoutquotecurrentRequestId = action.meta.requestId
        }
      })
      .addCase(getPayoutQuote.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.payoutquoteloading === 'PENDING' && state.payoutquotecurrentRequestId === requestId) {
          state.payoutquoteloading = HTTP_STATUS.IDLE

          console.log('Payout Quote Data Data: ', action.payload)

          const payoutResult = action.payload?.axiosResponse[0]

          state.payoutAcc_arrearsBalance = payoutResult?.arrearsBalance
          state.payoutAcc_balanceOutstanding = payoutResult?.balanceOutstanding
          state.payoutAcc_bankAccountNumber = payoutResult?.bankAccountNumber
          state.payoutAcc_client = payoutResult?.client
          state.payoutAcc_contractEffectiveDate = payoutResult?.contractEffectiveDate
          state.payoutAcc_externalAccountNumber = payoutResult?.externalAccountNumber
          state.payoutAcc_productDescription = payoutResult?.productDescription
          state.payoutAcc_reportingName = payoutResult?.reportingName
          state.payoutAcc_startDate = payoutResult?.startDate
          state.payoutAcc_status = payoutResult?.status
          state.payoutAcc_statusCode = payoutResult?.statusCode
        }
      })
      .addCase(getPayoutQuote.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.payoutquoteloading === 'PENDING' && state.payoutquotecurrentRequestId === requestId) {
          state.payoutquoteloading = 'IDLE'
          state.payoutquoteerror = action.error
          state.payoutquotecurrentRequestId = null

          console.log('Rejected Error: ', action.error)
          console.log('Rejected Payload: ', action.payload)
          console.log('Rejected meta: ', action.meta)
          console.log('Rejected Type: ', action.type)
        }
      })

      //? Create a Payout quote for the account
      .addCase(createPayoutQuote.pending, (state, action) => {
        if (state.createpayoutquoteloading === 'IDLE') {
          state.createpayoutquoteloading = HTTP_STATUS.PENDING
          state.createpayoutquotecurrentRequestId = action.meta.requestId
        }
      })
      .addCase(createPayoutQuote.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.createpayoutquoteloading === 'PENDING' && state.createpayoutquotecurrentRequestId === requestId) {
          state.createpayoutquoteloading = HTTP_STATUS.IDLE

          console.log('Create Payout Quote Data: ', action.payload)

          const createPayoutResponse = action.payload?.axiosResponse?.body?.data?.attributes

          // if (createPayoutResponse?.settlementAmount != 0) {
          //   state.payoutQuote_created = true
          // }

          state.payoutQuote_eodRunning = createPayoutResponse?.eodRunning
          state.payoutQuote_lsqId = createPayoutResponse?.lsqId
          state.payoutQuote_reasonDesc = createPayoutResponse?.reasonDesc
          state.payoutQuote_reasonSubDesc = createPayoutResponse?.reasonSubDesc
          state.payoutQuote_rebateAmount = createPayoutResponse?.rebateAmount
          state.payoutQuote_settlementAmount = createPayoutResponse?.settlementAmount
          state.payoutQuote_validThruDate = createPayoutResponse?.validThruDate
        }
      })
      .addCase(createPayoutQuote.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.createpayoutquoteloading === 'PENDING' && state.createpayoutquotecurrentRequestId === requestId) {
          state.createpayoutquoteloading = 'IDLE'
          state.createpayoutquoteerror = action.error
          state.createpayoutquotecurrentRequestId = null

          console.log('Rejected Error: ', action.error)
          console.log('Rejected Payload: ', action.payload)
          console.log('Rejected meta: ', action.meta)
          console.log('Rejected Type: ', action.type)
        }
      })
  },
})

export const loanDetailsActions = loanDetailsSlice.actions
export default loanDetailsSlice
