import { Box, type BoxProps } from '@chakra-ui/react';
import LANDING from '../tokens';

/**
 * The centred page-width column every landing section sits in: capped at
 * `LANDING.maxWidth` with the responsive side gutter. Pass box props for the
 * vertical padding, `as`, `id`, etc.
 */
export const SectionContainer = ({ children, ...rest }: BoxProps) => {
  return (
    <Box maxW={LANDING.maxWidth} mx="auto" px={LANDING.gutter} {...rest}>
      {children}
    </Box>
  );
};

export default SectionContainer;
