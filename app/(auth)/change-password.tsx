import { checkResetPassworCode } from "@/api/services/auth.service";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

const ChangePassword = () => {
  const { appLoading, setAppLoading, setResetpwCode, resetpwCode } = useAuth();

  const [form, setForm] = useState({
    token: resetpwCode,
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    key: "newPassword" | "confirmPassword",
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSendCode = async () => {
    setAppLoading(true);
    try {
      const data = await checkResetPassworCode(form);
      console.log(data);
      router.push("/");
    } catch (error: any) {
      console.log(error.response);
    } finally {
      setAppLoading(false);
      setResetpwCode("");
    }
  };

  return (
    <View className="flex-1 px-6 py-10 gap-6 absolute w-full  bg-white-100 top-[200] rounded-t-3xl -mt-6">
      <Text className="text-xl text-center font-msr-ebold">
        Đặt lại mật khẩu
        {/* <Text className="text-orange-100">
          Chúng mình sẽ gửi mã 6 chữ số về hòm thư của bạn
        </Text> */}
      </Text>
      <CustomInput
        placeholder="Nhập mật khẩu mới"
        value={form.newPassword}
        onChangeText={(text) => handleChange("newPassword", text)}
        label="Mật khẩu mới"
      />
      <CustomInput
        placeholder="Xác nhận mật khẩu"
        value={form.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
        label="Xác nhận mật khẩu"
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

export default ChangePassword;
