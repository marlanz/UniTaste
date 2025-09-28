import HomeHeader from "@/components/HomeHeader";
import PlaceSuggestions from "@/components/PlaceSuggestions";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

const Home = () => {
  const isAuthenticated = true;
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Don't render anything while redirecting
    return null;
  }

  return (
    <ScrollView
      className="flex-1 bg-white-100"
      bounces={false} // iOS: prevent overscroll "bounce"
      overScrollMode="never"
    >
      <HomeHeader />
      <PlaceSuggestions />
      <View className="mt-[40px] px-4 gap-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-msr-sbold">Dành cho bạn</Text>
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
      </View>
    </ScrollView>
  );
};

export default Home;
