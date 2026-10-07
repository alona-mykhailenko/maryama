import { Box, Grid } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/core/text';
import { addDays, diffInDays, formatDayNum, formatDow, parseDay } from '@/lib/dates';
import ADMIN from '@/theme/admin-tokens';
import { BookingBar } from './booking-bar';
import type { WeekViewProps } from './props';

const GRID_COLUMNS = '186px repeat(7, minmax(82px, 1fr))';

/** One row per room, one column per day; stays are bars spanning their nights. */
export const WeekView = ({ weekStart, rooms, bookings }: WeekViewProps) => {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <Box overflowX="auto" maxW="100%">
      <Box
        border="1px solid"
        borderColor={COLORS.Border.Default}
        borderRadius={ADMIN.radius}
        overflow="hidden"
        minW="760px"
      >
        <Grid
          templateColumns={GRID_COLUMNS}
          borderBottom="1px solid"
          borderColor={COLORS.Border.Default}
          bg={COLORS.Bg.Subtle}
        >
          <Box px="18px" py="13px" letterSpacing="0.06em" textTransform="uppercase">
            <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgFaint}>
              Room
            </Text>
          </Box>
          {days.map((day, i) => (
            <Box
              key={day.toISOString()}
              px="14px"
              py="11px"
              borderLeft="1px solid"
              borderColor={COLORS.Border.Subtle}
              bg={i > 4 ? COLORS.Bg.Subtle : 'transparent'}
            >
              <Box letterSpacing="0.06em" textTransform="uppercase">
                <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgFaint}>
                  {formatDow(day)}
                </Text>
              </Box>
              <Text font={FONTS.T2.T16px.Medium} fontVariantNumeric="tabular-nums">
                {formatDayNum(day)}
              </Text>
            </Box>
          ))}
        </Grid>

        {rooms.map((room) => (
          <Grid
            key={room.id}
            templateColumns={GRID_COLUMNS}
            autoRows="84px"
            borderBottom="1px solid"
            borderColor={COLORS.Border.Subtle}
          >
            <Box gridRow="1" gridColumn="1" px="18px" py="16px">
              <Text font={FONTS.T2.T14px.Medium} lineClamp={1}>
                {room.name}
              </Text>
            </Box>

            {days.map((day, i) => (
              <Box
                key={day.toISOString()}
                gridRow="1"
                gridColumn={i + 2}
                borderLeft="1px solid"
                borderColor={COLORS.Border.Subtle}
                bg={i > 4 ? COLORS.Bg.Subtle : 'transparent'}
              />
            ))}

            {bookings
              .filter((booking) => booking.roomId === room.id)
              .map((booking) => {
                const startOffset = Math.max(0, diffInDays(weekStart, parseDay(booking.checkIn)));
                const endOffset = Math.min(7, diffInDays(weekStart, parseDay(booking.checkOut)));
                if (endOffset <= startOffset) return null;
                return (
                  <BookingBar
                    key={booking.id}
                    booking={booking}
                    startOffset={startOffset}
                    span={endOffset - startOffset}
                  />
                );
              })}
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default WeekView;
