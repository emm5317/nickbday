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

  const isPlayerOnline = (name: string) =>
    name in locations && Date.now() - locations[name].timestamp < 10 * 60 * 1000;

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
        <View style={styles.onlinePill}>
          <Text style={styles.onlineText}>
            {activeCount} of {PLAYERS.length} online
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        {PLAYERS.map((name) => {
          const online = isPlayerOnline(name);
          const isNick = name === 'Nick';
          const color = PLAYER_COLORS[name] || Colors.gold;

          return (
            <View key={name} style={styles.member}>
              <View
                style={[
                  styles.avatar,
                  isNick && styles.avatarNick,
                  online && { borderColor: 'rgba(0,212,200,0.55)' },
                  !online && !isNick && { borderColor: 'rgba(201,168,76,0.18)' },
                ]}
              >
                <Text
                  style={[
                    styles.avatarLetter,
                    isNick && styles.avatarLetterNick,
                    !isNick && !online && { color: Colors.textMuted },
                    online && !isNick && { color: Colors.neonCyan },
                  ]}
                >
                  {name[0]}
                </Text>
                <View
                  style={[
                    styles.statusDot,
                    online ? styles.statusOnline : styles.statusOffline,
                  ]}
                />
              </View>
              <Text style={[styles.name, online && styles.nameOnline]}>
                {name}
              </Text>
            </View>
          );
        })}
      </View>
    </Pressable>
  );
}

const AVATAR_SIZE = 44;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Colors.bgCard,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: Radii.xl2,
    padding: Spacing.lg,
    marginTop: Spacing.md,
  },
  pressed: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  onlinePill: {
    backgroundColor: 'rgba(0,212,200,0.1)',
    borderWidth: 0.5,
    borderColor: 'rgba(0,212,200,0.25)',
    borderRadius: Radii.full,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  onlineText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 0.8,
    color: Colors.neonCyan,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  member: {
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: Colors.bgElevated,
    borderWidth: 1.5,
    borderColor: 'rgba(201,168,76,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarNick: {
    borderColor: 'rgba(201,168,76,0.58)',
    backgroundColor: 'rgba(26,30,56,1)',
  },
  avatarLetter: {
    fontFamily: Fonts.display,
    fontSize: 14,
    color: Colors.textMuted,
  },
  avatarLetterNick: {
    color: Colors.goldLight,
    fontSize: 16,
  },
  statusDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 11,
    height: 11,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.bgCard,
  },
  statusOnline: {
    backgroundColor: Colors.neonCyan,
  },
  statusOffline: {
    backgroundColor: 'rgba(200,195,220,0.22)',
  },
  name: {
    fontFamily: Fonts.body,
    fontSize: 8,
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
  nameOnline: {
    color: 'rgba(240,232,208,0.62)',
  },
});
