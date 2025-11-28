import { useAppSelector } from "@/lib/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type DeliveryOption = {
  id: string;
  label: string;
  eta: string;
  cost: number;
};

type PaymentOption = {
  id: string;
  label: string;
  helper: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const DELIVERY_OPTIONS: DeliveryOption[] = [
  { id: "standard", label: "Standard Delivery", eta: "3-5 business days", cost: 4.99 },
  { id: "express", label: "Express Delivery", eta: "1-2 business days", cost: 9.99 },
  { id: "pickup", label: "Store Pickup", eta: "Ready today", cost: 0 },
];

const PAYMENT_OPTIONS: PaymentOption[] = [
  { id: "card", label: "Visa **** 9283", helper: "Default card", icon: "card-outline" },
  { id: "wallet", label: "Apple / Google Pay", helper: "Fast & secure", icon: "phone-portrait-outline" },
  { id: "cash", label: "Cash on Delivery", helper: "Pay when you receive", icon: "cash-outline" },
];

const PROMO_CODES: Record<
  string,
  { type: "percent" | "flat" | "shipping"; value: number; label: string }
> = {
  SAVE10: { type: "percent", value: 10, label: "10% off applied" },
  SHIPFREE: { type: "shipping", value: 1, label: "Free shipping applied" },
  ALX5: { type: "flat", value: 5, label: "$5 saved" },
};

const formatMoney = (value: number) => `$${value.toFixed(2)}`;

export default function CheckoutScreen() {
  const { items } = useAppSelector((s) => s.cart);

  const [selectedDelivery, setSelectedDelivery] = useState<string>("standard");
  const [selectedPayment, setSelectedPayment] = useState<string>("card");
  const [promoInput, setPromoInput] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string>("");

  const subtotal = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + Number(item.price || 0) * (item.quantity || 0),
        0
      ),
    [items]
  );

  const shippingCost =
    DELIVERY_OPTIONS.find((option) => option.id === selectedDelivery)?.cost ?? 0;

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;
    const promo = PROMO_CODES[appliedPromo];
    if (!promo) return 0;

    if (promo.type === "percent") return subtotal * (promo.value / 100);
    if (promo.type === "flat") return promo.value;
    if (promo.type === "shipping") return shippingCost;
    return 0;
  }, [appliedPromo, shippingCost, subtotal]);

  const total = Math.max(subtotal + shippingCost - discount, 0);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();

    if (!code) {
      setPromoError("Enter a promo code to apply.");
      setAppliedPromo(null);
      return;
    }

    if (!PROMO_CODES[code]) {
      setPromoError("That code is not valid.");
      setAppliedPromo(null);
      return;
    }

    setAppliedPromo(code);
    setPromoError("");
  };

  const handlePlaceOrder = () => {
    if (!items.length) {
      Alert.alert("Your cart is empty", "Add some items before checking out.");
      return;
    }

    router.push("/(tabs)/order-accepted");
  };

  const promoLabel = appliedPromo ? PROMO_CODES[appliedPromo]?.label : null;

  const renderItemRow = (itemId: string | number) => {
    const item = items.find((x) => x.id === itemId);
    if (!item) return null;

    const price = Number(item.price || 0);
    return (
      <View
        key={item.id}
        className="flex-row items-center mb-3 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm"
      >
        <Image
          source={{ uri: item.image }}
          className="w-14 h-14 rounded-xl mr-3"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-[#0D1A2E] font-semibold" numberOfLines={1}>
            {item.name ?? item.title}
          </Text>
          <Text className="text-gray-500 text-xs">
            Qty: {item.quantity} | {formatMoney(price)}
          </Text>
        </View>
        <Text className="text-[#0D1A2E] font-semibold">
          {formatMoney(price * (item.quantity || 0))}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="py-4 border-b border-gray-200 items-center">
        <Text className="text-lg font-semibold text-[#0D1A2E]">Checkout</Text>
      </View>

      {!items.length ? (
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="cart-outline" size={46} color="#9CA3AF" />
          <Text className="mt-3 text-[#0D1A2E] text-lg font-semibold">
            Your cart is empty
          </Text>
          <Text className="text-gray-500 text-center mt-1 mb-6">
            Browse products and add them to your cart to continue.
          </Text>
          <TouchableOpacity
            className="bg-[#FF8A00] px-6 py-3 rounded-xl"
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-white font-semibold">Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
          {/* Close */}
          <TouchableOpacity
            className="absolute right-0 -top-2 p-2"
            onPress={() => router.back()}
          >
            <Ionicons name="close" size={22} color="#0D1A2E" />
          </TouchableOpacity>

          {/* Delivery address */}
          <View className="bg-gray-50 border border-gray-100 p-4 rounded-2xl mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[#0D1A2E] font-semibold">Delivery</Text>
              <Ionicons name="location-outline" size={18} color="#FF8A00" />
            </View>
            <Text className="text-gray-600">1 Market Street, San Francisco</Text>
            <Text className="text-gray-500 text-xs mt-1">Change anytime at delivery step</Text>
          </View>

          {/* Delivery options */}
          <View className="mb-5">
            <Text className="text-[#0D1A2E] font-semibold mb-3">Delivery Method</Text>
            {DELIVERY_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`flex-row items-center justify-between px-4 py-3 rounded-2xl border mb-2 ${
                  selectedDelivery === option.id
                    ? "border-[#FF8A00] bg-[#FFF6EC]"
                    : "border-gray-200 bg-white"
                }`}
                onPress={() => setSelectedDelivery(option.id)}
              >
                <View>
                  <Text className="text-[#0D1A2E] font-semibold">{option.label}</Text>
                  <Text className="text-gray-500 text-xs">{option.eta}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-[#0D1A2E] font-semibold">
                    {option.cost === 0 ? "Free" : formatMoney(option.cost)}
                  </Text>
                  {selectedDelivery === option.id && (
                    <Ionicons name="checkmark-circle" size={20} color="#FF8A00" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Payment options */}
          <View className="mb-5">
            <Text className="text-[#0D1A2E] font-semibold mb-3">Payment</Text>
            {PAYMENT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`flex-row items-center justify-between px-4 py-3 rounded-2xl border mb-2 ${
                  selectedPayment === option.id
                    ? "border-[#FF8A00] bg-[#FFF6EC]"
                    : "border-gray-200 bg-white"
                }`}
                onPress={() => setSelectedPayment(option.id)}
              >
                <View className="flex-row items-center">
                  <Ionicons name={option.icon} size={20} color="#FF8A00" />
                  <View className="ml-3">
                    <Text className="text-[#0D1A2E] font-semibold">{option.label}</Text>
                    <Text className="text-gray-500 text-xs">{option.helper}</Text>
                  </View>
                </View>
                {selectedPayment === option.id && (
                  <Ionicons name="checkmark-circle" size={20} color="#FF8A00" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Items summary */}
          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-[#0D1A2E] font-semibold">Order Summary</Text>
              <Text className="text-gray-500 text-xs">
                {items.length} item{items.length > 1 ? "s" : ""}
              </Text>
            </View>
            {items.map((item) => renderItemRow(item.id))}
          </View>

          {/* Promo code */}
          <View className="mb-5">
            <Text className="text-[#0D1A2E] font-semibold mb-2">Promo Code</Text>
            <View className="flex-row items-center bg-white border border-gray-200 rounded-2xl p-2">
              <TextInput
                placeholder="Enter code (SAVE10, SHIPFREE)"
                value={promoInput}
                onChangeText={setPromoInput}
                className="flex-1 px-2 text-[#0D1A2E]"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="characters"
              />
              <TouchableOpacity
                onPress={handleApplyPromo}
                className="bg-[#FF8A00] px-4 py-2 rounded-xl"
              >
                <Text className="text-white font-semibold text-sm">Apply</Text>
              </TouchableOpacity>
            </View>
            {promoError ? (
              <Text className="text-red-500 text-xs mt-1">{promoError}</Text>
            ) : null}
            {promoLabel ? (
              <Text className="text-green-600 text-xs mt-1">{promoLabel}</Text>
            ) : null}
          </View>

          {/* Totals */}
          <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Subtotal</Text>
              <Text className="text-[#0D1A2E] font-semibold">
                {formatMoney(subtotal)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Shipping</Text>
              <Text className="text-[#0D1A2E] font-semibold">
                {shippingCost === 0 ? "Free" : formatMoney(shippingCost)}
              </Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-600">Discount</Text>
              <Text className="text-green-600 font-semibold">
                -{formatMoney(discount)}
              </Text>
            </View>
            <View className="flex-row justify-between items-center pt-2 border-t border-gray-200">
              <Text className="text-[#0D1A2E] text-base font-bold">Total</Text>
              <Text className="text-[#0D1A2E] text-xl font-bold">
                {formatMoney(total)}
              </Text>
            </View>
          </View>

          {/* Place order */}
          <TouchableOpacity
            onPress={handlePlaceOrder}
            className="bg-[#FF8A00] py-4 rounded-2xl items-center mb-10 shadow-md"
          >
            <Text className="text-white font-semibold text-base">
              Place Order - {formatMoney(total)}
            </Text>
            <Text className="text-white/90 text-xs mt-1">
              Secured by {selectedPayment === "card" ? "card issuer" : "provider"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}
