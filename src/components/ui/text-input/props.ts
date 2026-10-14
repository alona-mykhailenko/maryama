import type { InputProps } from '@chakra-ui/react';

export interface TextInputProps extends InputProps {
  label?: string;
  error?: string;
  invalid?: boolean;
}
