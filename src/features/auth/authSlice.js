import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authAction";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const userInfo = localStorage.getItem("userInfo")
  ? localStorage.getItem("userInfo")
  : {};

const initialState = {
  loading: false,
  userInfo: userInfo, // for user object
  userAccees: null,
  userToken: userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
      localStorage.setItem("userInfo", payload);
    },
    logout: (state) => {
      localStorage.removeItem("userToken"); // deletes token from storage
      localStorage.removeItem("userInfo"); // deletes userinfo from storage
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
