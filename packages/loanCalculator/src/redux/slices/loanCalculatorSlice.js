import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'loancalculator'

const options = {
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
}

export const getLoanRepaymentSchedule = createAsyncThunk(`${namespace}/getloanschedule`, async (financialCalculatorConfig) => {
  return await axios(financialCalculatorConfig)
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      return error
    })
})

export const initialState = {
  loading: HTTP_STATUS.IDLE,
  currentRequestId: null,
  error: null,

  defLoanAmount: 3000,
  defIntererstRate: 12.5,
  defTerm: { value: 36, unit: 'M' },
  loanAmount: 3000,
  loanAmountCust: 3000,
  interestRate: 12.5,
  term: { value: 36, unit: 'M' },
  paymentFrequency: { value: 1, unit: 'W' },
  amount: 0,
  numberOfInstalments: 0,
  startDate: '',
  endDate: '',
  instalments: [],

  sovAmountFinanced: 0,
  sovAmountPayable: 0,
  sovCostOfGoods: 0.0,
  sovPrinciapl: 0.0,
  sovInterestAmount: 0.0,
  sovInterestRate: 0.0,
  sovMaturityDate: '',
  sovPaymentFrequencyType1: '',
  sovPaymentFrequencyType2: 0,
  sovSettlementDate: '',
  sovTermType1: '',
  sovTermType2: 0,
  sovNumberOfInstalments: 0,
  sovInstalmentAmount: 0,
  sovHasInstalmentOnMaturity: false,
  sovInstalmentOnMaturity: 0,
  sovInstalments: [],
  sovInstalmentSummary: [],

  //* -------- Fees --------

  //* -------- Loan Cost Recovery Fees --------

  sovCreditCheckCode: 'LCRFA',
  sovCreditCheckAmount: 0,

  sovCreditSenseCode: 'LCRFB',
  sovCreditSenseAmount: 0,

  sovCloudCheckIdVerificationCode: 'LCRFC',
  sovCloudCheckIdVerificationAmount: 0,

  sovCloudCheckPEPSanctionsCode: 'LCRFD',
  sovCloudCheckPEPSanctionsAmount: 0,

  sovMotorwebCheckCode: 'LCRFE',
  sovMotorwebCheckAmount: 0,

  sovDocusignCode: 'LCRFF',
  sovDocusignAmount: 0,

  sovPPSRCode: 'LCRFG',
  sovPPSRAmount: 0,

  //* LPI
  awsCalculatedLpiCode: 'LPIUP',
  awsCalculatedLpiAmount: 0,

  //* Controls for LPI components
  lpiDeathCode: 'DEATH',
  lpiBankruptcyCode: 'BANKRUPTCY',
  lpiDisabilityCode: 'DISABILITY',
  lpiCriticalIllnessCode: 'CRITICLILL',

  hasLpiPrimeDeath: true,
  hasLpiPrimeDisability: false,
  hasLpiPrimeBankruptcy: false,
  hasLpiPrimeCriticalIllness: false,

  doYouNeedCoverForJoint: false,

  hasLpiJointDeath: false,
  hasLpiJointDisability: false,
  hasLpiJointBankruptcy: false,
  hasLpiJointCriticalIllness: false,

  chartAmountPayable: [],
  chartInstalmentNumber: [],
  paymentSeries: [],
}

const loanCalculatorSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setLoanAmount: (state, action) => {
      state.loanAmount = action.payload
      state.loanAmountCust = action.payload
    },
    setInterestRate: (state, action) => {
      state.interestRate = action.payload
    },
    setTerm: (state, action) => {
      state.term = { value: action.payload, unit: 'M' }
    },
    setPaymentFrequency: (state, action) => {
      state.paymentFrequency.unit = action.payload
    },

    sethasLpiPrimeDeath: (state, action) => {
      state.hasLpiPrimeDeath = action.payload
    },
    sethasLpiPrimeDisability: (state, action) => {
      state.hasLpiPrimeDisability = action.payload
    },
    sethasLpiPrimeBankruptcy: (state, action) => {
      state.hasLpiPrimeBankruptcy = action.payload
    },
    sethasLpiPrimeCriticalIllness: (state, action) => {
      state.hasLpiPrimeCriticalIllness = action.payload
    },

    setdoYouNeedCoverForJoint: (state, action) => {
      state.doYouNeedCoverForJoint = action.payload
    },

    sethasLpiJointDeath: (state, action) => {
      state.hasLpiJointDeath = action.payload
    },
    sethasLpiJointDisability: (state, action) => {
      state.hasLpiJointDisability = action.payload
    },
    sethasLpiJointBankruptcy: (state, action) => {
      state.hasLpiJointBankruptcy = action.payload
    },
    sethasLpiJointCriticalIllness: (state, action) => {
      state.hasLpiJointCriticalIllness = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoanRepaymentSchedule.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(getLoanRepaymentSchedule.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = HTTP_STATUS.IDLE
          state.sovAmountFinanced = action.payload.body?.data?.attributes?.amountFinanced
          state.sovAmountPayable = action.payload.body?.data?.attributes?.amountPayable
          state.sovCostOfGoods = action.payload.body?.data?.attributes?.costOfGoods?.value
          state.sovPrinciapl = action.payload.body?.data?.attributes?.instalmentBreakdown?.total?.principal
          state.sovInterestAmount = action.payload.body?.data?.attributes?.interestAmount
          state.sovInterestRate = action.payload.body?.data?.attributes?.interestRate
          state.sovMaturityDate = action.payload.body?.data?.attributes?.maturityDate
          state.sovPaymentFrequencyType1 = action.payload.body?.data?.attributes?.paymentFrequency?.unit
          state.sovPaymentFrequencyType2 = action.payload.body?.data?.attributes?.paymentFrequency?.value
          state.sovSettlementDate = action.payload.body?.data?.attributes?.settlementDate
          state.sovTermType1 = action.payload.body?.data?.attributes?.term?.unit
          state.sovTermType2 = action.payload.body?.data?.attributes?.term?.value
          state.sovNumberOfInstalments = action.payload.body?.data?.attributes?.instalmentBreakdown?.instalments.length

          state.sovInstalmentSummary = [...action.payload.body?.data?.attributes?.instalmentSummary]

          if (state.sovInstalmentSummary.length > 1) {
            state.sovHasInstalmentOnMaturity = true
            state.sovInstalmentAmount = state.sovInstalmentSummary[0].amount
            state.sovInstalments = state.sovInstalmentSummary[0].numberOfInstalments
            state.sovInstalmentOnMaturity = state.sovInstalmentSummary[1].amount
          }

          if ((state.sovInstalmentSummary.length = 1)) {
            state.sovHasInstalmentOnMaturity = false
            state.sovInstalmentAmount = state.sovInstalmentSummary[0].amount
            state.sovInstalments = state.sovInstalmentSummary[0].numberOfInstalments
          }

          state.sovInstalments = action.payload.body.data.attributes.instalmentBreakdown.instalments
          var amountPayable = state.sovAmountPayable.toFixed(2)
          state.chartAmountPayable.splice(0, state.chartAmountPayable.length)
          state.chartInstalmentNumber.splice(0, state.chartInstalmentNumber.length)
          for (var i = 0; i < state.sovInstalments.length; i++) {
            amountPayable = (amountPayable - state.sovInstalments[i].instalmentAmount).toFixed(2)

            state.chartInstalmentNumber.push(state.sovInstalments[i].seq)
            state.chartAmountPayable.push(amountPayable)
          }

          //* ---------- Fees ----------

          //* LPI

          state.awsCalculatedLpiAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.awsCalculatedLpiCode
          })[0]?.amount

          //* ----- Loan Cost Recovery Fees -----

          //* Credit Check
          state.sovCreditCheckAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.sovCreditCheckCode
          })[0]?.amount

          //* Credit Sense
          state.sovCreditSenseAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.sovCreditSenseCode
          })[0]?.amount

          //* Cloudhcheck ID Verification
          state.sovCloudCheckIdVerificationAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.sovCloudCheckIdVerificationCode
          })[0]?.amount

          //* Cloudhcheck PEP
          state.sovCloudCheckPEPSanctionsAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.sovCloudCheckPEPSanctionsCode
          })[0]?.amount

          //* Motorweb Check
          state.sovMotorwebCheckAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.sovMotorwebCheckCode
          })[0]?.amount

          //* Docusign Remote Signing
          state.sovDocusignAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.sovDocusignCode
          })[0]?.amount

          //* PPSR Registration
          state.sovPPSRAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.sovPPSRCode
          })[0]?.amount

          state.currentRequestId = null
        }
      })
      .addCase(getLoanRepaymentSchedule.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null
        }
      })
  },
})

export const loanCalculatorActions = loanCalculatorSlice.actions
export default loanCalculatorSlice
