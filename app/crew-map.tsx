import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
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

// Las Vegas Strip center as default
const VEGAS_CENTER = {
  latitude: 36.1147,
  longitude: -115.1728,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
};

export default function CrewMapScreen() {
  const router = useRouter();
  const locations = useAppStore((s) => s.locations);

  const activePlayers = Object.entries(locations).filter(
    ([, loc]) => Date.now() - loc.timestamp < 10 * 60 * 1000 // Active in last 10 min
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Find the Crew</Text>
          <Text style={styles.subtitle}>
            {activePlayers.length} of {PLAYERS.length} online
          </Text>
        </View>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Text style={styles.closeText}>{'\u2715'}</Text>
        </Pressable>
      </View>

      <MapView
        style={styles.map}
        initialRegion={VEGAS_CENTER}
        userInterfaceStyle="dark"
      >
        {Object.entries(locations).map(([name, loc]) => (
          <Marker
            key={name}
            coordinate={{ latitude: loc.lat, longitude: loc.lng }}
            title={name}
            description={`Last seen ${getTimeAgo(loc.timestamp)}`}
            pinColor={PLAYER_COLORS[name] || Colors.gold}
          />
        ))}
      </MapView>

      {/* Player legend */}
      <View style={styles.legend}>
        {PLAYERS.map((name) => {
          const isOnline = name in locations &&
            Date.now() - locations[name].timestamp < 10 * 60 * 1000;
          return (
            <View key={name} style={styles.legendItem}>
              <View
                style={[
                  styles.legendDot,
                  {
                    backgroundColor: isOnline
                      ? PLAYER_COLORS[name] || Colors.gold
                      : Colors.textMuted,
                  },
                ]}
              />
              <Text
                style={[styles.legendName, !isOnline && styles.legendNameOffline]}
              >
                {name}
              </Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

function getTimeAgo(timestamp: number): string {
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.gold,
    marginTop: Spacing.xs,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  map: {
    flex: 1,
    borderRadius: Radii.lg,
    marginHorizontal: Spacing.lg,
    overflow: 'hidden',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.lg,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendName: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 11,
    color: Colors.textPrimary,
  },
  legendNameOffline: {
    color: Colors.textMuted,
  },
});
