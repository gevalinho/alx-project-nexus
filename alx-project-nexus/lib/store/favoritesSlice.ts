import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [], // will store product objects
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((p) => p.id === product.id);

      if (exists) {
        // remove
        state.items = state.items.filter((p) => p.id !== product.id);
      } else {
        // add
        state.items.push(product);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
