import { Text, View } from "react-native";
import "../global.css";

export default function Index() {
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Text>Edit app/index.tsx to edit this screen.</Text>
    // </View>

    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-xl font-bold">Profile Screen</Text>
    </View>
  );
}
