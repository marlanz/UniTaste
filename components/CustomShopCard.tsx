import { useRestaurant } from "@/hooks/useRestaurant";
import { Location, Restaurant } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

interface CustomShopCardProps {
  restaurant: Restaurant;
  isVerticalLayout: boolean;
  myLocation: Location;
}

type PriceRange = 1 | 2 | 3;

const PRICE_RANGE_LABELS: Record<PriceRange, string> = {
  1: "Giá dễ chịu",
  2: "Giá hợp lý",
  3: "Giá cao cấp",
};

export const getPriceLabel = (range: number): string => {
  return PRICE_RANGE_LABELS[range as PriceRange] || "Không xác định";
};

const CustomShopCard = ({
  restaurant,
  isVerticalLayout,
  myLocation,
}: CustomShopCardProps) => {
  const { calculateDistance, toNumber } = useRestaurant();
  return (
    <>
      {isVerticalLayout ? (
        <View className="gap-3">
          <Image
            source={{ uri: restaurant.coverImageUrl }}
            resizeMode="stretch"
            className="w-[220px] h-[130px] rounded-[8px]"
          />
          <View className="gap-1">
            <Text className="font-msr-sbold text-base max-w-[200px]">
              {restaurant.name}
            </Text>
            <View className="flex-row items-center gap-1">
              <Ionicons name="location-outline" size={16} color={"#FD8200"} />
              <Text
                className="max-w-[190px] font-msr-medium text-gray-200 text-sm"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {restaurant.address}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-5">
            <Text className="text-xs text-orange-200 font-msr-sbold px-2 py-1 border border-orange-200 rounded-lg">
              {getPriceLabel(restaurant.priceRangeId)}
            </Text>
            <View className="flex-row gap-2 items-center">
              <Ionicons name="star" size={16} color={"#FD8200"} />
              <Text className="font-msr-sbold text-sm">
                {restaurant.googleRating}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View className="flex-row gap-3">
          <View className="relative">
            <Image
              source={{ uri: restaurant.coverImageUrl }}
              resizeMode="stretch"
              className="w-[120px] h-[95px] rounded-[10px]"
            />
            <View className="flex-row gap-2 items-center absolute bg-white-100 rounded-bl-[10px] rounded-tr-[10px] px-2 bottom-0">
              <Ionicons name="star" size={14} color={"#FD8200"} />
              <Text className="font-msr-sbold text-sm">
                {restaurant.googleRating}
              </Text>
            </View>
          </View>
          <View className="flex-col justify-between">
            <View className="gap-1">
              <Text
                className="font-msr-sbold text-base max-w-[228px]"
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {restaurant.name}
              </Text>

              <Text
                className="font-msr-medium text-sm text-gray-100 max-w-[228px]"
                numberOfLines={2}
              >
                {restaurant.address}
              </Text>
            </View>
            <View>
              <View className="flex-row items-center gap-5">
                <View className="px-2 py-1 border border-orange-200 rounded-lg flex-row items-center gap-2">
                  <Ionicons name="cash-outline" size={12} color={"#FD8200"} />
                  <Text className="text-xs text-orange-200 font-msr-sbold ">
                    {getPriceLabel(restaurant.priceRangeId)}
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="navigate-outline" size={12} />
                  <Text className="font-msr-medium text-sm ">
                    {calculateDistance(myLocation, {
                      latitude: toNumber(restaurant.latitude),
                      longitude: toNumber(restaurant.longitude),
                    })}{" "}
                    km
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default CustomShopCard;
