import { CustomInputProps } from "@/type";
import cn from "clsx";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full gap-2">
      <Text className="text-sm font-msr-bold">{label}</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={"#8F9098"}
        className={cn(
          "p-4 font-msr text-base border border-gray-100 rounded-xl",
          isFocused ? "border-orange-200" : "border-gray-100"
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomInput;
