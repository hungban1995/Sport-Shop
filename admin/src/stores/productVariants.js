import { createSlice } from "@reduxjs/toolkit";
export const productVariantsReducer = createSlice({
  name: "variants",
  initialState: {
    catEdit: false,
    refreshVar: 0,
  },
  reducers: {
    setCatEdit: (state, action) => {
      state.catEdit = action.payload;
    },
    refreshVar: (state) => {
      state.refreshVar += 1;
    },
  },
});
export const { setCatEdit, refreshVar } = productVariantsReducer.actions;
export default productVariantsReducer.reducer;
