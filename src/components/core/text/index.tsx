import { Text as ChakraText } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import type { TextProps } from './props';

export const Text = ({
  children,
  color = COLORS.Text.Fg,
  hoverColor,
  display = 'block',
  font,
  ...rest
}: TextProps) => {
  return (
    <ChakraText
      _hover={{ color: hoverColor }}
      color={color}
      display={display}
      {...font}
      {...rest}
    >
      {children}
    </ChakraText>
  );
};

export default Text;
