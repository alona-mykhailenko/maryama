'use client';

import { Box, Grid, HStack, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { BookingStatus } from '@/generated/prisma/enums';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { PageLayout } from '@/components/admin/layout/page-layout';
import { BackButton } from '@/components/admin/ui/back-button';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';
import { DetailCard } from '@/components/admin/ui/detail-card';
import { DetailRow } from '@/components/admin/ui/detail-card/detail-row';
import { QueryState } from '@/components/admin/ui/query-state';
import { StatusBadge } from '@/components/admin/ui/status-badge';
import { Text } from '@/components/ui/text';
import { BookingStatusActions } from '@/features/admin/bookings/components/booking-status-actions';
import { BookingTotalCard } from '@/features/admin/bookings/components/booking-total-card';
import { bookingStatusTone } from '@/features/admin/bookings/status';
import { formatDateTime, formatLongDate, nightsBetween } from '@/lib/dates';
import {
  bookingQueryKey,
  bookingsQueryKey,
  getBooking,
  updateBookingStatus,
} from '@/services/bookings';
import { getRoom, roomQueryKey } from '@/services/rooms';

const STATUS_ERRORS: Record<string, string> = {
  invalid_transition: 'This booking was changed elsewhere. Its current status is shown above.',
};

/** One booking: stay, guest, message and total, with accept / cancel actions. */
export default function BookingDetailPage() {
  const params = useParams<{ id: string }>();
  const bookingId = Number(params.id);
  const router = useRouter();

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

  const queryClient = useQueryClient();
  const changeStatus = useMutation({
    mutationFn: (status: BookingStatus) => updateBookingStatus({ id: bookingId, status }),
    onSuccess: (updated) => {
      queryClient.setQueryData(bookingQueryKey(bookingId), updated);
      setConfirmCancel(false);
    },
    // The list key prefixes this booking's key, so this also refetches it after a 409.
    onSettled: () => queryClient.invalidateQueries({ queryKey: bookingsQueryKey }),
  });

  const [confirmCancel, setConfirmCancel] = useState(false);

  const handleBack = () => router.back();

  const handleTransition = (status: BookingStatus) => {
    changeStatus.reset();
    if (status === BookingStatus.CANCELLED) setConfirmCancel(true);
    else changeStatus.mutate(status);
  };

  const handleConfirmCancel = () => changeStatus.mutate(BookingStatus.CANCELLED);

  const statusError = changeStatus.error
    ? (STATUS_ERRORS[changeStatus.error.message] ?? 'Could not update the booking. Please try again.')
    : null;

  const nights = booking.data ? nightsBetween(booking.data.checkIn, booking.data.checkOut) : 0;

  return (
    <PageLayout
      heading={`Booking ${params.id}`}
      toolbar={
        <HStack gap="16px" py="14px">
          <BackButton onBack={handleBack} />
        </HStack>
      }
    >
      <QueryState
        isLoading={booking.isLoading || room.isLoading}
        isError={booking.isError || room.isError}
      />

      {booking.data && room.data && (
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
              <Box mt="16px">
                <BookingStatusActions
                  status={booking.data.status}
                  pendingStatus={
                    changeStatus.isPending && !confirmCancel ? changeStatus.variables : null
                  }
                  onTransition={handleTransition}
                  error={confirmCancel ? null : statusError}
                />
              </Box>
            </DetailCard>

            <BookingTotalCard pricePerNight={room.data.pricePerNight} nights={nights} />
          </VStack>
        </Grid>
      )}

      <ConfirmDialog
        open={confirmCancel}
        onOpenChange={setConfirmCancel}
        title="Cancel booking?"
        description="The guest's nights will be released for other bookings. A cancelled booking can't be accepted again."
        confirmLabel="Cancel booking"
        onConfirm={handleConfirmCancel}
        loading={changeStatus.isPending}
        error={statusError}
      />
    </PageLayout>
  );
}
