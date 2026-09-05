import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OverviewScreen } from '@app/screens/OverviewScreen';
import { ActivityScreen } from '@app/screens/ActivityScreen';
import { SettingsScreen } from '@app/screens/SettingsScreen';
import type { MainTabParamList } from './types';
import { useAppTheme } from '@app/theme/useAppTheme';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabs() {
  const theme = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        tabBarStyle: {
          borderTopColor: theme.colors.border,
          backgroundColor: theme.colors.surface
        },
        tabBarActiveTintColor: theme.colors.brand,
        tabBarInactiveTintColor: theme.colors.muted
      }}
    >
      <Tab.Screen name="Overview" component={OverviewScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
