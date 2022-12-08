import { createSlice } from '@reduxjs/toolkit'

const namespace = 'sopincomeexpense'

export const initialState = {
  checkedIncomeCodes: [],
  checkedExpenseCodes: [],

  //***** Income *****/
  income: {
    income_wages1: {
      title: 'Wages',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive your wages?' },
      label: 'Wages',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Wages', code: 'WGE1' },
      sovereign: { key: 'WAGES', value: 'Wages' },
    },
    income_wages2: {
      title: 'Second Wage',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive your wages?' },
      label: 'Second Wage',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Second Wage', code: 'WGE2' },
      sovereign: { key: 'OTHIN1', value: 'Other Income' },
    },
    income_winz: {
      title: 'WINZ Benefit',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive WINZ Benefit?' },
      label: 'WINZ Benefit',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'WINZ Benefit', code: 'WINZ' },
      sovereign: { key: 'BENFIT', value: 'WINZ Benefit' },
    },
    income_selfemploy: {
      title: 'Self Employed',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive this income?' },
      label: 'Self Employed',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Self-Employed', code: 'SELF' },
      sovereign: { key: 'SLFEMP', value: 'Self Employed' },
    },
    income_nzsuper: {
      title: 'NZ Superannuation',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'NZ Super',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'NZ Superannuation', code: 'SUPR' },
      sovereign: { key: 'SUPER', value: 'Superannuation' },
    },
    income_studylink: {
      title: 'Study Link',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'Study Link',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Study Link', code: 'STLNK' },
      sovereign: { key: 'STDYLK', value: 'Study Link' },
    },
    income_rentalincome: {
      title: 'Rental Income',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'Rental Income',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Rental Income', code: 'RNTI' },
      sovereign: { key: 'RENTAL', value: 'Rental Income' },
    },
    income_childsupport: {
      title: 'Child Support',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'Child Support',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Child Support', code: 'CHSP' },
      sovereign: { key: 'CHDSUP', value: 'Child Support' },
    },
    income_workingforfamilies: {
      title: 'Working for Families',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'Working for Families',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Working for Families', code: 'WKFM' },
      sovereign: { key: 'WKFAM', value: 'Working for Families' },
    },
    income_broaderincome: {
      title: 'Boarder Income',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'Boarder Income',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Boarder Income', code: 'BRINC' },
      sovereign: { key: 'PYGBRD', value: 'Boarder Income' },
    },
    income_otherincome1: {
      title: 'Other Income 1',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'Other Income 1',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Other Income 1', code: 'OTH1' },
      sovereign: { key: 'VISACARD', value: 'Visa Card' },
    },
    income_otherincome2: {
      title: 'Other Income 2',
      groupBy: 'income',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'Other Income 2',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Other Income 2', code: 'OTH2' },
      sovereign: { key: 'VISACARD', value: 'Visa Card' },
    },
  },

  //***** Expense *****/

  expense: {
    expense_RentingBoarding: {
      title: 'Renting or Boarding',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay rent?' },
      label: 'Renting or Boarding',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Renting or Boarding', code: 'ERTBR' },
      sovereign: { key: 'RENTI', value: 'Renting or Boarding' },
    },
    expense_Power_or_Gas: {
      title: 'Power or Gas',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay for Power or Gas?' },
      label: 'Power or Gas',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Power or Gas', code: 'EPG' },
      sovereign: { key: 'POWER', value: 'Power or Gas' },
    },
    expense_Groceries: {
      title: 'Groceries',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you spend on Groceries?' },
      label: 'Groceries',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Groceries', code: 'EGRC' },
      sovereign: { key: 'GROCER', value: 'Groceries' },
    },
    expense_Phone_or_Internet: {
      title: 'Phone or Internet',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay for you Phone or Internet?' },
      label: 'Phone or Internet',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Phone or Internet', code: 'EPHO' },
      sovereign: { key: 'PHONE', value: 'Phone or Internet' },
    },
    expense_Fuel: {
      title: 'Fuel',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you spend on Fuel' },
      label: 'Fuel',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Fuel', code: 'EFUL' },
      sovereign: { key: 'FUEL', value: 'Fuel' },
    },
    expense_S6_or_Savings: {
      title: 'S6 or Savings',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you have s6 expense?' },
      label: 'S6 or Savings',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'S6 or Savings', code: 'ESVG' },
      sovereign: { key: 'S6', value: 'S6/Savings' },
    },
    expense_Wof_Rego: {
      title: 'Wof and Registration',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you spend on Wof and Vehicle Registration?' },
      label: 'Wof and Registration',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Wof and Registration', code: 'EWRG' },
      sovereign: { key: 'VEH', value: 'Vehicle on road costs' },
    },
    expense_Clothing: {
      title: 'Clothing',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you spend on Clothing?' },
      label: 'Clothing',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Clothing', code: 'ECLO' },
      sovereign: { key: 'CLOTH', value: 'Clothing' },
    },
    expense_MedicalExpense: {
      title: 'Medical Expense',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you spend on your Medical Expenses?' },
      label: 'Medical Expense',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Medical Expense', code: 'EMED' },
      sovereign: { key: 'MEDC', value: 'Medical' },
    },
    expense_Gym: {
      title: 'Gym',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay for Gym?' },
      label: 'Gym',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Gym', code: 'EGYM' },
      sovereign: { key: 'GYM', value: 'Gym' },
    },
    expense_Recreation: {
      title: 'Recreation',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you do you have recreation expense?' },
      label: 'Recreation',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Recreation', code: 'ERCR' },
      sovereign: { key: 'RECR', value: 'Recreation' },
    },
    expense_Tithing: {
      title: 'Tithing',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you Tithe?' },
      label: 'Tithing',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Tithing', code: 'ETITH' },
      sovereign: { key: 'TITH', value: 'Tithing' },
    },
    expense_Savings: {
      title: 'Savings',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you have this expense?' },
      label: 'Savings',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Savings', code: 'ESAV' },
      sovereign: { key: 'SAVG', value: 'Savings' },
    },
    expense_otherExpense1: {
      title: 'Other Expense',
      groupBy: 'expense',
      amount: null,
      frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you have other expense?' },
      label: 'Other Expense',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Other Expense', code: 'OTHEX1' },
      sovereign: { key: 'VISACARD', value: 'Visa Card' },
    },
  },

  onSubmitSopIncomeExpenditure: null,
  isValidSopIncomeExpenditure: null,
}

const sopIncomeExpenditureSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    // reducers to set checked and unchecked items from Income autocomplete
    setSelectedIncomeTypes: (state, action) => {
      state.checkedIncomeCodes = action.payload
    },
    setSelectedExpenseTypes: (state, action) => {
      state.checkedExpenseCodes = action.payload
    },

    // Form submission setters
    setOnSubmitSopIncomeExpenditureDetails: (state, action) => {
      state.onSubmitSopIncomeExpenditure = action.payload
    },
    setIsValidSopIncomeExpenditureDetails: (state, action) => {
      state.isValidSopIncomeExpenditure = action.payload
    },

    // ------ Setters for Income -------- //

    setIncomeWages1Amount: (state, action) => {
      state.income.income_wages1.amount = action.payload
    },
    setIncomeWages1Frequency: (state, action) => {
      state.income.income_wages1.frequency.unit = action.payload
    },

    setIncomeWages2Amount: (state, action) => {
      state.income.income_wages2.amount = action.payload
    },
    setIncomeWages2Frequency: (state, action) => {
      state.income.income_wages2.frequency.unit = action.payload
    },

    setIncomeWinzAmount: (state, action) => {
      state.income.income_winz.amount = action.payload
    },
    setIncomeWinzFrequency: (state, action) => {
      state.income.income_winz.frequency.unit = action.payload
    },

    setIncomeSelfEmployAmount: (state, action) => {
      state.income.income_selfemploy.amount = action.payload
    },
    setIncomeSelfEmployFrequency: (state, action) => {
      state.income.income_selfemploy.frequency.unit = action.payload
    },

    setIncomeNzSuperAmount: (state, action) => {
      state.income.income_nzsuper.amount = action.payload
    },
    setIncomeNzSuperFrequency: (state, action) => {
      state.income.income_nzsuper.frequency.unit = action.payload
    },

    setIncomeStudyLinkAmount: (state, action) => {
      state.income.income_studylink.amount = action.payload
    },
    setIncomeStudyLinkFrequency: (state, action) => {
      state.income.income_studylink.frequency.unit = action.payload
    },

    setIncomeRentalIncomeAmount: (state, action) => {
      state.income.income_rentalincome.amount = action.payload
    },
    setIncomeRentalIncomeFrequency: (state, action) => {
      state.income.income_rentalincome.frequency.unit = action.payload
    },

    setIncomeChildSupportAmount: (state, action) => {
      state.income.income_childsupport.amount = action.payload
    },
    setIncomeChildSupportFrequency: (state, action) => {
      state.income.income_childsupport.frequency.unit = action.payload
    },

    setIncomeWorkingForFamiliesAmount: (state, action) => {
      state.income.income_workingforfamilies.amount = action.payload
    },
    setIncomeWorkingForFamiliesFrequency: (state, action) => {
      state.income.income_workingforfamilies.frequency.unit = action.payload
    },

    setIncomeBroaderIncomeAmount: (state, action) => {
      state.income.income_broaderincome.amount = action.payload
    },
    setIncomeBroaderIncomeFrequency: (state, action) => {
      state.income.income_broaderincome.frequency.unit = action.payload
    },
    setIncomeOtherIncome1Amount: (state, action) => {
      state.income.income_otherincome1.amount = action.payload
    },
    setIncomeOtherIncome1Frequency: (state, action) => {
      state.income.income_otherincome1.frequency.unit = action.payload
    },
    setIncomeOtherIncome2Amount: (state, action) => {
      state.income.income_otherincome2.amount = action.payload
    },
    setIncomeOtherIncome2Frequency: (state, action) => {
      state.income.income_otherincome2.frequency.unit = action.payload
    },

    //------ Setters for Expense -------- //

    setExpenseRentBoardAmount: (state, action) => {
      state.expense.expense_RentingBoarding.amount = action.payload
    },
    setExpenseRentBoardFrequency: (state, action) => {
      state.expense.expense_RentingBoarding.frequency.unit = action.payload
    },

    // setExpenseLiabilitiesServicingAmount: (state, action) => {
    //   state.expense.expense_LiabilitiesServicing.amount = action.payload
    // },
    // setExpenseLiabilitiesServicingFrequency: (state, action) => {
    //   state.expense.expense_LiabilitiesServicing.frequency.unit = action.payload
    // },

    // setExpenseProposedLoanAmount: (state, action) => {
    //   state.expense.expense_ProposedLoan.amount = action.payload
    // },
    // setExpenseProposedLoanFrequency: (state, action) => {
    //   state.expense.expense_ProposedLoan.frequency.unit = action.payload
    // },

    setExpenseS6_SavingsAmount: (state, action) => {
      state.expense.expense_S6_or_Savings.amount = action.payload
    },
    setExpenseS6_SavingsFrequency: (state, action) => {
      state.expense.expense_S6_or_Savings.frequency.unit = action.payload
    },

    setExpenseGroceriesAmount: (state, action) => {
      state.expense.expense_Groceries.amount = action.payload
    },
    setExpenseGroceriesFrequency: (state, action) => {
      state.expense.expense_Groceries.frequency.unit = action.payload
    },

    setExpensePower_GasAmount: (state, action) => {
      state.expense.expense_Power_or_Gas.amount = action.payload
    },
    setExpensePower_GasFrequency: (state, action) => {
      state.expense.expense_Power_or_Gas.frequency.unit = action.payload
    },

    setExpensePhone_InternetAmount: (state, action) => {
      state.expense.expense_Phone_or_Internet.amount = action.payload
    },
    setExpensePhone_InternetFrequency: (state, action) => {
      state.expense.expense_Phone_or_Internet.frequency.unit = action.payload
    },

    setExpenseFuelAmount: (state, action) => {
      state.expense.expense_Fuel.amount = action.payload
    },
    setExpenseFuelFrequency: (state, action) => {
      state.expense.expense_Fuel.frequency.unit = action.payload
    },

    setExpenseWof_RegoAmount: (state, action) => {
      state.expense.expense_Wof_Rego.amount = action.payload
    },
    setExpenseWof_RegoFrequency: (state, action) => {
      state.expense.expense_Wof_Rego.frequency.unit = action.payload
    },

    setExpenseClothingAmount: (state, action) => {
      state.expense.expense_Clothing.amount = action.payload
    },
    setExpenseClothingFrequency: (state, action) => {
      state.expense.expense_Clothing.frequency.unit = action.payload
    },

    setExpenseMedicalExpenseAmount: (state, action) => {
      state.expense.expense_MedicalExpense.amount = action.payload
    },
    setExpenseMedicalExpenseFrequency: (state, action) => {
      state.expense.expense_MedicalExpense.frequency.unit = action.payload
    },

    setExpenseGymAmount: (state, action) => {
      state.expense.expense_Gym.amount = action.payload
    },
    setExpenseGymFrequency: (state, action) => {
      state.expense.expense_Gym.frequency.unit = action.payload
    },

    setExpenseRecreationAmount: (state, action) => {
      state.expense.expense_Recreation.amount = action.payload
    },
    setExpenseRecreationFrequency: (state, action) => {
      state.expense.expense_Recreation.frequency.unit = action.payload
    },

    setExpenseTithingAmount: (state, action) => {
      state.expense.expense_Tithing.amount = action.payload
    },
    setExpenseTithingFrequency: (state, action) => {
      state.expense.expense_Tithing.frequency.unit = action.payload
    },

    setExpenseSavingsAmount: (state, action) => {
      state.expense.expense_Savings.amount = action.payload
    },
    setExpenseSavingsFrequency: (state, action) => {
      state.expense.expense_Savings.frequency.unit = action.payload
    },

    setExpenseOtherExpense1Amount: (state, action) => {
      state.expense.expense_otherExpense1.amount = action.payload
    },
    setExpenseOtherExpense1Frequency: (state, action) => {
      state.expense.expense_otherExpense1.frequency.unit = action.payload
    },
  },
})

export const sopIncomeExpenditureActions = sopIncomeExpenditureSlice.actions
export default sopIncomeExpenditureSlice
