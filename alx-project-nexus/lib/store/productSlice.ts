import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (query: string = "", thunkAPI) => {
    try {
      const res = await fetch(`${API_URL}/products${query}`);
      if (!res.ok) throw new Error("Failed to fetch");
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue("Error fetching products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items ?? action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;
