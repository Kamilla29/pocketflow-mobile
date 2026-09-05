import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme/useAppTheme';

type Props = { label: string; value: string; supporting?: string };

export function Metric({ label, value, supporting }: Props) {
  const theme = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: theme.colors.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
      {supporting ? <Text style={[styles.supporting, { color: theme.colors.muted }]}>{supporting}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 2 },
  label: { fontSize: 13 },
  value: { fontSize: 21, fontWeight: '800' },
  supporting: { fontSize: 12 }
});
