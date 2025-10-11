import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Map = () => {
  return (
    <SafeAreaView>
      <Pressable onPress={() => router.back()}>
        <Text>tro ve</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Map;
