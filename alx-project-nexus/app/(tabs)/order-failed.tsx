import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function OrderFailed() {
  return (
    <View className="flex-1 bg-black/30 justify-center items-center px-6">

      {/* POPUP CARD */}
      <View className="w-full bg-white rounded-3xl p-6 items-center shadow-xl">

        {/* CLOSE BUTTON */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-4 right-4"
        >
          <Ionicons name="close" size={24} color="#0D1A2E" />
        </TouchableOpacity>

        {/* ERROR IMAGE / ANIMATION */}
        <Image
          source={require("@/assets/images/order_failed.png")}
          className="w-40 h-40 mb-4"
          resizeMode="contain"
        />

        {/* TITLE */}
        <Text className="text-[22px] font-semibold text-[#0D1A2E] text-center">
          Oops! Order Failed
        </Text>

        {/* MESSAGE */}
        <Text className="text-gray-500 text-center mt-2 mb-8 leading-5">
          Something went terribly wrong.
        </Text>

        {/* RETRY */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-[#FF8A00] w-full py-4 rounded-xl mb-4"
        >
          <Text className="text-center text-white font-semibold text-base">
            Please Try Again
          </Text>
        </TouchableOpacity>

        {/* Back to home */}
        <TouchableOpacity onPress={() => router.push("/(tabs)/home")}>
          <Text className="text-[#0D1A2E] font-medium">Back to home</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
