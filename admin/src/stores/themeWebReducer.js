import { createSlice } from "@reduxjs/toolkit";
export const themeWeb = createSlice({
  name: "themeWeb",
  initialState: {
    dark: false,
    background: null,
  },
  reducers: {
    setDark: (state, action) => {
      state.dark = action.payload;
    },
    setBackground: (state, action) => {
      state.background = action.payload;
    },
  },
});
export const { setDark, setBackground } = themeWeb.actions;
export default themeWeb.reducer;
