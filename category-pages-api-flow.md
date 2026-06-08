# Category Pages API Flow

This document explains how the collection/category route pages in `src/app/collections` call the catalog API and how data flows through the 4 page layers.

## Route hierarchy

1. `src/app/collections/page.tsx`
   - Redirects to `/collections/22k` by default.
2. `src/app/collections/[purity]/page.tsx`
   - Shows category listing for a given purity value (e.g. `18k`, `22k`).
3. `src/app/collections/[purity]/[category]/page.tsx`
   - Shows styles/collections for a selected category within the selected purity.
4. `src/app/collections/[purity]/[category]/[style]/page.tsx`
   - Shows product listing for the selected style under category and purity.
5. `src/app/collections/[purity]/[category]/[style]/[id]/page.tsx`
   - Product detail page for a selected product.

## Shared API layer

All catalog API calls are implemented in `src/lib/api/catalog.ts`.

### Key exported functions used by collection pages

- `fetchCategories(purity)`
  - Calls `GET ${API_BASE_URL}/api/categories?gold_type=<goldType>`
  - Maps backend category items to frontend `Category` objects.

- `fetchStyles(purity, category)`
  - Calls `GET ${API_BASE_URL}/api/collection-types?gold_type=<goldType>&category_name=<category>`
  - Maps backend collection type items to frontend `Style` objects.

- `fetchCollectionTypeDetail(purity, category, collectionName)`
  - Calls the same endpoint as `fetchStyles(...)`.
  - Finds the matching style from the response by normalized name.
  - Used to obtain collection metadata such as heading, description, and banner image.

- `fetchProducts(purity, category, style)`
  - Calls `GET ${API_BASE_URL}/api/products?gold_type=<goldType>&category=<category>&collection_type=<deslugified style>`
  - Maps backend product items to `ProductCard` objects.

- `fetchProductDetail(purity, category, style, id)`
  - Calls `GET ${API_BASE_URL}/api/products/${id}`
  - Maps the returned backend product item to `ProductDetail`.
  - Also fetches related products by category, gold type, and collection type.

- `fetchGoldTypes()`
  - Calls `GET ${API_BASE_URL}/api/gold-types`
  - Falls back to hardcoded `22k` / `18k` values if the endpoint fails.

### Helper utilities in `catalog.ts`

- `toGoldTypeQuery(purity)`
  - Normalizes route purity values like `18k` / `22k` to API query values `18KT` / `22KT`.

- `deslugify(style)`
  - Converts route slug values back to readable collection type names for API queries.

- `toProductCard(...)`, `toProductDetail(...)`, `toCategory(...)`, `toStyle(...)`
  - Convert backend API payloads into frontend domain models.

- `fetchCatalogEndpoint(path, searchParams)`
  - Generic low-level helper that performs `fetch()` to `API_BASE_URL + path` and handles JSON parsing and error handling.

## Page-level flow

### 1. `src/app/collections/page.tsx`
- Immediately redirects to `/collections/22k`.
- No API call is performed here.

### 2. `src/app/collections/[purity]/page.tsx`
- Route params: `{ purity }`.
- Calls `fetchCategories(purity)`.
- Builds category cards for `CollectionGrid`.
- URL example: `/collections/22k`
- API call example: `/api/categories?gold_type=22KT`

### 3. `src/app/collections/[purity]/[category]/page.tsx`
- Route params: `{ purity, category }`.
- Calls `fetchStyles(purity, category)`.
- Builds style cards for `CollectionGrid`.
- URL example: `/collections/22k/bangles`
- API call example: `/api/collection-types?gold_type=22KT&category_name=bangles`

### 4. `src/app/collections/[purity]/[category]/[style]/page.tsx`
- Route params: `{ purity, category, style }`.
- Calls:
  - `fetchProducts(purity, category, style)`
  - `fetchCollectionTypeDetail(purity, category, style)`
- Builds product cards for `ProductListingClient`.
- Uses collection metadata fallbacks if API metadata is missing.
- URL example: `/collections/22k/bangles/plain`
- API calls:
  - `/api/products?gold_type=22KT&category=bangles&collection_type=plain`
  - `/api/collection-types?gold_type=22KT&category_name=bangles`

### 5. `src/app/collections/[purity]/[category]/[style]/[id]/page.tsx`
- Route params: `{ purity, category, style, id }`.
- Calls `fetchProductDetail(purity, category, style, id)`.
- Renders the full product detail page with gallery, specs, and related products.
- URL example: `/collections/22k/bangles/plain/123`
- API calls:
  - `/api/products/123`
  - If related products are available, additional `/api/products?category_id=...&goldtype_id=...&collectiontype_id=...`

## Error handling

- All route pages catch `CatalogApiError` via `isCatalogRouteError(error)`.
- If the API response is 400 or 404, the route calls `notFound()` and renders a 404 page.

## Summary flow diagram

```text
/collections             -> redirect to /collections/22k
  |
  +-- /collections/[purity]           -> fetchCategories(purity)
        |
        +-- /collections/[purity]/[category]     -> fetchStyles(purity, category)
              |
              +-- /collections/[purity]/[category]/[style]  -> fetchProducts(purity, category, style) + fetchCollectionTypeDetail(...)
                    |
                    +-- /collections/[purity]/[category]/[style]/[id]  -> fetchProductDetail(purity, category, style, id)
```

## Useful files

- `src/app/collections/page.tsx`
- `src/app/collections/[purity]/page.tsx`
- `src/app/collections/[purity]/[category]/page.tsx`
- `src/app/collections/[purity]/[category]/[style]/page.tsx`
- `src/app/collections/[purity]/[category]/[style]/[id]/page.tsx`
- `src/lib/api/catalog.ts`

## Notes

- The root `collections` page only redirects and does not call API data.
- `generateStaticParams` in the nested pages prefetches available routes for static generation.
- `fetchGoldTypes()` is used only by the product detail route path generation.
