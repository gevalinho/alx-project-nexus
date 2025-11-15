// import { useAppSelector } from "@/lib/store/hooks";
// import { Feather, Ionicons } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// export default function ProductDetails() {
//   const { id } = useLocalSearchParams();

//   // Get product from Redux store
//   const { items } = useAppSelector((state) => state.products);
//   const product = items.find((p) => p.id.toString() === id);

//   if (!product) {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <Text className="text-gray-600">Product not found</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-white">

//       {/* Header with Back + Favorite */}
//       <View className="absolute z-20 w-full flex-row justify-between px-5 pt-10">
//         <TouchableOpacity
//           className="bg-white/80 p-2 rounded-full"
//           onPress={() => router.back()}
//         >
//           <Ionicons name="arrow-back" size={22} color="#0D1A2E" />
//         </TouchableOpacity>

//         <TouchableOpacity className="bg-white/80 p-2 rounded-full">
//           <Feather name="heart" size={22} color="#FF8A00" />
//         </TouchableOpacity>
//       </View>

//       {/* Product Image */}
//       <Image
//         source={{ uri: product.image }}
//         className="w-full h-[380px]"
//         resizeMode="cover"
//       />

//       {/* Product Content */}
//       <ScrollView className="p-5 -mt-4 bg-white rounded-t-3xl">

//         {/* Title + Price */}
//         <View className="flex-row justify-between items-center mb-3">
//           <Text className="text-[20px] font-semibold text-[#0D1A2E]">
//             {product.title}
//           </Text>

//           <Text className="text-[22px] font-bold text-[#FF8A00]">
//             ${product.price}
//           </Text>
//         </View>

//         {/* Description */}
//         <Text className="text-gray-500 leading-5 mb-4">
//           Made from best wood and made as comfortable as possible for you
//           also the premium design.
//         </Text>

//         {/* Sold + Rating */}
//         <View className="flex-row items-center mb-5">
//           <Text className="text-gray-600 mr-2">Sold 666</Text>

//           <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-lg">
//             <Feather name="star" size={14} color="#FF8A00" />
//             <Text className="ml-1 text-gray-700">{product.rating.rate}</Text>
//           </View>
//         </View>

//         {/* Size Selection */}
//         <Text className="text-gray-600 mb-2">Size :</Text>

//         <View className="flex-row mb-5">
//           {["S", "M", "L", "XL"].map((size) => (
//             <View
//               key={size}
//               className="w-12 h-12 bg-gray-100 rounded-xl justify-center items-center mr-3"
//             >
//               <Text className="text-[#0D1A2E] font-semibold">{size}</Text>
//             </View>
//           ))}
//         </View>

//         {/* Color Selection */}
//         <Text className="text-gray-600 mb-2">Color :</Text>

//         <View className="flex-row mb-8">
//           {["#1C1C3A", "#6C4A4A", "#D0D7E1", "#4E7C7B"].map((color, idx) => (
//             <View
//               key={idx}
//               className="w-10 h-10 rounded-xl mr-3"
//               style={{ backgroundColor: color }}
//             />
//           ))}
//         </View>

//         {/* CTAs */}
//         <View className="flex-row justify-between mb-10">
//           <TouchableOpacity className="flex-1 border border-[#FF8A00] py-4 rounded-xl mr-3">
//             <Text className="text-center text-[#FF8A00] font-semibold">
//               Add To Cart
//             </Text>
//           </TouchableOpacity>

//           <TouchableOpacity className="flex-1 bg-[#FF8A00] py-4 rounded-xl ml-3">
//             <Text className="text-center text-white font-semibold">
//               Buy Now
//             </Text>
//           </TouchableOpacity>
//         </View>

//       </ScrollView>
//     </View>
//   );
// }


import { toggleFavorite } from "@/lib/store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();

  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.products);
  const { items: favs } = useAppSelector((state) => state.favorites);

  // Find product by ID
  const product = items.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-gray-600">Product not found</Text>
      </View>
    );
  }

  const isFav = favs.some((p) => p.id === product.id);

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
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

      {/* Image */}
      <Image
        source={{ uri: product.image }}
        className="w-full h-[380px]"
        resizeMode="cover"
      />

      {/* Content */}
      <ScrollView className="p-5 -mt-4 bg-white rounded-t-3xl">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-[20px] font-semibold text-[#0D1A2E] w-[65%]">
            {product.title}
          </Text>
          <Text className="text-[22px] font-bold text-[#FF8A00]">
            ${product.price}
          </Text>
        </View>

        <Text className="text-gray-500 leading-5 mb-4">
          {product.description}
        </Text>

        <View className="flex-row items-center mb-5">
          <Text className="text-gray-600 mr-2">Sold 666</Text>

          <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-lg">
            <Feather name="star" size={14} color="#FF8A00" />
            <Text className="ml-1 text-gray-700">
              {product.rating?.rate}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
