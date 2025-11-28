import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { categories } from "@/lib/data/categories";

export default function CategorySection() {
  const router = useRouter();

  return (
    <View className="mt-2 mb-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-[20px] font-semibold text-[#0D1A2E]">
          Categories
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/(tabs)/categories")}
        >
          <Text className="text-[#FF8A00] font-semibold">View all</Text>
        </TouchableOpacity>
      </View>

      {/* Horizontal Categories Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
      >
        {categories.map((cat) => {
          const [first, second] = cat.title.split(" ");

          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.8}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/categoryProducts",
                  params: { category: cat.category ?? cat.title, title: cat.title },
                })
              }
              className="w-[150px] h-[70px] rounded-2xl mr-3 flex-row overflow-hidden"
              style={{ backgroundColor: cat.color }}
            >
              {/* Text Side */}
              <View className="w-[60%] justify-center pl-3">
                <Text className="text-[15px] font-semibold text-[#0D1A2E] leading-4">
                  {first}
                </Text>

                {second && (
                  <Text className="text-[15px] font-semibold text-[#0D1A2E] leading-4 mt-0.5">
                    {second}
                  </Text>
                )}
              </View>

              {/* Image Side */}
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
