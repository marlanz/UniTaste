import { socialApi } from "../api";
import { ENDPOINTS } from "../constants";

type CustomReviewProps = {
  title: string;
  content: string;
  rating: number;
  isReview: boolean;
  visibility: string;
  tags: string;
  restaurantId: number;
};

export const createReview = async (body: CustomReviewProps): Promise<void> => {
  try {
    const response = await socialApi.post(ENDPOINTS.CREATE_REVIEW, body);
    return response?.data;
  } catch (err) {
    console.log("Error at creating new review: ", err);
  }
};
