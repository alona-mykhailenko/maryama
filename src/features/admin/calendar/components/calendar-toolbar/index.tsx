import { HStack, IconButton } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { CalendarIcon } from '@/components/admin/icons/calendar';
import { ChevronLeftIcon } from '@/components/admin/icons/chevron-left';
import { ChevronRightIcon } from '@/components/admin/icons/chevron-right';
import { SegmentedToggle } from '@/components/admin/ui/segmented-toggle';
import { Text } from '@/components/ui/text';
import type { CalendarView } from '@/features/admin/calendar/types';
import type { CalendarToolbarProps } from './props';

const VIEW_OPTIONS: { value: CalendarView; label: string }[] = [
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
];

/** Prev / next arrows, the visible range and the Week / Month switch. */
export const CalendarToolbar = ({
  rangeLabel,
  rangeNote,
  view,
  onViewChange,
  onPrev,
  onNext,
}: CalendarToolbarProps) => {
  return (
    <HStack
      justify="space-between"
      gap="20px"
      py="16px"
      flexWrap="wrap"
    >
      <HStack gap="14px">
        <HStack gap="2px">
          <IconButton
            aria-label="Previous"
            variant="ghost"
            size="sm"
            color={COLORS.Text.FgMuted}
            onClick={onPrev}
            _hover={{ bg: COLORS.Bg.Muted, color: COLORS.Text.Fg }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            aria-label="Next"
            variant="ghost"
            size="sm"
            color={COLORS.Text.FgMuted}
            onClick={onNext}
            _hover={{ bg: COLORS.Bg.Muted, color: COLORS.Text.Fg }}
          >
            <ChevronRightIcon />
          </IconButton>
        </HStack>
        <HStack gap="9px">
          <HStack color={COLORS.Text.FgSubtle} gap="0">
            <CalendarIcon />
          </HStack>
          <Text font={FONTS.T2.T14px.Medium}>{rangeLabel}</Text>
        </HStack>
        <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgSubtle}>
          {rangeNote}
        </Text>
      </HStack>

      <SegmentedToggle value={view} onChange={onViewChange} options={VIEW_OPTIONS} />
    </HStack>
  );
};

export default CalendarToolbar;
