export interface FaqItemProps {
  question: string;
  answer: string;
  /** Position in the list, passed back to `onToggle`. */
  index: number;
  isOpen: boolean;
  /** Draw the closing hairline under the last row. */
  isLast: boolean;
  onToggle: (index: number) => void;
}
