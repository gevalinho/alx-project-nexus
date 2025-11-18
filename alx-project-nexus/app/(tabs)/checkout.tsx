import { useAppSelector } from "@/lib/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CheckoutScreen() {
  const { items } = useAppSelector((s) => s.cart);

  const totalPrice = items
    .reduce((acc, x) => acc + x.price * x.quantity, 0)
    .toFixed(2);

  return (
    <View className="flex-1 bg-white">

      {/* TOP HEADER (My Cart Preview) - optional */}
      <View className="py-4 border-b border-gray-200 items-center">
        <Text className="text-lg font-semibold text-[#0D1A2E]">Checkout</Text>
      </View>

      {/* SLIDE-UP PANEL */}
      <View className="flex-1 justify-end">
        <View className="bg-white p-6 rounded-t-3xl border-t border-gray-100 shadow-lg">

          {/* CLOSE BUTTON */}
          <TouchableOpacity
            className="absolute right-6 top-6"
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={22} color="#0D1A2E" />
          </TouchableOpacity>

          <ScrollView className="mt-8">

            {/* Delivery */}
            <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
              <Text className="text-[#0D1A2E] text-base font-medium">Delivery</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-500 mr-2">Select Method</Text>
                <Ionicons name="chevron-forward" size={18} color="#0D1A2E" />
              </View>
            </TouchableOpacity>

            {/* Payment */}
            <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
              <Text className="text-[#0D1A2E] text-base font-medium">Payment</Text>
              <View className="flex-row items-center">
                <Ionicons
                  name="card-outline"
                  size={20}
                  color="#FF8A00"
                  className="mr-2"
                />
                <Ionicons name="chevron-forward" size={18} color="#0D1A2E" />
              </View>
            </TouchableOpacity>

            {/* Promo Code */}
            <TouchableOpacity className="flex-row justify-between items-center py-4 border-b border-gray-200">
              <Text className="text-[#0D1A2E] text-base font-medium">Promo Code</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-500 mr-2">Pick discount</Text>
                <Ionicons name="chevron-forward" size={18} color="#0D1A2E" />
              </View>
            </TouchableOpacity>

            {/* Total Cost */}
            <View className="flex-row justify-between items-center py-4 mb-2">
              <Text className="text-[#0D1A2E] text-base font-semibold">
                Total Cost
              </Text>
              <Text className="text-[#0D1A2E] text-lg font-bold">
                ${totalPrice}
              </Text>
            </View>

            {/* Terms */}
            <Text className="text-gray-500 text-xs mb-6">
              By placing an order you agree to our{" "}
              <Text className="text-[#FF8A00] font-medium">Terms and Conditions</Text>.
            </Text>

            {/* PLACE ORDER BUTTON */}
            <TouchableOpacity className="bg-[#FF8A00] py-4 rounded-xl mb-4">
              <Text className="text-center text-white font-semibold text-base">
                Place Order
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    </View>
  );
}
