import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';

interface GhostButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function GhostButton({ label, onPress, style, textStyle }: GhostButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: Colors.gold,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radii.full,
    alignItems: 'center',
  },
  pressed: {
    borderColor: Colors.goldDark,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    letterSpacing: 1.5,
    color: Colors.gold,
  },
});
