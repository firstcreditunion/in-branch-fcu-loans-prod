import { createSlice } from '@reduxjs/toolkit'

const namespace = 'sopAssetSlice'

export const initialState = {
  // Each amount is for a different frequecy

  home: {
    amount1: null,
    code: 'HOME',
    desc: 'Home',
  },
  homeAndContents: {
    amount1: null,
    code: 'HSHLDCNT',
    desc: 'Household Contents',
  },
  vehicles: {
    amount1: null,
    code: 'MTRVHCAS',
    desc: 'Motor Vehicle/s',
  },
  boat: {
    amount1: null,
    code: 'BOAT',
    desc: 'Boat',
  },
  savings: {
    amount1: null,
    code: 'SAVNG',
    desc: 'Savings',
  },
  kiwisaver: {
    amount1: null,
    code: 'KIWISUPER',
    desc: 'Kiwisaver/Superannuation',
  },
  s6: {
    amount1: null,
    code: 'ACCNTS6',
    desc: 'Bank Account S6',
  },

  onSubmitAssetDetails: null,
  isValidAssetDetails: null,
}

const sopAssetSlice = createSlice({
  name: namespace,
  initialState: initialState,
  reducers: {
    //Wages
    clearAll: (state, action) => {
      state.home.amount1 = null
      state.homeAndContents.amount1 = null
      state.vehicles.amount1 = null
      state.boat.amount1 = null
      state.savings.amount1 = null
      state.kiwisaver.amount1 = null
      state.s6.amount1 = null
      state.onSubmitAssetDetails = null
      state.isValidAssetDetails = null
    },
    sethomeAmount1: (state, action) => {
      state.home.amount1 = action.payload
    },

    //Second Wages
    setHomeAndContentsAmount1: (state, action) => {
      state.homeAndContents.amount1 = action.payload
    },

    //WINZ
    setVehiclesAmount1: (state, action) => {
      state.vehicles.amount1 = action.payload
    },

    //self employed
    setBoatAmount1: (state, action) => {
      state.boat.amount1 = action.payload
    },

    //NZ Super
    setSavingsAmount1: (state, action) => {
      state.savings.amount1 = action.payload
    },

    //Study Link
    setKiwisaverAmount1: (state, action) => {
      state.kiwisaver.amount1 = action.payload
    },

    // Child Support
    setS6Amount1: (state, action) => {
      state.s6.amount1 = action.payload
    },

    setOnSubmitAssetDetails: (state, action) => {
      state.onSubmitAssetDetails = action.payload
    },
    setIsValidAssetDetails: (state, action) => {
      state.isValidAssetDetails = action.payload
    },
  },
})

export const sopAssetActions = sopAssetSlice.actions
export default sopAssetSlice
