import { imagePath } from './imagePath';

export interface ShowcaseModel {
  name: string;
  src: string;
  alt: string;
  poster: string;
  url?: string;
}

export const showcaseModels: ShowcaseModel[] = [
  {
    name: 'AD106285',
    src: '/images/models/AD106285.glb',
    alt: 'Interactive 3D jewellery model 1',
    poster: '/images/models/AD106285.webp',
    url: 'collections/18k/bangles-bracelet/plain/plain-1',
  },
  {
    name: 'AEF100966',
    src: '/images/models/AEF100966.glb',
    alt: 'Interactive 3D jewellery model 2',
    poster: '/images/models/AEF100966.webp',
    url: 'collections/18k/bangles-bracelet/plain/plain-1',

  },
  {
    name: 'O101317',
    src: '/images/models/O101317.glb',
    alt: 'Interactive 3D jewellery model 3',
    poster: '/images/models/O101317.webp',
    url: 'collections/18k/bangles-bracelet/plain/plain-1',

  }
];

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
  return Promise.allSettled(showcaseModels.slice(0, count).map((model) => preloadModel(model.src)));
}

export function getNextShowcaseModel(currentIndex: number): ShowcaseModel {
  return showcaseModels[(currentIndex + 1) % showcaseModels.length];
}