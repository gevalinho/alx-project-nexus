import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/Product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    increaseQty: (state, action: PayloadAction<Product["id"]>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQty: (state, action: PayloadAction<Product["id"]>) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    removeItem: (state, action: PayloadAction<Product["id"]>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeItem } =
  cartSlice.actions;

export default cartSlice.reducer;
