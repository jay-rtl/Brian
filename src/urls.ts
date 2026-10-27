// Keep application links and original assets valid on both root and project hosting.
export const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
export const assetUrl = (path: string) => `${basePath}/${path.replace(/^\/+/, '')}`;
export const absoluteAssetUrl = (path: string) => import.meta.env.VITE_SITE_URL
  ? new URL(path, new URL(import.meta.env.VITE_SITE_URL).origin).href
  : path;
