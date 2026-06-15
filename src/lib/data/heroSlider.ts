export type HeroSlideOrientation = 'horizontal' | 'vertical';

export interface HeroSlideContentTiming {
  titleDelay: number;
  titleDuration: number;
  subtitleDelay: number;
  subtitleDuration: number;
  buttonDelay: number;
  buttonDuration: number;
}

export interface HeroSlide {
  id: string;
  image: string;
  imageMobile: string;
  alt: string;
  heading: string;
  subtitle: string;
  orientation: HeroSlideOrientation;
  slice1Rotation: number;
  slice2Rotation: number;
  slice1Scale: number;
  slice2Scale: number;
  contentTiming: HeroSlideContentTiming;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'Banner_04',
    image: '/images/homepage/Banner_04.webp',
    imageMobile: '/images/homepage/Banner_04_m.webp',
    alt: 'Precision gold jewellery craftsmanship – ZAR Jewellery',
    heading: 'CRAFTED WITH\nPRECISION & PASSION',
    subtitle:
      'From design to finish, every piece reflects decades of artistry and an unmatched commitment to quality.',
    orientation: 'vertical',
    slice1Rotation: 10,
    slice2Rotation: -15,
    slice1Scale: 1.5,
    slice2Scale: 1.5,
    contentTiming: {
      titleDelay: 220,
      titleDuration: 760,
      subtitleDelay: 390,
      subtitleDuration: 700,
      buttonDelay: 560,
      buttonDuration: 640,
    },
  },
  {
    id: 'Banner_03',
    image: '/images/homepage/banner-2.webp',
    imageMobile: '/images/homepage/Banner_02_m.webp',
    alt: 'Timeless gold bangle collections – ZAR Jewellery',
    heading: 'TIMELESS ELEGANCE\nREDEFINED',
    subtitle:
      'Discover our signature collections that blend centuries of tradition with bold contemporary design.',
    orientation: 'horizontal',
    slice1Rotation: 3,
    slice2Rotation: 3,
    slice1Scale: 2,
    slice2Scale: 1,
    contentTiming: {
      titleDelay: 160,
      titleDuration: 700,
      subtitleDelay: 300,
      subtitleDuration: 660,
      buttonDelay: 460,
      buttonDuration: 600,
    },
  },
  {
    id: 'Banner_02',
    imageMobile: '/images/homepage/Banner_05_m.webp',
    image: '/images/homepage/Banner_05.webp',
    alt: 'Timeless gold bangle collections – ZAR Jewellery',
    heading: 'TIMELESS ELEGANCE\nREDEFINED',
    subtitle:
      'Discover our signature collections that blend centuries of tradition with bold contemporary design.',
    orientation: 'horizontal',
    slice1Rotation: 3,
    slice2Rotation: 3,
    slice1Scale: 2,
    slice2Scale: 1,
    contentTiming: {
      titleDelay: 160,
      titleDuration: 700,
      subtitleDelay: 300,
      subtitleDuration: 660,
      buttonDelay: 460,
      buttonDuration: 600,
    },
  },
];
