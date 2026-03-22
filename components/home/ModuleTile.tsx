import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';

interface ModuleTileProps {
  icon: string;
  iconColor?: string;
  label: string;
  sublabel: string;
  badge?: string;
  badgeVariant?: 'new' | 'active' | 'completed';
  suitWatermark?: string;
  borderColor?: string;
  progress?: { percent: number; label: string };
  onPress: () => void;
}

export function ModuleTile({
  icon,
  iconColor,
  label,
  sublabel,
  badge,
  badgeVariant = 'new',
  suitWatermark,
  borderColor,
  progress,
  onPress,
}: ModuleTileProps) {
  const badgeBg =
    badgeVariant === 'completed'
      ? 'rgba(0,212,200,0.15)'
      : badgeVariant === 'active'
        ? 'rgba(232,133,58,0.2)'
        : Colors.neonPink;
  const badgeBorderColor =
    badgeVariant === 'completed'
      ? 'rgba(0,212,200,0.35)'
      : badgeVariant === 'active'
        ? 'rgba(232,133,58,0.3)'
        : 'transparent';
  const badgeTextColor =
    badgeVariant === 'completed'
      ? '#4DE8E2'
      : badgeVariant === 'active'
        ? '#F0A060'
        : '#FFFFFF';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.tile,
        borderColor ? { borderColor } : undefined,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.iconRow}>
        <Text style={[styles.icon, iconColor ? { color: iconColor } : undefined]}>{icon}</Text>
        {badge ? (
          <View
            style={[
              styles.badge,
              {
                backgroundColor: badgeBg,
                borderColor: badgeBorderColor,
                borderWidth: badgeVariant === 'completed' || badgeVariant === 'active' ? 0.5 : 0,
              },
            ]}
          >
            <Text style={[styles.badgeText, { color: badgeTextColor }]}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.sublabel}>{sublabel}</Text>
        {progress ? (
          <View style={styles.progressWrap}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress.percent}%` }]} />
            </View>
            <Text style={styles.progressLabel}>{progress.label}</Text>
          </View>
        ) : null}
      </View>
      {suitWatermark ? (
        <Text style={styles.watermark}>{suitWatermark}</Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: Radii.xl2,
    padding: Spacing.lg,
    justifyContent: 'space-between',
    minHeight: 112,
    overflow: 'hidden',
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
    fontSize: 24,
    color: Colors.gold,
  },
  badge: {
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: 6,
  },
  badgeText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 7,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  sublabel: {
    fontFamily: Fonts.body,
    fontSize: 9,
    color: Colors.textMuted,
    lineHeight: 13,
  },
  progressWrap: {
    marginTop: 6,
  },
  progressBar: {
    height: 2,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: Colors.neonCyan,
  },
  progressLabel: {
    fontFamily: Fonts.body,
    fontSize: 7,
    color: 'rgba(0,212,200,0.6)',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  watermark: {
    position: 'absolute',
    right: -3,
    bottom: -10,
    fontSize: 62,
    opacity: 0.04,
    lineHeight: 62,
  },
});
