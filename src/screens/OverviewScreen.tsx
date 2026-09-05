import { useQuery } from '@tanstack/react-query';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Screen } from '@app/components/Screen';
import { SectionHeader } from '@app/components/SectionHeader';
import { Card } from '@app/components/Card';
import { Metric } from '@app/components/Metric';
import { ProgressBar } from '@app/components/ProgressBar';
import { StatusPill } from '@app/components/StatusPill';
import { ActionButton } from '@app/components/ActionButton';
import { LoadingState } from '@app/components/LoadingState';
import { ErrorState } from '@app/components/ErrorState';
import { fetchLoanSnapshot } from '@app/api/mockApi';
import { formatCurrency, formatDate } from '@app/domain/format';
import { getRepaymentProgress } from '@app/domain/loanMath';
import type { RootStackParamList } from '@app/navigation/types';
import { useAppTheme } from '@app/theme/useAppTheme';

export function OverviewScreen() {
  const theme = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const query = useQuery({ queryKey: ['loan-snapshot'], queryFn: fetchLoanSnapshot });

  return (
    <Screen refreshing={query.isRefetching} onRefresh={() => query.refetch()}>
      <SectionHeader
        eyebrow="PocketFlow"
        title="Your loan at a glance"
        description="A mobile companion concept built on the same fictional product domain as LoanFlow."
      />

      {query.isLoading ? <LoadingState label="Loading loan overview" /> : null}

      {query.isError ? (
        <ErrorState
          description="The local demo data could not be loaded."
          onRetry={() => query.refetch()}
        />
      ) : null}

      {query.data ? (
        <>
          <Card>
            <View style={styles.statusRow}>
              <Text style={[styles.cardEyebrow, { color: theme.colors.muted }]}>Current application</Text>
              <StatusPill status={query.data.status} />
            </View>
            <Text style={[styles.reference, { color: theme.colors.text }]}>{query.data.applicationId}</Text>
            <ProgressBar
              label="Loan repayment progress"
              value={getRepaymentProgress(query.data.paidInstallments, query.data.termMonths)}
            />
          </Card>

          <View style={styles.metricGrid}>
            <Card style={styles.metricCard}>
              <Metric
                label="Monthly payment"
                value={formatCurrency(query.data.monthlyPayment)}
                supporting={`${query.data.annualRate}% p.a.`}
              />
            </Card>
            <Card style={styles.metricCard}>
              <Metric
                label="Next payment"
                value={formatDate(query.data.nextPaymentDate)}
                supporting={`${query.data.termMonths - query.data.paidInstallments} installments left`}
              />
            </Card>
          </View>

          <Card>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>What would you like to review?</Text>
            <ActionButton label="Open payment schedule" onPress={() => navigation.navigate('PaymentSchedule')} />
            <ActionButton label="Application checklist" onPress={() => navigation.navigate('Checklist')} variant="secondary" />
            <ActionButton label="Application details" onPress={() => navigation.navigate('ApplicationDetails')} variant="secondary" />
          </Card>
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  statusRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center' },
  cardEyebrow: { fontSize: 12, textTransform: 'uppercase', fontWeight: '700' },
  reference: { fontSize: 20, fontWeight: '800' },
  metricGrid: { flexDirection: 'row', gap: 10 },
  metricCard: { flex: 1 },
  sectionTitle: { fontSize: 17, fontWeight: '800' }
});
