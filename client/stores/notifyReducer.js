import { createSlice } from "@reduxjs/toolkit";
export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    notify: null,
    alert: {},
    loading: false,
  },
  reducers: {
    //get notify
    getNotify: (state, action) => {
      state.notify = action.payload;
    },
    clearNotify: (state) => {
      state.notify = state;
    },
    //get alert
    getAlert: (state, action) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.notify = state;
    },
    //get loading
    getLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { getNotify, clearNotify, getAlert, clearAlert, getLoading } =
  notifySlice.actions;
export default notifySlice.reducer;
