import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
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

import { deleteProducts, fetchProducts } from "@/lib/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import type { Product } from "@/lib/types/Product";

export default function DeleteProductsScreen() {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const { items, loading, deleting, deleteError } = useAppSelector(
    (state) => state.products
  );

  const [selectedIds, setSelectedIds] = useState<Product["id"][]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!items.length && accessToken) {
      dispatch(fetchProducts());
    }
  }, [items.length, dispatch, accessToken]);

  useEffect(() => {
    setSelectedIds((prev) =>
      prev.filter((id) =>
        items.some((item) => String(item.id) === String(id))
      )
    );
  }, [items]);

  const selectedSet = useMemo(
    () => new Set(selectedIds.map((id) => String(id))),
    [selectedIds]
  );

  const handleToggle = useCallback((id: Product["id"]) => {
    setSelectedIds((prev) => {
      const exists = prev.some((item) => String(item) === String(id));
      return exists
        ? prev.filter((item) => String(item) !== String(id))
        : [...prev, id];
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!items.length) return;
    const everySelected = items.every((item) =>
      selectedSet.has(String(item.id))
    );
    if (everySelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
  }, [items, selectedSet]);

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

  const handleDelete = useCallback(async () => {
    if (!ensureSignedIn()) return;

    if (!selectedIds.length) {
      Alert.alert("No products selected", "Select at least one product.");
      return;
    }

    try {
      const deleted = await dispatch(deleteProducts(selectedIds)).unwrap();
      setSelectedIds([]);
      Alert.alert(
        "Products deleted",
        `${deleted.length} product${deleted.length === 1 ? "" : "s"} removed.`
      );
    } catch (error: any) {
      const message =
        typeof error === "string"
          ? error
          : error?.message ?? "Unable to delete products right now.";
      Alert.alert("Delete failed", message);
    }
  }, [dispatch, ensureSignedIn, selectedIds]);

  const confirmDelete = useCallback(() => {
    if (!selectedIds.length) {
      Alert.alert("No products selected", "Select at least one product.");
      return;
    }

    Alert.alert(
      "Delete selected products?",
      "This action cannot be undone. The selected listings will be removed from your store.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: handleDelete,
        },
      ]
    );
  }, [handleDelete, selectedIds.length]);

  const renderItem = useCallback(
    ({ item }: { item: Product }) => {
      const isSelected = selectedSet.has(String(item.id));
      return (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => handleToggle(item.id)}
          className={`flex-row items-center border rounded-2xl p-4 mb-3 ${
            isSelected ? "border-[#FF8A00]" : "border-gray-200"
          }`}
        >
          <View
            className={`w-6 h-6 rounded-full mr-4 items-center justify-center border ${
              isSelected ? "bg-[#FF8A00] border-[#FF8A00]" : "border-gray-300"
            }`}
          >
            {isSelected ? (
              <Ionicons name="checkmark" size={16} color="#fff" />
            ) : null}
          </View>

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
        </TouchableOpacity>
      );
    },
    [handleToggle, selectedSet]
  );

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

  const totalSelected = selectedIds.length;
  const allSelected =
    !!items.length && totalSelected === items.length && !!totalSelected;

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: "Delete Products",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />

      <View className="flex-1 px-5 pt-14">
        <Text className="text-2xl font-semibold text-[#1F232B] mb-2">
          Delete Products
        </Text>
        <Text className="text-gray-500 mb-6">
          Select the listings you no longer want to show in your store.
        </Text>

        {deleteError ? (
          <TouchableOpacity
            onPress={handleDelete}
            className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 mb-4"
          >
            <Text className="text-red-600 text-sm font-semibold">
              {deleteError}
            </Text>
            <Text className="text-[#FF8A00] text-sm font-semibold mt-1">
              Tap to retry deletion
            </Text>
          </TouchableOpacity>
        ) : null}

        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-sm text-gray-500">
            {totalSelected} selected
          </Text>
          <TouchableOpacity
            disabled={!items.length}
            onPress={handleSelectAll}
            className="flex-row items-center"
          >
            <Ionicons
              name={allSelected ? "close-circle" : "checkbox-outline"}
              size={18}
              color={items.length ? "#FF8A00" : "#CBD5F5"}
            />
            <Text
              className={`ml-2 font-semibold ${
                items.length ? "text-[#FF8A00]" : "text-gray-300"
              }`}
            >
              {allSelected ? "Clear all" : "Select all"}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          ListEmptyComponent={listEmpty}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingBottom: 120,
          }}
        />
      </View>

      <View className="px-5 pb-8 pt-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          disabled={!totalSelected || deleting}
          onPress={confirmDelete}
          className={`rounded-full py-4 items-center ${
            totalSelected && !deleting ? "bg-red-600" : "bg-red-300"
          }`}
        >
          {deleting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">
              Delete{totalSelected ? ` (${totalSelected})` : ""}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
