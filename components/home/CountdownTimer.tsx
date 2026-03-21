import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { useCountdown } from '@/hooks/useCountdown';

export function CountdownTimer() {
  const { days, hours, minutes, isOver, isWeekendOver } = useCountdown();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 1.05, duration: 150, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1.0, duration: 150, useNativeDriver: true }),
    ]).start();
  }, [minutes, scale]);

  if (isWeekendOver) {
    return (
      <Animated.View style={[styles.pill, { transform: [{ scale }] }]}>
        <Text style={styles.text}>WEEKEND OVER — MEMORIES MADE</Text>
      </Animated.View>
    );
  }

  if (isOver) {
    return (
      <Animated.View style={[styles.pill, { transform: [{ scale }] }]}>
        <Text style={styles.text}>THE WEEKEND IS HERE</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.pill, { transform: [{ scale }] }]}>
      <View style={styles.dot} />
      <Text style={styles.text}>
        {days} DAYS · {hours} HRS · {minutes} MIN
      </Text>
    </Animated.View>
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
    backgroundColor: Colors.marqueeAmber,
  },
  text: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 2.5,
    color: Colors.goldLight,
  },
});
