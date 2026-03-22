import { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { Starfield } from '@/components/home/Starfield';
import { CountdownTimer } from '@/components/home/CountdownTimer';
import { MarqueeDots } from '@/components/home/MarqueeDots';
import { AvatarRing } from '@/components/home/AvatarRing';
import { ModuleTile } from '@/components/home/ModuleTile';
import { CrewCard } from '@/components/home/CrewCard';
import { useAppStore } from '@/store/useAppStore';
import { SCHEDULE } from '@/data/schedule';
import { CHALLENGES, BINGO_LINES } from '@/data/challenges';

export default function HomeScreen() {
  const router = useRouter();
  const currentPlayer = useAppStore((s) => s.currentPlayer);
  const triviaCompleted = useAppStore((s) => s.triviaCompleted);
  const triviaScores = useAppStore((s) => s.triviaScores);
  const completedChallenges = useAppStore((s) => s.completedChallenges);
  const memoryPhotoUris = useAppStore((s) => s.memoryPhotoUris);

  useEffect(() => {
    if (currentPlayer === null) {
      router.push('/player-select');
    }
  }, [currentPlayer, router]);

  // Trivia leader
  const scoreEntries = Object.entries(triviaScores);
  const triviaLeader = scoreEntries.length > 0
    ? scoreEntries.sort(([, a], [, b]) => b - a)[0]
    : null;
  const triviaSublabel = triviaCompleted && triviaLeader
    ? `${triviaLeader[0]} leads \u00B7 ${triviaLeader[1]}/30`
    : triviaCompleted
      ? 'Completed'
      : '30 questions';

  // Bingo progress
  const challengeCount = completedChallenges.length;
  const bingoPercent = Math.round((challengeCount / 25) * 100);
  const bingoLineCount = BINGO_LINES.filter((line) =>
    line.every((idx) => completedChallenges.includes(CHALLENGES[idx].id))
  ).length;

  const photoCount = memoryPhotoUris.length;

  return (
    <SafeAreaView style={styles.container}>
      <Starfield />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>LAS VEGAS {'\u00B7'} APRIL 2026</Text>

        <Text style={styles.hero}>
          Nick's <Text style={styles.heroAccent}>30</Text>
        </Text>

        <Text style={styles.subhead}>PHAMILY AT THE SPHERE</Text>

        <MarqueeDots />

        <View style={styles.countdownWrap}>
          <CountdownTimer />
        </View>

        <View style={styles.avatarWrap}>
          <AvatarRing />
        </View>

        <View style={styles.grid}>
          <View style={styles.gridRow}>
            <ModuleTile
              icon={'\u2666'}
              iconColor={Colors.gold}
              label="SCHEDULE"
              sublabel={`${SCHEDULE.length} events \u00B7 Apr 16\u201319`}
              suitWatermark={'\u2666'}
              borderColor="rgba(201,168,76,0.26)"
              onPress={() => router.push('/(tabs)/schedule')}
            />
            <ModuleTile
              icon={'\u2660'}
              iconColor={Colors.marqueeAmber}
              label="NICK TRIVIA"
              sublabel={triviaSublabel}
              badge={triviaCompleted ? 'Completed' : 'NEW'}
              badgeVariant={triviaCompleted ? 'completed' : 'new'}
              suitWatermark={'\u2660'}
              borderColor="rgba(232,133,58,0.22)"
              onPress={() => router.push('/(tabs)/trivia' as any)}
            />
          </View>
          <View style={styles.gridRow}>
            <ModuleTile
              icon={'\u2663'}
              iconColor={Colors.neonCyan}
              label="BINGO"
              sublabel={`${challengeCount} of 25 done`}
              badge="Active"
              badgeVariant="active"
              suitWatermark={'\u2663'}
              borderColor="rgba(0,212,200,0.22)"
              progress={{
                percent: bingoPercent,
                label: `${bingoPercent}% complete \u00B7 ${bingoLineCount} bingo line${bingoLineCount !== 1 ? 's' : ''}`,
              }}
              onPress={() => router.push('/(tabs)/challenges')}
            />
            <ModuleTile
              icon={'\u2665'}
              iconColor={Colors.neonPink}
              label="MEMORIES"
              sublabel={`${photoCount} photo${photoCount !== 1 ? 's' : ''} saved`}
              suitWatermark={'\u2665'}
              borderColor="rgba(232,48,96,0.22)"
              onPress={() => router.push('/(tabs)/memories')}
            />
          </View>
        </View>

        <CrewCard onPress={() => router.push('/crew-map' as any)} />

        {/* Hidden tortoise easter egg */}
        <Text style={styles.tortoise}>{'\u{1F422}'}</Text>
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
    paddingHorizontal: 14,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl + 40,
  },
  eyebrow: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 3,
    color: 'rgba(201,168,76,0.7)',
    marginBottom: 5,
  },
  hero: {
    fontFamily: Fonts.displayBlack,
    fontSize: 56,
    color: Colors.goldLight,
    lineHeight: 52,
    letterSpacing: -1,
  },
  heroAccent: {
    color: Colors.gold,
  },
  subhead: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 3,
    color: Colors.textMuted,
    marginTop: 6,
  },
  countdownWrap: {
    marginTop: Spacing.md,
  },
  avatarWrap: {
    marginTop: Spacing.lg,
  },
  grid: {
    width: '100%',
    marginTop: 18,
    gap: 9,
  },
  gridRow: {
    flexDirection: 'row',
    gap: 9,
  },
  tortoise: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 40,
    opacity: 0.12,
  },
});
