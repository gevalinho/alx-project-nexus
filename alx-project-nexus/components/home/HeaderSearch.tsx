import { Feather, Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function HeaderSearch() {
  return (
    <View className="flex-row items-center px-4">

      {/* Search Box */}
      <View className="flex-row items-center bg-[#F4F4F8] px-4 py-3 rounded-2xl flex-1">
        <Ionicons name="search" size={20} color="#FF8A00" />
        <TextInput
          placeholder="Search Outfit"
          placeholderTextColor="#A0A0A0"
          className="ml-3 flex-1 text-[#0D1A2E]"
        />
      </View>

      {/* Heart Icon */}
      <TouchableOpacity className="ml-3">
        <Feather name="heart" size={24} color="#0D1A2E" />
      </TouchableOpacity>

      {/* Bell Icon + Badge */}
      <TouchableOpacity className="ml-3 relative">
        <Feather name="bell" size={24} color="#0D1A2E" />

        <View className="absolute right-0 top-0 w-2 h-2 bg-orange-500 rounded-full" />
      </TouchableOpacity>

    </View>
  );
}
