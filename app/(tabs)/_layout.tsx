import { images } from "@/constants";
import { TabBarIconProps } from "@/type";
import cn from "clsx";
import { Slot, Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View className="flex min-w-20 items-center justify-center min-h-full gap-1 mt-12">
    <Image
      source={icon}
      className="size-6"
      resizeMode="contain"
      tintColor={focused ? "#FD8200" : "#8F9098"}
    />
    <Text
      className={cn(
        "text-sm font-bold",
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
              icon={images.home}
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
              icon={images.search}
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
              icon={images.favorites}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cá nhân" icon={images.user} focused={focused} />
          ),
        }}
      />
      <Slot />
    </Tabs>
  );
};

export default _layout;
