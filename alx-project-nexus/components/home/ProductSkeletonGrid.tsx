import { View } from "react-native";

type SkeletonProps = {
  count?: number;
};

const PLACEHOLDER_COUNT = 6;

export default function ProductSkeletonGrid({ count = PLACEHOLDER_COUNT }: SkeletonProps) {
  const placeholders = Array.from({ length: count });

  return (
    <View className="mb-10">
      <View className="flex-row flex-wrap justify-between">
        {placeholders.map((_, idx) => (
          <View
            key={idx}
            className="w-[48%] mb-5 bg-white rounded-2xl p-3 border border-gray-100"
          >
            <View className="w-full h-36 bg-gray-200 rounded-xl mb-3" />
            <View className="h-4 bg-gray-200 rounded mb-2" />
            <View className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
            <View className="h-4 bg-gray-200 rounded w-1/3" />
          </View>
        ))}
      </View>
    </View>
  );
}
