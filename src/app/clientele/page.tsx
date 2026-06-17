import type { Metadata } from 'next';
import ClienteleClient from './ClienteleClient';

export const metadata: Metadata = {
  title: 'Our Clientele | Trusted Jewellery Partners | ZAR Jewels',
  description: 'Discover why leading jewellery retailers trust ZAR Jewels. Our commitment to quality, craftsmanship, and innovation has built lasting business relationships.',
};

export default function ClientelePage() {
  return <ClienteleClient />;
}
