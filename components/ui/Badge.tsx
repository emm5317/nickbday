import { View, Text, StyleSheet } from 'react-native';
import { Fonts, Spacing, Radii, TagColors } from '@/constants/theme';

interface BadgeProps {
  label: string;
  color: keyof typeof TagColors;
}

export function Badge({ label, color }: BadgeProps) {
  const tagColor = TagColors[color];

  return (
    <View style={[styles.badge, { backgroundColor: tagColor.bg }]}>
      <Text style={[styles.label, { color: tagColor.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radii.sm,
    alignSelf: 'flex-start',
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
