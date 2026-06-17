import { cache } from 'react';
import {
  fetchProductDetail as originalFetchProductDetail,
  fetchCollectionTypeDetail as originalFetchCollectionTypeDetail,
  fetchCategories as originalFetchCategories,
} from './catalog';

export const fetchProductDetail = cache(originalFetchProductDetail);
export const fetchCollectionTypeDetail = cache(originalFetchCollectionTypeDetail);
export const fetchCategories = cache(originalFetchCategories);
