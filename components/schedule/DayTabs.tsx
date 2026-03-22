import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { DAYS, DAY_DATES, type Day } from '@/data/schedule';

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
            style={[styles.tab, isActive ? styles.tabActive : styles.tabInactive]}
            onPress={() => onDayChange(day)}
          >
            <Text style={[styles.tabDay, isActive && styles.tabDayActive]}>
              {day}
            </Text>
            <Text style={[styles.tabDate, isActive && styles.tabDateActive]}>
              APR {DAY_DATES[day]}
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
    gap: 5,
    paddingHorizontal: 14,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2,
    borderRadius: Radii.md,
  },
  tabInactive: {
    backgroundColor: Colors.bgCard,
    borderWidth: 0.5,
    borderColor: Colors.border,
  },
  tabActive: {
    backgroundColor: Colors.gold,
  },
  tabDay: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 9,
    letterSpacing: 1,
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  tabDayActive: {
    color: Colors.bgDeep,
    fontWeight: '700',
  },
  tabDate: {
    fontFamily: Fonts.body,
    fontSize: 7,
    letterSpacing: 0.5,
    color: Colors.textMuted,
    marginTop: 1,
  },
  tabDateActive: {
    color: 'rgba(7,9,26,0.55)',
  },
});
