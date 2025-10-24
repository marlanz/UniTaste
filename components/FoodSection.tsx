import { useRestaurant } from "@/hooks/useRestaurant";
import React, { useEffect } from "react";
import CustomHomeRestaurantCard from "./CustomHomeRestaurantCard";

const FoodSection = () => {
  const { fetchRestaurantByCategory, restaurants } = useRestaurant();

  useEffect(() => {
    fetchRestaurantByCategory({
      categoryId: 2,
      currentPage: 1,
      pageSize: 8,
    });
  }, [fetchRestaurantByCategory]);
  return (
    <CustomHomeRestaurantCard
      restaurants={restaurants}
      title=" Cùng lấp chiếc bụng đói"
    />
  );
};

export default FoodSection;
