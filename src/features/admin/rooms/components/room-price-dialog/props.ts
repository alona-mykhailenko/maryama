export interface RoomPriceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pricePerNight: number;
  onSave: (pricePerNight: number) => void;
  loading?: boolean;
  error?: string | null;
}
