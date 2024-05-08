import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Models} from "../../models/car-model.ts";
import {UserProfile} from "../../models/user-profile.ts";
import {CarPart} from "../../models/car-part.ts";
import {Detail} from "../../models/Detail.ts";
import {Order} from "../../models/dto/order/order.ts";


interface BackendState {
    carModels: [] | Models;
    user: UserProfile | null,
    carParts: CarPart[] | [],
    cart: CarPart[],
    details: Detail[],
    ordersAdmin: Order[]
}

const initialState: BackendState = {
    carModels: await fetch('http://localhost:3000/models')
        .then(res => res.json())
        .catch(() => []),
    user: null,
    carParts: await fetch('http://localhost:3000/parts')
        .then(res => res.json())
        .catch(() => []),
    cart: [],
    details: [],
    ordersAdmin: await fetch('http://localhost:3000/order/admin')
        .then(res => res.json())
        .catch(() => []),
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
                state.user = null;
            },
            addToCart(state, action: PayloadAction<CarPart>) {
                const carPart = action.payload as CarPart;
                state.cart.push(carPart);
            },
            removeFromCart(state, action: PayloadAction<CarPart>) {
                state.cart = state.cart.filter(c => c.id !== action.payload.id);
            },
            clearCart(state) {
                state.cart = [];
            },
            addDetail(state, action: PayloadAction<Detail>) {
                const detail = action.payload as Detail;
                const existingDetailIndex = state.details.findIndex(d => d.car_part_id === detail.car_part_id);
                if (existingDetailIndex !== -1) {
                    state.details[existingDetailIndex].quantity = detail.quantity;
                } else {
                    state.details.push(detail);
                }
            },
            removeDetail(state, action: PayloadAction<Detail>) {
                state.details = state.details.filter(c => c.car_part_id !== action.payload.car_part_id);
            },
            clearDetails(state) {
                state.cart = [];
            },
            setOrder: (state, action: PayloadAction<Order[]>) => {
                state.ordersAdmin = action.payload as Order[];
            },
            removeOrder(state, action: PayloadAction<{orderID: string}>) {
                state.ordersAdmin = state.ordersAdmin.filter(o => o.id !== action.payload.orderID);
            },
        }
    }
)

export const backendActions = backendSlice.actions;
export const backendReducer = backendSlice.reducer;
