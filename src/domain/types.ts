export type LoanStatus = 'received' | 'reviewing' | 'decision-ready';

export type LoanSnapshot = {
  applicationId: string;
  principal: number;
  annualRate: number;
  termMonths: number;
  monthlyPayment: number;
  nextPaymentDate: string;
  paidInstallments: number;
  status: LoanStatus;
};

export type PaymentRow = {
  installment: number;
  dueDate: string;
  principal: number;
  interest: number;
  total: number;
  remainingBalance: number;
};

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  tone: 'neutral' | 'success' | 'warning';
};

export type ChecklistItem = {
  id: string;
  label: string;
  description: string;
  state: 'complete' | 'pending' | 'not-required';
};
