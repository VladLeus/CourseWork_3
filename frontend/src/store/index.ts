import {configureStore} from "@reduxjs/toolkit";
import {backendApi} from "./backendAPI/backend.api.ts";

export const store = configureStore({
    reducer: {
        [backendApi.reducerPath]: backendApi.reducer
    }
})
