import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Screen } from '@app/components/Screen';
import { SectionHeader } from '@app/components/SectionHeader';
import { Card } from '@app/components/Card';
import { usePreferencesStore, type AppearancePreference } from '@app/state/preferencesStore';
import { useAppTheme } from '@app/theme/useAppTheme';

const appearanceOptions: AppearancePreference[] = ['system', 'light', 'dark'];

export function SettingsScreen() {
  const theme = useAppTheme();
  const { notificationsEnabled, biometricShortcutEnabled, reduceMotion, appearance, setNotificationsEnabled, setBiometricShortcutEnabled, setReduceMotion, setAppearance } = usePreferencesStore();

  return (
    <Screen>
      <SectionHeader eyebrow="Preferences" title="Settings" description="Persisted local preferences demonstrate state management without storing sensitive information." />
      <Card>
        <Text style={[styles.heading, { color: theme.colors.text }]}>Appearance</Text>
        <View style={styles.segmented}>
          {appearanceOptions.map((option) => {
            const active = appearance === option;
            return (
              <Pressable key={option} accessibilityRole="button" accessibilityState={{ selected: active }} onPress={() => setAppearance(option)} style={[styles.segment, { backgroundColor: active ? theme.colors.brandSoft : theme.colors.surfaceMuted, borderColor: active ? theme.colors.brand : theme.colors.border }]}>
                <Text style={[styles.segmentText, { color: active ? theme.colors.brand : theme.colors.text }]}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </Card>
      <Card>
        <SettingRow label="Product notifications" description="Demo reminders and status updates" value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        <SettingRow label="Biometric shortcut" description="UI preference only; no biometric authentication is performed" value={biometricShortcutEnabled} onValueChange={setBiometricShortcutEnabled} />
        <SettingRow label="Reduce motion" description="Prepared as an accessibility preference for future transitions" value={reduceMotion} onValueChange={setReduceMotion} />
      </Card>
      <Card>
        <Text style={[styles.heading, { color: theme.colors.text }]}>Privacy by design</Text>
        <Text style={[styles.description, { color: theme.colors.muted }]}>This portfolio app uses only deterministic fictional data and local UI preferences. It does not collect credentials, identity documents, financial accounts or analytics.</Text>
      </Card>
    </Screen>
  );
}

function SettingRow({ label, description, value, onValueChange }: { label: string; description: string; value: boolean; onValueChange: (value: boolean) => void }) {
  const theme = useAppTheme();
  return (
    <View style={styles.row}>
      <View style={styles.copy}>
        <Text style={[styles.heading, { color: theme.colors.text }]}>{label}</Text>
        <Text style={[styles.description, { color: theme.colors.muted }]}>{description}</Text>
      </View>
      <Switch accessibilityLabel={label} value={value} onValueChange={onValueChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { minHeight: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
  copy: { flex: 1, gap: 3 }, heading: { fontWeight: '800' }, description: { lineHeight: 19, fontSize: 13 }, segmented: { flexDirection: 'row', gap: 8 },
  segment: { flex: 1, minHeight: 42, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10 }, segmentText: { fontWeight: '800', textTransform: 'capitalize' }
});
