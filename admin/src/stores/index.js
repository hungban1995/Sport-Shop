import { configureStore } from "@reduxjs/toolkit";
import darkReducer from "./darkReducer";
import notifyReducer from "./notifyReducer";
import usersReducer from "./usersReducer";

export default configureStore({
  reducer: {
    users: usersReducer,
    notify: notifyReducer,
    dark: darkReducer,
  },
});
