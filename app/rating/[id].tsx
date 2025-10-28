import CustomInput from "@/components/CustomInput";
import StarRating from "@/components/StarRating";
import usePost from "@/hooks/usePost";
import { useRestaurant } from "@/hooks/useRestaurant";
import { CreatePostProps } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Rating = () => {
  const { id, score } = useLocalSearchParams();

  const { restaurantDetail, fetchRestaurantDetail } = useRestaurant();

  const { createPost, loading } = usePost();

  const parseScore = Number(score);

  const [form, setForm] = useState({
    title: "",
    content: "",
    rating: parseScore || 0,
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

  const handleChangeReview = (value: string, name: "content" | "title") => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async () => {
    const body: CreatePostProps = {
      title: form.title,
      content: form.content,
      restaurantId: restaurantId,
      rating: form.rating,
      isReview: true,
      visibility: "Public",
      tags: restaurantDetail?.categories?.[0]
        ? [restaurantDetail.categories[0].name]
        : ["string"],
    };
    try {
      const data = await createPost(body);
      if (data) {
        Alert.alert("Đăng bài thành công");
        setTimeout(() => router.back(), 300);
      }
    } catch (err) {
      console.log("Error submitting review: ", err);
    }
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

          <View className="mt-6 gap-4">
            <CustomInput
              placeholder={"Tiêu đề đánh giá"}
              label="Tiêu đề đánh giá"
              onChangeText={(value) => handleChangeReview(value, "title")}
              labelStyle="text-base font-msr-sbold"
              value={form.title}
            />

            <CustomInput
              placeholder={`Cho chúng tôi biết về trải nghiệm của bạn tại đây. Bạn có thể chia sẻ những gì bạn thích, chưa hài lòng, hoặc gợi ý cho quán.`}
              label="Nội dung đánh giá"
              onChangeText={(value) => handleChangeReview(value, "content")}
              labelStyle="text-base font-msr-sbold"
              value={form.content}
              multiline={true}
            />
          </View>
        </View>
        <View className="absolute bottom-0 p-5 w-full z-20">
          <Pressable
            className="bg-orange-200 w-full py-4 rounded-lg"
            onPress={handleSubmitReview}
            disabled={loading}
          >
            {/* {leftIcon} */}
            <View className="flex-center flex-row">
              {loading ? (
                <View className="flex-row gap-2">
                  <ActivityIndicator size={"small"} color={"white"} />
                  <Text className="text-white-100 font-msr-sbold text-base ">
                    Đang đăng bài...
                  </Text>
                </View>
              ) : (
                <Text className="text-white-100 font-msr-sbold text-base ">
                  Đăng bài
                </Text>
              )}
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Rating;
