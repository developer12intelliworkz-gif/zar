import styles from './page.module.css';

export const metadata = {
  title: 'Privacy Policy — Zar Jewels',
  description: 'Privacy policy explaining how Zar Jewels collects, uses, stores, and protects your information.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.heading}>Privacy Policy</h1>

        <p className={styles.text} style={{ marginBottom: '32px' }}>
          <strong>Last Updated: July 10, 2026</strong>
          <br /><br />
          At ZAR, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you visit our website, submit inquiries, request quotations, purchase products, or engage with our services.
          <br /><br />
          By accessing or using our website, you consent to the practices described in this Privacy Policy.
        </p>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
          <p className={styles.text}>
            We may collect personal and business information that you voluntarily provide, including:
          </p>
          
          <p className={styles.text} style={{ marginTop: '16px', fontWeight: 'bold' }}>
            Personal Information
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Full Name</li>
            <li className={styles.listItem}>Email Address</li>
            <li className={styles.listItem}>Phone Number</li>
            <li className={styles.listItem}>Company Name</li>
            <li className={styles.listItem}>Job Title</li>
            <li className={styles.listItem}>Billing and Shipping Address</li>
            <li className={styles.listItem}>Country and Location Information</li>
          </ul>

          <p className={styles.text} style={{ marginTop: '16px', fontWeight: 'bold' }}>
            Business Information
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Business Name</li>
            <li className={styles.listItem}>Trade Information</li>
            <li className={styles.listItem}>Purchase Requirements</li>
            <li className={styles.listItem}>Wholesale or Manufacturing Inquiry Details</li>
          </ul>

          <p className={styles.text} style={{ marginTop: '16px', fontWeight: 'bold' }}>
            Technical Information
          </p>
          <p className={styles.text} style={{ marginTop: '8px' }}>
            When you visit our website, certain information may be collected automatically, including:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>IP Address</li>
            <li className={styles.listItem}>Browser Type</li>
            <li className={styles.listItem}>Device Information</li>
            <li className={styles.listItem}>Operating System</li>
            <li className={styles.listItem}>Website Usage Data</li>
            <li className={styles.listItem}>Referral Sources</li>
            <li className={styles.listItem}>Cookies and Similar Technologies</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
          <p className={styles.text}>
            We use the information collected to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Respond to inquiries and requests</li>
            <li className={styles.listItem}>Provide quotations and product information</li>
            <li className={styles.listItem}>Process orders and transactions</li>
            <li className={styles.listItem}>Deliver products and services</li>
            <li className={styles.listItem}>Improve website performance and user experience</li>
            <li className={styles.listItem}>Manage customer relationships</li>
            <li className={styles.listItem}>Provide customer support</li>
            <li className={styles.listItem}>Send relevant business communications</li>
            <li className={styles.listItem}>Comply with legal and regulatory obligations</li>
            <li className={styles.listItem}>Prevent fraud and unauthorized activities</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Marketing Communications</h2>
          <p className={styles.text}>
            With your consent, we may send you:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Product updates</li>
            <li className={styles.listItem}>Collection launches</li>
            <li className={styles.listItem}>Promotional offers</li>
            <li className={styles.listItem}>Industry insights</li>
            <li className={styles.listItem}>Company news and announcements</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            You may opt out of marketing communications at any time by following the unsubscribe instructions provided in our communications or by contacting us directly.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Cookies & Tracking Technologies</h2>
          <p className={styles.text}>
            Our website may use cookies and similar technologies to enhance user experience and improve website functionality.
          </p>
          <p className={styles.text} style={{ marginTop: '12px', fontWeight: 'bold' }}>
            Cookies help us:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Understand website traffic patterns</li>
            <li className={styles.listItem}>Improve website performance</li>
            <li className={styles.listItem}>Remember user preferences</li>
            <li className={styles.listItem}>Analyze visitor behavior</li>
            <li className={styles.listItem}>Deliver relevant content</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Users may choose to disable cookies through their browser settings; however, certain website features may not function properly as a result.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Sharing of Information</h2>
          <p className={styles.text}>
            ZAR does not sell, rent, or trade personal information to third parties. We may share information with trusted third parties where necessary, including:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Shipping and logistics providers</li>
            <li className={styles.listItem}>Payment processing partners</li>
            <li className={styles.listItem}>Technology and website service providers</li>
            <li className={styles.listItem}>Professional advisors</li>
            <li className={styles.listItem}>Regulatory authorities, when required by law</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            All third-party service providers are expected to maintain appropriate confidentiality and data protection standards.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Data Security</h2>
          <p className={styles.text}>
            We implement appropriate technical, administrative, and organizational measures to safeguard personal information against:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Unauthorized access</li>
            <li className={styles.listItem}>Loss or theft</li>
            <li className={styles.listItem}>Misuse</li>
            <li className={styles.listItem}>Alteration</li>
            <li className={styles.listItem}>Disclosure</li>
            <li className={styles.listItem}>Destruction</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            While we take reasonable precautions to protect your information, no internet-based transmission or storage system can be guaranteed to be completely secure.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>7. International Data Transfers</h2>
          <p className={styles.text}>
            As a UAE-based business serving customers globally, information may be processed, stored, or transferred across jurisdictions where required for business operations. We take reasonable steps to ensure that any such transfers are handled securely and in accordance with applicable data protection requirements.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>8. Data Retention</h2>
          <p className={styles.text}>
            We retain personal information only for as long as necessary to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Fulfill business purposes</li>
            <li className={styles.listItem}>Maintain customer relationships</li>
            <li className={styles.listItem}>Meet legal, accounting, and regulatory requirements</li>
            <li className={styles.listItem}>Resolve disputes</li>
            <li className={styles.listItem}>Enforce contractual obligations</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            When information is no longer required, it will be securely deleted or anonymized where appropriate.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>9. Your Rights</h2>
          <p className={styles.text}>
            Subject to applicable laws, you may have the right to:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Request access to your personal information</li>
            <li className={styles.listItem}>Request correction of inaccurate information</li>
            <li className={styles.listItem}>Request deletion of personal information</li>
            <li className={styles.listItem}>Withdraw consent where applicable</li>
            <li className={styles.listItem}>Object to certain data processing activities</li>
            <li className={styles.listItem}>Request information regarding how your data is used</li>
          </ul>
          <p className={styles.text} style={{ marginTop: '12px' }}>
            Requests may be submitted using the contact information provided below.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>10. Children's Privacy</h2>
          <p className={styles.text}>
            ZAR's website and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that information has been collected from a minor without appropriate authorization, we will take reasonable steps to remove such information.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>11. Third-Party Websites</h2>
          <p className={styles.text}>
            Our website may contain links to third-party websites for informational purposes. ZAR is not responsible for the privacy practices, content, or policies of third-party websites. Users are encouraged to review the privacy policies of any external sites they visit.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>12. Changes to This Privacy Policy</h2>
          <p className={styles.text}>
            We may update this Privacy Policy from time to time to reflect changes in legal requirements, business operations, or website functionality. Any updates will be posted on this page with a revised "Last Updated" date.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>13. Contact Us</h2>
          <p className={styles.text}>
            If you have any questions regarding this Privacy Policy or how your information is handled, please contact us:
            <br /><br />
            <strong>ZAR</strong>
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
