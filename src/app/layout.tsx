import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DynamicProviders } from '@/components/providers/DynamicProviders';
import { ConsoleSuppressor } from '@/components/ConsoleSuppressor';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Sales Reports - Pulse Healthcare Supplies',
    template: '%s | Sales Reports',
  },
  description: 'Sales Reports Dashboard for Pulse Healthcare Supplies',
};

function getApiBaseUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_API_GATEWAY_URL ??
    '';
  return (url || '').trim().replace(/\/+$/, '');
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiBaseUrl = getApiBaseUrl();
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className} suppressHydrationWarning>
        <ConsoleSuppressor />
        <DynamicProviders apiBaseUrl={apiBaseUrl}>{children}</DynamicProviders>
      </body>
    </html>
  );
}
