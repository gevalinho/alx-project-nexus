import ProductCard from "@/components/ProductCard";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../lib/store/hooks";

export default function Favorites() {
  const { items } = useAppSelector((state) => state.favorites);

  return (
    <View className="flex-1 bg-white">

      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#0D1A2E" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-[#0D1A2E] ml-4">
          Favorite
        </Text>
      </View>

      {/* No favorites */}
      {items.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Feather name="heart" size={50} color="#ccc" />
          <Text className="mt-3 text-gray-500">No favorites yet</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      )}

    </View>
  );
}
