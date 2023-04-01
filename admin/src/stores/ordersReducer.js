import { createSlice } from "@reduxjs/toolkit";
export const ordersReducer = createSlice({
  name: "orders",
  initialState: {
    refreshOrders: 0,
    updateOrder: null,
  },
  reducers: {
    refreshOrders: (state) => {
      state.refreshOrders += 1;
    },
    getUpdateOrder: (state, action) => {
      state.updateOrder = action.payload;
    },
  },
});
export const { refreshOrders, getUpdateOrder } = ordersReducer.actions;
export default ordersReducer.reducer;
