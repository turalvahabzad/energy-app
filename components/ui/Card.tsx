import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
}

/**
 * Card component for containing content with optional shadow and border
 */
export function Card({ 
  children, 
  style, 
  shadow = 'md',
  border = false 
}: CardProps) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Get shadow style based on shadow prop
  const shadowStyle = getShadowStyle(shadow, isDark);
  
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isDark ? colors.card.dark : colors.card.light },
        border && { 
          borderWidth: 1, 
          borderColor: isDark ? colors.grey[700] : colors.grey[200] 
        },
        shadowStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Shadow styles for different elevations
function getShadowStyle(shadow: 'none' | 'sm' | 'md' | 'lg', isDark: boolean): ViewStyle {
  if (shadow === 'none') return {};
  
  // Base shadow properties
  const baseStyle: ViewStyle = {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: isDark ? 0.2 : 0.1,
    shadowRadius: 0,
    elevation: 0,
  };
  
  // Adjust shadow based on size
  switch (shadow) {
    case 'sm':
      baseStyle.shadowOffset = { width: 0, height: 1 };
      baseStyle.shadowRadius = 2;
      baseStyle.elevation = 2;
      break;
    case 'md':
      baseStyle.shadowOffset = { width: 0, height: 2 };
      baseStyle.shadowRadius = 4;
      baseStyle.elevation = 4;
      break;
    case 'lg':
      baseStyle.shadowOffset = { width: 0, height: 4 };
      baseStyle.shadowRadius = 8;
      baseStyle.elevation = 8;
      break;
  }
  
  return baseStyle;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: spacing[2],
  },
});