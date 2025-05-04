import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

/**
 * Text input component with support for labels, icons, and error messages
 */
export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  containerStyle,
  secureTextEntry,
  ...props
}: InputProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  // Determine text color based on theme
  const textColor = isDark ? colors.white : colors.black;
  const placeholderColor = isDark ? colors.grey[500] : colors.grey[400];
  
  // Determine border color based on state
  const getBorderColor = () => {
    if (error) return colors.error[500];
    if (isFocused) return colors.primary[500];
    return isDark ? colors.grey[700] : colors.grey[300];
  };

  // Determine background color based on theme and state
  const getBackgroundColor = () => {
    if (isDark) return colors.grey[800];
    return isFocused ? colors.grey[50] : colors.white;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: textColor }]}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
        ]}
      >
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        
        <TextInput
          style={[
            styles.input,
            { color: textColor },
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
          ]}
          placeholderTextColor={placeholderColor}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />
            ) : (
              <Eye size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />
            )}
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing[2],
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: spacing[1],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing[2],
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  inputWithLeftIcon: {
    paddingLeft: spacing[1],
  },
  inputWithRightIcon: {
    paddingRight: spacing[1],
  },
  leftIcon: {
    paddingLeft: spacing[2],
  },
  rightIcon: {
    paddingRight: spacing[2],
  },
  error: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.error[500],
    marginTop: spacing[0.5],
  },
});