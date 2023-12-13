import { createSlice } from '@reduxjs/toolkit'

const namespace = 'sopexpense'

export const initialState = {
  // Each amount is for a different frequecy

  rentingBoarding: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'RENTI',
    desc: 'Renting or Boarding',
  },
  liabilitiesServicing: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'LSERV',
    desc: 'Liabilities servicing',
  },
  proposedLoan: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'PLLOAN',
    desc: 'Proposed Loan',
  },
  powerOrGas: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'POWER',
    desc: 'Power or Gas',
  },
  groceries: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'GROCER',
    desc: 'Groceries',
  },
  phoneOrInternet: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'PHONE',
    desc: 'Phone or Internet',
  },
  fuel: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'FUEL',
    desc: 'Fuel',
  },
  s6_or_savings: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'S6',
    desc: 'S6 or Savings',
  },
  wof_rego: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'VEH',
    desc: 'Wof and Registration',
  },
  clothing: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'CLOTH',
    desc: 'Clothing',
  },
  medicalExpense: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'MEDC',
    desc: 'Medical Expense',
  },
  gym: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'GYM',
    desc: 'Gym',
  },
  recreation: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'RECR',
    desc: 'Recreation',
  },
  tithing: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'TITH',
    desc: 'Tithing',
  },
  insurance: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'INSURE',
    desc: 'Insurance',
  },
  savings: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'SAVG',
    desc: 'Savings',
  },
  liabilityServicing: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'LSERV',
    desc: 'Liability Servicing',
  },

  onSubmitExpenseDetails: null,
  isValidExpenseDetails: null,
}

const sopExpenseSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    clearAll: (state, action) => {
      state.rentingBoarding.amount1 = null
      state.rentingBoarding.amount2 = null
      state.rentingBoarding.amount3 = null

      state.liabilitiesServicing.amount1 = null
      state.liabilitiesServicing.amount2 = null
      state.liabilitiesServicing.amount3 = null

      state.proposedLoan.amount1 = null
      state.proposedLoan.amount2 = null
      state.proposedLoan.amount3 = null

      state.powerOrGas.amount1 = null
      state.powerOrGas.amount2 = null
      state.powerOrGas.amount3 = null

      state.groceries.amount1 = null
      state.groceries.amount2 = null
      state.groceries.amount3 = null

      state.phoneOrInternet.amount1 = null
      state.phoneOrInternet.amount2 = null
      state.phoneOrInternet.amount3 = null

      state.fuel.amount1 = null
      state.fuel.amount2 = null
      state.fuel.amount3 = null

      state.s6_or_savings.amount1 = null
      state.s6_or_savings.amount2 = null
      state.s6_or_savings.amount3 = null

      state.wof_rego.amount1 = null
      state.wof_rego.amount2 = null
      state.wof_rego.amount3 = null

      state.clothing.amount1 = null
      state.clothing.amount2 = null
      state.clothing.amount3 = null

      state.medicalExpense.amount1 = null
      state.medicalExpense.amount2 = null
      state.medicalExpense.amount3 = null

      state.gym.amount1 = null
      state.gym.amount2 = null
      state.gym.amount3 = null

      state.recreation.amount1 = null
      state.recreation.amount2 = null
      state.recreation.amount3 = null

      state.tithing.amount1 = null
      state.tithing.amount2 = null
      state.tithing.amount3 = null

      state.insurance.amount1 = null
      state.insurance.amount2 = null
      state.insurance.amount3 = null

      state.savings.amount1 = null
      state.savings.amount2 = null
      state.savings.amount3 = null

      state.onSubmitExpenseDetails = null
      state.isValidExpenseDetails = null

    },

    clearExpense: (state, action) => {
      state.rentingBoarding.amount1 = null
      state.rentingBoarding.amount2 = null
      state.rentingBoarding.amount3 = null

      state.liabilitiesServicing.amount1 = null
      state.liabilitiesServicing.amount2 = null
      state.liabilitiesServicing.amount3 = null

      state.proposedLoan.amount1 = null
      state.proposedLoan.amount2 = null
      state.proposedLoan.amount3 = null

      state.powerOrGas.amount1 = null
      state.powerOrGas.amount2 = null
      state.powerOrGas.amount3 = null

      state.groceries.amount1 = null
      state.groceries.amount2 = null
      state.groceries.amount3 = null

      state.phoneOrInternet.amount1 = null
      state.phoneOrInternet.amount2 = null
      state.phoneOrInternet.amount3 = null

      state.fuel.amount1 = null
      state.fuel.amount2 = null
      state.fuel.amount3 = null

      state.s6_or_savings.amount1 = null
      state.s6_or_savings.amount2 = null
      state.s6_or_savings.amount3 = null

      state.wof_rego.amount1 = null
      state.wof_rego.amount2 = null
      state.wof_rego.amount3 = null

      state.clothing.amount1 = null
      state.clothing.amount2 = null
      state.clothing.amount3 = null

      state.medicalExpense.amount1 = null
      state.medicalExpense.amount2 = null
      state.medicalExpense.amount3 = null

      state.gym.amount1 = null
      state.gym.amount2 = null
      state.gym.amount3 = null

      state.recreation.amount1 = null
      state.recreation.amount2 = null
      state.recreation.amount3 = null

      state.tithing.amount1 = null
      state.tithing.amount2 = null
      state.tithing.amount3 = null

      state.insurance.amount1 = null
      state.insurance.amount2 = null
      state.insurance.amount3 = null

      state.savings.amount1 = null
      state.savings.amount2 = null
      state.savings.amount3 = null
    },

    //Wages
    setRentingBoardingAmount1: (state, action) => {
      state.rentingBoarding.amount1 = action.payload
    },
    setRentingBoardingAmount2: (state, action) => {
      state.rentingBoarding.amount2 = action.payload
    },
    setRentingBoardingAmount3: (state, action) => {
      state.rentingBoarding.amount3 = action.payload
    },

    //Wages
    setLiabilitiesServicingAmount1: (state, action) => {
      state.liabilitiesServicing.amount1 = action.payload
    },
    setLiabilitiesServicingAmount2: (state, action) => {
      state.liabilitiesServicing.amount2 = action.payload
    },
    setLiabilitiesServicingAmount3: (state, action) => {
      state.liabilitiesServicing.amount3 = action.payload
    },

    //Wages
    setProposedLoanAmount1: (state, action) => {
      state.proposedLoan.amount1 = action.payload
    },
    setProposedLoanAmount2: (state, action) => {
      state.proposedLoan.amount2 = action.payload
    },
    setProposedLoanAmount3: (state, action) => {
      state.proposedLoan.amount3 = action.payload
    },

    //Wages
    setLiabilitiesServicingAmount1: (state, action) => {
      state.liabilitiesServicing.amount1 = action.payload
    },
    setLiabilitiesServicingAmount2: (state, action) => {
      state.liabilitiesServicing.amount2 = action.payload
    },
    setLiabilitiesServicingAmount3: (state, action) => {
      state.liabilitiesServicing.amount3 = action.payload
    },

    //Second Wages
    setPowerOrGasAmount1: (state, action) => {
      state.powerOrGas.amount1 = action.payload
    },
    setPowerOrGasAmount2: (state, action) => {
      state.powerOrGas.amount2 = action.payload
    },
    setPowerOrGasAmount3: (state, action) => {
      state.powerOrGas.amount3 = action.payload
    },

    //WINZ
    setGroceriesAmount1: (state, action) => {
      state.groceries.amount1 = action.payload
    },
    setGroceriesAmount2: (state, action) => {
      state.groceries.amount2 = action.payload
    },
    setGroceriesAmount3: (state, action) => {
      state.groceries.amount3 = action.payload
    },

    //self employed
    setphoneOrInternetAmount1: (state, action) => {
      state.phoneOrInternet.amount1 = action.payload
    },
    setphoneOrInternetAmount2: (state, action) => {
      state.phoneOrInternet.amount2 = action.payload
    },
    setphoneOrInternetAmount3: (state, action) => {
      state.phoneOrInternet.amount3 = action.payload
    },

    //NZ Super
    setFuelAmount1: (state, action) => {
      state.fuel.amount1 = action.payload
    },
    setFuelAmount2: (state, action) => {
      state.fuel.amount2 = action.payload
    },
    setFuelAmount3: (state, action) => {
      state.fuel.amount3 = action.payload
    },

    //Study Link
    setS6_or_savingsAmount1: (state, action) => {
      state.s6_or_savings.amount1 = action.payload
    },
    setS6_or_savingsAmount2: (state, action) => {
      state.s6_or_savings.amount2 = action.payload
    },
    setS6_or_savingsAmount3: (state, action) => {
      state.s6_or_savings.amount3 = action.payload
    },

    // rental Income
    setWof_regoAmount1: (state, action) => {
      state.wof_rego.amount1 = action.payload
    },
    setWof_regoAmount2: (state, action) => {
      state.wof_rego.amount2 = action.payload
    },
    setWof_regoAmount3: (state, action) => {
      state.wof_rego.amount3 = action.payload
    },

    // Child Support
    setClothingAmount1: (state, action) => {
      state.clothing.amount1 = action.payload
    },
    setClothingAmount2: (state, action) => {
      state.clothing.amount2 = action.payload
    },
    setClothingAmount3: (state, action) => {
      state.clothing.amount3 = action.payload
    },

    // Working for Fmailies
    setMedicalExpenseAmount1: (state, action) => {
      state.medicalExpense.amount1 = action.payload
    },
    setMedicalExpenseAmount2: (state, action) => {
      state.medicalExpense.amount2 = action.payload
    },
    setMedicalExpenseAmount3: (state, action) => {
      state.medicalExpense.amount3 = action.payload
    },

    // Boarder Income
    setGymAmount1: (state, action) => {
      state.gym.amount1 = action.payload
    },
    setGymAmount2: (state, action) => {
      state.gym.amount2 = action.payload
    },
    setGymAmount3: (state, action) => {
      state.gym.amount3 = action.payload
    },

    // Boarder Income
    setRecreationAmount1: (state, action) => {
      state.recreation.amount1 = action.payload
    },
    setRecreationAmount2: (state, action) => {
      state.recreation.amount2 = action.payload
    },
    setRecreationAmount3: (state, action) => {
      state.recreation.amount3 = action.payload
    },

    setTithingAmount1: (state, action) => {
      state.tithing.amount1 = action.payload
    },
    setTithingAmount2: (state, action) => {
      state.tithing.amount2 = action.payload
    },
    setTithingAmount3: (state, action) => {
      state.tithing.amount3 = action.payload
    },

    setInsuranceAmount1: (state, action) => {
      state.insurance.amount1 = action.payload
    },
    setInsuranceAmount2: (state, action) => {
      state.insurance.amount2 = action.payload
    },
    setInsuranceAmount3: (state, action) => {
      state.insurance.amount3 = action.payload
    },

    setSavingsAmount1: (state, action) => {
      state.savings.amount1 = action.payload
    },
    setSavingsAmount2: (state, action) => {
      state.savings.amount2 = action.payload
    },
    setSavingsAmount3: (state, action) => {
      state.savings.amount3 = action.payload
    },

    setLiabilityServicingAmount3: (state, action) => {
      state.liabilityServicing.amount3 = action.payload
    },

    setOnSubmitExpenseDetails: (state, action) => {
      state.onSubmitExpenseDetails = action.payload
    },
    setIsValidExpenseDetails: (state, action) => {
      state.isValidExpenseDetails = action.payload
    },
  },
})

export const sopExpenseAction = sopExpenseSlice.actions
export default sopExpenseSlice
