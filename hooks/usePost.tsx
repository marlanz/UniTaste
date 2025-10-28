import { getPostByRestaurantId, savePost } from "@/api/services/social.service";
import { CreatePostProps } from "@/type";
import { useCallback, useState } from "react";

const usePost = () => {
  const [posts, setPosts] = useState([]);
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

  return { createPost, fetchPostsByRestaurantId, posts, loading, error };
};

export default usePost;
