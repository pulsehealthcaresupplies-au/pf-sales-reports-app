/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',

  // Disable image optimization in Docker
  images: {
    unoptimized: true,
  },

  // TypeScript - don't fail on errors during Docker build
  typescript: {
    ignoreBuildErrors: true,
  },

  // Next.js 16: empty turbopack config so build uses webpack
  turbopack: {},

  // Disable source maps in production to save space
  productionBrowserSourceMaps: false,

  // Server components external packages (Apollo Client)
  serverExternalPackages: ['@apollo/client'],

  // Basic webpack configuration for Docker build
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig
