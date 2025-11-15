import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
