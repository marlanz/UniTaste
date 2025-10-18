import BeverageSection from "@/components/BeverageSection";
import FoodSection from "@/components/FoodSection";
import HomeHeader from "@/components/HomeHeader";
import PlaceSuggestions from "@/components/PlaceSuggestions";
import Recommendations from "@/components/Recommendations";
import { images } from "@/constants";
import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

type PriceRange = 1 | 2 | 3;

const PRICE_RANGE_LABELS: Record<PriceRange, string> = {
  1: "Giá dễ chịu",
  2: "Giá hợp lý",
  3: "Giá cao cấp",
};

export const getPriceLabel = (range: number): string => {
  return PRICE_RANGE_LABELS[range as PriceRange] || "Không xác định";
};

const Home = () => {
  const { isAuthenticated, appLoading } = useAuth();

  useEffect(() => {
    if (!appLoading && !isAuthenticated) {
      router.replace("/login"); //bug reported
    }
  }, [appLoading, isAuthenticated]);

  if (appLoading || !isAuthenticated) {
    return null;
  }

  return (
    <ScrollView
      className="flex-1 bg-white-100"
      bounces={false} // iOS: prevent overscroll "bounce"
      overScrollMode="never"
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
      <PlaceSuggestions />
      <Recommendations />
      <View className="mt-[40px] bg-orange-100 p-6 gap-4">
        <View className="items-center flex-row justify-between">
          <View className="">
            <Text className="font-msr-bold text-xl text-white-100">
              Đăng kí gói thành viên
            </Text>
            <Text className="font-msr-medium text-white-100 mt-1 text-base">
              Mở khóa vô vàn quyền lợi
            </Text>
          </View>
          <Pressable>
            <Ionicons
              name="chevron-forward-outline"
              size={16}
              color={"black"}
              className=" bg-white-100 rounded-full p-1"
            />
          </Pressable>
        </View>
        <View>
          <View className="flex-row justify-between">
            <View>
              <Image
                source={images.premium2}
                className="size-[170px]  rounded-[20px]"
                resizeMode="stretch"
              />
              <View className="absolute inset-0 bg-black/40 rounded-[20px] size-[170px]" />
              <View className="absolute top-[25] left-[16] gap-1">
                <Text className="font-msr-sbold text-[18px] text-white-100 w-[120px]">
                  Mở rộng phạm vị tìm quán và chuẩn hơn
                </Text>
              </View>
            </View>
            <View>
              <Image
                source={images.premium1}
                className="size-[170px]  rounded-[20px]"
                resizeMode="stretch"
              />
              <View className="absolute inset-0 bg-black/40 rounded-[20px] size-[170px]" />
              <View className="absolute top-[25] left-[16] gap-1">
                <Text className="font-msr-sbold text-[18px] text-white-100 w-[120px]">
                  Cá nhân hóa sở thích ăn uống với AI
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <BeverageSection />
      <FoodSection />
    </ScrollView>
  );
};

export default Home;
