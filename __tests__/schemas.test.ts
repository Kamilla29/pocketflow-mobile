import { loanSnapshotSchema } from '@app/api/schemas';

describe('loan snapshot schema', () => {
  it('rejects an invalid negative principal', () => {
    const result = loanSnapshotSchema.safeParse({
      applicationId: 'LF-TEST',
      principal: -100,
      annualRate: 7,
      termMonths: 12,
      monthlyPayment: 1000,
      nextPaymentDate: new Date().toISOString(),
      paidInstallments: 0,
      status: 'received'
    });
    expect(result.success).toBe(false);
  });
});
