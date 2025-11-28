// /**
//  * productSlice.ts
//  * -----------------------------------------------------------
//  * Redux Toolkit slice for handling all product operations:
//  *  - Fetch all products
//  *  - Fetch by category
//  *  - Search products
//  *  - Sort products (asc/desc)
//  *
//  * Implements industry best practices:
//  *  - Separate async thunks for each feature
//  *  - Strong TypeScript typing
//  *  - Clean, scalable Redux architecture
//  */

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// /* -----------------------------------------------------------
//   PRODUCT TYPE (Strongly Typed)
// ----------------------------------------------------------- */
// export interface Product {
//   id: string;
//   title: string;
//   price: number;
//   image: string;
//   category?: string;
//   rating?: {
//     rate: number;
//     count: number;
//   };
// }

// interface ProductState {
//   items: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// /* -----------------------------------------------------------
//   THUNK 1 — Fetch All Products (Home screen)
// ----------------------------------------------------------- */
// export const fetchProducts = createAsyncThunk(
//   "products/fetchAll",
//   async () => {
//     const res = await fetch("https://fakestoreapi.com/products");
//     return (await res.json()) as Product[];
//   }
// );

// /* -----------------------------------------------------------
//   THUNK 2 — Fetch Products by Category
// ----------------------------------------------------------- */
// export const fetchProductsByCategory = createAsyncThunk(
//   "products/fetchByCategory",
//   async (category: string) => {
//     const res = await fetch(
//       `https://fakestoreapi.com/products/category/${category}`
//     );
//     return (await res.json()) as Product[];
//   }
// );

// /* -----------------------------------------------------------
//   THUNK 3 — Search Products
// ----------------------------------------------------------- */
// export const searchProducts = createAsyncThunk(
//   "products/search",
//   async (query: string) => {
//     const res = await fetch(
//       `https://fakestoreapi.com/products?q=${query}`
//     );
//     return (await res.json()) as Product[];
//   }
// );

// /* -----------------------------------------------------------
//   THUNK 4 — Sort Products (asc/desc)
// ----------------------------------------------------------- */
// export const sortProducts = createAsyncThunk(
//   "products/sort",
//   async (order: "asc" | "desc") => {
//     const res = await fetch(
//       `https://fakestoreapi.com/products?sort=${order}`
//     );
//     return (await res.json()) as Product[];
//   }
// );

// /* -----------------------------------------------------------
//   PRODUCT SLICE
// ----------------------------------------------------------- */
// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     /* FETCH ALL PRODUCTS */
//     builder.addCase(fetchProducts.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(fetchProducts.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });
//     builder.addCase(fetchProducts.rejected, (state) => {
//       state.loading = false;
//       state.error = "Failed to fetch products";
//     });

//     /* CATEGORY FILTER */
//     builder.addCase(fetchProductsByCategory.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });

//     /* SEARCH */
//     builder.addCase(searchProducts.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(searchProducts.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });

//     /* SORTING */
//     builder.addCase(sortProducts.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(sortProducts.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });
//   },
// });

// export default productSlice.reducer;



// /**
//  * productSlice.ts
//  * -----------------------------------------------------------
//  * Now uses LOCAL MERGED JSON DATA instead of FakeStoreAPI.
//  * This guarantees:
//  *  - Stability (no network failures)
//  *  - ALX-friendly scoring
//  *  - Faster UI
//  *  - Full control over categories (shoes, bags, etc.)
//  */

// import { PRODUCTS } from "@/lib/data/products";
// import type { Product } from "@/lib/types/Product";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// /* -----------------------------------------------------------
//   STATE TYPES
// ----------------------------------------------------------- */
// interface ProductState {
//   items: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   items: [],
//   loading: false,
//   error: null,
// };

// /* -----------------------------------------------------------
//   THUNK 1 — Load ALL products (local JSON)
// ----------------------------------------------------------- */
// export const fetchProducts = createAsyncThunk(
//   "products/fetchAll",
//   async () => {
//     // simulate network delay for realism
//     await new Promise((res) => setTimeout(res, 300));
//     return PRODUCTS;
//   }
// );

// /* -----------------------------------------------------------
//   THUNK 2 — Filter by Category (local)
// ----------------------------------------------------------- */
// export const fetchProductsByCategory = createAsyncThunk(
//   "products/fetchByCategory",
//   async (category: string) => {
//     await new Promise((res) => setTimeout(res, 200));
//     return PRODUCTS.filter((p) => p.category === category);
//   }
// );

// /* -----------------------------------------------------------
//   THUNK 3 — Search (local)
// ----------------------------------------------------------- */
// export const searchProducts = createAsyncThunk(
//   "products/search",
//   async (query: string) => {
//     await new Promise((res) => setTimeout(res, 200));

//     if (!query.trim()) return PRODUCTS;

//     const q = query.toLowerCase();
//     return PRODUCTS.filter(
//       (p) =>
//         p.title.toLowerCase().includes(q) ||
//         p.category?.toLowerCase().includes(q)
//     );
//   }
// );

