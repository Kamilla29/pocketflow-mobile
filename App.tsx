import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from '@app/navigation/AppNavigator';
import { AppErrorBoundary } from '@app/components/AppErrorBoundary';
import { useAppTheme } from '@app/theme/useAppTheme';
import { usePreferencesStore } from '@app/state/preferencesStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1, refetchOnReconnect: true }
  }
});

const linking = {
  prefixes: ['pocketflow://'],
  config: {
    screens: {
      Main: {
        screens: {
          Overview: 'overview',
          Activity: 'activity',
          Settings: 'settings'
        }
      },
      PaymentSchedule: 'payments',
      ApplicationDetails: 'application',
      Checklist: 'checklist'
    }
  }
};

export default function App() {
  const theme = useAppTheme();
  const appearance = usePreferencesStore((state) => state.appearance);
  const isDark = theme.colors.background === '#0F141A';

  const navigationTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      primary: theme.colors.brand,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.warning
    }
  };

  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer linking={linking} theme={navigationTheme}>
          <StatusBar style={appearance === 'dark' ? 'light' : 'auto'} />
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}
