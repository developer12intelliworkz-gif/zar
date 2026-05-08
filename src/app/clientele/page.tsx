import Image from 'next/image';
import styles from './page.module.css';
import PageHeader from '@/components/ui/PageHeader/PageHeader';
import RetailerSlider from '@/components/ui/organisms/RetailerSlider/RetailerSlider';

export const metadata = {
  title: 'Our Clientele — Zar Jewels',
  description: 'Zar Jewels serves India\'s top retail jewellers with premium gold bangles.',
};

const clients = [
  { name: 'anjali', logo: '/images/clients/anjali.webp' },
  { name: 'b.c.sen', logo: '/images/clients/b.c.sen.webp' },
  { name: 'bhima', logo: '/images/clients/bhima.webp' },
  { name: 'goldplus', logo: '/images/clients/goldplus.webp' },
  { name: 'josco', logo: '/images/clients/josco.webp' },
  { name: 'joyalukkas', logo: '/images/clients/joyalukkas.webp' },
  { name: 'Kalyan Jewellers', logo: '/images/clients/kalyan.webp' },
  { name: 'khazana', logo: '/images/clients/khazana.webp' },
  { name: 'malabar', logo: '/images/clients/malabar.webp' },
  { name: 'nac', logo: '/images/clients/nac.webp' },
  { name: 'p.c.chandra', logo: '/images/clients/p.c.chandra.webp' },
  { name: 'prince', logo: '/images/clients/prince.webp' },
  { name: 'sawansukha', logo: '/images/clients/sawansukha.webp' },
  { name: 'senco', logo: '/images/clients/senco.webp' },
  { name: 'tanishq', logo: '/images/clients/tanishq.webp' },
];

export default function ClientelePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Our Clientele', isActive: true }
        ]}
        heading="Our Clientele"
        description="ZAR partners with leading jewellers and retail brands, built on consistency, precision, and long-standing trust."
      />
      <div className='bannerImage'>
              <Image
                src="/images/about/about_banner.webp"
                alt="Crafting gold bangle"
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>

      <section className={`container mt-100 ${styles.section2}`}>
        <div className={styles.flexBox}>
          {clients.map((client, i) => (
            <div key={i} className={styles.logoItem}>
              <Image src={client.logo} alt={client.name} width={160} height={60} />
            </div>
          ))}
        </div>
        <p className={styles.staticText}>
          ZAR has grown steadily over decades, building a strong network across India through consistent quality and reliable manufacturing. With over 30 distribution centres and a presence in more than 1,000 retail outlets, the brand continues to strengthen its reach and partnerships.
          <br /><br />
          Our clients serve customers who trust ZAR for its craftsmanship and precision, creating a connection that extends beyond business. As we expand into global markets including the UAE, Singapore, London, New York, and Canada, we remain focused on building lasting relationships grounded in trust and quality.
        </p>
      </section>

      <section className="mt-100">
        <div className={styles.mapSection}>
          <div className="container">
            <div className={styles.mapWrapper}>
              <div>
                <Image
                  src="/images/clients/map.webp"
                  alt="map"
                  width={500}
                  height={800}
                  className={styles.mapImage}
                />
              </div>
              <div className={styles.mapContent}>
                <div>
                  <h3>Geographical distribution</h3>
                </div>
                <div>
                  <div className={styles.locationBox}>
                    <h6>Legend</h6>
                    <div className={styles.locationLine}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="17" viewBox="0 0 11 17" fill="none">
                        <path d="M5.02405 6.80159C3.96128 6.80159 3.10233 5.9423 3.10233 4.87909C3.10233 3.81589 3.96128 2.95658 5.02405 2.95658C6.08682 2.95658 6.94575 3.81589 6.94575 4.87909C6.94575 5.9423 6.08682 6.80159 5.02405 6.80159ZM4.98035 0C0.409004 0.203902 -1.71652 4.60237 1.64648 9.24842C4.77655 13.6469 4.98035 16.4578 4.98035 16.4578C4.98035 16.4578 5.18418 13.6469 8.35792 9.24842C11.7792 4.60237 9.66817 0.116515 4.98035 0Z" fill="#CFB480" />
                      </svg>
                      Distribution centers
                    </div>
                    <div className={styles.locationLine}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="18" viewBox="0 0 11 18" fill="none">
                        <path d="M5.40001 7.32306C4.25133 7.32306 3.32788 6.39923 3.32788 5.25007C3.32788 4.10092 4.25133 3.17709 5.40001 3.17709C6.54869 3.17709 7.47214 4.10092 7.47214 5.25007C7.47214 6.39923 6.54869 7.32306 5.40001 7.32306ZM5.3775 0C0.444917 0.202792 -1.85246 4.95716 1.77377 9.98191C5.15225 14.7137 5.3775 17.7556 5.3775 17.7556C5.3775 17.7556 5.5802 14.7137 9.02625 9.98191C12.7201 4.9797 10.4452 0.135195 5.3775 0Z" fill="#A8A8A7" />
                      </svg>
                      Retail centers
                    </div>
                  </div>
                  <ul>
                    <li>35 distribution centres which supply to over 1,100 retail outlets across India</li>
                    <li>Exports to Dubai, Singapore, London, New York and Canada</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RetailerSlider />
    </main>
  );
}
