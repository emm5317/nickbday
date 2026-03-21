import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';

interface ModuleTileProps {
  icon: string;
  iconColor?: string;
  label: string;
  sublabel: string;
  badge?: string;
  onPress: () => void;
}

export function ModuleTile({ icon, iconColor, label, sublabel, badge, onPress }: ModuleTileProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.iconRow}>
        <Text style={[styles.icon, iconColor ? { color: iconColor } : undefined]}>{icon}</Text>
        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.sublabel}>{sublabel}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    padding: Spacing.xl,
    gap: Spacing.sm,
    minHeight: 110,
  },
  pressed: {
    opacity: 0.7,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  icon: {
    fontSize: 28,
    color: Colors.gold,
  },
  badge: {
    backgroundColor: Colors.neonPink,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radii.sm,
  },
  badgeText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 1,
    color: '#FFFFFF',
  },
  label: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  sublabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
