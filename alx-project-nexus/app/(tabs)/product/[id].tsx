import { addToCart } from "@/lib/store/cartSlice";
import { toggleFavorite } from "@/lib/store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.products);
  const { items: favs } = useAppSelector((state) => state.favorites);

  const product = items.find((p) => p.id.toString() === String(id));
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#1C1C3A");

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600">Product not found</Text>
      </View>
    );
  }

  const displayTitle = product.name ?? product.title ?? "";
  const displayPrice = Number(product.price) || 0;

  const isFav = favs.some((p) => p.id === product.id);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    router.push("/(tabs)/cart");
  };

  return (
    <View className="flex-1 bg-white">

      {/* HEADER */}
      <View className="absolute z-20 w-full flex-row justify-between px-5 pt-10">
        
        <TouchableOpacity
          className="bg-white/80 p-2 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={22} color="#0D1A2E" />
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white/80 p-2 rounded-full"
          onPress={() => dispatch(toggleFavorite(product))}
        >
          <Feather
            name="heart"
            size={22}
            color={isFav ? "#FF8A00" : "#0D1A2E"}
          />
        </TouchableOpacity>
      </View>

      {/* PRODUCT IMAGE */}
      <Image
        source={{ uri: product.image }}
        className="w-full h-[380px]"
        resizeMode="cover"
      />

      <ScrollView className="p-5 -mt-4 bg-white rounded-t-3xl">

        {/* TITLE + PRICE */}
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-[20px] font-semibold text-[#0D1A2E] w-[70%]">
            {displayTitle}
          </Text>

          <Text className="text-[22px] font-bold text-[#FF8A00]">
            ${displayPrice}
          </Text>
        </View>

        {/* DESCRIPTION */}
        <Text className="text-gray-500 leading-5 mb-4">
          {product.description}
        </Text>

        {/* SOLD + RATING */}
        <View className="flex-row items-center mb-5">
          <Text className="text-gray-600 mr-2">Sold 666</Text>

          <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-lg">
            <Feather name="star" size={14} color="#FF8A00" />
            <Text className="ml-1 text-gray-700">{product.rating?.rate}</Text>
          </View>
        </View>

        {/* SIZE SELECT */}
        <Text className="text-gray-600 mb-2">Size :</Text>

        <View className="flex-row mb-5">
          {["S", "M", "L", "XL"].map((size) => (
            <TouchableOpacity
              key={size}
              onPress={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-xl justify-center items-center mr-3 ${
                selectedSize === size ? "bg-[#FF8A00]" : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-semibold ${
                  selectedSize === size ? "text-white" : "text-[#0D1A2E]"
                }`}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* COLOR SELECT */}
        <Text className="text-gray-600 mb-2">Color :</Text>

        <View className="flex-row mb-8">
          {["#1C1C3A", "#6C4A4A", "#D0D7E1", "#4E7C7B"].map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => setSelectedColor(color)}
              className={`w-10 h-10 rounded-xl mr-4 border-2 ${
                selectedColor === color ? "border-[#FF8A00]" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </View>

        {/* ACTION BUTTONS */}
        <View className="flex-row justify-between mb-10">

          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 border border-[#FF8A00] py-4 rounded-xl mr-3"
          >
            <Text className="text-center text-[#FF8A00] font-semibold">
              Add To Cart
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleBuyNow}
            className="flex-1 bg-[#FF8A00] py-4 rounded-xl ml-3"
          >
            <Text className="text-center text-white font-semibold">
              Buy Now
            </Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}
