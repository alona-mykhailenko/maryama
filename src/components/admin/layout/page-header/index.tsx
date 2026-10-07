import { HStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/core/text';
import ADMIN from '@/theme/admin-tokens';
import type { PageHeaderProps } from './props';

/** Top bar of every admin page, aligned with the sidebar's brand row. */
export const PageHeader = ({ heading, actions }: PageHeaderProps) => {
  return (
    <HStack
      as="header"
      h={ADMIN.headerHeight}
      px={ADMIN.gutter}
      borderBottom="1px solid"
      borderColor={COLORS.Border.Default}
      justify="space-between"
      gap="24px"
      flexShrink={0}
    >
      <Text font={FONTS.T2.T20px.Title}>{heading}</Text>
      {actions && <HStack gap="18px">{actions}</HStack>}
    </HStack>
  );
};

export default PageHeader;
