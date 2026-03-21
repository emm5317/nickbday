import { useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { useAppStore } from '@/store/useAppStore';
import { writeLocation } from '@/lib/firebaseSync';

const UPDATE_INTERVAL = 30_000; // 30 seconds

export function useLocationSharing() {
  const currentPlayer = useAppStore((s) => s.currentPlayer);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!currentPlayer) return;

    let active = true;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted' || !active) return;

      const updateLocation = async () => {
        try {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          if (active && currentPlayer) {
            writeLocation(currentPlayer, loc.coords.latitude, loc.coords.longitude);
          }
        } catch {
          // Location unavailable — skip this update
        }
      };

      // Initial update
      updateLocation();

      // Poll every 30 seconds
      intervalRef.current = setInterval(updateLocation, UPDATE_INTERVAL);
    };

    startTracking();

    return () => {
      active = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentPlayer]);
}
