import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { BingoGrid } from '@/components/challenges/BingoGrid';
import { useAppStore } from '@/store/useAppStore';

export default function BingoScreen() {
  const completedChallenges = useAppStore((s) => s.completedChallenges);
  const count = completedChallenges.length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Bingo</Text>
          <Text style={styles.subtitle}>VEGAS CHALLENGES</Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.countBig}>{count}/25</Text>
          <Text style={styles.countLabel}>COMPLETE</Text>
        </View>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(count / 25) * 100}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{count} of 25</Text>
      </View>

      <BingoGrid />
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
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 32,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    letterSpacing: 2,
    color: Colors.gold,
    marginTop: Spacing.xs,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  countBig: {
    fontFamily: Fonts.displayBlack,
    fontSize: 24,
    color: Colors.goldLight,
  },
  countLabel: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.md,
    marginBottom: Spacing.lg,
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
    backgroundColor: Colors.neonCyan,
    borderRadius: 2,
  },
  progressLabel: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textSecondary,
  },
});
