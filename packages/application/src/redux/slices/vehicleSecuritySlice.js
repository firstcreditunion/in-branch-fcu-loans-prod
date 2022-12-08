import { createSlice } from '@reduxjs/toolkit'

const namespace = 'vehiclesecurity'

export const initialState = {
  vehicleMake: '',
  vehicleModel: '',
  vehicleManufacturedYear: '',
  vehicleColour: '',
  vehicleRegistrationNumber: '',

  regoProvidedInPrelimQuestions: false,
  wouldYoulikeToProvideVehicleSecurity: false,
  hasPurchsedVehicle: false,

  onSubmitVehicleSecurityDetails: null,
  isValidVehicleSecurityDetails: null,
}

const vehicleSecuritySlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    setVehicleMake: (state, action) => {
      state.vehicleMake = action.payload
    },
    setVehicleModel: (state, action) => {
      state.vehicleModel = action.payload
    },
    setVehicleManufacturedYear: (state, action) => {
      state.vehicleManufacturedYear = action.payload
    },
    setVehicleColour: (state, action) => {
      state.vehicleColour = action.payload
    },
    setVehicleRegistrationNumber: (state, action) => {
      state.vehicleRegistrationNumber = action.payload
    },
    setHasPurchsedVehicle: (state, action) => {
      state.hasPurchsedVehicle = action.payload
    },
    setWouldYoulikeToProvideVehicleSecurity: (state, action) => {
      state.wouldYoulikeToProvideVehicleSecurity = action.payload
    },
    setRegoProvidedInPrelimQuestions: (state, action) => {
      state.regoProvidedInPrelimQuestions = action.payload
    },
    setOnSubmitVehicleSecurityDetails: (state, action) => {
      state.onSubmitVehicleSecurityDetails = action.payload
    },
    setIsValidVehicleSecurityDetails: (state, action) => {
      state.isValidVehicleSecurityDetails = action.payload
    },
  },
})

export const vehicleSecurityActions = vehicleSecuritySlice.actions
export default vehicleSecuritySlice
