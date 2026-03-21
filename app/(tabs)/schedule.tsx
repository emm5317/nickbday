import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export default function ScheduleScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Weekend</Text>
        <Text style={styles.subtitle}>LAS VEGAS · APR 16-19</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
  },
  title: {
    fontFamily: Fonts.display,
    fontSize: 28,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.gold,
  },
});
