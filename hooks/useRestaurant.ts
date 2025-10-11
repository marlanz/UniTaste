import {
  getAllRestaurants,
  SearchParams,
  searchRestaurants,
} from "@/api/services/restaurant.services";
import { Location, Restaurant } from "@/type";
import { useCallback, useState } from "react";

export const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateDistance = useCallback(
    (loc1: Location, loc2: Location): number => {
      const toRad = (value: number) => (value * Math.PI) / 180;
      const R = 6371;
      const dLat = toRad(loc2.latitude - loc1.latitude);
      const dLon = toRad(loc2.longitude - loc1.longitude);
      const lat1 = toRad(loc1.latitude);
      const lat2 = toRad(loc2.latitude);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return parseFloat((R * c).toFixed(2));
    },
    []
  );

  const toNumber = useCallback((value: string | number | undefined) => {
    const num = parseFloat(String(value));
    return isNaN(num) ? 0 : num;
  }, []);

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllRestaurants();
      setRestaurants((data || []).reverse());
    } catch (err: any) {
      setError(err.message || "Failed to fetch restaurants");
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByNameDB = useCallback(async (params: SearchParams) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchRestaurants(params);
      setRestaurants((prev) =>
        params.currentPage === 1 ? data.items : [...prev, ...data.items]
      );
      return data.items;
    } catch (err: any) {
      console.log("❌ Failed to search restaurants:", err);
      setError("Failed to search restaurants");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleFavorite = async (restaurantId: string) => {};

  const handleResetRestaurants = () => {
    setRestaurants([]);
  };

  return {
    restaurants,
    favorites,
    loading,
    error,
    fetchRestaurants,
    searchByNameDB,
    toggleFavorite,
    calculateDistance,
    toNumber,
    handleResetRestaurants,
  };
};
