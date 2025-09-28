import { TabBarIconProps } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import cn from "clsx";
import { Slot, Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="flex min-w-20 items-center justify-center min-h-full gap-1 mt-12">
    <Ionicons name={icon} size={24} color={focused ? "#FE8C00" : "#5D5F6D"} />
    <Text
      className={cn(
        "text-xs font-msr-bold",
        focused ? "text-orange-200" : "text-gray-100"
      )}
    >
      {title}
    </Text>
  </View>
);

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Trang chủ"
              icon={"home-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Tìm kiếm"
              icon={"search-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Yêu thích"
              icon={"heart-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Cá nhân"
              icon={"person-outline"}
              focused={focused}
            />
          ),
        }}
      />
      <Slot />
    </Tabs>
  );
};

export default _layout;
