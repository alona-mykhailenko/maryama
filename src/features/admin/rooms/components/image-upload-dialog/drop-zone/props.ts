export interface DropZoneProps {
  /** Called with every file picked or dropped (unfiltered). */
  onFiles: (files: File[]) => void;
  disabled?: boolean;
}
