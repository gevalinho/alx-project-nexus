import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const saveAuth = async (
  accessToken: string,
  refreshToken?: string | null,
  user?: any
) => {
  const entries: [string, string][] = [[ACCESS_TOKEN_KEY, accessToken]];

  if (refreshToken) {
    entries.push([REFRESH_TOKEN_KEY, refreshToken]);
  } else {
    await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  if (user !== undefined && user !== null) {
    entries.push([USER_KEY, JSON.stringify(user)]);
  } else {
    await AsyncStorage.removeItem(USER_KEY);
  }

  await AsyncStorage.multiSet(entries);
};

export const clearAuth = async () => {
  await AsyncStorage.multiRemove([
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    USER_KEY,
  ]);
};

export const getStoredAuth = async () => {
  const [[, accessToken], [, refreshToken], [, user]] =
    await AsyncStorage.multiGet([
      ACCESS_TOKEN_KEY,
      REFRESH_TOKEN_KEY,
      USER_KEY,
    ]);

  return {
    accessToken,
    refreshToken,
    user: user ? JSON.parse(user) : null,
  };
};
