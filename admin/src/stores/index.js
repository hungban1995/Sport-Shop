import { configureStore } from "@reduxjs/toolkit";
import themeWebReducer from "./themeWebReducer";
import notifyReducer from "./notifyReducer";
import usersReducer from "./usersReducer";
import categoriesReducer from "./categoriesReducer";
import categoriesPostReducer from "./categoriesPostReducer";
import postsReducer from "./postsReducer";

export default configureStore({
  reducer: {
    users: usersReducer,
    notify: notifyReducer,
    themeWeb: themeWebReducer,
    categories: categoriesReducer,
    categoriesPost: categoriesPostReducer,
    posts: postsReducer,
  },
});
