import { apiGet } from '@/lib/api/axios';
import { STATIC_SHOWCASE_PRODUCTS } from './static-products';
import { mapShowcaseProductsFromApi } from './map-showcase-product';
import type { ShowcaseProduct, ShowcaseProductsApiResponse } from './types';

const SHOWCASE_API_PATH =
  process.env.NEXT_PUBLIC_SHOWCASE_PRODUCTS_PATH || '/api/homepage-showcase';

/**
 * Fetch homepage showcase products.
 * Static by default; set NEXT_PUBLIC_SHOWCASE_PRODUCTS_SOURCE=api when the endpoint is live.
 */
export async function getShowcaseProducts(): Promise<ShowcaseProduct[]> {
  if (process.env.NEXT_PUBLIC_SHOWCASE_PRODUCTS_SOURCE !== 'api') {
    return STATIC_SHOWCASE_PRODUCTS;
  }

  try {
    const response = await apiGet<ShowcaseProductsApiResponse>(SHOWCASE_API_PATH);

    if (response?.success && Array.isArray(response.items) && response.items.length > 0) {
      const mapped = mapShowcaseProductsFromApi(response.items);
      if (mapped.length > 0) {
        return mapped;
      }
    }
  } catch {
    // Fall back to bundled static showcase data
  }

  return STATIC_SHOWCASE_PRODUCTS;
}
