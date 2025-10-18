import { useRestaurant } from "@/hooks/useRestaurant";
import React, { useEffect } from "react";
import CustomHomeRestaurantCard from "./CustomHomeRestaurantCard";

const Recommendations = () => {
  const { fetchRestaurantByCategory, restaurants } = useRestaurant();

  useEffect(() => {
    fetchRestaurantByCategory({
      categoryId: 5,
      currentPage: 1,
      pageSize: 8,
    });
  }, [fetchRestaurantByCategory]);
  return (
    <CustomHomeRestaurantCard restaurants={restaurants} title="Dành cho bạn" />
  );
};

export default Recommendations;
