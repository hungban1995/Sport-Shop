import { createSlice } from "@reduxjs/toolkit";
export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    refresh: false,
    userEdit: null,
  },
  reducers: {
    //setrefresh
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    //get all
    getAllUsers: (state, action) => {
      state.users = action.payload;
    },
    //update
    getUserEdit: (state, action) => {
      state.userEdit = action.payload;
    },
  },
});
export const { getRefresh, getAllUsers, getUserEdit } = usersSlice.actions;
export default usersSlice.reducer;
