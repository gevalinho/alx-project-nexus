import ProductCard from "@/components/ProductCard";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../lib/store/hooks";

export default function SearchScreen() {
  const { items } = useAppSelector((state) => state.products);

  const [query, setQuery] = useState("");
  const filtered = items.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      
      {/* 🔵 Screen Title */}
      <Text className="text-center text-[20px] font-bold text-[#0D1A2E] mb-5">
        Search
      </Text>

      {/* 🔍 Search Input */}
      <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-2xl mb-4">
        <Ionicons name="search" size={20} color="#FF8A00" />
        <TextInput
          placeholder="Search products"
          value={query}
          onChangeText={setQuery}
          className="flex-1 ml-3 text-[16px] text-black"
        />

        <TouchableOpacity className="bg-[#0D1A2E] p-2 rounded-xl">
          <Feather name="sliders" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/* 📝 Showing results */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[15px] text-gray-500">
          Showing{" "}
          <Text className="text-black font-semibold">"{query || "All"}"</Text>
        </Text>

        <Text className="text-[14px] text-gray-500">
          {filtered.length} Results
        </Text>
      </View>

      {/* 🛍 Product Grid */}
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <ProductCard item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
