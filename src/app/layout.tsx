import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DynamicProviders } from '@/components/providers/DynamicProviders';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={inter.className} suppressHydrationWarning>
        <DynamicProviders>{children}</DynamicProviders>
      </body>
    </html>
  );
}
