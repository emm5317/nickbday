import { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { CountdownTimer } from '@/components/home/CountdownTimer';
import { AvatarRing } from '@/components/home/AvatarRing';
import { ModuleTile } from '@/components/home/ModuleTile';
import { useAppStore } from '@/store/useAppStore';
import { SCHEDULE } from '@/data/schedule';

export default function HomeScreen() {
  const router = useRouter();
  const currentPlayer = useAppStore((s) => s.currentPlayer);
  const triviaCompleted = useAppStore((s) => s.triviaCompleted);
  const completedChallenges = useAppStore((s) => s.completedChallenges);
  const memoryPhotoUris = useAppStore((s) => s.memoryPhotoUris);

  useEffect(() => {
    if (currentPlayer === null) {
      router.push('/player-select');
    }
  }, [currentPlayer, router]);

  const triviaSubLabel = triviaCompleted ? 'Completed' : '30 questions';
  const challengeCount = completedChallenges.length;
  const photoCount = memoryPhotoUris.length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>LAS VEGAS {'\u00B7'} 2026</Text>

        <Text style={styles.hero}>
          Nick's <Text style={styles.heroAccent}>30</Text>
        </Text>

        <Text style={styles.subhead}>THE LEGEND TURNS THIRTY</Text>

        <View style={styles.countdownWrap}>
          <CountdownTimer />
        </View>

        <View style={styles.avatarWrap}>
          <AvatarRing />
        </View>

        <View style={styles.grid}>
          <View style={styles.gridRow}>
            <ModuleTile
              icon={'\u{1F4C5}'}
              label="SCHEDULE"
              sublabel={`${SCHEDULE.length} events`}
              onPress={() => router.push('/(tabs)/schedule')}
            />
            <ModuleTile
              icon={'\u{1F3AF}'}
              label="NICK TRIVIA"
              sublabel={triviaSubLabel}
              badge={triviaCompleted ? undefined : 'NEW'}
              onPress={() => router.push('/(tabs)/trivia')}
            />
          </View>
          <View style={styles.gridRow}>
            <ModuleTile
              icon={'\u{26A1}'}
              label="CHALLENGES"
              sublabel={`${challengeCount} of 25 done`}
              onPress={() => router.push('/challenges')}
            />
            <ModuleTile
              icon={'\u{1F4F8}'}
              label="MEMORIES"
              sublabel={`${photoCount} photos`}
              onPress={() => router.push('/(tabs)/memories')}
            />
          </View>
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
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl + 16,
  },
  eyebrow: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    letterSpacing: 3,
    color: Colors.gold,
    marginBottom: Spacing.md,
  },
  hero: {
    fontFamily: Fonts.displayBlack,
    fontSize: 40,
    color: Colors.goldLight,
    marginBottom: Spacing.sm,
  },
  heroAccent: {
    color: Colors.gold,
  },
  subhead: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 4,
    color: Colors.textSecondary,
  },
  countdownWrap: {
    marginTop: Spacing.xl,
  },
  avatarWrap: {
    marginTop: Spacing.xl,
  },
  grid: {
    width: '100%',
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  gridRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
});
