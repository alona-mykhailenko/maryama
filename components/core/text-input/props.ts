import type { InputProps } from '@chakra-ui/react';

export interface TextInputProps extends InputProps {
  /** Small tracked uppercase label above the field. */
  label: string;
  /** Validation message shown under the field when `invalid` is set. */
  error?: string;
  invalid?: boolean;
}
