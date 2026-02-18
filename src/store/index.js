import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./slices/restaurantSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    cart: cartReducer,
  },
});
