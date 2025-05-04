import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from 'react-native';
import { colors } from '@/constants/colors';
import { fonts } from '@/constants/fonts';
import { useColorScheme } from '@/utils/useColorScheme';

type TextVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' 
  | 'body' | 'body-sm' | 'body-lg' 
  | 'caption' | 'label' | 'button';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: TextStyle;
}

/**
 * Text component with consistent styling across the app
 */
export function Text({
  variant = 'body',
  weight = 'regular',
  color,
  align = 'left',
  style,
  children,
  ...props
}: TextProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Get font family based on weight
  const fontFamily = getFontFamily(weight);
  
  // Get text color, with default based on theme
  const textColor = color || (isDark ? colors.white : colors.black);
  
  // Get variant style
  const variantStyle = getVariantStyle(variant);
  
  return (
    <RNText
      style={[
        variantStyle,
        { 
          fontFamily, 
          color: textColor,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Get font family based on weight
function getFontFamily(weight: TextProps['weight']): string {
  switch (weight) {
    case 'regular':
      return 'Inter-Regular';
    case 'medium':
      return 'Inter-Medium';
    case 'semibold':
      return 'Inter-SemiBold';
    case 'bold':
      return 'Inter-Bold';
    default:
      return 'Inter-Regular';
  }
}

// Get text style based on variant
function getVariantStyle(variant: TextVariant): TextStyle {
  switch (variant) {
    case 'h1':
      return {
        fontSize: fonts.sizes['4xl'],
        lineHeight: fonts.lineHeights['4xl'],
      };
    case 'h2':
      return {
        fontSize: fonts.sizes['3xl'],
        lineHeight: fonts.lineHeights['3xl'],
      };
    case 'h3':
      return {
        fontSize: fonts.sizes['2xl'],
        lineHeight: fonts.lineHeights['2xl'],
      };
    case 'h4':
      return {
        fontSize: fonts.sizes.xl,
        lineHeight: fonts.lineHeights.xl,
      };
    case 'h5':
      return {
        fontSize: fonts.sizes.lg,
        lineHeight: fonts.lineHeights.lg,
      };
    case 'body':
      return {
        fontSize: fonts.sizes.md,
        lineHeight: fonts.lineHeights.md,
      };
    case 'body-sm':
      return {
        fontSize: fonts.sizes.sm,
        lineHeight: fonts.lineHeights.sm,
      };
    case 'body-lg':
      return {
        fontSize: fonts.sizes.lg,
        lineHeight: fonts.lineHeights.lg,
      };
    case 'caption':
      return {
        fontSize: fonts.sizes.xs,
        lineHeight: fonts.lineHeights.xs,
      };
    case 'label':
      return {
        fontSize: fonts.sizes.sm,
        lineHeight: fonts.lineHeights.sm,
      };
    case 'button':
      return {
        fontSize: fonts.sizes.md,
        lineHeight: fonts.lineHeights.md,
      };
    default:
      return {
        fontSize: fonts.sizes.md,
        lineHeight: fonts.lineHeights.md,
      };
  }
}