
// import { useEffect } from "react";
import CategorySection from "@/components/home/CategorySection";
import HeaderSearch from "@/components/home/HeaderSearch";
import ProductGrid from "@/components/home/ProductGrid";
import ProductSkeletonGrid from "@/components/home/ProductSkeletonGrid";
import SlidingBanner from "@/components/home/SlidingBanner";
import { logout } from "@/lib/store/authSlice";
import { clearAuth } from "@/lib/utils/storage";
import { fetchProducts } from "@/lib/store/productSlice";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";





export default function Home() {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector((state) => state.products);
  const authLoading = useAppSelector((state) => state.auth.loading);
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLogout = async () => {
    dispatch(logout());
    await clearAuth();
    router.replace("/auth/signin");
  };

  return (
<>
    <SafeAreaView className="flex-1 bg-white">
     <View className="flex-row items-center px-4 pt-4 pb-2">
       <View className="flex-1">
         <HeaderSearch/>
       </View>
       <TouchableOpacity
         onPress={handleLogout}
         className="ml-3 px-3 py-2 rounded-full bg-[#FF8A00]"
         activeOpacity={0.8}
       >
         <Text className="text-white text-sm font-semibold">
           Logout
         </Text>
       </TouchableOpacity>
     </View>

  <ScrollView className="flex-1 bg-white px-4 pt-5">
     
      <SlidingBanner/>
      <CategorySection />
    

      {/* Popular Products Header */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-semibold text-black">
          Popular Product
        </Text>
        <Text className="text-orange-500 font-semibold">View all</Text>
      </View>

      {loading ? (
        <ProductSkeletonGrid />
      ) : (
        <ProductGrid items={items} />
      )}
    </ScrollView>
    
    </SafeAreaView>
    </>
    
  );
}
