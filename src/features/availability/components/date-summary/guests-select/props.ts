export interface GuestsSelectProps {
  value: number;
  /** Highest count offered (a room's capacity). Defaults to 5. */
  max?: number;
  onChange: (guests: number) => void;
}
