import { createSlice } from "@reduxjs/toolkit";
export const orderReducer = createSlice({
  name: "order",
  initialState: {
    order: {},
  },
  reducers: {
    //get order
    getOrder: (state, action) => {
      state.order = action.payload;
    },
  },
});
export const { getOrder } = orderReducer.actions;
export default orderReducer.reducer;
