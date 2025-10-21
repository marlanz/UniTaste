import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";

interface ListItem {
  id: string | number;
  name: string;
}

interface CustomHorizontalListProps {
  data: ListItem[];
  selectedItems: string; // comma-separated string from state
  onSelect: (itemName: string) => void; // callback from parent
}

const CustomHorizontalList = ({
  data,
  selectedItems,
  onSelect,
}: CustomHorizontalListProps) => {
  // Split into 2 rows (alternating)
  const firstRow = data.filter((_, i) => i % 2 === 0);
  const secondRow = data.filter((_, i) => i % 2 !== 0);

  // Convert comma-separated string → array for comparison
  const selectedArray = selectedItems
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // Helper to check if selected
  const isSelected = (name: string) => selectedArray.includes(name);

  return (
    <FlatList
      horizontal
      data={[{ id: "container" }]} // dummy single-item array to keep FlatList structure
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      contentContainerClassName="mx-4"
      renderItem={() => (
        <View style={{ flexDirection: "row" }}>
          <View>
            {/* First Row */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                marginBottom: 8,
              }}
            >
              {firstRow.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => onSelect(item.name)}
                  className={`px-4 py-3 rounded-full mr-2 ${
                    isSelected(item.name) ? "bg-orange-200" : "bg-gray-300"
                  }`}
                >
                  <Text
                    className={`font-msr-medium text-base ${
                      isSelected(item.name) ? "text-white-100" : "text-black"
                    }`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Second Row */}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {secondRow.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => onSelect(item.name)}
                  className={`px-4 py-3 rounded-full mr-2 ${
                    isSelected(item.name) ? "bg-orange-200" : "bg-gray-300"
                  }`}
                >
                  <Text
                    className={`font-msr-medium text-base ${
                      isSelected(item.name) ? "text-white-100" : "text-black"
                    }`}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default CustomHorizontalList;
