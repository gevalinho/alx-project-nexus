/**
 * ThemeProvider.tsx
 * ----------------------------------------------------
 * Responsible for all theme logic:
 *  - Light / Dark mode
 *  - Saving theme to AsyncStorage
 *  - Exposing theme + toggle method globally
 *  - Providing "dark:" classes for NativeWind
 *
 * This is used across the entire app (Expo Router)
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

// Create context
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  /**
   * Load saved theme when the app starts.
   * Fallback to system theme if nothing saved.
   */
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("theme");

      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      } else {
        const system = Appearance.getColorScheme() || "light";
        setTheme(system);
      }
    })();
  }, []);

  /**
   * Toggle between light/dark theme
   * Also save preference for next app launch
   */
  const toggleTheme = async () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* NativeWind applies theme using a parent "className" */}
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme anywhere
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
