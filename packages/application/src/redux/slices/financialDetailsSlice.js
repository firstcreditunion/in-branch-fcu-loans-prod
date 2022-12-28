import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { HTTP_STATUS } from '../utils/apiConstants'

const namespace = 'financialDetails'

const options = {
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
}

const minDrawdownDate = new Date(new Date().setDate(new Date().getDate() + 2))

export const getLoanRepayments = createAsyncThunk(`${namespace}/getloandetails`, async (loanDetailsConfig) => {
  return await axios(loanDetailsConfig)
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

  loanAmount: 3000,
  loanAmountCust: 3000,
  interestRate: 12.5,
  term: { value: 36, unit: 'M' },
  paymentFrequency: { value: 1, unit: 'W' },
  drawdowndate: null,
  minDrawdowndate: minDrawdownDate,
  firstpaymentdate: null,

  //* -------- Fees --------

  //* -------- Loan Cost Recovery Fees --------

  creditCheckCode: 'LCRFA',
  creditCheckAmount: 0,

  creditSenseCode: 'LCRFB',
  creditSenseAmount: 0,

  cloudCheckIdVerificationCode: 'LCRFC',
  cloudCheckIdVerificationAmount: 0,

  cloudCheckPEPSanctionsCode: 'LCRFD',
  cloudCheckPEPSanctionsAmount: 0,

  motorwebCheckCode: 'LCRFE',
  motorwebCheckAmount: 0,

  docusignCode: 'LCRFF',
  docusignAmount: 0,

  ppsrCode: 'LCRFG',
  ppsrAmount: 0,

  //* LPI
  awsCalculatedLpiDeathCode: 'FCUL',
  awsCalculatedLpiDisabilityCode: 'FCUD',
  awsCalculatedLpiCriticalIllnessCode: 'FCUT',
  awsCalculatedLpiBankruptcyCode: 'FCUB',

  awsCalculatedLpiAmount: 0,
  awsCalculatedLpiDeathAmount: 0,
  awsCalculatedLpiDisabilityAmount: 0,
  awsCalculatedLpiCriticalIllnessAmount: 0,
  awsCalculatedLpiBankruptcyAmount: 0,

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
  sovInstalments: [
    {
      date: '',
      externalFeeAmount: 0,
      feeAmount: 0,
      gstAmount: 0,
      gstRecoveryOption: 'None',
      held: 'N',
      instalmentAmount: 0,
      interest: 0,
      principal: 0,
      seq: 1,
      structured: 'N',
    },
  ],
  sovInstalmentSummary: [],

  onSubmitYourFinancialDetails: null,
  isValidYourFinancialDetails: null,
}

const financialDetailsSlice = createSlice({
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
    setDrawdownDate: (state, action) => {
      state.drawdowndate = action.payload
    },
    setFirstPaymentDate: (state, action) => {
      state.firstpaymentdate = action.payload
    },
    setPaymentFrequency: (state, action) => {
      state.paymentFrequency.unit = action.payload
    },

    //* Loan Cost Recovery Fees
    setCreditCheckFee: (state, action) => {
      state.creditCheckAmount = action.payload
    },
    setCreditSenseFee: (state, action) => {
      state.creditSenseAmount = action.payload
    },
    setMotorwebCheckFee: (state, action) => {
      state.motorwebCheckAmount = action.payload
    },
    setPPSRFee: (state, action) => {
      state.ppsrAmount = action.payload
    },
    setDocusignFee: (state, action) => {
      state.docusignAmount = action.payload
    },
    setcCloudCheckIdVerificationFee: (state, action) => {
      state.cloudCheckIdVerificationAmount = action.payload
    },
    setCloudCheckPEPSanctionsFee: (state, action) => {
      state.cloudCheckPEPSanctionsAmount = action.payload
    },

    setAwsCalculatedLpiAmount: (state, action) => {
      state.awsCalculatedLpiAmount = action.payload
    },

    //* LPI Controls - Prime
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

    //* Joint Toggle
    setdoYouNeedCoverForJoint: (state, action) => {
      state.doYouNeedCoverForJoint = action.payload
    },

    //* LPI Controls - Joint
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

    //* Submission
    setOnSubmitYourFinancialDetails: (state, action) => {
      state.onSubmitYourFinancialDetails = action.payload
    },
    setIsValidYourFinancialDetails: (state, action) => {
      state.isValidYourFinancialDetails = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLoanRepayments.pending, (state, action) => {
        if (state.loading === 'IDLE') {
          state.loading = HTTP_STATUS.PENDING
          state.currentRequestId = action.meta.requestId
        }
      })
      .addCase(getLoanRepayments.fulfilled, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = HTTP_STATUS.IDLE
          state.sovAmountFinanced = action.payload.body.data.attributes.amountFinanced
          state.sovAmountPayable = action.payload.body.data.attributes.amountPayable
          //state.sovCostOfGoods = action.payload.body.data.attributes.costOfGoods.value
          //state.sovPrinciapl = action.payload.body.data.attributes.instalmentBreakdown.total.principal
          state.sovInterestAmount = action.payload.body.data.attributes.interestAmount
          state.sovInterestRate = action.payload.body.data.attributes.interestRate
          //state.sovMaturityDate = action.payload.body.data.attributes.maturityDate
          state.sovPaymentFrequencyType1 = action.payload.body.data.attributes.paymentFrequency.unit
          //state.sovPaymentFrequencyType2 = action.payload.body.data.attributes.paymentFrequency.value
          //state.sovSettlementDate = action.payload.body.data.attributes.settlementDate
          //state.sovTermType1 = action.payload.body.data.attributes.term.unit
          state.sovTermType2 = action.payload.body.data.attributes.term.value
          //state.sovNumberOfInstalments = action.payload.body.data.attributes.instalmentBreakdown.instalments.length
          state.sovInstalmentSummary = [...action.payload.body.data.attributes.instalmentSummary]

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

          //* ---------- Fees ----------

          //* LPI Premium Amounts

          //* Death

          state.awsCalculatedLpiDeathAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.awsCalculatedLpiDeathCode
          })[0]?.amount

          //* Disability
          state.awsCalculatedLpiDisabilityAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.awsCalculatedLpiDisabilityCode
          })[0]?.amount

          //* Critical Illness
          state.awsCalculatedLpiCriticalIllnessAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.awsCalculatedLpiCriticalIllnessCode
          })[0]?.amount

          //* Bankruptcy
          state.awsCalculatedLpiBankruptcyAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.awsCalculatedLpiBankruptcyCode
          })[0]?.amountv

          //* ----- Loan Cost Recovery Fees -----

          //* Credit Check
          state.creditCheckAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.creditCheckCode
          })[0]?.amount

          //* Credit Sense
          state.creditSenseAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.creditSenseCode
          })[0]?.amount

          //* Cloudhcheck ID Verification
          state.cloudCheckIdVerificationAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.cloudCheckIdVerificationCode
          })[0]?.amount

          //* Cloudhcheck PEP
          state.cloudCheckPEPSanctionsAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.cloudCheckPEPSanctionsCode
          })[0]?.amount

          //* Motorweb Check
          state.motorwebCheckAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.motorwebCheckCode
          })[0]?.amount

          //* Docusign Remote Signing
          state.docusignAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.docusignCode
          })[0]?.amount

          //* PPSR Registration
          state.ppsrAmount = action.payload.body?.data?.attributes?.fees?.fee?.filter((feeItem) => {
            return feeItem?.code === state.ppsrCode
          })[0]?.amount

          state.currentRequestId = null
        }
      })
      .addCase(getLoanRepayments.rejected, (state, action) => {
        const { requestId } = action.meta
        if (state.loading === 'PENDING' && state.currentRequestId === requestId) {
          state.loading = 'IDLE'
          state.error = action.error
          state.currentRequestId = null
        }
      })
  },
})

export const financialDetailsActions = financialDetailsSlice.actions
export default financialDetailsSlice
