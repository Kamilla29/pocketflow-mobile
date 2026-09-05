import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './theme';
import { usePreferencesStore } from '@app/state/preferencesStore';

export function useAppTheme() {
  const systemScheme = useColorScheme();
  const appearance = usePreferencesStore((state) => state.appearance);

  const resolved =
    appearance === 'system'
      ? systemScheme === 'dark'
        ? 'dark'
        : 'light'
      : appearance;

  return resolved === 'dark' ? darkTheme : lightTheme;
}
