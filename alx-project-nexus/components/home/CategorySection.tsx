import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

/**
 * CategorySection Component
 * -------------------------
 * Displays a horizontal scroll list of category cards.
 * Clean, reusable, Figma-accurate UI.
 */

const CATEGORIES = [
  {
    title: "Man Style",
    color: "#DCE4D9",
    image:
      "https://images.pexels.com/photos/769874/pexels-photo-769874.jpeg?auto=compress",
  },
  {
    title: "Woman Style",
    color: "#D9DDEA",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress",
  },
  {
    title: "Kids Style",
    color: "#E9E8EB",
    image:
      "https://images.pexels.com/photos/3933213/pexels-photo-3933213.jpeg?auto=compress",
  },
];

export default function CategorySection() {
  return (
    <View className="mt-2 mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[20px] font-semibold text-[#0D1A2E]">
          Categories
        </Text>

        <TouchableOpacity>
          <Text className="text-[#FF8A00] font-semibold">View all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {CATEGORIES.map((cat, idx) => {
          const words = cat.title.split(" ");

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              className="w-[150px] h-[70px] rounded-2xl mr-3 flex-row overflow-hidden"
              style={{ backgroundColor: cat.color }}
            >
              {/* Left Text */}
              <View className="w-[60%] items-start justify-center pl-3">
                <Text className="text-[15px] font-semibold text-[#0D1A2E] leading-4">
                  {words[0]}
                </Text>
                <Text className="text-[15px] font-semibold text-[#0D1A2E] leading-4 mt-0.5">
                  {words[1]}
                </Text>
              </View>

              {/* Right Image */}
              <Image
                source={{ uri: cat.image }}
                className="w-[40%] h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
