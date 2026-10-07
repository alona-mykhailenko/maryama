import { HStack } from '@chakra-ui/react';
import { BOOKING_TRANSITIONS } from '@/features/bookings/transitions';
import type { BookingActionsProps } from './props';
import { TransitionButton } from './transition-button';

/** Outlined pill buttons for the status changes allowed from `status`. */
export const BookingActions = ({
  bookingId,
  status,
  disabled = false,
  onTransition,
}: BookingActionsProps) => {
  const transitions = BOOKING_TRANSITIONS[status];
  if (transitions.length === 0) return null;

  return (
    <HStack gap="6px" flexWrap="wrap">
      {transitions.map((transition) => (
        <TransitionButton
          key={transition.to}
          bookingId={bookingId}
          to={transition.to}
          label={transition.label}
          disabled={disabled}
          onTransition={onTransition}
        />
      ))}
    </HStack>
  );
};

export default BookingActions;
