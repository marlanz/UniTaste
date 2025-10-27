import StarRating from "@/components/StarRating";
import { images } from "@/constants";
import { useMap } from "@/hooks/useMap";
import { useRestaurant } from "@/hooks/useRestaurant";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const RestaurantDetail = () => {
  const {
    fetchRestaurantDetail,
    restaurantDetail,
    parseRestaurantCategory,
    parseRestaurantPriceRange,
    parseDate,
  } = useRestaurant();

  const { address } = useMap();

  const { id } = useLocalSearchParams();

  const restaurantId = Number(id);

  const reviews = restaurantDetail?.reviews ?? [];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={14}
          color={i <= rating ? "#FD8200" : "#C0C0C0"}
        />
      );
    }
    return <View className="flex-row">{stars}</View>;
  };

  const handleNavigateToRating = (rating: number) => {
    router.push({
      pathname: `../rating/${restaurantId}`,
      params: { score: Number(rating) },
    });
  };

  useEffect(() => {
    fetchRestaurantDetail(restaurantId);
  }, [restaurantId, fetchRestaurantDetail]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View>
          <Image
            source={{ uri: restaurantDetail?.coverImageUrl }}
            className="w-full h-[230px]"
            resizeMode="stretch"
            style={{}}
          />
          <View className="absolute inset-0 bg-black/50" />

          <Pressable
            className="absolute p-3 rounded-full bg-white-100 top-[60px] left-[20px]"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back-outline" size={24} color={"black"} />
          </Pressable>
          <Pressable className="absolute p-3 rounded-full bg-white-100 top-[60px] right-[20px]">
            <Ionicons name="heart-outline" size={24} color={"black"} />
          </Pressable>

          <View className="flex-row gap-2 items-center absolute bg-white-100 rounded-[8px] px-3 py-1 bottom-4 right-4">
            <Ionicons name="star" size={20} color={"#FD8200"} />
            <Text className="font-msr-sbold text-xl">
              {restaurantDetail?.googleRating}
            </Text>
          </View>
        </View>
        <View className="px-5 mt-6 flex-col gap-4">
          <View className="flex-col gap-4">
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
            <View className="restaurant-name">
              <Text className="text-2xl font-msr-sbold">
                {restaurantDetail?.name}
              </Text>
            </View>
          </View>
          <View className="flex-col gap-3">
            <View className="flex-row gap-3 items-center">
              <Ionicons
                name="location-outline"
                size={18}
                className="p-2 bg-gray-300 rounded-full"
                color={"#FD8200"}
              />
              <Text className="font-msr-medium text-base flex-1">
                {restaurantDetail?.address}
              </Text>
            </View>
            <View className="flex-row gap-3 items-center">
              <Ionicons
                name="time-outline"
                size={18}
                className="p-2 bg-gray-300 rounded-full"
                color={"#FD8200"}
              />
              <View className="flex-row gap-3">
                <Text className="font-msr-medium text-base ">
                  Thứ hai - Chủ nhật
                </Text>
                <Text className="font-msr-medium text-base ">
                  6:00am - 11:59pm
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-8 pl-4">
          <Text className="font-msr-sbold text-xl mb-2">
            Viết một bài đánh giá
          </Text>
          <View className="flex-row items-center gap-3">
            <Image
              source={images.profile}
              className="size-[45px] rounded-full"
              resizeMode="contain"
            />
            <StarRating initialRating={0} onRate={handleNavigateToRating} />
          </View>
        </View>
        <View className="comments mt-8 px-4 pb-[100px]">
          <View className="header flex-row justify-between items-center">
            <Text className="font-msr-sbold text-xl">
              Nhận xét ({restaurantDetail?.reviews?.length})
            </Text>
            <View className="flex-row gap-5">
              <Pressable className="flex-row items-center gap-2 p-2 border-orange-100 border rounded-full">
                <Ionicons name="logo-google" size={16} color={"#EB4F26"} />
                <Text className="text-base font-msr-sbold text-orange-100">
                  Goolge (5)
                </Text>
              </Pressable>
              <Pressable className="flex-row items-center gap-2  p-2">
                <Text className="text-base font-msr-medium text-gray-DISABLED">
                  UniTaste (0)
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="reviews-container flex-col gap-8 mt-6">
            {reviews?.map((review, index) => (
              <View key={index} className="gap-3 flex-row items-start">
                <Image
                  source={images.profile}
                  className="size-[45px] rounded-full"
                  resizeMode="contain"
                />
                <View className="review-info flex-1">
                  <View className="header justify-between flex-row">
                    <View className="flex-col gap-1">
                      <Text className="text-base font-msr-sbold">
                        {review?.userName}
                      </Text>
                      <View className="flex-row gap-3 items-center">
                        <Text> {renderStars(review?.rating)}</Text>
                        <Text className="text-sm text-gray-100 font-msr-medium">
                          {parseDate(review?.createdAt)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text
                    numberOfLines={3}
                    className="text-base font-msr-medium mt-2"
                  >
                    {review.comment}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="show-direction-container absolute bottom-0 bg-white-100 p-5 w-full flex-row items-center justify-between shadow-detail">
        <View className="mb-2 flex-row items-center justify-between w-full">
          <View className="flex-1 mr-8">
            <Text className="text-base font-msr-sbold">Vị trí của bạn</Text>
            <Text
              className="text-sm font-msr-medium text-gray-100"
              numberOfLines={2}
            >
              {!address ? "Đang cập nhật địa chỉ" : address}
            </Text>
          </View>
          <Pressable
            className="p-4 rounded-[8px] bg-orange-200 items-center justify-center"
            onPress={() => router.push(`/(search)/map/${id}`)}
          >
            <Text className="text-base font-msr-sbold text-white-100">
              Xem bảng đồ
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RestaurantDetail;
