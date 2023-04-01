import { createSlice } from "@reduxjs/toolkit";
export const productsReducer = createSlice({
  name: "products",
  initialState: {
    refreshProducts: 0,
  },
  reducers: {
    refreshProducts: (state) => {
      state.refreshProducts += 1;
    },
  },
});
export const { refreshProducts } = productsReducer.actions;
export default productsReducer.reducer;
