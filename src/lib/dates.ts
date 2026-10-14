const DAY_MS = 24 * 60 * 60 * 1000;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, amount: number): Date {
  const next = startOfDay(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function diffInDays(from: Date, to: Date): number {
  return Math.round((startOfDay(to).getTime() - startOfDay(from).getTime()) / DAY_MS);
}

/** Monday-start week containing `date`. */
export function startOfWeek(date: Date): Date {
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  return addDays(date, mondayOffset);
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/** Monday-start 6-week grid covering `date`'s month. */
export function monthGridStart(date: Date): Date {
  return startOfWeek(startOfMonth(date));
}

const DOW_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const WEEKDAY_LABELS = DOW_SHORT;

export function formatDow(date: Date): string {
  return DOW_SHORT[(date.getDay() + 6) % 7];
}

export function formatDayNum(date: Date): string {
  return String(date.getDate());
}

export function formatRangeLabel(start: Date, end: Date): string {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${start.getDate()} – ${end.toLocaleDateString('en-GB', opts)}`;
  }
  return `${start.toLocaleDateString('en-GB', opts)} – ${end.toLocaleDateString('en-GB', opts)}`;
}

export function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export function formatShortDate(value: string | Date): string {
  const date = typeof value === 'string' ? parseDay(value) : value;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

/** Date-only value as "Mon 12 Oct 2026". */
export function formatLongDate(value: string): string {
  return parseDay(value).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Timestamp (e.g. `createdAt`) as "12 Oct 2026, 14:05" in local time. */
export function formatDateTime(value: string): string {
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isoWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d.getTime() - yearStart.getTime()) / DAY_MS + 1) / 7);
}

/** Whether [rangeStart, rangeEnd) overlaps [day, day+1). */
export function overlapsDay(rangeStart: Date, rangeEnd: Date, day: Date): boolean {
  return rangeStart < addDays(day, 1) && rangeEnd > startOfDay(day);
}

/**
 * Parses a date-only value (`2026-10-05` or `2026-10-05T00:00:00.000Z`, as
 * Postgres `DATE` columns serialise) as local midnight of that calendar day,
 * so it never shifts a day in negative UTC offsets.
 */
export function parseDay(value: string): Date {
  const [year, month, day] = value.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day);
}

/** Number of nights between check-in and check-out. */
export function nightsBetween(checkIn: string, checkOut: string): number {
  return diffInDays(parseDay(checkIn), parseDay(checkOut));
}

/** Local calendar day as `YYYY-MM-DD` (the inverse of `parseDay`). */
export function formatIsoDay(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function isSameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

/** Longest stay the public availability search accepts. */
export const MAX_STAY_NIGHTS = 90;
