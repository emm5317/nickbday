import { View, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/theme';

export function AvatarRing() {
  return (
    <View style={styles.ring}>
      <Image
        source={require('@/assets/images/nick.jpg')}
        style={styles.photo}
      />
      <View style={styles.badge}>
        <Text style={styles.badgeEmoji}>{'\u{1F451}'}</Text>
      </View>
    </View>
  );
}

const SIZE = 110;
const BORDER = 2;
const BADGE_SIZE = 30;
const PHOTO_SIZE = SIZE - BORDER * 2 - 6;

const styles = StyleSheet.create({
  ring: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: BORDER,
    borderColor: Colors.gold,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
  },
  badge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: BADGE_SIZE / 2,
    backgroundColor: Colors.bgDeep,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmoji: {
    fontSize: 16,
  },
});
