import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: "languages",
  initialState: {
    value: "vi",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
