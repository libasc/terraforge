import type { ReactNode } from 'react';
import AdminLayout from '@/pages/admin/AdminLayout';
export default function Layout({ children }: { children: ReactNode }) { return <AdminLayout>{children}</AdminLayout>; }
