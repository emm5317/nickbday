import { Link, Stack } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing } from '@/constants/theme';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Go to home screen</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.bgDeep,
  },
  title: {
    fontFamily: Fonts.body,
    fontSize: 18,
    color: Colors.textPrimary,
  },
  link: {
    marginTop: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  linkText: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 14,
    color: Colors.gold,
  },
});
