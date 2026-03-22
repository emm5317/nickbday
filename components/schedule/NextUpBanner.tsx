import { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';

interface NextUpBannerProps {
  eventName: string;
  time: string;
}

export function NextUpBanner({ eventName, time }: NextUpBannerProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <View style={styles.banner}>
      <Animated.View style={[styles.pulse, { opacity: pulseAnim }]} />
      <Text style={styles.label}>NEXT UP</Text>
      <Text style={styles.event}>
        {'\u2192'} {eventName} {'\u00B7'} {time}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginHorizontal: 14,
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: 'rgba(0,212,200,0.07)',
    borderWidth: 0.5,
    borderColor: 'rgba(0,212,200,0.25)',
    borderRadius: 10,
  },
  pulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.neonCyan,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 1,
    color: 'rgba(0,212,200,0.8)',
  },
  event: {
    fontFamily: Fonts.body,
    fontSize: 8,
    color: Colors.textMuted,
  },
});
