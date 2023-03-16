import { createSlice } from "@reduxjs/toolkit";
export const categoriesReducer = createSlice({
  name: "categories",
  initialState: {
    createCat: false,
    dataEdit: false,
    refreshCat: 0,
  },
  reducers: {
    setCreateCat: (state, action) => {
      state.createCat = action.payload;
    },
    setDataEdit: (state, action) => {
      state.dataEdit = action.payload;
    },
    refreshCat: (state) => {
      state.refreshCat += 1;
    },
  },
});
export const { setCreateCat, setDataEdit, refreshCat } =
  categoriesReducer.actions;
export default categoriesReducer.reducer;
