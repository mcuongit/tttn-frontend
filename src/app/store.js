import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "../features/languagesSlice";
const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

export default store;
