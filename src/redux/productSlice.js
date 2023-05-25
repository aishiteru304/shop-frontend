import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-hot-toast";

const initialState = {
    productList: [],
    cartItem: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.productList = [...action.payload];
        }
    }
});

export const {
    setDataProduct
} = productSlice.actions;

export default productSlice.reducer;