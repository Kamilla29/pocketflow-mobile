import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme/useAppTheme';
import type { LoanStatus } from '@app/domain/types';

export function StatusPill({ status }: { status: LoanStatus }) {
  const theme = useAppTheme();
  const label = status.replace('-', ' ');

  return (
    <View style={[styles.pill, { backgroundColor: theme.colors.successSoft }]}>
      <Text style={[styles.text, { color: theme.colors.success }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { alignSelf: 'flex-start', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  text: { fontSize: 12, fontWeight: '700', textTransform: 'capitalize' }
});
