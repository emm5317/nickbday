import { useState, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Colors, Fonts, Spacing } from '@/constants/theme';
import { DayTabs } from '@/components/schedule/DayTabs';
import { EventCard } from '@/components/schedule/EventCard';
import { TimelineConnector } from '@/components/schedule/TimelineConnector';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { SCHEDULE, DAYS, type Day, type ScheduleEvent } from '@/data/schedule';

function getDefaultDay(): Day {
  const now = new Date();
  const thu = new Date('2026-04-16T00:00:00-07:00');
  const fri = new Date('2026-04-17T00:00:00-07:00');
  const sat = new Date('2026-04-18T00:00:00-07:00');
  const sun = new Date('2026-04-19T00:00:00-07:00');
  const end = new Date('2026-04-20T00:00:00-07:00');

  if (now >= sun && now < end) return 'SUN';
  if (now >= sat) return 'SAT';
  if (now >= fri) return 'FRI';
  if (now >= thu) return 'THU';
  return 'THU';
}

export default function ScheduleScreen() {
  const [activeDay, setActiveDay] = useState<Day>(getDefaultDay);
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null);

  const dayEvents = SCHEDULE.filter((e) => e.day === activeDay);

  const swipeDays = useCallback((direction: 'left' | 'right') => {
    const currentIdx = DAYS.indexOf(activeDay);
    if (direction === 'left' && currentIdx < DAYS.length - 1) {
      setActiveDay(DAYS[currentIdx + 1]);
    } else if (direction === 'right' && currentIdx > 0) {
      setActiveDay(DAYS[currentIdx - 1]);
    }
  }, [activeDay]);

  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-50, 50])
    .onEnd((e: { translationX: number }) => {
      if (e.translationX < -50) runOnJS(swipeDays)('left');
      else if (e.translationX > 50) runOnJS(swipeDays)('right');
    });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekend</Text>
        <Text style={styles.subtitle}>LAS VEGAS · APR 16-19</Text>
      </View>

      <DayTabs activeDay={activeDay} onDayChange={setActiveDay} />

      <GestureDetector gesture={swipeGesture}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {dayEvents.map((event, index) => (
          <View key={event.id} style={styles.eventRow}>
            <View style={styles.timeColumn}>
              <Text style={styles.timeText}>{event.time}</Text>
              <TimelineConnector
                dotColor={event.tagColor}
                isLast={index === dayEvents.length - 1}
              />
            </View>
            <View style={styles.cardColumn}>
              <EventCard
                event={event}
                onPress={() => setSelectedEvent(event)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      </GestureDetector>

      <BottomSheet
        visible={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <View style={styles.sheetContent}>
            <Text style={styles.sheetTime}>{selectedEvent.time}</Text>
            <Text style={styles.sheetName}>{selectedEvent.name}</Text>
            <Text style={styles.sheetVenue}>{selectedEvent.venue}</Text>
            {selectedEvent.notes && (
              <Text style={styles.sheetNotes}>{selectedEvent.notes}</Text>
            )}
          </View>
        )}
      </BottomSheet>
    </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 32,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    letterSpacing: 3,
    color: Colors.gold,
    marginTop: Spacing.xs,
  },
  scrollContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl + 40,
  },
  eventRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  timeColumn: {
    width: 64,
    alignItems: 'center',
    paddingTop: 2,
  },
  timeText: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  cardColumn: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  // Bottom sheet
  sheetContent: {
    gap: Spacing.sm,
  },
  sheetTime: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 2,
    color: Colors.gold,
  },
  sheetName: {
    fontFamily: Fonts.display,
    fontSize: 22,
    color: Colors.textPrimary,
  },
  sheetVenue: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sheetNotes: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: Spacing.sm,
  },
});
