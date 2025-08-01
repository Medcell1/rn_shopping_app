````markdown
# Shopping App

## Features
- **Authentication**: Sign up and sign in with email and password using Supabase Auth.  
- **Product Listing**: Browse products with images, prices, and an option to add new products.  
- **Cart Management**: Add, update, or remove items from the cart with real-time total calculation.  
- **Checkout**: Place orders with a summary of cart items, stored in Supabase.  
- **Order History**: View past orders with details like date, items, and total.  
- **Responsive Design**: Optimized for iOS, Android, and web with NativeWind (Tailwind CSS).  
- **Modal Navigation**: Smooth transitions for cart and checkout screens using Expo Router.  

## Tech Stack
- **Framework**: React Native  
- **Navigation**: Expo Router  
- **Styling**: NativeWind  
- **State Management**: Zustand  
- **Backend**: Supabase  
- **Language**: TypeScript  

## Prerequisites
Before setting up the project, ensure you have the following installed:
- **Node.js**: v18 or higher  
- **npm or yarn**: Package manager for installing dependencies  
- **Expo CLI**: For running the app  
- **Expo Go**: Mobile app for testing on iOS/Android devices  
- **Git**: For cloning the repository  
- **Supabase Account**: For backend services (authentication and database)  

## Installation
### Clone the Repository
```bash
git clone https://github.com/Medcell1/rn_shopping_app.git
cd shopping-app
````

### Install Dependencies

Using **npm**:

```bash
npm install
```

Or using **yarn**:

```bash
yarn install
```

### Set Up Environment Variables

Create a `.env` file in the project root and add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
EXPO_PUBLIC_SUPABASE_API_KEY=your-supabase-anon-key
```

Replace `your-supabase-url` and `your-supabase-anon-key` with the values from your Supabase project (found in the Supabase dashboard under **Settings > API**).

### Configure Supabase

Ensure your Supabase project has the following:

* **Authentication**: Enabled with email/password provider.
* **Database**:

  * `products` table with columns:

    * `id` (uuid), `name` (text), `price` (float), `image_url` (text, nullable), `created_at` (timestamp).
  * `orders` table with columns:

    * `id` (uuid), `user_id` (uuid), `total` (float), `items` (jsonb), `created_at` (timestamp).
* **Row Level Security (RLS)** policies for secure data access.

### Start the Development Server

Run the app with Expo CLI:

```bash
npm start
```

Or with yarn:

```bash
yarn start
```

This starts the Metro bundler and displays a QR code.

## Running on Expo Go

### Download Expo Go

Install the Expo Go app on your iOS or Android device from the **App Store** or **Google Play**.

### Scan QR Code

* Open Expo Go on your device.
* Scan the QR code displayed by `npm start` (or `yarn start`) in the terminal or browser.
* Ensure your device and computer are on the same Wi-Fi network.

### Test the App

The app should load in Expo Go, allowing you to test authentication, product browsing, cart, checkout, and order history.

## Running on Simulators/Emulators

### iOS Simulator

Ensure **Xcode** is installed (macOS only).
Run:

```bash
npm run ios
```

### Android Emulator

Ensure **Android Studio** and an emulator are set up.
Run:

```bash
npm run android
```

## Running on Web

To test the app in a browser:

```bash
npm run web
```

The app uses Metro bundler for web output, configured as a static SPA.

## Scripts

* `npm start`: Start the Expo development server.
* `npm run android`: Run on Android emulator/device.
* `npm run ios`: Run on iOS simulator/device.
* `npm run web`: Run on web browser.
* `npm run lint`: Run ESLint for code linting.
* `npm run reset-project`: Reset project cache (uses `scripts/reset-project.js`).

## Project Structure

```
shopping-app/
├── app/
│   ├── (auth)/
│   │   └── index.tsx         # Authentication screen
│   │   └── _layout.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx       # Tab navigator
│   │   ├── index.tsx         # Product list screen
│   │   ├── cart.tsx          # Cart screen
│   │   └── orders.tsx        # Order history screen
│   ├── checkout.tsx          # Checkout screen
│   └── _layout.tsx           # Root stack navigator
├── assets/
│   ├── images/
│   │   ├── icon.png          # App icon
│   │   ├── adaptive-icon.png # Android adaptive icon
│   │   ├── favicon.png       # Web favicon
│   │   └── splash-icon.png   # Splash screen image
├── src/
│   ├── components/           # Reusable components (CustomButton, CustomInput, etc.)
│   ├── lib/                  # Supabase client
│   ├── store/                # Zustand store for cart
│   ├── types/                # TypeScript types
├── app.config.js             # Expo configuration
├── package.json              # Dependencies and scripts
├── .env                      # Environment variables
└── globals.css               # Global styles (Tailwind)
```

## Environment Variables

* **EXPO\_PUBLIC\_SUPABASE\_URL**: Your Supabase project URL.
* **EXPO\_PUBLIC\_SUPABASE\_API\_KEY**: Your Supabase anonymous API key.

Add these to your `.env` file as shown above.


