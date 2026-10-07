import { Box, chakra } from '@chakra-ui/react';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { Text } from '@/components/core/text';
import { formatDayNum } from '@/lib/dates';
import LANDING from '../../../tokens';
import type { DayCellProps } from './props';

const DAY_HEIGHT = { base: '40px', md: '44px' };

/**
 * One day of the availability calendar. Check-in / check-out are solid ink
 * blocks, the nights between them a sand band; today carries a small dot.
 */
export const DayCell = ({
  day,
  isOutside,
  isDisabled,
  isEdge,
  isInRange,
  isToday,
  onSelect,
  onHover,
}: DayCellProps) => {
  const handleClick = () => onSelect(day);
  const handleMouseEnter = () => onHover(day);

  if (isOutside) {
    return <Box h={DAY_HEIGHT} />;
  }

  const background = isEdge ? LANDING.ink : isInRange ? COLORS.Earth.Sand : 'transparent';
  const color = isEdge ? COLORS.Text.FgInverted : LANDING.ink;

  return (
    <chakra.button
      type="button"
      position="relative"
      h={DAY_HEIGHT}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={background}
      border="1px solid"
      borderColor="transparent"
      cursor={isDisabled ? 'default' : 'pointer'}
      opacity={isDisabled ? 0.25 : 1}
      transition="background .2s ease, border-color .2s ease"
      _hover={isDisabled || isEdge ? undefined : { borderColor: LANDING.ink }}
      _focusVisible={{ outline: '1px solid', outlineColor: LANDING.ink, outlineOffset: '-4px' }}
      disabled={isDisabled}
      aria-pressed={isEdge}
      aria-label={day.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <Text font={isToday ? FONTS.T1.T13px.Regular : FONTS.T1.T13px.Light} color={color}>
        {formatDayNum(day)}
      </Text>
      {isToday && (
        <Box
          position="absolute"
          bottom="6px"
          left="50%"
          transform="translateX(-50%)"
          w="3px"
          h="3px"
          borderRadius="full"
          bg={color}
        />
      )}
    </chakra.button>
  );
};

export default DayCell;
