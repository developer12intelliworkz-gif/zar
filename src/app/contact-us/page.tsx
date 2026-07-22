import type { Metadata } from 'next';
import ContactPage from '../contact/page';

export const metadata: Metadata = {
  title: 'Contact Us | Zar Jewels Gold Jewellery Manufacturer',
  description: "Reach out to Zar Jewels for enquiries about our gold jewellery collections, dealership opportunities, or customer support. We're here to help.",
  openGraph: {
    images: ['https://zar-one.vercel.app/images/zar-logo.svg'],
  },
};

export default ContactPage;
