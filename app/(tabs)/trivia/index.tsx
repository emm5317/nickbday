import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { GoldButton } from '@/components/ui/GoldButton';
import { useAppStore } from '@/store/useAppStore';
import { TRIVIA_QUESTIONS } from '@/data/trivia';
import { PLAYERS } from '@/constants/players';

export default function TriviaLobbyScreen() {
  const router = useRouter();
  const currentPlayer = useAppStore((s) => s.currentPlayer);
  const triviaScores = useAppStore((s) => s.triviaScores);

  const playerScore = currentPlayer ? triviaScores[currentPlayer] : undefined;
  const totalQuestions = TRIVIA_QUESTIONS.length;

  const rankedScores = Object.entries(triviaScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.suit}>{'\u2660'}</Text>
        <Text style={styles.title}>Nick Trivia</Text>
        <Text style={styles.subtitle}>
          {totalQuestions} questions about the birthday boy
        </Text>

        {currentPlayer && (
          <View style={styles.playerCard}>
            <Text style={styles.playerLabel}>Playing as</Text>
            <Text style={styles.playerName}>{currentPlayer}</Text>
            {playerScore !== undefined && (
              <Text style={styles.previousScore}>
                Previous score: {playerScore}/{totalQuestions}
              </Text>
            )}
          </View>
        )}

        {rankedScores.length > 0 && (
          <View style={styles.previewBoard}>
            <Text style={styles.previewTitle}>Leaderboard</Text>
            {rankedScores.map(([name, score], i) => (
              <View key={name} style={styles.previewRow}>
                <Text style={styles.previewRank}>
                  {i === 0 ? '\u{1F451}' : `${i + 1}.`}
                </Text>
                <Text style={styles.previewName}>{name}</Text>
                <Text style={styles.previewScore}>
                  {score}/{totalQuestions}
                </Text>
              </View>
            ))}
            {PLAYERS.filter((p) => !triviaScores[p]).length > 0 && (
              <Text style={styles.waitingText}>
                {PLAYERS.filter((p) => !triviaScores[p]).length} players haven't played yet
              </Text>
            )}
          </View>
        )}

        <GoldButton
          label={playerScore !== undefined ? 'PLAY AGAIN' : 'START TRIVIA'}
          onPress={() => router.push('/(tabs)/trivia/game' as any)}
          style={styles.startButton}
        />
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  suit: {
    fontSize: 40,
    color: Colors.marqueeAmber,
    marginBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 32,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  playerCard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.xl,
  },
  playerLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  playerName: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: Colors.goldLight,
  },
  previousScore: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  previewBoard: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    width: '100%',
    marginBottom: Spacing.xl,
  },
  previewTitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.gold,
    marginBottom: Spacing.md,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  previewRank: {
    fontSize: 14,
    width: 28,
    color: Colors.textSecondary,
  },
  previewName: {
    flex: 1,
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  previewScore: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.goldLight,
  },
  waitingText: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  startButton: {
    width: '100%',
  },
});
