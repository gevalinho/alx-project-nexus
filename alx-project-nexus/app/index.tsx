import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  useEffect(() => {
    // Delay navigation until after first render
    setTimeout(() => {
      router.replace("/(tabs)");
    }, 0);
  }, []);

  return <View />;
}
