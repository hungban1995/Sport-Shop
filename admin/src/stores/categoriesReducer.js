import { createSlice } from "@reduxjs/toolkit";
export const categoriesReducer = createSlice({
  name: "categories",
  initialState: {
    dataEdit: false,
  },
  reducers: {
    setDataEdit: (state, action) => {
      state.dataEdit = action.payload;
    },
  },
});
export const { setDataEdit } = categoriesReducer.actions;
export default categoriesReducer.reducer;
