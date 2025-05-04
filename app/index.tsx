import { useEffect } from 'react';
import { Redirect, useRootNavigationState } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useColorScheme } from '@/utils/useColorScheme';
import { colors } from '@/constants/colors';

/**
 * Entry point that redirects to the appropriate screen based on authentication status
 */
export default function Index() {
  const { colorScheme } = useColorScheme();
  const rootNavigationState = useRootNavigationState();

  // Wait for navigation to be ready before redirecting
  if (!rootNavigationState?.isReady) {
    return (
      <View style={[
        styles.container, 
        { backgroundColor: colorScheme === 'dark' ? colors.black : colors.white }
      ]}>
        <ActivityIndicator 
          size="large" 
          color={colorScheme === 'dark' ? colors.primary[400] : colors.primary[500]} 
        />
      </View>
    );
  }

  // For the MVP, start with the onboarding flow
  // In a real app, you would check for auth token here
  return <Redirect href="/onboarding" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});