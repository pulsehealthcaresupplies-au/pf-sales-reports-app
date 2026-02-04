/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // Production: no console.log/debug/info in browser (server logs only)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false,
  },
  transpilePackages: ['@heroui/react', '@heroui/theme'],
  experimental: {
    optimizePackageImports: ['@heroui/react', 'lucide-react'],
  },
  // Proxy GraphQL to API Gateway so browser uses same-origin (avoids CORS)
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const base = apiUrl.replace(/\/$/, '');
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
