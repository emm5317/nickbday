import { useState } from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { PhotoGrid } from '@/components/memories/PhotoGrid';
import { PhotoCapture } from '@/components/memories/PhotoCapture';
import { WatermarkOverlay } from '@/components/memories/WatermarkOverlay';
import { usePhotoWatermark } from '@/hooks/usePhotoWatermark';
import { useAppStore } from '@/store/useAppStore';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MemoriesScreen() {
  const memoryPhotoUris = useAppStore((s) => s.memoryPhotoUris);
  const addMemoryPhoto = useAppStore((s) => s.addMemoryPhoto);

  const [captureVisible, setCaptureVisible] = useState(false);
  const [viewerUri, setViewerUri] = useState<string | null>(null);
  const [pendingPhoto, setPendingPhoto] = useState<string | null>(null);

  const { watermarkRef, applyWatermark } = usePhotoWatermark();

  const handlePhotoTaken = async (uri: string) => {
    setPendingPhoto(uri);

    // Small delay for watermark overlay to render
    setTimeout(async () => {
      const watermarkedUri = await applyWatermark(uri);
      addMemoryPhoto(watermarkedUri);
      setPendingPhoto(null);
    }, 100);
  };

  const handleShare = async () => {
    if (viewerUri) {
      const available = await Sharing.isAvailableAsync();
      if (available) {
        await Sharing.shareAsync(viewerUri);
      }
    }
  };

  const isEmpty = memoryPhotoUris.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Memories</Text>
          <Text style={styles.subtitle}>
            {'\u2665'} {memoryPhotoUris.length} photos
          </Text>
        </View>
      </View>

      {/* Photo Grid or Empty State */}
      {isEmpty ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyHeart}>{'\u2665'}</Text>
          <Text style={styles.emptyTitle}>No memories yet</Text>
          <Text style={styles.emptySubtitle}>
            Tap + to capture your first
          </Text>
        </View>
      ) : (
        <PhotoGrid
          photoUris={memoryPhotoUris}
          onPhotoPress={(uri) => setViewerUri(uri)}
        />
      )}

      {/* FAB */}
      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => setCaptureVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      {/* Photo Capture Bottom Sheet */}
      <PhotoCapture
        visible={captureVisible}
        onClose={() => setCaptureVisible(false)}
        onPhotoTaken={handlePhotoTaken}
      />

      {/* Hidden Watermark Overlay for ViewShot */}
      {pendingPhoto && (
        <WatermarkOverlay ref={watermarkRef} photoUri={pendingPhoto} />
      )}

      {/* Full-Screen Photo Viewer */}
      <Modal
        visible={viewerUri !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setViewerUri(null)}
      >
        <View style={styles.viewer}>
          <Pressable
            style={styles.closeButton}
            onPress={() => setViewerUri(null)}
          >
            <Text style={styles.closeText}>{'\u2715'}</Text>
          </Pressable>

          {viewerUri && (
            <Image
              source={{ uri: viewerUri }}
              style={styles.viewerImage}
              resizeMode="contain"
            />
          )}

          <Pressable style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareText}>SHARE</Text>
          </Pressable>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 32,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.neonPink,
    marginTop: Spacing.xs,
  },
  // Empty state
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyHeart: {
    fontSize: 48,
    color: Colors.neonPink,
    opacity: 0.3,
    marginBottom: Spacing.lg,
  },
  emptyTitle: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  // FAB
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: Colors.gold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  fabPressed: {
    backgroundColor: Colors.goldDark,
  },
  fabText: {
    fontSize: 28,
    color: Colors.bgDeep,
    fontWeight: '300',
    marginTop: -2,
  },
  // Full-screen viewer
  viewer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewerImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeText: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  shareButton: {
    position: 'absolute',
    bottom: 60,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: Radii.full,
  },
  shareText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    letterSpacing: 2,
    color: Colors.gold,
  },
});
