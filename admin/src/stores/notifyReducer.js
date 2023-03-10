import { createSlice } from "@reduxjs/toolkit";
export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    notify: {},
  },
  reducers: {
    //get notify
    getNotify: (state, action) => {
      state.notify = action.payload;
    },
    clearNotify: (state) => {
      state.notify = state;
    },
  },
});
export const { getNotify, clearNotify } = notifySlice.actions;
export default notifySlice.reducer;
