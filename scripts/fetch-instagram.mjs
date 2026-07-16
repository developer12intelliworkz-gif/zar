import fs from 'node:fs';
import path from 'node:path';
import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;

// Load env variables
loadEnvConfig(process.cwd());

const GRAPH_API_VERSION = 'v19.0';
const MEDIA_FIELDS = [
  'id',
  'caption',
  'media_type',
  'media_product_type',
  'media_url',
  'thumbnail_url',
  'permalink',
  'timestamp',
].join(',');

async function fetchInstagram() {
  const userId = (process.env.IG_USER_ID ?? process.env.INSTAGRAM_USER_ID)?.trim();
  const accessToken = (process.env.IG_ACCESS_TOKEN ?? process.env.INSTAGRAM_ACCESS_TOKEN)?.trim();

  if (!userId || !accessToken) {
    console.warn('⚠️ IG_USER_ID or IG_ACCESS_TOKEN is not set. Generating empty instagram.json');
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'instagram.json'),
      JSON.stringify({ success: false, error: 'Credentials missing' })
    );
    return;
  }

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${userId}/media?fields=${MEDIA_FIELDS}&access_token=${accessToken}&limit=12`;

  try {
    const response = await fetch(url);
    const payload = await response.json();

    if (!response.ok || payload.error) {
      throw new Error(payload.error?.message ?? `Instagram API returned status ${response.status}`);
    }

    // Map posts to match frontend types without proxying URLs
    const posts = (payload.data ?? [])
      .map((item, index) => {
        const isVideo = item.media_type === 'VIDEO' || item.media_product_type === 'REELS';
        const displayUrl = isVideo ? (item.thumbnail_url ?? item.media_url) : item.media_url;

        let alt = item.caption || '';
        if (alt.length > 120) alt = alt.slice(0, 117) + '...';

        return {
          id: item.id,
          image: displayUrl || '',
          alt: alt || `Instagram post ${index + 1}`,
          mediaType: item.media_type,
          mediaProductType: item.media_product_type,
          videoUrl: isVideo ? item.media_url : undefined,
          timestamp: item.timestamp,
        };
      })
      .filter((post) => post.image);

    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'instagram.json'),
      JSON.stringify({ success: true, posts })
    );
    console.log(`✅ Statically fetched ${posts.length} Instagram posts and saved to public/instagram.json`);
  } catch (error) {
    console.error('❌ Failed to fetch Instagram posts:', error);
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'instagram.json'),
      JSON.stringify({ success: false, error: error.message })
    );
  }
}

fetchInstagram();
