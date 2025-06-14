import {configureStore} from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice.js";
import categorySliceReducer from "./Slices/CategorySlice.js";

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        category:categorySliceReducer,
    },
    devTools: true
})

export default store;