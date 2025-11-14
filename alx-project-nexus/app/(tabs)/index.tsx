import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import ProductCard from "../../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";
import { fetchProducts } from "../../lib/store/productSlice";
import { useTheme } from "../../lib/theme/ThemeProvider";

/**
 * Home Screen
 * Fully theme-ready (light & dark)
 */
export default function Home() {
  const dispatch = useAppDispatch();
  const { theme, toggleTheme } = useTheme(); // <-- THEME CONTEXT
  const { items } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ScrollView className="flex-1 bg-white dark:bg-black px-4 pt-12">

      {/* 🔍 Search Bar + Icons */}
      <View className="flex-row items-center mb-5">

        {/* Search Input */}
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl flex-1">
          <Ionicons name="search" size={20} color="#FF7200" />
          <TextInput
            placeholder="Search Outfit"
            placeholderTextColor={theme === "dark" ? "#aaa" : "#555"}
            className="ml-3 flex-1 text-black dark:text-white"
          />
        </View>

        {/* Favorites Button */}
        <TouchableOpacity className="ml-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
          <Feather
            name="heart"
            size={22}
            color={theme === "light" ? "#0D1A2E" : "#fff"}
          />
        </TouchableOpacity>

        {/* Notification Button */}
        <TouchableOpacity className="ml-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl">
          <Feather
            name="bell"
            size={22}
            color={theme === "light" ? "#0D1A2E" : "#fff"}
          />
        </TouchableOpacity>

        {/* Theme Toggle */}
        <TouchableOpacity className="ml-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-xl" onPress={toggleTheme}>
          <Feather
            name={theme === "light" ? "moon" : "sun"}
            size={20}
            color={theme === "light" ? "#0D1A2E" : "#fff"}
          />
        </TouchableOpacity>
      </View>

      {/* 🛍 Banner */}
      <View className="w-full h-40 rounded-2xl mb-6 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Image
          source={{ uri: "https://picsum.photos/seed/banner123/800/500" }}
          className="w-full h-full"
        />

        <View className="absolute left-4 top-4">
          <Text className="text-2xl font-bold text-white">40% off</Text>

          {/* Countdown */}
          <View className="flex-row mt-3">
            {["02", "09", "24"].map((num, index) => (
              <View
                key={index}
                className="bg-white dark:bg-gray-900 px-2 py-1 rounded-lg mx-1"
              >
                <Text className="font-semibold text-gray-700 dark:text-white">
                  {num}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* 🧭 Categories */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-black dark:text-white">
          Categories
        </Text>

        <Text className="text-orange-500 font-semibold">View all</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-6"
      >
        {["Man Style", "Woman Style", "Kids Style"].map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            className="bg-gray-100 dark:bg-gray-800 py-3 px-5 rounded-2xl mr-3"
          >
            <Text className="font-medium text-gray-700 dark:text-white">
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ⭐ Popular Products */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-black dark:text-white">
          Popular Product
        </Text>

        <Text className="text-orange-500 font-semibold">View all</Text>
      </View>

      {/* Products Grid */}
      <FlatList
        data={items.slice(0, 4)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
