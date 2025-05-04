import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';
import { Mail, ArrowLeft } from 'lucide-react-native';

/**
 * Forgot Password screen component
 */
export default function ForgotPassword() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Form state
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Validate form
  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    
    setError('');
    return true;
  };
  
  // Handle reset password
  const handleResetPassword = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View
        style={[
          styles.container,
          { backgroundColor: isDark ? colors.background.dark : colors.background.light }
        ]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={isDark ? colors.white : colors.black} />
          </TouchableOpacity>
          <Text variant="h2" weight="bold" style={styles.title}>
            Reset Password
          </Text>
          <Text
            variant="body"
            color={isDark ? colors.grey[400] : colors.grey[600]}
            style={styles.subtitle}
          >
            Enter your email address and we'll send you a link to reset your password
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          {isSuccess ? (
            <View style={styles.successContainer}>
              <View
                style={[
                  styles.successIcon,
                  { backgroundColor: colors.success[isDark ? 800 : 50] }
                ]}
              >
                <Mail size={32} color={colors.success[500]} />
              </View>
              <Text
                variant="h3"
                weight="semibold"
                align="center"
                style={styles.successTitle}
              >
                Check Your Email
              </Text>
              <Text
                variant="body"
                align="center"
                color={isDark ? colors.grey[400] : colors.grey[600]}
                style={styles.successText}
              >
                We've sent a password reset link to:
              </Text>
              <Text
                variant="body"
                weight="medium"
                align="center"
                style={styles.emailText}
              >
                {email}
              </Text>
              <Button
                title="Back to Login"
                variant="primary"
                size="lg"
                fullWidth
                onPress={() => router.replace('/auth/login')}
                style={styles.button}
              />
            </View>
          ) : (
            <>
              <Input
                label="Email"
                placeholder="your.email@example.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={error}
                leftIcon={<Mail size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />}
              />
              
              <Button
                title="Send Reset Link"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
                onPress={handleResetPassword}
                style={styles.button}
              />
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  button: {
    marginTop: spacing[2],
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: spacing[8],
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[4],
  },
  successTitle: {
    marginBottom: spacing[2],
  },
  successText: {
    marginBottom: spacing[1],
  },
  emailText: {
    marginBottom: spacing[6],
  },
});