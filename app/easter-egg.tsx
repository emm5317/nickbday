import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { EASTER_EGGS } from '@/constants/easterEggs';

export default function EasterEggScreen() {
  const { eggId } = useLocalSearchParams<{ eggId: string }>();
  const router = useRouter();
  const egg = EASTER_EGGS.find((e) => e.id === eggId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{egg?.title ?? 'Surprise!'}</Text>
      <Text style={styles.subtitle}>{egg?.subtitle ?? ''}</Text>
      <Pressable style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeText}>CLOSE</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 32,
    color: Colors.goldLight,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  closeButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 9999,
  },
  closeText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.gold,
  },
});
