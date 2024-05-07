import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Models} from "../../models/car-model.ts";
import {CreateUserDto} from "../../models/dto/create-user.dto.ts";
import {UserProfile} from "../../models/user-profile.ts";
import {LoginUserDto} from "../../models/dto/login-user.dto.ts";

export const backendApi = createApi({
    reducerPath: 'backend/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000'
    }),
    endpoints: build => ({
        carModel: build.query<Models, string>({
            query: () => ({
                url: `/models`
            })
        }),
        createUser: build.mutation<UserProfile, CreateUserDto>({
            query: (body: CreateUserDto) => ({
                url: `/users`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: any) => { return response },
            transformErrorResponse: (response: any) => { return response }
        }),
        loginUser: build.mutation<UserProfile, LoginUserDto>({
            query: (body: LoginUserDto) => ({
                url: `/users/login`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: any) => { return response },
            transformErrorResponse: (response: any) => { return response }
        })
    })
});

export const { useLazyCarModelQuery, useCreateUserMutation, useLoginUserMutation} = backendApi;
