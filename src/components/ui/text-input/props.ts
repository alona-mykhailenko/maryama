import type { InputProps } from '@chakra-ui/react';

export interface TextInputProps extends InputProps {
  label?: string;
  error?: string;
  invalid?: boolean;
  /** Draws a finer, softer hairline (0.5px brand tone) instead of the default ink underline. */
  thinUnderline?: boolean;
}
