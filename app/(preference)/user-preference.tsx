import { createUserPreference } from "@/api/services/auth.service";
import CustomHorizontalList from "@/components/CustomHorizontalList";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

// === Data ===
const preferredPlaces = [
  { id: 1, name: "Cà phê" },
  { id: 2, name: "Trà sữa" },
  { id: 3, name: "Nhà hàng chay" },
  { id: 4, name: "Quán ăn vặt" },
  { id: 5, name: "Nhà hàng hải sản" },
  { id: 6, name: "Quán nhậu" },
  { id: 7, name: "Tiệm bánh ngọt" },
  { id: 8, name: "Quán phở" },
  { id: 9, name: "Quán bún bò" },
  { id: 10, name: "Quán lẩu nướng" },
];

const preferredPrice = [
  { id: 1, name: "Giá dễ chịu" },
  { id: 2, name: "Giá trung bình" },
  { id: 3, name: "Giá cao cấp" },
];
const preferredLocations = [
  { id: 1, name: "Quận 1" },
  { id: 2, name: "Quận 3" },
  { id: 3, name: "Quận 4" },
  { id: 4, name: "Quận 5" },
  { id: 5, name: "Quận 6" },
  { id: 6, name: "Quận 7" },
  { id: 7, name: "Quận 8" },
  { id: 8, name: "Quận 10" },
  { id: 9, name: "Quận 11" },
  { id: 10, name: "Quận 12" },
  { id: 11, name: "Quận Bình Tân" },
  { id: 12, name: "Quận Bình Thạnh" },
  { id: 13, name: "Quận Gò Vấp" },
  { id: 14, name: "Quận Phú Nhuận" },
  { id: 15, name: "Thủ Đức" },
  { id: 16, name: "Huyện Bình Chánh" },
  { id: 17, name: "Huyện Cần Giờ" },
  { id: 18, name: "Huyện Củ Chi" },
  { id: 19, name: "Huyện Hóc Môn" },
  { id: 20, name: "Huyện Nhà Bè" },
  { id: 21, name: "Quận Tân Bình" },
  { id: 22, name: "Quận Tân Phú" },
  { id: 23, name: "Quận Bình Tân" },
];

const goingWith = [
  { id: 1, name: "Một mình" },
  { id: 2, name: "Người yêu" },
  { id: 3, name: "Bạn bè" },
  { id: 4, name: "Gia đình" },
  { id: 5, name: "Đồng nghiệp" },
  { id: 6, name: "Nhóm lớn" },
  { id: 7, name: "Trẻ em" },
  { id: 8, name: "Khách hàng" },
  { id: 9, name: "Người lạ" },
  { id: 10, name: "Thú cưng" },
];
const purposes = [
  { id: 1, name: "Hẹn hò" },
  { id: 2, name: "Sinh nhật" },
  { id: 3, name: "Liên hoan" },
  { id: 4, name: "Ăn trưa nhanh" },
  { id: 5, name: "Họp nhóm" },
  { id: 6, name: "Thư giãn cuối tuần" },
  { id: 7, name: "Công tác" },
  { id: 8, name: "Gặp đối tác" },
  { id: 9, name: "Tụ tập bạn bè" },
  { id: 10, name: "Uống cà phê trò chuyện" },
];
const visitTimes = [
  { id: 1, name: "Sáng sớm (5:00 - 8:00)" },
  { id: 2, name: "Buổi sáng (8:00 - 11:00)" },
  { id: 3, name: "Buổi trưa (11:00 - 13:00)" },
  { id: 4, name: "Buổi chiều (13:00 - 17:00)" },
  { id: 5, name: "Chiều tối (17:00 - 19:00)" },
  { id: 6, name: "Buổi tối (19:00 - 22:00)" },
  { id: 7, name: "Đêm muộn (22:00 - 1:00)" },
  { id: 8, name: "Cả ngày cuối tuần" },
  { id: 9, name: "Trong giờ làm việc" },
  { id: 10, name: "Sau giờ làm việc" },
];

