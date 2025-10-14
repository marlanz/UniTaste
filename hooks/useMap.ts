import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import MapView from "react-native-maps";

interface UseMapOptions {
  latitudeDelta?: number;
  longitudeDelta?: number;
  autoCenter?: boolean;
}

export const useMap = (options?: UseMapOptions) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  const {
    latitudeDelta = 0.01,
    longitudeDelta = 0.01,
    autoCenter = true,
  } = options || {};

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

      const geocode = await Location.reverseGeocodeAsync({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
      });

      if (geocode && geocode.length > 0) {
        const info = geocode[0];
        const formattedAddress = [info.name, info.street, info.district]
          .filter(Boolean)
          .join(", ");
        setAddress(formattedAddress);
      }

      setLoading(false);
    })();
  }, [autoCenter, latitudeDelta, longitudeDelta]);

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
    address, // 🏠 địa chỉ cụ thể
    loading,
    centerToUser,
    focusOnDestination,
  };
};
