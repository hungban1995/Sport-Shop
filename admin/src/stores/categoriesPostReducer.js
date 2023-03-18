import { createSlice } from "@reduxjs/toolkit";
export const categoriesPostReducer = createSlice({
  name: "categoriesPost",
  initialState: {
    createCatPost: false,
    catPostEdit: false,
    refreshCatPost: 0,
  },
  reducers: {
    setCreateCatPost: (state, action) => {
      state.createCatPost = action.payload;
    },
    setCatPostEdit: (state, action) => {
      state.catPostEdit = action.payload;
    },
    refreshCatPost: (state) => {
      state.refreshCatPost += 1;
    },
  },
});
export const { setCreateCatPost, setCatPostEdit, refreshCatPost } =
  categoriesPostReducer.actions;
export default categoriesPostReducer.reducer;
