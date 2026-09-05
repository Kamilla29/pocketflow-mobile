import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '@app/theme/useAppTheme';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ eyebrow, title, description }: Props) {
  const theme = useAppTheme();

  return (
    <View style={{ gap: theme.spacing.xs }}>
      {eyebrow ? <Text style={[styles.eyebrow, { color: theme.colors.brand }]}>{eyebrow}</Text> : null}
      <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </Text>
      {description ? (
        <Text style={[styles.description, { color: theme.colors.muted }]}>{description}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  eyebrow: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800' },
  description: { fontSize: 15, lineHeight: 22 }
});
