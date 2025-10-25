import { useRestaurant } from "@/hooks/useRestaurant";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rating = () => {
  const { id, score } = useLocalSearchParams();

  const { restaurantDetail, fetchRestaurantDetail } = useRestaurant();

  const parseScore = Number(score);

  const restaurantId = Number(id);

  const ratingDescription = {
    1: "Thật thất vọng",
    2: "Có thể cải thiện hơn",
    3: "Tạm ổn, nhưng chưa tốt lắm",
    4: "Rất tốt, đáng để thử",
    5: "Xuất sắc, rất đáng để thử",
  };

  useEffect(() => {
    fetchRestaurantDetail(restaurantId);
  }, [restaurantId, fetchRestaurantDetail]);

  return (
    <SafeAreaView className="mt-4">
      <View className="items-center justify-between flex-row px-4">
        <Pressable onPress={() => router.back()} className="">
          <Ionicons name="chevron-back" size={24} />
        </Pressable>
        <View className="items-center">
          <Text className="font-msr-bold text-xl">
            {restaurantDetail?.name}
          </Text>
          <Text className="font-msr-medium text-sm text-gray-200">
            Viết bài đánh giá trên UniTaste
          </Text>
        </View>
        <Pressable onPress={() => router.back()} className="">
          <Ionicons name="share-social-outline" size={24} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Rating;
