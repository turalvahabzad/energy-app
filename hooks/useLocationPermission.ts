import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

/**
 * Hook to manage location permissions
 */
export function useLocationPermission() {
  const [hasPermission, setHasPermission] = useState(false);

  const checkPermission = async () => {
    if (Platform.OS === 'web') {
      // Web platform handling
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        setHasPermission(result.state === 'granted');
        
        // Listen for changes in permission state
        result.addEventListener('change', () => {
          setHasPermission(result.state === 'granted');
        });
      } catch (error) {
        console.error('Error checking geolocation permission:', error);
        setHasPermission(false);
      }
    } else {
      // Native platforms
      const { status } = await Location.getForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    }
  };

  const requestPermission = async () => {
    if (Platform.OS === 'web') {
      // For web, this will trigger the browser's permission prompt
      try {
        await navigator.geolocation.getCurrentPosition(() => {
          checkPermission();
        });
      } catch (error) {
        console.error('Error requesting geolocation permission:', error);
        setHasPermission(false);
      }
    } else {
      // Native platforms
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return { hasPermission, requestPermission };
}