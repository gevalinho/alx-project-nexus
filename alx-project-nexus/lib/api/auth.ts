
const BASE_URL = process.env.EXPO_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

const ensureBaseUrl = () => {
  if (!BASE_URL) {
    throw new Error(
      "Missing EXPO_PUBLIC_API_URL. Please set it in your .env file."
    );
  }
};

const extractErrorMessage = (data: any, status: number) => {
  if (!data) return `Request failed (${status})`;

  if (typeof data === "string") return data;

  if (typeof data === "object") {
    if (data.message || data.detail || data.error) {
      return data.message || data.detail || data.error;
    }

    // Flatten first validation error (common in DRF & NestJS validation)
    const firstKey = Object.keys(data)[0];
    if (firstKey) {
      const value = data[firstKey];
      if (Array.isArray(value)) {
        return value[0];
      }
      if (typeof value === "string") {
        return value;
      }
      return `${firstKey}: ${JSON.stringify(value)}`;
    }

    return JSON.stringify(data);
  }

  return `Request failed (${status})`;
};

/** Universal fetch handler */
const handleResponse = async (res: Response) => {
  const text = await res.text();
  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    throw new Error(extractErrorMessage(data, res.status));
  }

  return data;
};

type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

/** REGISTER USER */
export const registerUser = async (payload: RegisterPayload) => {
  ensureBaseUrl();
  const res = await fetch(`${BASE_URL}/users/signUp/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/** LOGIN USER */
export const loginUser = async (payload: LoginPayload) => {
  ensureBaseUrl();
  const res = await fetch(`${BASE_URL}/users/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/** FETCH AUTHENTICATED USER PROFILE */
export const getProfile = async (accessToken: string) => {
  ensureBaseUrl();

  if (!accessToken) {
    throw new Error("Missing access token. Please sign in again.");
  }

  const res = await fetch(`${BASE_URL}/users/userProfile/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(res);
};

type UpdateProfilePayload = {
  name?: string;
  phone_number?: string;
  state?: string;
  city?: string;
  address?: string;
  profile_photo?: string | null;
};

export const updateProfile = async (
  accessToken: string,
  payload: UpdateProfilePayload
) => {
  ensureBaseUrl();

  if (!accessToken) {
    throw new Error("Missing access token. Please sign in again.");
  }

  if (!payload || Object.keys(payload).length === 0) {
    throw new Error("Nothing to update. Please modify a field first.");
  }

  const res = await fetch(`${BASE_URL}/users/update/me/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};
