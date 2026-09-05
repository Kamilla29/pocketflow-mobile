import type { PropsWithChildren } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { useAppTheme } from '@app/theme/useAppTheme';

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}>;

export function Screen({ children, scroll = true, refreshing = false, onRefresh }: ScreenProps) {
  const theme = useAppTheme();
  const contentStyle = { padding: theme.spacing.md, gap: theme.spacing.md };

  const body = scroll ? (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
      contentContainerStyle={contentStyle}
      refreshControl={
        onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> : undefined
      }
    >
      {children}
    </ScrollView>
  ) : (
    <View style={contentStyle}>{children}</View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {body}
    </SafeAreaView>
  );
}
