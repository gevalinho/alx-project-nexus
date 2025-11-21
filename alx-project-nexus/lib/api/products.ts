import { PRODUCTS } from "@/lib/data/products";
import type { Product } from "@/lib/types/Product";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fallbackResponse = async (
  transform?: (items: Product[]) => Product[]
): Promise<Product[]> => {
  await delay(200);
  return transform ? transform(PRODUCTS) : PRODUCTS;
};

const fetchFromApi = async (path: string): Promise<Product[]> => {
  if (!BASE_URL) {
    throw new Error("Missing EXPO_PUBLIC_API_URL");
  }

  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Products request failed (${res.status})`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid product response format.");
  }

  return data as Product[];
};

const withFallback = async (
  path: string,
  transform?: (items: Product[]) => Product[]
) => {
  try {
    return await fetchFromApi(path);
  } catch (error) {
    console.warn("[products-api] falling back to mock data:", error);
    return fallbackResponse(transform);
  }
};

export const fetchAllProductsApi = () => withFallback("/products/");

export const fetchProductsByCategoryApi = (category: string) => {
  const normalized = category.trim().toLowerCase();
  return withFallback(
    `/products?category=${encodeURIComponent(category)}`,
    (items) =>
      items.filter(
        (item) =>
          item.category?.trim().toLowerCase() === normalized
      )
  );
};

export const searchProductsApi = (query: string) => {
  const trimmed = query.trim();
  if (!trimmed) {
    return fallbackResponse();
  }

  const normalized = trimmed.toLowerCase();
  return withFallback(
    `/products?search=${encodeURIComponent(trimmed)}`,
    (items) =>
      items.filter(
        (item) =>
          item.title.toLowerCase().includes(normalized) ||
          item.category?.toLowerCase().includes(normalized)
      )
  );
};

export const sortProductsApi = (order: "asc" | "desc") => {
  return withFallback(
    `/products?sort=${order}`,
    (items) =>
      [...items].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      )
  );
};
