import { createSlice } from '@reduxjs/toolkit'

const namespace = 'sopLiabilitiesSlice'

export const initialState = {
  // Each amount is for a different frequecy

  mortgage: {
    consolidate: null,
    creditLimit: null,
    outstandingBalance: null,
    amount1: null,
    amount2: null,
    amount3: null,
    code: '1STMORT',
    desc: 'First Mortgage',
  },
  storecard: {
    consolidate: null,
    creditLimit: null,
    outstandingBalance: null,
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'SCRDHPUR',
    desc: 'Store Cards/Hire Purchase',
  },
  mastercard: {
    consolidate: null,
    creditLimit: null,
    outstandingBalance: null,
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'MSCARD',
    desc: 'Mastercard',
  },
  visa: {
    consolidate: null,
    creditLimit: null,
    outstandingBalance: null,
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'VISACARD',
    desc: 'Visa Card',
  },
  studentloan: {
    consolidate: null,
    creditLimit: null,
    outstandingBalance: null,
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'STUDENTLO',
    desc: 'Student Loan',
  },
  otherloan1: {
    consolidate: null,
    creditLimit: null,
    outstandingBalance: null,
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'OTHLOAN1',
    desc: 'Other Loan 1',
  },

  onSubmitLiabilityDetails: null,
  isValidLiabilityDetails: null,
}

const sopLiabilitiesSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    //Wages
    clearAll: (state, action) => {

      state.mortgage.consolidate = null

      state.mortgage.creditLimit = null

      state.mortgage.outstandingBalance = null

      state.mortgage.amount1 = null

      state.mortgage.amount2 = null

      state.mortgage.amount3 = null


      state.storecard.consolidate = null

      state.storecard.creditLimit = null

      state.storecard.outstandingBalance = null

      state.storecard.amount1 = null

      state.storecard.amount2 = null

      state.storecard.amount3 = null

      state.mastercard.consolidate = null

      state.mastercard.creditLimit = null

      state.mastercard.outstandingBalance = null

      state.mastercard.amount1 = null

      state.mastercard.amount2 = null

      state.mastercard.amount3 = null

      state.visa.consolidate = null

      state.visa.creditLimit = null

      state.visa.outstandingBalance = null

      state.visa.amount1 = null

      state.visa.amount2 = null

      state.visa.amount3 = null

      state.studentloan.consolidate = null

      state.studentloan.creditLimit = null

      state.studentloan.outstandingBalance = null

      state.studentloan.amount1 = null

      state.studentloan.amount2 = null

      state.studentloan.amount3 = null

      state.otherloan1.consolidate = null

      state.otherloan1.creditLimit = null

      state.otherloan1.outstandingBalance = null

      state.otherloan1.amount1 = null

      state.otherloan1.amount2 = null

      state.otherloan1.amount3 = null

      state.onSubmitLiabilityDetails = null

      state.isValidLiabilityDetails = null

    },
    setMortgageConsolidate: (state, action) => {
      state.mortgage.consolidate = action.payload
    },
    setMortgageCreditLimit: (state, action) => {
      state.mortgage.creditLimit = action.payload
    },
    setMortgageOutstandingBalance: (state, action) => {
      state.mortgage.outstandingBalance = action.payload
    },
    setMortgageAmount1: (state, action) => {
      state.mortgage.amount1 = action.payload
    },
    setMortgageAmount2: (state, action) => {
      state.mortgage.amount2 = action.payload
    },
    setMortgageAmount3: (state, action) => {
      state.mortgage.amount3 = action.payload
    },

    //Second Wages
    setStorecardConsolidate: (state, action) => {
      state.storecard.consolidate = action.payload
    },
    setStorecardCreditLimit: (state, action) => {
      state.storecard.creditLimit = action.payload
    },
    setStorecardOutstandingBalance: (state, action) => {
      state.storecard.outstandingBalance = action.payload
    },
    setStorecardAmount1: (state, action) => {
      state.storecard.amount1 = action.payload
    },
    setStorecardAmount2: (state, action) => {
      state.storecard.amount2 = action.payload
    },
    setStorecardAmount3: (state, action) => {
      state.storecard.amount3 = action.payload
    },

    //WINZ
    setMastercardConsolidate: (state, action) => {
      state.mastercard.consolidate = action.payload
    },
    setMastercardCreditLimit: (state, action) => {
      state.mastercard.creditLimit = action.payload
    },
    setMastercardOutstandingBalance: (state, action) => {
      state.mastercard.outstandingBalance = action.payload
    },
    setMastercardAmount1: (state, action) => {
      state.mastercard.amount1 = action.payload
    },
    setMastercardAmount2: (state, action) => {
      state.mastercard.amount2 = action.payload
    },
    setMastercardAmount3: (state, action) => {
      state.mastercard.amount3 = action.payload
    },

    //self employed
    setVisaConsolidate: (state, action) => {
      state.visa.consolidate = action.payload
    },
    setVisaCreditLimit: (state, action) => {
      state.visa.creditLimit = action.payload
    },
    setVisaOutstandingBalance: (state, action) => {
      state.visa.outstandingBalance = action.payload
    },
    setVisaAmount1: (state, action) => {
      state.visa.amount1 = action.payload
    },
    setVisaAmount2: (state, action) => {
      state.visa.amount2 = action.payload
    },
    setVisaAmount3: (state, action) => {
      state.visa.amount3 = action.payload
    },

    //NZ Super
    setStudentloanConsolidate: (state, action) => {
      state.studentloan.consolidate = action.payload
    },
    setStudentloanCreditLimit: (state, action) => {
      state.studentloan.creditLimit = action.payload
    },
    setStudentloanOutstandingBalance: (state, action) => {
      state.studentloan.outstandingBalance = action.payload
    },
    setStudentloanAmount1: (state, action) => {
      state.studentloan.amount1 = action.payload
    },
    setStudentloanAmount2: (state, action) => {
      state.studentloan.amount2 = action.payload
    },
    setStudentloanAmount3: (state, action) => {
      state.studentloan.amount3 = action.payload
    },

    //Study Link
    setOtherloan1Consolidate: (state, action) => {
      state.otherloan1.consolidate = action.payload
    },
    setOtherloan1CreditLimit: (state, action) => {
      state.otherloan1.creditLimit = action.payload
    },
    setOtherloan1OutstandingBalance: (state, action) => {
      state.otherloan1.outstandingBalance = action.payload
    },
    setOtherloan1Amount1: (state, action) => {
      state.otherloan1.amount1 = action.payload
    },
    setOtherloan1Amount2: (state, action) => {
      state.otherloan1.amount2 = action.payload
    },
    setOtherloan1Amount3: (state, action) => {
      state.otherloan1.amount3 = action.payload
    },

    setOnSubmitLiabilityDetails: (state, action) => {
      state.onSubmitLiabilityDetails = action.payload
    },
    setIsValidLiabilityDetails: (state, action) => {
      state.isValidLiabilityDetails = action.payload
    },
  },
})

export const sopLiabilitiesActions = sopLiabilitiesSlice.actions
export default sopLiabilitiesSlice
