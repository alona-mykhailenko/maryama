import type { BookingFormProps } from "@/features/bookings/components/booking-form/props";

export interface BookRoomViewProps {
  room: BookingFormProps["room"];
  initialStay?: BookingFormProps["initialStay"];
}
