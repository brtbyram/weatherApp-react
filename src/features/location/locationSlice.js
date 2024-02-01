import { createSlice } from '@reduxjs/toolkit'

export const locationSlice = createSlice({
  name: 'location',
  initialState: {
    value: "Trabzon"
  },
  reducers: {
    setLocation: (state, action) => {state.value = action.payload},
    clearLocation: (state) =>  {state.value = ""} 
  }
})


export const { setLocation, clearLocation } = locationSlice.actions

export default locationSlice.reducer