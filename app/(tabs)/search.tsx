import { useRestaurant } from "@/hooks/useRestaurant";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

const Search = () => {
  const { restaurants } = useRestaurant();

  return (
    <View className="bg-white-100 flex-1">
      <LinearGradient
        colors={["#FD8200", "#EB4F26"]}
        start={{ x: 0, y: 0 }} // top-left
        end={{ x: 1, y: 1 }} // bottom-right
        style={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 35 }}
      >
        <View className="flex-col gap-1">
          <Text className="font-msr-medium text-base text-white-100">
            Vị trí hiện tại của bạn
          </Text>
          <Text className="font-msr-bold text-base text-white-100">
            Long Thạnh Mỹ, Thành phố Thủ Đức
          </Text>
        </View>
      </LinearGradient>
      <View className="flex-row items-center justify-between flex gap-2 px-5 absolute top-[115] z-10">
        <Pressable className="flex-row items-center p-4 bg-white-100 rounded-[15px] gap-2 flex-1 shadow-figma">
          <Ionicons name="search-outline" size={20} />
          <Text className=" font-msr text-xl text-gray-100">
            Tìm kiếm quán ăn
          </Text>
        </Pressable>
        <Pressable className="p-4 bg-white-100 rounded-[15px] shadow-figma">
          <Ionicons name="map-outline" size={26} color="#FD8200" />
        </Pressable>
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.restaurantId.toString()}
        renderItem={({ item }) => (
          <View className="flex-row gap-2">
            <Image
              source={{ uri: item.coverImageUrl }}
              resizeMode="stretch"
              className="w-[120px] h-[95px] rounded-[10px]"
            />
            <View className="flex-col justify-between">
              <View className="gap-1">
                <Text
                  className="font-msr-sbold text-base max-w-[228px]"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                <Text
                  className="font-msr-medium text-sm text-gray-100 max-w-[228px]"
                  numberOfLines={2}
                >
                  {item.address}
                </Text>
              </View>
              <View>
                <View className="flex-row items-center gap-5">
                  <Text className="text-xs text-orange-200 font-msr-sbold px-2 py-1 border border-orange-200 rounded-lg">
                    {"Giá dễ chịu"}
                  </Text>
                  <View className="flex-row gap-2 items-center">
                    <Ionicons name="star" size={16} color={"#FD8200"} />
                    <Text className="font-msr-sbold text-sm">
                      {item.googleRating}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        contentContainerClassName="px-4 mt-[44px] gap-y-6"
      />
    </View>
  );
};

export default Search;
