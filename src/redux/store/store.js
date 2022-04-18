// Redux:
import { configureStore } from "@reduxjs/toolkit"
import weatherSlice from "../slices/weather"

const store = configureStore({
    reducer: weatherSlice
})

export default store
