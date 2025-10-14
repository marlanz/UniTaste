import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const DALAT_COORDS = {
  latitude: 11.940419,
  longitude: 108.458313,
};

const GOOGLE_MAPS_API_KEY = "";

export default function UserLocationMap() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow locatiofn access to use this feature."
        );
        return;
      }

      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(current);

      mapRef.current?.animateToRegion({
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={false}
        showsMyLocationButton={true}
      >
        {location && (
          <>
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
              pinColor="blue"
            />

            <Marker coordinate={DALAT_COORDS} title="Đà Lạt" pinColor="red" />

            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              destination={DALAT_COORDS}
              apikey={"GOOGLE_API_KEY" as string}
              strokeWidth={5}
              strokeColor="blue"
              mode="DRIVING"
              onReady={(result) => {
                mapRef.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true,
                });
              }}
            />
          </>
        )}
      </MapView>

      {/* ✅ Overlay your buttons on top of the map */}
      <View style={styles.overlayContainer}>
        <Pressable
          style={[styles.iconButton, { left: 20 }]}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back-outline" size={24} color={"black"} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  overlayContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "white",
    // elevation: 5, // for Android shadow
    // shadowColor: "#000",
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // shadowOffset: { width: 0, height: 1 }, // iOS shadow
  },
});
