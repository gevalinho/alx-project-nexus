import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProfile } from "../api/auth";

interface ProfileDetails {
  id: string;
  name: string | null;
  phone_number: string | null;
  profile_photo: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  date_created?: string | null;
  date_updated?: string | null;
  user_id?: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  last_login?: string | null;
  date_created?: string;
  date_updated?: string;
  profile?: ProfileDetails | null;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  profileStatus: "idle" | "loading" | "succeeded" | "failed";
  profileError: string | null;
  profileErrorReason: "invalid_token" | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  isAuthenticated: false,
  profileStatus: "idle",
  profileError: null,
  profileErrorReason: null,
};

type ProfileApiResponse = {
  message?: string;
  data?: {
    userData?: User;
    profile?: {
      profileData?: ProfileDetails;
    };
  };
};

type ProfileFetchError = {
  message: string;
  reason?: "invalid_token";
};

const sanitizeProfileError = (value?: string | null) => {
  if (!value) return null;
  const normalized = value.toLowerCase();

  if (normalized.includes("token not valid")) {
    return "Session expired. Please sign in again.";
  }

  if (value.trim().startsWith("<")) {
    return "Profile service is not available right now.";
  }
  return value;
};

export const fetchProfile = createAsyncThunk<
  User,
  string,
  { rejectValue: ProfileFetchError }
>("auth/fetchProfile", async (accessToken, { rejectWithValue }) => {
  try {
    const profile = (await getProfile(accessToken)) as ProfileApiResponse;
    const userData = profile?.data?.userData;

    if (!userData) {
      throw new Error("Unable to load profile data.");
    }

    const profileDetails = profile?.data?.profile?.profileData ?? null;

    return {
      ...userData,
      profile: profileDetails,
    };
  } catch (error: any) {
    const rawMessage =
      typeof error?.message === "string" ? error.message : null;
    const message =
      sanitizeProfileError(rawMessage) ??
      "Unable to load profile. Please try again.";

    const reason = rawMessage?.toLowerCase().includes("token not valid")
      ? "invalid_token"
      : undefined;

    return rejectWithValue({ message, reason });
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
        accessToken: string;
        refreshToken?: string | null;
      }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken ?? null;
      state.isAuthenticated = true;
      state.profileStatus = "succeeded";
      state.profileError = null;
      state.profileErrorReason = null;
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.profileStatus = "idle";
      state.profileError = null;
      state.profileErrorReason = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<ProfileDetails>) => {
      if (!state.user) return;
      state.user.profile = {
        ...state.user.profile,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profileStatus = "loading";
        state.profileError = null;
        state.profileErrorReason = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.profileError = null;
        state.profileErrorReason = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.profileError =
          action.payload?.message ??
          action.error.message ??
          "Unable to load profile. Please try again.";
        state.profileErrorReason = action.payload?.reason ?? null;
      });
  },
});

export const { setLoading, loginSuccess, logout, updateProfileSuccess } =
  authSlice.actions;
export default authSlice.reducer;
export type { User, ProfileDetails };
