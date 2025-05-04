import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Button component with various styles and states
 */
export function Button({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Get styles based on variant, size and color scheme
  const buttonStyle = getButtonStyle(variant, size, isDark);
  const labelStyle = getLabelStyle(variant, size, isDark);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={loading || props.disabled}
      style={[
        styles.button,
        buttonStyle,
        fullWidth && styles.fullWidth,
        props.disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? 'white' : colors.primary[500]} 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[styles.label, labelStyle, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

// Style functions that return the appropriate styles based on props
function getButtonStyle(variant: ButtonVariant, size: ButtonSize, isDark: boolean): ViewStyle {
  const baseStyle: ViewStyle = {};
  
  // Variant styles
  switch (variant) {
    case 'primary':
      baseStyle.backgroundColor = colors.primary[500];
      break;
    case 'secondary':
      baseStyle.backgroundColor = colors.secondary[500];
      break;
    case 'outline':
      baseStyle.backgroundColor = 'transparent';
      baseStyle.borderWidth = 1;
      baseStyle.borderColor = isDark ? colors.grey[400] : colors.grey[300];
      break;
    case 'ghost':
      baseStyle.backgroundColor = 'transparent';
      break;
    case 'danger':
      baseStyle.backgroundColor = colors.error[500];
      break;
  }
  
  // Size styles
  switch (size) {
    case 'sm':
      baseStyle.paddingVertical = spacing[1];
      baseStyle.paddingHorizontal = spacing[2];
      baseStyle.borderRadius = 6;
      break;
    case 'md':
      baseStyle.paddingVertical = spacing[1.5];
      baseStyle.paddingHorizontal = spacing[3];
      baseStyle.borderRadius = 8;
      break;
    case 'lg':
      baseStyle.paddingVertical = spacing[2];
      baseStyle.paddingHorizontal = spacing[4];
      baseStyle.borderRadius = 10;
      break;
  }
  
  return baseStyle;
}

function getLabelStyle(variant: ButtonVariant, size: ButtonSize, isDark: boolean): TextStyle {
  const baseStyle: TextStyle = {};
  
  // Variant styles
  switch (variant) {
    case 'primary':
    case 'secondary':
    case 'danger':
      baseStyle.color = colors.white;
      break;
    case 'outline':
    case 'ghost':
      baseStyle.color = isDark ? colors.white : colors.grey[800];
      break;
  }
  
  // Size styles
  switch (size) {
    case 'sm':
      baseStyle.fontSize = 14;
      break;
    case 'md':
      baseStyle.fontSize = 16;
      break;
    case 'lg':
      baseStyle.fontSize = 18;
      break;
  }
  
  return baseStyle;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
});