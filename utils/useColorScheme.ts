import { useEffect, useState } from 'react';
import { useColorScheme as _useColorScheme } from 'react-native';

export type ColorScheme = 'light' | 'dark';

/**
 * Hook to get the current color scheme and configure app-wide theming
 */
export function useColorScheme() {
  const systemColorScheme = _useColorScheme() as ColorScheme | null;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(systemColorScheme || 'light');

  useEffect(() => {
    if (systemColorScheme) {
      setColorScheme(systemColorScheme);
    }
  }, [systemColorScheme]);

  return { 
    colorScheme,
    setColorScheme,
    isDark: colorScheme === 'dark',
  };
}