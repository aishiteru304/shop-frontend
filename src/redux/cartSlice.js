import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

const initialState = {
    cartItem: [],
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setDataCart: (state, action) => {
            if (action.payload.length !== 0)
                state.cartItem = [...action.payload];
        }
    }
});

export const {
    setDataCart
} = cartSlice.actions;

export default cartSlice.reducer;