import { Pressable, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';

interface GoldButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function GoldButton({ label, onPress, style, textStyle, disabled }: GoldButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.gold,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radii.full,
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: Colors.goldDark,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 13,
    letterSpacing: 1.5,
    color: Colors.bgDeep,
  },
});
