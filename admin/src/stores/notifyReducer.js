import { createSlice } from "@reduxjs/toolkit";
export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    notify: {},
    alert: {},
  },
  reducers: {
    //get notify
    getNotify: (state, action) => {
      state.notify = action.payload;
    },
    clearNotify: (state) => {
      state.notify = {};
    },
    //get alert
    getAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.alert = {};
    },
  },
});
export const { getNotify, clearNotify, getAlert, clearAlert } =
  notifySlice.actions;
export default notifySlice.reducer;
