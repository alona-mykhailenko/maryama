import { Box, VStack } from "@chakra-ui/react";
import COLORS from "@/theme/colors";
import ADMIN from "@/theme/admin-tokens";
import { PageHeader } from "@/components/admin/layout/page-header";
import type { PageLayoutProps } from "./props";

/**
 * Frame of every admin page: header, optional full-width toolbar, then the content
 * column with the shared gutter and vertical rhythm. Pages never pad themselves.
 */
export const PageLayout = ({
  heading,
  actions,
  toolbar,
  children,
}: PageLayoutProps) => {
  return (
    <VStack align="stretch" gap="0" flex="1" minW="0">
      <PageHeader heading={heading} actions={actions} />

      {toolbar && (
        <Box
          px={ADMIN.gutter}
          borderBottom="1px solid"
          borderColor={COLORS.Border.Default}
          flexShrink={0}
        >
          {toolbar}
        </Box>
      )}

      <VStack
        align="stretch"
        gap={ADMIN.sectionGap}
        minW="0"
        px={ADMIN.gutter}
        pt={ADMIN.contentPt}
        pb={ADMIN.contentPb}
      >
        {children}
      </VStack>
    </VStack>
  );
};

export default PageLayout;
