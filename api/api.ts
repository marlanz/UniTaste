import { API_BASE_URLS } from "@/api/constants";
import { User } from "@/providers/AuthProvider";
import { getFromStorage, removeFromStorage } from "@/utils/storage";
import axios from "axios";
import { router } from "expo-router";

function createApiClient(service: keyof typeof API_BASE_URLS) {
  const api = axios.create({
    baseURL: API_BASE_URLS[service],
    // timeout: 10000,
  });

  api.interceptors.request.use(
    async (config) => {
      const storedUser = await getFromStorage<User>("authUser");
      if (storedUser?.token) {
        config.headers.Authorization = `Bearer ${storedUser.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        await removeFromStorage("authUser");
        router.replace("/login");
      }
      return Promise.reject(error);
    }
  );

  return api;
}

export const authApi = createApiClient("auth");
export const restaurantsApi = createApiClient("restaurants");
