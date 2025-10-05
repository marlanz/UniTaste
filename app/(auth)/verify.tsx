import CustomButton from "@/components/CustomButton";
import CustomCodeInput from "@/components/CustomCodeInput";
import { useAuth } from "@/providers/AuthProvider";
import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

const Verify = () => {
  const { tempMail, appLoading, setAppLoading } = useAuth();

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
    if (!text && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleCheckCode = async () => {
    inputRefs[inputRefs.length - 1].current?.blur();
    const finalCode = code.join("");
    const body = { email: tempMail, otpCode: finalCode };
    console.log(body);
    // setAppLoading(true);
    // try {
    //   const data = await verifyAccount(body);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setAppLoading(false);
    // }
  };

  return (
    <View className="flex-1 px-6 py-10 gap-6 absolute w-full bg-white-100 top-[200] rounded-t-3xl -mt-6">
      <Text className="text-xl text-center font-msr-ebold">
        Nhập mã xác nhận 6 số được gửi tới
        <Text className="text-orange-100">
          {"\n"}
          {tempMail}
        </Text>
      </Text>

      <View className="flex-row justify-between">
        {code.map((digit, idx) => (
          <CustomCodeInput
            key={idx}
            ref={inputRefs[idx]}
            value={digit}
            onChangeText={(text) => handleChange(text, idx)}
            keyboardType="numeric"
          />
        ))}
      </View>

      <View className="flex items-center gap-4 mt-4">
        <CustomButton title="Xác nhận" onPress={() => handleCheckCode()} />
      </View>
    </View>
  );
};

export default Verify;
