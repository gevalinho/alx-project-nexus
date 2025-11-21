import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const notifications = [
  {
    id: "1",
    title: "Your order has been shipped",
    message: "Order #12345 is on its way.",
    time: "2 hr ago",
    icon: "cube-outline",
  },
  {
    id: "2",
    title: "New discount available!",
    message: "You have a new 20% off coupon.",
    time: "Yesterday",
    icon: "pricetag-outline",
  },
  {
    id: "3",
    title: "Password changed",
    message: "Your password was successfully updated.",
    time: "3 days ago",
    icon: "lock-closed-outline",
  },
];

export default function NotificationScreen() {
  return (
    <View className="flex-1 bg-white px-5 pt-14">

      {/* Header */}
      <Text className="text-2xl font-semibold text-[#1F232B] mb-6">
        Notifications
      </Text>

      {/* Notifications List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-start mb-6"
          >
            {/* ICON */}
            <View className="w-10 h-10 rounded-full bg-[#FF8A00]/10 justify-center items-center mr-3">
              <Ionicons name={item.icon as any} size={22} color="#FF8A00" />
            </View>

            {/* TEXT */}
            <View className="flex-1">
              <Text className="text-base font-semibold text-[#1F232B]">
                {item.title}
              </Text>
              <Text className="text-gray-500 mt-1">{item.message}</Text>

              <Text className="text-gray-400 text-xs mt-1">{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
