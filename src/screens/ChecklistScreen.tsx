import { useQuery } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@app/components/Screen';
import { Card } from '@app/components/Card';
import { LoadingState } from '@app/components/LoadingState';
import { ErrorState } from '@app/components/ErrorState';
import { fetchChecklist } from '@app/api/mockApi';
import { useAppTheme } from '@app/theme/useAppTheme';

const labels = { complete: 'Complete', pending: 'Pending', 'not-required': 'Not required' } as const;

export function ChecklistScreen() {
  const theme = useAppTheme();
  const query = useQuery({ queryKey: ['checklist'], queryFn: fetchChecklist });

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <Text style={[styles.intro, { color: theme.colors.muted }]}>This checklist demonstrates mobile application state only. No real identity or document processing occurs.</Text>
      {query.isLoading ? <LoadingState label="Loading checklist" /> : null}
      {query.isError ? <ErrorState description="The checklist could not be loaded." onRetry={() => query.refetch()} /> : null}
      {query.data?.map((item) => (
        <Card key={item.id}>
          <View style={styles.row}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{item.label}</Text>
            <Text style={[styles.state, { color: item.state === 'complete' ? theme.colors.success : item.state === 'pending' ? theme.colors.warning : theme.colors.muted }]}>{labels[item.state]}</Text>
          </View>
          <Text style={[styles.description, { color: theme.colors.muted }]}>{item.description}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { lineHeight: 21 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  title: { flex: 1, fontWeight: '800' },
  state: { fontSize: 12, fontWeight: '800' },
  description: { lineHeight: 20 }
});
