import { User } from "@/providers/AuthProvider";
import { getFromStorage, removeFromStorage } from "@/utils/storage";
import axios from "axios";
import { router } from "expo-router";
import { Platform } from "react-native";

const useProductionAPI = true;

const productionAPI = process.env.EXPO_PUBLIC_API_PRODUCTION_URL;

// Dynamic base URL function
const getBaseUrl = (service: "auth" | "restaurants") => {
  const baseUrls = {
    auth: useProductionAPI
      ? "https://userservice-5qvn.onrender.com/api"
      : Platform.OS === "android"
        ? "http://10.0.2.2:5001/api"
        : "http://localhost:5001/api",

    restaurants: useProductionAPI
      ? "https://restaurantservice-2dyf.onrender.com/api"
      : Platform.OS === "android"
        ? "http://10.0.2.2:5003/api"
        : "http://localhost:5003/api",
  };

  return baseUrls[service];
};

export const API_BASE_URLS = {
  auth: getBaseUrl("auth"),
  restaurants: getBaseUrl("restaurants"),
};

function createApiClient(service: keyof typeof API_BASE_URLS) {
  const api = axios.create({
    baseURL: API_BASE_URLS[service],
  });

  // Request interceptor
  api.interceptors.request.use(
    async (config) => {
      const storeUser = await getFromStorage<User>("authUser"); // Fixed storage key
      if (storeUser?.token) {
        config.headers.Authorization = `Bearer ${storeUser.token}`; // Fixed template string
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      if (status === 401) {
        // Fixed status code (401 Unauthorized)
        await removeFromStorage("authUser");
        router.replace("/login");
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const authApi = createApiClient("auth");
export const restaurantApi = createApiClient("restaurants"); // Fixed variable name
