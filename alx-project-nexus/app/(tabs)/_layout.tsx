import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TAB_ICON_COLOR = "#FF8A00";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: () => <AntDesign name="home" size={22} color={TAB_ICON_COLOR} />, }} />
      {/* <Tabs.Screen name="search" options={{ title: "Search", tabBarIcon: ({ color }) => <AntDesign name="search" size={22} color={color} />, }} /> */}
      {/* <Tabs.Screen name="categories" options={{ title: "categories", tabBarIcon: ({ color }) => <MaterialIcons name="category" size={22} color={color} />, }} /> */}
      <Tabs.Screen
  name="favorites"
  options={{
    title: "Favorites",
    tabBarIcon: () => (
      <Feather name="heart" size={22} color={TAB_ICON_COLOR} />
    ),
  }}
/>
      {/* Add your other screens here */}
      <Tabs.Screen name="cart" options={{ title: "Cart", tabBarIcon: () => <Ionicons name="cart" size={22} color={TAB_ICON_COLOR} />, }} />
<Tabs.Screen
  name="profile"
  options={{
    tabBarLabel: "Profile",
    tabBarIcon: ({ size }) => (
      <Ionicons name="person-outline" size={size} color={TAB_ICON_COLOR} />
    ),
  }}
/>

      {/* 🚫 Hidden Screens (not in bottom tab) */}
      <Tabs.Screen name="categoryProducts" options={{ href: null }} />
      <Tabs.Screen name="search" options={{ href: null }} />
      <Tabs.Screen name="home" options={{ href: null }} />
      <Tabs.Screen name="order-accepted" options={{ href: null }} />
      <Tabs.Screen name="order-failed" options={{ href: null }} />
      <Tabs.Screen name="checkout" options={{ href: null }} />
      <Tabs.Screen name="product/[id]" options={{ href: null }} />
      <Tabs.Screen name="categories" options={{ href: null }} />
      
      
    </Tabs>
  );
}
