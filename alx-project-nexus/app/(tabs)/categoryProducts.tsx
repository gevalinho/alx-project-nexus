import ProductCard from "@/components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../lib/store/hooks";

const CATEGORY_MAP: Record<string, string> = {
  "Man Style": "men's clothing",
  "Woman Style": "women's clothing",
  "Kids Style": "kids",
  "All Shoes": "shoes",
  "Various bags": "bags",
};

export default function CategoryProducts() {
  const params = useLocalSearchParams();
  const selectedCategory = String(params.category ?? "");

  const { items } = useAppSelector((state) => state.products);

  const apiCategory =
    CATEGORY_MAP[selectedCategory] ||
    ""; // fallback to empty string to avoid undefined

  const filteredProducts = items.filter(
    (p) =>
      p.category?.trim().toLowerCase() === apiCategory.trim().toLowerCase()
  );

  return (
    <View className="flex-1 bg-white">
      {/* HEADER */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#0D1A2E" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-[#0D1A2E] ml-4">
          {selectedCategory}
        </Text>
      </View>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <View className="px-4 mt-6">
          <Text className="text-gray-500 text-base">
            {/* No products found for "{selectedCategory}" */}
            <Text>No products found for &quot;{selectedCategory}&quot;</Text>

          </Text>
        </View>
      )}

      {/* PRODUCT GRID */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}
