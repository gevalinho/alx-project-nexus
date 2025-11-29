import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { fetchProfile, logout } from "@/lib/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearAuth } from "@/lib/utils/storage";

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const {
    user,
    accessToken,
    profileStatus,
    profileError,
    profileErrorReason,
  } = useAppSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = useCallback(async () => {
    dispatch(logout());
    await clearAuth();
    router.replace("/auth/signin");
  }, [dispatch]);

  const extractErrorMessage = (error: unknown) => {
    if (typeof error === "string") return error;
    if (typeof error === "object" && error && "message" in error) {
      return (error as { message?: string }).message;
    }
    return null;
  };
  
  const loadProfile = useCallback(async () => {
    if (!accessToken) return;
    try {
      await dispatch(fetchProfile(accessToken)).unwrap();
    } catch (error) {
      const message = extractErrorMessage(error);
      if (message) {
        Alert.alert("Profile", message);
      }
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (accessToken) {
      loadProfile();
    }
  }, [accessToken, loadProfile]);

  useEffect(() => {
    if (profileErrorReason === "invalid_token") {
      handleLogout();
    }
  }, [profileErrorReason, handleLogout]);

  const onRefresh = useCallback(async () => {
    if (!accessToken) return;
    setRefreshing(true);
    try {
      await dispatch(fetchProfile(accessToken)).unwrap();
    } catch (error) {
      const message = extractErrorMessage(error);
      if (message) {
        Alert.alert("Profile", message);
      }
    } finally {
      setRefreshing(false);
    }
  }, [accessToken, dispatch]);

  const displayName = useMemo(() => {
    if (!user) return "";
    const fullName = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
    if (user.profile?.name) {
      return user.profile.name;
    }
    return fullName || user.email || "Nexus user";
  }, [user]);

  const avatarUri = useMemo(() => {
    if (user?.profile?.profile_photo) {
      return user.profile.profile_photo;
    }

    const fallback = "Nexus";
    const nameForAvatar = displayName || user?.email || fallback;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      nameForAvatar
    )}&background=FF8A00&color=fff`;
  }, [displayName, user?.email, user?.profile?.profile_photo]);

  const isLoading = profileStatus === "loading" && !refreshing;

  if (!accessToken) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-lg font-semibold text-[#1F232B] mb-2">
          Sign in required
        </Text>
        <Text className="text-center text-gray-500 mb-6">
          Please sign in to view and manage your profile details.
        </Text>
        <TouchableOpacity
          className="bg-[#FF8A00] px-6 py-3 rounded-full"
          onPress={() => router.replace("/auth/signin")}
        >
          <Text className="text-white font-semibold">Go to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-10"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <>
          {/* Header */}
          <View className="items-center mb-6">
            <Image source={{ uri: avatarUri }} className="w-20 h-20 rounded-full" />
            <Text className="text-lg font-semibold mt-3">
              {displayName || "Nexus User"}
            </Text>
            <Text className="text-gray-500">{user?.email ?? " "}</Text>

            {/* Edit Icon */}
            <TouchableOpacity
              className="absolute right-3 top-3"
              onPress={() => router.push("/profile/edit")}
            >
              <Feather name="edit-3" size={20} color="#001F54" />
            </TouchableOpacity>
          </View>

          {profileError ? (
            <TouchableOpacity
              onPress={loadProfile}
              className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4"
            >
              <Text className="text-red-600 text-sm font-medium">
                {profileError}
              </Text>
              <Text className="text-[#FF8A00] text-sm font-semibold mt-1">
                Tap to retry
              </Text>
            </TouchableOpacity>
          ) : null}

          {/* ACCOUNT SECTION */}
          <Text className="text-gray-400 mb-2">Account</Text>
          <View className="bg-white rounded-lg">
            <MenuItem
              label="Manage Products"
              icon="cube-outline"
              onPress={() => router.push("/profile/manage-product")}
            />
            <MenuItem
              label="Edit Profile"
              icon="person-outline"
              onPress={() => router.push("/profile/edit")}
            />
            <MenuItem
              label="Notification"
              icon="notifications-outline"
              onPress={() => router.push("/profile/notifications")}
            />
            <MenuItem
              label="Transaction History"
              icon="receipt-outline"
              onPress={() => router.push("/profile/transactions")}
            />
          </View>

          {/* GENERAL SECTION */}
          <Text className="text-gray-400 mt-6 mb-2">General</Text>
          <View className="bg-white rounded-lg">
            <MenuItem
              label="Settings"
              icon="settings-outline"
              onPress={() => router.push("/settings")}
            />
            <MenuItem
              label="Security"
              icon="lock-closed-outline"
              onPress={() => router.push("/settings/security")}
            />
            <MenuItem
              label="Privacy Policy"
              icon="shield-checkmark-outline"
              // onPress={() => router.push("/privacy")}
            />
            <MenuItem
              label="Log Out"
              icon="log-out-outline"
              onPress={handleLogout}
              danger
            />
          </View>
        </>
      )}
    </ScrollView>
  );
}

/* -------------------------------- Helpers -------------------------------- */

type MenuItemProps = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  danger?: boolean;
};

function MenuItem({ label, icon, onPress, danger }: MenuItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between py-4 border-b border-gray-100"
    >
      <View className="flex-row items-center">
        <Ionicons
          name={icon}
          size={20}
          color={danger ? "#D90429" : "#001F54"}
          style={{ marginRight: 12 }}
        />
        <Text
          className={`text-base ${
            danger ? "text-red-600" : "text-gray-700"
          }`}
        >
          {label}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

function ProfileSkeleton() {
  return (
    <View className="bg-white px-5 pt-6">
      <View className="items-center mb-6">
        <View className="w-20 h-20 rounded-full bg-gray-200 mb-3" />
        <View className="w-32 h-4 bg-gray-200 rounded mb-2" />
        <View className="w-40 h-4 bg-gray-200 rounded" />
      </View>

      <View className="h-10 bg-gray-200 rounded mb-3" />

      <View className="bg-white rounded-lg mb-4">
        {[1, 2, 3].map((key) => (
          <View
            key={key}
            className="flex-row items-center justify-between py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="w-5 h-5 bg-gray-200 rounded-full mr-3" />
              <View className="w-32 h-4 bg-gray-200 rounded" />
            </View>
            <View className="w-5 h-5 bg-gray-200 rounded" />
          </View>
        ))}
      </View>

      <View className="h-4 bg-gray-200 rounded w-24 mb-3" />
      <View className="bg-white rounded-lg">
        {[4, 5, 6, 7].map((key) => (
          <View
            key={key}
            className="flex-row items-center justify-between py-4 border-b border-gray-100"
          >
            <View className="flex-row items-center">
              <View className="w-5 h-5 bg-gray-200 rounded-full mr-3" />
              <View className="w-32 h-4 bg-gray-200 rounded" />
            </View>
            <View className="w-5 h-5 bg-gray-200 rounded" />
          </View>
        ))}
      </View>
    </View>
  );
}
