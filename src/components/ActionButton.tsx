import { Pressable, StyleSheet, Text } from 'react-native';
import { useAppTheme } from '@app/theme/useAppTheme';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

export function ActionButton({ label, onPress, variant = 'primary' }: Props) {
  const theme = useAppTheme();
  const primary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          borderRadius: theme.radius.sm,
          paddingHorizontal: theme.spacing.md,
          backgroundColor: primary ? theme.colors.brand : theme.colors.surface,
          borderColor: theme.colors.border,
          borderWidth: primary ? 0 : 1
        },
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.text, { color: primary ? '#FFFFFF' : theme.colors.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 48, justifyContent: 'center', alignItems: 'center' },
  pressed: { opacity: 0.82 },
  text: { fontWeight: '800' }
});
