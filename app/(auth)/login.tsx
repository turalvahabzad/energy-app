import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';
import { Mail, Key, ArrowLeft } from 'lucide-react-native';

/**
 * Login screen component
 */
export default function Login() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Validate form
  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle login
  const handleLogin = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to main app
      router.replace('/(tabs)');
    }, 1500);
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: isDark ? colors.background.dark : colors.background.light }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={isDark ? colors.white : colors.black} />
          </TouchableOpacity>
          <Text variant="h2" weight="bold" style={styles.title}>
            Welcome Back
          </Text>
          <Text
            variant="body"
            color={isDark ? colors.grey[400] : colors.grey[600]}
            style={styles.subtitle}
          >
            Sign in to continue to Energapp
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="your.email@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
            leftIcon={<Mail size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />}
          />
          
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            leftIcon={<Key size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />}
          />
          
          <Link href="/auth/forgot-password" asChild>
            <TouchableOpacity style={styles.forgotPassword}>
              <Text
                variant="body-sm"
                color={colors.primary[500]}
                weight="medium"
              >
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </Link>
          
          <Button
            title="Sign In"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleLogin}
            style={styles.button}
          />
          
          <View style={styles.registerContainer}>
            <Text
              variant="body"
              color={isDark ? colors.grey[400] : colors.grey[600]}
            >
              Don't have an account?
            </Text>
            <Link href="/auth/register" asChild>
              <TouchableOpacity style={styles.registerLink}>
                <Text
                  variant="body"
                  color={colors.primary[500]}
                  weight="medium"
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: spacing[2],
  },
  header: {
    marginTop: spacing[4],
    marginBottom: spacing[4],
  },
  backButton: {
    marginBottom: spacing[2],
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing[1],
  },
  subtitle: {
    marginBottom: spacing[4],
  },
  formContainer: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing[3],
  },
  button: {
    marginTop: spacing[2],
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[4],
  },
  registerLink: {
    marginLeft: spacing[1],
  },
});