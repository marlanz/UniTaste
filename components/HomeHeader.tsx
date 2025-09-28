import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

const HomeHeader = () => {
  return (
    <LinearGradient
      colors={["#FD8200", "#EB4F26"]}
      start={{ x: 0, y: 0 }} // top-left
      end={{ x: 1, y: 1 }} // bottom-right
      style={{ paddingHorizontal: 20, paddingTop: 76, paddingBottom: 25 }}
      className="px-5 pt-[76px] "
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <Image source={images.profile} className="size-[50px] rounded-full" />
          <View>
            <Text className="font-msr-medium text-base text-white-100">
              Hôm nay bạn muốn ăn gì
            </Text>
            <Text className="font-msr-bold text-xl text-white-100">
              Phuc Anh Do Dang
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <View className="mt-6 flex-row items-center justify-between flex gap-2">
        <Pressable className="flex-row items-center rounded-full p-4 bg-white-100 gap-2 flex-1">
          <Ionicons name="search-outline" size={20} />
          <Text className=" font-msr text-xl text-gray-100">
            Tìm kiếm quán ăn
          </Text>
        </Pressable>
        <Pressable className="p-4 bg-white-100 rounded-full">
          <Ionicons name="map-outline" size={26} color="#FD8200" />
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default HomeHeader;
