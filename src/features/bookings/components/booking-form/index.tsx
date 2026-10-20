"use client";

import { useState, useSyncExternalStore } from "react";
import { Box, chakra, Grid, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import COLORS from "@/theme/colors";
import FONTS from "@/theme/fonts";
import { Text } from "@/components/ui/text";
import { TextArea } from "@/components/ui/text-area";
import { PhoneInput } from "@/components/ui/phone-input";
import { TextInput } from "@/components/ui/text-input";
import { AVAILABILITY, BOOKING } from "@/config/content";
import { SectionLabel } from "@/components/site/ui/section-label";
import { AvailabilityCalendar } from "@/features/availability/components/availability-calendar";
import { DateSummary } from "@/features/availability/components/date-summary";
import { type BookingRequest, bookingRequestSchema } from "@/features/bookings/schema";
import { diffInDays, formatIsoDay, parseDay } from "@/lib/dates";
import LANDING from "@/theme/landing-tokens";
import { StaySummary } from "../stay-summary";
import { SubmitBookingButton } from "../submit-booking-button";
import type { BookingFormProps } from "./props";

const DEFAULT_GUESTS = 2;

/** Where most guests call from, listed first in the phone country dropdown. */
const PREFERRED_PHONE_COUNTRIES = ["ma", "fr", "es", "gb", "de", "nl", "be", "pt", "it", "ua", "cz"];

interface BookingValues {
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  message: string;
}

type BookingErrors = Partial<Record<keyof BookingValues, string>>;

const noopSubscribe = () => () => {};
const getIsClient = () => true;
const getIsServer = () => false;

/** Form values → the API payload (dates as `YYYY-MM-DD`, empty message dropped). */
const toRequest = (roomId: number, values: BookingValues) => ({
  roomId,
  checkIn: values.checkIn ? formatIsoDay(values.checkIn) : "",
  checkOut: values.checkOut ? formatIsoDay(values.checkOut) : "",
  guests: values.guests,
  guestName: values.guestName,
  guestEmail: values.guestEmail,
  guestPhone: values.guestPhone,
  message: values.message.trim() || undefined,
});

/** Error code from the API → the message shown above the submit button. */
const toErrorMessage = (code: string) =>
  BOOKING.errors[code as keyof typeof BOOKING.errors] ?? BOOKING.errors.generic;

/**
 * The booking request for one room: pick the stay on the calendar (check-in,
 * check-out, guests up to the room's capacity, with the stay total), or, when
 * it was already chosen on the room page, just a summary of it; then the
 * guest's name, email, phone and an optional message. Validated with the same schema
 * as `POST /api/bookings`. Presentational: the valid request goes to
 * `onSubmit`, and the page sends it and shows the result.
 */
export const BookingForm = ({
  room,
  initialStay,
  isSubmitting,
  errorCode,
  onSubmit,
  onStayChange,
}: BookingFormProps) => {
  const isClient = useSyncExternalStore(noopSubscribe, getIsClient, getIsServer);
  const [initialCheckIn] = useState(() => (initialStay ? parseDay(initialStay.checkIn) : null));
  const [initialCheckOut] = useState(() => (initialStay ? parseDay(initialStay.checkOut) : null));
  const [month, setMonth] = useState(() => initialCheckIn ?? new Date());
  const [defaultGuests] = useState(() => initialStay?.guests ?? Math.min(DEFAULT_GUESTS, room.capacity));

  const validate = (values: BookingValues) => {
    const errors: BookingErrors = {};
    if (!values.checkIn || !values.checkOut) errors.checkIn = BOOKING.datesRequired;

    const result = bookingRequestSchema.safeParse(toRequest(room.id, values));
    if (result.success) return errors;
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof BookingRequest;
      if (field === "guestName" || field === "guestEmail" || field === "guestPhone" || field === "message") {
        errors[field] ??= issue.message;
      }
    }
    return errors;
  };

  const handleSubmit = (values: BookingValues) => {
    onSubmit(bookingRequestSchema.parse(toRequest(room.id, values)));
  };

  const formik = useFormik<BookingValues>({
    initialValues: {
      checkIn: initialCheckIn,
      checkOut: initialCheckOut,
      guests: defaultGuests,
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      message: "",
    },
    validate,
    onSubmit: handleSubmit,
  });

  const { checkIn, checkOut, guests } = formik.values;
  const nights = checkIn && checkOut ? diffInDays(checkIn, checkOut) : null;
  const showDatesError = formik.submitCount > 0 && !!formik.errors.checkIn;

  const handleSelect = (day: Date) => {
    onStayChange?.();
    if (checkIn === null || checkOut !== null || day <= checkIn) {
      formik.setValues({ ...formik.values, checkIn: day, checkOut: null });
      return;
    }
    formik.setFieldValue("checkOut", day);
  };

  const handleGuestsChange = (value: number) => {
    formik.setFieldValue("guests", value);
  };

  const handlePhoneChange = (phone: string) => {
    formik.setFieldValue("guestPhone", phone);
  };

  return (
    <chakra.form onSubmit={formik.handleSubmit} noValidate>
      <VStack align="stretch" gap={LANDING.space.related}>
        <VStack align="stretch" gap={LANDING.space.label}>
          <SectionLabel>{BOOKING.label}</SectionLabel>
          {initialCheckIn && initialCheckOut ? (
            <StaySummary
              checkIn={initialCheckIn}
              checkOut={initialCheckOut}
              guests={guests}
              pricePerNight={room.pricePerNight}
              changeHref={BOOKING.backHref(room.id)}
            />
          ) : (
            <Grid
              templateColumns={{ base: "1fr", lg: "1.3fr 1fr" }}
              gap={{ base: "40px", lg: "96px" }}
              alignItems="start"
            >
              {/* Reserves the calendar's height on the server so nothing jumps on hydration. */}
              <Box minH={{ base: "320px", md: "340px" }}>
                {isClient && (
                  <AvailabilityCalendar
                    month={month}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onMonthChange={setMonth}
                    onSelect={handleSelect}
                  />
                )}
              </Box>
              <VStack align="stretch" gap="40px" w="fit" maxW="100%">
                <DateSummary
                  checkIn={checkIn}
                  checkOut={checkOut}
                  guests={guests}
                  maxGuests={room.capacity}
                  onGuestsChange={handleGuestsChange}
                />
                <VStack align="stretch" gap="4px">
                  <Box letterSpacing=".34em" textTransform="uppercase" opacity={0.5}>
                    <Text font={FONTS.T1.T9px.Regular}>{BOOKING.totalLabel}</Text>
                  </Box>
                  <Box opacity={nights !== null ? 1 : 0.45}>
                    <Text font={FONTS.T1.T22px.Light}>
                      {nights !== null
                        ? AVAILABILITY.total(room.pricePerNight * nights)
                        : AVAILABILITY.emptyStay}
                    </Text>
                  </Box>
                </VStack>
                {showDatesError && (
                  <Text font={FONTS.T1.T12px.Light} color={COLORS.Text.FgError} role="alert">
                    {formik.errors.checkIn}
                  </Text>
                )}
              </VStack>
            </Grid>
          )}
        </VStack>

        <VStack align="stretch" gap={LANDING.space.label}>
          <SectionLabel>{BOOKING.detailsLabel}</SectionLabel>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="28px 40px">
            <TextInput
              thinUnderline
              label={BOOKING.nameLabel}
              name="guestName"
              autoComplete="name"
              value={formik.values.guestName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={!!formik.errors.guestName && formik.touched.guestName}
              error={formik.errors.guestName}
            />
            <TextInput
              thinUnderline
              label={BOOKING.emailLabel}
              name="guestEmail"
              type="email"
              autoComplete="email"
              value={formik.values.guestEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              invalid={!!formik.errors.guestEmail && formik.touched.guestEmail}
              error={formik.errors.guestEmail}
            />
            <PhoneInput
              thinUnderline
              label={BOOKING.phoneLabel}
              name="guestPhone"
              preferredCountries={PREFERRED_PHONE_COUNTRIES}
              onChange={handlePhoneChange}
              onBlur={formik.handleBlur}
              invalid={!!formik.errors.guestPhone && formik.touched.guestPhone}
              error={formik.errors.guestPhone}
            />
          </Grid>
          <TextArea
            thinUnderline
            label={BOOKING.messageLabel}
            name="message"
            placeholder={BOOKING.messagePlaceholder}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            invalid={!!formik.errors.message && formik.touched.message}
            error={formik.errors.message}
          />
        </VStack>

        <VStack align="stretch" gap="16px">
          {errorCode && (
            <Text font={FONTS.T1.T12px.Light} color={COLORS.Text.FgError} role="alert">
              {toErrorMessage(errorCode)}
            </Text>
          )}
          <SubmitBookingButton loading={isSubmitting} />
          <Box opacity={0.6}>
            <Text font={FONTS.T1.T12px.Light}>{BOOKING.note}</Text>
          </Box>
        </VStack>
      </VStack>
    </chakra.form>
  );
};

export default BookingForm;
