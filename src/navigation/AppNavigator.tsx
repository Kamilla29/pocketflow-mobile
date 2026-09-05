import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabs } from './MainTabs';
import { PaymentScheduleScreen } from '@app/screens/PaymentScheduleScreen';
import { ApplicationDetailsScreen } from '@app/screens/ApplicationDetailsScreen';
import { ChecklistScreen } from '@app/screens/ChecklistScreen';
import type { RootStackParamList } from './types';
import { useAppTheme } from '@app/theme/useAppTheme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const theme = useAppTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { color: theme.colors.text }
      }}
    >
      <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="PaymentSchedule" component={PaymentScheduleScreen} options={{ title: 'Payment schedule' }} />
      <Stack.Screen name="ApplicationDetails" component={ApplicationDetailsScreen} options={{ title: 'Application details' }} />
      <Stack.Screen name="Checklist" component={ChecklistScreen} options={{ title: 'Checklist' }} />
    </Stack.Navigator>
  );
}
