import { PRODUCTS } from "@/lib/data/products";
import type { Product } from "@/lib/types/Product";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";
const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=60";

type BackendRating = {
  rate_value?: number;
  rate?: number;
  rating?: number;
};

type BackendProduct = {
  id?: string;
  sku?: string;
  name?: string;
  product_image?: string;
  price?: number | string;
  description?: string;
  category?: string;
  ratings?: BackendRating[];
  stock?: number;
  status?: string;
  manufactured_date?: string;
  expiry_date?: string;
  date_added?: string;
  image?: string;
  title?: string;
  rating?: Product["rating"];
};

export type UploadableFile = {
  uri: string;
  name: string;
  type: string;
  size?: number;
};

const normalizeUploadUri = (uri: string) => {
  if (!uri) return uri;
  if (uri.startsWith("file://") || uri.startsWith("content://")) return uri;
  return `file://${uri}`;
};

export type CreateProductPayload = {
  name: string;
  price: number;
  description?: string;
  category?: string;
  product_image?: string;
  product_image_file?: UploadableFile;
  stock?: number;
  status?: string;
  manufactured_date?: string;
  expiry_date?: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ensureBaseUrl = () => {
  if (!BASE_URL) {
    throw new Error("Missing EXPO_PUBLIC_API_URL");
  }
};

const extractErrorMessage = (data: any, status: number) => {
  if (!data) return `Request failed (${status})`;
  if (typeof data === "string") return data;

  if (typeof data === "object") {
    if (data.message || data.detail || data.error) {
      return data.message || data.detail || data.error;
    }

    const firstKey = Object.keys(data)[0];
    if (firstKey) {
      const value = data[firstKey];
      if (Array.isArray(value)) return `${firstKey}: ${value[0]}`;
      if (typeof value === "string") return `${firstKey}: ${value}`;
      return `${firstKey}: ${JSON.stringify(value)}`;
    }
  }

  return `Request failed (${status})`;
};

const withTimeout = async <T>(promise: Promise<T>, ms = 20000) => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);
};

const handleResponse = async (res: Response) => {
  const text = await res.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(extractErrorMessage(data, res.status));
  }

  return data;
};

const pickProductsArray = (data: any): BackendProduct[] => {
  if (!data) return [];
  if (Array.isArray(data)) return data as BackendProduct[];
  if (Array.isArray(data?.value)) return data.value as BackendProduct[];
  if (Array.isArray(data?.results)) return data.results as BackendProduct[];
  if (Array.isArray(data?.data)) return data.data as BackendProduct[];
  if (Array.isArray(data?.items)) return data.items as BackendProduct[];
  throw new Error("Invalid product response format.");
};

const computeRating = (product: BackendProduct) => {
  if (product.rating?.rate !== undefined) {
    return product.rating;
  }

  if (Array.isArray(product.ratings) && product.ratings.length) {
    const scores = product.ratings
      .map((r) => r.rate_value ?? r.rate ?? r.rating)
      .filter((val): val is number => typeof val === "number");

    if (scores.length) {
      const avg = scores.reduce((acc, val) => acc + val, 0) / scores.length;
      return { rate: Number(avg.toFixed(1)), count: scores.length };
    }
  }

  return undefined;
};

const normalizeProduct = (item: BackendProduct): Product => {
  const priceNumber = Number.parseFloat(String(item.price ?? "0"));
  const resolvedTitle =
    (item.name ?? "").trim() ||
    (item.title ?? "").trim() ||
    "Untitled product";
  const resolvedImage =
    (item.product_image ?? "").trim() ||
    (item.image ?? "").trim() ||
    DEFAULT_IMAGE;

  return {
    id: item.id ?? item.sku ?? resolvedTitle,
    title: resolvedTitle,
    name: (item.name ?? "").trim() || resolvedTitle,
    price: Number.isFinite(priceNumber) ? priceNumber : 0,
    description: item.description ?? "",
    image: resolvedImage,
    category: item.category,
    rating: computeRating(item),
    stock: item.stock,
    status: item.status,
    sku: item.sku,
    manufactured_date: item.manufactured_date,
    expiry_date: item.expiry_date,
    date_added: item.date_added,
  };
};

