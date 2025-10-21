import { useRestaurant } from "@/hooks/useRestaurant";
import { Restaurant } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

type CustomHomeRestaurantCardProps = {
  restaurants: Restaurant[];
  title: string;
};

const CustomHomeRestaurantCard = ({
  restaurants,
  title,
}: CustomHomeRestaurantCardProps) => {
  const { parseRestaurantCategory } = useRestaurant();
  return (
    <View className="mt-[40px] gap-4">
      <View className="flex-row justify-between items-center  px-4">
        <Text className="text-[18px] font-msr-sbold text-orange-100">
          {title}
        </Text>
        <View className="flex-row items-center gap-1">
          <Text className="text-sm font-msr-medium text-gray-200">
            Xem thêm
          </Text>
          <Ionicons
            name="chevron-forward-outline"
            size={14}
            color={"#71727a"}
          />
        </View>
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            className="gap-3 w-[180px]"
            onPress={() =>
              router.push({
                pathname: "/(search)/[id]",
                params: { id: String(item.restaurantId) },
              })
            }
          >
            <Image
              source={{ uri: item.coverImageUrl }}
              resizeMode="stretch"
              className="w-[180px] h-[160px] rounded-[8px]"
            />

            <View className="gap-1">
              <Text className="font-msr-sbold text-base" numberOfLines={1}>
                {item.name}
              </Text>
              <View className="flex-row items-center gap-1">
                <Text
                  className="font-msr-medium text-gray-200 text-sm"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.address}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-5">
              <Text className="text-xs text-orange-200 font-msr-sbold px-2 py-1 border border-orange-200 rounded-lg">
                {parseRestaurantCategory(item?.categories[0]?.categoryId)}
              </Text>
              <View className="flex-row gap-2 items-center">
                <Ionicons name="star" size={16} color={"#FD8200"} />
                <Text className="font-msr-sbold text-sm">
                  {item.googleRating}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        horizontal
        contentContainerClassName="gap-x-4 px-4"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      />
    </View>
  );
};

export default CustomHomeRestaurantCard;
