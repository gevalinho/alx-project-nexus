import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";



export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <AntDesign name="home" size={22} color={color} />, }} />
      <Tabs.Screen name="search" options={{ title: "Search", tabBarIcon: ({ color }) => <AntDesign name="search" size={22} color={color} />, }} />
      <Tabs.Screen name="categories" options={{ title: "categories", tabBarIcon: ({ color }) => <MaterialIcons name="category" size={22} color={color} />, }} />
      {/* Add your other screens here */}


      {/* 🚫 Hidden Screens (not in bottom tab) */}
      <Tabs.Screen name="categoryProducts" options={{ href: null }} />
    </Tabs>
  );
}
