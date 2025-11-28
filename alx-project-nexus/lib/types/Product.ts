export interface Product {
  id: string | number;
  title: string;
  name?: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  rating?: {
    rate: number;
    count?: number;
  };
  stock?: number;
  status?: string;
  sku?: string;
  manufactured_date?: string;
  expiry_date?: string;
  date_added?: string;
}
