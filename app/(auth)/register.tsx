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
import { Mail, User, Key, ArrowLeft, Car, ChevronDown } from 'lucide-react-native';

type UserRole = 'ev_owner' | 'charging_provider' | 'both';

/**
 * Registration screen component
 */
export default function Register() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('both');
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Validate form
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
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
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle registration
  const handleRegister = () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the main app
      router.replace('/(tabs)');
    }, 1500);
  };
  
  // Role selection buttons
  const RoleButton = ({ role, title }: { role: UserRole; title: string }) => (
    <TouchableOpacity
      style={[
        styles.roleButton,
        {
          backgroundColor: userRole === role 
            ? colors.primary[isDark ? 800 : 50] 
            : isDark ? colors.grey[800] : colors.grey[100],
          borderColor: userRole === role 
            ? colors.primary[500] 
            : isDark ? colors.grey[700] : colors.grey[300],
        },
      ]}
      onPress={() => setUserRole(role)}
    >
      <Text
        weight={userRole === role ? 'semibold' : 'regular'}
        color={userRole === role ? colors.primary[500] : isDark ? colors.grey[400] : colors.grey[600]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
  
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
            Create Account
          </Text>
          <Text
            variant="body"
            color={isDark ? colors.grey[400] : colors.grey[600]}
            style={styles.subtitle}
          >
            Join the Energapp community
          </Text>
        </View>
        
        <View style={styles.formContainer}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={errors.name}
            leftIcon={<User size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />}
          />
          
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
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            leftIcon={<Key size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />}
          />
          
          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
            leftIcon={<Key size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />}
          />
          
          <Text
            variant="body"
            weight="medium"
            style={styles.roleLabel}
          >
            I want to:
          </Text>
          
          <View style={styles.roleContainer}>
            <RoleButton role="ev_owner" title="Find Charging" />
            <RoleButton role="charging_provider" title="Provide Charging" />
            <RoleButton role="both" title="Both" />
          </View>
          
          <Button
            title="Sign Up"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            onPress={handleRegister}
            style={styles.button}
          />
          
          <View style={styles.loginContainer}>
            <Text
              variant="body"
              color={isDark ? colors.grey[400] : colors.grey[600]}
            >
              Already have an account?
            </Text>
            <Link href="/auth/login" asChild>
              <TouchableOpacity style={styles.loginLink}>
                <Text
                  variant="body"
                  color={colors.primary[500]}
                  weight="medium"
                >
                  Sign In
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
  roleLabel: {
    marginBottom: spacing[2],
    marginTop: spacing[2],
  },
  roleContainer: {
    flexDirection: 'row',
    marginBottom: spacing[3],
  },
  roleButton: {
    flex: 1,
    paddingVertical: spacing[1.5],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[1],
    borderWidth: 1,
  },
  button: {
    marginTop: spacing[2],
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing[4],
  },
  loginLink: {
    marginLeft: spacing[1],
  },
});