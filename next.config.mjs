/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    // Production: no console.* in browser (console only when not production)
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Enable standalone output for Docker/AWS (minimal production image)
    output: 'standalone',
    // Remove X-Powered-By header in production for security hardening
    poweredByHeader: false,
    experimental: {
        optimizePackageImports: ['@heroui/react', 'lucide-react', 'recharts'],
        webpackMemoryOptimizations: true,
    },
    // Turbopack configuration - set root to silence workspace warnings
    turbopack: {
        root: __dirname,
    },
    // Server components external packages (for Apollo Client)
    serverExternalPackages: ['@apollo/client'],
    // Webpack configuration for production builds (AWS/Docker)
    webpack: (config, opts) => {
        void opts?.isServer; // Next.js webpack callback signature
        const appNodeModules = path.resolve(__dirname, 'node_modules');
        
        // Ensure node_modules resolution prioritizes app's node_modules
        config.resolve.modules = [
            appNodeModules,
            'node_modules',
            ...(config.resolve.modules || []),
        ];
        config.resolve.symlinks = false;

        // Configure package.json exports resolution
        config.resolve.conditionNames = ['require', 'node', 'import', 'default'];
        config.resolve.mainFields = ['main', 'module', 'browser'];
        config.resolve.exportsFields = ['exports', 'main', 'module'];

        // Ensure single React instance and proper module resolution
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname, 'src'),
            react: path.resolve(__dirname, 'node_modules/react'),
            'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
            'react/jsx-runtime': path.resolve(__dirname, 'node_modules/react/jsx-runtime'),
            'react-dom/client': path.resolve(__dirname, 'node_modules/react-dom/client'),
            tailwindcss: path.resolve(__dirname, 'node_modules/tailwindcss'),
            postcss: path.resolve(__dirname, 'node_modules/postcss'),
        };

        config.resolve.extensionAlias = {
            '.js': ['.js', '.ts', '.tsx'],
            '.jsx': ['.jsx', '.tsx'],
        };

        config.resolve.extensions = [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.mjs',
            '.json',
            '.css',
            ...(config.resolve.extensions || []),
        ];

        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
            net: false,
            tls: false,
        };

        return config;
    },
};

export default nextConfig;
