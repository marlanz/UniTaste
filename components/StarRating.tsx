import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

interface StarRatingProps {
  maxStars?: number;
  initialRating?: number;
  onRate?: (rating: number) => void;
}

const StarRating = ({
  maxStars = 5,
  initialRating = 0,
  onRate,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);

  const handleRate = (value: number) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  return (
    <View className="flex-row">
      {Array.from({ length: maxStars }).map((_, i) => {
        const starIndex = i + 1;
        return (
          <Pressable key={i} onPress={() => handleRate(starIndex)}>
            <Ionicons
              name={"star"}
              size={36}
              color={starIndex <= rating ? "#FD8200" : "#C0C0C0"}
              style={{ marginHorizontal: 2 }}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default StarRating;
