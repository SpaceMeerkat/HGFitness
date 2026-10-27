import { DarkTheme, DefaultTheme, ThemeProvider } from "expo-router/react-navigation";
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { AppContextProvider, useAppContext } from "@/components/appContext";
import { NoInternetScreen } from "@/components/network/NoInternetScreen";
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Fallback color
  },
  video: {
    width: width*0.75,
    height: width*0.75,
    position: 'absolute',
  },
});

function AppContent() {
  const colorScheme = useColorScheme();
  const { loading, isConnected } = useAppContext();
  const [minDurationReached, setMinDurationReached] = useState(false);
  const player = useVideoPlayer(require('../assets/images/splashscreenmp4.mp4'), player => {
    player.loop = true;
    player.muted = true;
    player.play();
  });

  const MIN_VIDEO_DURATION = 2000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDurationReached(true);
    }, MIN_VIDEO_DURATION);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (loading || !minDurationReached) {
    return (
      <View style={styles.overlay}>
        <VideoView
          player={player}
          style={styles.video}
          contentFit="cover"
          nativeControls={false}
          onFirstFrameRender={() => SplashScreen.hideAsync()}
        />
      </View>
    );
  }

  if (isConnected === false) {
    return <NoInternetScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Edo: require('../assets/fonts/edo.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}
