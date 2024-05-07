import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Models} from "../../models/car-model.ts";
import {UserProfile} from "../../models/user-profile.ts";


interface BackendState {
    carModels: [] | Models;
    user: UserProfile | {}
}

const initialState: BackendState = {
    carModels: await fetch('http://localhost:3000/models')
        .then(res => res.json())
        .catch(() => []),
    user: {}
}

export const backendSlice = createSlice(
    {
        name: "backend",
        initialState,
        reducers: {
            setUser(state, action: PayloadAction<UserProfile>) {
                state.user = action.payload as UserProfile;
            }
        }
    }
)

export const backendActions = backendSlice.actions;
export const backendReducer = backendSlice.reducer;
