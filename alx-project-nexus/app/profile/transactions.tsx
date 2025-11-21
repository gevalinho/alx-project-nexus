import { Ionicons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const transactions = [
  {
    id: "1",
    orderId: "ORD-98234",
    amount: "$142.00",
    status: "Completed",
    date: "Jan 10, 2025",
    icon: "checkmark-circle-outline",
    color: "#2ecc71",
  },
  {
    id: "2",
    orderId: "ORD-98235",
    amount: "$89.50",
    status: "Pending",
    date: "Jan 08, 2025",
    icon: "time-outline",
    color: "#f1c40f",
  },
  {
    id: "3",
    orderId: "ORD-98111",
    amount: "$210.99",
    status: "Canceled",
    date: "Dec 29, 2024",
    icon: "close-circle-outline",
    color: "#e74c3c",
  },
];

export default function TransactionHistoryScreen() {
  return (
    <View className="flex-1 bg-white px-5 pt-14">
      {/* Header */}
      <Text className="text-2xl font-semibold text-[#1F232B] mb-6">
        Transaction History
      </Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row justify-between items-center border-b border-gray-100 py-4"
          >
            {/* Left side */}
            <View className="flex-row items-center space-x-3">
              <Ionicons name={item.icon as any} size={28} color={item.color} />

              <View>
                <Text className="text-base font-semibold text-gray-800">
                  {item.orderId}
                </Text>

                <Text className="text-gray-500 text-sm mt-1">
                  {item.date}
                </Text>
              </View>
            </View>

            {/* Right side */}
            <View className="items-end">
              <Text className="text-base font-semibold">{item.amount}</Text>
              <Text
                className={`text-sm mt-1 ${
                  item.status === "Completed"
                    ? "text-green-600"
                    : item.status === "Pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
