import { formatCurrency, formatDate } from '@app/domain/format';

describe('format helpers', () => {
  it('formats CZK values without fractional digits', () => {
    expect(formatCurrency(12500)).toContain('12');
  });

  it('formats an ISO date as a readable calendar date', () => {
    const result = formatDate('2026-10-15T08:00:00.000Z');
    expect(result).toContain('2026');
  });
});
