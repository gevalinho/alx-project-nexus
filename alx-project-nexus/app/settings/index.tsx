import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SettingToggle = {
  id: string;
  label: string;
  description: string;
  value: boolean;
};

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<SettingToggle[]>([
    {
      id: "push",
      label: "Push Notifications",
      description: "Get notified about new orders and promotions.",
      value: true,
    },
    {
      id: "email",
      label: "Email Updates",
      description: "Receive weekly insights and new arrivals.",
      value: false,
    },
    {
      id: "biometrics",
      label: "Quick Sign In",
      description: "Enable biometrics for faster sign in.",
      value: true,
    },
  ]);

  const toggleSetting = (id: string) => {
    setToggles((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, value: !item.value } : item
      )
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-row items-center px-5 pt-14 pb-4 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="arrow-back" size={20} color="#1F232B" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-[#1F232B] ml-4">
          Settings
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-white border border-gray-100 rounded-3xl">
          {toggles.map((item, index) => (
            <View
              key={item.id}
              className={`flex-row items-center px-4 py-4 ${
                index !== toggles.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <View className="flex-1">
                <Text className="text-base font-semibold text-[#1F232B]">
                  {item.label}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  {item.description}
                </Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={() => toggleSetting(item.id)}
                trackColor={{ false: "#CBD5F5", true: "#FFCD99" }}
                thumbColor={item.value ? "#FF8A00" : "#f4f3f4"}
              />
            </View>
          ))}
        </View>

        <View className="mt-8 bg-white border border-gray-100 rounded-3xl">
          {[
            {
              label: "Connected Accounts",
              icon: "link-outline" as const,
              onPress: () => {},
            },
            {
              label: "Payment Preferences",
              icon: "card-outline" as const,
              onPress: () => router.push("/profile/transactions"),
            },
            {
              label: "Security Settings",
              icon: "shield-checkmark-outline" as const,
              onPress: () => router.push("/settings/security"),
            },
          ].map((item, index, arr) => (
            <TouchableOpacity
              key={item.label}
              className={`flex-row items-center px-4 py-4 ${
                index !== arr.length - 1 ? "border-b border-gray-100" : ""
              }`}
              onPress={item.onPress}
              activeOpacity={0.8}
            >
              <View className="w-10 h-10 rounded-full bg-[#FF8A00]/10 items-center justify-center mr-3">
                <Ionicons name={item.icon} size={20} color="#FF8A00" />
              </View>
              <Text className="flex-1 text-base font-semibold text-[#1F232B]">
                {item.label}
              </Text>
              <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
