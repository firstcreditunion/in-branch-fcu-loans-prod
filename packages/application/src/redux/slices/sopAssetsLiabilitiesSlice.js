import { createSlice } from '@reduxjs/toolkit'

const namespace = 'sopassetliabilities'

export const initialState = {
  checkedAssetCodes: [],
  checkedLiabilityCodes: [],

  // ***** Assets ***** //

  asset: {
    asset_home: {
      title: 'Home',
      groupBy: 'asset',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive your wages?' },
      label: 'Home',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Home', code: 'AHME' },
      sovereign: { key: 'HOME', value: 'Home' },
    },
    asset_Home_and_Contents: {
      title: 'Home and Contents',
      groupBy: 'Home and Contents',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive your wages?' },
      label: 'Home and Contents',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Home and Contents', code: 'AHCTS' },
      sovereign: { key: 'HSHLDCNT', value: 'Household Contents' },
    },
    asset_vehicles: {
      title: 'Vehicle(s)',
      groupBy: 'asset',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive WINZ Benefit?' },
      label: 'Vehicle(s)',
      autoComplete: { title: 'Vehicle(s)', code: 'AVEH' },
      sovereign: { key: 'MTRVHCAS', value: 'Motor Vehicle/s' },
    },
    asset_boat: {
      title: 'Boat',
      groupBy: 'asset',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive WINZ Benefit?' },
      label: 'Boat',
      autoComplete: { title: 'Boat', code: 'ABOT' },
      sovereign: { key: 'BOAT', value: 'Boat' },
    },
    asset_savings: {
      title: 'Savings',
      groupBy: 'asset',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you receive this income?' },
      label: 'Savings',
      autoComplete: { title: 'Savings', code: 'ASVS' },
      sovereign: { key: 'SAVNG', value: 'Savings' },
    },
    asset_kiwisaver: {
      title: 'Kiwi Saver',
      groupBy: 'asset',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'Kiwi Saver',
      autoComplete: { title: 'Kiwi Saver', code: 'AKWS' },
      sovereign: { key: 'KIWISUPER', value: 'Kiwisaver/Superannuation' },
    },
    asset_nzsuper: {
      title: 'NZ Super',
      groupBy: 'asset',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'NZ Super',
      autoComplete: { title: 'NZ Super', code: 'ANZPR' },
      sovereign: { key: 'NZSUPER', value: 'New Zealand Super' },
    },
    asset_s6: {
      title: 'FCU Loan Provider',
      groupBy: 'incassetome',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
      label: 'FCU Loan Provider',
      autoComplete: { title: 'FCU Loan Provider', code: 'ALNPR' },
      sovereign: { key: 'ACCNTS6', value: 'Bank Account S6' },
    },
    // asset_other1: {
    //   title: 'Other Asset 1',
    //   groupBy: 'asset',
    //   amount: null,
    //   // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
    //   label: 'Other Asset 1',
    //   autoComplete: { title: 'Other Asset 1', code: 'AOTH1' },
    //   sovereign: { key: 'OTHASS1', value: 'Other Assets' },
    // },
    // asset_other2: {
    //   title: 'Other Asset 2',
    //   groupBy: 'asset',
    //   amount: null,
    //   // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you recive this income?' },
    //   label: 'Other Asset 2',
    //   autoComplete: { title: 'Other Asset 2', code: 'AOTH2' },
    //   sovereign: { key: 'OTHASS2', value: 'Other Assets' },
    // },
  },

  //***** Liabilities *****/

  liability: {
    liability_mortgage: {
      title: 'Mortgage',
      groupBy: 'liability',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay rent?' },
      label: 'Mortgage',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Mortgage', code: 'LMRG' },
      sovereign: { key: '1STMORT', value: 'First Mortgage' },
    },
    liability_storecard: {
      title: 'Storecard',
      groupBy: 'liability',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay rent?' },
      label: 'Storecard',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Storecard', code: 'LSCRD' },
      sovereign: { key: 'SCRDHPUR', value: 'Store Cards/Hire Purchase' },
    },
    liability_Mastercard: {
      title: 'Mastercard',
      groupBy: 'liability',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay rent?' },
      label: 'Mastercard',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Mastercard', code: 'LMCRD' },
      sovereign: { key: 'MSCARD', value: 'Mastercard' },
    },
    liability_Visa: {
      title: 'Visa Card',
      groupBy: 'liability',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay rent?' },
      label: 'Visa Card',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Visa Card', code: 'LVCRD' },
      sovereign: { key: 'VISACARD', value: 'Visa Card' },
    },
    liability_studentloan: {
      title: 'Student Loan',
      groupBy: 'liability',
      amount: null,
      // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay rent?' },
      label: 'Student Loan',
      tooltip: { display: false, tip: '' },
      autoComplete: { title: 'Student Loan', code: 'LSLN' },
      sovereign: { key: 'STUDENTLO', value: 'Student Loan' },
    },
    // liability_otherliability1: {
    //   title: 'Other Liability 1',
    //   groupBy: 'liability',
    //   amount: null,
    //   // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay rent?' },
    //   label: 'Other Liability 1',
    //   tooltip: { display: false, tip: '' },
    //   autoComplete: { title: 'Other Liability 1', code: 'LOTH1' },
    //   sovereign: { key: 'HOME', value: 'Home' },
    // },
    // liability_otherliability2: {
    //   title: 'Other Liability 2',
    //   groupBy: 'liability',
    //   amount: null,
    //   // frequency: { value: 1, unit: 'W', dialogTitleText: 'How often do you pay rent?' },
    //   label: 'Other Liability 2',
    //   tooltip: { display: false, tip: '' },
    //   autoComplete: { title: 'Other Liability 2', code: 'LOTH2' },
    //   sovereign: { key: 'HOME', value: 'Home' },
    // },
  },

  onSubmitSopAssetLiability: null,
  isValidSopAssetLiability: null,
}

const sopAssetLiabilitySlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    // reducers to set checked and unchecked items from Income autocomplete
    setSelectedAssetTypes: (state, action) => {
      state.checkedAssetCodes = action.payload
    },
    setSelectedLiabilityTypes: (state, action) => {
      state.checkedLiabilityCodes = action.payload
    },

    // Form Submission setters
    setOnSubmitSopAssetLiabilityDetails: (state, action) => {
      state.onSubmitSopAssetLiability = action.payload
    },
    setIsValidSopAssetLiabilityDetails: (state, action) => {
      state.isValidSopAssetLiability = action.payload
    },

    // ------ Setters for Asset -------- //

    setAssetHomeAmount: (state, action) => {
      state.asset.asset_home.amount = action.payload
    },

    setAssetHomeAndContentsAmount: (state, action) => {
      state.asset.asset_Home_and_Contents.amount = action.payload
    },

    setAssetVehiclesAmount: (state, action) => {
      state.asset.asset_vehicles.amount = action.payload
    },

    setAssetBoatAmount: (state, action) => {
      state.asset.asset_boat.amount = action.payload
    },

    setAssetSavingsAmount: (state, action) => {
      state.asset.asset_savings.amount = action.payload
    },

    setAssetKiwisaverAmount: (state, action) => {
      state.asset.asset_kiwisaver.amount = action.payload
    },

    setAssetNzSuperAmount: (state, action) => {
      state.asset.asset_nzsuper.amount = action.payload
    },

    setAssetFcuLoanProviderAmount: (state, action) => {
      state.asset.asset_s6.amount = action.payload
    },

    // setAssetOtherAsset1Amount: (state, action) => {
    //   state.asset.asset_other1.amount = action.payload
    // },
    // setAssetOtherAsset2Amount: (state, action) => {
    //   state.asset.asset_other2.amount = action.payload
    // },

    // ------ Setters for Liability -------- //

    setLiabilityMortgageAmount: (state, action) => {
      state.liability.liability_mortgage.amount = action.payload
    },

    setLiabilityStorecardAmount: (state, action) => {
      state.liability.liability_storecard.amount = action.payload
    },

    setLiabilityMastercardAmount: (state, action) => {
      state.liability.liability_Mastercard.amount = action.payload
    },

    setLiabilityVisaAmount: (state, action) => {
      state.liability.liability_Visa.amount = action.payload
    },

    setLiabilityStudentLoanAmount: (state, action) => {
      state.liability.liability_studentloan.amount = action.payload
    },

    // setLiabilityOtherLiability1Amount: (state, action) => {
    //   state.liability.liability_otherliability1.amount = action.payload
    // },

    // setLiabilityOtherLiability2Amount: (state, action) => {
    //   state.liability.liability_otherliability2.amount = action.payload
    // },
  },
})

export const sopAssetLiabilityActions = sopAssetLiabilitySlice.actions
export default sopAssetLiabilitySlice
