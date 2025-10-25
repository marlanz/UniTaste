import { createReview } from "@/api/services/social.service";
import StarRating from "@/components/StarRating";
import { useRestaurant } from "@/hooks/useRestaurant";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rating = () => {
  const { id, score } = useLocalSearchParams();

  const { restaurantDetail, fetchRestaurantDetail } = useRestaurant();

  const parseScore = Number(score);

  const [form, setForm] = useState({
    rating: parseScore || 0,
    review: "",
  });

  const restaurantId = Number(id);

  const ratingDescription: Record<number, string> = {
    1: "Thật thất vọng",
    2: "Có thể cải thiện hơn",
    3: "Tạm ổn, nhưng chưa tốt lắm",
    4: "Rất tốt, đáng để thử",
    5: "Xuất sắc, rất đáng để thử",
  };

  const handleChangeRating = (newRating: number) => {
    setForm((prev) => ({ ...prev, rating: newRating }));
  };

  const handleChangeReview = (text: string) => {
    setForm((prev) => ({ ...prev, review: text }));
  };

  const handleSubmitReview = async () => {
    const body = {
      title: "Review Milano",
      content: form.review,
      rating: form.rating,
      isReview: true,
      visibility: "Public",
      tags: "cafe",
      restaurantId: 8,
    };
    try {
      await createReview(body);
    } catch (err) {
      console.log("Error submitting review: ", err);
    }
    console.log(form);
  };

  useEffect(() => {
    fetchRestaurantDetail(restaurantId);
  }, [restaurantId, fetchRestaurantDetail]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="mt-4 flex-1 bg-white-100">
        <View className="items-center justify-between flex-row px-4">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} />
          </Pressable>
          <View className="items-center">
            <Text
              className="font-msr-bold text-xl max-w-[270px]"
              numberOfLines={1}
            >
              {restaurantDetail?.name}
            </Text>
            <Text className="font-msr-medium text-base text-gray-200">
              Viết bài đánh giá trên UniTaste
            </Text>
          </View>
          <Pressable onPress={() => router.back()}>
            <Ionicons name="share-social-outline" size={24} />
          </Pressable>
        </View>

        <View className="px-6 mt-8">
          <View className="gap-2">
            <Text className="font-msr-sbold text-xl">
              {ratingDescription[form.rating]}
            </Text>
            <StarRating
              onRate={handleChangeRating}
              initialRating={form.rating}
            />
          </View>

          <TextInput
            multiline
            numberOfLines={6}
            placeholder={`Cho chúng tôi biết về trải nghiệm của bạn tại đây.
Bạn có thể chia sẻ những gì bạn thích, chưa hài lòng, hoặc gợi ý cho quán.`}
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
            value={form.review}
            onChangeText={handleChangeReview}
            style={{
              minHeight: 150,
              borderColor: "#D1D5DB",
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,

              lineHeight: 20,
            }}
            className="mt-6 font-msr-medium text-base"
          />
        </View>
        <View className="show-direction-container absolute bottom-0 bg-white-100 p-5 w-full flex-row items-center justify-between shadow-detail">
          <Pressable
            className="p-4 rounded-[8px] bg-orange-200 items-center justify-center mb-3 flex-1"
            onPress={handleSubmitReview}
            disabled={false}
          >
            <Text className="text-base font-msr-sbold text-white-100">
              Lưu đánh giá
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Rating;
