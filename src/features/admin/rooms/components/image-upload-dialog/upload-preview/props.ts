export interface UploadPreviewProps {
  file: File;
  /** Object URL of the file, owned by the dialog. */
  url: string;
  /** Called with `url`, which identifies the file in the selection. */
  onRemove: (url: string) => void;
  disabled?: boolean;
}
