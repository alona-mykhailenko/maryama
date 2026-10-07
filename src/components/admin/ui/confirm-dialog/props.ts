export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  /** Shows a spinner on the confirm button and blocks closing. */
  loading?: boolean;
  /** Error shown under the description (e.g. the request failed). */
  error?: string | null;
}
