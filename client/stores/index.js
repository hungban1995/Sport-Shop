import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "./notifyReducer";
import userReducer from "./userReducer";

export default configureStore({
  reducer: {
    notify: notifyReducer,
    user: userReducer,
  },
});
