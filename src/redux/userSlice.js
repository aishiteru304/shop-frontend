import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    firstName: "",
    image: "",
    lastName: "",
    _id: "",
    token: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            // console.log(action.payload)
            state._id = action.payload._id;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.email = action.payload.email;
            state.image = action.payload.image;
            state.token = action.payload.token;
        },
        logoutRedux: (state, action) => {
            state._id = "";
            state.firstName = "";
            state.lastName = "";
            state.email = "";
            state.image = "";
        },
    },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;