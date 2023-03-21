import { createSlice } from "@reduxjs/toolkit";
export const postsReducer = createSlice({
  name: "posts",
  initialState: {
    refreshPosts: 0,
  },
  reducers: {
    refreshPosts: (state) => {
      state.refreshPosts += 1;
    },
  },
});
export const { refreshPosts } = postsReducer.actions;
export default postsReducer.reducer;
