import type { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Careers at ZAR Jewels | Join Our Growing Team',
  description: 'Build your career with ZAR Jewels. Explore exciting opportunities in jewellery design, manufacturing, marketing, sales, and corporate roles.',
};

export default function CareersPage() {
  return <CareersClient />;
}
