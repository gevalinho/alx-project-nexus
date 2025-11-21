// import AsyncStorage from "@react-native-async-storage/async-storage";

// export const saveAuth = async (token: string, user: any) => {
//   await AsyncStorage.setItem("token", token);
//   await AsyncStorage.setItem("user", JSON.stringify(user));
// };

// export const loadAuth = async () => {
//   const token = await AsyncStorage.getItem("token");
//   const userString = await AsyncStorage.getItem("user");
//   return token && userString ? { token, user: JSON.parse(userString) } : null;
// };

// export const clearAuth = async () => {
//   await AsyncStorage.removeItem("token");
//   await AsyncStorage.removeItem("user");
// };



import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "user";

export const saveAuth = async (
  accessToken: string,
  refreshToken: string,
  user: any
) => {
  await AsyncStorage.multiSet([
    [ACCESS_TOKEN_KEY, accessToken],
    [REFRESH_TOKEN_KEY, refreshToken],
    [USER_KEY, JSON.stringify(user)],
  ]);
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
