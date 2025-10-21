import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Login = () => {
  const { appLoading, signIn, setAppLoading, newUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setAppLoading(true);
    try {
      await signIn(form.email, form.password);
      if (newUser) {
        router.replace("/(preference)/user-preference");
        return;
      }
      router.replace("/");
    } catch (err) {
      console.log("Login failed", err);
    } finally {
      setAppLoading(false);
    }
    // console.log("hello");
  };

  useEffect(() => {
    console.log("is user new here?: ", newUser);
  }, []);

  return (
    <View className="flex-1 px-6 py-10 gap-6 absolute w-full  bg-white-100 top-[200] rounded-t-3xl -mt-6">
      <Text className="text-2xl  text-center font-msr-ebold">
        Cùng nhau khám phá
        {"\n"}
        <Text className="text-orange-100">những món ngon 🍔</Text>
      </Text>

      <CustomInput
        placeholder="Nhập địa chỉ Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        label="Địa chỉ Email"
      />

      <CustomInput
        placeholder="Nhập mật khẩu"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        label="Mật khẩu"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={() => router.push("/forgot")}>
        <Text className="text-orange-200 font-msr-sbold text-sm">
          Quên mật khẩu?
        </Text>
      </TouchableOpacity>
      <View className="flex items-center gap-4">
        <CustomButton
          title="Đăng nhập"
          onPress={handleSubmit}
          isLoading={appLoading}
        />
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
