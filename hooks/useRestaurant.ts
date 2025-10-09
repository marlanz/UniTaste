import { getAllRestaurants } from "@/api/services/restaurant.services";
import { Location, Restaurant } from "@/type";
import { useEffect, useState } from "react";

export const useRestaurant = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateDistance = (loc1: Location, loc2: Location): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // Earth's radius in km
    const dLat = toRad(loc2.latitude - loc1.latitude);
    const dLon = toRad(loc2.longitude - loc1.longitude);

    const lat1 = toRad(loc1.latitude);
    const lat2 = toRad(loc2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return parseFloat(distance.toFixed(2)); // return rounded to 2 decimals
  };

  const toNumber = (value: string | number | undefined) => {
    const num = parseFloat(String(value));
    return isNaN(num) ? 0 : num;
  };

  const fetchRestaurants = async () => {
    console.time("fetchRestaurants");
    setLoading(true);
    setError(null);
    try {
      const data = await getAllRestaurants();
      setRestaurants((data || []).reverse());
    } catch (err: any) {
      setError(err.message || "Failed to fetch restaurants");
    } finally {
      setLoading(false);
      console.timeEnd("fetchRestaurants");
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
    calculateDistance,
    toNumber,
  };
};
