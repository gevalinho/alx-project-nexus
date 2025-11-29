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
    {
      id: "sneakers",
      title: "Sneaker Drop",
      headline: "Up to 40% off",
      subtext: "Limited edition runners",
      image:
        "https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "bags",
      title: "Luxury Bags",
      headline: "New arrivals",
      subtext: "Handcrafted leather pieces",
      image:
        "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: "tech",
      title: "Smart Gadgets",
      headline: "Bundle & Save 25%",
      subtext: "Wearables · Headphones · Speakers",
      image:
        "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80",
    },
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
        keyExtractor={(item) => item.id}
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
                {item.title}
              </Text>

              <Text className="text-[26px] font-bold text-[#0D1A2E] mt-1">
                {item.headline}
              </Text>
              <Text className="text-[13px] text-gray-500 px-5 mt-1">
                {item.subtext}
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
              source={{ uri: item.image }}
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
