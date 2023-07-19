import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'additionalInfoPart2'

export const initialState = {
  Loading: HTTP_STATUS.IDLE,
  Error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  loanPurposeCode: '',
  tradingBranch: '',
  inquiryMadeToAmtRequested: '',
  inquiryMadeToObtainQuotes: '',
  inquiryMadeToDateNeededBy: '',
  inquiryMadeToOtherLoanProductsThatMayMeetNeed: '',
  inquiryMadeToOtherLoanProductsThatMayMeetNeedComment: '',
  qualifyForMbroAndPern: '',
  didMemberAcceptMbro: '',
  whyMemberAcceptedMbro: '',
  ninetyDayBankStatementObtained: '',
  otherInquiries: '',
  otherInquiriesComments: '',

  isCreditUsedForRefinance: '',
  isCreditUsedForRefinanceComments: '',

  isMemberHappyWithQuote: '',
  anyOtherComments: '',

  onSubmitAddtionInfoPart2: null,
  isValidAdditionalInfoPart2: null,
}

const additionalInfoPart2Slice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setLoanPurposeCode: (state, action) => {
      state.loanPurposeCode = action.payload
    },
    setTradingBranch: (state, action) => {
      state.tradingBranch = action.payload
    },
    setInquiryMadeToAmtRequested: (state, action) => {
      state.inquiryMadeToAmtRequested = action.payload
    },
    setInquiryMadeToObtainQuotes: (state, action) => {
      state.inquiryMadeToObtainQuotes = action.payload
    },
    setInquiryMadeToDateNeededBy: (state, action) => {
      state.inquiryMadeToDateNeededBy = action.payload
    },
    clearSustainabilityPart2Details: (state, action) => {
      state.loanPurposeCode = ''
      state.tradingBranch = ''
      state.inquiryMadeToAmtRequested = ''
      state.inquiryMadeToObtainQuotes = ''
      state.inquiryMadeToDateNeededBy = ''
      state.inquiryMadeToOtherLoanProductsThatMayMeetNeedComment = ''
      state.qualifyForMbroAndPern = ''
      state.didMemberAcceptMbro = ''
      state.whyMemberAcceptedMbro = ''
      state.ninetyDayBankStatementObtained = ''
      state.otherInquiries = ''
      state.otherInquiriesComments = ''

      state.isCreditUsedForRefinance = ''
      state.isCreditUsedForRefinanceComments = ''

      state.isMemberHappyWithQuote = ''
      state.anyOtherComments = ''
    },

    setInquiryMadeToOtherLoanProductsThatMayMeetNeed: (state, action) => {
      state.inquiryMadeToOtherLoanProductsThatMayMeetNeed = action.payload
    },
    setInquiryMadeToOtherLoanProductsThatMayMeetNeedComment: (state, action) => {
      state.inquiryMadeToOtherLoanProductsThatMayMeetNeedComment = action.payload
    },
    setQualifyForMbroAndPern: (state, action) => {
      state.qualifyForMbroAndPern = action.payload
    },
    setDidMemberAcceptMbro: (state, action) => {
      state.didMemberAcceptMbro = action.payload
    },
    setWhyMemberAcceptedMbro: (state, action) => {
      state.whyMemberAcceptedMbro = action.payload
    },
    setNinetyDayBankStatementObtained: (state, action) => {
      state.ninetyDayBankStatementObtained = action.payload
    },
    setOtherInquiries: (state, action) => {
      state.otherInquiries = action.payload
    },
    setOtherInquiriesComments: (state, action) => {
      state.otherInquiriesComments = action.payload
    },
    setIsCreditUsedForRefinance: (state, action) => {
      state.isCreditUsedForRefinance = action.payload
    },
    setIsCreditUsedForRefinanceComments: (state, action) => {
      state.isCreditUsedForRefinanceComments = action.payload
    },
    setIsMemberHappyWithQuote: (state, action) => {
      state.isMemberHappyWithQuote = action.payload
    },

    setAnyOtherComments: (state, action) => {
      state.anyOtherComments = action.payload
    },
    setOnSubmitAddtionInfoPart2: (state, action) => {
      state.onSubmitAddtionInfoPart2 = action.payload
    },
    setIsValidAdditionalInfoPart2: (state, action) => {
      state.isValidAdditionalInfoPart2 = action.payload
    },
  },
})

export const additionalInfoPart2Actions = additionalInfoPart2Slice.actions
export default additionalInfoPart2Slice
