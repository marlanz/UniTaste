import { router } from "expo-router";
import React from "react";
import { Button, Text, View } from "react-native";

export default function ServiceUnavailableScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-semibold mb-3 text-center">
        Service Unavailable
      </Text>
      <Text className="text-gray-600 text-center mb-6">
        Our servers are temporarily unavailable. Please try again later.
      </Text>
      <Button title="Retry" onPress={() => router.replace("/")} />
    </View>
  );
}
