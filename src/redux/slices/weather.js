// Redux:
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Axios:
import axios from "axios"

// Action:
export const fetchWeatherAction = createAsyncThunk(
    "weather/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${process.env.REACT_APP_MY_API_KEY}&units=metric`)

            return data
        } catch (error) {
            if(!error?.response) throw error
            
            return rejectWithValue(error?.response?.data)
        }
    }
)

// Slice:
const weatherSlice = createSlice({
    name: "weather",
    initialState: {},
    extraReducers: (builder) => {
        // Pending:
        builder.addCase(fetchWeatherAction.pending, (state, action) => {
            state.loading = true
        })

        // Fulfilled:
        builder.addCase(fetchWeatherAction.fulfilled, (state, action) => {
            state.loading = false
            state.weather = action?.payload
            state.error = null
        })

        // Rejected
        builder.addCase(fetchWeatherAction.rejected, (state, action) => {
            state.loading = false
            state.weather = null
            state.error = action?.payload
        })
    },
})

export default weatherSlice
