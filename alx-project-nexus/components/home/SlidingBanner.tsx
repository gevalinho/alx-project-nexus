import React, { useState } from "react";
import {
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    useWindowDimensions,
    View
} from "react-native";

/**
 * SlidingBanner Component
 * -----------------------
 * A reusable banner slider for promotions.
 * Automatically:
 *  - Adjusts to screen width
 *  - Handles horizontal swipe + paging
 *  - Updates indicator dots
 *  - Provides clean styling for banner UI
 */

export default function SlidingBanner() {
  const { width } = useWindowDimensions();
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    "https://picsum.photos/seed/promo1/800/500",
    "https://picsum.photos/seed/promo2/800/500",
    "https://picsum.photos/seed/promo3/800/500",
  ];

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    setCurrentBanner(Math.round(x / width));
  };

  return (
    <View style={{ width }} className="h-56 mb-4 self-center">
      <FlatList
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View
            style={{ width: width * 1.01 }}
            className="ml-1 h-48 rounded-[25px] bg-[#F2F2F7] mx-auto my-auto flex-row items-center px-5 overflow-hidden"
          >
            {/* Left Content */}
            <View className="flex-1">
              <Text className="text-[18px] font-semibold px-5 text-[#0D1A2E]">
                New Year Sale
              </Text>

              <Text className="text-[26px] font-bold text-[#0D1A2E] mt-1">
                40% off
              </Text>

              {/* Countdown */}
              <View className="flex-row mt-4">
                {["02", "09", "24"].map((num, index) => (
                  <View
                    key={index}
                    className="bg-white px-3 py-1 rounded-xl mx-1 shadow-sm"
                  >
                    <Text className="font-bold text-[#0D1A2E]">{num}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Right Image */}
            <Image
              source={{ uri: item }}
              className="w-[55%] h-full rounded-r-[25px]"
              resizeMode="cover"
            />
          </View>
        )}
      />

      {/* Indicator Dots */}
      <View className="flex-row justify-center mt-2">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              currentBanner === index ? "bg-orange-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
