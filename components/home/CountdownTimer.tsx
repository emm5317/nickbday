import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { useCountdown } from '@/hooks/useCountdown';

export function CountdownTimer() {
  const { days, hours, minutes, isOver, isWeekendOver } = useCountdown();

  if (isWeekendOver) {
    return (
      <View style={styles.pill}>
        <Text style={styles.text}>WEEKEND OVER \u2014 MEMORIES MADE</Text>
      </View>
    );
  }

  if (isOver) {
    return (
      <View style={styles.pill}>
        <Text style={styles.text}>THE WEEKEND IS HERE</Text>
      </View>
    );
  }

  return (
    <View style={styles.pill}>
      <View style={styles.dot} />
      <Text style={styles.text}>
        {days} DAYS \u00B7 {hours} HRS \u00B7 {minutes} MIN
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.full,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.neonPink,
  },
  text: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 2,
    color: Colors.goldLight,
  },
});
