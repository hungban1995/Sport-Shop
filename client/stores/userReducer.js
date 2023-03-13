import { createSlice } from "@reduxjs/toolkit";
export const userReducer = createSlice({
  name: "user",
  initialState: {
    count: 0,
  },
  reducers: {
    //get count
    getCount: (state) => {
      state.count++;
    },
  },
});
export const { getCount } = userReducer.actions;
export default userReducer.reducer;
