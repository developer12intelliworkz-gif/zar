import type { Metadata } from 'next';
import EventClient from './EventClient';

export const metadata: Metadata = {
  title: 'ZAR Jewels Events | Jewellery Shows & Exhibitions',
  description: 'Stay updated with the latest ZAR Jewels events, jewellery exhibitions, trade shows, and exclusive showcases featuring our newest gold jewellery collections.',
  openGraph: {
    images: ['https://zar-one.vercel.app/images/zar-logo.svg'],
  },
};

export default function EventPage() {
  return <EventClient />;
}
