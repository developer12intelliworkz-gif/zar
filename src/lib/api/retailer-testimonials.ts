import { API_BASE_URL } from '@/lib/api/axios';
import { getImageUrl } from '@/lib/utils';

export interface ApiRetailerTestimonial {
  id?: number;
  video_link?: string | null;
  upload_video?: string | null;
  fallback_image?: string | null;
  title?: string;
  name?: string;
  designation?: string;
  description?: string;
}

export interface ResolvedRetailerTestimonial {
  id?: number;
  poster: string;
  video: string;
  quote: string;
  name: string;
  designation: string;
}

function normalizeMediaUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/([^:]\/)\/+/g, '$1');
  }

  return `${API_BASE_URL.replace(/\/+$/, '')}/${trimmed.replace(/^\/+/, '')}`;
}

export function resolveRetailerTestimonial(item: ApiRetailerTestimonial): ResolvedRetailerTestimonial {
  const videoSource =
    item.video_link?.trim() ||
    item.upload_video?.trim() ||
    '';

  const poster = getImageUrl(item.fallback_image || '');

  return {
    id: item.id,
    poster,
    video: videoSource ? normalizeMediaUrl(videoSource) : '',
    quote: item.description?.trim() || '',
    name: item.name?.trim() || item.title?.trim() || 'Retailer',
    designation: item.designation?.trim() || '',
  };
}

export function isRetailerTestimonialVisible(item: ResolvedRetailerTestimonial): boolean {
  return Boolean(item.name && (item.quote || item.video || item.poster));
}
