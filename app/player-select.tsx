import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { PLAYERS } from '@/constants/players';
import { useAppStore } from '@/store/useAppStore';

export default function PlayerSelectScreen() {
  const router = useRouter();
  const setCurrentPlayer = useAppStore((s) => s.setCurrentPlayer);

  const handleSelect = (name: string) => {
    setCurrentPlayer(name);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who are you?</Text>
      <Text style={styles.subtitle}>Select your name</Text>
      <View style={styles.list}>
        {PLAYERS.map((name) => (
          <Pressable
            key={name}
            style={styles.playerButton}
            onPress={() => handleSelect(name)}
          >
            <Text style={styles.playerText}>{name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  list: {
    width: '100%',
    gap: Spacing.md,
  },
  playerButton: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  playerText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
    color: Colors.textPrimary,
  },
});
