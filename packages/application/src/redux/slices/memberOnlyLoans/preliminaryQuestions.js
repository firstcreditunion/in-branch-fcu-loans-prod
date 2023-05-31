import { createSlice } from '@reduxjs/toolkit'

const namespace = 'mbroPrelimQns'

export const initialState = {
  jointApplication: {
    label: 'Are you appyliying for a joint loan?',
    isJointApplicantion: null,
  },
  jointApplicantIncome: {
    label: 'Does joint applicn have seperate income from primary applicant?',
    isJointSeperateIncome: null,
  },
}

const mbroPrelimQnsSlice = createSlice({
  name: namespace,
  initialState: initialState,

  reducers: {
    setIsJointApplication: (state, action) => {
      state.jointApplication.isJointApplicantion = action.payload
    },
    setIsJointApplicationIncome: (state, action) => {
      state.jointApplicantIncome.isJointSeperateIncome = action.payload
    },
  },
})

export const mbroPrelimQuestionsActions = mbroPrelimQnsSlice.actions
export default mbroPrelimQnsSlice
