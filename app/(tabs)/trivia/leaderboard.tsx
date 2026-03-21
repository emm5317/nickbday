import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { GoldButton } from '@/components/ui/GoldButton';
import { GhostButton } from '@/components/ui/GhostButton';
import { useAppStore } from '@/store/useAppStore';
import { PLAYERS } from '@/constants/players';
import { TRIVIA_QUESTIONS } from '@/data/trivia';

export default function LeaderboardScreen() {
  const router = useRouter();
  const currentPlayer = useAppStore((s) => s.currentPlayer);
  const triviaScores = useAppStore((s) => s.triviaScores);
  const totalQuestions = TRIVIA_QUESTIONS.length;

  const played = Object.entries(triviaScores)
    .sort(([, a], [, b]) => b - a);

  const notPlayed = PLAYERS.filter((p) => !(p in triviaScores));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Leaderboard</Text>
        <Text style={styles.subtitle}>NICK TRIVIA RESULTS</Text>

        <View style={styles.board}>
          {played.map(([name, score], i) => {
            const isCurrentPlayer = name === currentPlayer;
            const rankIcon =
              i === 0 ? '\u{1F451}' : i === 1 ? '\u{1F948}' : i === 2 ? '\u{1F949}' : `${i + 1}.`;

            return (
              <View
                key={name}
                style={[styles.row, isCurrentPlayer && styles.rowHighlight]}
              >
                <Text style={styles.rank}>{rankIcon}</Text>
                <Text style={[styles.name, isCurrentPlayer && styles.nameHighlight]}>
                  {name}
                </Text>
                <Text style={styles.score}>
                  {score}/{totalQuestions}
                </Text>
              </View>
            );
          })}

          {notPlayed.map((name) => (
            <View key={name} style={styles.row}>
              <Text style={styles.rank}>—</Text>
              <Text style={styles.nameGrey}>{name}</Text>
              <Text style={styles.scoreGrey}>Not played</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttons}>
          <GoldButton
            label="PLAY AGAIN"
            onPress={() => router.replace('/(tabs)/trivia/game' as any)}
            style={styles.button}
          />
          <GhostButton
            label="BACK TO HOME"
            onPress={() => router.replace('/(tabs)/' as any)}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 32,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.gold,
    textAlign: 'center',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xxl,
  },
  board: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radii.sm,
  },
  rowHighlight: {
    backgroundColor: 'rgba(201, 168, 76, 0.1)',
  },
  rank: {
    fontSize: 16,
    width: 32,
    textAlign: 'center',
    color: Colors.textSecondary,
  },
  name: {
    flex: 1,
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
    color: Colors.textPrimary,
  },
  nameHighlight: {
    color: Colors.goldLight,
  },
  nameGrey: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.textMuted,
  },
  score: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 16,
    color: Colors.goldLight,
  },
  scoreGrey: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textMuted,
  },
  buttons: {
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  button: {
    width: '100%',
  },
});
