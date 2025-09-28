import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Login = () => {
  return (
    <View className="flex-1 px-6 py-10 gap-6 absolute w-full  bg-white-100 top-[200] rounded-t-3xl -mt-6">
      <Text className="text-2xl  text-center font-msr-ebold">
        Cùng nhau khám phá
        {"\n"}
        <Text className="text-orange-100">những món ngon 🍔</Text>
      </Text>

      <CustomInput
        placeholder="Nhập địa chỉ Email"
        value=""
        onChangeText={() => {}}
        label="Địa chỉ Email"
      />
      <CustomInput
        placeholder="Nhập mật khẩu"
        value=""
        onChangeText={() => {}}
        label="Mật khẩu"
        secureTextEntry={true}
      />
      <TouchableOpacity>
        <Text className="text-orange-200 font-msr-sbold text-sm">
          Quên mật khẩu?
        </Text>
      </TouchableOpacity>
      <View className="flex items-center gap-4">
        <CustomButton title="Đăng nhập" onPress={() => router.push("/")} />
        <View className="flex-row">
          <Text className="text-gray-200 font-msr-sbold text-sm">
            Chưa có tài khoản?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/register");
            }}
          >
            <Text className="text-orange-200 underline ml-2 font-msr-sbold text-sm">
              Đăng kí ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
