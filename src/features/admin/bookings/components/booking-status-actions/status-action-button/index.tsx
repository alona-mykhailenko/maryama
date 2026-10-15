import { BookingStatus } from '@/generated/prisma/enums';
import { AdminButton } from '@/components/admin/ui/admin-button';
import type { StatusActionButtonProps } from './props';

/** One status change: cancelling is an outlined secondary pill, anything else the primary pill. */
export const StatusActionButton = ({
  to,
  label,
  loading = false,
  disabled = false,
  onClick,
}: StatusActionButtonProps) => {
  const handleClick = () => onClick(to);
  const isCancel = to === BookingStatus.CANCELLED;

  return (
    <AdminButton
      variant={isCancel ? 'secondary' : 'primary'}
      bordered={isCancel}
      loading={loading}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
    </AdminButton>
  );
};

export default StatusActionButton;
