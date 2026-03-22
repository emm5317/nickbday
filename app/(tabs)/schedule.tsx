import { useState, useMemo, useCallback, useRef } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { DayTabs } from '@/components/schedule/DayTabs';
import { EventCard } from '@/components/schedule/EventCard';
import { TimelineConnector } from '@/components/schedule/TimelineConnector';
import { TimeSection } from '@/components/schedule/TimeSection';
import { SphereBanner } from '@/components/schedule/SphereBanner';
import { NextUpBanner } from '@/components/schedule/NextUpBanner';
import { VibeFoot } from '@/components/schedule/VibeFoot';
import { MarqueeDots } from '@/components/home/MarqueeDots';
import { SCHEDULE, DAYS, DAY_VIBES, type Day, type ScheduleEvent } from '@/data/schedule';

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
  const params = useLocalSearchParams<{ day?: string }>();
  const [activeDay, setActiveDay] = useState<Day>(
    () => (params.day as Day) || getDefaultDay()
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const touchStartX = useRef(0);

  const dayEvents = SCHEDULE.filter((e) => e.day === activeDay);

  const groupedEvents = useMemo(() => {
    const groups: Array<{ section: string; events: ScheduleEvent[] }> = [];
    let currentSection = '';
    for (const event of dayEvents) {
      const section = event.timeSection || 'GENERAL';
      if (section !== currentSection) {
        groups.push({ section, events: [event] });
        currentSection = section;
      } else {
        groups[groups.length - 1].events.push(event);
      }
    }
    return groups;
  }, [dayEvents]);

  const swipeDays = useCallback((direction: 'left' | 'right') => {
    const currentIdx = DAYS.indexOf(activeDay);
    if (direction === 'left' && currentIdx < DAYS.length - 1) {
      setActiveDay(DAYS[currentIdx + 1]);
      setExpandedId(null);
    } else if (direction === 'right' && currentIdx > 0) {
      setActiveDay(DAYS[currentIdx - 1]);
      setExpandedId(null);
    }
  }, [activeDay]);

  const nextUpEvent = dayEvents.find((e) => e.isNextUp);
  const vibeData = DAY_VIBES[activeDay];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Weekend</Text>
            <Text style={styles.subtitle}>{'\u2666'} Las Vegas {'\u00B7'} Apr 16{'\u2013'}19, 2026</Text>
          </View>
          <View style={styles.eventCountPill}>
            <Text style={styles.eventCountText}>{dayEvents.length} Events</Text>
          </View>
        </View>
      </View>

      <View style={styles.marqueWrap}>
        <MarqueeDots />
      </View>

      <DayTabs activeDay={activeDay} onDayChange={(day) => { setActiveDay(day); setExpandedId(null); }} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onTouchStart={(e) => {
          touchStartX.current = e.nativeEvent.pageX;
        }}
        onTouchEnd={(e) => {
          const dx = e.nativeEvent.pageX - touchStartX.current;
          if (dx < -60) swipeDays('left');
          else if (dx > 60) swipeDays('right');
        }}
      >
        {/* Next Up banner — SAT only */}
        {activeDay === 'SAT' && nextUpEvent && (
          <NextUpBanner eventName={nextUpEvent.name} time={nextUpEvent.time} />
        )}

        {/* Sphere banner — FRI only */}
        {activeDay === 'FRI' && (
          <SphereBanner onPress={() => setExpandedId('fri-3')} />
        )}

        {groupedEvents.map(({ section, events }) => (
          <View key={section}>
            <View style={styles.timeSectionWrap}>
              <TimeSection label={section} />
            </View>
            {events.map((event, index) => (
              <View key={event.id} style={styles.eventRow}>
                <View style={styles.timeColumn}>
                  <Text style={styles.timeHour}>
                    {event.time.replace(/ [AP]M/, '')}
                  </Text>
                  <Text style={styles.timePeriod}>
                    {event.time.includes('AM') ? 'AM' : event.time.includes('PM') ? 'PM' : ''}
                  </Text>
                </View>
                <View style={styles.timelineColumn}>
                  <TimelineConnector
                    dotColor={event.tagColor}
                    isLast={index === events.length - 1}
                  />
                </View>
                <View style={styles.cardColumn}>
                  <EventCard
                    event={event}
                    isExpanded={expandedId === event.id}
                    onToggle={() =>
                      setExpandedId(expandedId === event.id ? null : event.id)
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        ))}

        <VibeFoot {...vibeData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgDeep,
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: Spacing.lg,
    paddingBottom: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Fonts.displayBlack,
    fontSize: 28,
    color: Colors.goldLight,
    lineHeight: 28,
  },
  subtitle: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 2,
    color: 'rgba(201,168,76,0.6)',
    marginTop: 3,
    textTransform: 'uppercase',
  },
  eventCountPill: {
    backgroundColor: 'rgba(201,168,76,0.1)',
    borderWidth: 0.5,
    borderColor: 'rgba(201,168,76,0.28)',
    borderRadius: Radii.full,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  eventCountText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 8,
    letterSpacing: 0.8,
    color: Colors.gold,
  },
  marqueWrap: {
    paddingVertical: 8,
  },
  scrollContent: {
    paddingTop: 6,
    paddingBottom: Spacing.xxl + 80,
  },
  timeSectionWrap: {
    paddingHorizontal: 14,
    marginTop: 18,
    marginBottom: 6,
  },
  eventRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  timeColumn: {
    width: 30,
    alignItems: 'flex-end',
    paddingTop: 11,
  },
  timeHour: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 10,
    color: 'rgba(240,232,208,0.6)',
    lineHeight: 11,
  },
  timePeriod: {
    fontFamily: Fonts.body,
    fontSize: 7,
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
  timelineColumn: {
    alignItems: 'center',
    paddingTop: 11,
    width: 14,
  },
  cardColumn: {
    flex: 1,
  },
});
