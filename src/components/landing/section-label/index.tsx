import { Box, type BoxProps } from '@chakra-ui/react';
import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';

/**
 * The tracked, uppercase eyebrow used above every section heading
 * ("01 — The Place", "02 — Rooms", …). Pass box props (e.g. `mb`) to space it.
 */
export const SectionLabel = ({ children, ...rest }: BoxProps) => {
  return (
    <Box
      letterSpacing=".34em"
      textTransform="uppercase"
      opacity={0.5}
      {...rest}
    >
      <Text font={FONTS.T1.T9px.Regular}>{children}</Text>
    </Box>
  );
};

export default SectionLabel;
