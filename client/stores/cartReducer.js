import { createSlice } from "@reduxjs/toolkit";
export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    count: 0,
    showCart: false,
  },
  reducers: {
    getShowCart: (state, action) => {
      state.showCart = action.payload;
    },
  },
});
export const { getShowCart } = cartReducer.actions;
export default cartReducer.reducer;
