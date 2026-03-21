import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>LAS VEGAS · 2026</Text>
        <Text style={styles.hero}>
          Nick's <Text style={styles.heroAccent}>30</Text>
        </Text>
        <Text style={styles.subhead}>THE LEGEND TURNS THIRTY</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  eyebrow: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    letterSpacing: 3,
    color: Colors.gold,
    marginBottom: Spacing.md,
  },
  hero: {
    fontFamily: Fonts.displayBlack,
    fontSize: 40,
    color: Colors.goldLight,
    marginBottom: Spacing.sm,
  },
  heroAccent: {
    color: Colors.gold,
  },
  subhead: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 4,
    color: Colors.textSecondary,
  },
});
