import { render, screen } from '@testing-library/react-native';
import { StatusPill } from '@app/components/StatusPill';

jest.mock('@app/theme/useAppTheme', () => ({
  useAppTheme: () => ({
    colors: {
      success: '#067647',
      successSoft: '#ECFDF3'
    }
  })
}));

describe('StatusPill', () => {
  it('converts the domain status into readable copy', () => {
    render(<StatusPill status="decision-ready" />);
    expect(screen.getByText('decision ready')).toBeTruthy();
  });
});
