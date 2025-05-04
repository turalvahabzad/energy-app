import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useColorScheme } from '@/utils/useColorScheme';
import { Search, MapPin, Battery, Zap, X, ChevronUp, ChevronDown } from 'lucide-react-native';
import { Input } from '@/components/ui/Input';
import { useLocationPermission } from '@/hooks/useLocationPermission';
import { Platform } from 'react-native';

// Mock data for charging stations
const CHARGING_STATIONS = [
  {
    id: '1',
    name: 'Tesla Model 3',
    owner: 'Alex Thompson',
    location: { latitude: 37.786694, longitude: -122.410464 },
    distance: '0.8 mi',
    batteryLevel: 78,
    chargingRate: '11 kW',
    price: '$0.25/kWh',
    rating: 4.8,
    numRatings: 56,
    available: true,
  },
  {
    id: '2',
    name: 'Nissan Leaf',
    owner: 'Maria Garcia',
    location: { latitude: 37.783238, longitude: -122.405897 },
    distance: '1.2 mi',
    batteryLevel: 65,
    chargingRate: '7 kW',
    price: '$0.22/kWh',
    rating: 4.6,
    numRatings: 32,
    available: true,
  },
  {
    id: '3',
    name: 'Kia EV6',
    owner: 'James Wilson',
    location: { latitude: 37.789976, longitude: -122.402865 },
    distance: '1.5 mi',
    batteryLevel: 92,
    chargingRate: '15 kW',
    price: '$0.28/kWh',
    rating: 4.9,
    numRatings: 41,
    available: true,
  },
  {
    id: '4',
    name: 'Ford Mustang Mach-E',
    owner: 'Sarah Johnson',
    location: { latitude: 37.788965, longitude: -122.407984 },
    distance: '0.9 mi',
    batteryLevel: 45,
    chargingRate: '9 kW',
    price: '$0.20/kWh',
    rating: 4.7,
    numRatings: 23,
    available: false,
  },
];

// Initial map region (San Francisco)
const initialRegion: Region = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

/**
 * Map screen component showing nearby charging stations
 */
