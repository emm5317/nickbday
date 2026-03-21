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
      <Starfield />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>LAS VEGAS · APRIL 2026</Text>

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
              sublabel={`${SCHEDULE.length} events`}
              onPress={() => router.push('/(tabs)/schedule')}
            />
            <ModuleTile
              icon={'\u2660'}
              iconColor={Colors.marqueeAmber}
              label="NICK TRIVIA"
              sublabel={triviaSubLabel}
              badge={triviaCompleted ? undefined : 'NEW'}
              onPress={() => router.push('/(tabs)/trivia' as any)}
            />
          </View>
          <View style={styles.gridRow}>
            <ModuleTile
              icon={'\u2663'}
              iconColor={Colors.neonCyan}
              label="BINGO"
              sublabel={`${challengeCount} of 25 done`}
              badge={'\u2663'}
              onPress={() => router.push('/(tabs)/challenges')}
            />
            <ModuleTile
              icon={'\u2665'}
              iconColor={Colors.neonPink}
              label="MEMORIES"
              sublabel={`${photoCount} photos`}
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl + 40,
  },
  eyebrow: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
    letterSpacing: 3,
    color: Colors.gold,
    marginBottom: Spacing.md,
  },
  hero: {
    fontFamily: Fonts.displayBlack,
    fontSize: 52,
    color: Colors.goldLight,
    marginBottom: Spacing.xs,
  },
  heroAccent: {
    color: Colors.gold,
  },
  subhead: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 11,
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
  tortoise: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 40,
    opacity: 0.12,
  },
});
