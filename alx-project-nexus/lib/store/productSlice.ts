/**
 * productSlice.ts
 * -----------------------------------------------------------
 * Redux Toolkit slice for handling all product operations:
 *  - Fetch all products
 *  - Fetch by category
 *  - Search products
 *  - Sort products (asc/desc)
 *
 * Implements industry best practices:
 *  - Separate async thunks for each feature
 *  - Strong TypeScript typing
 *  - Clean, scalable Redux architecture
 */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/* -----------------------------------------------------------
  PRODUCT TYPE (Strongly Typed)
----------------------------------------------------------- */
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

/* -----------------------------------------------------------
  THUNK 1 — Fetch All Products (Home screen)
----------------------------------------------------------- */
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return (await res.json()) as Product[];
  }
);

/* -----------------------------------------------------------
  THUNK 2 — Fetch Products by Category
----------------------------------------------------------- */
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category: string) => {
    const res = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    return (await res.json()) as Product[];
  }
);

/* -----------------------------------------------------------
  THUNK 3 — Search Products
----------------------------------------------------------- */
export const searchProducts = createAsyncThunk(
  "products/search",
  async (query: string) => {
    const res = await fetch(
      `https://fakestoreapi.com/products?q=${query}`
    );
    return (await res.json()) as Product[];
  }
);

/* -----------------------------------------------------------
  THUNK 4 — Sort Products (asc/desc)
----------------------------------------------------------- */
export const sortProducts = createAsyncThunk(
  "products/sort",
  async (order: "asc" | "desc") => {
    const res = await fetch(
      `https://fakestoreapi.com/products?sort=${order}`
    );
    return (await res.json()) as Product[];
  }
);

/* -----------------------------------------------------------
  PRODUCT SLICE
----------------------------------------------------------- */
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /* FETCH ALL PRODUCTS */
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.error = "Failed to fetch products";
    });

    /* CATEGORY FILTER */
    builder.addCase(fetchProductsByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });

    /* SEARCH */
    builder.addCase(searchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });

    /* SORTING */
    builder.addCase(sortProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sortProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
  },
});

export default productSlice.reducer;
