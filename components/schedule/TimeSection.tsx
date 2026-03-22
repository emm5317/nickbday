import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';

interface TimeSectionProps {
  label: string;
}

export function TimeSection({ label }: TimeSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 4,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 2.5,
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: 'rgba(201,168,76,0.14)',
  },
});
