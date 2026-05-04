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
        description="The unquestionable dedication of Zar's team is the reason why the brand has tied up with some of the best jewelers in the industry."
      />
      <div className='banner'>
        <Image
          src="/images/about/about_banner.webp"
          alt="Crafting gold bangle"
          fill
          style={{ objectFit: 'contain' }}
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
          Zar has rapidly expanded since its inception almost 65 years ago. The production and distribution of fine gold bangles has been our aim and we believe in providing the best services to our clients. These clients further serve the customers who recognize Zar to be a trustworthy brand. With 30 distribution centres that supply to more than 1,000 retail outlets across India, the company is getting bigger and better in terms of production and service. We not only focus on our direct clients but we also aim to reach the customers who use our products. This gives us an opportunity to connect with them and helps us improve our services.
          <br /><br />
          We aim to strengthen the bond we have with our clients and serve them with exquisite, quality products. Zar further expanded when it started exporting its products to UAE, Singapore, London, New York and Canada. We look forward to expand our business over the years on the twin foundations of trust and quality.
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
