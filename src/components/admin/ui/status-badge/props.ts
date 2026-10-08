/** Label and colours of a badge (e.g. a booking status's tone). */
export interface StatusTone {
  label: string;
  bg: string;
  fg: string;
  border: string;
}

export interface StatusBadgeProps {
  tone: StatusTone;
}
