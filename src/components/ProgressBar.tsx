import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme/useAppTheme';

type Props = { value: number; label: string };

export function ProgressBar({ value, label }: Props) {
  const theme = useAppTheme();
  const normalized = Math.max(0, Math.min(1, value));

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ min: 0, max: 100, now: Math.round(normalized * 100) }}
      style={{ gap: theme.spacing.xs }}
    >
      <View style={[styles.track, { backgroundColor: theme.colors.surfaceMuted }]}>
        <View
          style={[
            styles.fill,
            { width: `${normalized * 100}%`, backgroundColor: theme.colors.brand }
          ]}
        />
      </View>
      <Text style={[styles.label, { color: theme.colors.muted }]}>
        {Math.round(normalized * 100)}% repaid
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 10, overflow: 'hidden', borderRadius: 999 },
  fill: { height: '100%' },
  label: { fontSize: 12 }
});
