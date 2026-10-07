import type { CalendarView } from '@/components/admin/calendar/types';

export interface CalendarToolbarProps {
  rangeLabel: string;
  rangeNote: string;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onPrev: () => void;
  onNext: () => void;
}
