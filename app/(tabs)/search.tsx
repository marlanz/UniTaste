import CustomDivider from "@/components/CustomDivider";
import { useMap } from "@/hooks/useMap";
import { useRestaurant } from "@/hooks/useRestaurant";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

const myLocation = {
  latitude: 10.84808,
  longitude: 106.79807,
};

const Search = () => {
  const {
    restaurants,
    sortedRestaurants,

    calculateDistance,
    toNumber,
    searchByNameDB,
    loading,
    handleResetRestaurants,
    parseRestaurantPriceRange,
    parseRestaurantCategory,
  } = useRestaurant();

  const { address } = useMap();

  const [search, setSearch] = useState({
    name: "",
    currentPage: 1,
  });

  const [hasMore, setHasMore] = useState(true);

  const handleChange = (value: string) => {
    setSearch({ name: value, currentPage: 1 });
    setHasMore(true);
    // handleResetRestaurants();
  };

  const handleSearch = async () => {
    if (!search.name.trim()) {
      return;
    }
    setHasMore(true);
    handleResetRestaurants();
    await searchByNameDB({
      name: search.name,
      currentPage: search.currentPage,
      pageSize: 10,
    });
    console.log(restaurants);
  };

  const handleLoadMore = async () => {
    if (loading || !hasMore || restaurants.length === 0) return;

    const nextPage = search.currentPage + 1;

    const data = await searchByNameDB({
      name: search.name,
      currentPage: nextPage,
      pageSize: 10,
    });

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setSearch((prev) => ({ ...prev, currentPage: nextPage }));
    }
  };
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
          <Text
            className="font-msr-bold text-base text-white-100"
            numberOfLines={1}
          >
            {address}
          </Text>
        </View>
      </LinearGradient>
      <View className="flex-row items-center justify-between flex gap-2 px-5 absolute top-[115] z-10">
        <View className="flex-row items-center p-4 bg-white-100 rounded-[15px] gap-3 flex-1 shadow-figma">
          <Ionicons name="search-outline" size={20} />
          <TextInput
            placeholder="Tìm kiếm quán ăn"
            className="font-msr-medium text-xl flex-1 pb-1"
            value={search.name}
            onChangeText={handleChange}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>
        {/* <Pressable
          className="p-4 bg-white-100 rounded-[15px] shadow-figma"
          onPress={() => router.push("/map")}
        >
          <Ionicons name="map-outline" size={26} color="#FD8200" />
        </Pressable> */}
      </View>
      <FlatList
        data={restaurants}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.restaurantId.toString()}
        onEndReached={search.name ? handleLoadMore : undefined}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Pressable
            className="flex-col gap-2"
            onPress={() =>
              router.push({
                pathname: "/(search)/[id]",
                params: { id: String(item.restaurantId) },
              })
            }
          >
            <View className="flex-row gap-3">
              <View className="relative">
                <Image
                  source={{
                    uri: item.coverImageUrl || "https://placehold.co/100",
                  }}
                  resizeMode="stretch"
                  className="w-[100px] h-[70px]  rounded-[10px]"
                />
                <View className="flex-row gap-2 items-center absolute bg-white-100 rounded-bl-[10px] rounded-tr-[10px] px-2 bottom-0">
                  <Ionicons name="star" size={14} color={"#FD8200"} />
                  <Text className="font-msr-sbold text-sm">
                    {item.googleRating}
                  </Text>
                </View>
              </View>
              <View className="flex-col justify-between flex-1">
                <View className="gap-1 ">
                  <Text
                    className="font-msr-sbold text-[18px] "
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  <Text
                    className="font-msr-medium text-base text-gray-100 max-w-[228px]"
                    numberOfLines={2}
                  >
                    {item.address}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row justify-between pr-4">
              <View className="flex-row items-center gap-3">
                <View
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: "rgb(253,130,0,0.1)" }}
                >
                  <Text className="text-sm text-orange-200 font-msr-sbold ">
                    {parseRestaurantCategory(item?.categories[0]?.categoryId)}
                  </Text>
                </View>
                <View className="px-2 py-1 border border-orange-200 rounded-full flex-row items-center gap-2">
                  <Ionicons name="cash-outline" size={12} color={"#FD8200"} />
                  <Text className="text-sm text-orange-200 font-msr-sbold ">
                    {parseRestaurantPriceRange(item?.priceRangeId)}
                  </Text>
                </View>
              </View>
              <View className="flex-row items-center gap-1">
                <Ionicons name="compass-outline" size={16} />
                <Text className="font-msr-medium text-sm ">
                  Cách{" "}
                  {calculateDistance(myLocation, {
                    latitude: toNumber(item.latitude),
                    longitude: toNumber(item.longitude),
                  })}{" "}
                  km
                </Text>
              </View>
            </View>
          </Pressable>
        )}
        contentContainerClassName="px-4 mt-[44px]"
        ItemSeparatorComponent={() => <CustomDivider />}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListFooterComponent={
          loading ? <Text className="text-center py-4">Đang tải...</Text> : null
        }
        ListEmptyComponent={() =>
          !loading && (
            <View className="items-center justify-center py-10">
              <Ionicons name="search-outline" size={48} color="#9CA3AF" />
              <Text className="font-msr-medium text-lg text-gray-100 mt-4">
                Không tìm thấy kết quả
              </Text>
              {search.name && (
                <Text className="font-msr-regular text-sm text-gray-100 mt-2">
                  Không có quán ăn nào với từ khóa {search.name}
                </Text>
              )}
            </View>
          )
        }
      />
    </View>
  );
};

export default Search;
