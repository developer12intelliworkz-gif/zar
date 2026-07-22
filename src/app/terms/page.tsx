import styles from './page.module.css';

export const metadata = {
  title: 'Terms & Conditions — Zar Jewels',
  description: 'Terms and conditions for using the Zar Jewels website, products, and services.',
};

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Terms & Conditions</h1>
        
        <p className={styles.text} style={{ marginBottom: '32px' }}>
          <strong>Last Updated: July 10, 2026</strong>
          <br /><br />
          Welcome to Zar. These Terms & Conditions govern your access to and use of our website, products, and services. By accessing, browsing, or using this website, you agree to comply with and be bound by the terms outlined below. If you do not agree with any part of these Terms & Conditions, please refrain from using our website.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. About Zar</h2>
          <p className={styles.text}>
            Zar is a jewelry manufacturer and supplier based in India, serving both business customers and individual consumers. Our offerings may include jewelry collections, custom manufacturing solutions, wholesale services, and related information available through our website.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Acceptance of Terms</h2>
          <p className={styles.text}>
            By accessing this website, submitting inquiries, placing orders, requesting quotations, or using any services provided by Zar, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Website Use</h2>
          <p className={styles.text}>
            You agree to use this website only for lawful purposes and in a manner that does not infringe upon the rights of others or restrict their use of the website.
          </p>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Users shall not:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Attempt unauthorized access to website systems or data.</li>
            <li className={styles.listItem}>Introduce malicious software, viruses, or harmful code.</li>
            <li className={styles.listItem}>Copy, distribute, or misuse website content without written permission.</li>
            <li className={styles.listItem}>Use the website for fraudulent or unlawful activities.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Product Information</h2>
          <p className={styles.text}>
            We strive to ensure that all product descriptions, images, specifications, weights, dimensions, and related information displayed on our website are accurate.
          </p>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            However:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Product images are for illustrative purposes only.</li>
            <li className={styles.listItem}>Actual product appearance, finish, color, dimensions, and weight may vary.</li>
            <li className={styles.listItem}>Jewelry weights and measurements may be subject to manufacturing tolerances.</li>
            <li className={styles.listItem}>Product availability may change without prior notice.</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Zar reserves the right to modify product specifications, designs, collections, and offerings at any time.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Custom Orders & Manufacturing</h2>
          <p className={styles.text}>
            Certain products and services offered by Zar may be customized or manufactured to specific customer requirements.
          </p>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            For custom orders:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Manufacturing timelines may vary depending on design complexity and order quantity.</li>
            <li className={styles.listItem}>Design approvals provided by customers are considered final before production begins.</li>
            <li className={styles.listItem}>Custom-made products may not be eligible for cancellation, exchange, or refund once production has commenced.</li>
            <li className={styles.listItem}>Customers are responsible for reviewing all specifications before confirming an order.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Pricing & Quotations</h2>
          <p className={styles.text}>
            All prices, quotations, and estimates provided by Zar are subject to change without notice unless otherwise agreed in writing.
          </p>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Pricing may vary based on:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Gold and precious metal market fluctuations</li>
            <li className={styles.listItem}>Material specifications</li>
            <li className={styles.listItem}>Product customization</li>
            <li className={styles.listItem}>Order quantities</li>
            <li className={styles.listItem}>Applicable taxes, duties, and shipping charges</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Formal quotations remain valid only for the period specified within the quotation.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. Orders & Payment</h2>
          <p className={styles.text}>
            Orders are subject to acceptance and confirmation by Zar.
          </p>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            We reserve the right to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Refuse or cancel orders at our discretion.</li>
            <li className={styles.listItem}>Request additional information before processing an order.</li>
            <li className={styles.listItem}>Modify order acceptance based on inventory, production capabilities, or regulatory requirements.</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Payment terms may vary depending on the nature of the transaction, customer category, and agreed commercial arrangements.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Shipping & Delivery</h2>
          <p className={styles.text}>
            Zar makes reasonable efforts to fulfill deliveries within estimated timelines. However, delivery schedules are estimates only and may be affected by factors beyond our control.
          </p>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            We shall not be liable for delays resulting from:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Customs clearance procedures</li>
            <li className={styles.listItem}>Shipping carrier delays</li>
            <li className={styles.listItem}>Regulatory requirements</li>
            <li className={styles.listItem}>Force majeure events</li>
            <li className={styles.listItem}>Supply chain disruptions</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Risk and ownership transfer may be subject to specific contractual agreements applicable to each transaction.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Returns, Exchanges & Refunds</h2>
          <p className={styles.text}>
            Return, exchange, and refund eligibility may vary depending on the product type and nature of the transaction.
          </p>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            The following may not be eligible for return or refund:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Customized products</li>
            <li className={styles.listItem}>Personalized items</li>
            <li className={styles.listItem}>Made-to-order jewellery</li>
            <li className={styles.listItem}>Products altered at customer request</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Customers should contact our team regarding any concerns relating to received products.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Intellectual Property</h2>
          <p className={styles.text}>
            All content available on this website, including but not limited to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Product designs</li>
            <li className={styles.listItem}>Images</li>
            <li className={styles.listItem}>Logos</li>
            <li className={styles.listItem}>Graphics</li>
            <li className={styles.listItem}>Text</li>
            <li className={styles.listItem}>Catalogues</li>
            <li className={styles.listItem}>Videos</li>
            <li className={styles.listItem}>Trademarks</li>
            <li className={styles.listItem}>Website design elements</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            are the property of Zar or its licensors and are protected under applicable intellectual property laws. No content may be copied, reproduced, modified, distributed, or used without prior written consent.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>11. User Submissions</h2>
          <p className={styles.text}>
            Any information submitted through contact forms, inquiry forms, quotation requests, or other website features must be accurate and complete.
          </p>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Users remain responsible for the content they provide and must not submit the following:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>False information</li>
            <li className={styles.listItem}>Misleading content</li>
            <li className={styles.listItem}>Unlawful material</li>
            <li className={styles.listItem}>Content that infringes third-party rights</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Limitation of Liability</h2>
          <p className={styles.text}>
            To the fullest extent permitted by applicable law, Zar shall not be liable for any indirect, incidental, consequential, special, or punitive damages arising from:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Use of this website</li>
            <li className={styles.listItem}>Inability to access the website</li>
            <li className={styles.listItem}>Product use</li>
            <li className={styles.listItem}>Service interruptions</li>
            <li className={styles.listItem}>Third-party actions</li>
            <li className={styles.listItem}>Data loss or system failures</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Our liability, where applicable, shall be limited to the maximum extent permitted by law.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>13. Third-Party Links</h2>
          <p className={styles.text}>
            This website may contain links to external websites operated by third parties. Such links are provided solely for convenience. Zar does not control or endorse third-party websites and accepts no responsibility for their content, privacy practices, or operations.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>14. Privacy</h2>
          <p className={styles.text}>
            Your use of this website is also governed by our Privacy Policy. By using this website, you consent to the collection and use of information as described therein.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>15. Force Majeure</h2>
          <p className={styles.text}>
            Zar shall not be held liable for any failure or delay in performance resulting from events beyond its reasonable control, including but not limited to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Natural disasters</li>
            <li className={styles.listItem}>Government restrictions</li>
            <li className={styles.listItem}>Pandemics</li>
            <li className={styles.listItem}>War or civil disturbances</li>
            <li className={styles.listItem}>Labour disputes</li>
            <li className={styles.listItem}>Transportation disruptions</li>
            <li className={styles.listItem}>Utility failures</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>16. Governing Law</h2>
          <p className={styles.text}>
            These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms & Conditions shall be subject to the exclusive jurisdiction of the competent courts of India.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>17. Changes to Terms</h2>
          <p className={styles.text}>
            Zar reserves the right to update, modify, or replace these Terms & Conditions at any time without prior notice. Updated versions will be published on this page and become effective immediately upon posting.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>18. Contact Us</h2>
          <p className={styles.text}>
            For any questions regarding these Terms & Conditions, please contact us:
            <br /><br />
            <strong>Zar</strong>
            <br />
            India
            <br />
            Email: <a href="mailto:info@zarjewels.com" style={{ textDecoration: 'underline' }}>info@zarjewels.com</a>
            <br />
            Phone: <a href="tel:+918657499151" style={{ textDecoration: 'underline' }}>+91 86574 99151</a>
            <br />
            Website: <a href="https://www.zarjewels.com/" style={{ textDecoration: 'underline' }}>https://www.zarjewels.com/</a>
          </p>
        </div>
      </div>
    </div>
  );
}
