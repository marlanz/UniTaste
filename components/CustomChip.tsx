import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

type CustomChipProps = {
  title: string;
  leftIcon?: string;
};

const CustomChip = ({ title, leftIcon }: CustomChipProps) => {
  return (
    <View
      className="px-3 py-1 rounded-full"
      style={{ backgroundColor: "rgb(253,130,0,0.1)" }}
    >
      {leftIcon && <Ionicons name="cash-outline" size={12} color={"#FD8200"} />}
      <Text className="text-sm text-orange-200 font-msr-sbold ">{title}</Text>
    </View>
  );
};

export default CustomChip;
