import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { GoldButton } from '@/components/ui/GoldButton';
import { useAppStore } from '@/store/useAppStore';
import { OPEN_ENDED_QUESTIONS } from '@/data/trivia';
import { PLAYERS } from '@/constants/players';

export default function AnswersReviewScreen() {
  const router = useRouter();
  const openEndedAnswers = useAppStore((s) => s.openEndedAnswers);
  const currentPlayer = useAppStore((s) => s.currentPlayer);

  const totalAnswered = PLAYERS.reduce((count, player) => {
    const playerAnswers = OPEN_ENDED_QUESTIONS.filter(
      (q) => openEndedAnswers[q.id]?.[player]
    ).length;
    return count + (playerAnswers > 0 ? 1 : 0);
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Everyone's Answers</Text>
        <Text style={styles.subtitle}>
          {totalAnswered} of {PLAYERS.length} players have answered
        </Text>

        {OPEN_ENDED_QUESTIONS.map((question, qi) => {
          const answers = openEndedAnswers[question.id] || {};
          const respondents = PLAYERS.filter((p) => answers[p]);

          return (
            <View key={question.id} style={styles.questionBlock}>
              <Text style={styles.questionEyebrow}>
                QUESTION {String(qi + 1).padStart(2, '0')}
              </Text>
              <Card>
                <Text style={styles.questionText}>{question.question}</Text>
              </Card>

              {respondents.length === 0 ? (
                <Text style={styles.noAnswers}>No answers yet</Text>
              ) : (
                respondents.map((player) => (
                  <View key={player} style={styles.answerRow}>
                    <Text
                      style={[
                        styles.playerName,
                        player === currentPlayer && styles.playerNameSelf,
                      ]}
                    >
                      {player}
                    </Text>
                    <Text style={styles.answerText}>{answers[player]}</Text>
                  </View>
                ))
              )}
            </View>
          );
        })}

        <View style={styles.actions}>
          <GoldButton
            label="BACK TO TRIVIA"
            onPress={() => router.replace('/(tabs)/trivia' as never)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  scroll: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl * 2,
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: Spacing.xxl,
  },
  questionBlock: {
    marginBottom: Spacing.xxl,
  },
  questionEyebrow: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.gold,
    marginBottom: Spacing.md,
  },
  questionText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 16,
    color: Colors.textPrimary,
    lineHeight: 24,
  },
  noAnswers: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: Spacing.md,
    fontStyle: 'italic',
  },
  answerRow: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginTop: Spacing.sm,
  },
  playerName: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 1,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  playerNameSelf: {
    color: Colors.goldLight,
  },
  answerText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  actions: {
    marginTop: Spacing.xl,
  },
});
