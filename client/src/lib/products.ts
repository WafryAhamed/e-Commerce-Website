import type { Product } from '../types';
import { apiRequest } from './api';
import { normalizeProduct } from '../utils/product';

type ProductResponse = Partial<Product> & {
  _id?: string;
  id?: string;
};

export async function fetchProducts(path = '/api/products'): Promise<Product[]> {
  const response = await apiRequest<ProductResponse[]>(path);
  return response.map((product) => normalizeProduct(product));
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  const response = await apiRequest<ProductResponse>(
    `/api/products/slug/${encodeURIComponent(slug)}`
  );

  return normalizeProduct(response);
}
