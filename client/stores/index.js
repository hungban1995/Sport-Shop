import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import notifyReducer from "./notifyReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";

export default configureStore({
  reducer: {
    notify: notifyReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
