import { Box } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import ADMIN from '@/theme/admin-tokens';
import type { DetailCardProps } from './props';

/** Bordered card with an uppercase eyebrow title, for read-only detail pages. */
export const DetailCard = ({ title, children }: DetailCardProps) => {
  return (
    <Box border="1px solid" borderColor={COLORS.Border.Default} borderRadius={ADMIN.radius} p="20px">
      <Box letterSpacing="0.05em" textTransform="uppercase" mb="8px">
        <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgFaint}>
          {title}
        </Text>
      </Box>
      {children}
    </Box>
  );
};

export default DetailCard;
