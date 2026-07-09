'use client';

import { motion, type Variants } from 'framer-motion';
import FeatureCard from '@/components/ui/molecules/FeatureCard/FeatureCard';
import styles from './CraftsmanshipSection.module.css';

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut' as const },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: 'easeOut' as const,
      delay: index * 0.18,
    },
  }),
};

const features = [
  {
    icon: '/images/icon-manufacturing.svg',
    title: 'Precision Manufacturing',
    description: 'Every piece born from CNC-driven mastery. Consistency isn’t a promise here, it’s engineered in.',
  },
  {
    icon: '/images/icon-precision.svg',
    title: 'Design Engineering',
    description: 'Every curve calculated. Every contour intentional. Balance and symmetry, down to the millimetre.',
  },
  {
    icon: '/images/icon-finishing.svg',
    title: 'Artisan Hand Finishing',
    description: 'Where machine precision meets generations of craft. Each piece finished by hand for a shine that can’t be automated.',
  },
  {
    icon: '/images/icon-quality.svg',
    title: 'Rigorous Quality Checks',
    description: 'Multiple inspections. Zero compromises. Only the pieces that earn the Zar name make it to you.',
  },
];

export default function CraftsmanshipSection() {
  return (
    <section className="mt-100 mb-100">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="fs_54">Precision in Every Process</h2>
          <p className={styles.subtitle}>
            From concept to creation, every <strong className="txt_black">gold bangle</strong> is shaped through precision manufacturing processes and refined by skilled artisans to ensure consistency and exceptional finish.
          </p>
        </motion.div>
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
