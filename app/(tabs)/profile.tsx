import { useAuth } from "@/providers/AuthProvider";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };
  return (
    <SafeAreaView>
      <Text>profile</Text>
      <Pressable onPress={() => handleLogout()}>
        <Text>log out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Profile;
