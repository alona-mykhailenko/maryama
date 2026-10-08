'use client';

import { Box, Grid, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import ADMIN from '@/theme/admin-tokens';
import { ChevronLeftIcon } from '@/components/admin/icons/chevron-left';
import { PageHeader } from '@/components/admin/layout/page-header';
import { DetailCard } from '@/components/admin/ui/detail-card';
import { DetailRow } from '@/components/admin/ui/detail-card/detail-row';
import { QueryState } from '@/components/admin/ui/query-state';
import { StatusBadge } from '@/components/admin/ui/status-badge';
import { Text } from '@/components/ui/text';
import { BookingTotalCard } from '@/features/admin/bookings/components/booking-total-card';
import { bookingStatusTone } from '@/features/admin/bookings/status';
import { formatDateTime, formatLongDate, nightsBetween } from '@/lib/dates';
import { bookingQueryKey, getBooking } from '@/services/bookings';
import { getRoom, roomQueryKey } from '@/services/rooms';

/** Read-only view of one booking: stay, guest, message and total. */
export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const bookingId = Number(params.id);

  const booking = useQuery({
    queryKey: bookingQueryKey(bookingId),
    queryFn: () => getBooking(bookingId),
  });
  const roomId = booking.data?.roomId ?? 0;
  const room = useQuery({
    queryKey: roomQueryKey(roomId),
    queryFn: () => getRoom(roomId),
    enabled: booking.data !== undefined,
  });

  const nights = booking.data ? nightsBetween(booking.data.checkIn, booking.data.checkOut) : 0;

  return (
    <>
      <PageHeader heading={`Booking ${params.id}`} />

      <HStack
        gap="16px"
        px={ADMIN.gutter}
        py="14px"
        borderBottom="1px solid"
        borderColor={COLORS.Border.Default}
      >
        <HStack asChild gap="8px" color={COLORS.Text.FgMuted} _hover={{ color: COLORS.Text.Fg }}>
          <Link href="/admin/bookings">
            <ChevronLeftIcon size={16} />
            <Text font={FONTS.T2.T14px.Regular} color="inherit">
              All bookings
            </Text>
          </Link>
        </HStack>
      </HStack>

      <QueryState
        isLoading={booking.isLoading || room.isLoading}
        isError={booking.isError || room.isError}
      />

      {booking.data && room.data && (
        <Box px={ADMIN.gutter} pt="26px" pb="48px">
          <Grid
            templateColumns={{ base: '1fr', lg: 'minmax(0, 1.55fr) minmax(260px, 1fr)' }}
            gap="18px"
            alignItems="start"
          >
            <VStack align="stretch" gap="18px" minW="0">
              <DetailCard title="Stay">
                <DetailRow label="Room">
                  <Link href={`/admin/rooms/${room.data.id}`}>{room.data.name}</Link>
                </DetailRow>
                <DetailRow label="Check-in">{formatLongDate(booking.data.checkIn)}</DetailRow>
                <DetailRow label="Check-out">{formatLongDate(booking.data.checkOut)}</DetailRow>
                <DetailRow label="Nights">{nights}</DetailRow>
                <DetailRow label="Guests">{booking.data.guests}</DetailRow>
              </DetailCard>

              <DetailCard title="Guest">
                <DetailRow label="Name">{booking.data.guestName}</DetailRow>
                <DetailRow label="Email">{booking.data.guestEmail}</DetailRow>
                <DetailRow label="Phone">{booking.data.guestPhone ?? '—'}</DetailRow>
              </DetailCard>

              <DetailCard title="Message">
                <Text
                  font={FONTS.T2.T14px.Regular}
                  color={booking.data.message ? COLORS.Text.FgSecondary : COLORS.Text.FgSubtle}
                  whiteSpace="pre-line"
                >
                  {booking.data.message || 'No message.'}
                </Text>
              </DetailCard>
            </VStack>

            <VStack align="stretch" gap="18px" minW="0">
              <DetailCard title="Booking">
                <DetailRow label="Status">
                  <StatusBadge tone={bookingStatusTone(booking.data.status)} />
                </DetailRow>
                <DetailRow label="Requested">{formatDateTime(booking.data.createdAt)}</DetailRow>
              </DetailCard>

              <BookingTotalCard pricePerNight={room.data.pricePerNight} nights={nights} />
            </VStack>
          </Grid>
        </Box>
      )}
    </>
  );
}
