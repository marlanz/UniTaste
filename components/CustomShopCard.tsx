import React from "react";
import { Text, View } from "react-native";

interface CustomShopCardProps {
  name?: string;
  address?: string;
  imgUrl?: string;
  priceRange?: string;
  rating?: number;
  long: number;
  lat: number;
}

const CustomShopCard = ({
  name,
  address,
  imgUrl,
  priceRange,
  rating,
}: CustomShopCardProps) => {
  return (
    <View>
      <Text>CustomShopCard</Text>
    </View>
  );
};

export default CustomShopCard;
