export interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Sends the selected files; the dialog stays open until the caller closes it. */
  onUpload: (files: File[]) => void;
  loading?: boolean;
  /** Server-side error to show above the buttons. */
  error?: string | null;
}
