// import ProductCard from "@/components/ProductCard";
// import { Ionicons } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import { FlatList, Text, TouchableOpacity, View } from "react-native";
// import { useAppSelector } from "../../lib/store/hooks";


// export default function CategoryProducts() {
//   const { category, title } = useLocalSearchParams();
//   const { items } = useAppSelector((state) => state.products);

//   // FILTER PRODUCTS BASED ON CATEGORY ID
//   const filtered = items.filter((p) => {
//     if (category === "mens") return p.category === "men's clothing";
//     if (category === "womens") return p.category === "women's clothing";
//     if (category === "kids") return p.category === "kids"; // custom if needed
//     if (category === "shoes") return p.category === "shoes";
//     if (category === "bags") return p.category === "bags";
//     return false;
//   });

//   return (
//     <View className="flex-1 bg-white">

//       {/* HEADER */}
//       <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#0D1A2E" />
//         </TouchableOpacity>

//         <Text className="text-lg font-semibold text-[#0D1A2E] ml-4">
//           {title}
//         </Text>
//       </View>

//       {/* RESULTS */}
//       <FlatList
//         data={filtered}
//         numColumns={2}
//         contentContainerStyle={{ padding: 16 }}
//         columnWrapperStyle={{ justifyContent: "space-between" }}
//         renderItem={({ item }) => <ProductCard item={item} />}
//       />
//     </View>
//   );
// }


import ProductCard from "@/components/ProductCard";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useAppSelector } from "../../lib/store/hooks";

/**
 * Map UI categories → API category names
 */
const CATEGORY_MAP: Record<string, string> = {
  "Man Style": "men's clothing",
  "Woman Style": "women's clothing",
  "Kids Style": "kids",
  "All Shoes": "shoes",
  "Various bags": "bags",
};

export default function CategoryProducts() {
  const { category } = useLocalSearchParams(); // e.g. "Man Style"
  const { items } = useAppSelector((state) => state.products);

  // Convert UI category to matching API category
  const apiCategory = CATEGORY_MAP[String(category)] || null;

  // Filter products (safe fallback)
  const filtered = apiCategory
    ? items.filter((p) => p.category === apiCategory)
    : [];

  return (
    <View className="flex-1 bg-white">
      {/* TOP HEADER */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#0D1A2E" />
        </TouchableOpacity>

        <Text className="text-lg font-semibold text-[#0D1A2E] ml-4">
          {category}
        </Text>
      </View>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <View className="px-4 mt-6">
          <Text className="text-gray-500 text-base">
            No products found for "{category}"
          </Text>
        </View>
      )}

      {/* PRODUCT GRID */}
      <FlatList
        data={filtered}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}
