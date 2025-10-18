import CustomDivider from "@/components/CustomDivider";
import { images } from "@/constants";
import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <View className="flex-1 bg-white-100">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <SafeAreaView>
        <View className="user-info mt-[30px] justify-center w-full items-center">
          <Text className="font-msr-sbold text-3xl">Trang cá nhân</Text>
          <View className="mt-[30px] justify-center items-center">
            <Image
              source={images.profile}
              resizeMode="stretch"
              className="size-[110px] rounded-full"
            />
            <View className="justify-center items-center flex-col gap-1 mt-3">
              <Text className="text-2xl font-msr-bold">{user?.fullName}</Text>
              <Text className="text-base font-msr-medium">{user?.email}</Text>
            </View>
            <Pressable className="mt-5">
              <Text className="font-msr-sbold text-base underline">
                Chỉnh sửa hồ sơ
              </Text>
            </Pressable>
            <View className="action-btn mt-10 px-6">
              <Pressable className="flex-row items-center justify-between w-full">
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="heart-outline" size={24} />
                  <Text className="font-msr-medium text-base">
                    Danh sách quán yêu thích
                  </Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={24} />
              </Pressable>
              <CustomDivider />
              <Pressable className="flex-row items-center justify-between w-full">
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="star-outline" size={24} />
                  <Text className="font-msr-medium text-base">
                    Chương trình ưu đãi
                  </Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={24} />
              </Pressable>
              <CustomDivider />
              <Pressable className="flex-row items-center justify-between w-full">
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="navigate-circle-outline" size={24} />
                  <Text className="font-msr-medium text-base">
                    Truy cập vị trí
                  </Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={24} />
              </Pressable>
              <CustomDivider />
              <Pressable className="flex-row items-center justify-between w-full">
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="moon-outline" size={24} />
                  <Text className="font-msr-medium text-base">Chế độ tối</Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={24} />
              </Pressable>
              <CustomDivider />
              <Pressable className="flex-row items-center justify-between w-full">
                <View className="flex-row gap-2 items-center">
                  <Ionicons name="notifications-outline" size={24} />
                  <Text className="font-msr-medium text-base">
                    Tùy chọn thông báo
                  </Text>
                </View>
                <Ionicons name="chevron-forward-outline" size={24} />
              </Pressable>
            </View>
            <Pressable
              className="flex-row items-center gap-2 mt-[52px]"
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={24} color={"#EB4F26"} />
              <Text className="font-msr-medium text-[18px] text-orange-100">
                Đăng xuất tài khoản
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
