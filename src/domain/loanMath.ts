import type { PaymentRow } from './types';

export function calculateMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  months: number
) {
  if (principal <= 0 || months <= 0) return 0;

  const monthlyRate = annualRatePercent / 100 / 12;
  if (monthlyRate === 0) return principal / months;

  const factor = Math.pow(1 + monthlyRate, months);
  return principal * ((monthlyRate * factor) / (factor - 1));
}

export function buildPaymentSchedule(
  principal: number,
  annualRatePercent: number,
  months: number,
  firstDueDate: Date
): PaymentRow[] {
  const monthlyRate = annualRatePercent / 100 / 12;
  const payment = calculateMonthlyPayment(principal, annualRatePercent, months);
  let balance = principal;

  return Array.from({ length: months }, (_, index) => {
    const interest = monthlyRate === 0 ? 0 : balance * monthlyRate;
    const principalPart = Math.min(balance, payment - interest);
    balance = Math.max(0, balance - principalPart);

    const dueDate = new Date(firstDueDate);
    dueDate.setMonth(dueDate.getMonth() + index);

    return {
      installment: index + 1,
      dueDate: dueDate.toISOString(),
      principal: principalPart,
      interest,
      total: principalPart + interest,
      remainingBalance: balance
    };
  });
}

export function getRepaymentProgress(paidInstallments: number, totalInstallments: number) {
  if (totalInstallments <= 0) return 0;
  return Math.max(0, Math.min(1, paidInstallments / totalInstallments));
}
