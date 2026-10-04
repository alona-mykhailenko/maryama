import type { ButtonProps } from '@chakra-ui/react';

export interface AdminButtonProps extends Omit<ButtonProps, 'variant'> {
  /** `primary`: filled ink pill. `secondary`: light grey pill. `danger`: filled red pill. */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Adds a 1px outline in the variant's border colour. Off by default. */
  bordered?: boolean;
}
