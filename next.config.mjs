/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ['@heroui/react', 'lucide-react', 'recharts'],
        webpackMemoryOptimizations: true,
    },
    // Turbopack configuration - set root to silence workspace warnings
    turbopack: {
        root: __dirname,
    },
};

export default nextConfig;
