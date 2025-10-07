import { CustomInputProps } from "@/type";
import Ionicons from "@expo/vector-icons/Ionicons";
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
    <>
      {label ? (
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
              "p-4 font-msr-medium text-base border border-gray-100 rounded-xl height-[50px]",
              isFocused ? "border-orange-200" : "border-gray-100"
            )}
          />
        </View>
      ) : (
        <>
          <View
            className={cn(
              "flex-row items-center justify-center rounded-full px-4 bg-white-100"
            )}
          >
            {/* 👈 Start Icon */}
            <Ionicons name="search-outline" size={20} />

            {/* Input */}
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              autoComplete="off"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              placeholderTextColor="#8F9098"
              className="flex-1 px-2 py-3 font-msr text-xl"
            />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default CustomInput;
