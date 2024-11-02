export default ({ config }) => ({
  expo: {
    name: "NowMatch",
    slug: "NowMatch",
    scheme: "NowMatch",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      Bundleidentifier: "com.Kanpai.NowMatch",
      bundleIdentifier: "com.Knapai.NowMatch"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.anonymous.NowMatch"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router"
    ],
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: "9e539c5b-327a-4ad4-b39a-abcaa38d2d53"
      },
      firebaseApiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
      firebaseStorageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FB_APP_ID
    }
  }
});