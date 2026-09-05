import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AppearancePreference = 'system' | 'light' | 'dark';

type PreferencesState = {
  notificationsEnabled: boolean;
  biometricShortcutEnabled: boolean;
  reduceMotion: boolean;
  appearance: AppearancePreference;
  setNotificationsEnabled: (value: boolean) => void;
  setBiometricShortcutEnabled: (value: boolean) => void;
  setReduceMotion: (value: boolean) => void;
  setAppearance: (value: AppearancePreference) => void;
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      notificationsEnabled: true,
      biometricShortcutEnabled: false,
      reduceMotion: false,
      appearance: 'system',
      setNotificationsEnabled: (value) => set({ notificationsEnabled: value }),
      setBiometricShortcutEnabled: (value) => set({ biometricShortcutEnabled: value }),
      setReduceMotion: (value) => set({ reduceMotion: value }),
      setAppearance: (value) => set({ appearance: value })
    }),
    {
      name: 'pocketflow-preferences',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
