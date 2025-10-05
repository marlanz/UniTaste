import CustomButton from "@/components/CustomButton";
import CustomCodeInput from "@/components/CustomCodeInput";
import { useAuth } from "@/providers/AuthProvider";
import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

const Verify = () => {
  const { tempMail } = useAuth();

  // Store OTP digits
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // Refs for each input
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
      inputRefs[index + 1].current?.focus(); // move forward
    }
    if (!text && index > 0) {
      inputRefs[index - 1].current?.focus(); // move back on delete
    }
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
        <CustomButton
          title="Xác nhận"
          onPress={() => {
            const finalCode = code.join("");
            console.log("OTP entered:", finalCode);
          }}
        />
      </View>
    </View>
  );
};

export default Verify;
