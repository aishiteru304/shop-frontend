import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import productSliceReducer from "./productSlice";
import cartSliceReducer from './cartSlice'

export const store = configureStore({
    reducer: {
        user: userSliceReducer,
        product: productSliceReducer,
        cart: cartSliceReducer
    },
});