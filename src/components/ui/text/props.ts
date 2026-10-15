import type { TextProps as ChakraTextProps } from '@chakra-ui/react';
import type { Font } from '@/theme/fonts';

export interface TextProps extends Omit<ChakraTextProps, 'font'> {

  hoverColor?: string;
  font?: Font;
}
