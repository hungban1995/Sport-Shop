import { createSlice } from "@reduxjs/toolkit";
export const darkReducer = createSlice({
  name: "dark",
  initialState: {
    dark: false,
  },
  reducers: {
    setDark: (state, action) => {
      state.dark = action.payload;
    },
  },
});
export const { setDark } = darkReducer.actions;
export default darkReducer.reducer;
