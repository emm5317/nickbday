import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';

const DOT_COUNT = 15;
const DOT_SIZE = 5;

export function MarqueeDots() {
  return (
    <View style={styles.row}>
      {Array.from({ length: DOT_COUNT }, (_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i % 2 === 0 ? Colors.gold : Colors.marqueeAmber },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: DOT_SIZE,
    marginTop: Spacing.md,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});