const Preference = () => {
  const { user, setAppLoading, appLoading } = useAuth();

  const [preferences, setPreferences] = useState({
    userId: user?.userId,
    preferredPlaceTypes: "",
    preferredPriceRange: "",
    preferredLocation: "",
    goingWith: "",
    purpose: "",
    requiredFeatures: "",
    note: "có thể ở gần làng đại học tphcm cũng được",
    venueAtmosphere: "cổ điển",
    cuisineType: "Việt",
    visitTime: "",
  });

  // handle select / deselect
  const handleSelect = (
    section: keyof typeof preferences,
    itemName: string
  ) => {
    setPreferences((prev) => {
      const currentValue = prev[section];

      // ensure it's a string
      const current =
        typeof currentValue === "string" && currentValue.length > 0
          ? currentValue.split(", ").filter(Boolean)
          : [];

      const isSelected = current.includes(itemName);
      const updated = isSelected
        ? current.filter((n) => n !== itemName)
        : [...current, itemName];

      return { ...prev, [section]: updated.join(", ") };
    });
  };

  const handleSubmitPreferences = async () => {
    setAppLoading(true);
    try {
      const data = await createUserPreference(preferences);
      console.log(data);
      if (data) {
        router.replace("/");
      }
    } catch (err) {
      console.log("Error at createUserPreference api", err);
    } finally {
      setAppLoading(false);
    }
    console.log(preferences);
  };

  return (
    <View className="flex-1 bg-white-100">
      <View className="items-center justify-center px-4 mt-[60px] pb-8">
        <Text className="font-msr-bold text-2xl">Sở thích tìm kiếm quán</Text>
        <Text className="font-msr-sbold text-base text-center mt-2 text-gray-200 ">
          Để mình có thể hiểu nhu cầu của bạn hơn, mời bạn chọn theo sở thích
          tìm quán của bạn nhé
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        bounces={false} // iOS: prevent overscroll "bounce"
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-5">
          <View className="gap-2">
            <Text className="font-msr-sbold  text-xl ml-5">Quán yêu thích</Text>
            <CustomHorizontalList
              data={preferredPlaces}
              selectedItems={preferences.preferredPlaceTypes}
              onSelect={(name) => handleSelect("preferredPlaceTypes", name)}
            />
          </View>
          <View className="gap-2">
            <Text className="font-msr-sbold  text-xl ml-5">
              Mức giá yêu thích
            </Text>
            <CustomHorizontalList
              data={preferredPrice}
              selectedItems={preferences.preferredPriceRange}
              onSelect={(name) => handleSelect("preferredPriceRange", name)}
            />
          </View>
          <View className="gap-2">
            <Text className="font-msr-sbold  text-xl ml-5">
              Địa điểm yêu thích
            </Text>
            <CustomHorizontalList
              data={preferredLocations}
              selectedItems={preferences.preferredLocation}
              onSelect={(name) => handleSelect("preferredLocation", name)}
            />
          </View>
          <View className="gap-2">
            <Text className="font-msr-sbold  text-xl ml-5">
              Bạn muốn đi với ai?
            </Text>
            <CustomHorizontalList
              data={goingWith}
              selectedItems={preferences.goingWith}
              onSelect={(name) => handleSelect("goingWith", name)}
            />
          </View>
          <View className="gap-2">
            <Text className="font-msr-sbold  text-xl ml-5">
              Bạn đi với mục đích gì?
            </Text>
            <CustomHorizontalList
              data={purposes}
              selectedItems={preferences.purpose}
              onSelect={(name) => handleSelect("purpose", name)}
            />
          </View>
          <View className="gap-2">
            <Text className="font-msr-sbold  text-xl ml-5">
              Bạn hay đi vào giờ nào?
            </Text>
            <CustomHorizontalList
              data={visitTimes}
              selectedItems={preferences.visitTime}
              onSelect={(name) => handleSelect("visitTime", name)}
            />
          </View>
        </View>
      </ScrollView>
      <View className="show-direction-container absolute bottom-0 bg-white-100 p-5 w-full flex-row items-center justify-between shadow-detail">
        <Pressable
          className="p-4 rounded-[8px] bg-orange-200 items-center justify-center mb-3 flex-1"
          onPress={handleSubmitPreferences}
          disabled={appLoading}
        >
          <Text className="text-base font-msr-sbold text-white-100">
            Lưu sở thích
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Preference;
