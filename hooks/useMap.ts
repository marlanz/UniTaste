import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import MapView from "react-native-maps";

interface UseMapOptions {
  latitudeDelta?: number;
  longitudeDelta?: number;
  autoCenter?: boolean;
  geocodeCacheDistance?: number; // meters
  geocodeDebounceMs?: number;
}

const LOCATION_CACHE_KEY = "last_location";

export const useMap = (options?: UseMapOptions) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  // Track if geocoding is in progress to prevent race conditions
  const geocodingRef = useRef(false);
  const debounceTimerRef = useRef<number | null>(null);

  const {
    latitudeDelta = 0.01,
    longitudeDelta = 0.01,
    autoCenter = true,
    geocodeCacheDistance = 500,
    geocodeDebounceMs = 1000,
  } = options || {};

  // Request and set user location on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Please allow location access to use this feature."
        );
        setLoading(false);
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(current);
      setLoading(false);
    })();
  }, [autoCenter, latitudeDelta, longitudeDelta]);

  // Geocode with caching and debouncing
  useEffect(() => {
    if (!location) return;

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce geocoding calls
    debounceTimerRef.current = setTimeout(() => {
      performGeocode();
    }, geocodeDebounceMs);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [location, geocodeCacheDistance]);

  const performGeocode = async () => {
    if (!location || geocodingRef.current) return;

    try {
      geocodingRef.current = true;
      const { latitude, longitude } = location.coords;

      // Retrieve and parse cached location
      const cached = await AsyncStorage.getItem(LOCATION_CACHE_KEY);
      if (cached) {
        try {
          const {
            latitude: cachedLat,
            longitude: cachedLon,
            address: cachedAddress,
          } = JSON.parse(cached);

          // Check if within cache distance threshold
          const distance = getDistanceFromLatLonInMeters(
            latitude,
            longitude,
            cachedLat,
            cachedLon
          );

          if (distance < geocodeCacheDistance && cachedAddress) {
            setAddress(cachedAddress);
            console.log(
              `📍 Using cached address (${Math.round(distance)}m away)`
            );
            return;
          }
        } catch (parseError) {
          console.warn(
            "Failed to parse cached location, will fetch fresh",
            parseError
          );
        }
      }

      // Perform reverse geocoding
      console.log("📍 Fetching fresh geocode...");
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geocode.length > 0) {
        const info = geocode[0];
        const formattedAddress = [info.street, info.district, info.city]
          .filter(Boolean)
          .join(", ");

        setAddress(formattedAddress);

        await AsyncStorage.setItem(
          LOCATION_CACHE_KEY,
          JSON.stringify({ latitude, longitude, address: formattedAddress })
        );

        console.log("📍 New geocode result cached");
      }
    } catch (err) {
      console.error("Error during geocoding:", err);
    } finally {
      geocodingRef.current = false;
    }
  };

  // Helper function (Haversine formula)
  const getDistanceFromLatLonInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const centerToUser = () => {
    if (!location || !mapRef.current) return;
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  const focusOnDestination = (latitude: number, longitude: number) => {
    if (!mapRef.current) return;
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  return {
    mapRef,
    location,
    address,
    loading,
    centerToUser,
    focusOnDestination,
  };
};
