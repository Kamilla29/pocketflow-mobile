import type { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';
import { useAppTheme } from '@app/theme/useAppTheme';

export function Card({ children, style, ...props }: PropsWithChildren<ViewProps>) {
  const theme = useAppTheme();

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.md,
          padding: theme.spacing.md,
          gap: theme.spacing.sm
        },
        style
      ]}
    >
      {children}
    </View>
  );
}
