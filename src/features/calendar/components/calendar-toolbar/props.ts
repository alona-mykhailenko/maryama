import type { CalendarView } from '@/features/calendar/types';

export interface CalendarToolbarProps {
  rangeLabel: string;
  rangeNote: string;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrev: () => void;
  onNext: () => void;
}
