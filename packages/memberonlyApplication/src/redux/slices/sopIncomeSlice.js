import { createSlice } from '@reduxjs/toolkit'

const namespace = 'sopincomeexpensedatagrid'

export const initialState = {
  // Each amount is for a different frequecy

  wages: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'WAGES',
    desc: 'Wages',
  },
  secondWages: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'OTHIN1',
    desc: 'Other Income',
  },
  winzBenefit: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'BENFIT',
    desc: 'WINZ Benefit',
  },
  selfEmployed: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'SLFEMP',
    desc: 'Self Employed',
  },
  nzSuper: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'SUPER',
    desc: 'Superannuation',
  },
  studyLink: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'STDYLK',
    desc: 'Study Link',
  },
  rentalIncome: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'RENTAL',
    desc: 'Rental Income',
  },
  childSupport: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'CHDSUP',
    desc: 'Child Support',
  },
  workingForFamilies: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'WKFAM',
    desc: 'Working for Families',
  },
  boarderIncome: {
    amount1: null,
    amount2: null,
    amount3: null,
    code: 'PYGBRD',
    desc: 'Boarder Income',
  },

  onSubmitIncomeDetails: null,
  isValidIncomeDetails: null,
}

const sopIncomeGridSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    clearIncome: (state, action) => {
      state.wages.amount1 = null
      state.wages.amount2 = null
      state.wages.amount3 = null

      state.secondWages.amount1 = null
      state.secondWages.amount2 = null
      state.secondWages.amount3 = null

      state.winzBenefit.amount1 = null
      state.winzBenefit.amount2 = null
      state.winzBenefit.amount3 = null

      state.selfEmployed.amount1 = null
      state.selfEmployed.amount2 = null
      state.selfEmployed.amount3 = null

      state.nzSuper.amount1 = null
      state.nzSuper.amount2 = null
      state.nzSuper.amount3 = null

      state.studyLink.amount1 = null
      state.studyLink.amount2 = null
      state.studyLink.amount3 = null

      state.rentalIncome.amount1 = null
      state.rentalIncome.amount2 = null
      state.rentalIncome.amount3 = null

      state.childSupport.amount1 = null
      state.childSupport.amount2 = null
      state.childSupport.amount3 = null

      state.workingForFamilies.amount1 = null
      state.workingForFamilies.amount2 = null
      state.workingForFamilies.amount3 = null

      state.boarderIncome.amount1 = null
      state.boarderIncome.amount2 = null
      state.boarderIncome.amount3 = null
    },

    //Wages
    setWagesAmount1: (state, action) => {
      console.log('State Change triggered for Wages Amount 1 - ', action.payload)
      state.wages.amount1 = action.payload
    },
    setWagesAmount2: (state, action) => {
      state.wages.amount2 = action.payload
    },
    setWagesAmount3: (state, action) => {
      state.wages.amount3 = action.payload
    },

    //Second Wages
    setSecondWagesAmount1: (state, action) => {
      state.secondWages.amount1 = action.payload
    },
    setSecondWagesAmount2: (state, action) => {
      state.secondWages.amount2 = action.payload
    },
    setSecondWagesAmount3: (state, action) => {
      state.secondWages.amount3 = action.payload
    },

    //WINZ
    setWinzAmount1: (state, action) => {
      state.winzBenefit.amount1 = action.payload
    },
    setWinzAmount2: (state, action) => {
      state.winzBenefit.amount2 = action.payload
    },
    setWinzAmount3: (state, action) => {
      state.winzBenefit.amount3 = action.payload
    },

    //self employed
    setSelfEmployedAmount1: (state, action) => {
      state.selfEmployed.amount1 = action.payload
    },
    setSelfEmployedAmount2: (state, action) => {
      state.selfEmployed.amount2 = action.payload
    },
    setSelfEmployedAmount3: (state, action) => {
      state.selfEmployed.amount3 = action.payload
    },

    //NZ Super
    setNzSuperAmount1: (state, action) => {
      state.nzSuper.amount1 = action.payload
    },
    setNzSuperAmount2: (state, action) => {
      state.nzSuper.amount2 = action.payload
    },
    setNzSuperAmount3: (state, action) => {
      state.nzSuper.amount3 = action.payload
    },

    //Study Link
    setStudyLinkAmount1: (state, action) => {
      state.studyLink.amount1 = action.payload
    },
    setStudyLinkAmount2: (state, action) => {
      state.studyLink.amount2 = action.payload
    },
    setStudyLinkAmount3: (state, action) => {
      state.studyLink.amount3 = action.payload
    },

    // rental Income
    setRentalIncomeAmount1: (state, action) => {
      state.rentalIncome.amount1 = action.payload
    },
    setRentalIncomeAmount2: (state, action) => {
      state.rentalIncome.amount2 = action.payload
    },
    setRentalIncomeAmount3: (state, action) => {
      state.rentalIncome.amount3 = action.payload
    },

    // Child Support
    setChildSupportAmount1: (state, action) => {
      state.childSupport.amount1 = action.payload
    },
    setChildSupportAmount2: (state, action) => {
      state.childSupport.amount2 = action.payload
    },
    setChildSupportAmount3: (state, action) => {
      state.childSupport.amount3 = action.payload
    },

    // Working for Fmailies
    setWorkingForFamiliesAmount1: (state, action) => {
      state.workingForFamilies.amount1 = action.payload
    },
    setWorkingForFamiliesAmount2: (state, action) => {
      state.workingForFamilies.amount2 = action.payload
    },
    setWorkingForFamiliesAmount3: (state, action) => {
      state.workingForFamilies.amount3 = action.payload
    },

    // Boarder Income
    setBoarderIncomeAmount1: (state, action) => {
      state.boarderIncome.amount1 = action.payload
    },
    setBoarderIncomeAmount2: (state, action) => {
      state.boarderIncome.amount2 = action.payload
    },
    setBoarderIncomeAmount3: (state, action) => {
      state.boarderIncome.amount3 = action.payload
    },

    setOnSubmitIncomeDetails: (state, action) => {
      state.onSubmitIncomeDetails = action.payload
    },
    setIsValidIncomeDetails: (state, action) => {
      state.isValidIncomeDetails = action.payload
    },
  },
})

export const sopIncomeGridSliceActions = sopIncomeGridSlice.actions
export default sopIncomeGridSlice
