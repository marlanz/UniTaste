import { images } from "@/constants";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

const options = [
  {
    title: "Ăn vặt",
    desc: "Lấp bụng lẹ, không chậm trễ",
    key: "đồ ăn nhanh",
    id: 1,
    bg: images.fastfood,
  },
  {
    title: "Bữa chính",
    desc: "Đánh chén no say, quên lối về",
    key: "đồ ăn ",
    id: 2,
    bg: images.bigmeal,
  },
  {
    title: "Giải khát",
    desc: "Một ngụm mát lạnh, tỉnh cả ngày",
    key: "đồ uống",
    id: 3,
    bg: images.drinks,
  },
];

const PlaceSuggestions = () => {
  return (
    <View className="mt-6 pl-4 gap-4">
      <Text className="text-base font-msr-sbold">Bạn muốn đi đâu?</Text>
      <FlatList
        data={options}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image
              source={item.bg}
              className="size-[160px]  rounded-[20px]"
              resizeMode="stretch"
            />
            <View className="absolute inset-0 bg-black/40 rounded-[20px]" />
            <View className="absolute top-[46] left-[16] gap-1">
              <Text className="font-msr-bold text-2xl text-white-100">
                {item.title}
              </Text>
              <Text className="font-msr-medium text-base text-white-100 max-w-[120px]">
                {item.desc}
              </Text>
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-x-3 pr-4"
        bounces={false}
        overScrollMode="never"
      />
    </View>
  );
};

export default PlaceSuggestions;
