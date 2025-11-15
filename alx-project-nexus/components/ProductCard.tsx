// /**
//  * ProductCard Component
//  * -------------------------------------------------------
//  * Clean version (no theme)
//  * - Displays product image, title, price, rating, and favorite icon
//  * - Fully styled with NativeWind
//  * - Used inside the Home product grid
//  */

// import { toggleFavorite } from "@/lib/store/favoritesSlice";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { Feather } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { Image, Text, TouchableOpacity, View } from "react-native";


// export default function ProductCard({ item }: { item: any }) {

// const dispatch = useAppDispatch();
//   const { items: favs } = useAppSelector((state) => state.favorites);
//   const isFav = favs.some((p) => p.id === item.id);


//   return (
//     <TouchableOpacity onPress={() =>
//     router.push({
//       pathname: "/(tabs)/product/[id]",
//       params: { id: item.id },
//     })
//   }
//       activeOpacity={0.8}
//       className="w-[48%] mb-5 bg-white rounded-2xl p-3 shadow-sm"
//     >
//       {/* Product Image */}
//       <View className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-3">
//         <Image
//           source={{ uri: item.image }}
//           className="w-full h-full"
//           resizeMode="cover"
//         />
//       </View>

//       {/* Product Title */}
//       <Text className="text-sm font-semibold text-black mb-1">
//         {item.title?.slice(0, 25)}
//       </Text>

//       {/* Product Price */}
//       <Text className="text-base font-bold text-orange-500 mb-3">
//         ${item.price}
//       </Text>

//       {/* Bottom Row: Rating + Favorite Icon */}
//       <View className="flex-row justify-between items-center">

//         {/* Rating */}
//         <View className="flex-row items-center">
//           <Feather name="star" size={16} color="#F5A623" />
//           <Text className="ml-1 text-sm text-gray-600">
//             {item.rating?.rate}
//           </Text>
//         </View>

//         {/* Favorite Button */}
//         <TouchableOpacity 
//          onPress={() => dispatch(toggleFavorite(item))}
//          className="p-2 rounded-full bg-gray-100">
//           <Feather name="heart" size={17} color="#0D1A2E" />
//         </TouchableOpacity>

//       </View>
//     </TouchableOpacity>
//   );
// }

import { toggleFavorite } from "@/lib/store/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Product } from "@/lib/types/Product";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ProductCard({ item }: { item: Product }) {
  const dispatch = useAppDispatch();
  const { items: favorites } = useAppSelector((state) => state.favorites);

  const isFav = favorites.some((p) => p.id === item.id);

  const openDetails = () => {
    router.push({
      pathname: "/(tabs)/product/[id]",
      // params: { id: item.id.toString() },
      params: { id: item.id },
    });
  };

  return (
    <TouchableOpacity
      onPress={openDetails}
      activeOpacity={0.85}
      className="w-[48%] mb-5 bg-white rounded-2xl p-3 shadow-sm"
    >
      {/* Image */}
      <View className="w-full h-36 bg-gray-100 rounded-xl overflow-hidden mb-3">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Favorite */}
        <TouchableOpacity
          onPress={() => dispatch(toggleFavorite(item))}
          className="absolute right-2 top-2 bg-white/80 p-1.5 rounded-full"
        >
          <Feather
            name="heart"
            size={18}
            color={isFav ? "#FF8A00" : "#D1D5DB"}
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text className="text-sm font-semibold text-black" numberOfLines={2}>
        {item.title}
      </Text>

      {/* Price */}
      <Text className="text-base font-bold text-orange-500 my-2">
        ${item.price}
      </Text>

      {/* Rating */}
      <View className="flex-row items-center">
        <Feather name="star" size={15} color="#F5A623" />
        <Text className="ml-1 text-sm text-gray-600">
          {item.rating?.rate ?? "--"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
