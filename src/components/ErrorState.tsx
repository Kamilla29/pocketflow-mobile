import { Text, View } from 'react-native';
import { ActionButton } from './ActionButton';
import { useAppTheme } from '@app/theme/useAppTheme';

type Props = { title?: string; description: string; onRetry: () => void };

export function ErrorState({ title = 'Something went wrong', description, onRetry }: Props) {
  const theme = useAppTheme();

  return (
    <View
      accessibilityRole="alert"
      style={{
        padding: theme.spacing.md,
        gap: theme.spacing.sm,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.dangerSoft
      }}
    >
      <Text style={{ color: theme.colors.danger, fontSize: 17, fontWeight: '800' }}>{title}</Text>
      <Text style={{ color: theme.colors.text, lineHeight: 21 }}>{description}</Text>
      <ActionButton label="Try again" onPress={onRetry} variant="secondary" />
    </View>
  );
}
