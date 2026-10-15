"use client";

import { useMutation } from "@tanstack/react-query";
import { BookingForm } from "@/features/bookings/components/booking-form";
import { BookingSuccess } from "@/features/bookings/components/booking-success";
import { createBooking } from "@/services/bookings";
import type { BookRoomViewProps } from "./props";

/**
 * Client half of the booking page: sends the request from `BookingForm`
 * (`POST /api/bookings`) and swaps the form for the confirmation once it is
 * accepted. The booking stays pending until the house confirms it.
 */
export const BookRoomView = ({ room, initialStay }: BookRoomViewProps) => {
  const mutation = useMutation({ mutationFn: createBooking });

  if (mutation.isSuccess) {
    return <BookingSuccess email={mutation.variables.guestEmail} />;
  }

  return (
    <BookingForm
      room={room}
      initialStay={initialStay}
      isSubmitting={mutation.isPending}
      errorCode={mutation.error?.message}
      onSubmit={mutation.mutate}
      onStayChange={mutation.reset}
    />
  );
};

export default BookRoomView;
