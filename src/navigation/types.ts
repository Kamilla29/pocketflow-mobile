import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Overview: undefined;
  Activity: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  PaymentSchedule: undefined;
  ApplicationDetails: undefined;
  Checklist: undefined;
};
