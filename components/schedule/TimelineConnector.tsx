import { View, StyleSheet } from 'react-native';
import { Colors, TagColors } from '@/constants/theme';

interface TimelineConnectorProps {
  dotColor: keyof typeof TagColors;
  isLast: boolean;
}

export function TimelineConnector({ dotColor, isLast }: TimelineConnectorProps) {
  const color = TagColors[dotColor].text;

  return (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      {!isLast && <View style={styles.line} />}
    </View>
  );
}

const DOT_SIZE = 8;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: DOT_SIZE,
    marginTop: 2,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  line: {
    width: 1,
    flex: 1,
    backgroundColor: 'rgba(201,168,76,0.1)',
    minHeight: 24,
    marginTop: 3,
  },
});
