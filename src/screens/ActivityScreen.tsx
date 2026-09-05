import { useQuery } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@app/components/Screen';
import { SectionHeader } from '@app/components/SectionHeader';
import { Card } from '@app/components/Card';
import { LoadingState } from '@app/components/LoadingState';
import { ErrorState } from '@app/components/ErrorState';
import { fetchActivity } from '@app/api/mockApi';
import { formatDate } from '@app/domain/format';
import { useAppTheme } from '@app/theme/useAppTheme';

export function ActivityScreen() {
  const theme = useAppTheme();
  const query = useQuery({ queryKey: ['activity'], queryFn: fetchActivity });

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <SectionHeader eyebrow="Timeline" title="Recent activity" description="Illustrative product events that make state changes visible and reviewable." />
      {query.isLoading ? <LoadingState label="Loading activity" /> : null}
      {query.isError ? <ErrorState description="Activity could not be loaded." onRetry={() => query.refetch()} /> : null}
      {query.data?.map((item) => (
        <Card key={item.id}>
          <View style={styles.row}>
            <Text style={[styles.title, { color: theme.colors.text }]}>{item.title}</Text>
            <Text style={[styles.date, { color: theme.colors.muted }]}>{formatDate(item.timestamp)}</Text>
          </View>
          <Text style={[styles.description, { color: theme.colors.muted }]}>{item.description}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  title: { fontWeight: '800', flex: 1 },
  date: { fontSize: 12 },
  description: { lineHeight: 20 }
});
