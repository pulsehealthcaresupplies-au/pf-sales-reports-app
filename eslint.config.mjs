import nextConfig from 'eslint-config-next';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  { ignores: ['src/lib/graphql/generated/**', 'check-apollo.js', 'fix-generated.js', 'patch-hooks.js'] },
  ...nextConfig,
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-console': 'warn',
    },
  },
  { files: ['scripts/**', 'tests/**', '**/*.test.*', '**/*.spec.*'], rules: { 'no-console': 'off' } },
  // Config/build/dev files: avoid noisy warnings
  {
    files: ['scripts/**', 'next.config.js', 'next.config.*.js'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  // API route handlers often log for debugging
  { files: ['src/app/api/**/*.ts', 'src/app/api/**/*.tsx'], rules: { 'no-console': 'off' } },
];

export default config;
