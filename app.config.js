import "dotenv/config";

export default {
  expo: {
    name: "Bill Splitter",
    slug: "expo-firebase",
    privacy: "public",
    platforms: ["ios", "android"],
    version: "0.15.0",
    orientation: "portrait",
    icon: "./assets/flame.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#fff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.billshreysplitter",
    },
    ios: {
      bundleIdentifier: "com.billshreysplitter",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
};
