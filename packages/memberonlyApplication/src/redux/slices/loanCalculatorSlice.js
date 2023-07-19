import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'loanCalculator'

export const getRepaymentDetails = createAsyncThunk(`${namespace}/getRepaymentDetails`, async (repaymentConfig) => {
  return await axios(repaymentConfig)
    .then(function (response) {
      return { axiosResponse: response.data }
    })
    .catch(function (error) {
      return { error: error }
    })
})

export const initialState = {
  loading: HTTP_STATUS.IDLE,
  error: HTTP_STATUS.IDLE,
  currentRequestId: null,

  //* Other Data
  lncalc_AmountFinanced: 0,
  lncalc_AmountPayable: 0,
  lncalc_costOfGoodsValue: 0,
  lncalc_disclosedRate: 0,

  //* Fees
  feeCharged: null,

  //* Amortisation
  lncalc_Instalments: [],

  //* Breakdown Totals
  lncalc_InstalmentBreakdownTotal: {
    gst: 0.0,
    interest: 0.0,
    nonCapitalisedFees: 0.0,
    principal: 0.0,
  },

  //* All Instalments but Final
  lncalc_InstalmentAmount: 0.0,
  lncalc_InstalmentType: '',
  lncalc_InstalmentStartDate: '',
  lncalc_InstalmentEndDate: '',
  lncalc_NumberofInstalments: null,

  //* Final Instalment
  lncalc_FinalInstalmentAmount: 0.0,
  lncalc_FinalInstalmentType: '',
  lncalc_FinalInstalmentStartDate: '',
  lncalc_FinalInstalmentEndDate: '',
  lncalc_FinalInstalmentCount: '',

  //* Interest
  lncalc_InterestAmount: 0.0,
  lncalc_InterestRate: 0.0,

  lncalc_MaturityDate: '',

  lncalc_PaymentFrequency: {
    value: 1,
    unit: '',
  },

  lncalc_PrimaryClientType: '',
  lncalc_ProductCode: '',

  lncalc_RepaymentOptionsWeekly: {
    firstPaymentDate: '',
    numberOfPayments: null,
    paymentAmount: null,
  },

  lncalc_RepaymentOptionsFortnightly: {
    firstPaymentDate: '',
    numberOfPayments: null,
    paymentAmount: null,
  },

  lncalc_RepaymentOptionsMonthly: {
    firstPaymentDate: '',
    numberOfPayments: null,
    paymentAmount: null,
  },

  lncalc_ResidualValue: 0.0,
  lncalc_SettlementDate: '',
  lncalc_Term: {
    unit: '',
    value: 0.0,
  },
}

const loanCalculatorSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRepaymentDetails.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(getRepaymentDetails.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = HTTP_STATUS.IDLE

          console.log('REPAYMENT RESPONSE: ', action.payload)

          const response = action.payload?.axiosResponse?.body?.data?.attributes
          const instalmentBreakdownTotals = action.payload?.axiosResponse?.body?.data?.attributes?.instalmentBreakdown?.total
          const allButLastInstalment = action.payload?.axiosResponse?.body?.data?.attributes?.instalmentSummary[0]
          const finalInstalment = action.payload?.axiosResponse?.body?.data?.attributes?.instalmentSummary[1]
          const repaymentOptions = action.payload?.axiosResponse?.body?.data?.attributes?.repaymentOptions

          state.lncalc_AmountFinanced = response?.amountFinanced
          state.lncalc_AmountPayable = response?.amountPayable
          state.lncalc_costOfGoodsValue = response?.costOfGoods?.value
          state.lncalc_disclosedRate = response?.disclosedRate
          state.lncalc_Instalments = response?.instalmentBreakdown?.instalments

          const lnCalc_fees = response?.fees?.fee
          let feeSum = 0

          if (lnCalc_fees?.length != 0 && !(lnCalc_fees == null)) {
            lnCalc_fees.forEach((fee) => {
              feeSum = feeSum + fee?.amount
            })
          }

          state.feeCharged = feeSum

          state.lncalc_InstalmentBreakdownTotal.gst = instalmentBreakdownTotals?.gst
          state.lncalc_InstalmentBreakdownTotal.interest = instalmentBreakdownTotals?.interest
          state.lncalc_InstalmentBreakdownTotal.nonCapitalisedFees = instalmentBreakdownTotals?.nonCapitalisedFees
          state.lncalc_InstalmentBreakdownTotal.principal = instalmentBreakdownTotals?.principal

          state.lncalc_InstalmentAmount = allButLastInstalment?.amount
          state.lncalc_InstalmentType = allButLastInstalment?.instalmentType
          state.lncalc_InstalmentStartDate = allButLastInstalment?.startDate
          state.lncalc_InstalmentEndDate = allButLastInstalment?.endDate
          state.lncalc_NumberofInstalments = allButLastInstalment?.numberOfInstalments

          state.lncalc_FinalInstalmentAmount = finalInstalment?.amount
          state.lncalc_FinalInstalmentType = finalInstalment?.instalmentType
          state.lncalc_FinalInstalmentStartDate = finalInstalment?.startDate
          state.lncalc_FinalInstalmentEndDate = finalInstalment?.endDate
          state.lncalc_FinalInstalmentCount = finalInstalment?.numberOfInstalments

          state.lncalc_InterestAmount = response?.interestAmount
          state.lncalc_InterestRate = response?.interestRate
          state.lncalc_MaturityDate = response?.maturityDate
          state.lncalc_PaymentFrequency.value = response?.paymentFrequency?.value
          state.lncalc_PaymentFrequency.unit = response?.paymentFrequency?.unit
          state.lncalc_PrimaryClientType = response?.primaryClientType
          state.lncalc_ProductCode = response?.productCode

          //* Weekly Payment
          if (repaymentOptions?.firstWeeklyPaymentDate) {
            state.lncalc_RepaymentOptionsWeekly.firstPaymentDate = repaymentOptions?.firstWeeklyPaymentDate
            state.lncalc_RepaymentOptionsWeekly.numberOfPayments = repaymentOptions?.numberOfWeeklyPayments
            state.lncalc_RepaymentOptionsWeekly.paymentAmount = repaymentOptions?.weeklyAmount
          }

          //* Fortnightly Payment
          if (repaymentOptions?.firstFortnightlyPaymentDate) {
            state.lncalc_RepaymentOptionsFortnightly.firstPaymentDate = repaymentOptions?.firstFortnightlyPaymentDate
            state.lncalc_RepaymentOptionsFortnightly.numberOfPayments = repaymentOptions?.numberOfFortnightlyPayments
            state.lncalc_RepaymentOptionsFortnightly.paymentAmount = repaymentOptions?.fortnightlyAmount
          }

          //* Monthly Payment
          if (repaymentOptions?.firstFortnightlyPaymentDate) {
            state.lncalc_RepaymentOptionsMonthly.firstPaymentDate = repaymentOptions?.firstMonthlyPaymentDate
            state.lncalc_RepaymentOptionsMonthly.numberOfPayments = repaymentOptions?.numberOfMonthlyPayments
            state.lncalc_RepaymentOptionsMonthly.paymentAmount = repaymentOptions?.monthlyAmount
          }

          state.lncalc_ResidualValue = response?.residualValue
          state.lncalc_SettlementDate = response?.settlementDate
          state.lncalc_Term.unit = response?.term?.unit
          state.lncalc_Term.value = response?.term?.value
        }
      })
      .addCase(getRepaymentDetails.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null

          console.log('Rejected Error: ', action.error)
          console.log('Rejected Payload: ', action.payload)
          console.log('Rejected meta: ', action.meta)
          console.log('Rejected Type: ', action.type)
        }
      })
  },
})

export const loanCalculatorActions = loanCalculatorSlice.actions
export default loanCalculatorSlice
