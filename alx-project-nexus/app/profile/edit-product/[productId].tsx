import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import type { ImagePickerAsset } from "expo-image-picker";
import { useCallback, useEffect, useMemo, useState } from "react";
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

import { fetchProducts, updateProduct } from "@/lib/store/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import type { UpdateProductPayload } from "@/lib/api/products";

const normalizeFileUri = (uri: string) => {
  if (!uri) return uri;
  if (uri.startsWith("file://") || uri.startsWith("content://")) return uri;
  return `file://${uri}`;
};

export default function EditProductDetailScreen() {
  const params = useLocalSearchParams<{ productId?: string }>();
  const productId = params.productId ? String(params.productId) : null;

  const dispatch = useAppDispatch();
  const { items, updating } = useAppSelector((state) => state.products);
  const { accessToken } = useAppSelector((state) => state.auth);

  const product = useMemo(
    () =>
      productId
        ? items.find((item) => String(item.id) === productId)
        : undefined,
    [items, productId]
  );

  const initialValues = useMemo(() => {
    if (!product) {
      return {
        name: "",
        price: "",
        category: "",
        description: "",
        stock: "",
        manufactured_date: "",
        expiry_date: "",
        image: "",
      };
    }

    return {
      name: product.name ?? product.title ?? "",
      price: product.price?.toString() ?? "",
      category: product.category ?? "",
      description: product.description ?? "",
      stock:
        product.stock !== undefined && product.stock !== null
          ? String(product.stock)
          : "",
      manufactured_date: product.manufactured_date ?? "",
      expiry_date: product.expiry_date ?? "",
      image: product.image,
    };
  }, [product]);

  const [title, setTitle] = useState(initialValues.name);
  const [price, setPrice] = useState(initialValues.price);
  const [category, setCategory] = useState(initialValues.category);
  const [description, setDescription] = useState(initialValues.description);
  const [stock, setStock] = useState(initialValues.stock);
  const [manufacturedDate, setManufacturedDate] = useState(
    initialValues.manufactured_date
  );
  const [expiryDate, setExpiryDate] = useState(initialValues.expiry_date);
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(
    null
  );
  const [imagePreviewLoading, setImagePreviewLoading] = useState(false);

  useEffect(() => {
    setTitle(initialValues.name);
    setPrice(initialValues.price);
    setCategory(initialValues.category);
    setDescription(initialValues.description);
    setStock(initialValues.stock);
    setManufacturedDate(initialValues.manufactured_date);
    setExpiryDate(initialValues.expiry_date);
  }, [initialValues]);

  useEffect(() => {
    if (!product && accessToken) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product, accessToken]);

  const ensureSignedIn = useCallback(() => {
    if (accessToken) return true;
    Alert.alert(
      "Sign in required",
      "Please sign in to manage your products.",
      [{ text: "OK" }]
    );
    return false;
  }, [accessToken]);

  const pickImage = useCallback(async () => {
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
          "Please allow photo library access to update product images.",
          [action],
          { cancelable: true }
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"] as any,
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled && result.assets?.length) {
        const asset = result.assets[0];
        if (asset?.uri) {
          const normalizedUri = normalizeFileUri(asset.uri);
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
  }, []);

  const validateAndSave = useCallback(async () => {
    if (!productId || !product) {
      Alert.alert("Product unavailable", "Unable to load this product.");
      return;
    }

    if (!ensureSignedIn()) return;

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      Alert.alert("Missing title", "Please provide a product title.");
      return;
    }

    const parsedPrice = Number(price);
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      Alert.alert("Invalid price", "Enter a valid price greater than zero.");
      return;
    }

    const parsedStock = stock.trim() ? Number(stock) : undefined;
    if (
      parsedStock !== undefined &&
      (!Number.isFinite(parsedStock) || parsedStock < 0)
    ) {
      Alert.alert("Invalid stock", "Stock must be zero or a positive number.");
      return;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const normalizedManufacturedDate = manufacturedDate.trim();
    if (
      normalizedManufacturedDate &&
      !datePattern.test(normalizedManufacturedDate)
    ) {
      Alert.alert(
        "Manufactured date",
        "Use YYYY-MM-DD for the manufacturing date."
      );
      return;
    }

    const normalizedExpiryDate = expiryDate.trim();
    if (normalizedExpiryDate && !datePattern.test(normalizedExpiryDate)) {
      Alert.alert("Expiry date invalid", "Use YYYY-MM-DD for the expiry date.");
      return;
    }

    if (
      normalizedManufacturedDate &&
      normalizedExpiryDate &&
      normalizedExpiryDate < normalizedManufacturedDate
    ) {
      Alert.alert(
        "Expiry date invalid",
        "Expiry date cannot be earlier than the manufactured date."
      );
      return;
    }

    const updates: UpdateProductPayload = {
      id: product.id,
    };
    let hasChanges = false;

    type EditableKey = Exclude<
      keyof UpdateProductPayload,
      "id" | "product_image_file"
    >;
    const assignIfChanged = (
      key: EditableKey,
      value: UpdateProductPayload[EditableKey],
      initialValue: any
    ) => {
      if (value === undefined) return;
      if (value === initialValue) return;
      updates[key] = value as any;
      hasChanges = true;
    };

    assignIfChanged(
      "name",
      trimmedTitle,
      initialValues.name
    );
    assignIfChanged(
      "price",
      Number(parsedPrice.toFixed(2)),
      Number(initialValues.price || 0)
    );
    assignIfChanged(
      "description",
      description.trim(),
      initialValues.description ?? ""
    );
    assignIfChanged(
      "category",
      category.trim(),
      initialValues.category ?? ""
    );
    assignIfChanged(
      "stock",
      parsedStock,
      initialValues.stock ? Number(initialValues.stock) : undefined
    );
    assignIfChanged(
      "manufactured_date",
      normalizedManufacturedDate,
      initialValues.manufactured_date ?? ""
    );
    assignIfChanged(
      "expiry_date",
      normalizedExpiryDate,
      initialValues.expiry_date ?? ""
    );

    if (selectedImage?.uri) {
      updates.product_image_file = {
        uri: normalizeFileUri(selectedImage.uri),
        name: selectedImage.fileName ?? `product-${Date.now()}.jpg`,
        type: selectedImage.mimeType ?? "image/jpeg",
        size: selectedImage.fileSize ?? undefined,
      };
      hasChanges = true;
    }

    if (!hasChanges) {
      Alert.alert("No changes", "Update at least one field before saving.");
      return;
    }

    try {
      await dispatch(updateProduct(updates)).unwrap();
      Alert.alert("Product updated", "Your changes have been saved.", [
        {
          text: "Done",
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      const message =
        typeof error === "string"
          ? error
          : error?.message ?? "Unable to update this product right now.";
      Alert.alert("Update failed", message);
    }
  }, [
    accessToken,
    category,
    description,
    dispatch,
    ensureSignedIn,
    expiryDate,
    initialValues,
    manufacturedDate,
    price,
    product,
    productId,
    selectedImage,
    stock,
    title,
  ]);

  if (!accessToken) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-lg font-semibold text-[#1F232B] mb-2">
          Sign in required
        </Text>
        <Text className="text-center text-gray-500 mb-6">
          Please sign in to manage your products.
        </Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#FF8A00" />
        <Text className="text-gray-500 mt-3">Loading product...</Text>
      </View>
    );
  }

  const previewUri = selectedImage?.uri ?? product.image;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Product",
          headerShown: true,
          headerShadowVisible: false,
        }}
      />
      <ScrollView className="flex-1 bg-white px-5 pt-6">
        <Text className="text-2xl font-semibold text-[#1F232B] mb-4">
          {product.name ?? product.title}
        </Text>

        <TouchableOpacity
          className="bg-gray-100 rounded-3xl h-48 mb-5 items-center justify-center overflow-hidden"
          onPress={pickImage}
          activeOpacity={0.85}
        >
          {previewUri ? (
            <>
              <Image
                source={{ uri: previewUri }}
                className="w-full h-full"
                resizeMode="cover"
                onLoadStart={() => setImagePreviewLoading(true)}
                onLoadEnd={() => setImagePreviewLoading(false)}
              />
              {imagePreviewLoading ? (
                <View className="absolute inset-0 items-center justify-center bg-black/20">
                  <ActivityIndicator color="#fff" />
                </View>
              ) : null}
              <View className="absolute bottom-3 right-3 bg-black/60 rounded-full px-3 py-1">
                <Text className="text-xs text-white font-semibold">
                  Tap to change photo
                </Text>
              </View>
            </>
          ) : (
            <View className="items-center">
              <Ionicons name="image-outline" size={32} color="#94A3B8" />
              <Text className="text-gray-500 mt-2">Tap to add an image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View className="space-y-5 pb-16">
          <Field
            label="Title"
            value={title}
            onChangeText={setTitle}
            placeholder="Product name"
          />

          <Field
            label="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            placeholder="0.00"
          />

          <Field
            label="Category"
            value={category}
            onChangeText={setCategory}
            placeholder="e.g., Electronics"
          />

          <Field
            label="Stock"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
            placeholder="Available quantity"
          />

          <Field
            label="Manufactured Date"
            value={manufacturedDate}
            onChangeText={setManufacturedDate}
            placeholder="YYYY-MM-DD"
          />

          <Field
            label="Expiry Date"
            value={expiryDate}
            onChangeText={setExpiryDate}
            placeholder="YYYY-MM-DD"
          />

          <Field
            label="Description"
            value={description}
            onChangeText={setDescription}
            multiline
            placeholder="Add extra product details"
          />
        </View>
      </ScrollView>

      <View className="px-5 pb-8 pt-4 border-t border-gray-100 bg-white">
        <TouchableOpacity
          onPress={validateAndSave}
          disabled={updating}
          className={`rounded-full py-4 items-center ${
            updating ? "bg-gray-300" : "bg-[#FF8A00]"
          }`}
        >
          {updating ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">
              Save Changes
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "decimal-pad" | "numeric";
  multiline?: boolean;
};

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  multiline,
}: FieldProps) {
  return (
    <View>
      <Text className="text-sm text-gray-500 mb-2">{label}</Text>
      <TextInput
        className="border border-gray-200 rounded-2xl px-4 py-3 text-gray-800"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}
