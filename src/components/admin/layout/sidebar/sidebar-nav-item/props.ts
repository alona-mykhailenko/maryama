import type { ComponentType } from 'react';
import type { IconProps } from '@/components/admin/icons/icon-base';

export interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
  active?: boolean;
}
