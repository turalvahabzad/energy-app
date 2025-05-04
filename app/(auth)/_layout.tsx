import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/utils/useColorScheme';
import { colors } from '@/constants/colors';

/**
 * Layout for authentication screens
 */
export default function AuthLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: isDark ? colors.background.dark : colors.background.light,
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}