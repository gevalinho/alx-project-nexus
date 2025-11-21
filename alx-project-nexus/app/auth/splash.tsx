import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Image, Text, View } from "react-native";

import { loginSuccess } from "@/lib/store/authSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { getStoredAuth } from "@/lib/utils/storage";

export default function SplashScreen() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initialize = async () => {
      const stored = await getStoredAuth();

      setTimeout(() => {
        if (stored.accessToken && stored.user) {
          dispatch(
            loginSuccess({
              user: stored.user,
              accessToken: stored.accessToken,
              refreshToken: stored.refreshToken,
            })
          );
          router.replace("/(tabs)/home");
        } else {
          router.replace("/auth/signin");
        }
      }, 1500);
    };

    initialize();
  }, [dispatch]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <StatusBar style="light" backgroundColor="#FF8A00" />
      <Image
        source={require("@/assets/logo/nexus-logo.png")}
        className="w-40 h-40 mb-3"
      />
      <Text className="text-[#FF8A00] text-[32px] font-semibold">
        Nexus
      </Text>
      <Text className="text-[#FF8A00]/80 text-sm">
        smart shopping experience
      </Text>
    </View>
  );
}
