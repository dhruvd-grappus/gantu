import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

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
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const apiKey = Constants.expoConfig?.extra?.googleMapsApiKeyWeb || process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY_WEB;

  useEffect(() => {
    if (!mapRef.current) return;

    // Create inline map implementation for web
    const mapContainer = mapRef.current;
    
    // Create SVG world map
    mapContainer.innerHTML = `
      <svg viewBox="0 0 360 180" style="width: 100%; height: 100%; background: #4A7BA7;">
        <!-- Simple world map paths -->
        <g fill="#5B8CB8" stroke="#3A5F7D" stroke-width="0.5">
          <!-- Europe -->
          <path d="M180,60 L200,55 L210,58 L205,65 L190,62 Z"/>
          <!-- Asia -->
          <path d="M220,60 L260,55 L270,70 L250,75 L220,70 Z"/>
          <!-- Africa -->
          <path d="M180,80 L200,85 L195,110 L175,105 L170,85 Z"/>
          <!-- Americas -->
          <path d="M100,60 L120,55 L125,90 L115,95 L95,85 L90,65 Z"/>
          <!-- Oceania -->
          <path d="M260,100 L280,105 L275,115 L260,110 Z"/>
        </g>
        
        <!-- Location markers -->
        ${locations.map((loc, index) => {
          const x = ((loc.longitude + 180) / 360) * 360;
          const y = ((90 - loc.latitude) / 180) * 180;
          return `
            <g transform="translate(${x}, ${y})">
              <circle cx="0" cy="0" r="3" fill="white" opacity="0.9"/>
              <rect x="5" y="-8" width="${loc.label.length * 6}" height="16" rx="8" fill="rgba(255,255,255,0.9)"/>
              <text x="8" y="0" font-size="10" font-weight="600" fill="#2C3E50" alignment-baseline="middle">${loc.label}</text>
            </g>
          `;
        }).join('')}
      </svg>
    `;

    // If Google Maps API is available, use it
    if (typeof window !== 'undefined' && (window as any).google?.maps) {
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: { lat: locations[0]?.latitude || 48.8566, lng: locations[0]?.longitude || 2.3522 },
        zoom: 2,
        styles: monotoneMapStyle,
        disableDefaultUI: true,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // Add markers
      locations.forEach((location) => {
        const marker = new (window as any).google.maps.Marker({
          position: { lat: location.latitude, lng: location.longitude },
          map: map,
          title: location.label,
          icon: {
            path: (window as any).google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#FFFFFF',
            fillOpacity: 0.9,
            strokeColor: '#3A5F7D',
            strokeWeight: 2,
          },
        });

        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="padding: 8px; font-size: 12px; font-weight: 600; color: #2C3E50;">
              ${location.label}
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });

      if (showUserLocation && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          new (window as any).google.maps.Marker({
            position: userPos,
            map: map,
            title: 'Your Location',
            icon: {
              path: (window as any).google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#FFFFFF',
              strokeWeight: 2,
            },
          });
        });
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [locations, showUserLocation]);

  return (
    <View style={[styles.container, { height }]}>
      <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 12,
  },
});

// Monotone blue map style
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