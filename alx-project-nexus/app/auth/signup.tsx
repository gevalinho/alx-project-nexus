import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { registerUser } from "@/lib/api/auth";
import { setLoading } from "@/lib/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export default function SignUpScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleChange = (
    key: "first_name" | "last_name" | "email" | "password",
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "email") {
      setIsValidEmail(/\S+@\S+\.\S+/.test(value));
    }
  };

  const handleSignUp = async () => {
    const { first_name, last_name, email, password } = form;

    if (!first_name || !last_name || !email || !password) {
      Alert.alert("Missing Fields", "Please fill out all fields.");
      return;
    }

    if (!isValidEmail) {
      Alert.alert("Invalid Email", "Please provide a valid email address.");
      return;
    }

    dispatch(setLoading(true));

    try {
      const res = await registerUser({
        first_name,
        last_name,
        email,
        password,
      });

      Alert.alert(
        "Account Created",
        res.message ||
          "User registered successfully. Please sign in to continue.",
        [
          {
            text: "Go to Sign In",
            onPress: () => router.replace("/auth/signin"),
          },
        ]
      );
    } catch (error: any) {
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Unable to create account. Please try again.";
      Alert.alert("Signup Error", message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 bg-white"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-6 pt-16 pb-10">
            <View className="items-center mb-10">
              <Image
                source={require("@/assets/logo/nexus-logo.png")}
                className="w-32 h-32"
                resizeMode="contain"
              />
            </View>

            <Text className="text-2xl font-bold text-[#1F232B] mb-1">
              Sign Up
            </Text>
            <Text className="text-gray-500 mb-10">
              Enter your credentials to continue
            </Text>

            <InputLabel label="First name" />
            <TextInput
              value={form.first_name}
              onChangeText={(value) => handleChange("first_name", value)}
              placeholder="Enter your first name"
              className="border-b border-gray-300 pb-2 text-base text-[#1F232B] mb-8"
              placeholderTextColor="#A1A1A1"
            />

            <InputLabel label="Last name" />
            <TextInput
              value={form.last_name}
              onChangeText={(value) => handleChange("last_name", value)}
              placeholder="Enter your last name"
              className="border-b border-gray-300 pb-2 text-base text-[#1F232B] mb-8"
              placeholderTextColor="#A1A1A1"
            />

            <InputLabel label="Email" />
            <View className="flex-row items-center border-b border-gray-300 pb-2 mb-8">
              <TextInput
                value={form.email}
                onChangeText={(value) => handleChange("email", value)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 text-base text-[#1F232B]"
                placeholderTextColor="#A1A1A1"
              />
              {isValidEmail && (
                <Ionicons name="checkmark" size={20} color="#FF8A00" />
              )}
            </View>

            <InputLabel label="Password" />
            <View className="flex-row items-center border-b border-gray-300 pb-2 mb-8">
              <TextInput
                value={form.password}
                onChangeText={(value) => handleChange("password", value)}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                className="flex-1 text-base text-[#1F232B]"
                placeholderTextColor="#A1A1A1"
              />

              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#FF8A00"
                />
              </TouchableOpacity>
            </View>

            <Text className="text-gray-500 text-sm mb-8 leading-5">
              By continuing you agree to our{" "}
              <Text className="text-[#FF8A00] font-medium">Terms of Service</Text>{" "}
              and{" "}
              <Text className="text-[#FF8A00] font-medium">Privacy Policy</Text>.
            </Text>

            <TouchableOpacity
              onPress={handleSignUp}
              activeOpacity={0.9}
              disabled={
                !form.first_name ||
                !form.last_name ||
                !form.email ||
                !form.password ||
                loading
              }
              className={`py-4 rounded-xl ${
                form.first_name && form.last_name && form.email && form.password
                  ? "bg-[#FF8A00]"
                  : "bg-[#FF8A00]/50"
              }`}
            >
              <Text className="text-white text-center text-lg font-semibold">
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <View className="mt-10 flex-row justify-center">
              <Text className="text-gray-500">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/auth/signin")}>
                <Text className="text-[#FF8A00] font-semibold">Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const InputLabel = ({ label }: { label: string }) => (
  <Text className="text-sm text-gray-500 mb-1">{label}</Text>
);
