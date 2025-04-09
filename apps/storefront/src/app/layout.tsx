import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeProvider from '../theme/ThemeProvider';
import { ReduxProvider } from '../store/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'User Management App',
  description: 'A Next.js application for user management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}