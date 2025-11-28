import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/store/productSlice";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";

export default function CategoryProducts() {
  const params = useLocalSearchParams();
  const selectedCategory = String(params.category ?? "").trim();
  const selectedTitle =
    String(params.title ?? "").trim() || selectedCategory || "Category";

  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!items.length && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, loading]);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return items;
    const normalized = selectedCategory.toLowerCase();
    return items.filter(
      (p) => (p.category ?? "").trim().toLowerCase() === normalized
    );
  }, [items, selectedCategory]);

  return (
    <View className="flex-1 bg-white">
      {/* HEADER */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#0D1A2E" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-[#0D1A2E] ml-4">
          {selectedTitle}
        </Text>
      </View>

      {/* LOADING STATE */}
      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF8A00" />
        </View>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredProducts.length === 0 && (
        <View className="px-4 mt-6">
          <Text className="text-gray-500 text-base">
            <Text>No products found for &quot;{selectedTitle}&quot;</Text>
          </Text>
        </View>
      )}

      {/* PRODUCT GRID */}
      {!loading && (
        <FlatList
          data={filteredProducts}
          numColumns={2}
          contentContainerStyle={{ padding: 16 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ProductCard item={item} />}
        />
      )}
    </View>
  );
}
