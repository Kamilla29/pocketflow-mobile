import { activitySchema, checklistSchema, loanSnapshotSchema } from './schemas';
import type { ActivityItem, ChecklistItem, LoanSnapshot } from '@app/domain/types';

const delay = (milliseconds: number) =>
  new Promise((resolve) => globalThis.setTimeout(resolve, milliseconds));

export async function fetchLoanSnapshot(): Promise<LoanSnapshot> {
  await delay(320);

  return loanSnapshotSchema.parse({
    applicationId: 'LF-PORTFOLIO-2026',
    principal: 420000,
    annualRate: 7.9,
    termMonths: 60,
    monthlyPayment: 8496,
    nextPaymentDate: '2026-10-15T08:00:00.000Z',
    paidInstallments: 8,
    status: 'reviewing'
  });
}

export async function fetchActivity(): Promise<ActivityItem[]> {
  await delay(240);

  return activitySchema.parse([
    {
      id: 'activity-1',
      title: 'Application moved to review',
      description: 'The fictional application entered the illustrative review stage.',
      timestamp: '2026-09-03T13:20:00.000Z',
      tone: 'success'
    },
    {
      id: 'activity-2',
      title: 'Documents checklist updated',
      description: 'No real documents are uploaded in this portfolio application.',
      timestamp: '2026-09-02T08:45:00.000Z',
      tone: 'neutral'
    },
    {
      id: 'activity-3',
      title: 'Payment estimate refreshed',
      description: 'The monthly estimate is calculated from the local demo loan model.',
      timestamp: '2026-09-01T18:15:00.000Z',
      tone: 'warning'
    }
  ]);
}

export async function fetchChecklist(): Promise<ChecklistItem[]> {
  await delay(220);

  return checklistSchema.parse([
    {
      id: 'identity',
      label: 'Identity check',
      description: 'Represented only as a fictional completed state.',
      state: 'complete'
    },
    {
      id: 'income',
      label: 'Income information',
      description: 'Demo data is present in the LoanFlow portfolio journey.',
      state: 'complete'
    },
    {
      id: 'review',
      label: 'Application review',
      description: 'The application is currently in the illustrative review stage.',
      state: 'pending'
    },
    {
      id: 'documents',
      label: 'Additional documents',
      description: 'No additional documents are required in this demo scenario.',
      state: 'not-required'
    }
  ]);
}
