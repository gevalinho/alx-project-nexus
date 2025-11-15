import { FlatList, View } from "react-native";
import ProductCard from "../ProductCard";

interface ProductGridProps {
  items: any[];
  limit?: number; // optional limit (default: no limit)
}

/**
 * ProductGrid Component
 * -----------------------------------------------
 * A reusable 2-column product listing.
 * Takes an array of product items and renders them
 * using the existing ProductCard component.
 */

export default function ProductGrid({ items, limit }: ProductGridProps) {
  // If a limit is provided, slice the data
  const data = limit ? items.slice(0, limit) : items;

  return (
    <View className="mb-10">
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
