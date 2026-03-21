import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { GoldButton } from '@/components/ui/GoldButton';
import { GhostButton } from '@/components/ui/GhostButton';
import { Spacing } from '@/constants/theme';
import { View, StyleSheet } from 'react-native';

interface PhotoCaptureProps {
  visible: boolean;
  onClose: () => void;
  onPhotoTaken: (uri: string) => void;
}

export function PhotoCapture({ visible, onClose, onPhotoTaken }: PhotoCaptureProps) {
  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera access is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
    });

    if (!result.canceled && result.assets[0]) {
      onClose();
      onPhotoTaken(result.assets[0].uri);
    }
  };

  const handleLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.8,
      allowsEditing: true,
      mediaTypes: ['images'],
    });

    if (!result.canceled && result.assets[0]) {
      onClose();
      onPhotoTaken(result.assets[0].uri);
    }
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={styles.content}>
        <GoldButton label="TAKE PHOTO" onPress={handleCamera} style={styles.button} />
        <GhostButton label="CHOOSE FROM LIBRARY" onPress={handleLibrary} style={styles.button} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: Spacing.md,
    paddingTop: Spacing.sm,
  },
  button: {
    width: '100%',
  },
});
