import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
    reducerPath: 'backend/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints: build => ({
        helloWorld: build.query({
            query: () => ({
                url: `/`
            })
        })
    })
});

const {} = backendApi;
