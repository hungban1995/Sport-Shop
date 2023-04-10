import { createSlice } from "@reduxjs/toolkit";
export const notifySlice = createSlice({
  name: "notify",
  initialState: {
    notify: {},
    alert: {},
    toastMes: {},
    loading: false,
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
    //get toast
    getToast: (state, action) => {
      state.toastMes = action.payload;
    },
    clearToast: (state) => {
      state.toastMes = {};
    },
    getLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const {
  getNotify,
  clearNotify,
  getAlert,
  clearAlert,
  getToast,
  clearToast,
  getLoading,
} = notifySlice.actions;
export default notifySlice.reducer;
