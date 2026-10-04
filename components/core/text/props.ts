import type { TextProps as ChakraTextProps } from '@chakra-ui/react';
import type { Font } from '@/assets/fonts';

export interface TextProps extends Omit<ChakraTextProps, 'font'> {

  hoverColor?: string;
  font?: Font;
}
