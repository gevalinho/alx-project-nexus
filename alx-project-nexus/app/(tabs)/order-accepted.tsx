import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function OrderAccepted() {
  return (
    <View className="flex-1 bg-white px-6 justify-center items-center">

      {/* SUCCESS ANIMATION */}
      <View className="w-64 h-64">
        <LottieView
          source={require("@/assets/animations/success.json")} // <-- your animation here
          autoPlay
          loop={false}
        />
      </View>
      <LottieView source={require("@/assets/animations/success.json")} />


      {/* TITLE */}
      <Text className="text-[22px] font-semibold text-[#0D1A2E] text-center mt-4">
        Your Order has been{"\n"}accepted
      </Text>

      {/* MESSAGE */}
      <Text className="text-gray-500 text-center mt-2 mb-8 leading-5">
        Your items have been placed and{"\n"}are on their way to being processed.
      </Text>

      {/* TRACK ORDER */}
      <TouchableOpacity
        // onPress={() => router.push("/track-order")}
        className="w-full bg-[#FF8A00] py-4 rounded-xl mb-4"
      >
        <Text className="text-center text-white font-semibold text-base">
          Track Order
        </Text>
      </TouchableOpacity>

      {/* BACK TO HOME */}
      <TouchableOpacity onPress={() => router.push("/(tabs)")}>
        <Text className="text-[#0D1A2E] font-medium">Back to home</Text>
      </TouchableOpacity>

    </View>
  );
}
