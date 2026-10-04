import { AppShell } from '@/components/admin/layout/app-shell';
import { requireAdmin } from '@/lib/auth';

/** Every page in this group requires a signed-in admin (the proxy also guards /admin/*). */
export default async function AdminLayout({ children }: LayoutProps<'/admin'>) {
  const admin = await requireAdmin();

  return <AppShell email={String(admin.email ?? '')}>{children}</AppShell>;
}
