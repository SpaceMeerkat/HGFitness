import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useRef } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, Dimensions  } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { StatusBar } from 'react-native';

import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AppContextProvider} from "@/components/appContext";
import { useAppContext } from "@/components/appContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
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
  const { loading } = useAppContext();
  const [minDurationReached, setMinDurationReached] = useState(false);
  const videoRef = useRef(null);

  const MIN_VIDEO_DURATION = 2000;

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDurationReached(true);
    }, MIN_VIDEO_DURATION);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded && status.positionMillis >= MIN_VIDEO_DURATION && !minDurationReached) {
      setMinDurationReached(true); // Ensure the video plays at least for MIN_VIDEO_DURATION
    }
  };

  if (loading || !minDurationReached) {
    return (
      <View style={styles.overlay}>
        <Video
          source={require('../assets/images/splashscreenmp4.mp4')}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          shouldPlay
          isLooping
          isMuted={false} // Set to true if you don't want audio
          rate={1.0} // Normal speed
          volume={0} // Full volume
          onReadyForDisplay={() => SplashScreen.hideAsync()}
        />
      </View>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
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
