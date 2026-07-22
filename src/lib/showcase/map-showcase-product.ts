import { getImageUrl } from '@/lib/utils';
import type { ShowcaseProduct, ShowcaseProductApiItem } from './types';

function firstImage(item: ShowcaseProductApiItem): string {
  const fromList = item.product_images?.find(Boolean);
  if (fromList) {
    return getImageUrl(fromList);
  }
  return '';
}

function resolveModelSrc(item: ShowcaseProductApiItem): string {
  const raw = item.model_3d_url?.trim();
  if (!raw) {
    return '';
  }
  return getImageUrl(raw);
}

function resolveHref(item: ShowcaseProductApiItem): string | undefined {
  const raw = item.product_url?.trim();
  if (!raw) {
    return undefined;
  }
  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }
  return raw.startsWith('/') ? raw : `/${raw}`;
}

/** Map a backend catalog item to a homepage showcase product */
export function mapShowcaseProductFromApi(item: ShowcaseProductApiItem): ShowcaseProduct | null {
  const id = String(item.id ?? item.sku ?? '').trim();
  const modelSrc = resolveModelSrc(item);
  const image = firstImage(item);

  if (!id || !modelSrc || !image) {
    return null;
  }

  const name = (item.sku ?? item.title ?? id).trim();

  return {
    id,
    name,
    alt: item.title?.trim() || `Gold bangle design ${name}`,
    image,
    modelSrc,
    href: resolveHref(item),
  };
}

export function mapShowcaseProductsFromApi(items: ShowcaseProductApiItem[]): ShowcaseProduct[] {
  return items
    .map((item) => mapShowcaseProductFromApi(item))
    .filter((product): product is ShowcaseProduct => product !== null);
}
