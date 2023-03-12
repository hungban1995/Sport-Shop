import { createSlice } from "@reduxjs/toolkit";
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    refresh: false,
  },
  reducers: {
    //setrefresh
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});
export const { getRefresh } = usersSlice.actions;
export default usersSlice.reducer;
