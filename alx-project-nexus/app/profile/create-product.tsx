import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createProduct } from "@/lib/store/productSlice";
import { Stack, router } from "expo-router";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import type { ImagePickerAsset } from "expo-image-picker";

const normalizeFileUri = (uri: string) => {
  if (!uri) return uri;
  if (uri.startsWith("file://") || uri.startsWith("content://")) return uri;
  return `file://${uri}`;
};

export default function CreateProductScreen() {
  const dispatch = useAppDispatch();
  const { creating } = useAppSelector((state) => state.products);
  const { accessToken } = useAppSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [manufacturedDate, setManufacturedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState("");
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(
    null
  );
  const [imagePreviewLoading, setImagePreviewLoading] = useState(false);

  const submitting = useMemo(() => creating, [creating]);

  const ensureSignedIn = () => {
    if (accessToken) return true;
    Alert.alert(
      "Sign in required",
      "Please sign in to create a product.",
      [{ text: "Go to Sign In", onPress: () => router.replace("/auth/signin") }],
      { cancelable: true }
    );
    return false;
  };

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const granted =
        permission?.granted || permission?.status === "granted";

      if (!granted) {
        const action = permission.canAskAgain
          ? { text: "OK" }
          : {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            };

        Alert.alert(
          "Permission needed",
          "Please allow photo library access to upload a product image.",
          [action],
          { cancelable: true }
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"] as any, // Expo SDK 51+ expects array of media type strings
        quality: 0.7,
        allowsEditing: true,
        // presentationStyle: "fullScreen", // not supported on web/Android; omit to avoid TS error
      });

      if (!result.canceled && result.assets?.length) {
        const asset = result.assets[0];
        if (asset?.uri) {
          const normalizedUri = normalizeFileUri(asset.uri);
          // clone to ensure state change triggers re-render for thumbnail
          setSelectedImage({ ...asset, uri: normalizedUri });
        } else {
          Alert.alert("Image missing", "Unable to read the selected image path.");
        }
      }
    } catch (error: any) {
      const message =
        typeof error?.message === "string"
          ? error.message
          : "Unable to open your gallery right now.";
      Alert.alert("Gallery unavailable", message);
    }
  };

  const handleSubmit = async () => {
    if (!ensureSignedIn()) return;

    const imagePreviewUri = selectedImage?.uri
      ? normalizeFileUri(selectedImage.uri)
      : undefined;

    if (!title.trim()) {
      Alert.alert("Missing title", "Please provide a product title.");
      return;
    }

    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      Alert.alert("Invalid price", "Enter a valid price greater than zero.");
      return;
    }

    if (!selectedImage || !imagePreviewUri) {
      Alert.alert(
        "Image required",
        "Add at least one product image before publishing."
      );
      return;
    }

    const parsedStock = stock.trim() ? Number(stock) : undefined;
    if (parsedStock !== undefined && (!Number.isFinite(parsedStock) || parsedStock < 0)) {
      Alert.alert("Invalid stock", "Stock must be zero or a positive number.");
      return;
    }

    const normalizedManufacturedDate = manufacturedDate.trim();
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(normalizedManufacturedDate)) {
      Alert.alert("Manufactured date required", "Add the manufacturing date in YYYY-MM-DD format.");
      return;
    }

    const normalizedExpiryDate = expiryDate.trim();
    if (normalizedExpiryDate && !datePattern.test(normalizedExpiryDate)) {
      Alert.alert("Expiry date invalid", "Use YYYY-MM-DD for the expiry date.");
      return;
    }

    if (normalizedExpiryDate && normalizedExpiryDate < normalizedManufacturedDate) {
      Alert.alert("Expiry date invalid", "Expiry date cannot be earlier than the manufactured date.");
      return;
    }

    try {
      const imageFile = {
        uri: imagePreviewUri,
        name: selectedImage.fileName ?? `product-${Date.now()}.jpg`,
        type: selectedImage.mimeType ?? "image/jpeg",
        size: selectedImage.fileSize ?? undefined,
      };

      await dispatch(
        createProduct({
          name: title.trim(),
          price: parsedPrice,
          description: description.trim() || undefined,
          category: category.trim() || undefined,
          stock: parsedStock,
          manufactured_date: normalizedManufacturedDate,
          expiry_date: normalizedExpiryDate || undefined,
          product_image_file: imageFile,
        })
      ).unwrap();

      Alert.alert("Product created", "Your product has been posted.", [
        { text: "Back to Profile", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      const message =
        typeof error === "string"
          ? error
          : typeof error?.message === "string"
            ? error.message
            : "Unable to create product right now.";
      console.warn("Create product failed", error);
      Alert.alert("Create product failed", message);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Product",
          headerShown: true,
          headerShadowVisible: false,
          headerBackVisible: true,
        }}
      />

      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="px-6 py-4 pb-12"
        keyboardShouldPersistTaps="handled"
      >
        <Text className="text-xl font-semibold text-[#1F232B] mb-3">
          Add a new product
        </Text>
        <Text className="text-gray-500 mb-6">
          Upload clear photos and set a fair price to help buyers trust your
          listing.
        </Text>

        <View className="space-y-5">
          <View>
            <Text className="text-gray-700 mb-2 font-medium">Title</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="E.g. Leather backpack"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Price</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="0.00"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Category</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="Shoes, bags, gadgets..."
              value={category}
              onChangeText={setCategory}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Stock</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="Available quantity"
              keyboardType="number-pad"
              value={stock}
              onChangeText={setStock}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Manufactured date</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="YYYY-MM-DD"
              keyboardType="numbers-and-punctuation"
              value={manufacturedDate}
              onChangeText={setManufacturedDate}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Expiry date (optional)</Text>
            <TextInput
              className="w-full h-12 rounded-lg border border-gray-300 px-4"
              placeholder="YYYY-MM-DD"
              keyboardType="numbers-and-punctuation"
              value={expiryDate}
              onChangeText={setExpiryDate}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">Description</Text>
            <TextInput
              className="w-full min-h-[100px] rounded-lg border border-gray-300 px-4 py-3 text-base"
              placeholder="Describe the condition, specs, and what makes it special."
              multiline
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2 font-medium">
              Product image
            </Text>
            <TouchableOpacity
              onPress={pickImage}
              className="border border-dashed border-gray-300 rounded-xl p-4 items-center justify-center"
              disabled={submitting}
            >
              {selectedImage ? (
                <View className="items-center w-full">
                  <View className="w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                      source={{ uri: normalizeFileUri(selectedImage.uri) }}
                    key={selectedImage.uri}
                      className="w-full h-full"
                      resizeMode="cover"
                      onLoadStart={() => setImagePreviewLoading(true)}
                      onLoadEnd={() => setImagePreviewLoading(false)}
                      onError={() => {
                        setImagePreviewLoading(false);
                        Alert.alert(
                          "Preview unavailable",
                          "Could not load the selected image. Try choosing a different photo."
                        );
                      }}
                  />
                  {imagePreviewLoading && (
                    <View className="absolute inset-0 items-center justify-center bg-white/60">
                      <ActivityIndicator color="#FF8A00" />
                    </View>
                  )}
                  </View>
                  <Text className="text-[#FF8A00] font-medium mt-3">
                    Change image
                  </Text>
                </View>
              ) : (
                <>
                  <Text className="text-gray-600 mb-1">
                    Tap to upload a product photo
                  </Text>
                  <Text className="text-gray-400 text-sm">
                    JPG or PNG, under 5MB
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitting}
          className={`mt-10 h-12 rounded-lg items-center justify-center ${
            submitting ? "bg-gray-300" : "bg-[#FF8A00]"
          }`}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-lg">
              Publish product
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

