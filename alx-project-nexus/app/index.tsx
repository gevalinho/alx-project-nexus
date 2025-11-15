
import { Feather, Ionicons } from "@expo/vector-icons";
// import { useEffect } from "react";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../lib/store/hooks";
import { fetchProducts } from "../lib/store/productSlice";





const banners = [
  // "https://i.pinimg.com/736x/3d/30/42/3d3042aeb78f99c2efe5dfa3b3f9b9d2.jpg",
  // "https://picsum.photos/seed/banner2/800/500",
  "https://picsum.photos/seed/banner3/800/500",
  "https://picsum.photos/seed/banner4/800/500",
];

// const { width } = Dimensions.get("window");


export default function Home() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.products);
  const { width } = Dimensions.get("window");

const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">

      {/* 🔍 Search Bar */}
      <View className="flex-row items-center mb-5">
        <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-2xl flex-1">
          <Ionicons name="search" size={20} color="#FF7200" />
          <TextInput
            placeholder="Search Outfit"
            placeholderTextColor="#888"
            className="ml-3 flex-1 text-black text-base"
          />
        </View>

        {/* Icons */}
        <TouchableOpacity className="ml-3 bg-gray-100 p-3 rounded-xl">
          <Feather name="heart" size={22} color="#0D1A2E" />
        </TouchableOpacity>

        <TouchableOpacity className="ml-2 bg-gray-100 p-3 rounded-xl">
          <Feather name="bell" size={22} color="#0D1A2E" />
        </TouchableOpacity>
      </View>

      {/* 🛍 Banner */}
      {/* <View className="w-full h-44 rounded-2xl mb-6 overflow-hidden bg-gray-200">
        <Image
          // source={{
          //   uri: "https://i.pinimg.com/736x/3d/30/42/3d3042aeb78f99c2efe5dfa3b3f9b9d2.jpg",
          // }}
          source={require("../assets/images/banner_1.png")}
          className="w-full h-full"
        />

        <View className="absolute left-4 top-4">
          <Text className="text-2xl font-bold text-white">New Year Sale</Text>
          <Text className="text-xl font-bold text-white">40% off</Text>

          {/* Countdown */}
          {/* <View className="flex-row mt-3">
            {["02", "09", "24"].map((num, index) => (
              <View
                key={index}
                className="bg-white px-2 py-1 rounded-lg mx-1"
              >
                <Text className="font-semibold text-gray-700">{num}</Text>
              </View>
            ))}
          </View> */}
        {/* </View> */}
      {/* </View> */} 


     
{/* 📌 Sliding Banner */}
<View
  style={{ width }}
  className="h-56 mb-4 self-center "   // ⬅️ Increased height from h-44 → h-56
>
  <FlatList
    data={banners}
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
  <View
    style={{ width: width * 1.01 }}       // ⬅️ slightly smaller than screen
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

    onScroll={(e) => {
      const x = e.nativeEvent.contentOffset.x;
      setCurrentBanner(Math.round(x / width));
    }}
    scrollEventThrottle={16}
  />
</View>



<View className="flex-row justify-center mt-1 mb-6">
  {banners.map((_, index) => (
    <View
      key={index}
      className={`h-2 w-2 rounded-full mx-1 ${
        currentBanner === index ? "bg-orange-500" : "bg-gray-300"
      }`}
    />
  ))}
</View>

      {/* 🟡 Pagination Dots */}
      {/* <View className="flex-row justify-center mb-6">
        {[1, 2, 3, 4, 5].map((dot) => (
          <View
            key={dot}
            className={`w-2 h-2 rounded-full mx-1 ${
              dot === 1 ? "bg-orange-400" : "bg-gray-300"
            }`}
          />
        ))}
      </View> */}

      {/* Categories Header */}
      {/* <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-black">Categories</Text>
        <Text className="text-orange-500 font-semibold">View all</Text>
      </View> */}

     {/* 🧭 Categories */}
<View className="flex-row justify-between items-center mb-3 mt-2">
  <Text className="text-[20px] font-semibold text-[#0D1A2E]">
    Categories
  </Text>
  <Text className="text-[#FF8A00] font-semibold">View all</Text>
</View>

<ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  className="mb-6"
>
  {[
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
  ].map((cat, idx) => (
    <View
      key={idx}
      className="w-[150px] h-[70px] rounded-2xl mr-3 flex-row overflow-hidden"
      style={{ backgroundColor: cat.color }}
    >
      {/* Left: Category Text */}
      <TouchableOpacity
  activeOpacity={0.8}
  key={idx}
  className="w-[150px] h-[70px] rounded-2xl mr-3 flex-row overflow-hidden"
  style={{ backgroundColor: cat.color }}
>
      <View className="w-[60%] items-start justify-center pl-3">
        <Text className="text-[15px] font-semibold text-[#0D1A2E] leading-4">
          {cat.title.split(" ")[0]}
        </Text>
        <Text className="text-[15px] font-semibold text-[#0D1A2E] leading-4 mt-0.5">
          {cat.title.split(" ")[1]}
        </Text>
      </View>
      </TouchableOpacity>

      {/* Right: Image */}
      <Image
        source={{ uri: cat.image }}
        className="w-[40%] h-full"
        resizeMode="cover"
      />
    </View>
  ))}
</ScrollView>


      {/* Popular Products Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-black">
          Popular Product
        </Text>
        <Text className="text-orange-500 font-semibold">View all</Text>
      </View>

      {/* Products Grid */}
      <FlatList
        data={items.slice(0, 4)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard item={item} />}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}
