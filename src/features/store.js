import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './location/locationSlice'

export default configureStore({
  reducer: {
    location: locationReducer,
  }
})