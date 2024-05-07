import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Models} from "../../models/car-model.ts";
import {UserProfile} from "../../models/user-profile.ts";
import {CarPart} from "../../models/car-part.ts";


interface BackendState {
    carModels: [] | Models;
    user: UserProfile | {},
    carParts: CarPart[] | [],
    cart: CarPart[]
}

const initialState: BackendState = {
    carModels: await fetch('http://localhost:3000/models')
        .then(res => res.json())
        .catch(() => []),
    user: {},
    carParts: await fetch('http://localhost:3000/parts')
        .then(res => res.json())
        .catch(() => []),
    cart: []
}

export const backendSlice = createSlice(
    {
        name: "backend",
        initialState,
        reducers: {
            setUser(state, action: PayloadAction<UserProfile>) {
                state.user = action.payload as UserProfile;
            },
            clearUser(state) {
                state.user = {}
            },
            addToCart(state, action: PayloadAction<CarPart>) {
                const carPart = action.payload as CarPart;
                state.cart.push(carPart);
            },
            removeFromCart(state, action: PayloadAction<CarPart>) {
                state.cart = state.cart.filter(c => c !== action.payload)
            }
        }
    }
)

export const backendActions = backendSlice.actions;
export const backendReducer = backendSlice.reducer;
