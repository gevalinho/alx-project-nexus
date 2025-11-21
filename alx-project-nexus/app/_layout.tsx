// import { Stack } from "expo-router";
// import { Provider } from "react-redux";
// import "../global.css";
// import { store } from "../lib/store";

// export default function RootLayout() {
//   return (
//     <Provider store={store}>
//       <Stack screenOptions={{
//           headerShown: false,   // 👈 Hides the header globally
//         }} />
//          <Stack.Screen name="app/splash" />
//     </Provider>
//   );
// }



import { Stack } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";
import { store } from "../lib/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </Provider>
  );
}
