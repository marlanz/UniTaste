import { useRestaurant } from "@/hooks/useRestaurant";
import React, { useEffect } from "react";
import CustomHomeRestaurantCard from "./CustomHomeRestaurantCard";

const BeverageSection = () => {
  const { fetchRestaurantByCategory, restaurants } = useRestaurant();

  useEffect(() => {
    fetchRestaurantByCategory({
      categoryId: 5,
      currentPage: 2,
      pageSize: 8,
    });
  }, [fetchRestaurantByCategory]);
  return (
    <CustomHomeRestaurantCard
      restaurants={restaurants}
      title="Điểm hẹn giải khát"
    />
  );
};

export default BeverageSection;
