import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { Card } from '@/components/ui/Card';
import { GoldButton } from '@/components/ui/GoldButton';
import { useAppStore } from '@/store/useAppStore';
import { OPEN_ENDED_QUESTIONS } from '@/data/trivia';

export default function OpenEndedScreen() {
  const router = useRouter();
  const currentPlayer = useAppStore((s) => s.currentPlayer);
  const openEndedAnswers = useAppStore((s) => s.openEndedAnswers);
  const submitOpenEndedAnswer = useAppStore((s) => s.submitOpenEndedAnswer);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<TextInput>(null);

  const question = OPEN_ENDED_QUESTIONS[currentIndex];
  const total = OPEN_ENDED_QUESTIONS.length;

  // Pre-fill with existing answer if revisiting
  const existingAnswer =
    currentPlayer && question
      ? openEndedAnswers[question.id]?.[currentPlayer] ?? ''
      : '';

  // Use draft if user has typed, otherwise show existing
  const [initialized, setInitialized] = useState(false);
  if (!initialized && existingAnswer && !draft) {
    setDraft(existingAnswer);
    setInitialized(true);
  }

  const handleSubmit = () => {
    if (!draft.trim() || !question) return;
    submitOpenEndedAnswer(question.id, draft.trim());
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentIndex >= total - 1) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.replace('/(tabs)/trivia/answers' as never);
      return;
    }

    // Advance to next question
    const nextIndex = currentIndex + 1;
    const nextQuestion = OPEN_ENDED_QUESTIONS[nextIndex];
    const nextExisting =
      currentPlayer && nextQuestion
        ? openEndedAnswers[nextQuestion.id]?.[currentPlayer] ?? ''
        : '';

    setCurrentIndex(nextIndex);
    setDraft(nextExisting);
    inputRef.current?.focus();
  };

  const handleSkip = () => {
    if (currentIndex >= total - 1) {
      router.replace('/(tabs)/trivia/answers' as never);
      return;
    }

    const nextIndex = currentIndex + 1;
    const nextQuestion = OPEN_ENDED_QUESTIONS[nextIndex];
    const nextExisting =
      currentPlayer && nextQuestion
        ? openEndedAnswers[nextQuestion.id]?.[currentPlayer] ?? ''
        : '';

    setCurrentIndex(nextIndex);
    setDraft(nextExisting);
    inputRef.current?.focus();
  };

  if (!question) return null;

  const progress = ((currentIndex + 1) / total) * 100;
  const answeredCount = currentPlayer
    ? OPEN_ENDED_QUESTIONS.filter(
        (q) => openEndedAnswers[q.id]?.[currentPlayer]
      ).length
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={10}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Open-Ended</Text>
            <View style={styles.scoreChip}>
              <Text style={styles.scoreText}>
                {answeredCount}/{total}
              </Text>
            </View>
          </View>

          <View style={styles.progressRow}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progress}%` }]}
              />
            </View>
            <Text style={styles.progressLabel}>
              Q{currentIndex + 1} of {total}
            </Text>
          </View>

          <View style={styles.questionWrap}>
            <Text style={styles.questionEyebrow}>
              QUESTION {String(currentIndex + 1).padStart(2, '0')}
            </Text>
            <Card style={styles.questionCard}>
              <Text style={styles.questionText}>{question.question}</Text>
            </Card>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={draft}
              onChangeText={setDraft}
              placeholder="Type your answer..."
              placeholderTextColor={Colors.textMuted}
              multiline
              textAlignVertical="top"
              autoFocus
            />
          </View>

          <View style={styles.actions}>
            <GoldButton
              label={currentIndex >= total - 1 ? 'SUBMIT & FINISH' : 'SUBMIT & NEXT'}
              onPress={handleSubmit}
              disabled={!draft.trim()}
              style={styles.submitButton}
            />
            <Text style={styles.skipText} onPress={handleSkip}>
              {currentIndex >= total - 1 ? 'Skip & finish' : 'Skip'}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    marginBottom: Spacing.lg,
  },
  questionText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 18,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  inputWrap: {
    marginBottom: Spacing.lg,
  },
  textInput: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.textPrimary,
    minHeight: 120,
    lineHeight: 22,
  },
  actions: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  submitButton: {
    width: '100%',
  },
  skipText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textSecondary,
    paddingVertical: Spacing.sm,
  },
});
