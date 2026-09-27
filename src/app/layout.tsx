import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Terraforge Engineering',
  description: 'Terraforge Engineering — engineering, construction, interior design and project management.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
