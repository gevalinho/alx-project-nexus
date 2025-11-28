import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { loginUser } from "@/lib/api/auth";
import { loginSuccess, setLoading } from "@/lib/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchProducts } from "@/lib/store/productSlice";
import { saveAuth } from "@/lib/utils/storage";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter your email and password.");
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await loginUser({ email, password });

      if (!res.access_token || !res.refresh_token) {
        throw new Error("Missing auth tokens from server response.");
      }

      dispatch(
        loginSuccess({
          user: res.user,
          accessToken: res.access_token,
          refreshToken: res.refresh_token,
        })
      );
      await saveAuth(res.access_token, res.refresh_token, res.user);
      dispatch(fetchProducts());

      router.replace("/(tabs)/home");
    } catch (error: any) {
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Unable to sign in. Please try again.";
      Alert.alert("Login Error", message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView className="flex-1 bg-white">
        <Image
          source={require("@/assets/images/signin_bg.png")}
          className="w-full h-80"
          resizeMode="cover"
        />

        <View className="px-6 pt-4 pb-10">
          <Text className="text-2xl font-bold text-[#1F232B]">
            Welcome Back
          </Text>
          <Text className="text-gray-500 mb-6">
            Sign in to continue shopping
          </Text>

          <Text className="text-sm text-gray-500 mb-1">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border-b border-gray-300 pb-2 text-base text-[#1F232B] mb-6"
            placeholderTextColor="#A1A1A1"
          />

          <Text className="text-sm text-gray-500 mb-1">Password</Text>
          <View className="flex-row items-center border-b border-gray-300 pb-2 mb-8">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              className="flex-1 text-base text-[#1F232B]"
              placeholderTextColor="#A1A1A1"
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSignIn}
            activeOpacity={0.9}
            disabled={!email || !password || loading}
            className={`py-4 rounded-xl ${
              email && password ? "bg-[#FF8A00]" : "bg-[#FFD8B2]"
            }`}
          >
            <Text className="text-white text-center text-lg font-semibold">
              {loading ? "Signing In..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center my-8">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-2 text-gray-400 text-sm">Or continue with</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          <TouchableOpacity
            className="bg-[#FF8A00] py-3 rounded-xl flex-row items-center justify-center mb-3"
            activeOpacity={0.8}
          >
            <Ionicons name="logo-google" size={20} color="#fff" />
            <Text className="text-white font-semibold text-base ml-2">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <View className="mt-10 flex-row justify-center">
            <Text className="text-gray-500">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <Text className="text-[#FF8A00] font-semibold">Join now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
