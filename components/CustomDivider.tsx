import React from "react";
import { View } from "react-native";

const CustomDivider = () => {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: "#E5E5E5", // màu xám nhạt
        marginVertical: 16, // tạo khoảng cách giữa các card
      }}
    />
  );
};

export default CustomDivider;
