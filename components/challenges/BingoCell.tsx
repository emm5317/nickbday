// TODO: Implement individual bingo cell (incomplete vs complete states)
import type { Challenge } from '@/data/challenges';

interface BingoCellProps {
  challenge: Challenge;
  isCompleted: boolean;
  onPress: () => void;
}

export function BingoCell(_props: BingoCellProps) {
  return null;
}
