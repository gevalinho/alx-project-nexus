import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../lib/store";
import { ThemeProvider } from "../lib/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </Provider>
  );
}
