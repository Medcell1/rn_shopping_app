import { AppState, Platform } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_URL;
const supabaseApiKey = Constants.expoConfig?.extra?.EXPO_PUBLIC_SUPABASE_API_KEY;

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
// const supabaseApiKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error("Missing Supabase environment variables");
}



export const supabase = createClient(supabaseUrl, supabaseApiKey, {
  auth: {
    ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}