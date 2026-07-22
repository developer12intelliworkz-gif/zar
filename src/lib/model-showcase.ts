import { imagePath } from './imagePath';
import { STATIC_SHOWCASE_PRODUCTS, type ShowcaseProduct } from './showcase';

/** @deprecated Use ShowcaseProduct from @/lib/showcase */
export interface ShowcaseModel {
  name: string;
  src: string;
  alt: string;
  poster: string;
  url?: string;
}

function toLegacyModel(product: ShowcaseProduct): ShowcaseModel {
  return {
    name: product.name,
    src: product.modelSrc,
    alt: product.alt,
    poster: product.image,
    url: product.href,
  };
}

/** @deprecated Use STATIC_SHOWCASE_PRODUCTS from @/lib/showcase */
export const showcaseModels: ShowcaseModel[] = STATIC_SHOWCASE_PRODUCTS.map(toLegacyModel);

const modelPreloadCache = new Map<string, Promise<void>>();

export function preloadModel(src: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  const resolvedSrc = imagePath(src);
  const existingRequest = modelPreloadCache.get(resolvedSrc);

  if (existingRequest) {
    return existingRequest;
  }

  const request = fetch(resolvedSrc)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to preload model: ${resolvedSrc}`);
      }

      return response.blob();
    })
    .then(() => undefined)
    .catch((error) => {
      modelPreloadCache.delete(resolvedSrc);
      throw error;
    });

  modelPreloadCache.set(resolvedSrc, request);

  return request;
}

export function preloadShowcaseModels(count: number): Promise<PromiseSettledResult<void>[]> {
  return Promise.allSettled(
    STATIC_SHOWCASE_PRODUCTS.slice(0, count).map((product) => preloadModel(product.modelSrc))
  );
}

/** @deprecated Use STATIC_SHOWCASE_PRODUCTS from @/lib/showcase */
export function getNextShowcaseModel(currentIndex: number): ShowcaseModel {
  return toLegacyModel(STATIC_SHOWCASE_PRODUCTS[currentIndex % STATIC_SHOWCASE_PRODUCTS.length]);
}
