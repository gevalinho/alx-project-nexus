import { decreaseQty, increaseQty, removeItem } from "@/lib/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Alert,
  FlatList,
  Image,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();

  const totalItems = items.reduce((acc, x) => acc + x.quantity, 0);
  const totalPrice = items
    .reduce((acc, x) => acc + Number(x.price || 0) * x.quantity, 0)
    .toFixed(2);

  const discount = 7; // Static for now
  const finalPrice = (parseFloat(totalPrice) - discount).toFixed(2);

  const handlePlaceOrder = () => {
    if (!items.length) {
      Alert.alert("Your cart is empty", "Add some items before checking out.");
      return;
    }

    router.push("/(tabs)/checkout");
  };

  const renderItem = ({ item }: ListRenderItemInfo<typeof items[number]>) => (
    <View className="flex-row items-center bg-white mb-4 p-3 rounded-xl shadow-sm border border-gray-100">
      <Ionicons name="checkmark-circle" size={24} color="#F4A100" className="mr-2" />

      <Image source={{ uri: item.image }} className="w-16 h-16 rounded-lg mr-3" />

      <View className="flex-1">
        <Text className="text-base font-medium text-[#0D1A2E]">
          {item.name ?? item.title}
        </Text>
        <Text className="text-xs text-gray-500">Size L</Text>
        <Text className="text-[15px] font-semibold text-[#0D1A2E] mt-1">
          ${Number(item.price || 0).toFixed(2)}
        </Text>
      </View>

      <View className="flex-row items-center space-x-2">
        <TouchableOpacity
          onPress={() => dispatch(decreaseQty(item.id))}
          className="w-8 h-8 rounded-md bg-gray-200 items-center justify-center"
        >
          <Text className="text-lg">-</Text>
        </TouchableOpacity>

        <Text className="text-base font-medium">{item.quantity}</Text>

        <TouchableOpacity
          onPress={() => dispatch(increaseQty(item.id))}
          className="w-8 h-8 rounded-md bg-gray-200 items-center justify-center"
        >
          <Text className="text-lg">+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => dispatch(removeItem(item.id))} className="ml-3">
        <Ionicons name="trash-outline" size={22} color="#F24141" />
      </TouchableOpacity>
    </View>
  );

  const renderSummary = () => (
    <View className="px-4 pb-10">
      <TouchableOpacity className="flex-row items-center p-4 rounded-xl border border-gray-200 mb-3">
        <Ionicons name="pricetag-outline" size={20} color="#F4A100" />
        <Text className="ml-3 text-[#0D1A2E] font-medium">
          Apply voucher for Discount
        </Text>
      </TouchableOpacity>

      <View className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">Items ({totalItems})</Text>
          <Text className="text-gray-700">${totalPrice}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-500">Discount</Text>
          <Text className="text-red-500">-${discount}</Text>
        </View>
        <View className="flex-row justify-between mt-2">
          <Text className="text-[#0D1A2E] font-semibold text-base">Total Price</Text>
          <Text className="text-[#0D1A2E] font-semibold text-base">${finalPrice}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={handlePlaceOrder}
        className="mt-4 bg-[#FF9F00] py-4 rounded-xl items-center"
      >
        <Text className="text-white font-semibold text-base">Check Out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="py-4 border-b border-gray-200 items-center">
        <Text className="text-lg font-semibold text-[#0D1A2E]">Your Cart</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        renderItem={renderItem}
        ListFooterComponent={renderSummary}
      />
    </SafeAreaView>
  );
}
