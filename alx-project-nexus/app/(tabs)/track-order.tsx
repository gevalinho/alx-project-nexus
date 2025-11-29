import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useMemo } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type TrackingStep = {
  id: string;
  title: string;
  description: string;
  time: string;
  completed: boolean;
};

const trackingSteps: TrackingStep[] = [
  {
    id: "confirmed",
    title: "Order Confirmed",
    description: "We have received your order and payment.",
    time: "Today · 09:30 AM",
    completed: true,
  },
  {
    id: "packed",
    title: "Packed & Ready",
    description: "Your items are being prepared for shipment.",
    time: "Today · 10:45 AM",
    completed: true,
  },
  {
    id: "shipping",
    title: "Out for Delivery",
    description: "Courier picked up your package.",
    time: "ETA · 02:00 PM",
    completed: false,
  },
  {
    id: "delivered",
    title: "Package Delivered",
    description: "We will notify you once it arrives.",
    time: "Pending",
    completed: false,
  },
];

export default function TrackOrderScreen() {
  const progress = useMemo(() => {
    const completed = trackingSteps.filter((step) => step.completed).length;
    return completed / trackingSteps.length;
  }, []);
  const orderNumber = useMemo(
    () => Math.floor(Math.random() * 90000) + 10000,
    []
  );

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <View className="flex-row items-center px-4 pt-14 pb-4 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#1F232B" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-[#1F232B] ml-4">
          Track Order
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-[#FFF6ED] border border-[#FFE2C2] rounded-3xl p-5 mb-6">
          <Text className="text-xs uppercase tracking-wide text-[#FF8A00] mb-2">
            Order #{orderNumber}
          </Text>
          <Text className="text-[20px] font-semibold text-[#1F232B] mb-1">
            Estimated Delivery
          </Text>
          <Text className="text-gray-600 mb-4">Today · 5:30 PM</Text>

          <View className="bg-white rounded-2xl p-4">
            <Text className="text-xs uppercase tracking-wide text-gray-400">
              Progress
            </Text>
            <View className="h-3 bg-gray-100 rounded-full mt-3 overflow-hidden">
              <View
                style={{ width: `${progress * 100}%` }}
                className="h-full bg-[#FF8A00]"
              />
            </View>
            <Text className="text-gray-500 text-xs mt-2">
              {Math.round(progress * 100)}% completed
            </Text>
          </View>
        </View>

        <Text className="text-base font-semibold text-[#1F232B] mb-4">
          Delivery Timeline
        </Text>

        <View className="bg-white rounded-3xl border border-gray-100 px-4 py-2">
          {trackingSteps.map((step, index) => {
            const isLast = index === trackingSteps.length - 1;
            return (
              <View key={step.id} className="flex-row">
                <View className="items-center mr-4">
                  <View
                    className={`w-5 h-5 rounded-full border-2 ${
                      step.completed
                        ? "bg-[#FF8A00] border-[#FF8A00]"
                        : "border-gray-300"
                    }`}
                  />
                  {!isLast && (
                    <View
                      className={`w-[2px] flex-1 ${
                        step.completed ? "bg-[#FF8A00]/40" : "bg-gray-200"
                      }`}
                    />
                  )}
                </View>

                <View className="flex-1 pb-6">
                  <Text className="text-sm font-semibold text-[#1F232B]">
                    {step.title}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {step.description}
                  </Text>
                  <Text className="text-xs text-gray-400 mt-1">{step.time}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View className="mt-10 bg-white border border-gray-100 rounded-3xl p-5">
          <Text className="text-base font-semibold text-[#1F232B] mb-2">
            Need help?
          </Text>
          <Text className="text-gray-500 mb-4">
            Our support team is available 24/7 to assist with delivery issues.
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-1 bg-gray-100 rounded-full py-3 items-center">
              <Text className="text-[#1F232B] font-semibold">Chat Support</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-[#FF8A00] rounded-full py-3 items-center">
              <Text className="text-white font-semibold">Call Courier</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
