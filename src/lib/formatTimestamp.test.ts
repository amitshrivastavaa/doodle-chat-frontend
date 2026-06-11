import { describe, expect, it } from 'vitest';
import { formatTimestamp } from './formatTimestamp';

describe('formatTimestamp', () => {
  it('formats an ISO string as "D Mon YYYY H:mm"', () => {
    const iso = '2018-03-10T09:55:00.000Z';
    const d = new Date(iso);
    const expected = `${d.getDate()} Mar ${d.getFullYear()} ${d.getHours()}:${String(
      d.getMinutes(),
    ).padStart(2, '0')}`;
    expect(formatTimestamp(iso)).toBe(expected);
  });

  it('pads minutes but not the hour', () => {
    const iso = '2018-03-10T08:05:00.000Z';
    const d = new Date(iso);
    expect(formatTimestamp(iso)).toBe(
      `${d.getDate()} Mar ${d.getFullYear()} ${d.getHours()}:05`,
    );
  });

  it('returns an empty string for invalid input', () => {
    expect(formatTimestamp('not-a-date')).toBe('');
  });
});
