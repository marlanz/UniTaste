import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Rating = () => {
  return (
    <SafeAreaView>
      <Pressable onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} />
      </Pressable>
      <Text>index</Text>
    </SafeAreaView>
  );
};

export default Rating;
