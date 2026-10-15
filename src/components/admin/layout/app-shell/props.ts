import type { ReactNode } from 'react';

export interface AppShellProps {
  email: string;
  isLoggingOut: boolean;
  onLogout: () => void;
  children: ReactNode;
}
