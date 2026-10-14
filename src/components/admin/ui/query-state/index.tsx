import { Box } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import type { QueryStateProps } from './props';

/** "Loading…" / load-error line shown while a page's data is not ready. */
export const QueryState = ({ isLoading, isError }: QueryStateProps) => {
  if (!isLoading && !isError) return null;

  return (
    <Box>
      {isLoading ? (
        <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgSubtle}>
          Loading…
        </Text>
      ) : (
        <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgError}>
          Failed to load data. Please refresh the page.
        </Text>
      )}
    </Box>
  );
};

export default QueryState;
