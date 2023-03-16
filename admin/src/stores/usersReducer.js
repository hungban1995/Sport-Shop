import { createSlice } from "@reduxjs/toolkit";
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    refresh: 0,
  },
  reducers: {
    //setrefresh
    getRefresh: (state) => {
      state.refresh += 1;
    },
  },
});
export const { getRefresh } = usersSlice.actions;
export default usersSlice.reducer;
