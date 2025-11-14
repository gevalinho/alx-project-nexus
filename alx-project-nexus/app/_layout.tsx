import { Stack } from "expo-router";
<<<<<<< HEAD
import "../global.css";

export default function RootLayout() {
  return <Stack />;
}
=======
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
>>>>>>> 1744576869059bf3b573041a5886bb27235d6bea
