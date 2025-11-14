/**
 * ProductCard Component
 * -------------------------------------------------------
 * Displays individual product cards with theme support:
 *  - Light & dark mode styling using NativeWind
 *  - Dynamic icon colors
 *  - Clean, scalable UI
 */

import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../lib/theme/ThemeProvider";

export default function ProductCard({ item }: { item: any }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-[48%] mb-5 bg-white dark:bg-gray-900 rounded-2xl p-3 shadow-sm dark:shadow-none"
    >
      {/* Product Image */}
      <View className="w-full h-36 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-3">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Product Title */}
      <Text className="text-sm font-semibold text-black dark:text-white mb-1">
        {item.title?.slice(0, 25)}
      </Text>

      {/* Product Price */}
      <Text className="text-base font-bold text-orange-500 mb-3">
        ${item.price}
      </Text>

      {/* Bottom Row: Rating + Favorite Icon */}
      <View className="flex-row justify-between items-center">

        {/* Rating */}
        <View className="flex-row items-center">
          <Feather
            name="star"
            size={16}
            color={theme === "light" ? "#F5A623" : "#FFD479"}
          />
          <Text className="ml-1 text-sm text-gray-600 dark:text-gray-300">
            {item.rating?.rate}
          </Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
          <Feather
            name="heart"
            size={17}
            color={theme === "light" ? "#0D1A2E" : "#fff"}
          />
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
}
