import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { convertTurkishToEnglish } from "../helpers/convert-turkish-to-english";

const initialState = {
    weatherData: [],
    historicalWeatherData: [],
    astronomyData: [],
    loading: false,
}


const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

export const fetchWeatherData = createAsyncThunk(
    "data/fetchWeatherData",
    async (location, days = 3,) => {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${convertTurkishToEnglish(location)}&days=${days}&aqi=no&alerts=yes`);
        return response.data;
    }
);

export const fetchHistoricalWeatherData = createAsyncThunk(
    "data/fetchHistoricalWeatherData",
    async ({location, date}) => {
        const response = await axios.get(`http://api.weatherapi.com/v1/history.json?key=${import.meta.env.VITE_WEATHER_API}&q=${convertTurkishToEnglish(location)}&dt=${date}`);
        return response.data;
    }
);


export const fetchAstronomyData = createAsyncThunk(
    "data/astronomyData",
    async (lat, lon) => {
        const response = await axios.get(`https://moonphases.co.uk/service/getMoonDetails.php?day=${day}&month=${month}&year=${year}&lat=${lat}&lng=${lon}&len=30&tz=0`)
        return response.data;
    }
);

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setWeatherData: (state, action) => {
            state.weatherData = action.payload;
        },
        setAstronomyData: (state, action) => {
            state.astronomyData = action.payload;
        },
        setHistoricalWeatherData: (state, action) => {
            state.historicalWeatherData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.weatherData = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAstronomyData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAstronomyData.fulfilled, (state, action) => {
            state.astronomyData = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchHistoricalWeatherData.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchHistoricalWeatherData.fulfilled, (state, action) => {
            state.historicalWeatherData = action.payload;
            state.loading = false;
        });
    },
});

export const { setWeatherData, setAstronomyData, setHistoricalWeatherData, loading } = dataSlice.actions;
export default dataSlice.reducer;