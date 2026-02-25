/** @type {import('next').NextConfig} */
const path = require('path');

const getPulseCoreBase = () => {
  const url = process.env.NEXT_PUBLIC_PULSE_CORE_URL || process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_GATEWAY_URL || 'http://localhost:8001';
  return (url || '').replace(/\/+$/, '');
};

const nextConfig = {
  reactStrictMode: true,
  // Enable standalone output for Docker (minimal production image)
  output: 'standalone',
  // Production: no console.log/debug/info in browser (server logs only)
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? true : false,
  },
  transpilePackages: ['@heroui/react', '@heroui/theme'],
  images: (() => {
    const base = getPulseCoreBase();
    let host = '';
    let protocol = 'http';
    try {
      const u = new URL(base);
      host = u.hostname;
      protocol = u.protocol.replace(':', '');
    } catch (_) {}
    const remotePatterns = [
      { protocol: 'http', hostname: 'localhost', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'localhost', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'via.placeholder.com', port: '', pathname: '/**' },
    ];
    if (host) {
      remotePatterns.push({ protocol, hostname: host, port: '', pathname: '/media/**' });
    }
    remotePatterns.push(
      { protocol: 'https', hostname: '**.s3.ap-southeast-2.amazonaws.com', port: '', pathname: '/media/**' },
      { protocol: 'https', hostname: '**.s3.**.amazonaws.com', port: '', pathname: '/media/**' }
    );
    return {
      remotePatterns,
      formats: ['image/webp', 'image/avif'],
    };
  })(),
  experimental: {
    // Data security: block tainted objects/values from being passed to client (Next.js data-security guide)
    taint: true,
    optimizePackageImports: ['@heroui/react', 'lucide-react', 'recharts'],
    // Cache fetch in Server Components across HMR (local dev) – Next.js local-development guide
    serverComponentsHmrCache: true,
    // Memory: reduce peak memory during Webpack build (Next.js memory-usage guide)
    webpackMemoryOptimizations: true,
    serverSourceMaps: false,
  },
  // Detailed fetch logging in development – Next.js local-development guide
  logging: {
    fetches: { fullUrl: true },
  },
  // Memory: disable source maps in production (memory-usage guide)
  productionBrowserSourceMaps: false,
  enablePrerenderSourceMaps: false,
  // Proxy GraphQL to API Gateway and /media to Pulse Core.
  async rewrites() {
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_GATEWAY_URL ||
      (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8000');
    const pulseCoreBase = getPulseCoreBase();
    const rewrites = [];
    if (apiUrl) {
      const base = apiUrl.replace(/\/+$/, '');
      rewrites.push({ source: '/api/graphql/sales-reports', destination: `${base}/graphql/sales-reports` });
    }
    if (pulseCoreBase) {
      rewrites.push({ source: '/media/:path*', destination: `${pulseCoreBase}/media/:path*` });
    }
    return rewrites;
  },
  // Turbopack (Next.js 16): same as b2b-b2c-app – root + @ alias only; webpack handles react/tailwind for next build.
  turbopack: {
    root: __dirname,
    resolveAlias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  outputFileTracingRoot: path.join(__dirname),

  serverExternalPackages: ['@apollo/client', 'web-push'],

  // Webpack: same structure as b2b-b2c-app (see that app's next.config.js)
  webpack: (config) => {
    const appNodeModules = path.resolve(__dirname, 'node_modules');
    config.resolve.modules = [appNodeModules, 'node_modules', ...(config.resolve.modules || [])];
    config.resolve.symlinks = false;
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
      'react-dom/client': path.resolve(__dirname, 'node_modules/react-dom/client'),
      tailwindcss: path.resolve(__dirname, 'node_modules/tailwindcss'),
      '@tailwindcss/postcss': path.resolve(__dirname, 'node_modules/@tailwindcss/postcss'),
      postcss: path.resolve(__dirname, 'node_modules/postcss'),
    };
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },

  // PWA: service worker headers
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          { key: 'Content-Type', value: 'application/javascript; charset=utf-8' },
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
