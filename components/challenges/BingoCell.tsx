import { Pressable, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import type { Challenge } from '@/data/challenges';

const SCREEN_WIDTH = Dimensions.get('window').width;
const GRID_PADDING = 16;
const GAP = 6;
const CELL_SIZE = (SCREEN_WIDTH - GRID_PADDING * 2 - GAP * 4) / 5;

interface BingoCellProps {
  challenge: Challenge;
  isCompleted: boolean;
  isBingoLine: boolean;
  onPress: () => void;
}

export function BingoCell({ challenge, isCompleted, isBingoLine, onPress }: BingoCellProps) {
  const isFreeSpace = challenge.id === 'c12';

  return (
    <Pressable
      style={[
        styles.cell,
        isCompleted && styles.completed,
        isBingoLine && styles.bingoLine,
        isFreeSpace && styles.freeSpace,
      ]}
      onPress={onPress}
    >
      <Text style={styles.icon}>{challenge.icon}</Text>
      <Text
        style={[styles.label, isCompleted && styles.labelCompleted]}
        numberOfLines={2}
      >
        {challenge.label.toUpperCase()}
      </Text>
      {isCompleted && !isFreeSpace && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>{'\u2713'}</Text>
        </View>
      )}
    </Pressable>
  );
}

export { CELL_SIZE, GAP };

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  completed: {
    borderColor: Colors.gold,
    borderWidth: 1.5,
    backgroundColor: 'rgba(201, 168, 76, 0.08)',
  },
  bingoLine: {
    borderColor: Colors.neonCyan,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0, 212, 200, 0.06)',
  },
  freeSpace: {
    borderColor: Colors.gold,
    borderWidth: 1.5,
    backgroundColor: 'rgba(201, 168, 76, 0.15)',
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 6,
    letterSpacing: 0.3,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 8,
  },
  labelCompleted: {
    color: Colors.goldLight,
  },
  checkmark: {
    position: 'absolute',
    top: 2,
    right: 3,
  },
  checkmarkText: {
    fontSize: 8,
    color: Colors.gold,
  },
});
