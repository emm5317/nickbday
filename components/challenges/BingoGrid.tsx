import { View, FlatList, StyleSheet } from 'react-native';
import { CHALLENGES } from '@/data/challenges';
import { useAppStore } from '@/store/useAppStore';
import { BingoCell, CELL_SIZE, GAP } from './BingoCell';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { GoldButton } from '@/components/ui/GoldButton';
import { Badge } from '@/components/ui/Badge';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { useState, useRef, useEffect } from 'react';
import { Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import ConfettiCannon from 'react-native-confetti-cannon';
import type { Challenge } from '@/data/challenges';

const BINGO_LINES = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

function getCompletedBingoLines(completedIds: string[]): number[][] {
  return BINGO_LINES.filter((line) =>
    line.every((idx) => completedIds.includes(CHALLENGES[idx].id))
  );
}

function getCellsInBingoLines(bingoLines: number[][]): Set<number> {
  const cells = new Set<number>();
  for (const line of bingoLines) {
    for (const idx of line) {
      cells.add(idx);
    }
  }
  return cells;
}

export function BingoGrid() {
  const completedChallenges = useAppStore((s) => s.completedChallenges);
  const completeChallenge = useAppStore((s) => s.completeChallenge);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const prevBingoCount = useRef(0);

  const bingoLines = getCompletedBingoLines(completedChallenges);
  const bingoCells = getCellsInBingoLines(bingoLines);

  // Detect new bingo line
  useEffect(() => {
    if (bingoLines.length > prevBingoCount.current && prevBingoCount.current >= 0) {
      if (prevBingoCount.current > 0) {
        // Only fire confetti after the initial load
        setShowConfetti(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
    prevBingoCount.current = bingoLines.length;
  }, [bingoLines.length]);

  const handleComplete = () => {
    if (selectedChallenge) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      completeChallenge(selectedChallenge.id);
      setSelectedChallenge(null);
    }
  };

  return (
    <>
      <FlatList
        data={CHALLENGES}
        numColumns={5}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <BingoCell
            challenge={item}
            isCompleted={completedChallenges.includes(item.id)}
            isBingoLine={bingoCells.has(index)}
            onPress={() => {
              if (item.id !== 'c12') setSelectedChallenge(item);
            }}
          />
        )}
      />

      <BottomSheet
        visible={selectedChallenge !== null}
        onClose={() => setSelectedChallenge(null)}
      >
        {selectedChallenge && (
          <View style={styles.sheetContent}>
            <Text style={styles.sheetIcon}>{selectedChallenge.icon}</Text>
            <Text style={styles.sheetTitle}>{selectedChallenge.label}</Text>
            <Badge
              label={selectedChallenge.difficulty.toUpperCase()}
              color={
                selectedChallenge.difficulty === 'hard'
                  ? 'pink'
                  : selectedChallenge.difficulty === 'medium'
                    ? 'gold'
                    : 'cyan'
              }
            />
            <Text style={styles.sheetDesc}>{selectedChallenge.description}</Text>
            {!completedChallenges.includes(selectedChallenge.id) && (
              <GoldButton
                label="MARK COMPLETE"
                onPress={handleComplete}
                style={{ marginTop: Spacing.lg }}
              />
            )}
            {completedChallenges.includes(selectedChallenge.id) && (
              <Text style={styles.completedText}>Completed!</Text>
            )}
          </View>
        )}
      </BottomSheet>

      {showConfetti && (
        <ConfettiCannon
          count={80}
          origin={{ x: 200, y: -20 }}
          autoStart
          fadeOut
          colors={['#C9A84C', '#E2C97E', '#E8853A', '#00D4C8']}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  grid: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  row: {
    gap: GAP,
    marginBottom: GAP,
  },
  sheetContent: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  sheetIcon: {
    fontSize: 40,
  },
  sheetTitle: {
    fontFamily: Fonts.display,
    fontSize: 20,
    color: Colors.textPrimary,
  },
  sheetDesc: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  completedText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.gold,
    marginTop: Spacing.md,
  },
});
