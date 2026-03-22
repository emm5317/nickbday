import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { Badge } from '@/components/ui/Badge';
import type { ScheduleEvent } from '@/data/schedule';

interface EventCardProps {
  event: ScheduleEvent;
  isExpanded: boolean;
  onToggle: () => void;
}

export function EventCard({ event, isExpanded, onToggle }: EventCardProps) {
  return (
    <Pressable
      style={[
        styles.card,
        event.isBirthdayEvent && styles.cardFeatured,
        event.isNextUp && styles.cardNextUp,
      ]}
      onPress={onToggle}
    >
      <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
        {'\u203A'}
      </Text>

      {event.isNextUp && (
        <View style={styles.nextUpPill}>
          <Text style={styles.nextUpText}>{'\u2191'} Next Up</Text>
        </View>
      )}

      <Text style={styles.name}>{event.name}</Text>
      <Text style={styles.venue}>{event.venue}</Text>

      {event.notes && (
        <Text style={styles.notes}>{event.notes}</Text>
      )}

      <View style={styles.tags}>
        <Badge label={event.tagLabel} color={event.tagColor} />
      </View>

      {isExpanded && event.details && event.details.length > 0 && (
        <View style={styles.detailsSection}>
          {event.details.map((detail, i) => (
            <View key={i} style={styles.detailRow}>
              <Text style={styles.detailIcon}>{detail.icon}</Text>
              <Text style={styles.detailText}>{detail.text}</Text>
            </View>
          ))}
        </View>
      )}

      {event.isBirthdayEvent && (
        <Text style={styles.watermark}>{'\u2666'}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderWidth: 0.5,
    borderColor: Colors.border,
    borderRadius: 14,
    padding: 14,
    overflow: 'hidden',
  },
  cardFeatured: {
    borderColor: Colors.borderAccent,
    backgroundColor: 'rgba(201,168,76,0.04)',
  },
  cardNextUp: {
    borderColor: 'rgba(0,212,200,0.3)',
  },
  chevron: {
    position: 'absolute',
    right: 10,
    top: 14,
    fontSize: 14,
    color: 'rgba(201,168,76,0.3)',
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  nextUpPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0,212,200,0.1)',
    borderWidth: 0.5,
    borderColor: 'rgba(0,212,200,0.3)',
    borderRadius: Radii.full,
    paddingVertical: 1,
    paddingHorizontal: 6,
    marginBottom: 4,
  },
  nextUpText: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 6,
    letterSpacing: 0.8,
    color: 'rgba(0,212,200,0.85)',
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 12,
    color: Colors.textPrimary,
    lineHeight: 16,
    paddingRight: 20,
  },
  venue: {
    fontFamily: Fonts.body,
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 3,
    marginBottom: 5,
    lineHeight: 12,
  },
  notes: {
    fontFamily: Fonts.body,
    fontSize: 8,
    color: 'rgba(200,195,220,0.32)',
    fontStyle: 'italic',
    marginBottom: 6,
    lineHeight: 11,
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  detailsSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(201,168,76,0.1)',
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
  },
  detailIcon: {
    fontSize: 10,
    marginTop: 1,
  },
  detailText: {
    fontFamily: Fonts.body,
    fontSize: 9,
    color: Colors.textMuted,
    lineHeight: 14,
    flex: 1,
  },
  watermark: {
    position: 'absolute',
    right: 8,
    bottom: 4,
    fontSize: 26,
    opacity: 0.06,
    lineHeight: 26,
  },
});
