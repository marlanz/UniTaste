import usePost from "@/hooks/usePost";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Reviews = () => {
  const { posts, fetchAllPost, loading } = usePost();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getAllPost = async () => {
      try {
        await fetchAllPost(currentPage, 10);
        console.log(posts);
      } catch (err) {
        console.log(err);
      }
    };
    getAllPost();
  }, []);
  return (
    <View className="flex-1 bg-white-100">
      <SafeAreaView>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.postId.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.authorUserId}</Text>
            </View>
          )}
          ListHeaderComponent={() => {
            return (
              <View>
                <Text>Bài viết gần đây</Text>
              </View>
            );
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default Reviews;
