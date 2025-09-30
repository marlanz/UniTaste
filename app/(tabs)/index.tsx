import CustomShopCard from "@/components/CustomShopCard";
import HomeHeader from "@/components/HomeHeader";
import PlaceSuggestions from "@/components/PlaceSuggestions";
import { images } from "@/constants";
import { restaurants } from "@/data/restaurants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

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
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <HomeHeader />
      <PlaceSuggestions />
      <View className="mt-[40px] gap-4">
        <View className="flex-row justify-between items-center  px-4">
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
        <FlatList
          data={restaurants}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CustomShopCard shop={item} isFeatured />}
          horizontal
          contentContainerClassName="gap-x-3 pl-4"
          showsHorizontalScrollIndicator={false}
        />
      </View>
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
      <View className="mt-[40px] gap-4">
        <View className="flex-row justify-between items-center  px-4">
          <Text className="text-base font-msr-sbold">Lấp cái bụng đói</Text>
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
            <CustomShopCard shop={item} isFeatured={false} />
          )}
          horizontal
          contentContainerClassName="gap-x-3 pl-4"
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className="mt-[40px] gap-4">
        <View className="flex-row justify-between items-center  px-4">
          <Text className="text-base font-msr-sbold">Điểm Hẹn Giải Khát</Text>
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
            <CustomShopCard shop={item} isFeatured={false} />
          )}
          horizontal
          contentContainerClassName="gap-x-3 pl-4"
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
