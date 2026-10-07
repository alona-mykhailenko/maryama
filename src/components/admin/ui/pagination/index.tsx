import { HStack } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';
import ADMIN from '../../tokens';
import { PagePill } from './page-pill';
import type { PaginationProps } from './props';

type PageToken = number | 'ellipsis';

/** First, last, current ± 1, with ellipses for the gaps. */
const buildPageTokens = (page: number, pageCount: number): PageToken[] => {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const pages = [...new Set([1, pageCount, page, page - 1, page + 1])]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);
  const tokens: PageToken[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) tokens.push('ellipsis');
    tokens.push(p);
  });
  return tokens;
};

export const Pagination = ({ page, pageCount, onPageChange, rangeLabel }: PaginationProps) => {
  const tokens = buildPageTokens(page, pageCount);

  return (
    <HStack justify="space-between" gap="16px" px={ADMIN.gutter} py="18px">
      <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgSubtle}>
        {rangeLabel}
      </Text>
      <HStack gap="8px">
        <PagePill label="‹" page={page - 1} disabled={page <= 1} onClick={onPageChange} />
        {tokens.map((token, i) =>
          token === 'ellipsis' ? (
            <Text
              key={`ellipsis-${i}`}
              font={FONTS.T2.T14px.Regular}
              color={COLORS.Text.FgSubtle}
              minW="34px"
              textAlign="center"
            >
              …
            </Text>
          ) : (
            <PagePill
              key={token}
              label={token}
              page={token}
              active={token === page}
              onClick={onPageChange}
            />
          ),
        )}
        <PagePill
          label="›"
          page={page + 1}
          disabled={page >= pageCount}
          onClick={onPageChange}
        />
      </HStack>
    </HStack>
  );
};

export default Pagination;
