import type { TextareaProps } from '@chakra-ui/react';

export interface TextAreaProps extends TextareaProps {
  /** Small tracked uppercase label above the field. */
  label: string;
  /** Validation message shown under the field when `invalid` is set. */
  error?: string;
  invalid?: boolean;
}
