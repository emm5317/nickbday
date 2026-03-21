import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { DAYS, type Day } from '@/data/schedule';

interface DayTabsProps {
  activeDay: Day;
  onDayChange: (day: Day) => void;
}

export function DayTabs({ activeDay, onDayChange }: DayTabsProps) {
  return (
    <View style={styles.row}>
      {DAYS.map((day) => {
        const isActive = day === activeDay;
        return (
          <Pressable
            key={day}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onDayChange(day)}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {day}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  tabText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.bgDeep,
  },
});
