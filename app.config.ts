import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "HTML to PDF Converter",
  slug: "praystone",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "manustokenapp",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  extra: {
    eas: {
      projectId: "3948fdf8-2d73-4758-967d-46d8b8ed8351"
    }
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "space.manus.html.to.pdf.app",
    infoPlist: {
      "ITSAppUsesNonExemptEncryption": false
    }
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "space.manus.html.to.pdf.app",
    permissions: ["POST_NOTIFICATIONS"],
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
    [
      "expo-build-properties",
      {
        android: {
          buildArchs: ["armeabi-v7a", "arm64-v8a"],
          minSdkVersion: 24,
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
