import {configureStore} from "@reduxjs/toolkit";
import {backendApi} from "./backendAPI/backend.api.ts";
import {backendReducer} from "./backendAPI/backend.slice.ts";

export const store = configureStore({
    reducer: {
        [backendApi.reducerPath]: backendApi.reducer,
        backend: backendReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(backendApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;

