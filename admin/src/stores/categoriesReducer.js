import { createSlice } from "@reduxjs/toolkit";
export const categoriesReducer = createSlice({
  name: "categories",
  initialState: {
    createCat: false,
    catEdit: false,
    refreshCat: 0,
  },
  reducers: {
    setCreateCat: (state, action) => {
      state.createCat = action.payload;
    },
    setCatEdit: (state, action) => {
      state.catEdit = action.payload;
    },
    refreshCat: (state) => {
      state.refreshCat += 1;
    },
  },
});
export const { setCreateCat, setCatEdit, refreshCat } =
  categoriesReducer.actions;
export default categoriesReducer.reducer;
