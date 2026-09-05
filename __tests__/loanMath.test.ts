import { buildPaymentSchedule, calculateMonthlyPayment, getRepaymentProgress } from '@app/domain/loanMath';

describe('loan math', () => {
  it('calculates a stable amortized monthly payment', () => {
    const payment = calculateMonthlyPayment(420000, 7.9, 60);
    expect(payment).toBeGreaterThan(8000);
    expect(payment).toBeLessThan(9000);
  });

  it('builds one schedule row per installment and reaches zero balance', () => {
    const schedule = buildPaymentSchedule(120000, 6, 12, new Date('2026-10-15T08:00:00.000Z'));
    expect(schedule).toHaveLength(12);
    expect(schedule[0]?.installment).toBe(1);
    expect(schedule.at(-1)?.remainingBalance).toBeCloseTo(0, 2);
  });

  it('clamps repayment progress to 0..1', () => {
    expect(getRepaymentProgress(-1, 10)).toBe(0);
    expect(getRepaymentProgress(5, 10)).toBe(0.5);
    expect(getRepaymentProgress(12, 10)).toBe(1);
  });
});
