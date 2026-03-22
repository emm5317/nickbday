import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { Badge } from '@/components/ui/Badge';

interface SphereBannerProps {
  onPress: () => void;
}

export function SphereBanner({ onPress }: SphereBannerProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.banner, pressed && { opacity: 0.8 }]}
      onPress={onPress}
    >
      <Text style={styles.eyebrow}>{'\u2B50'} ANCHOR EVENT</Text>
      <Text style={styles.title}>Phamily at The Sphere</Text>
      <Text style={styles.venue}>Las Vegas Sphere {'\u00B7'} Doors 6:30 PM</Text>
      <View style={styles.tags}>
        <Badge label="The Sphere" color="amber" />
        <Badge label="Phamily" color="purple" />
        <Badge label={`Tickets \u2713`} color="cyan" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 14,
    marginBottom: 12,
    padding: 14,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: 'rgba(232,133,58,0.45)',
    backgroundColor: 'rgba(232,133,58,0.06)',
    overflow: 'hidden',
  },
  eyebrow: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 7,
    letterSpacing: 2,
    color: Colors.marqueeAmber,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  title: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  venue: {
    fontFamily: Fonts.body,
    fontSize: 8,
    color: Colors.textMuted,
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 5,
    flexWrap: 'wrap',
  },
});
