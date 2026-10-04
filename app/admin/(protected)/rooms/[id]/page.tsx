'use client';

import { Box, Grid, HStack, VStack } from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { BookingStatus } from '@/app/generated/prisma/enums';
import COLORS from '@/assets/colors';
import FONTS from '@/assets/fonts';
import { ChevronLeftIcon } from '@/components/admin/icons/chevron-left';
import { PencilIcon } from '@/components/admin/icons/pencil';
import { PageHeader } from '@/components/admin/layout/page-header';
import { ImageUploadDialog } from '@/components/admin/rooms/image-upload-dialog';
import { RoomImageGallery } from '@/components/admin/rooms/room-image-gallery';
import { RoomPriceCard } from '@/components/admin/rooms/room-price-card';
import { RoomUpcomingBookings } from '@/components/admin/rooms/room-upcoming-bookings';
import ADMIN from '@/components/admin/tokens';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';
import { QueryState } from '@/components/admin/ui/query-state';
import { Text } from '@/components/core/text';
import { parseDay, startOfDay } from '@/lib/dates';
import { bookingsQueryKey, getBookings } from '@/services/bookings';
import { deleteRoomImage, uploadRoomImages } from '@/services/room-images';
import { getRoom, roomQueryKey, roomsQueryKey } from '@/services/rooms';
import type { RoomImage } from '@/services/types/room';

const UPCOMING_LIMIT = 5;

const UPLOAD_ERRORS: Record<string, string> = {
  invalid_type: 'Only JPG, PNG or WebP photos can be uploaded.',
  file_too_large: 'One of the photos is too large.',
};

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>();
  const roomId = Number(params.id);

  const room = useQuery({ queryKey: roomQueryKey(roomId), queryFn: () => getRoom(roomId) });
  const bookings = useQuery({ queryKey: bookingsQueryKey, queryFn: getBookings });

  const queryClient = useQueryClient();
  const refreshRoom = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: roomQueryKey(roomId) }),
      queryClient.invalidateQueries({ queryKey: roomsQueryKey, exact: true }),
    ]);

  const [uploadOpen, setUploadOpen] = useState(false);
  const upload = useMutation({
    mutationFn: (files: File[]) => uploadRoomImages({ roomId, files }),
    onSuccess: async () => {
      await refreshRoom();
      setUploadOpen(false);
    },
    // A partial failure may still have saved some photos.
    onError: refreshRoom,
  });

  const [imageToDelete, setImageToDelete] = useState<RoomImage | null>(null);
  const remove = useMutation({
    mutationFn: (image: RoomImage) => deleteRoomImage({ roomId, imageId: image.id }),
    onSuccess: async () => {
      await refreshRoom();
      setImageToDelete(null);
    },
  });

  const handleAddImages = () => {
    upload.reset();
    setUploadOpen(true);
  };

  const handleDeleteImage = (image: RoomImage) => {
    remove.reset();
    setImageToDelete(image);
  };

  const handleUpload = (files: File[]) => upload.mutate(files);

  const handleConfirmOpenChange = (open: boolean) => {
    if (!open) setImageToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (imageToDelete) remove.mutate(imageToDelete);
  };

  const upcoming = useMemo(() => {
    const today = startOfDay(new Date());
    return (bookings.data ?? [])
      .filter(
        (b) =>
          b.roomId === roomId &&
          b.status !== BookingStatus.CANCELLED &&
          parseDay(b.checkOut) >= today,
      )
      .sort((a, b) => parseDay(a.checkIn).getTime() - parseDay(b.checkIn).getTime())
      .slice(0, UPCOMING_LIMIT);
  }, [bookings.data, roomId]);

  return (
    <>
      <PageHeader heading={room.data ? `${room.data.name}` : 'Rooms'} />

      <HStack
        justify="space-between"
        gap="16px"
        px={ADMIN.gutter}
        py="14px"
        borderBottom="1px solid"
        borderColor={COLORS.Border.Default}
        flexWrap="wrap"
      >
        <HStack asChild gap="8px" color={COLORS.Text.FgMuted} _hover={{ color: COLORS.Text.Fg }}>
          <Link href="/admin/rooms">
            <ChevronLeftIcon size={16} />
            <Text font={FONTS.T2.T14px.Regular} color="inherit">
              All rooms
            </Text>
          </Link>
        </HStack>
        <HStack
          as="button"
          title="Editing coming soon"
          gap="8px"
          px="15px"
          py="9px"
          borderRadius={ADMIN.pill}
          bg={COLORS.Bg.Inverted}
          color={COLORS.Text.FgContrast}
          cursor="not-allowed"
          opacity={0.6}
        >
          <PencilIcon size={16} />
          <Text font={FONTS.T2.T14px.Medium} color="inherit">
            Modify room details
          </Text>
        </HStack>
      </HStack>

      <QueryState
        isLoading={room.isLoading || bookings.isLoading}
        isError={room.isError || bookings.isError}
      />

      {room.data && bookings.data && (
        <Box px={ADMIN.gutter} pt="26px" pb="48px">
          <Grid
            templateColumns={{ base: '1fr', lg: 'minmax(0, 1.55fr) minmax(260px, 1fr)' }}
            gap="26px"
            alignItems="start"
          >
            <VStack align="stretch" gap="12px" minW="0">
              <RoomImageGallery
                images={room.data.images}
                roomName={room.data.name}
                onAdd={handleAddImages}
                onDelete={handleDeleteImage}
              />

              <VStack align="stretch" gap="3px" mt="14px">
                <Text as="h1" font={FONTS.T2.T24px.Medium} letterSpacing="-0.015em">
                  {room.data.name}
                </Text>
                <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgMuted}>
                  Sleeps {room.data.capacity}
                </Text>
              </VStack>

              {room.data.description && (
                <Text
                  font={FONTS.T2.T14px.Regular}
                  color={COLORS.Text.FgSecondary}
                  maxW="62ch"
                  mt="10px"
                >
                  {room.data.description}
                </Text>
              )}
            </VStack>

            <VStack align="stretch" gap="18px" minW="0">
              <RoomPriceCard pricePerNight={room.data.pricePerNight} />
              <RoomUpcomingBookings bookings={upcoming} />
            </VStack>
          </Grid>
        </Box>
      )}

      <ImageUploadDialog
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUpload={handleUpload}
        loading={upload.isPending}
        error={
          upload.error
            ? (UPLOAD_ERRORS[upload.error.message] ?? 'Upload failed. Please try again.')
            : null
        }
      />

      <ConfirmDialog
        open={imageToDelete !== null}
        onOpenChange={handleConfirmOpenChange}
        title="Delete photo?"
        description="This photo will be removed from the room and from the website. This can't be undone."
        confirmLabel="Delete photo"
        onConfirm={handleConfirmDelete}
        loading={remove.isPending}
        error={remove.isError ? 'Could not delete the photo. Please try again.' : null}
      />
    </>
  );
}
