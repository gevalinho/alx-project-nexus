import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";

import { fetchProducts } from "@/lib/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import type { Product } from "@/lib/types/Product";

export default function EditProductsScreen() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { items, loading, error } = useAppSelector(
    (state) => state.products
  );
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (accessToken && !items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, accessToken, items.length]);

  const ensureSignedIn = useCallback(() => {
    if (accessToken) return true;
    Alert.alert(
      "Sign in required",
      "Please sign in to manage your products.",
      [{ text: "OK" }]
    );
    return false;
  }, [accessToken]);

  const onRefresh = useCallback(async () => {
    if (!ensureSignedIn()) return;
    setRefreshing(true);
    try {
      await dispatch(fetchProducts()).unwrap();
    } catch (error: any) {
      const message =
        typeof error === "string"
          ? error
          : error?.message ?? "Unable to refresh products right now.";
      Alert.alert("Products", message);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, ensureSignedIn]);

  const handleEdit = useCallback((productId: Product["id"]) => {
    router.push(`/profile/edit-product/${productId}`);
  }, []);

  const listEmpty = useMemo(() => {
    if (loading) {
      return (
        <View className="py-20 items-center">
          <ActivityIndicator size="large" color="#FF8A00" />
          <Text className="text-gray-500 mt-3">Loading your products...</Text>
        </View>
      );
    }

    return (
      <View className="py-16 items-center">
        <Ionicons name="cube-outline" size={36} color="#94A3B8" />
        <Text className="text-base font-semibold text-gray-600 mt-3">
          No products found
        </Text>
        <Text className="text-gray-500 text-center mt-2 px-4">
          Create a product first or refresh to load your existing listings.
        </Text>
      </View>
    );
  }, [loading]);

  if (!accessToken) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-lg font-semibold text-[#1F232B] mb-2">
          Sign in required
        </Text>
        <Text className="text-center text-gray-500 mb-6">
          Please sign in to manage your products.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Edit Products",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />

      <View className="flex-1 px-5 pt-14">
        <Text className="text-2xl font-semibold text-[#1F232B] mb-2">
          Edit Products
        </Text>
        <Text className="text-gray-500 mb-6">
          Quickly update names, prices, descriptions, or inventory.
        </Text>

        {error ? (
          <TouchableOpacity
            onPress={onRefresh}
            className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4"
          >
            <Text className="text-red-600 text-sm font-semibold">{error}</Text>
            <Text className="text-[#FF8A00] text-sm font-semibold mt-1">
              Tap to try again
            </Text>
          </TouchableOpacity>
        ) : null}

        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={listEmpty}
          renderItem={({ item }) => (
            <View className="flex-row items-center border border-gray-100 rounded-2xl p-4 mb-3">
              <Image
                source={{ uri: item.image }}
                className="w-16 h-16 rounded-xl bg-gray-100 mr-4"
              />
              <View className="flex-1">
                <Text className="text-base font-semibold text-[#1F232B]">
                  {item.name ?? item.title}
                </Text>
                {item.category ? (
                  <Text className="text-xs uppercase tracking-wide text-gray-400 mt-1">
                    {item.category}
                  </Text>
                ) : null}
                <Text className="text-sm text-gray-600 mt-1">
                  ${Number(item.price ?? 0).toFixed(2)}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleEdit(item.id)}
                className="bg-[#FF8A00] rounded-full px-4 py-2"
              >
                <Text className="text-white font-semibold text-sm">Edit</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </View>
    </View>
  );
}
