import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useColorScheme } from '@/utils/useColorScheme';
import { colors } from '@/constants/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

/**
 * Root layout component that sets up the app with necessary providers and fonts
 */
export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  useFrameworkReady();

  // Load the Inter font family
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  // Show loading screen while fonts are loading
  if (!fontsLoaded && !fontError) {
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});