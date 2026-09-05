import { ActivityIndicator, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme/useAppTheme';

export function LoadingState({ label = 'Loading' }: { label?: string }) {
  const theme = useAppTheme();

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      style={{ paddingVertical: theme.spacing.xl, alignItems: 'center', gap: theme.spacing.sm }}
    >
      <ActivityIndicator color={theme.colors.brand} />
      <Text style={{ color: theme.colors.muted }}>{label}</Text>
    </View>
  );
}
