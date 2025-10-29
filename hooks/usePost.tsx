import { getAuthorName } from "@/api/services/auth.service";
import {
  getAllPosts,
  getPostByRestaurantId,
  savePost,
} from "@/api/services/social.service";
import { CreatePostProps, Post } from "@/type";
import { useCallback, useState } from "react";

const usePost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const createPost = useCallback(async (body: CreatePostProps) => {
    setLoading(true);
    setError(null);
    try {
      const data = await savePost(body);
      return data;
    } catch (err: any) {
      console.log("Failed to create new post: ", err.message);
      setError("Failed to create new post");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPostsByRestaurantId = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPostByRestaurantId(id);
      console.log(data);
      setPosts(data);
    } catch (err: any) {
      console.log("error fetching post by restaurant: ", err?.message);
      setError("Failed to fetch post by restaurant");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAllPost = useCallback(
    async (currentPage: number, pageSize: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllPosts(currentPage, pageSize);
        setPosts((prev) =>
          currentPage === 1 ? data.items : [...prev, ...data.items]
        );

        return data.items;
      } catch (err: any) {
        console.log("❌ Failed to fetch post:", err);
        setError("Failed to fetch post");
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchAuhthorName = useCallback(async (id: number) => {
    try {
      const data = await getAuthorName(id);
      console.log(data.fullName);
      return data.fullName;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createPost,
    fetchPostsByRestaurantId,
    fetchAllPost,
    fetchAuhthorName,
    posts,
    loading,
    error,
  };
};

export default usePost;
