import { restaurantApi } from "../api";
import { ENDPOINTS } from "../constants";

export type SearchParams = {
  name: string;
  currentPage: number;
  pageSize: number;
};

export type RestaurantParams = {
  categoryId: number;
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

export const getRestaurantDetail = async (id: number): Promise<any> => {
  try {
    const response = await restaurantApi.get(ENDPOINTS.GET_RESTAURANT_DETAIL, {
      params: { id },
    });
    return response.data;
  } catch (error: any) {
    console.log("Error fetching restaurant detail: ", error);
    throw new Error(
      error.response?.data?.message || "Failed to get restaurant detail"
    );
  }
};

export const getRestaurantByCategory = async (
  params: RestaurantParams
): Promise<any> => {
  const { categoryId, currentPage, pageSize } = params;
  try {
    const response = await restaurantApi.get(
      ENDPOINTS.GET_RESTAURANT_BY_CATEGORY,
      {
        params: { categoryId, currentPage, pageSize },
      }
    );
    return response?.data;
  } catch (err) {
    console.log("Error fetching restaurant by category: ", err);
  }
};
