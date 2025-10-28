import { CreatePostProps } from "@/type";
import { socialApi } from "../api";
import { ENDPOINTS } from "../constants";

export const savePost = async (body: CreatePostProps): Promise<any> => {
  try {
    const response = await socialApi.post(ENDPOINTS.CREATE_REVIEW, body);
    return response?.data;
  } catch (err) {
    console.log("Error at creating new review: ", err);
  }
};

export const getPostByRestaurantId = async (id: number): Promise<any> => {
  try {
    const response = await socialApi.get(ENDPOINTS.GET_POSTS_BY_RESTAURANT_ID, {
      params: id,
    });

    return response?.data;
  } catch (err) {
    console.log("Error at getting posts by restaurant id: ", err);
  }
};
