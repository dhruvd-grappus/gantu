import React, { useEffect, useState } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import RNMapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';

interface MapLocation {
  latitude: number;
  longitude: number;
  label: string;
}

interface MapViewProps {
  locations?: MapLocation[];
  showUserLocation?: boolean;
  height?: number;
}

const defaultLocations: MapLocation[] = [
  { latitude: 48.8566, longitude: 2.3522, label: 'Holiday Packages' },
  { latitude: 41.9028, longitude: 12.4964, label: 'Charming Europe' },
  { latitude: 51.5074, longitude: -0.1278, label: 'Swiss French Magic' },
  { latitude: 25.0480, longitude: 55.1304, label: 'Magical France' },
  { latitude: 40.7128, longitude: -74.0060, label: 'Enchanting Germany' },
  { latitude: 35.6762, longitude: 139.6503, label: 'Family Adventure' },
];

export default function MapView({
  locations = defaultLocations,
  showUserLocation = false,
  height = 400
}: MapViewProps) {
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (showUserLocation) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);
      })();
    }
  }, [showUserLocation]);

  // For web, show fallback
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapTitle}>Popular Destinations</Text>
          <View style={styles.locationsGrid}>
            {locations.map((loc, index) => (
              <View key={index} style={styles.locationItem}>
                <Text style={styles.locationLabel}>{loc.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  // Use react-native-maps for native
  return (
    <View style={[styles.container, { height }]}>
      <RNMapView
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: 40,
          longitude: 10,
          latitudeDelta: 50,
          longitudeDelta: 50,
        }}
        showsUserLocation={showUserLocation}
        onMapReady={() => setMapLoaded(true)}
        mapType="standard"
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.label}
            description={`Tap to explore ${location.label}`}
            pinColor="#4A7BA7"
          />
        ))}
      </RNMapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 12,
  },
  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4A7BA7',
    padding: 16,
    justifyContent: 'center',
  },
  mapTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  locationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  locationItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationLabel: {
    color: '#2C3E50',
    fontSize: 12,
    fontWeight: '600',
  },
  markerContainer: {
    alignItems: 'center',
  },
  marker: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  markerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#2C3E50',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: '#4A7BA7',
    fontSize: 14,
  },
});

// Monotone blue map style similar to the provided image
const monotoneMapStyle = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#4A7BA7' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#3A5F7D' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FFFFFF' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#3A5F7D' }],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [{ color: '#4A7BA7' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#5B8CB8' }, { visibility: 'simplified' }],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#5B8CB8' }],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#6B9BC8' }],
  },
];