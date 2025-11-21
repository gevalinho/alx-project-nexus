import { updateProfile } from "@/lib/api/auth";
import { ProfileDetails, updateProfileSuccess } from "@/lib/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Stack, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type EditableProfileFields = Pick<
  ProfileDetails,
  "name" | "phone_number" | "state" | "city" | "address"
>;

export default function EditProfile() {
  const dispatch = useAppDispatch();
  const { user, accessToken } = useAppSelector((state) => state.auth);

  const derivedName = useMemo(() => {
    if (!user) return "";
    if (user.profile?.name) return user.profile.name;
    return `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  }, [user]);

  const [fullName, setFullName] = useState(derivedName);
  const [phone, setPhone] = useState(user?.profile?.phone_number ?? "");
  const [stateField, setStateField] = useState(user?.profile?.state ?? "");
  const [city, setCity] = useState(user?.profile?.city ?? "");
  const [address, setAddress] = useState(user?.profile?.address ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFullName(derivedName);
  }, [derivedName]);

  useEffect(() => {
    setPhone(user?.profile?.phone_number ?? "");
    setStateField(user?.profile?.state ?? "");
    setCity(user?.profile?.city ?? "");
    setAddress(user?.profile?.address ?? "");
  }, [
    user?.profile?.phone_number,
    user?.profile?.state,
    user?.profile?.city,
    user?.profile?.address,
  ]);

  const initialProfile = useMemo(
    () => ({
      name: derivedName,
      phone_number: user?.profile?.phone_number ?? "",
      state: user?.profile?.state ?? "",
      city: user?.profile?.city ?? "",
      address: user?.profile?.address ?? "",
    }),
    [
      derivedName,
      user?.profile?.phone_number,
      user?.profile?.state,
      user?.profile?.city,
      user?.profile?.address,
    ]
  );

  const buildPayload = () => {
    const payload: Partial<EditableProfileFields> = {};

    const normalize = (value: string | null | undefined) =>
      (value ?? "").trim();

    const diffAndAssign = (
      key: keyof EditableProfileFields,
      value: string,
      initial?: string | null
    ) => {
      const trimmed = value.trim();
      const baseline = normalize(initial);
      if (trimmed !== baseline) {
        payload[key] = trimmed;
      }
    };

    diffAndAssign("name", fullName, initialProfile.name);
    diffAndAssign("phone_number", phone, initialProfile.phone_number);
    diffAndAssign("state", stateField, initialProfile.state);
    diffAndAssign("city", city, initialProfile.city);
    diffAndAssign("address", address, initialProfile.address);

    return payload;
  };

  const handleSave = async () => {
    if (!accessToken) {
      Alert.alert(
        "Not signed in",
        "You need to sign in again to update your profile.",
        [{ text: "Go to Sign In", onPress: () => router.replace("/auth/signin") }]
      );
      return;
    }

    if (!fullName.trim()) {
      Alert.alert("Full name required", "Please enter your full name.");
      return;
    }

    const payload = buildPayload();
    if (Object.keys(payload).length === 0) {
      Alert.alert("No changes", "Update a field before saving.");
      return;
    }

    setSaving(true);

    try {
      const response = await updateProfile(accessToken, payload);
      const updatedProfile =
        response?.data?.profile?.profileData ??
        response?.data?.profile ??
        response?.profile ??
        null;

      if (updatedProfile) {
        dispatch(updateProfileSuccess(updatedProfile));
      }

      Alert.alert("Profile updated", "Your changes have been saved.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Unable to update profile. Please try again.";
      Alert.alert("Update failed", message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Profile",
          headerShown: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />

      <ScrollView className="flex-1 bg-white" contentContainerClassName="px-6 py-4 pb-10">
        {/* Avatar Section */}
        <View className="items-center">
          <Image
            source={require("@/assets/images/avatar.png")}
            className="w-24 h-24 rounded-full"
          />

          <TouchableOpacity className="mt-3">
            <Text className="text-[#FF8A00] font-medium">Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View className="mt-8 space-y-5">
          {/* Full Name */}
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Full Name</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Email */}
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-200 px-4 bg-gray-50 text-gray-500"
              value={user?.email ?? ""}
              editable={false}
            />
          </View>

          {/* Phone */}
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="Phone number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          {/* State */}
          <View>
            <Text className="text-gray-700 mb-2 font-medium">State</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="State / Region"
              value={stateField}
              onChangeText={setStateField}
            />
          </View>

          {/* City */}
          <View>
            <Text className="text-gray-700 mb-2 font-medium">City</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </View>

          {/* Address */}
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Address</Text>
            <TextInput
              className="w-full min-h-[80px] rounded-lg border border-gray-300 px-4 py-3 text-base"
              placeholder="Street address"
              value={address}
              multiline
              onChangeText={setAddress}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          className={`mt-10 h-12 rounded-lg items-center justify-center ${
            saving ? "bg-gray-300" : "bg-[#FF8A00]"
          }`}
        >
          <Text className="text-white font-semibold text-lg">
            {saving ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}
