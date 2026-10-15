export interface ReserveButtonProps {
  label: string;
  /** Renders a link to this page instead of a button. */
  href?: string;
  disabled?: boolean;
  onClick?: () => void;
}
