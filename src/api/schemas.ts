import { z } from 'zod';

export const loanSnapshotSchema = z.object({
  applicationId: z.string().min(1),
  principal: z.number().positive(),
  annualRate: z.number().nonnegative(),
  termMonths: z.number().int().positive(),
  monthlyPayment: z.number().positive(),
  nextPaymentDate: z.string().datetime(),
  paidInstallments: z.number().int().nonnegative(),
  status: z.enum(['received', 'reviewing', 'decision-ready'])
});

export const activitySchema = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    timestamp: z.string().datetime(),
    tone: z.enum(['neutral', 'success', 'warning'])
  })
);

export const checklistSchema = z.array(
  z.object({
    id: z.string(),
    label: z.string(),
    description: z.string(),
    state: z.enum(['complete', 'pending', 'not-required'])
  })
);
