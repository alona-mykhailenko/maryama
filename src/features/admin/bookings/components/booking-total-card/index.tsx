import COLORS from '@/theme/colors';
import FONTS from '@/theme/fonts';
import { DetailCard } from '@/components/admin/ui/detail-card';
import { Text } from '@/components/ui/text';
import type { BookingTotalCardProps } from './props';

/** Stay total with its nightly breakdown, at the price locked in when the booking was made. */
export const BookingTotalCard = ({ pricePerNight, nights, totalPrice }: BookingTotalCardProps) => {
  return (
    <DetailCard title="Total">
      <Text font={FONTS.T2.T36px.Medium} letterSpacing="-0.02em" fontVariantNumeric="tabular-nums">
        €{totalPrice}
      </Text>
      <Text
        font={FONTS.T2.T14px.Regular}
        color={COLORS.Text.FgSubtle}
        fontVariantNumeric="tabular-nums"
        mt="4px"
      >
        €{pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}
      </Text>
    </DetailCard>
  );
};

export default BookingTotalCard;
