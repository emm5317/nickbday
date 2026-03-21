import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { useAppStore } from '@/store/useAppStore';
import { PLAYERS } from '@/constants/players';

const PLAYER_COLORS: Record<string, string> = {
  Nick: Colors.gold,
  Yulyia: Colors.neonPink,
  Eric: Colors.neonCyan,
  Kayla: Colors.velvetPurple,
  Lyndsey: Colors.marqueeAmber,
};

interface CrewCardProps {
  onPress: () => void;
}

export function CrewCard({ onPress }: CrewCardProps) {
  const locations = useAppStore((s) => s.locations);

  const activeCount = Object.values(locations).filter(
    (loc) => Date.now() - loc.timestamp < 10 * 60 * 1000
  ).length;

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Find the Crew</Text>
        <Text style={styles.status}>
          {activeCount} of {PLAYERS.length} online
        </Text>
      </View>

      <View style={styles.dots}>
        {PLAYERS.map((name) => {
          const isOnline =
            name in locations &&
            Date.now() - locations[name].timestamp < 10 * 60 * 1000;
          return (
            <View key={name} style={styles.playerDot}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: isOnline
                      ? PLAYER_COLORS[name] || Colors.gold
                      : Colors.textMuted,
                  },
                ]}
              />
              <Text
                style={[styles.dotLabel, !isOnline && styles.dotLabelOffline]}
              >
                {name}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    padding: Spacing.xl,
    marginTop: Spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  status: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 1,
    color: Colors.gold,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerDot: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotLabel: {
    fontFamily: Fonts.body,
    fontSize: 9,
    color: Colors.textSecondary,
  },
  dotLabelOffline: {
    color: Colors.textMuted,
  },
});