const FALLBACK_PRODUCTS: Product[] = PRODUCTS.map((item) =>
  normalizeProduct({
    ...item,
    id: item.id?.toString(),
    name: (item as any).name ?? item.title,
    product_image: (item as any).product_image ?? item.image,
    price: item.price,
    rating: item.rating,
  })
);

const fallbackResponse = async (
  transform?: (items: Product[]) => Product[]
): Promise<Product[]> => {
  await delay(200);
  const base = [...FALLBACK_PRODUCTS];
  return transform ? transform(base) : base;
};

const fetchFromApi = async (
  path: string,
  token?: string
): Promise<Product[]> => {
  ensureBaseUrl();

  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { headers });
  const data = await handleResponse(res);
  const items = pickProductsArray(data);
  return items.map(normalizeProduct);
};

const withFallback = async (
  path: string,
  token?: string,
  transform?: (items: Product[]) => Product[]
) => {
  try {
    return await fetchFromApi(path, token);
  } catch (error) {
    console.warn("[products-api] falling back to mock data:", error);
    return fallbackResponse(transform);
  }
};

export const fetchAllProductsApi = (token?: string) =>
  withFallback("/product/product_list/", token);

export const fetchProductsByCategoryApi = (category: string, token?: string) => {
  const normalized = category.trim();
  const path = normalized
    ? `/product/product_list/?category=${encodeURIComponent(normalized)}`
    : "/product/product_list/";

  return withFallback(
    path,
    token,
    (items) =>
      normalized
        ? items.filter(
            (item) =>
              item.category?.trim().toLowerCase() ===
              normalized.trim().toLowerCase()
          )
        : items
  );
};

export const searchProductsApi = (query: string, token?: string) => {
  const trimmed = query.trim();
  const path = trimmed
    ? `/product/product_list/?search=${encodeURIComponent(trimmed)}`
    : "/product/product_list/";

  return withFallback(
    path,
    token,
    (items) => {
      if (!trimmed) return items;
      const normalized = trimmed.toLowerCase();
      return items.filter((item) => {
        const title = item.title?.toLowerCase() ?? "";
        const category = item.category?.toLowerCase() ?? "";
        return (
          title.includes(normalized) ||
          category.includes(normalized)
        );
      });
    }
  );
};

export const sortProductsApi = (order: "asc" | "desc", token?: string) => {
  const ordering = order === "asc" ? "price" : "-price";

  return withFallback(
    `/product/product_list/?ordering=${ordering}`,
    token,
    (items) =>
      [...items].sort((a, b) =>
        order === "asc" ? a.price - b.price : b.price - a.price
      )
  );
};

export const createProductApi = async (
  payload: CreateProductPayload,
  token?: string
): Promise<Product> => {
  ensureBaseUrl();

  if (!token) {
    throw new Error("Missing access token. Please sign in again.");
  }

  const { product_image_file, ...rest } = payload;
  const hasFile = !!product_image_file?.uri;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  let body: BodyInit;

  if (hasFile) {
    const formData = new FormData();
    formData.append("name", rest.name);
    formData.append("price", rest.price.toString());
    if (rest.description) formData.append("description", rest.description);
    if (rest.category) formData.append("category", rest.category);
    if (rest.stock !== undefined) {
      formData.append("stock", rest.stock.toString());
    }
    if (rest.status) formData.append("status", rest.status);
    if (rest.manufactured_date) {
      formData.append("manufactured_date", rest.manufactured_date);
    }
    if (rest.expiry_date) {
      formData.append("expiry_date", rest.expiry_date);
    }
    formData.append("product_image", {
      uri: normalizeUploadUri(product_image_file!.uri),
      name: product_image_file!.name,
      type: product_image_file!.type || "image/jpeg",
    } as any);

    body = formData as any;
  } else {
    headers["Content-Type"] = "application/json";

    const jsonPayload = Object.fromEntries(
      Object.entries(rest).filter(([, value]) => value !== undefined)
    );

    body = JSON.stringify(jsonPayload);
  }

  const res = await withTimeout(
    fetch(`${BASE_URL}/product/product_list/`, {
      method: "POST",
      headers,
      body,
    })
  );

  const data = await handleResponse(res);
  const rawProduct =
    (data?.data as BackendProduct) ??
    (Array.isArray(data) ? (data[0] as BackendProduct) : (data as BackendProduct));

  return normalizeProduct(rawProduct ?? payload);
};
