import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';

interface VibeFootProps {
  icon: string;
  temp: string;
  condition: string;
  vibe: string;
}

export function VibeFoot({ icon, temp, condition, vibe }: VibeFootProps) {
  return (
    <View style={styles.footer}>
      <Text style={styles.weatherIcon}>{icon}</Text>
      <Text style={styles.temp}>{temp}</Text>
      <Text style={styles.condition}>{condition}</Text>
      <View style={styles.separator} />
      <Text style={styles.vibe}>
        <Text style={styles.vibeLabel}>Vibe: </Text>
        {vibe}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(201,168,76,0.15)',
    marginTop: Spacing.lg,
  },
  weatherIcon: {
    fontSize: 12,
  },
  temp: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    color: Colors.marqueeAmber,
  },
  condition: {
    fontFamily: Fonts.body,
    fontSize: 9,
    color: Colors.textMuted,
  },
  separator: {
    width: 1,
    height: 10,
    backgroundColor: 'rgba(201,168,76,0.12)',
  },
  vibe: {
    fontFamily: Fonts.body,
    fontSize: 8,
    color: Colors.textMuted,
    flex: 1,
  },
  vibeLabel: {
    fontFamily: Fonts.bodySemiBold,
    color: Colors.gold,
  },
});
