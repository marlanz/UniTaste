import { restaurantApi } from "../api";
import { ENDPOINTS } from "../constants";

export type SearchParams = {
  name: string;
  currentPage: number;
  pageSize: number;
};

export const getAllRestaurants = async (): Promise<any> => {
  try {
    const response = await restaurantApi.get(
      `${ENDPOINTS.GET_ALL_RESTAURANTS}`
    );
    return response.data?.restaurants;
  } catch (error: any) {
    console.log("Error fetching getAllRestaurants: ", error);
    throw new Error(
      error.response?.data?.message || "Failed to get all restaurants"
    );
  }
};

export const searchRestaurants = async (params: SearchParams): Promise<any> => {
  const { name, currentPage, pageSize } = params;
  try {
    const response = await restaurantApi.get(ENDPOINTS.SEARCH_RESTAURANTS_DB, {
      params: { name, currentPage, pageSize },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching searchRestaurants: ", error);
    throw new Error(
      error.response?.data?.message || "Failed to search restaurants"
    );
  }
};
