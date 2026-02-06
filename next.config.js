/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // Enable standalone output for Docker (minimal production image)
  output: 'standalone',
  // Production: no console.log/debug/info in browser (server logs only)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false,
  },
  transpilePackages: ['@heroui/react', '@heroui/theme'],
  experimental: {
    optimizePackageImports: ['@heroui/react', 'lucide-react'],
  },
  // Proxy GraphQL to API Gateway so browser uses same-origin (avoids CORS).
  // Uses NEXT_PUBLIC_API_URL or NEXT_PUBLIC_API_GATEWAY_URL; defaults to http://localhost:8000 in dev.
  async rewrites() {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_GATEWAY_URL ||
      (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');
    if (!apiUrl) return [];
    const base = apiUrl.replace(/\/+$/, '');
    return [
      { source: '/api/graphql/sales-reports', destination: `${base}/graphql/sales-reports` },
    ];
  },
  turbopack: {
    root: __dirname,
  },
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