export default function MapScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const mapRef = useRef<MapView>(null);
  const { hasPermission, requestPermission } = useLocationPermission();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStation, setSelectedStation] = useState<typeof CHARGING_STATIONS[0] | null>(null);
  const [isCardExpanded, setIsCardExpanded] = useState(false);
  
  // Animations
  const cardHeight = useRef(new Animated.Value(0)).current;
  
  // Toggle card expansion
  const toggleCardExpansion = () => {
    setIsCardExpanded(!isCardExpanded);
    Animated.spring(cardHeight, {
      toValue: isCardExpanded ? 0 : 1,
      useNativeDriver: false,
      friction: 8,
    }).start();
  };
  
  // Card height interpolation
  const cardHeightInterpolated = cardHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [140, 300],
  });
  
  // Handle marker press
  const handleMarkerPress = (station: typeof CHARGING_STATIONS[0]) => {
    setSelectedStation(station);
    
    // Center map on selected station
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: station.location.latitude,
        longitude: station.location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };
  
  // Close selected station card
  const closeSelectedStation = () => {
    setSelectedStation(null);
    setIsCardExpanded(false);
  };
  
  // Request charging from selected station
  const requestCharging = () => {
    // In a real app, this would initiate a charging request
    console.log('Requesting charging from station:', selectedStation?.id);
    
    // Navigate to charging screen
    router.push('/charging');
  };
  
  // Map style for dark mode
  const mapStyle = isDark ? [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#242f3e" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#746855" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#242f3e" }]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#d59563" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#d59563" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{ "color": "#263c3f" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#6b9a76" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{ "color": "#38414e" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#212a37" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#9ca5b3" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{ "color": "#746855" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{ "color": "#1f2835" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#f3d19c" }]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{ "color": "#2f3948" }]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#d59563" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#17263c" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#515c6d" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#17263c" }]
    }
  ] : [];
  
  return (
    <View style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={hasPermission}
        showsMyLocationButton={false}
        showsCompass={true}
        customMapStyle={mapStyle}
      >
        {/* Charging Station Markers */}
        {CHARGING_STATIONS.map((station) => (
          <Marker
            key={station.id}
            coordinate={station.location}
            onPress={() => handleMarkerPress(station)}
          >
            <View style={[
              styles.markerContainer,
              { backgroundColor: station.available ? colors.primary[500] : colors.grey[500] }
            ]}>
              <Zap size={16} color={colors.white} />
            </View>
          </Marker>
        ))}
      </MapView>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Input
          placeholder="Search for charging stations"
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchBar}
          leftIcon={<Search size={20} color={isDark ? colors.grey[400] : colors.grey[500]} />}
        />
      </View>
      
      {/* Location Permission Request */}
      {!hasPermission && (
        <View style={styles.permissionContainer}>
          <Card style={styles.permissionCard}>
            <Text weight="semibold" style={styles.permissionTitle}>
              Enable Location Services
            </Text>
            <Text variant="body-sm" style={styles.permissionText}>
              We need your location to show nearby charging stations
            </Text>
            <Button
              title="Enable Location"
              onPress={requestPermission}
              size="sm"
              style={styles.permissionButton}
            />
          </Card>
        </View>
      )}
      
      {/* Selected Station Card */}
      {selectedStation && (
        <Animated.View
          style={[
            styles.stationCardContainer,
            { height: cardHeightInterpolated }
          ]}
        >
          <Card style={styles.stationCard}>
            <View style={styles.stationCardHeader}>
              <View>
                <Text variant="h4" weight="semibold" numberOfLines={1} style={styles.stationName}>
                  {selectedStation.name}
                </Text>
                <Text variant="body-sm" color={isDark ? colors.grey[400] : colors.grey[600]}>
                  Owner: {selectedStation.owner} • {selectedStation.distance}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeSelectedStation}
              >
                <X size={18} color={isDark ? colors.grey[400] : colors.grey[600]} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.stationCardContent}>
              <View style={styles.stationInfoRow}>
                <View style={styles.stationInfoItem}>
                  <Battery size={18} color={colors.primary[500]} style={styles.infoIcon} />
                  <Text variant="body-sm">
                    Battery: <Text weight="medium">{selectedStation.batteryLevel}%</Text>
                  </Text>
                </View>
                <View style={styles.stationInfoItem}>
                  <Zap size={18} color={colors.primary[500]} style={styles.infoIcon} />
                  <Text variant="body-sm">
                    Charging: <Text weight="medium">{selectedStation.chargingRate}</Text>
                  </Text>
                </View>
                <View style={styles.stationInfoItem}>
                  <MapPin size={18} color={colors.primary[500]} style={styles.infoIcon} />
                  <Text variant="body-sm">
                    Distance: <Text weight="medium">{selectedStation.distance}</Text>
                  </Text>
                </View>
              </View>
              
              {isCardExpanded && (
                <View style={styles.expandedContent}>
                  <View style={styles.divider} />
                  <View style={styles.pricingContainer}>
                    <Text variant="body-sm" weight="medium">
                      Pricing
                    </Text>
                    <Text variant="h4" weight="semibold" color={colors.primary[500]}>
                      {selectedStation.price}
                    </Text>
                  </View>
                  <View style={styles.divider} />
                  <View style={styles.ratingContainer}>
                    <Text variant="body-sm" weight="medium">
                      Rating
                    </Text>
                    <View style={styles.starsContainer}>
                      <Text variant="body" weight="semibold">
                        {selectedStation.rating}
                      </Text>
                      <Text variant="body-sm" color={isDark ? colors.grey[400] : colors.grey[600]}>
                        ({selectedStation.numRatings} reviews)
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
            
            <View style={styles.stationCardActions}>
              <TouchableOpacity
                style={styles.expandButton}
                onPress={toggleCardExpansion}
              >
                {isCardExpanded ? (
                  <ChevronDown size={20} color={isDark ? colors.grey[400] : colors.grey[600]} />
                ) : (
                  <ChevronUp size={20} color={isDark ? colors.grey[400] : colors.grey[600]} />
                )}
              </TouchableOpacity>
              <Button
                title="Request Charging"
                variant="primary"
                onPress={requestCharging}
                disabled={!selectedStation.available}
                style={styles.requestButton}
              />
            </View>
          </Card>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
  },
  searchBar: {
    marginBottom: 0,
  },
  markerContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  permissionContainer: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
  },
  permissionCard: {
    padding: spacing[2],
  },
  permissionTitle: {
    marginBottom: spacing[1],
  },
  permissionText: {
    marginBottom: spacing[2],
  },
  permissionButton: {
    alignSelf: 'flex-end',
  },
  stationCardContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    overflow: 'hidden',
  },
  stationCard: {
    padding: 0,
    overflow: 'hidden',
  },
  stationCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: spacing[2],
  },
  stationName: {
    marginBottom: 4,
    width: '90%',
  },
  closeButton: {
    padding: 4,
  },
  stationCardContent: {
    paddingHorizontal: spacing[2],
  },
  stationInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing[2],
  },
  stationInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 4,
  },
  expandedContent: {
    marginTop: spacing[1],
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: spacing[1.5],
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing[1],
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stationCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    padding: spacing[2],
    marginTop: spacing[2],
  },
  expandButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  requestButton: {
    flex: 1,
    marginLeft: spacing[2],
  },
});