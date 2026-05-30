import PageHeader from '@/components/ui/PageHeader/PageHeader';
import ProductGallery from '@/components/ProductGallery/ProductGallery';
import ProductInfo from '@/components/ProductInfo/ProductInfo';
import RelatedProductsSlider from '@/components/RelatedProductsSlider/RelatedProductsSlider';
import { fetchProductDetail } from '@/lib/api/catalog';
// Fetch 18K product detail from external API
async function fetch18KProductDetail() {
  const res = await fetch('https://testintelliworkz.tech/Zar_backend/api/products/2', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch 18K product detail');
  return res.json();
}
import catalogData from '@/lib/data/catalog.json';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

import TradeHighlightsSlider from '@/components/TradeHighlightsSlider';

type Props = {
  params: Promise<{ purity: string; category: string; style: string; id: string }>;
};

export function generateStaticParams() {
  const catalog = catalogData as {
    purities: {
      purity: string;
      categories: { slug: string; styles: { slug: string; products: { id: string }[] }[] }[];
    }[];
  };
  return catalog.purities.flatMap((p) =>
    p.categories.flatMap((c) =>
      c.styles.flatMap((s) =>
        s.products.map((prod) => ({
          purity: p.purity,
          category: c.slug,
          style: s.slug,
          id: prod.id,
        }))
      )
    )
  );
}

type TradeHighlight = {
  icon: string;
  title: string;
  description: string;
};

const TRADE_HIGHLIGHTS: TradeHighlight[] = [
  {
    icon: '/images/sa.svg',
    title: 'Sample Availability',
    description: 'At the Zar Experience Center, Mumbai as well as in leading trade shows across the country',
  },
  {
    icon: '/images/slt.svg',
    title: 'Service Lead Times',
    description: 'Bulk: 7–10 business days Customer order: 5 business days',
  },
  {
    icon: '/images/rsa.svg',
    title: 'Ready Stock Availability',
    description: '12 to 15 business days from order confirmation.',
  },
  {
    icon: '/images/za.svg',
    title: 'Zar App',
    description:
      'Get real-time updates to latest designs at your fingertips through the Zar app. <a href="https://zarapp.link/register" target="_blank" rel="noopener noreferrer">Register now!</a>',
  },
];

function formatName(slug: string) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props) {
  const { purity, category, style, id } = await params;

  try {
    const { product } = await fetchProductDetail(purity, category, style, id);
    return {
      title: `${product.name} — Zar Jewels`,
      description: product.description,
    };
  } catch {
    return {
      title: 'Product Not Found — Zar Jewels',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { purity, category, style, id } = await params;

  const purityLabel = purity.toUpperCase();
  const categoryName = formatName(category);
  const styleName = formatName(style);

  let detail: any = null;
  let is18K = purity === '18k' || purity === '18K';
  let product: any = null;
  let related: any[] = [];

  if (is18K) {
    // Fetch from external API for 18K
    try {
      const apiData = await fetch18KProductDetail();
      // Adapt the API response to your product structure if needed
      product = {
        id: apiData.id,
        name: apiData.name,
        sku: apiData.sku,
        description: apiData.description,
        price: apiData.price,
        image: apiData.image,
        images: apiData.images || [apiData.image],
        specifications: apiData.specifications || {},
        purity: apiData.purity,
        pcs: apiData.pcs,
        finish: apiData.finish,
        technicalSpecs: apiData.technicalSpecs,
        manufacturing: apiData.manufacturing,
        manufacturingHtml: apiData.manufacturingHtml,
      };
      // If related products are available in API, map them
      related = apiData.related || [];
    } catch {
      notFound();
    }
  } else {
    detail = await fetchProductDetail(purity, category, style, id).catch(() => null);
    if (!detail) {
      notFound();
    }
    product = detail.product;
    related = detail.related;
  }

  return (
    <div className={styles.page}>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: `${purityLabel} Gold`, href: `/collections/${purity}` },
          { label: categoryName, href: `/collections/${purity}/${category}` },
          { label: styleName, href: `/collections/${purity}/${category}/${style}` },
          { label: product.name, isActive: true },
        ]}
      />
      <section>
        <div className="container mb-100">
          <div className={styles.grid}>
            <div className={styles.galleryColumn}>
              <div className={styles.mobProd}>
                <h1>{product.name}</h1>
                <div>{product.sku}</div>
              </div>
              <div className={styles.stickyGallery}>
                <ProductGallery images={product.images} />
              </div>
            </div>

            <div className={styles.infoColumn}>
              <ProductInfo
                product={{
                  id: product.id,
                  title: product.name,
                  sku: product.sku,
                  description: product.description,
                  price: product.price,
                  image: product.image,
                  specifications: product.specifications || {},
                  purity: product.purity,
                  pcs: product.pcs,
                  finish: product.finish,
                  technicalSpecs: product.technicalSpecs,
                  manufacturing: product.manufacturing,
                  manufacturingHtml: product.manufacturingHtml,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tradeHighlights} aria-label="Trade highlights">
        <div className="container">
          <div className={styles.tradeHighlightsInner}>
            {TRADE_HIGHLIGHTS.map((item) => (
              <article key={item.title} className={styles.highlightCard}>
                <div className={styles.highlightIcon} aria-hidden="true">
                  <img src={item.icon} alt="" />
                </div>
                <h3 className={styles.highlightTitle}>{item.title}</h3>
                <p
                  className={styles.highlightDescription}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Trade Highlights Slider (≤576px) */}
      <TradeHighlightsSlider highlights={TRADE_HIGHLIGHTS} />

      <RelatedProductsSlider
        title="You might also like"
        products={related.map((item) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          image: item.image,
          purity: item.purity,
          price: item.price,
        }))}
        basePath={`/collections/${purity}/${category}/${style}`}
      />
    </div >
  );
}
