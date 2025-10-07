import { signUp } from "@/api/services/auth.service";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Register = () => {
  const { appLoading, setAppLoading, setTempMail } = useAuth();

  // type RegisterForm = RegisterProps & {confirmPassword: string}

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    passwordHash: "",
    confirmPassword: "",
    birthDate: "2025-10-01",
  });

  const handleChange = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAccount = async () => {
    // const {confirmPassword, ...body} = form
    setAppLoading(true);
    try {
      const data = await signUp(form);
      console.log(data);
      if (data.status === true) {
        setTempMail(form.email);
        router.push("/verify");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setAppLoading(false);
    }
  };

  return (
    <View className="px-6 py-10 gap-6 bg-white-100 rounded-t-3xl -mt-6">
      <Text className="text-2xl text-center font-msr-ebold">
        Chào mừng bạn đến với{"\n"}
        <Text className="text-orange-100">Cộng Đồng Ẩm Thực 🍔</Text>
      </Text>

      <CustomInput
        label="Họ và Tên"
        placeholder="Nhập họ và tên"
        value={form.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
      />

      <CustomInput
        label="Địa chỉ Email"
        placeholder="Nhập địa chỉ email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />

      <CustomInput
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        secureTextEntry
        value={form.passwordHash}
        onChangeText={(text) => handleChange("passwordHash", text)}
      />

      <CustomInput
        label="Xác nhận mật khẩu"
        placeholder="Nhập lại mật khẩu"
        secureTextEntry
        value={form.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />

      {/* <View className="flex-row items-center gap-4">
        <Checkbox />
        <Text className="font-msr text-sm flex-1">
          Tôi đã đồng ý với{" "}
          <Text className="font-msr-sbold text-orange-200">
            Điều khoản sử dụng
          </Text>{" "}
          và{"\n"}
          <Text className="font-msr-sbold text-orange-200">
            Chính sách Bảo mật
          </Text>
        </Text>
      </View> */}

      <View className="flex items-center gap-4">
        <CustomButton
          title="Đăng ký"
          onPress={() => handleCreateAccount()}
          isLoading={appLoading}
        />
        <View className="flex-row">
          <Text className="text-gray-200 font-msr-sbold text-sm">
            Đã có tài khoản?
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text className="text-orange-200 underline ml-2 font-msr-sbold text-sm">
              Đăng nhập ngay
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;
