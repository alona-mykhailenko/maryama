import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, HStack, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { BOOKING } from "@/config/content";
import { ChevronLeftIcon } from "@/components/site/icons/chevron-left";
import { PageShell } from "@/components/site/layout/page-shell";
import { SectionContainer } from "@/components/site/ui/section-container";
import { BookingRoomRow } from "@/features/bookings/components/booking-room-row";
import type { InitialStay } from "@/features/bookings/components/booking-form/props";
import { getPublicRoom, parseRoomId } from "@/services/rooms-server";
import { MAX_STAY_NIGHTS, nightsBetween } from "@/lib/dates";
import LANDING from "@/theme/landing-tokens";
import { BookRoomView } from "@/features/bookings/components/book-room-view";

export async function generateMetadata(props: PageProps<"/rooms/[id]/book">): Promise<Metadata> {
  const roomId = parseRoomId((await props.params).id);
  const room = roomId ? await getPublicRoom(roomId) : null;
  return room ? { title: BOOKING.pageTitle(room.name) } : {};
}

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;

const firstParam = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

/**
 * The stay passed by the room page's reserve card (`?checkIn=&checkOut=&guests=`),
 * or `undefined` when it is missing or doesn't fit the room. The API still
 * re-validates everything on submit.
 */
const parseInitialStay = (
  searchParams: Record<string, string | string[] | undefined>,
  capacity: number,
): InitialStay | undefined => {
  const checkIn = firstParam(searchParams.checkIn);
  const checkOut = firstParam(searchParams.checkOut);
  const guests = Number(firstParam(searchParams.guests));
  if (!checkIn || !checkOut || !ISO_DAY.test(checkIn) || !ISO_DAY.test(checkOut)) return undefined;

  const nights = nightsBetween(checkIn, checkOut);
  if (!(nights >= 1 && nights <= MAX_STAY_NIGHTS)) return undefined;

  return {
    checkIn,
    checkOut,
    guests: Number.isInteger(guests) && guests >= 1 && guests <= capacity ? guests : Math.min(2, capacity),
  };
};

/**
 * Booking page, reached from a room's "Book" button: the room as a single line
 * (photo, name, rate) above the booking request form, prefilled with the stay
 * chosen on the room page when there is one. Unknown ids get the 404 page.
 */
export default async function BookRoomPage(props: PageProps<"/rooms/[id]/book">) {
  const roomId = parseRoomId((await props.params).id);
  if (!roomId) notFound();

  const room = await getPublicRoom(roomId);
  if (!room) notFound();

  const initialStay = parseInitialStay(await props.searchParams, room.capacity);

  return (
    <PageShell showReserve={false}>
      <SectionContainer
        as="section"
        id="book"
        pt={{ base: "112px", md: "144px" }}
        pb={LANDING.space.section}
      >
        <VStack align="stretch" gap={LANDING.space.label} maxW="960px" mx="auto">
          <HStack
            asChild
            alignSelf="start"
            gap="6px"
            letterSpacing=".3em"
            textTransform="uppercase"
            opacity={0.6}
            transition="opacity .2s ease"
            _hover={{ opacity: 1 }}
          >
            <NextLink href={BOOKING.backHref(room.id)}>
              <ChevronLeftIcon />
              <Text font={FONTS.T1.T9px.Light}>{BOOKING.back}</Text>
            </NextLink>
          </HStack>
          <BookingRoomRow room={room} />
          <Box pt={LANDING.space.label}>
            <BookRoomView room={room} initialStay={initialStay} />
          </Box>
        </VStack>
      </SectionContainer>
    </PageShell>
  );
}
