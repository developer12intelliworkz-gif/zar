'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Button from '@/components/ui/atoms/Button/Button';
import PageHeader from '@/components/ui/PageHeader/PageHeader';
import ProductGallery from '@/components/ProductGallery/ProductGallery';
import ProductInfo from '@/components/ProductInfo/ProductInfo';
import RelatedProductsSlider from '@/components/RelatedProductsSlider/RelatedProductsSlider';
import { fetchProductsByIds, fetchProductDetailById, isCatalogRouteError } from '@/lib/api/catalog';
import type { ProductCard, ProductDetail } from '@/types/domain';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const goldTypeId = searchParams.get('gold_type_id');
  const categoryId = searchParams.get('category_id');
  const collectionTypeId = searchParams.get('collection_type_id');
  const productId = searchParams.get('product_id');

  const [products, setProducts] = useState<ProductCard[]>([]);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [related, setRelated] = useState<ProductCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (productId) {
          // Load product detail
          const response = await fetchProductDetailById(
            productId,
            goldTypeId || undefined,
            categoryId || undefined,
            collectionTypeId || undefined
          );
          setProduct(response.product);
          setRelated(response.related);
          setProducts([]);
        } else {
          // Load product listing
          const items = await fetchProductsByIds(
            goldTypeId || undefined,
            categoryId || undefined,
            collectionTypeId || undefined
          );
          setProducts(items);
          setProduct(null);
          setRelated([]);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : isCatalogRouteError(err)
              ? 'Product not found'
              : 'Failed to load products';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [goldTypeId, categoryId, collectionTypeId, productId]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: '#c00', marginBottom: '20px' }}>{error}</p>
        <Button variant="primary" showArrow href="/collections">
          Back to Collections
        </Button>
      </div>
    );
  }

  // Product detail view
  if (product) {
    return (
      <>
        <PageHeader
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: product.name, isActive: true },
          ]}
          heading={product.name}
        />
        <div style={{ container: 'contain' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', padding: '60px 20px' }}>
            <ProductGallery images={product.images || []} productName={product.name} />
            <ProductInfo product={product} />
          </div>
          {related.length > 0 && <RelatedProductsSlider products={related} />}
        </div>
      </>
    );
  }

  // Product listing view
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', isActive: true },
        ]}
        heading="Products"
      />
      <div style={{ padding: '60px 20px' }}>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>No products found</p>
            <Button variant="primary" showArrow href="/collections">
              View Collections
            </Button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {products.map((prod) => (
              <a
                key={prod.id}
                href={`/products?gold_type_id=${prod.goldTypeId}&category_id=${prod.categoryId}&collection_type_id=${prod.collectionTypeId}&product_id=${prod.id}`}
                style={{
                  textDecoration: 'none',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div style={{ padding: '16px' }}>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{prod.name}</h3>
                  <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>{prod.category}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
