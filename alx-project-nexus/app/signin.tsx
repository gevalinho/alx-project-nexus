import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignIn() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  return (
    <>
      {/* ✅ Hide default header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView className="flex-1 bg-white">
        {/* 🖼️ Top Image */}
        <Image
          source={require("../assets/images/signin_bg.png")}
          className="w-full h-80"
          resizeMode="cover"
        />

        {/* 🧾 Content */}
        <View className="px-6 pt-4">
          <Text className="text-2xl font-bold text-[#1F232B]">
            Get your groceries
          </Text>
          <Text className="text-2xl font-bold text-[#1F232B] mb-4">
            with nectar
          </Text>

          {/* 📞 Phone Input */}
          <View className="flex-row items-center border-b border-gray-200 pb-2 mb-8">
            <Image
              source={{
                uri: "https://flagcdn.com/w40/bd.png", // Bangladesh flag
              }}
              className="w-7 h-5 mr-2 rounded"
            />
            <Text className="text-[#1F232B] mr-2 text-base font-medium">
              +880
            </Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              className="flex-1 text-base text-[#1F232B]"
            />
          </View>

          {/* ───────── Divider ───────── */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-2 text-gray-400 text-sm">
              Or connect with social media
            </Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* 🔵 Social Buttons */}
          <TouchableOpacity 
          // onPress={() => router.push("/(home)/shop")}
            className="bg-[#FF8A00] py-3 rounded-xl flex-row items-center justify-center mb-3"
            activeOpacity={0.8} 
          >
            <Ionicons
              name="logo-google"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-semibold text-base">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
          // onPress={() => router.push("/(home)/shop")}
            className="bg-[#1877F2] py-3 rounded-xl flex-row items-center justify-center"
            activeOpacity={0.8} 
          >
            <Ionicons
              name="logo-facebook"
              size={20}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-semibold text-base">
              Continue with Facebook
            </Text>
          </TouchableOpacity>

          {/* 🦶 Footer */}
          <View className="mt-10 mb-8 flex-row justify-center">
            <Text className="text-gray-500">Don’t have an account? </Text>
            <TouchableOpacity 
            onPress={() => router.push("/signup")}
            >
              <Text className="text-[#34A853] font-semibold">Join now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
