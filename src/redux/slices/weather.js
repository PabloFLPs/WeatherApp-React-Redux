// Redux:
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

// Axios:
import axios from "axios"

// Action:
export const fecthWeatherAction = createAsyncThunk(
    "weather/fetch",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload}&appid=${process.env.REACT_APP_MY_API_KEY}`)

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
    initialState: { data: "loaded" },
    extraReducers: (builder) => {
        // Pending:
        builder.addCase(fecthWeatherAction.pending, (state, action) => {
            state.loading = true
        })

        // Fulfilled:
        builder.addCase(fecthWeatherAction.fulfilled, (state, action) => {
            state.loading = false
            state.weather = action?.payload
            state.error = undefined
        })

        // Rejected
        builder.addCase(fecthWeatherAction.rejected, (state, action) => {
            state.loading = false
            state.weather = undefined
            state.error = action?.payload
        })
    },
})

export default weatherSlice
