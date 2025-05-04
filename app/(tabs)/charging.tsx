import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';
import { Bolt, Clock, ChevronRight, Battery, AlertCircle, CheckCircle2 } from 'lucide-react-native';

// Mock charging sessions data
const ACTIVE_SESSIONS = [
  {
    id: '1',
    provider: 'Tesla Model 3',
    owner: 'Alex Thompson',
    timeElapsed: '15 mins',
    energyTransferred: '5.2 kWh',
    cost: '$1.30',
    battery: 62,
    status: 'in-progress',
  },
];

const PENDING_REQUESTS = [
  {
    id: '2',
    provider: 'Nissan Leaf',
    owner: 'Maria Garcia',
    distance: '1.2 mi',
    rate: '$0.22/kWh',
    battery: 25,
    status: 'pending',
  },
];

const PAST_SESSIONS = [
  {
    id: '3',
    provider: 'Kia EV6',
    owner: 'James Wilson',
    date: 'Yesterday',
    energyTransferred: '12.8 kWh',
    cost: '$3.58',
    battery: 85,
    status: 'completed',
  },
  {
    id: '4',
    provider: 'Ford Mustang Mach-E',
    owner: 'Sarah Johnson',
    date: '2 days ago',
    energyTransferred: '9.5 kWh',
    cost: '$1.90',
    battery: 78,
    status: 'completed',
  },
];

/**
 * Charging screen component to manage charging sessions
 */
