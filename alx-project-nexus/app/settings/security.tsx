import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useMemo } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const securityTips = [
  "Use a unique password for your account.",
  "Enable biometrics for faster yet secure sign-in.",
  "Review login devices regularly.",
  "Report suspicious activity immediately.",
];

export default function SecuritySettings() {
  const tipColumns = useMemo(() => {
    const mid = Math.ceil(securityTips.length / 2);
    return [securityTips.slice(0, mid), securityTips.slice(mid)];
  }, []);

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
          Security
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-[#FFF6ED] border border-[#FFE2C2] rounded-3xl p-5 mb-6">
          <Text className="text-xs uppercase tracking-wide text-[#FF8A00] mb-2">
            Keep your account safe
          </Text>
          <Text className="text-[20px] font-semibold text-[#1F232B] mb-1">
            Update Password
          </Text>
          <Text className="text-gray-600">
            Choose a strong password with at least 8 characters.
          </Text>

          <View className="mt-4 space-y-4">
            <TextInput
              placeholder="Current Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              className="border border-gray-200 rounded-2xl px-4 py-3"
            />
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              className="border border-gray-200 rounded-2xl px-4 py-3"
            />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              className="border border-gray-200 rounded-2xl px-4 py-3"
            />

            <TouchableOpacity className="bg-[#FF8A00] rounded-2xl py-4 items-center">
              <Text className="text-white font-semibold text-base">
                Save Changes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="bg-white border border-gray-100 rounded-3xl p-5">
          <Text className="text-base font-semibold text-[#1F232B] mb-3">
            Login & Device Control
          </Text>

          <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-100">
            <Ionicons
              name="finger-print-outline"
              size={22}
              color="#FF8A00"
              style={{ marginRight: 12 }}
            />
            <Text className="flex-1 text-[#1F232B] font-semibold">
              Enable Biometrics
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center py-3">
            <Ionicons
              name="laptop-outline"
              size={22}
              color="#FF8A00"
              style={{ marginRight: 12 }}
            />
            <Text className="flex-1 text-[#1F232B] font-semibold">
              Manage Devices
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#A0AEC0" />
          </TouchableOpacity>
        </View>

        <View className="mt-6 bg-white border border-gray-100 rounded-3xl p-5">
          <Text className="text-base font-semibold text-[#1F232B] mb-3">
            Security Tips
          </Text>
          <View className="flex-row">
            {tipColumns.map((column, columnIndex) => (
              <View key={columnIndex} className="flex-1">
                {column.map((tip) => (
                  <View key={tip} className="flex-row items-start mb-3 pr-2">
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#10B981"
                      style={{ marginTop: 2, marginRight: 8 }}
                    />
                    <Text className="text-sm text-gray-600">{tip}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
