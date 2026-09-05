import { checklistSchema } from '@app/api/schemas';

describe('checklist schema', () => {
  it('accepts supported checklist states', () => {
    const result = checklistSchema.safeParse([{ id: 'review', label: 'Review', description: 'Demo review', state: 'pending' }]);
    expect(result.success).toBe(true);
  });

  it('rejects unsupported checklist states', () => {
    const result = checklistSchema.safeParse([{ id: 'review', label: 'Review', description: 'Demo review', state: 'unknown' }]);
    expect(result.success).toBe(false);
  });
});
