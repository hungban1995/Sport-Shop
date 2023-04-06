import { createSlice } from "@reduxjs/toolkit";
export const imagesReducer = createSlice({
  name: "images",
  initialState: {
    createImage: null,
    editImage: null,
    refreshImage: 0,
  },
  reducers: {
    setCreateImg: (state, action) => {
      state.createImage = action.payload;
    },
    setEditImg: (state, action) => {
      state.editImage = action.payload;
    },
    refreshImage: (state) => {
      state.refreshImage += 1;
    },
  },
});
export const { setCreateImg, setEditImg, refreshImage } = imagesReducer.actions;
export default imagesReducer.reducer;
