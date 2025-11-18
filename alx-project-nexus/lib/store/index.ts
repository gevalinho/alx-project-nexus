import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    favorites: favoritesReducer,
    cart: cartReducer

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
