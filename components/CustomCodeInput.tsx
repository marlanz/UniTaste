import cn from "clsx";
import React, { forwardRef, useState } from "react";
import { TextInput, View } from "react-native";

type CustomCodeInputProps = {
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  value?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

const CustomCodeInput = forwardRef<TextInput, CustomCodeInputProps>(
  ({ onChangeText, secureTextEntry, value, keyboardType }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View>
        <TextInput
          ref={ref}
          maxLength={1} // 👈 only 1 digit
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={"#8F9098"}
          style={{ textAlignVertical: "center" }}
          className={cn(
            "font-msr-sbold text-2xl border rounded-xl size-[48px] text-center",
            isFocused ? "border-orange-200" : "border-gray-100"
          )}
        />
      </View>
    );
  }
);
CustomCodeInput.displayName = "CustomCodeInput";

export default CustomCodeInput;
