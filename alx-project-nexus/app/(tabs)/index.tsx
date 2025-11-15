
// import { useEffect } from "react";
import CategorySection from "@/components/home/CategorySection";
import HeaderSearch from "@/components/home/HeaderSearch";
import { useEffect } from "react";
import {
  ScrollView,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductGrid from "../../components/home/ProductGrid";
import SlidingBanner from "../../components/home/SlidingBanner";
import { useAppDispatch, useAppSelector } from "../../lib/store/hooks";
import { fetchProducts } from "../../lib/store/productSlice";





export default function Home() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.products);
  

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
<>
    <SafeAreaView className="flex-1 bg-white">
     
     <HeaderSearch/>
    
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

      <ProductGrid items={items}  />
    </ScrollView>
    
    </SafeAreaView>
    </>
    
  );
}
