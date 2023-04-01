import { createSlice } from "@reduxjs/toolkit";
export const productVariantsReducer = createSlice({
  name: "variants",
  initialState: {
    varEdit: null,
    refreshVar: 0,
  },
  reducers: {
    setVarEdit: (state, action) => {
      state.varEdit = action.payload;
    },
    refreshVar: (state) => {
      state.refreshVar += 1;
    },
  },
});
export const { setVarEdit, refreshVar } = productVariantsReducer.actions;
export default productVariantsReducer.reducer;
