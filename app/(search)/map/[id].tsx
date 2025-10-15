import CustomDivider from "@/components/CustomDivider";
import { GOOGLE_API_KEY } from "@/constants";
import { useMap } from "@/hooks/useMap";
import { useRestaurant } from "@/hooks/useRestaurant";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const MapDetail = () => {
  const { id } = useLocalSearchParams();

  const restaurantId = Number(id);

  const {
    fetchRestaurantDetail,
    restaurantDetail,
    parseRestaurantCategory,
    parseRestaurantPriceRange,
  } = useRestaurant();

  const { mapRef, location, centerToUser, address, focusOnDestination } =
    useMap({
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });

  const [showDirection, setShowDirection] = useState(false);

  useEffect(() => {
    fetchRestaurantDetail(restaurantId);
  }, [restaurantId]);

  useEffect(() => {
    if (restaurantDetail?.latitude && restaurantDetail?.longitude) {
      focusOnDestination(restaurantDetail.latitude, restaurantDetail.longitude);
    }
  }, [restaurantDetail]);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton
      >
        {location && (
          <>
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
            />
          </>
        )}
        <Marker
          coordinate={{
            latitude: restaurantDetail?.latitude as number,
            longitude: restaurantDetail?.longitude as number,
          }}
          title={restaurantDetail?.name}
          pinColor="red"
        />

        {showDirection && location && restaurantDetail && (
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            destination={{
              latitude: restaurantDetail?.latitude as number,
              longitude: restaurantDetail?.longitude as number,
            }}
            apikey={GOOGLE_API_KEY as string}
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
        )}
      </MapView>

      <View style={styles.overlayContainer}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} color={"black"} />
        </Pressable>

        <Pressable style={styles.iconButton} onPress={centerToUser}>
          <View className="flex-row items-center gap-2">
            <Ionicons name="navigate-outline" size={24} color={"black"} />
            <Text className="text-[base] font-msr-sbold">Định vị tôi</Text>
          </View>
        </Pressable>
      </View>
      <View className="bg-white-100 absolute bottom-0 w-full px-4 py-6 rounded-t-[20px]">
        <View className=" flex-col">
          <View className="restaurant-info flex-col gap-2">
            <View className="restaurant-img-name flex-row gap-3 ">
              <View>
                <Image
                  source={{ uri: restaurantDetail?.coverImageUrl }}
                  resizeMode="stretch"
                  className="size-[64px] rounded-[10px]"
                />
                <View className="flex-row gap-2 items-center absolute bg-white-100 rounded-bl-[10px] rounded-tr-[10px] px-2 bottom-0">
                  <Ionicons name="star" size={14} color={"#FD8200"} />
                  <Text className="font-msr-sbold text-sm">
                    {restaurantDetail?.googleRating}
                  </Text>
                </View>
              </View>
              <View className="flex-col gap-1 flex-1">
                <Text className="text-[18px] font-msr-sbold" numberOfLines={1}>
                  {restaurantDetail?.name}
                </Text>
                <Text
                  className="text-base font-msr-medium text-gray-100"
                  numberOfLines={2}
                >
                  {restaurantDetail?.address}
                </Text>
              </View>
            </View>
            <View className="chip-placement justify-between flex-row">
              <View className="flex-row items-center gap-3">
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgb(253,130,0,0.1)" }}
                >
                  <Text className="text-sm text-orange-200 font-msr-sbold ">
                    {parseRestaurantCategory(
                      restaurantDetail?.categories[0]?.categoryId as number
                    )}
                  </Text>
                </View>
                <View className="px-2 py-1 border border-orange-200 rounded-full flex-row items-center gap-2">
                  <Ionicons name="cash-outline" size={12} color={"#FD8200"} />
                  <Text className="text-sm text-orange-200 font-msr-sbold ">
                    {parseRestaurantPriceRange(
                      restaurantDetail?.priceRangeId as number
                    )}
                  </Text>
                </View>
              </View>
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: "rgb(42,144,131,0.1)" }}
              >
                <Text className="text-sm text-green-100 font-msr-sbold ">
                  Đang mở cửa
                </Text>
              </View>
            </View>
          </View>
          <CustomDivider />
          <View className="mb-2 flex-row items-center justify-between">
            <View className="flex-1 mr-6">
              <Text className="text-base font-msr-sbold">Vị trí của bạn</Text>
              <Text
                className="text-sm font-msr-medium text-gray-100"
                numberOfLines={2}
              >
                {!address ? "Đang cập nhật địa chỉ..." : address}
              </Text>
            </View>

            <Pressable
              className={cn(
                "w-[40%] py-4 px-7 rounded-[8px] items-center justify-center",
                showDirection ? "border-orange-200 border" : "bg-orange-200"
              )}
              onPress={() => setShowDirection(!showDirection)}
            >
              <Text
                className={cn(
                  "text-base font-msr-sbold ",
                  showDirection ? "text-orange-200" : "text-white-100"
                )}
              >
                {showDirection ? "Hủy" : "Chỉ đường"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MapDetail;

const styles = StyleSheet.create({
  map: { width: "100%", height: "100%" },
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
  },
});
