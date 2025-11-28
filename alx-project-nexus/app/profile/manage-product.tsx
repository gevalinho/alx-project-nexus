import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type ManageAction = {
  id: string;
  label: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const actions: ManageAction[] = [
  {
    id: "create",
    label: "Create Product",
    description: "Post a new product and start selling in minutes.",
    icon: "add-circle-outline",
    route: "/profile/create-product",
  },
  {
    id: "delete",
    label: "Delete Products",
    description: "Remove listings that are no longer available.",
    icon: "trash-outline",
    route: "/profile/delete-products",
  },
];

export default function ManageProductScreen() {
  return (
    <View className="flex-1 bg-white px-5 pt-14">
      <Stack.Screen
        options={{
          title: "Manage Products",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />

      <Text className="text-2xl font-semibold text-[#1F232B] mb-2">
        Manage Products
      </Text>
      <Text className="text-gray-500 mb-6">
        Control your product catalog from one place.
      </Text>

      <View className="space-y-4">
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            className="flex-row items-center bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4"
            activeOpacity={0.85}
            onPress={() => router.push(action.route)}
          >
            <View className="w-12 h-12 rounded-full bg-[#FF8A00]/10 items-center justify-center mr-4">
              <Ionicons name={action.icon} size={24} color="#FF8A00" />
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold text-[#1F232B]">
                {action.label}
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                {action.description}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
