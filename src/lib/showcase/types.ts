/** Homepage 3D showcase product — UI-facing shape */
export interface ShowcaseProduct {
  id: string;
  name: string;
  alt: string;
  /** 2D product image (poster) shown in the carousel */
  image: string;
  /** GLB / 3D model URL — loaded only inside the modal */
  modelSrc: string;
  /** Optional collection or product page path */
  href?: string;
}

/** Expected API payload shape (adjust when backend endpoint is ready) */
export interface ShowcaseProductApiItem {
  id?: number | string;
  sku?: string | null;
  title?: string | null;
  product_images?: string[] | null;
  model_3d_url?: string | null;
  product_url?: string | null;
}

export interface ShowcaseProductsApiResponse {
  success?: boolean;
  items?: ShowcaseProductApiItem[];
}
