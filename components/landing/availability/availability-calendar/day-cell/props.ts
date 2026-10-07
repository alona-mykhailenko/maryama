export interface DayCellProps {
  day: Date;
  /** Belongs to the previous or next month: rendered as an empty cell. */
  isOutside: boolean;
  /** In the past (or beyond the longest stay): shown faded, not clickable. */
  isDisabled: boolean;
  /** Check-in or check-out day: filled ink square. */
  isEdge: boolean;
  /** Strictly between check-in and check-out (or the hovered check-out). */
  isInRange: boolean;
  isToday: boolean;
  onSelect: (day: Date) => void;
  onHover: (day: Date) => void;
}
