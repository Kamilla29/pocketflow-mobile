import { useQuery } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@app/components/Screen';
import { Card } from '@app/components/Card';
import { LoadingState } from '@app/components/LoadingState';
import { ErrorState } from '@app/components/ErrorState';
import { StatusPill } from '@app/components/StatusPill';
import { fetchLoanSnapshot } from '@app/api/mockApi';
import { formatCurrency } from '@app/domain/format';
import { useAppTheme } from '@app/theme/useAppTheme';

export function ApplicationDetailsScreen() {
  const theme = useAppTheme();
  const query = useQuery({ queryKey: ['loan-snapshot'], queryFn: fetchLoanSnapshot });

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      {query.isLoading ? <LoadingState label="Loading application details" /> : null}
      {query.isError ? <ErrorState description="Application details are temporarily unavailable." onRetry={() => query.refetch()} /> : null}
      {query.data ? (
        <Card>
          <StatusPill status={query.data.status} />
          <DetailRow label="Reference" value={query.data.applicationId} />
          <DetailRow label="Principal" value={formatCurrency(query.data.principal)} />
          <DetailRow label="Term" value={`${query.data.termMonths} months`} />
          <DetailRow label="Illustrative rate" value={`${query.data.annualRate}% p.a.`} />
          <Text style={[styles.notice, { color: theme.colors.muted, backgroundColor: theme.colors.surfaceMuted, borderRadius: theme.radius.sm, padding: theme.spacing.sm, marginTop: theme.spacing.sm }]}>PocketFlow is a portfolio companion application. It does not process identity data, documents, credit scores or real payments.</Text>
        </Card>
      ) : null}
    </Screen>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  const theme = useAppTheme();
  return (
    <View style={styles.row}>
      <Text style={{ color: theme.colors.muted }}>{label}</Text>
      <Text style={[styles.value, { color: theme.colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  value: { fontWeight: '700', textAlign: 'right', flexShrink: 1 },
  notice: { lineHeight: 20 }
});
