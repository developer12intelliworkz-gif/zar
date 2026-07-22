import Link from 'next/link';
import Image from 'next/image';
import { imagePath } from '@/lib/imagePath';
import styles from './Logo.module.css';

type LogoProps = {
  variant?: 'header' | 'footer';
};

const LOGO_WIDTH = 150;
const LOGO_HEIGHT = 64;

export default function Logo({ variant = 'header' }: LogoProps) {
  return (
    <div className={styles.logo}>
      <Link href="/" className={styles.logoLink} aria-label="Zar Jewels home">
        <Image
          src={imagePath('/images/zar-logo.svg')}
          alt="Zar Jewels"
          width={LOGO_WIDTH}
          height={LOGO_HEIGHT}
          priority
          className={variant === 'footer' ? styles.logoImageFooter : styles.logoImage}
        />
      </Link>
    </div>
  );
}
