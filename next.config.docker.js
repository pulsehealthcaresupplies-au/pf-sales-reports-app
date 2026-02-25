/** @type {import('next').NextConfig} */
// NEXT_PUBLIC_* are provided at Docker build time via build-args -> ENV -> .env.production in Dockerfile.
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || '',
    NEXT_PUBLIC_PULSE_CORE_URL: process.env.NEXT_PUBLIC_PULSE_CORE_URL || '',
    NEXT_PUBLIC_API_GATEWAY_URL: process.env.NEXT_PUBLIC_API_GATEWAY_URL || '',
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '',
    NEXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_AUTH_ENDPOINT || '',
    NEXT_PUBLIC_WS_ENDPOINT: process.env.NEXT_PUBLIC_WS_ENDPOINT || '',
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL || '',
    NEXT_PUBLIC_WS_AUTH_URL: process.env.NEXT_PUBLIC_WS_AUTH_URL || '',
    NEXT_PUBLIC_WS_NOTIFICATIONS_URL: process.env.NEXT_PUBLIC_WS_NOTIFICATIONS_URL || '',
    NEXT_PUBLIC_CSP_IMG_ORIGINS: process.env.NEXT_PUBLIC_CSP_IMG_ORIGINS || '',
    NEXT_PUBLIC_DEPLOYMENT_MODE: process.env.NEXT_PUBLIC_DEPLOYMENT_MODE || '',
  },

  output: 'standalone',

  images: {
    unoptimized: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  turbopack: {},

  productionBrowserSourceMaps: false,

  serverExternalPackages: ['@apollo/client', 'web-push'],

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
