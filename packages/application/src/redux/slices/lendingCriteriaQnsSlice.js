import { createSlice } from '@reduxjs/toolkit'
import { initial } from 'lodash'

const namespace = 'lendingCriteriaQns'

export const initialState = {
  jointApplication: { key: 'No', value: false },
  jointApplicantClientNo: null,

  existingMember: { key: 'No', value: false },
  existingMemberClientNo: null,

  loanPurpose: null,
  vehicleRelatedLoanPurpose: false,
  vehicleRegistrationNumber: null,

  tradingBranch: null,

  //* Not being used
  age: { key: 'No', value: false },

  isNzCitizen: { key: 'Yes', value: true },
  citizenship: null,

  isNzResident: { key: 'Yes', value: true },
  residency: null,

  hasWorkPermit: { key: 'Yes', value: true },

  hasRegularIncome: { key: '', value: null },
  wasDeclaredBankrupt: { key: '', value: null },
  bankruptcyDate: null,
  incomeCreditedToFCU: { key: '', value: null },

  loanPurposeState: 'initial',
  tradingBranchState: 'initial',
  jointApplicationState: 'initial',
  jointApplicantClientNoState: 'initial',
  existingMemberState: 'initial',
  existingMemberClientNoState: 'initial',
  ageState: 'initial',
  residencyState: 'initial',
  workPermitState: 'initial',
  incomeState: 'initial',
  wasDeclaredBankruptState: 'initial',
  incomeCreditedToFCUState: 'initial',

  isValidLoanPurpose: false,
  isValidTradingBranch: false,
  isValidJointApplication: false,
  isValidJointApplicantClientNo: false,
  isValidExistingMember: false,
  isValidExistingMemberClientNo: false,
  isValidAge: false,
  isValidResidency: false,
  isValidWorkPermit: false,
  isValidIncome: false,
  isValidWasDeclaredBankrupt: false,
  isValidIncomeCreditedToFCU: false,

  proceed: false,
  preQualifyCompleted: null,
}

const lendingCritetiaQnsSlice = createSlice({
  name: namespace,
  initialState: initialState,

  reducers: {
    setLoanPurpose: (state, action) => {
      state.loanPurpose = action.payload
    },
    setPreQualifyCompleted: (state, action) => {
      state.preQualifyCompleted = action.payload
    },
    setVehicleRelatedLoanPurpose: (state, action) => {
      state.vehicleRelatedLoanPurpose = action.payload
    },
    setVehicleRegistrationNumber: (state, action) => {
      state.vehicleRegistrationNumber = action.payload
    },
    setTradingBranch: (state, action) => {
      state.tradingBranch = action.payload
    },
    //* Not being used
    setAge: (state, action) => {
      state.age = action.payload
    },
    setJointApplication: (state, action) => {
      state.jointApplication = action.payload
    },
    setJointApplicantClientNo: (state, action) => {
      state.jointApplicantClientNo = action.payload
    },
    setExistingMember: (state, action) => {
      state.existingMember = action.payload
    },
    setExistingMemberClientNo: (state, action) => {
      state.existingMemberClientNo = action.payload
    },
    setIsNzCitizen: (state, action) => {
      state.isNzCitizen = action.payload
    },
    setCitizenship: (state, action) => {
      state.citizenship = action.payload
    },
    setIsNzResident: (state, action) => {
      state.isNzResident = action.payload
    },
    setResidency: (state, action) => {
      state.residency = action.payload
    },
    setHasWorkPermit: (state, action) => {
      state.hasWorkPermit = action.payload
    },
    setRegularIncome: (state, action) => {
      state.hasRegularIncome = action.payload
    },
    setWasBankrput: (state, action) => {
      state.wasDeclaredBankrupt = action.payload
    },
    setBankruptcyDate: (state, action) => {
      state.bankruptcyDate = action.payload
    },
    setIncomeCreditedToFCU: (state, action) => {
      state.incomeCreditedToFCU = action.payload
    },

    // set State change
    setLoanPurposeState: (state, action) => {
      state.loanPurposeState = action.payload
    },
    setTradingBranchState: (state, action) => {
      state.tradingBranchState = action.payload
    },
    setJointApplicationState: (state, action) => {
      state.jointApplicationState = action.payload
    },
    setJointApplicantClientNoState: (state, action) => {
      state.jointApplicantClientNoState = action.payload
    },
    setExistingMemberState: (state, action) => {
      state.existingMemberState = action.payload
    },
    setExistingMemberClientNoState: (state, action) => {
      state.existingMemberClientNoState = action.payload
    },
    setAgeState: (state, action) => {
      state.ageState = action.payload
    },
    setResidencyState: (state, action) => {
      state.residencyState = action.payload
    },
    setWorkPermitState: (state, action) => {
      state.workPermitState = action.payload
    },
    setIncomeState: (state, action) => {
      state.incomeState = action.payload
    },
    setWasBankruptState: (state, action) => {
      state.wasDeclaredBankruptState = action.payload
    },
    setIncomeCreditedToFCUState: (state, action) => {
      state.incomeCreditedToFCUState = action.payload
    },

    //* Vehicle details

    // Validity
    setIsValidLoanPurpose: (state, action) => {
      state.isValidLoanPurpose = action.payload
    },
    setIsValidTradingBranch: (state, action) => {
      state.isValidTradingBranch = action.payload
    },
    setIsValidJointApplication: (state, action) => {
      state.isValidJointApplication = action.payload
    },
    setIsValidJointApplicantClientNo: (state, action) => {
      state.isValidJointApplicantClientNo = action.payload
    },
    setIsValidExistingMember: (state, action) => {
      state.isValidExistingMember = action.payload
    },
    setIsValidExistingMemberClientNo: (state, action) => {
      state.isValidExistingMemberClientNo = action.payload
    },
    setIsValidAge: (state, action) => {
      state.isValidAge = action.payload
    },
    setIsValidResidency: (state, action) => {
      state.isValidResidency = action.payload
    },
    setIsValidIncome: (state, action) => {
      state.isValidIncome = action.payload
    },
    setIsValidBankruptyDeclaration: (state, action) => {
      state.isValidWasDeclaredBankrupt = action.payload
    },
    setIsValidIncomeCreditedToFCU: (state, action) => {
      state.isValidIncomeCreditedToFCU = action.payload
    },

    // Proceed
    setProceed: (state, action) => {
      state.proceed = action.payload
    },
  },
})

export const lendingCriteriaQnsActions = lendingCritetiaQnsSlice.actions
export default lendingCritetiaQnsSlice