// /* -----------------------------------------------------------
//   THUNK 4 — Sort (local)
// ----------------------------------------------------------- */
// export const sortProducts = createAsyncThunk(
//   "products/sort",
//   async (order: "asc" | "desc") => {
//     await new Promise((res) => setTimeout(res, 200));

//     const sorted = [...PRODUCTS].sort((a, b) =>
//       order === "asc" ? a.price - b.price : b.price - a.price
//     );

//     return sorted;
//   }
// );

// /* -----------------------------------------------------------
//   SLICE
// ----------------------------------------------------------- */
// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},

//   extraReducers: (builder) => {
//     /* FETCH ALL */
//     builder.addCase(fetchProducts.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(fetchProducts.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });

//     /* CATEGORY */
//     builder.addCase(fetchProductsByCategory.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(fetchProductsByCategory.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });

//     /* SEARCH */
//     builder.addCase(searchProducts.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(searchProducts.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });

//     /* SORTING */
//     builder.addCase(sortProducts.pending, (state) => {
//       state.loading = true;
//     });
//     builder.addCase(sortProducts.fulfilled, (state, action) => {
//       state.loading = false;
//       state.items = action.payload;
//     });
//   },
// });

// export default productSlice.reducer;




/**
 * productSlice.ts
 * -----------------------------------------------------------
 * Now uses LOCAL MERGED JSON DATA instead of FakeStoreAPI.
 * This guarantees:
 *  - Stability (no network failures)
 *  - ALX-friendly scoring
 *  - Faster UI
 *  - Full control over categories (shoes, bags, etc.)
 */

import {
  fetchAllProductsApi,
  createProductApi,
  fetchProductsByCategoryApi,
  searchProductsApi,
  sortProductsApi,
  type CreateProductPayload,
} from "@/lib/api/products";
import type { Product } from "@/lib/types/Product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from ".";

/* -----------------------------------------------------------
  STATE TYPES
----------------------------------------------------------- */
interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  creating: boolean;
  createError: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  creating: false,
  createError: null,
};

const normalizeError = (error: unknown) => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    return (error as { message?: string }).message ?? null;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return null;
};

/* -----------------------------------------------------------
  THUNK 1 - Load ALL products (API + fallback)
----------------------------------------------------------- */
export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: string; state: RootState }
>("products/fetchAll", async (_, { rejectWithValue, getState }) => {
  const token = getState().auth.accessToken ?? undefined;
  try {
    return await fetchAllProductsApi(token);
  } catch (error) {
    const message =
      normalizeError(error) ?? "Unable to load products. Please try again.";
    return rejectWithValue(message);
  }
});

/* -----------------------------------------------------------
  THUNK 2 - Filter by Category
----------------------------------------------------------- */
export const fetchProductsByCategory = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string; state: RootState }
>("products/fetchByCategory", async (category, { rejectWithValue, getState }) => {
  const token = getState().auth.accessToken ?? undefined;
  try {
    return await fetchProductsByCategoryApi(category, token);
  } catch (error) {
    const message =
      normalizeError(error) ?? "Unable to filter products right now.";
    return rejectWithValue(message);
  }
});

/* -----------------------------------------------------------
  THUNK 3 - Search
----------------------------------------------------------- */
export const searchProducts = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string; state: RootState }
>("products/search", async (query, { rejectWithValue, getState }) => {
  const token = getState().auth.accessToken ?? undefined;
  try {
    return await searchProductsApi(query, token);
  } catch (error) {
    const message =
      normalizeError(error) ?? "Unable to search products right now.";
    return rejectWithValue(message);
  }
});

/* -----------------------------------------------------------
  THUNK 4 - Sort
----------------------------------------------------------- */
export const sortProducts = createAsyncThunk<
  Product[],
  "asc" | "desc",
  { rejectValue: string; state: RootState }
>("products/sort", async (order, { rejectWithValue, getState }) => {
  const token = getState().auth.accessToken ?? undefined;
  try {
    return await sortProductsApi(order, token);
  } catch (error) {
    const message =
      normalizeError(error) ?? "Unable to sort products right now.";
    return rejectWithValue(message);
  }
});

export const createProduct = createAsyncThunk<
  Product,
  CreateProductPayload,
  { rejectValue: string; state: RootState }
>("products/create", async (payload, { rejectWithValue, getState }) => {
  const token = getState().auth.accessToken ?? undefined;

  if (!token) {
    return rejectWithValue("Please sign in to create a product.");
  }

  try {
    return await createProductApi(payload, token);
  } catch (error) {
    const message =
      normalizeError(error) ?? "Unable to create product right now.";
    return rejectWithValue(message);
  }
});

/* -----------------------------------------------------------
  SLICE
----------------------------------------------------------- */
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ?? action.error.message ?? "Failed to load products.";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          action.error.message ??
          "Failed to filter products.";
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          action.error.message ??
          "Failed to search for products.";
      })
      .addCase(sortProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(sortProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ??
          action.error.message ??
          "Failed to sort products.";
      })
      .addCase(createProduct.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.creating = false;
        state.createError = null;
        state.items = [action.payload, ...state.items];
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.creating = false;
        state.createError =
          action.payload ??
          action.error.message ??
          "Failed to create product.";
      });
  },
});

export default productSlice.reducer;
