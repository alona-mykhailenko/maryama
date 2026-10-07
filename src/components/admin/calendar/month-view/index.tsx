import { Box, Grid, VStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import { addDays, monthGridStart, overlapsDay, parseDay, WEEKDAY_LABELS } from '@/lib/dates';
import ADMIN from '@/theme/admin-tokens';
import { BookingChip } from './booking-chip';
import type { MonthViewProps } from './props';

const GRID_COLUMNS = 'repeat(7, minmax(130px, 1fr))';
const MAX_VISIBLE_PER_DAY = 3;

/** Monday-start month grid; each day lists up to three stays, then "+N more". */
export const MonthView = ({ month, rooms, bookings }: MonthViewProps) => {
  const monthIndex = month.getMonth();
  const monthEnd = new Date(month.getFullYear(), monthIndex + 1, 0);

  const weeks: Date[][] = [];
  let cursor = monthGridStart(month);
  while (weeks.length < 6 && cursor <= monthEnd) {
    weeks.push(Array.from({ length: 7 }, (_, i) => addDays(cursor, i)));
    cursor = addDays(cursor, 7);
  }

  const roomsById = new Map(rooms.map((room) => [room.id, room]));

  return (
    <Box overflowX="auto" maxW="100%">
      <Box
        border="1px solid"
        borderColor={COLORS.Border.Default}
        borderRadius={ADMIN.radius}
        overflow="hidden"
        minW="960px"
      >
        <Grid
          templateColumns={GRID_COLUMNS}
          bg={COLORS.Bg.Subtle}
          borderBottom="1px solid"
          borderColor={COLORS.Border.Default}
        >
          {WEEKDAY_LABELS.map((label) => (
            <Box
              key={label}
              px="12px"
              py="11px"
              letterSpacing="0.06em"
              textTransform="uppercase"
              borderLeft="1px solid"
              borderColor={COLORS.Border.Subtle}
            >
              <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgFaint}>
                {label}
              </Text>
            </Box>
          ))}
        </Grid>

        {weeks.map((week) => (
          <Grid
            key={week[0].toISOString()}
            templateColumns={GRID_COLUMNS}
            borderBottom="1px solid"
            borderColor={COLORS.Border.Subtle}
          >
            {week.map((day, i) => {
              const inMonth = day.getMonth() === monthIndex;
              const dayBookings = inMonth
                ? bookings.filter((b) => overlapsDay(parseDay(b.checkIn), parseDay(b.checkOut), day))
                : [];
              const visible = dayBookings.slice(0, MAX_VISIBLE_PER_DAY);
              const overflowCount = dayBookings.length - visible.length;

              return (
                <VStack
                  key={day.toISOString()}
                  align="stretch"
                  gap="4px"
                  minH="116px"
                  px="9px"
                  pt="9px"
                  pb="11px"
                  borderLeft="1px solid"
                  borderColor={COLORS.Border.Subtle}
                  bg={!inMonth || i > 4 ? COLORS.Bg.Subtle : COLORS.Bg.Default}
                >
                  <Text
                    font={FONTS.T2.T12px.Medium}
                    fontVariantNumeric="tabular-nums"
                    color={inMonth ? COLORS.Text.Fg : COLORS.Text.FgDisabled}
                    px="2px"
                    pb="2px"
                  >
                    {day.getDate()}
                  </Text>
                  {visible.map((booking) => (
                    <BookingChip
                      key={booking.id}
                      booking={booking}
                      roomName={roomsById.get(booking.roomId)?.name ?? 'Room'}
                    />
                  ))}
                  {overflowCount > 0 && (
                    <Text font={FONTS.T2.T10px.Regular} color={COLORS.Text.FgSubtle} px="2px">
                      +{overflowCount} more
                    </Text>
                  )}
                </VStack>
              );
            })}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default MonthView;
