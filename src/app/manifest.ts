import type { MetadataRoute } from 'next';

/**
 * Web App Manifest for PWA (install + web push).
 * @see https://nextjs.org/docs/app/guides/progressive-web-apps
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pulse Healthcare Supplies - Sales Reports',
    short_name: 'Pulse Sales',
    description: 'Sales reports and analytics dashboard',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0e9fb8',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon', purpose: 'any' },
    ],
    categories: ['business', 'productivity'],
  };
}
