import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '@/constants/theme';

export function AvatarRing() {
  return (
    <View style={styles.ring}>
      <View style={styles.inner}>
        <Text style={styles.initial}>N</Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeEmoji}>{'\u{1F451}'}</Text>
      </View>
    </View>
  );
}

const SIZE = 80;
const BORDER = 3;
const BADGE_SIZE = 24;

const styles = StyleSheet.create({
  ring: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: BORDER,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: SIZE - BORDER * 2,
    height: SIZE - BORDER * 2,
    borderRadius: (SIZE - BORDER * 2) / 2,
    backgroundColor: Colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: Fonts.displayBlack,
    fontSize: 32,
    color: Colors.gold,
    marginTop: -2,
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
    fontSize: 14,
  },
});
