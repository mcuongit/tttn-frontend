import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLogin: false,
    },
    reducers: {
        handleLogin: (state, action) => {
            state.isLogin = action.payload;
        },
    },
});

export const { handleLogin } = loginSlice.actions;
export default loginSlice.reducer;
