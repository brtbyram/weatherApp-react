import {configureStore} from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import dataReducer from './dataSlice';


const store = configureStore({
    reducer: 
    {
        location: locationReducer,
        data: dataReducer,
    },
});

export default store;

