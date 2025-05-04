import React from 'react';
import { View, StyleSheet, Image, useWindowDimensions, Animated } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { Battery, Zap, Handshake, MapPin } from 'lucide-react-native';
import { useRef } from 'react';
import { useColorScheme } from '@/utils/useColorScheme';

// Onboarding feature data
const features = [
  {
    title: 'Connect with Other EV Owners',
    description: 'Join a community of EV enthusiasts helping each other with vehicle-to-vehicle charging.',
    icon: (color: string) => <Handshake size={48} color={color} />,
  },
  {
    title: 'Find Charging Help Nearby',
    description: 'Easily locate other EV owners nearby who can provide charging support when you need it.',
    icon: (color: string) => <MapPin size={48} color={color} />,
  },
  {
    title: 'Share & Receive Energy',
    description: 'Request charging or offer help to other EV owners with Vehicle-to-Vehicle technology.',
    icon: (color: string) => <Battery size={48} color={color} />,
  },
  {
    title: 'Safe & Secure Payments',
    description: 'Pay only for the energy you receive with our secure, transparent payment system.',
    icon: (color: string) => <Zap size={48} color={color} />,
  },
];

/**
 * Onboarding screen component
 */
export default function Onboarding() {
  const { width } = useWindowDimensions();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const logoTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });
  
  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? colors.background.dark : colors.background.light }
    ]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={[styles.logoContainer, { transform: [{ translateY: logoTranslateY }] }]}>
          <View style={styles.logoBackground}>
            <Zap size={48} color={colors.white} />
          </View>
          <Text variant="h2" weight="bold" align="center" style={styles.appName}>
            Energ<Text variant="h2" weight="bold" color={colors.primary[500]}>app</Text>
          </Text>
          <Text variant="body" align="center" color={isDark ? colors.grey[400] : colors.grey[600]}>
            Connect, Charge, Continue
          </Text>
        </Animated.View>
        
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary[isDark ? 800 : 50] }]}>
                {feature.icon(colors.primary[500])}
              </View>
              <View style={styles.featureTextContainer}>
                <Text variant="h4" weight="semibold" style={styles.featureTitle}>
                  {feature.title}
                </Text>
                <Text
                  variant="body"
                  color={isDark ? colors.grey[400] : colors.grey[600]}
                  style={styles.featureDescription}
                >
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Add some spacer at the bottom for the fixed buttons */}
        <View style={{ height: 150 }} />
      </Animated.ScrollView>
      
      <View style={styles.buttonContainer}>
        <Link href="/auth/register" asChild>
          <Button
            title="Create Account"
            variant="primary"
            size="lg"
            fullWidth
            style={styles.button}
          />
        </Link>
        
        <Link href="/auth/login" asChild>
          <Button
            title="I Already Have an Account"
            variant="outline"
            size="lg"
            fullWidth
            style={styles.button}
          />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing[2],
    paddingTop: spacing[8],
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: spacing[6],
  },
  logoBackground: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[2],
  },
  appName: {
    marginBottom: spacing[1],
  },
  featuresContainer: {
    width: '100%',
    marginTop: spacing[4],
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: spacing[4],
    width: '100%',
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[2],
  },
  featureTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    marginBottom: spacing[1],
  },
  featureDescription: {
    opacity: 0.8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing[2],
    paddingBottom: spacing[4],
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  button: {
    marginBottom: spacing[2],
  },
});