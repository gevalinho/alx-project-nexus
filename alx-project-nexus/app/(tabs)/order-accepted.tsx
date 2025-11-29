import { Stack, useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function OrderAccepted() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-center items-center px-6">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Checkmark Circle */}
     <LottieView
  source={require("../../assets/animations/success.json")}
  autoPlay
  loop={false}
  style={{ width: 200, height: 200 }}
/>

      {/* Title */}
      <Text className="text-[20px] font-semibold text-[#1F232B] mb-2 text-center">
        Your Order has been accepted
      </Text>

      {/* Subtitle */}
      <Text className="text-gray-500 text-[14px] text-center mb-10 leading-5">
        Your items have been placed and are on their way to being processed.
      </Text>

      {/* Track Order */}
      <TouchableOpacity
        className="bg-[#FF8A00] py-4 w-full rounded-2xl items-center mb-5"
        onPress={() => router.push("/track-order")}
      >
        <Text className="text-white font-semibold text-[16px]">
          Track Order
        </Text>
      </TouchableOpacity>

      {/* Back to Home */}
      <TouchableOpacity 
      onPress={() => router.push("/(tabs)")}
      >
        <Text className="text-[15px] font-medium text-[#1F232B]">
          Back to home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