export default function ChargingScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Get background color based on theme
  const backgroundColor = isDark ? colors.background.dark : colors.background.light;
  
  // Status indicator component
  const StatusIndicator = ({ status }: { status: string }) => {
    let color;
    let icon;
    let text;
    
    switch (status) {
      case 'in-progress':
        color = colors.primary[500];
        icon = <Bolt size={16} color={color} />;
        text = 'In Progress';
        break;
      case 'pending':
        color = colors.warning[500];
        icon = <Clock size={16} color={color} />;
        text = 'Pending';
        break;
      case 'completed':
        color = colors.success[500];
        icon = <CheckCircle2 size={16} color={color} />;
        text = 'Completed';
        break;
      default:
        color = colors.error[500];
        icon = <AlertCircle size={16} color={color} />;
        text = 'Error';
    }
    
    return (
      <View style={[styles.statusContainer, { backgroundColor: `${color}20` }]}>
        {icon}
        <Text variant="caption" color={color} weight="medium" style={styles.statusText}>
          {text}
        </Text>
      </View>
    );
  };
  
  // Battery indicator component
  const BatteryIndicator = ({ level }: { level: number }) => {
    let color;
    
    if (level >= 70) {
      color = colors.success[500];
    } else if (level >= 30) {
      color = colors.warning[500];
    } else {
      color = colors.error[500];
    }
    
    return (
      <View style={styles.batteryContainer}>
        <Battery size={16} color={color} />
        <Text variant="caption" color={color} weight="medium" style={styles.batteryText}>
          {level}%
        </Text>
      </View>
    );
  };
  
  // Session card component
  const SessionCard = ({
    session,
    isPending = false,
  }: {
    session: typeof ACTIVE_SESSIONS[0] | typeof PENDING_REQUESTS[0] | typeof PAST_SESSIONS[0];
    isPending?: boolean;
  }) => {
    return (
      <Card style={styles.sessionCard}>
        <View style={styles.sessionCardHeader}>
          <View>
            <Text variant="body" weight="semibold">
              {session.provider}
            </Text>
            <Text variant="caption" color={isDark ? colors.grey[400] : colors.grey[600]}>
              {session.owner}
            </Text>
          </View>
          <StatusIndicator status={session.status} />
        </View>
        
        <View style={styles.sessionCardBody}>
          <View style={styles.sessionInfoColumn}>
            {('timeElapsed' in session) && (
              <Text variant="caption" color={isDark ? colors.grey[400] : colors.grey[600]}>
                Time: {session.timeElapsed}
              </Text>
            )}
            {('date' in session) && (
              <Text variant="caption" color={isDark ? colors.grey[400] : colors.grey[600]}>
                Date: {session.date}
              </Text>
            )}
            {('distance' in session) && (
              <Text variant="caption" color={isDark ? colors.grey[400] : colors.grey[600]}>
                Distance: {session.distance}
              </Text>
            )}
            {('energyTransferred' in session) && (
              <Text variant="caption" color={isDark ? colors.grey[400] : colors.grey[600]}>
                Energy: {session.energyTransferred}
              </Text>
            )}
          </View>
          
          <View style={styles.sessionInfoColumn}>
            {('cost' in session) && (
              <Text variant="caption" color={isDark ? colors.grey[400] : colors.grey[600]}>
                Cost: {session.cost}
              </Text>
            )}
            {('rate' in session) && (
              <Text variant="caption" color={isDark ? colors.grey[400] : colors.grey[600]}>
                Rate: {session.rate}
              </Text>
            )}
            <BatteryIndicator level={session.battery} />
          </View>
          
          <TouchableOpacity style={styles.detailsButton}>
            <ChevronRight size={20} color={isDark ? colors.grey[400] : colors.grey[600]} />
          </TouchableOpacity>
        </View>
        
        {isPending && (
          <View style={styles.pendingActions}>
            <Button
              title="Accept"
              variant="primary"
              size="sm"
              style={{ flex: 1, marginRight: spacing[1] }}
            />
            <Button
              title="Decline"
              variant="outline"
              size="sm"
              style={{ flex: 1 }}
            />
          </View>
        )}
      </Card>
    );
  };
  
  // Empty state component
  const EmptyState = ({ title, message }: { title: string; message: string }) => (
    <View style={styles.emptyState}>
      <Bolt size={48} color={isDark ? colors.grey[700] : colors.grey[300]} />
      <Text variant="h4" weight="semibold" style={styles.emptyStateTitle}>
        {title}
      </Text>
      <Text
        variant="body-sm"
        align="center"
        color={isDark ? colors.grey[500] : colors.grey[600]}
        style={styles.emptyStateMessage}
      >
        {message}
      </Text>
    </View>
  );
  
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text variant="h2" weight="bold">
          Charging
        </Text>
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Active Sessions Section */}
        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Active Sessions
          </Text>
          
          {ACTIVE_SESSIONS.length > 0 ? (
            ACTIVE_SESSIONS.map(session => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <EmptyState
              title="No Active Sessions"
              message="You don't have any charging sessions currently in progress."
            />
          )}
        </View>
        
        {/* Pending Requests Section */}
        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Pending Requests
          </Text>
          
          {PENDING_REQUESTS.length > 0 ? (
            PENDING_REQUESTS.map(session => (
              <SessionCard key={session.id} session={session} isPending={true} />
            ))
          ) : (
            <EmptyState
              title="No Pending Requests"
              message="You don't have any pending charging requests."
            />
          )}
        </View>
        
        {/* Past Sessions Section */}
        <View style={styles.section}>
          <Text variant="h4" weight="semibold" style={styles.sectionTitle}>
            Past Sessions
          </Text>
          
          {PAST_SESSIONS.length > 0 ? (
            PAST_SESSIONS.map(session => (
              <SessionCard key={session.id} session={session} />
            ))
          ) : (
            <EmptyState
              title="No Past Sessions"
              message="You haven't completed any charging sessions yet."
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing[2],
    paddingBottom: spacing[2],
  },
  scrollContent: {
    padding: spacing[2],
    paddingTop: 0,
  },
  section: {
    marginBottom: spacing[4],
  },
  sectionTitle: {
    marginBottom: spacing[2],
  },
  sessionCard: {
    marginBottom: spacing[2],
  },
  sessionCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[1.5],
  },
  sessionCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionInfoColumn: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[1],
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    marginLeft: 4,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  batteryText: {
    marginLeft: 4,
  },
  detailsButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pendingActions: {
    flexDirection: 'row',
    marginTop: spacing[2],
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[4],
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
  },
  emptyStateTitle: {
    marginTop: spacing[2],
    marginBottom: spacing[1],
  },
  emptyStateMessage: {
    maxWidth: '80%',
  },
});