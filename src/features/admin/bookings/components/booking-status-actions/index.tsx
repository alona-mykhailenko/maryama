import { HStack, VStack } from '@chakra-ui/react';
import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { Text } from '@/components/ui/text';
import { BOOKING_TRANSITIONS } from '@/features/bookings/transitions';
import type { BookingStatusActionsProps } from './props';
import { StatusActionButton } from './status-action-button';

/** Full-size buttons for the status changes allowed from `status` (booking detail page). */
export const BookingStatusActions = ({
  status,
  pendingStatus = null,
  onTransition,
  error,
}: BookingStatusActionsProps) => {
  const transitions = BOOKING_TRANSITIONS[status];

  if (transitions.length === 0) {
    return (
      <Text font={FONTS.T2.T14px.Regular} color={COLORS.Text.FgSubtle}>
        This booking is cancelled and can no longer be changed.
      </Text>
    );
  }

  return (
    <VStack align="stretch" gap="10px">
      <HStack gap="8px" flexWrap="wrap">
        {transitions.map((transition) => (
          <StatusActionButton
            key={transition.to}
            to={transition.to}
            label={transition.label}
            loading={pendingStatus === transition.to}
            disabled={pendingStatus !== null}
            onClick={onTransition}
          />
        ))}
      </HStack>
      {error && (
        <Text font={FONTS.T2.T12px.Regular} color={COLORS.Text.FgError}>
          {error}
        </Text>
      )}
    </VStack>
  );
};

export default BookingStatusActions;
