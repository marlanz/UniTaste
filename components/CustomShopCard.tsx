import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

interface Shop {
  name?: string;
  address?: string;
  imgUrl?: string;
  priceRange?: number;
  rating?: number;
  long: number;
  lat: number;
}

interface CustomShopCardProps {
  shop: Shop;
}

const CustomShopCard = ({ shop }: CustomShopCardProps) => {
  const MAX_RATING = 5;

  const renderPriceIcons = () => {
    return Array.from({ length: MAX_RATING }, (_, index) => (
      <Ionicons
        key={index}
        name="cash-outline"
        size={16}
        // style={{ marginRight: -6 }}
        color={index < (shop.priceRange ?? 0) ? "#FD8200" : "#C5C5C5"}
      />
    ));
  };

  return (
    <View className="gap-3">
      <Image
        source={{ uri: shop.imgUrl }}
        resizeMode="stretch"
        className="w-[220px] h-[130px] rounded-[8px]"
      />
      <View className="gap-1">
        <Text className="font-msr-sbold text-base max-w-[200px]">
          {shop.name}
        </Text>
        <View className="flex-row items-center gap-1">
          <Ionicons name="location-outline" size={16} />
          <Text
            className="max-w-[190px] font-msr-medium text-gray-200 text-sm"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {shop.address}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-5">
        <View className="flex-row items-center gap-[1px]">
          {renderPriceIcons()}
        </View>
        <View className="flex-row gap-2 items-center">
          <Ionicons name="star" size={16} color={"#FD8200"} />
          <Text className="font-msr-sbold text-sm">{shop.rating}</Text>
        </View>
      </View>
    </View>
  );
};

export default CustomShopCard;
