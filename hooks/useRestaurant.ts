import { getAllRestaurants } from "@/api/services/restaurant.services";
import { Restaurant } from "@/type";
import { useEffect, useState } from "react";

export const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
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
  };

  const toggleFavorite = async (restaurantId: string) => {};

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return {
    restaurants,
    favorites,
    loading,
    error,
    fetchRestaurants,
    toggleFavorite,
  };
};
