import { useState, useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { useAppStore } from '@/store/useAppStore';
import { TRIVIA_QUESTIONS } from '@/data/trivia';

const LETTERS = ['A', 'B', 'C', 'D'] as const;
const REVEAL_DELAY = 1500;

type Phase = 'answering' | 'revealing';

export default function TriviaGameScreen() {
  const router = useRouter();
  const currentPlayer = useAppStore((s) => s.currentPlayer);
  const recordTriviaScore = useAppStore((s) => s.recordTriviaScore);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>('answering');

  const question = TRIVIA_QUESTIONS[currentIndex];
  const totalQuestions = TRIVIA_QUESTIONS.length;
  const isCorrect = selectedAnswer === question?.correctIndex;

  const advance = useCallback(() => {
    const finalScore = score + (isCorrect ? 1 : 0);

    if (currentIndex >= totalQuestions - 1) {
      if (currentPlayer) {
        recordTriviaScore(currentPlayer, finalScore);
      }
      router.replace('/(tabs)/trivia/leaderboard' as any);
      return;
    }

    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setPhase('answering');
  }, [currentIndex, totalQuestions, score, isCorrect, currentPlayer, recordTriviaScore, router]);

  useEffect(() => {
    if (phase === 'revealing') {
      const timer = setTimeout(advance, REVEAL_DELAY);
      return () => clearTimeout(timer);
    }
  }, [phase, advance]);

  const handleAnswer = (answerIndex: number) => {
    if (phase !== 'answering') return;
    setSelectedAnswer(answerIndex);
    if (answerIndex === question.correctIndex) {
      setScore((s) => s + 1);
    }
    setPhase('revealing');
  };

  const handleSkip = () => {
    if (phase !== 'answering') return;
    setSelectedAnswer(-1);
    setPhase('revealing');
  };

  if (!question) return null;

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nick Trivia</Text>
        <View style={styles.scoreChip}>
          <Text style={styles.scoreText}>
            {score}/{currentIndex + (phase === 'revealing' ? 1 : 0)}
          </Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          Q{currentIndex + 1} of {totalQuestions}
        </Text>
      </View>

      <View style={styles.questionWrap}>
        <Text style={styles.questionEyebrow}>
          QUESTION {String(currentIndex + 1).padStart(2, '0')}
        </Text>
        <Card style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </Card>

        {phase === 'revealing' && question.funFact && question.funFact !== 'TODO: Add fun fact' && (
          <Text style={styles.funFact}>{question.funFact}</Text>
        )}
      </View>

      <View style={styles.answersWrap}>
        {question.answers.map((answer, i) => {
          const isRevealCorrect = phase === 'revealing' && i === question.correctIndex;
          const isRevealWrong = phase === 'revealing' && i === selectedAnswer && i !== question.correctIndex;

          const borderColor = isRevealCorrect
            ? Colors.neonCyan
            : isRevealWrong
              ? Colors.neonPink
              : Colors.border;

          const letterBg = isRevealCorrect
            ? Colors.neonCyan
            : isRevealWrong
              ? Colors.neonPink
              : Colors.bgElevated;

          return (
            <Pressable
              key={i}
              style={[styles.answerButton, { borderColor }]}
              onPress={() => handleAnswer(i)}
              disabled={phase !== 'answering'}
            >
              <View style={[styles.letterCircle, { backgroundColor: letterBg }]}>
                <Text style={styles.letterText}>{LETTERS[i]}</Text>
              </View>
              <Text style={styles.answerText}>{answer}</Text>
            </Pressable>
          );
        })}
      </View>

      {phase === 'answering' && (
        <Pressable style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
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
    paddingTop: Spacing.lg,
  },
  headerTitle: {
    fontFamily: Fonts.displayBlack,
    fontSize: 24,
    color: Colors.textPrimary,
  },
  scoreChip: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: Radii.full,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.lg,
  },
  scoreText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    color: Colors.goldLight,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.bgCard,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 2,
  },
  progressLabel: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  questionWrap: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
  },
  questionEyebrow: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.gold,
    marginBottom: Spacing.md,
  },
  questionCard: {
    marginBottom: Spacing.md,
  },
  questionText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 18,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  funFact: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.marqueeAmber,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
  },
  answersWrap: {
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1.5,
    borderRadius: Radii.md,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  letterCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.textPrimary,
  },
  answerText: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  skipButton: {
    alignSelf: 'center',
    marginTop: Spacing.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl,
  },
  skipText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textSecondary,
  },
});
