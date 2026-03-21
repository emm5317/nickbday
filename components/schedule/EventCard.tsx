import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, Radii } from '@/constants/theme';
import { Badge } from '@/components/ui/Badge';
import type { ScheduleEvent } from '@/data/schedule';

interface EventCardProps {
  event: ScheduleEvent;
  onPress: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        event.isBirthdayEvent && styles.cardFeatured,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.name}>
        {event.name} — {event.venue}
      </Text>
      <Text style={styles.venue}>{event.venue}</Text>
      <Badge label={event.tagLabel} color={event.tagColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    padding: Spacing.lg,
    gap: Spacing.xs,
  },
  cardFeatured: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.gold,
  },
  pressed: {
    opacity: 0.7,
  },
  name: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
    color: Colors.textPrimary,
  },
  venue: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
});
