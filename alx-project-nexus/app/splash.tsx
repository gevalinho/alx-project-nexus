

import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      // router.replace("/auth/login");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-[#ffffff]">

      <StatusBar style="light" backgroundColor="#FF8A00" />

      {/* Full absolute center wrapper */}
      <View className="absolute inset-0 justify-center items-center">

        {/* Logo */}
        <Image
          source={require("@/assets/logo/nexus-logo.png")}
          className="w-40 h-40 mb-3"
          resizeMode="contain"
        />

        {/* App Name */}
        <Text className="text-[#FF8A00] text-[32px] font-semibold tracking-[2px]">
          Nexus
        </Text>

        <Text className="text-[#FF8A00]/80 text-sm mt-1">
          smart shopping experience
        </Text>

      </View>
    </View>
  );
}

// import { useEffect } from "react";
// import { Image, Text, View } from "react-native";

// export default function SplashScreen() {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       // router.replace("/(tabs)/home");
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <View className="flex-1 bg-[#ffffff] items-center justify-center">
//       {/* CENTERED LOGO + TEXT */}
//       <View className="items-center space-y-2">
//         <Image
//           source={require("@/assets/logo/nexus-logo.png")}
//           className="w-28 h-28"
//           resizeMode="contain"
//         />

//         <Text className="text-white text-4xl font-bold tracking-wide">
//           nectar
//         </Text>

//         <Text className="text-white text-xs tracking-[2px] opacity-80">
//           online groceries
//         </Text>
//       </View>
//     </View>
//   );
// }



