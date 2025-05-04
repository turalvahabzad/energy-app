import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';
import { Text } from '@/components/ui/Text';
import { MapPin, Bolt, MessageSquare, Settings, User } from 'lucide-react-native';

/**
 * Tab navigation layout
 */
export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Custom tab bar icon
  const TabBarIcon = ({ name, color }: { name: string; color: string }) => {
    switch (name) {
      case 'index':
        return <MapPin size={24} color={color} />;
      case 'charging':
        return <Bolt size={24} color={color} />;
      case 'messages':
        return <MessageSquare size={24} color={color} />;
      case 'profile':
        return <User size={24} color={color} />;
      default:
        return null;
    }
  };
  
  // Custom tab bar label
  const TabBarLabel = ({ name, color }: { name: string; color: string }) => {
    let label = '';
    
    switch (name) {
      case 'index':
        label = 'Map';
        break;
      case 'charging':
        label = 'Charging';
        break;
      case 'messages':
        label = 'Messages';
        break;
      case 'profile':
        label = 'Profile';
        break;
    }
    
    return (
      <Text
        variant="caption"
        style={{ color, marginTop: 2 }}
      >
        {label}
      </Text>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? colors.card.dark : colors.card.light,
          borderTopWidth: 1,
          borderTopColor: isDark ? colors.grey[800] : colors.grey[200],
          paddingBottom: 8,
          paddingTop: 12,
          height: 64,
        },
        tabBarActiveTintColor: colors.primary[500],
        tabBarInactiveTintColor: isDark ? colors.grey[500] : colors.grey[600],
        tabBarShowLabel: true,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <TabBarIcon name="index" color={color} />,
          tabBarLabel: ({ color }) => <TabBarLabel name="index" color={color} />,
        }}
      />
      <Tabs.Screen
        name="charging"
        options={{
          title: 'Charging',
          tabBarIcon: ({ color }) => <TabBarIcon name="charging" color={color} />,
          tabBarLabel: ({ color }) => <TabBarLabel name="charging" color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <TabBarIcon name="messages" color={color} />,
          tabBarLabel: ({ color }) => <TabBarLabel name="messages" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="profile" color={color} />,
          tabBarLabel: ({ color }) => <TabBarLabel name="profile" color={color} />,
        }}
      />
    </Tabs>
  );
}