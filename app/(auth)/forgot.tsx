import { sendResetPassworCode } from "@/api/services/auth.service";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";

const Forgot = () => {
  const { appLoading, setAppLoading, setTempMail } = useAuth();

  const [form, setForm] = useState({
    email: "",
  });

  const handleChange = (key: "email" | "pw", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSendCode = async () => {
    setAppLoading(true);
    try {
      await sendResetPassworCode(form.email);
      setTempMail(form.email);
      router.replace("/verify");
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setAppLoading(false);
    }
    // console.log(form.email);
  };

  return (
    <View className="flex-1 px-6 py-10 gap-6 absolute w-full  bg-white-100 top-[200] rounded-t-3xl -mt-6">
      <Pressable
        className="flex-row gap-1 items-center border-b border-orange-200 self-start"
        onPress={() => router.back()}
      >
        <Ionicons
          name="chevron-back-outline"
          size={16}
          color={"#FD8200"}
          className=""
        />
        <Text className="text-base font-msr-sbold text-orange-200 ">
          Về đăng nhập
        </Text>
      </Pressable>
      <Text className="text-xl text-center font-msr-ebold">
        Mời bạn nhập địa chỉ email {"\n"}{" "}
        <Text className="text-orange-100">
          Chúng mình sẽ gửi mã 6 chữ số về hòm thư của bạn
        </Text>
      </Text>

      <CustomInput
        placeholder="Nhập địa chỉ Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        label="Địa chỉ Email"
      />

      <View className="flex items-center gap-4 ">
        <CustomButton
          title="Xác nhận"
          onPress={() => handleSendCode()}
          isLoading={appLoading}
        />
      </View>
    </View>
  );
};

export default Forgot;
