/**
 * ProductCard Component
 * -------------------------------------------------------
 * Clean version (no theme)
 * - Displays product image, title, price, rating, and favorite icon
 * - Fully styled with NativeWind
 * - Used inside the Home product grid
 */

import { Feather } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({ item }: { item: any }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="w-[48%] mb-5 bg-white rounded-2xl p-3 shadow-sm"
    >
      {/* Product Image */}
      <View className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-3">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Product Title */}
      <Text className="text-sm font-semibold text-black mb-1">
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
          <Feather name="star" size={16} color="#F5A623" />
          <Text className="ml-1 text-sm text-gray-600">
            {item.rating?.rate}
          </Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity className="p-2 rounded-full bg-gray-100">
          <Feather name="heart" size={17} color="#0D1A2E" />
        </TouchableOpacity>

      </View>
    </TouchableOpacity>
  );
}
