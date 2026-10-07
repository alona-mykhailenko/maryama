'use client';

import type { ReactNode } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/admin/layout/app-shell';
import { logout } from '@/services/auth';

interface AdminShellProps {
  email: string;
  children: ReactNode;
}

/** Client half of the admin layout: the `AppShell` with its log-out (`POST /api/auth/logout`). */
export const AdminShell = ({ email, children }: AdminShellProps) => {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      router.replace('/admin/login');
      router.refresh();
    },
  });

  const handleLogout = () => logoutMutation.mutate();

  return (
    <AppShell email={email} isLoggingOut={logoutMutation.isPending} onLogout={handleLogout}>
      {children}
    </AppShell>
  );
};

export default AdminShell;
