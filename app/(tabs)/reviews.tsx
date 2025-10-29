import CustomDivider from "@/components/CustomDivider";
import { images } from "@/constants";
import usePost from "@/hooks/usePost";
import { useRestaurant } from "@/hooks/useRestaurant";
import { cleanText } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Reviews = () => {
  const { posts, fetchAllPost, fetchAuhthorName } = usePost();

  const { fetchRestaurantDetail, parseDate } = useRestaurant();

  const [restaurantNames, setRestaurantNames] = useState<{
    [key: number]: string;
  }>({});

  const [authorNames, setAuthorNames] = useState<{
    [key: number]: string;
  }>({});

  const [currentPage, setCurrentPage] = useState(1);

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

  const loadRestaurantName = async (id: number) => {
    if (restaurantNames[id]) return;

    try {
      const data = await fetchRestaurantDetail(id);
      if (data?.name) {
        setRestaurantNames((prev) => ({ ...prev, [id]: data.name }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadAuthorName = async (id: number) => {
    if (authorNames[id]) return;

    try {
      const fullName = await fetchAuhthorName(id);
      if (fullName) {
        setAuthorNames((prev) => ({ ...prev, [id]: fullName }));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getAllPost = async () => {
      const res = await fetchAllPost(currentPage, 30);
      res?.forEach((item: any) => {
        loadRestaurantName(item.restaurantId);
        loadAuthorName(item.authorUserId);
      });
    };

    getAllPost();
  }, [currentPage, fetchAllPost]);

  return (
    <View className="flex-1 bg-white-100">
      <SafeAreaView className="px-4">
        <View className="flex-row justify-between items-center py-6 bg-white-100">
          <Text className="text-2xl font-msr-bold">Bài viết gần đây</Text>
          <Ionicons name="list-outline" size={24} color={"black"} />
        </View>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.postId.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="">
              <View className="gap-3 flex-row items-start">
                <Image
                  source={images.profile}
                  className="size-[35px] rounded-full"
                  resizeMode="contain"
                />
                <View className="justify-between flex-row">
                  <View className="flex-col gap-1">
                    <Text className="text-base font-msr-sbold">
                      {authorNames[item.authorUserId] ?? "Đang tải..."} -
                      {item.authorUserId}
                    </Text>

                    <View className="flex-row gap-3 items-center">
                      <Text> {renderStars(item?.rating)}</Text>
                      <Text className="text-sm text-gray-100 font-msr-medium">
                        {parseDate(item?.createdAt)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="review-info flex-1 gap-2 mt-3">
                <Text className="font-msr-sbold text-[18px]">
                  {item.title ? cleanText(item.title) : "[Không có tiêu đề]"}
                </Text>
                <Text className="text-base font-msr-medium">
                  {cleanText(item.content)}
                </Text>
              </View>
              <Pressable
                className="mt-4 p-2 bg-gray-300"
                onPress={() => router.push(`/(search)/${item.restaurantId}`)}
              >
                <Text
                  className="font-msr-medium text-sm text-gray-200"
                  numberOfLines={1}
                >
                  Bài nhận xét về quán{" "}
                  {restaurantNames[item.restaurantId] ?? "Đang tải..."}
                </Text>
              </Pressable>
            </View>
          )}
          ItemSeparatorComponent={() => <CustomDivider />}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Reviews;
