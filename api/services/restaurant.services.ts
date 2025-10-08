import { restaurantApi } from "../api";
import { ENDPOINTS } from "../constants";

export const getAllRestaurants = async (): Promise<any> => {
  try {
    const response = await restaurantApi.get(
      `${ENDPOINTS.GET_ALL_RESTAURANTS}`
    );
    return response.data?.restaurants;
  } catch (error) {
    console.log(error);
  }
};
