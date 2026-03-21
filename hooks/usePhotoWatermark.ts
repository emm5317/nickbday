import { useRef, useCallback } from 'react';
import { View } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

export function usePhotoWatermark() {
  const watermarkRef = useRef<View>(null);

  const applyWatermark = useCallback(async (photoUri: string): Promise<string> => {
    // Small delay to let the hidden overlay render with the new photo
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!watermarkRef.current) {
      return photoUri;
    }

    try {
      const watermarkedUri = await captureRef(watermarkRef, {
        format: 'jpg',
        quality: 0.9,
      });

      // Save to device gallery
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(watermarkedUri);
      }

      return watermarkedUri;
    } catch {
      // If watermarking fails, return the original
      return photoUri;
    }
  }, []);

  return {
    watermarkRef,
    applyWatermark,
  };
}
