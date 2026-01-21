/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@heroui/react', '@heroui/theme'],
  experimental: {
    optimizePackageImports: ['@heroui/react', 'lucide-react'],
  },
  // Turbopack configuration - set root to silence workspace warnings
  turbopack: {
    root: __dirname,
  },
  // Set outputFileTracingRoot to silence workspace warnings
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
