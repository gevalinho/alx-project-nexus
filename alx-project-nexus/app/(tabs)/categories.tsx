// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { categories } from "../../lib/data/categories";

// export default function CategoriesPage() {
//   return (
//     <View className="flex-1 bg-white">

//       {/* Header */}
//       <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#0D1A2E" />
//         </TouchableOpacity>

//         <Text className="text-[20px] font-semibold text-[#0D1A2E] ml-4">
//           Categories
//         </Text>
//       </View>

//       {/* Categories List */}
//       <ScrollView className="p-4">
//         {categories.map((cat) => (
//           <TouchableOpacity
//             key={cat.id}
//             activeOpacity={0.8}
//             onPress={() =>
//               router.push({
//                 pathname: "/categoryProducts",
//                 params: { category: cat.id, title: cat.title },
//               })
//             }
//           >
//             <View
//               className="w-full h-[80px] my-2 rounded-2xl flex-row overflow-hidden"
//               style={{ backgroundColor: cat.color }}
//             >
//               <View className="flex-1 justify-center pl-4">
//                 <Text className="text-[18px] font-semibold text-[#0D1A2E]">
//                   {cat.title}
//                 </Text>
//               </View>

//               <Image
//                 source={{ uri: cat.image }}
//                 className="w-[40%] h-full"
//                 resizeMode="cover"
//               />
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { categories } from "../../lib/data/categories";

// export default function CategoriesPage() {
//   return (
//     <View className="flex-1 bg-white">

//       {/* Header */}
//       <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={24} color="#0D1A2E" />
//         </TouchableOpacity>

//         <Text className="text-[20px] font-semibold text-[#0D1A2E] ml-4">
//           Categories
//         </Text>
//       </View>

//       {/* Categories List */}
//       <ScrollView className="p-4">
//         {categories.map((cat) => (
//           <TouchableOpacity
//             key={cat.id}
//             activeOpacity={0.85}
//             onPress={() =>
//               router.push({
//                 pathname: "/(tabs)/categoryProducts",
//                 params: { category: cat.title }, // 🟠 Pass readable category
//               })
//             }
//           >
//             <View
//               className="w-full h-[80px] my-2 rounded-2xl flex-row overflow-hidden"
//               style={{ backgroundColor: cat.color }}
//             >
//               {/* Left Text */}
//               <View className="flex-1 justify-center pl-4">
//                 <Text className="text-[18px] font-semibold text-[#0D1A2E]">
//                   {cat.title}
//                 </Text>
//               </View>

//               {/* Right Image */}
//               <Image
//                 source={{ uri: cat.image }}
//                 className="w-[40%] h-full"
//                 resizeMode="cover"
//               />
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//     </View>
//   );
// }


import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { categories } from "../../lib/data/categories";

export default function CategoriesPage() {
  return (
    <View className="flex-1 bg-white">

      {/* HEADER */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-200">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.back()}
          className="p-1"
        >
          <Ionicons name="arrow-back" size={24} color="#0D1A2E" />
        </TouchableOpacity>

        <Text className="text-[20px] font-semibold text-[#0D1A2E] ml-4">
          Categories
        </Text>
      </View>

      {/* CATEGORY LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.9}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/categoryProducts",
                params: { category: cat.title },
              })
            }
            className="mb-4 rounded-2xl overflow-hidden"
          >
            <View
              className="w-full h-[90px] flex-row"
              style={{ backgroundColor: cat.color }}
            >
              {/* LEFT (TEXT) */}
              <View className="flex-1 justify-center pl-4">
                <Text className="text-[18px] font-semibold text-[#0D1A2E]">
                  {cat.title}
                </Text>
              </View>

              {/* RIGHT (IMAGE) */}
              <Image
                source={{ uri: cat.image }}
                className="w-[40%] h-full"
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </View>
  );
}
