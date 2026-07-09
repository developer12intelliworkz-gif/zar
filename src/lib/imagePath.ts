export const imagePath = (path: string): string => {
  if (!path) return '';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (basePath && path.startsWith(basePath)) return path;
  return `${basePath}${path.startsWith('/') ? '' : '/'}${path}`;
};
