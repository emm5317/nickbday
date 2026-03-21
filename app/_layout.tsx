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
import { useEffect } from 'react';
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

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
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
