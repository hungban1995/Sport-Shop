import { createSlice } from "@reduxjs/toolkit";
export const deleteDataReducer = createSlice({
  name: "delete",
  initialState: {
    refreshDel: 0,
    manyDel: null,
  },
  reducers: {
    refreshDel: (state) => {
      state.refreshDel += 1;
    },

    getManyDelete: (state, action) => {
      state.manyDel = action.payload;
    },
  },
});
export const { refreshDel, getManyDelete } = deleteDataReducer.actions;
export default deleteDataReducer.reducer;
