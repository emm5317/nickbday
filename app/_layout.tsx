import { useFonts } from 'expo-font';
import {
  PlayfairDisplay_700Bold,
  PlayfairDisplay_900Black,
} from '@expo-google-fonts/playfair-display';
import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
} from '@expo-google-fonts/dm-sans';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/theme';
import { useEasterEggWatcher } from '@/hooks/useEasterEggWatcher';
import { useLocationSharing } from '@/hooks/useLocationSharing';
import { subscribeToState } from '@/lib/firebaseSync';
import { useAppStore } from '@/store/useAppStore';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlayfairDisplay_700Bold,
    PlayfairDisplay_900Black,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
  });
  const [showSplash, setShowSplash] = useState(true);
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const splashOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // Animate logo in
      Animated.parallel([
        Animated.timing(logoOpacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(logoScale, { toValue: 1, duration: 800, useNativeDriver: true }),
      ]).start();
      // After showing logo, fade out splash
      setTimeout(() => {
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }).start(() => setShowSplash(false));
      }, 1200);
    }
  }, [loaded, logoOpacity, logoScale, splashOpacity]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <RootLayoutNav />
      {showSplash && (
        <Animated.View style={[styles.splash, { opacity: splashOpacity }]}>
          <Animated.Image
            source={require('@/assets/images/icon.png')}
            style={[
              styles.splashLogo,
              { opacity: logoOpacity, transform: [{ scale: logoScale }] },
            ]}
          />
        </Animated.View>
      )}
    </View>
  );
}

function RootLayoutNav() {
  useEasterEggWatcher();
  useLocationSharing();
  const syncFromFirebase = useAppStore((s) => s.syncFromFirebase);

  useEffect(() => {
    const unsubscribe = subscribeToState(syncFromFirebase);
    return unsubscribe;
  }, [syncFromFirebase]);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.bgDeep },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="crew-map"
          options={{
            headerShown: false,
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="easter-egg"
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="player-select"
          options={{ presentation: 'modal' }}
        />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  splash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.bgDeep,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  splashLogo: {
    width: 160,
    height: 160,
    borderRadius: 32,
  },
});
