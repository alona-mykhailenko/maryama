import { requireAdmin } from '@/lib/auth';
import { AdminShell } from '@/components/admin/layout/admin-shell';

/** Every page in this group requires a signed-in admin (the proxy also guards /admin/*). */
export default async function AdminLayout({ children }: LayoutProps<'/admin'>) {
  const admin = await requireAdmin();

  return <AdminShell email={String(admin.email ?? '')}>{children}</AdminShell>;
}
