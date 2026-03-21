import { forwardRef } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';

interface WatermarkOverlayProps {
  photoUri: string;
}

export const WatermarkOverlay = forwardRef<View, WatermarkOverlayProps>(
  ({ photoUri }, ref) => {
    return (
      <View ref={ref} style={styles.container} collapsable={false}>
        <Image source={{ uri: photoUri }} style={styles.photo} />
        <View style={styles.watermarkContainer}>
          <Text style={styles.watermarkText}>
            NICK'S 30 · LAS VEGAS · APR 2026
          </Text>
        </View>
      </View>
    );
  }
);

WatermarkOverlay.displayName = 'WatermarkOverlay';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: -9999,
    top: -9999,
    width: 1080,
    height: 1080,
  },
  photo: {
    width: 1080,
    height: 1080,
    resizeMode: 'cover',
  },
  watermarkContainer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  watermarkText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 18,
    color: 'rgba(201, 168, 76, 0.85)',
    letterSpacing: 2,
  },
});
