# Project Nexus – Mobile Commerce Experience

Project Nexus is a production-ready React Native / Expo application that delivers an end-to-end commerce experience: browsing curated products, managing inventory, monitoring orders, and controlling account preferences. The goal is to meet professional engineering standards across functionality, UX, security, and deployment so the project can be showcased for mentorship reviews and hiring panels.

---

## 🧭 Table of Contents
1. [Features](#features)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Environment & Configuration](#environment--configuration)
5. [Getting Started](#getting-started)
6. [Available Scripts](#available-scripts)
7. [App Structure](#app-structure)
8. [State & Data Flow](#state--data-flow)
9. [API Contracts](#api-contracts)
10. [UX & Accessibility](#ux--accessibility)
11. [Security Practices](#security-practices)
12. [Testing Strategy](#testing-strategy)
13. [Deployment](#deployment)
14. [Troubleshooting](#troubleshooting)
15. [Project Management & Version Control](#project-management--version-control)
16. [Presenting the Project](#presenting-the-project)
17. [License](#license)

---

## ✨ Features

### Core Commerce
- **Authentication (JWT):** Sign up, login, refresh persisted sessions.
- **Catalog Browsing:** Sliding promotional banners, category filters, keyword search, product detail view.
- **Product Management:** Create, edit, delete products with image uploads, stock and pricing validation, and timeline tracking.
- **Order Workflow:** Checkout success/failure screens, order tracking timeline with progress bar and delivery tips.

### Account & Settings
- **Profile Dashboard:** Avatar, profile editing, notification history, transactions, and quick links.
- **Manage Products Hub:** Entry point for create/edit/delete flows.
- **Settings & Security:** Notification toggles, biometrics, password update forms, security tips, and device management placeholders.

### UX Enhancements
- **Skeleton states & pull-to-refresh** for profile fetches.
- **Accessible color palette** matching brand (#FF8A00) with consistent icon/text contrast.
- **Lottie animations** for order confirmations.

---

## 🧱 Architecture

| Layer | Description |
| --- | --- |
| **UI / Screens** | Expo Router file-based routes under `app/`. Tabs for customer flows, stack screens for auth/settings. |
| **Components** | Reusable UI (CategorySection, ProductGrid, SlidingBanner, etc.) located in `components/`. |
| **State Management** | Redux Toolkit + typed hooks. Stores Auth, Products, Cart, Favorites. |
| **API Layer** | `lib/api` modules wrap backend endpoints, handle auth headers, fallback data, and error normalization. |
| **Utilities** | `lib/utils` for storage, formatting, constants. |
| **Assets** | Lottie animations, promo images, icons under `assets/`. |

---

## 🛠 Tech Stack
- **Framework:** Expo (React Native 0.74+)
- **Routing:** Expo Router
- **State:** Redux Toolkit, React Redux hooks
- **Styling:** NativeWind / Tailwind classes
- **Animations:** Lottie
- **Build/Deploy:** Expo Application Services (EAS)
- **API Backend:** Render-hosted Django REST API (per Postman doc)

---

## 🔐 Environment & Configuration

Create a `.env` file in the project root:
```env
EXPO_PUBLIC_API_URL=https://alx-project-nexus-ecomerce.onrender.com/
EXPO_PUBLIC_UPLOADTHING_TOKEN=your-uploadthing-token
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx   # placeholder if Stripe integration is extended
```

> **Important:** Never commit secrets. Use Expo Config Plugins or EAS secrets for production builds.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start Metro bundler
npx expo start

# 3. Launch on device/emulator
#   • Scan QR with Expo Go (Android)
#   • Press 'i' or 'a' for simulators
```

Use the seeded credentials from the backend (example):
```
Email: mark@gmail.com
Password: testuser1234
```

---

## 📜 Available Scripts

| Command | Action |
| --- | --- |
| `npx expo start` | Dev bundler with interactive menu |
| `npx expo run:ios` / `run:android` | Build native project locally |
| `eas update --branch production --message "Release"` | Publish OTA update |
| `npx expo export` | Generate static bundle (web) |

---

## 🗂 App Structure

```
.
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx           # home tab
│   │   ├── profile.tsx         # profile hub
│   │   ├── cart.tsx, favorites.tsx, etc.
│   │   └── product/[id].tsx
│   ├── auth/
│   │   ├── signin.tsx
│   │   └── signup.tsx
│   ├── profile/                # stack screens for profile flows
│   └── settings/               # settings & security
├── components/
├── lib/
│   ├── api/
│   ├── store/
│   ├── data/
│   └── utils/
├── assets/
└── README.md
```

---

## 🔄 State & Data Flow
- **Auth Flow:** `authSlice` stores tokens/user profile. Tokens persisted via `saveAuth` (SecureStore-ready). Protected screens gate on `accessToken`.
- **Products Flow:** `productSlice` handles fetch/search/sort/create/update/delete with optimistic cache updates.
- **Async Operations:** Redux `createAsyncThunk` returns typed reject values; UI displays errors using `Alert` and inline banners.

---

## 📡 API Contracts
Backend reference: [Postman Documentation](https://documenter.getpostman.com/view/36965059/2sB3WyJwHq)

| Feature | Endpoint | Notes |
| --- | --- | --- |
| Login | `POST /users/login/` | Returns `access_token`, `refresh_token`, `user`. |
| Profile | `GET /users/userProfile/` | Requires Bearer token. |
| Update Profile | `PATCH /users/update/me/` | JSON body, validation errors normalized. |
| Products | `GET /product/product_list/` | Supports `search`, `category`, `ordering`. |
| Create Product | `POST /product/product_list/` | Multipart form data (image upload). |
| Update Product | `PATCH /product/product_list/:id/` | Multipart; only changed fields sent. |
| Delete Product(s) | `DELETE /product/product_list/:id/` | Called per ID in batch helper. |

Fallback data (from `lib/data/products.ts`) ensures UI remains functional offline.

---

## 🎨 UX & Accessibility
- Consistent color tokens (#FF8A00 primary, #1F232B text, gray neutrals).
- Minimum tap targets `>=44px`, rounded corners for iOS/Android parity.
- Loading/skeleton states and empty states for every list (profile, products, track order).
- Accessible text contrast (gray 500 against white for descriptive copy).
- Motion considered: Lottie animation loops only on order success; no excessive transitions.

---

## 🛡 Security Practices
- **Token Handling:** Stored securely via `saveAuth`, cleared on logout/invalid token responses.
- **API Errors:** Sanitized user-friendly messages; original errors logged via console for debugging.
- **Input Validation:** Client-side validation for product forms, dates, pricing, stock, images.
- **Permissions:** Image picker requests runtime permissions; fallback instructions provided.
- **Env Protection:** API base URL pulled from `EXPO_PUBLIC_API_URL`, so builds target correct backend automatically.

Next steps (optional enhancements):
- Implement refresh token workflow when access token expires.
- Add biometric login toggle (UI is ready in settings).
- Integrate analytics/logging (Sentry, Segment).

---

## ✅ Testing Strategy
- **Manual smoke tests** for auth, navigation, CRUD, order flows.
- **Unit tests (future work):** Add Jest + React Native Testing Library to verify components (e.g., forms, reducers).
- **Integration tests (future work):** Detox/E2E for sign-in and checkout flows.

> Before delivery, run through the “Happy Path Checklist” in your presentation to ensure no regressions.

---

## 🌍 Deployment
Publishing is handled via EAS Update:

```bash
# First-time setup
eas login
eas init

# Publish OTA update
eas update --branch production --message "v1.0 release"
```

The command returns a shareable Expo URL (e.g., `https://expo.dev/@username/project-nexus?branch=production`). Use that link for submissions or demos.

For binaries (Play/App Store):
```bash
eas build --platform android   # or ios / all
```

---

## 🛠 Troubleshooting

| Issue | Resolution |
| --- | --- |
| `EXPO_PUBLIC_API_URL` missing | Copy `.env.example` → `.env`, restart bundler. |
| Login delay (Render cold start) | Hit the API once via browser to warm it up before demos. |
| Image upload fails | Ensure device has gallery permission; backend expects `product_image` field. |
| Tabs overlap gesture bar | Adjusted `tabBarStyle.paddingBottom` to 16px; if still an issue, test on different devices. |

---

## 📋 Project Management & Version Control
- **Branching:** `main` for production, feature branches prefixed with `feat/`, `fix/`, `chore/`.
- **Commits:** Conventional style – `feat: add security settings UI`.
- **Reviews:** PR checklist covers linting, screenshots, and API changes.
- **CI (future):** Add GitHub Actions to run tests + Expo EAS previews.

---

## 🎤 Presenting the Project
When demoing:
1. **Problem & Audience:** Explain the need for a mobile-first seller dashboard.
2. **Solution Walkthrough:** Showcase auth, catalog, product CRUD, order tracking, and settings.
3. **Challenges:** Mention handling multipart uploads and aligning with backend Postman spec.
4. **Impact & Next Steps:** Outline upcoming features (e.g., analytics, real-time order updates).

---

## 📄 License
This project is released under the MIT License. Feel free to remix and extend with attribution.

---

Happy shipping! If you discover issues or have improvement ideas, open a pull request or file a ticket. Project Nexus is built to evolve. 🚀
