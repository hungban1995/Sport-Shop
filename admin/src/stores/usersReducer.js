import { createSlice } from "@reduxjs/toolkit";
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    refreshLogin: 0,
    refreshUser: 0,
  },
  reducers: {
    //setrefresh
    getRefresh: (state) => {
      state.refreshLogin += 1;
    },
    refreshUser: (state) => {
      state.refreshUser += 1;
    },
  },
});
export const { getRefresh, refreshUser } = usersSlice.actions;
export default usersSlice.reducer;
