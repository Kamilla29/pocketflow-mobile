import { useQuery } from '@tanstack/react-query';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Card } from '@app/components/Card';
import { LoadingState } from '@app/components/LoadingState';
import { ErrorState } from '@app/components/ErrorState';
import { fetchLoanSnapshot } from '@app/api/mockApi';
import { buildPaymentSchedule } from '@app/domain/loanMath';
import { formatCurrency, formatDate } from '@app/domain/format';
import { useAppTheme } from '@app/theme/useAppTheme';

export function PaymentScheduleScreen() {
  const theme = useAppTheme();
  const query = useQuery({ queryKey: ['loan-snapshot'], queryFn: fetchLoanSnapshot });

  if (query.isLoading) return <LoadingState label="Loading payment schedule" />;
  if (query.isError || !query.data) {
    return <View style={[styles.fallback, { backgroundColor: theme.colors.background }]}><ErrorState description="The payment schedule could not be calculated." onRetry={() => query.refetch()} /></View>;
  }

  const schedule = buildPaymentSchedule(query.data.principal, query.data.annualRate, query.data.termMonths, new Date(query.data.nextPaymentDate));

  return (
    <FlatList
      style={[styles.list, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={[styles.content, { padding: theme.spacing.md, gap: theme.spacing.sm }]}
      data={schedule}
      keyExtractor={(item) => String(item.installment)}
      refreshControl={<RefreshControl refreshing={query.isRefetching} onRefresh={() => query.refetch()} />}
      ListHeaderComponent={<Text style={[styles.intro, { color: theme.colors.muted, marginBottom: theme.spacing.sm }]}>Illustrative amortization schedule. Values are calculated locally and are not a real banking statement.</Text>}
      renderItem={({ item }) => (
        <Card>
          <View style={styles.row}>
            <View>
              <Text style={[styles.installment, { color: theme.colors.text }]}>Payment {item.installment}</Text>
              <Text style={[styles.muted, { color: theme.colors.muted }]}>{formatDate(item.dueDate)}</Text>
            </View>
            <Text style={[styles.total, { color: theme.colors.text }]}>{formatCurrency(item.total)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.muted, { color: theme.colors.muted }]}>Principal {formatCurrency(item.principal)}</Text>
            <Text style={[styles.muted, { color: theme.colors.muted }]}>Interest {formatCurrency(item.interest)}</Text>
          </View>
          <Text style={[styles.balance, { color: theme.colors.text }]}>Balance after payment: {formatCurrency(item.remainingBalance)}</Text>
        </Card>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 }, content: {}, fallback: { flex: 1, padding: 16, justifyContent: 'center' }, intro: { lineHeight: 21 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 }, installment: { fontWeight: '800' }, total: { fontWeight: '800' }, muted: { fontSize: 13 }, balance: { fontSize: 13 }
});
